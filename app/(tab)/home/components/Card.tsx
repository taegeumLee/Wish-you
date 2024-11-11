import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import type { CardProps } from "@/types/profile";
import { useDrag } from "../hooks/useDrag";
import { CardOverlay } from "./cardsOverlay";
import { ProfileInfo } from "./profileInfo";

export function Card({
  image,
  name,
  age,
  height,
  description,
  onSwipe,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { dragStart, dragOffset, handlers } = useDrag({ onSwipe });

  return (
    <motion.div
      className="w-full h-screen flex items-center justify-center p-4"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: false, amount: 0.8 }}
    >
      <div
        ref={cardRef}
        className="relative w-full max-w-md aspect-[9/16] rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing"
        {...handlers}
        style={{
          transform: `translateX(${dragOffset}px) rotate(${
            dragOffset * 0.1
          }deg)`,
          transition: dragStart ? "none" : "transform 0.3s ease-out",
        }}
      >
        <Image src={image} alt={name} fill className="object-cover" priority />
        <CardOverlay dragOffset={dragOffset} />
        <ProfileInfo
          name={name}
          age={age}
          height={height}
          description={description}
        />
      </div>
    </motion.div>
  );
}
