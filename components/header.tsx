"use client";

import Link from "next/link";
import { BellIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <header className="fixed top-0 w-full max-w-md bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 z-50">
      <div className="flex justify-between items-center px-5 h-14">
        <Link
          href="/home"
          className="text-2xl font-bold text-black dark:text-white"
        >
          MinsTaegram
        </Link>
        <div className="flex items-center gap-4">
          <button className="p-2">
            <BellIcon className="size-6 text-black dark:text-white" />
          </button>
          <button className="p-2">
            <Link href="/chat">
              <PaperAirplaneIcon className="size-6 text-black dark:text-white rotate-45" />
            </Link>
          </button>
        </div>
      </div>
    </header>
  );
}
