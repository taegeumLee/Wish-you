import { motion } from "framer-motion";

interface ProfileInfoProps {
  name: string;
  age: number;
  height: number;
  description: string;
}

export function ProfileInfo({
  name,
  age,
  height,
  description,
}: ProfileInfoProps) {
  return (
    <motion.div
      className="absolute bottom-8 left-0 w-full px-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-3xl font-bold text-white mb-2">{name}</h2>
      <div className="flex gap-4">
        <span className="text-white/90 text-lg">{age}세</span>
        <span className="text-white/90 text-lg">{height}cm</span>
      </div>
      <p className="text-white/90 text-sm">{description}</p>
    </motion.div>
  );
}
