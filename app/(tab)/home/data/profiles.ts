import { Profile } from "@/types/profile";
import changukImg from "@/public/images/changuk.jpeg";
import seoyoungImg from "@/public/images/seoyoung.jpeg";
import seoungrokImg from "@/public/images/seoungrok.jpeg";
import taegeumImg from "@/public/images/taegeum.jpeg";
import ganghoImg from "@/public/images/gangho.jpeg";

const profiles: Profile[] = [
  {
    image: taegeumImg,
    id: 1,
    name: "이태금",
    age: 25,
    height: 173,
    description: "오늘은 뭐먹지?",
  },
  {
    image: seoyoungImg,
    id: 2,
    name: "윤서영",
    age: 27,
    height: 163,
    description: "오늘은 뭐먹지?",
  },
  {
    image: seoungrokImg,
    id: 3,
    name: "이성록",
    age: 26,
    height: 183,
    description: "오늘은 뭐먹지?",
  },
  {
    image: changukImg,
    id: 4,
    name: "지창욱",
    age: 32,
    height: 185,
    description: "오늘은 뭐먹지?",
  },
  {
    image: ganghoImg,
    id: 5,
    name: "이강호",
    age: 28,
    height: 176,
    description: "오늘은 뭐먹지?",
  },
] as const;

export { profiles };
