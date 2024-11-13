import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { email, password, ...rest } = data;

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already in use" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const defaultProfileImage = "/default-profile.jpg";

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        profileImage: defaultProfileImage,
        ...rest,
      },
      select: {
        id: true,
        email: true,
        name: true,
        profileImage: true,
      },
    });

    // Set cookie after successful signup
    const response = NextResponse.json({ success: true, user });
    response.cookies.set("userId", String(user.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "An error occurred during signup" },
      { status: 500 }
    );
  }
}
