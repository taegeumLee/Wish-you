import { useState } from "react";

interface UseDragProps {
  onSwipe: (direction: "left" | "right") => void;
  threshold?: number;
}

export function useDrag({ onSwipe, threshold = 100 }: UseDragProps) {
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  const handleTouchStart = (e: TouchEvent | React.TouchEvent) => {
    setDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent | React.TouchEvent) => {
    if (dragStart === null) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - dragStart;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (Math.abs(dragOffset) > threshold) {
      onSwipe(dragOffset > 0 ? "right" : "left");
    }
    setDragStart(null);
    setDragOffset(0);
  };

  const handleMouseDown = (e: MouseEvent | React.MouseEvent) => {
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent | React.MouseEvent) => {
    if (dragStart === null) return;
    const currentX = e.clientX;
    const diff = currentX - dragStart;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (Math.abs(dragOffset) > threshold) {
      onSwipe(dragOffset > 0 ? "right" : "left");
    }
    setDragStart(null);
    setDragOffset(0);
  };

  const handleMouseLeave = () => {
    setDragStart(null);
    setDragOffset(0);
  };

  return {
    dragStart,
    dragOffset,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
    },
  };
}
