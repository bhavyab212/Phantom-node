'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SYSTEM_APPS } from '../data/apps';
import StartMenuSearch from './StartMenuSearch';
import StartMenuPinnedGrid from './StartMenuPinnedGrid';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAppSelect: (appId: string) => void;
}

export default function StartMenu({ isOpen, onClose, onAppSelect }: StartMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  const pinnedApps = useMemo(() => {
    return SYSTEM_APPS.filter(app => app.pinned);
  }, []);

  // Click outside listener
  useEffect(() => {
    if (!isOpen) return;
    
    const handlePointerDown = (e: PointerEvent) => {
      // Don't close if clicking inside the menu or on the taskbar (taskbar handles its own toggles)
      // Actually, standard behavior: clicking anywhere outside the menu should close it.
      // We will rely on e.target checking.
      const target = e.target as HTMLElement;
      
      // If clicking inside menu, do nothing
      if (menuRef.current && menuRef.current.contains(target)) return;
      
      // If clicking on Start button, let the Start button's own click handler toggle it
      // Otherwise they fight and the menu flickers. We can detect if it's the start button area roughly,
      // or just trust the Taskbar's Start Button handles event stopping.
      if (target.closest('[data-start-btn="true"]')) return;

      onClose();
    };

    // Use capture to catch it early
    document.addEventListener('pointerdown', handlePointerDown, true);
    
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true);
    };
  }, [isOpen, onClose]);

  // Escape key listener
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);



  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} // Premium fluid easing
          className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[640px] max-h-[75vh] flex flex-col bg-[#202020]/80 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] z-[60]"
        >
          {/* Internal content wrapper with scrolling if needed */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <StartMenuSearch isOpen={isOpen} />
            
            {/* Scrollable area for apps */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pb-6 flex flex-col gap-6">
              <StartMenuPinnedGrid apps={pinnedApps} onAppSelect={onAppSelect} />
              {/* <StartMenuAllApps apps={SYSTEM_APPS} onAppSelect={onAppSelect} /> */}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
