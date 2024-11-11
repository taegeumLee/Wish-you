import { StaticImageData } from "next/image";

export interface Profile {
  image: StaticImageData;
  id: number;
  name: string;
  age: number;
  height: number;
  description: string;
}

export interface CardProps extends Profile {
  onSwipe: (direction: "left" | "right") => void;
}
