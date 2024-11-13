"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import db from "@/lib/db";
import bcrypt from "bcrypt";
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

interface LoginFormState {
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
}

export async function login(
  prevState: LoginFormState | null,
  formData: FormData
) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await loginSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  }

  const user = await db.user.findUnique({
    where: { email: result.data.email },
    select: {
      id: true,
      password: true,
    },
  });

  if (!user || !user.password) {
    return {
      fieldErrors: {
        email: ["Email does not exist"],
      },
    };
  }

  const isValid = await bcrypt.compare(result.data.password, user.password);

  if (!isValid) {
    return {
      fieldErrors: {
        password: ["Invalid password"],
      },
    };
  }

  cookies().set({
    name: "userId",
    value: String(user.id),
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  redirect("/home");
}
