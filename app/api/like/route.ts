import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { targetUserId } = await req.json();
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다" },
        { status: 401 }
      );
    }

    const userIdInt = parseInt(userId);
    const targetUserIdInt = parseInt(targetUserId);

    if (userIdInt === targetUserIdInt) {
      return NextResponse.json(
        { error: "자기 자신에게 좋아요를 할 수 없습니다" },
        { status: 400 }
      );
    }

    const existingLike = await db.like.findFirst({
      where: {
        userId: userIdInt,
        targetUserId: targetUserIdInt,
      },
    });

    if (existingLike) {
      return NextResponse.json(
        { error: "이미 좋아요를 누른 사용자입니다" },
        { status: 400 }
      );
    }

    await db.like.create({
      data: {
        userId: userIdInt,
        targetUserId: targetUserIdInt,
      },
    });

    const likeCount = await db.like.count({
      where: {
        targetUserId: targetUserIdInt,
      },
    });

    return NextResponse.json({
      success: true,
      likeCount,
    });
  } catch (error) {
    console.error("좋아요 처리 중 상세 오류:", error);
    return NextResponse.json(
      { error: "좋아요 처리 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
