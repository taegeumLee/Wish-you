import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ success: true });
    response.cookies.set("userId", "", {
      expires: new Date(0),
      path: "/",
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "로그아웃 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
