'use client';

import { motion } from 'framer-motion';

interface TabConflictOverlayProps {
  onReclaim: () => void;
}

export default function TabConflictOverlay({ onReclaim }: TabConflictOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[99999] bg-black/40 backdrop-blur-xl flex items-center justify-center pointer-events-auto"
    >
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 flex flex-col items-center gap-6 shadow-2xl max-w-sm w-full mx-4">
        <div className="text-white text-xl tracking-wide font-light text-center">
          Opened in another tab
        </div>
        <button
          onClick={onReclaim}
          className="px-6 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-colors border border-white/20 font-medium tracking-wide active:scale-95 w-full shadow-inner"
        >
          Use Here
        </button>
      </div>
    </motion.div>
  );
}
