"use client";

import { useState } from "react";
import Image from "next/image";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";
import { PageTransition } from "@/components/PageTransition";

const DEFAULT_PROFILE_IMAGE = "/default-profile.jpg";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

const MenuItem = ({ icon, label, onClick, className = "" }: MenuItemProps) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between p-4 bg-white dark:bg-zinc-800 rounded-lg ${className}`}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span>{label}</span>
    </div>
    <span className="text-gray-400">›</span>
  </button>
);

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <PageTransition>
      <div className="min-h-screen p-4">
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-24 h-24 mb-4">
            <Image
              src={user.profileImage || DEFAULT_PROFILE_IMAGE}
              alt="프로필 이미지"
              fill
              className="rounded-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = DEFAULT_PROFILE_IMAGE;
              }}
            />
          </div>
          <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
          <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
        </div>

        <div className="space-y-4">
          <MenuItem
            icon={<UserCircleIcon className="w-6 h-6" />}
            label="프로필 편집"
          />
          <MenuItem icon={<Cog6ToothIcon className="w-6 h-6" />} label="설정" />
          <MenuItem
            icon={<ArrowRightEndOnRectangleIcon className="w-6 h-6" />}
            label={isLoading ? "로그아웃 중..." : "로그아웃"}
            onClick={handleLogout}
            className="text-red-500"
          />
        </div>
      </div>
    </PageTransition>
  );
}
