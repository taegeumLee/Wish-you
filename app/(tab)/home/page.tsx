"use client";

import { useState, useEffect } from "react";
import { Card } from "./components/Card";
import { profiles } from "./data/profiles";

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let lastScrollTime = Date.now();

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling || Date.now() - lastScrollTime < 500) return;
      if (Math.abs(e.deltaY) < 50) return;

      const nextIndex =
        e.deltaY > 0
          ? Math.min(currentIndex + 1, profiles.length - 1)
          : Math.max(currentIndex - 1, 0);

      if (nextIndex !== currentIndex) {
        setCurrentIndex(nextIndex);
        setIsScrolling(true);
        lastScrollTime = Date.now();
        setTimeout(() => setIsScrolling(false), 100);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentIndex, isScrolling, profiles.length]);

  const handleSwipe = async (direction: "left" | "right") => {
    setIsScrolling(true);

    await new Promise((resolve) => {
      setTimeout(() => {
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

  return (
    <div className="relative h-[calc(100vh-7rem)]">
      <div
        className="absolute inset-0 transition-transform duration-500 ease-in-out"
        style={{ transform: `translateY(-${currentIndex * 100}%)` }}
      >
        {profiles.map((profile, index) => (
          <div
            key={profile.id}
            className="absolute inset-0"
            style={{ transform: `translateY(${index * 100}%)` }}
          >
            <Card {...profile} onSwipe={handleSwipe} />
          </div>
        ))}
      </div>
    </div>
  );
}
