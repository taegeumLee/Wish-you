import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, memo } from "react";
import type { CardProps } from "@/types/profile";
import { useDrag } from "../hooks/useDrag";
import { CardOverlay } from "./cardsOverlay";
import { ProfileInfo } from "./profileInfo";

export const Card = memo(function Card({
  image,
  name,
  age,
  height,
  description,
  id,
  profileImage,
  onSwipe,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { dragStart, dragOffset, handlers } = useDrag({ onSwipe });

  return (
    <div className="w-full h-full flex items-center justify-center px-4">
      <div
        ref={cardRef}
        className="relative w-full max-w-md aspect-[4/6] rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing shadow-xl dark:border dark:border-white/20"
        {...handlers}
        style={{
          transform: `translateX(${dragOffset}px) rotate(${
            dragOffset * 0.05
          }deg)`,
          transition: dragStart ? "none" : "transform 0.3s ease-out",
        }}
      >
        <Image
          src={profileImage}
          alt={name}
          fill
          className="object-cover"
          priority
        />
        <CardOverlay dragOffset={dragOffset} />
        <ProfileInfo
          name={name}
          age={age}
          height={height}
          description={description}
        />
      </div>
    </div>
  );
});
