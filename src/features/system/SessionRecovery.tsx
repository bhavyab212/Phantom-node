'use client';

import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface SessionRecoveryProps {
  children: ReactNode;
}

export default function SessionRecovery({ children }: SessionRecoveryProps) {
  const [isRestoring, setIsRestoring] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const persisted = localStorage.getItem('webos-windows');
      if (persisted) {
        const parsed = JSON.parse(persisted);
        const windows = parsed?.state?.windows || [];
        // Only trigger session restore screen if there are windows to restore
        if (windows.length > 0) {
          setIsRestoring(true);
          const timer = setTimeout(() => {
            setIsRestoring(false);
          }, 750); // Show premium restore screen for 750ms
          return () => clearTimeout(timer);
        }
      }
    } catch (e) {
      console.error('Failed to parse persisted windows state. Starting clean.', e);
      localStorage.removeItem('webos-windows');
    }
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 bg-[#0c0f16]" />;
  }

  return (
    <>
      <AnimatePresence>
        {isRestoring && (
          <motion.div
            key="restore-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 bg-[#0c0f16] flex flex-col items-center justify-center z-[999] select-none"
          >
            {/* Glowing blur background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-blue-500/10 blur-[80px] pointer-events-none" />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4, ease: 'easeOut' }}
              className="flex flex-col items-center text-center relative z-10"
            >
              <div className="relative mb-6 flex items-center justify-center">
                {/* Windows 11 style elegant circular loading ring */}
                <div className="w-16 h-16 rounded-full border-4 border-white/5 border-t-blue-500 animate-spin" />
              </div>

              <h2 className="text-xl font-medium tracking-wide text-white/90 font-sans mb-1 animate-pulse">
                Restoring your session
              </h2>
              <p className="text-xs text-white/40 tracking-wider font-mono">
                PLEASE WAIT
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={isRestoring ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: isRestoring ? 0.3 : 0 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </>
  );
}
