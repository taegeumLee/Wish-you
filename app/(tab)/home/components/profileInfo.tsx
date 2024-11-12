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
      className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/50 to-transparent"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="px-6 pb-8">
        <h2 className="text-3xl font-bold text-white mb-2">{name}</h2>
        <div className="flex gap-4 mb-2">
          <span className="text-white/90 text-lg font-medium">{age}세</span>
          <span className="text-white/90 text-lg font-medium">{height}cm</span>
        </div>
        <p className="text-white/80 text-base leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
