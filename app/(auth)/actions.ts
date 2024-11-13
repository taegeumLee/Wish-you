"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import db from "@/lib/db";
import bcrypt from "bcrypt";

const loginSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다"),
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
        email: ["존재하지 않는 이메일입니다"],
      },
    };
  }

  const isValid = await bcrypt.compare(result.data.password, user.password);

  if (!isValid) {
    return {
      fieldErrors: {
        password: ["비밀번호가 올바르지 않습니다"],
      },
    };
  }

  cookies().set("userId", String(user.id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7일
  });

  redirect("/home");
}
