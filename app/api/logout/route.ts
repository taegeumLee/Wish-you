import { NextResponse } from "next/server";

export async function POST() {
  try {
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "로그아웃 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
