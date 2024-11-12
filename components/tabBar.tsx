"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon as HomeIconOutline } from "@heroicons/react/24/outline";
import { HomeIcon as HomeIconSolid } from "@heroicons/react/24/solid";

import { UserIcon as UserIconOutline } from "@heroicons/react/24/outline";
import { UserIcon as UserIconSolid } from "@heroicons/react/24/solid";

import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

import { GlobeAltIcon as GlobeIconSolid } from "@heroicons/react/24/solid";
import { GlobeAltIcon as GlobeIconOutline } from "@heroicons/react/24/outline";
import { PlusIcon as PlusIconOutline } from "@heroicons/react/24/outline";
import { PlusIcon as PlusIconSolid } from "@heroicons/react/24/solid";

type NavItemProps = {
  href: string;
  SolidIcon: React.ElementType;
  OutlineIcon: React.ElementType;
};

const NavItem = ({ href, SolidIcon, OutlineIcon }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="p-3.5">
      {isActive ? (
        <SolidIcon className="size-8 text-black dark:text-white" />
      ) : (
        <OutlineIcon className="size-8 text-black/70 dark:text-white/70" />
      )}
    </Link>
  );
};

const navigationItems = [
  { href: "/home", SolidIcon: HomeIconSolid, OutlineIcon: HomeIconOutline },
  { href: "/feed", SolidIcon: GlobeIconSolid, OutlineIcon: GlobeIconOutline },
  { href: "/add", SolidIcon: PlusIconSolid, OutlineIcon: PlusIconOutline },
  { href: "/like", SolidIcon: HeartIconSolid, OutlineIcon: HeartIconOutline },
  { href: "/profile", SolidIcon: UserIconSolid, OutlineIcon: UserIconOutline },
];

export default function TabBar() {
  return (
    <nav className="flex w-full fixed bottom-0 bg-white pb-6 dark:bg-neutral-900 border-t rounded-t-lg border-neutral-200 dark:border-neutral-800 justify-between items-center px-3 py-1">
      {navigationItems.map((item) => (
        <NavItem key={item.href} {...item} />
      ))}
    </nav>
  );
}
