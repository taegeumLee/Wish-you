import { StaticImageData } from "next/image";
import Image from "next/image";

interface CardProps {
  image: StaticImageData;
  id: number;
  name: string;
  age: number;
  height: number;
  description: string;
}

export function Card({ image, id, name, age, height, description }: CardProps) {
  return (
    <div className="relative w-full h-full">
      <Image src={image} alt={name} fill className="object-cover" />
      {/* 기타 카드 내용 */}
    </div>
  );
}
