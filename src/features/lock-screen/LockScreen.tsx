'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Power, Unlock, Terminal, Layers, Shield, Cpu, Moon, RefreshCcw } from 'lucide-react';
import PowerMenu from '@/features/power-system/PowerMenu';

interface LockScreenProps {
  onUnlock?: () => void;
  onUnlockToApp?: (appId: string) => void;
  onSleep?: () => void;
  onRestart?: () => void;
  onShutdown?: () => void;
}

const APPS = [
  { id: 'devops', label: 'DevOps', icon: Terminal },
  { id: 'fullstack', label: 'Full-Stack', icon: Layers },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'ai', label: 'AI Integration', icon: Cpu },
];

export default function LockScreen({ onUnlock, onUnlockToApp, onSleep, onRestart, onShutdown }: LockScreenProps) {
  const [time, setTime] = useState<Date | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [background, setBackground] = useState<string>('/images/lock_screen_1.jpg');

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch('/api/wallpapers')
      .then(res => res.json())
      .then(data => {
        const lockscreens = data.lockscreens || [];
        if (lockscreens.length > 0) {
          const randomIndex = Math.floor(Math.random() * lockscreens.length);
          setBackground(`/api/image?file=${encodeURIComponent(lockscreens[randomIndex])}`);
        }
      })
      .catch(err => console.error('Failed to fetch lock screens', err));
  }, []);

  const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formatDate = (date: Date) => date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  const handleInteract = useCallback(() => {
    if (!isInteracting && !menuOpen) {
      setIsInteracting(true);
    }
  }, [isInteracting, menuOpen]);

  useEffect(() => {
    if (isInteracting || menuOpen) return;
    
    window.addEventListener('keydown', handleInteract);
    window.addEventListener('click', handleInteract);
    
    return () => {
      window.removeEventListener('keydown', handleInteract);
      window.removeEventListener('click', handleInteract);
    };
  }, [isInteracting, menuOpen, handleInteract]);

  useEffect(() => {
    if (!isInteracting) return;
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsInteracting(false);
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isInteracting]);

  return (
    <div 
      className="absolute inset-0 z-40 text-white flex flex-col overflow-hidden bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url('${background}')` }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInteracting ? 0.6 : 0.2 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black pointer-events-none z-0"
      />
      
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[50%] flex flex-col items-center justify-end pb-12 z-10 select-none pointer-events-none"
        initial={{ scale: 1, y: 0 }}
        animate={{ scale: isInteracting ? 0.85 : 1, y: isInteracting ? -40 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {time ? (
          <>
            <div className="text-[72px] sm:text-[96px] font-sans font-light tracking-tight leading-none drop-shadow-[0_4px_32px_rgba(0,0,0,0.5)]">
              {formatTime(time)}
            </div>
            <div className="text-lg sm:text-xl font-sans font-medium text-white/80 mt-4 drop-shadow-md">
              {formatDate(time)}
            </div>
          </>
        ) : (
          <div className="opacity-0">
            <div className="text-[72px] sm:text-[96px] font-sans font-light tracking-tight leading-none">00:00 AM</div>
            <div className="text-lg sm:text-xl font-sans font-medium mt-4">Loading...</div>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {isInteracting && (
          <div className="absolute top-[50%] left-0 right-0 flex flex-col items-center pt-8 z-20 pointer-events-none">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => { e.stopPropagation(); onUnlock?.(); }}
              className="flex items-center gap-3 bg-white/15 backdrop-blur-md px-8 py-3 rounded-full border border-white/10 hover:bg-white/25 transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)] active:scale-95 pointer-events-auto"
            >
              <Unlock className="w-5 h-5 text-white/90" />
              <span className="font-sans font-medium tracking-wide text-white/90">Unlock</span>
            </motion.button>

            <div className="flex gap-4 sm:gap-6 mt-10">
              {APPS.map((app, index) => (
                <motion.button
                  key={app.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: index * 0.08, ease: 'easeOut' }}
                  onClick={(e) => { e.stopPropagation(); onUnlockToApp?.(app.id); }}
                  className="group flex flex-col items-center gap-3 pointer-events-auto"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/5 group-hover:bg-white/20 transition-all shadow-lg active:scale-95">
                    <app.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white/70 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-sans text-white/50 group-hover:text-white/90 transition-colors tracking-wide">
                    {app.label}
                  </span>
                </motion.button>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: 0.4, ease: 'easeOut' }}
              className="mt-12 flex gap-4 pointer-events-auto"
            >
              <button 
                className="w-10 h-10 bg-white/5 backdrop-blur-md border border-white/5 rounded-full flex items-center justify-center hover:bg-white/15 hover:text-blue-300 transition-colors shadow-lg active:scale-95 text-white/60" 
                title="Sleep"
                onClick={(e) => { e.stopPropagation(); onSleep?.(); }}
              >
                <Moon className="w-4 h-4" />
              </button>
              <button 
                className="w-10 h-10 bg-white/5 backdrop-blur-md border border-white/5 rounded-full flex items-center justify-center hover:bg-white/15 hover:text-green-300 transition-colors shadow-lg active:scale-95 text-white/60" 
                title="Restart"
                onClick={(e) => { e.stopPropagation(); onRestart?.(); }}
              >
                <RefreshCcw className="w-4 h-4" />
              </button>
              <button 
                className="w-10 h-10 bg-white/5 backdrop-blur-md border border-white/5 rounded-full flex items-center justify-center hover:bg-white/15 hover:text-red-400 transition-colors shadow-lg active:scale-95 text-white/60" 
                title="Shut Down"
                onClick={(e) => { e.stopPropagation(); onShutdown?.(); }}
              >
                <Power className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div 
        className="absolute bottom-0 w-full p-6 sm:p-8 flex items-end justify-between pointer-events-none z-10"
        animate={{ opacity: isInteracting ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:px-5 sm:py-4 max-w-sm pointer-events-auto shadow-lg border border-white/5">
          <p className="font-sans font-medium text-sm sm:text-base text-white/90">
            AI-powered DevOps & automation
          </p>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 bottom-10 whitespace-nowrap">
          <p className="font-sans text-xs sm:text-sm text-white/40 tracking-wider">
            Click anywhere or press any key to unlock
          </p>
        </div>

        <div className="relative pointer-events-auto">
          <button 
            onClick={(e) => { e.stopPropagation(); setMenuOpen(true); }}
            className="bg-white/10 backdrop-blur-md border border-white/5 w-11 h-11 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors shadow-lg"
          >
            <Power className="w-5 h-5 text-white/80" />
          </button>
          
          <PowerMenu 
            isOpen={menuOpen} 
            onClose={() => setMenuOpen(false)} 
            onSleep={() => onSleep?.()}
            onRestart={() => onRestart?.()}
            onShutdown={() => onShutdown?.()}
          />
        </div>
      </motion.div>
    </div>
  );
}
