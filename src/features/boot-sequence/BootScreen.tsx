'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ANIM_BG = {
  duration: 0.4,
  ease: 'easeIn',
  delay: 0.75, // Halved the wait time
} as const;

const ANIM_LOGO = {
  duration: 0.8,
  ease: 'easeOut',
  delay: 1.2, // Starts fading in right after background goes black
} as const;

const ANIM_PROGRESS = {
  duration: 0.5,
  delay: 1.4, // Shortly after logo
};

interface BootScreenProps {
  onBootComplete?: () => void;
}

export default function BootScreen({ onBootComplete }: BootScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Wait until the progress bar container is visible before starting the fill sequence
    const initialWait = setTimeout(() => {
      const t1 = setTimeout(() => setProgress(20), 100);
      const t2 = setTimeout(() => setProgress(45), 500); // 100 + 400ms hold
      const t3 = setTimeout(() => setProgress(70), 800); // 500 + 300ms hold
      const t4 = setTimeout(() => setProgress(100), 1050); // 800 + 250ms hold
      
      const t5 = setTimeout(() => {
        if (onBootComplete) onBootComplete();
      }, 1350); // 1050 + 300ms wait at 100%

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
      };
    }, ANIM_PROGRESS.delay * 1000);

    return () => clearTimeout(initialWait);
  }, [onBootComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: ANIM_BG.duration, ease: ANIM_BG.ease, delay: ANIM_BG.delay }}
      className="fixed inset-0 z-[9999] bg-[#000000] flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ 
          opacity: 0, 
          scale: 0.9, 
          filter: 'blur(8px) drop-shadow(0px 0px 0px rgba(255,255,255,0))' 
        }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          filter: 'blur(0px) drop-shadow(0px 0px 20px rgba(255,255,255,0.6))' 
        }}
        transition={{ 
          duration: ANIM_LOGO.duration, 
          ease: ANIM_LOGO.ease, 
          delay: ANIM_LOGO.delay 
        }}
        className="mb-8"
      >
        <img src="/images/boot-logo.png?v=2" alt="Phantom Node Boot Logo" className="w-32 h-auto" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: ANIM_PROGRESS.duration, delay: ANIM_PROGRESS.delay }}
        className="flex flex-col items-center"
      >
        <div className="w-[200px] h-[2px] rounded-full bg-white/10 overflow-hidden">
          <motion.div 
            className="h-full bg-white rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          />
        </div>
        <div className="text-gray-400 font-mono text-[11px] mt-3 tracking-widest">
          {progress}%
        </div>
      </motion.div>
    </motion.div>
  );
}
