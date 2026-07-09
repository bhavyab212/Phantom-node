import { motion } from 'framer-motion';

interface StoryScrollProgressProps {
  progress: number; // 0 to 1
}

export function StoryScrollProgress({ progress }: StoryScrollProgressProps) {
  return (
    <div className="absolute top-0 right-0 w-1 h-full bg-white/5 overflow-hidden z-50 rounded-full">
      <motion.div 
        className="w-full bg-[var(--accent-color,#3b82f6)] origin-top"
        style={{ height: '100%', scaleY: progress }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.1 }}
      />
    </div>
  );
}
