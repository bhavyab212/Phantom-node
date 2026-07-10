'use client';

import { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface WakeScreenProps {
  onComplete?: () => void;
}

export default function WakeScreen({ onComplete }: WakeScreenProps) {
  // Skip logic: any key or click jumps to desktop
  const skip = useCallback(() => {
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    window.addEventListener('keydown', skip);
    window.addEventListener('click', skip);
    return () => {
      window.removeEventListener('keydown', skip);
      window.removeEventListener('click', skip);
    };
  }, [skip]);

  // Handle completion sequence (400ms glow + 150ms wait = 550ms total)
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 550);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#000000] flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-[100%] h-[100%] sm:w-[80%] sm:h-[80%] max-w-[1200px] max-h-[1200px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 65%)'
        }}
      />
    </div>
  );
}

