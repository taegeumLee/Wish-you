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
      if (isScrolling || Date.now() - lastScrollTime < 1000) return;
      if (Math.abs(e.deltaY) < 50) return;

      const nextIndex =
        e.deltaY > 0
          ? Math.min(currentIndex + 1, profiles.length - 1)
          : Math.max(currentIndex - 1, 0);

      if (nextIndex !== currentIndex) {
        setCurrentIndex(nextIndex);
        setIsScrolling(true);
        lastScrollTime = Date.now();
        setTimeout(() => setIsScrolling(false), 1000);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentIndex, isScrolling, profiles.length]);

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left") {
      alert("좋아요를 보냈습니다! ❤️");
    } else {
      alert("채팅방으로 이동합니다! 💬");
    }

    if (currentIndex < profiles.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="relative h-[calc(100vh-7rem)]">
      <div
        className="h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateY(-${currentIndex * 100}%)` }}
      >
        {profiles.map((profile) => (
          <Card key={profile.id} {...profile} onSwipe={handleSwipe} />
        ))}
      </div>
    </div>
  );
}
