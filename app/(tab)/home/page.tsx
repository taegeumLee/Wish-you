"use client";

import { useState, useEffect } from "react";
import { Card } from "@/app/(tab)/home/components/Card";
import { profiles } from "./data/profiles";

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let lastScrollTime = Date.now();

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const currentTime = Date.now();
      const timeDiff = currentTime - lastScrollTime;

      if (isScrolling || timeDiff < 500) return;
      if (Math.abs(e.deltaY) < 30) return;

      if (e.deltaY > 0 && currentIndex < profiles.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setIsScrolling(true);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
        setIsScrolling(true);
      }

      lastScrollTime = currentTime;
      setTimeout(() => setIsScrolling(false), 300);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentIndex, isScrolling]);

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
    <div className="h-screen overflow-hidden">
      <div
        className="h-screen transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateY(-${currentIndex * 100}%)` }}
      >
        {profiles.map((profile) => (
          <Card key={profile.id} {...profile} onSwipe={handleSwipe} />
        ))}
      </div>
    </div>
  );
}
