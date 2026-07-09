'use client';

import { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface SleepScreenProps {
  onWake: () => void;
}

export default function SleepScreen({ onWake }: SleepScreenProps) {
  const wake = useCallback(() => {
    onWake();
  }, [onWake]);

  useEffect(() => {
    window.addEventListener('keydown', wake);
    window.addEventListener('click', wake);
    return () => {
      window.removeEventListener('keydown', wake);
      window.removeEventListener('click', wake);
    };
  }, [wake]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center"
    >
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
        className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
      />
    </motion.div>
  );
}
