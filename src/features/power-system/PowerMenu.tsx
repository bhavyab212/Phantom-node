'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Moon, RotateCcw, Power } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface PowerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSleep: () => void;
  onRestart: () => void;
  onShutdown: () => void;
}

export default function PowerMenu({ isOpen, onClose, onSleep, onRestart, onShutdown }: PowerMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    // Slight delay so the click that opened it doesn't immediately close it
    const t = setTimeout(() => {
      window.addEventListener('click', handleClickOutside);
    }, 10);
    
    return () => {
      clearTimeout(t);
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute bottom-16 right-0 w-48 bg-black/40 backdrop-filter backdrop-blur-3xl border border-white/10 rounded-xl p-2 shadow-2xl z-50 flex flex-col gap-1 pointer-events-auto"
        >
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); onSleep(); }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/15 transition-colors text-white/90 text-sm font-medium w-full text-left"
          >
            <Moon className="w-4 h-4 text-blue-300" />
            Sleep
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); onRestart(); }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/15 transition-colors text-white/90 text-sm font-medium w-full text-left"
          >
            <RotateCcw className="w-4 h-4 text-green-300" />
            Restart
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); onShutdown(); }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/15 transition-colors text-white/90 text-sm font-medium w-full text-left"
          >
            <Power className="w-4 h-4 text-red-400" />
            Shut Down
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
