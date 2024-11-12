"use client";

import { useState } from "react";
import Image from "next/image";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });
      if (response.ok) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen p-4">
      {/* 프로필 헤더 */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-24 h-24 mb-4">
          <Image
            src="/images/default-profile.jpg"
            alt="프로필 이미지"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold mb-1">사용자 이름</h1>
        <p className="text-gray-500 dark:text-gray-400">user@example.com</p>
      </div>

      {/* 프로필 메뉴 */}
      <div className="space-y-4">
        <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-zinc-800 rounded-lg">
          <div className="flex items-center gap-3">
            <UserCircleIcon className="w-6 h-6" />
            <span>프로필 편집</span>
          </div>
          <span className="text-gray-400">›</span>
        </button>

        <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-zinc-800 rounded-lg">
          <div className="flex items-center gap-3">
            <Cog6ToothIcon className="w-6 h-6" />
            <span>설정</span>
          </div>
          <span className="text-gray-400">›</span>
        </button>

        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="w-full flex items-center justify-between p-4 bg-white dark:bg-zinc-800 rounded-lg text-red-500"
        >
          <div className="flex items-center gap-3">
            <ArrowRightEndOnRectangleIcon className="w-6 h-6" />
            <span>{isLoading ? "로그아웃 중..." : "로그아웃"}</span>
          </div>
          <span className="text-gray-400">›</span>
        </button>
      </div>
    </div>
  );
}
