import { HiOutlinePaperAirplane } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa";

interface CardOverlayProps {
  dragOffset: number;
}

export function CardOverlay({ dragOffset }: CardOverlayProps) {
  const getOverlayStyle = () => {
    if (dragOffset === 0) return {};
    const opacity = Math.min(Math.abs(dragOffset) / 200, 0.8);
    return dragOffset > 0
      ? {
          background: `linear-gradient(to right, transparent, rgba(59, 130, 246, ${opacity}))`,
        }
      : {
          background: `linear-gradient(to left, transparent, rgba(236, 72, 153, ${opacity}))`,
        };
  };

  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
      <div
        className="absolute inset-0 transition-opacity duration-200"
        style={getOverlayStyle()}
      >
        {dragOffset !== 0 && (
          <div
            className={`absolute top-1/2 -translate-y-1/2 ${
              dragOffset > 0 ? "right-8" : "left-8"
            } text-neutral-300 text-2xl font-bold transition-opacity duration-200`}
          >
            {dragOffset > 0 ? (
              <HiOutlinePaperAirplane className="rotate-45" />
            ) : (
              <FaRegHeart />
            )}
          </div>
        )}
      </div>
    </>
  );
}
