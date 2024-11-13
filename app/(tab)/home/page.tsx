"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./components/Card";
import { profiles } from "./data/profiles";
import { HiPaperAirplane } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa";

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const [showIcon, setShowIcon] = useState<"heart" | "chat" | null>(null);

  useEffect(() => {
    let lastScrollTime = Date.now();

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling || Date.now() - lastScrollTime < 500) return;
      if (Math.abs(e.deltaY) < 50) return;

      const isScrollingDown = e.deltaY > 0;
      setDirection(isScrollingDown ? "down" : "up");

      const nextIndex = isScrollingDown
        ? Math.min(currentIndex + 1, profiles.length - 1)
        : Math.max(currentIndex - 1, 0);

      if (nextIndex !== currentIndex) {
        setCurrentIndex(nextIndex);
        setIsScrolling(true);
        lastScrollTime = Date.now();
        setTimeout(() => setIsScrolling(false), 500);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentIndex, isScrolling, profiles.length]);

  const handleSwipe = async (direction: "left" | "right") => {
    setIsScrolling(true);
    setShowIcon(direction === "left" ? "heart" : "chat");

    await new Promise((resolve) => {
      setTimeout(() => {
        setShowIcon(null);
        if (direction === "left") {
          alert("좋아요를 보냈습니다! ❤️");
        } else {
          alert("채팅방으로 이동합니다! 💬");
        }
        resolve(null);
      }, 300);
    });

    if (currentIndex < profiles.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setTimeout(() => setIsScrolling(false), 500);
    }
  };

  const variants = {
    enter: (direction: "up" | "down") => ({
      y: direction === "down" ? 100 : -100,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: "up" | "down") => ({
      y: direction === "down" ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <div className="relative h-[calc(100vh-7rem)]">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.5,
          }}
        >
          <Card {...profiles[currentIndex]} onSwipe={handleSwipe} />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showIcon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.5 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl"
          >
            {showIcon === "heart" ? (
              <FaHeart className="text-red-500" />
            ) : (
              <HiPaperAirplane className="text-blue-400" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
