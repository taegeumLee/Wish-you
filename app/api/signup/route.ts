import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { email, password, ...rest } = data;

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "이미 사용 중인 이메일입니다" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const defaultProfileImage = "/images/default-profile.jpg";

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

    // 회원가입 성공 시 쿠키 설정
    const response = NextResponse.json({ success: true, user });
    response.cookies.set("userId", String(user.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7일
    });

    return response;
  } catch (error) {
    console.error("회원가입 오류:", error);
    return NextResponse.json(
      { error: "회원가입 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
