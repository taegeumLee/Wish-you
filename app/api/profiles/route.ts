import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const profiles = await db.user.findMany({
      select: {
        id: true,
        name: true,
        age: true,
        height: true,
        description: true,
        profileImage: true,
      },
      where: {
        NOT: {
          age: null,
          height: null,
          description: null,
        },
      },
    });

    return NextResponse.json(profiles);
  } catch (error) {
    console.error("프로필 조회 중 오류 발생:", error);
    return NextResponse.json(
      { error: "프로필을 가져오는데 실패했습니다" },
      { status: 500 }
    );
  }
}
