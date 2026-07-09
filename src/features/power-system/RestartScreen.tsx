'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCw } from 'lucide-react';

interface RestartScreenProps {
  onRestartComplete: () => void;
}

export default function RestartScreen({ onRestartComplete }: RestartScreenProps) {
  useEffect(() => {
    const t = setTimeout(() => {
      onRestartComplete();
    }, 1500);
    return () => clearTimeout(t);
  }, [onRestartComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-[#000000] flex flex-col items-center justify-center gap-6"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, ease: 'linear', repeat: Infinity }}
      >
        <RotateCw className="w-8 h-8 text-white/80" />
      </motion.div>
      <div className="font-sans text-sm text-white/60 tracking-wider">
        Restarting...
      </div>
    </motion.div>
  );
}
