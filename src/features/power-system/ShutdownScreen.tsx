'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShutdownScreenProps {
  onPowerOn: () => void;
  onCancel?: () => void; // Kept for interface compatibility, though no longer used in this flow
}

const SHUTDOWN_LOG_LINES = [
  { status: "OK", text: "Stopping target User and Group Name Lookups." },
  { status: "OK", text: "Stopping target Remote File Systems." },
  { status: "OK", text: "Stopping target Network." },
  { status: "  ", text: "Stopping Network Manager..." },
  { status: "OK", text: "Stopped Network Manager." },
  { status: "OK", text: "Stopped AI Orchestration Agent." },
  { status: "OK", text: "Stopped DevOps Pipeline Services." },
  { status: "  ", text: "Stopping Docker Application Container Engine..." },
  { status: "OK", text: "Stopped Docker Application Container Engine." },
  { status: "OK", text: "Unmounted /data/models." },
  { status: "OK", text: "Unmounted /devops/workspace." },
  { status: "OK", text: "Reached target Unmount All Filesystems." },
  { status: "OK", text: "Stopped target Local File Systems (Pre)." },
  { status: "OK", text: "Stopped Create Static Device Nodes in /dev." },
  { status: "OK", text: "Reached target Shutdown." },
  { status: "OK", text: "Reached target Final Step." },
  { status: "  ", text: "Starting Power-Off..." }
];

export default function ShutdownScreen({ onPowerOn }: ShutdownScreenProps) {
  const [phase, setPhase] = useState<'animation' | 'log' | 'dead'>('animation');
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Phase 1: 0.79sec Animation
  useEffect(() => {
    if (phase === 'animation') {
      const timer = setTimeout(() => {
        setPhase('log');
      }, 790); // 0.79 seconds exactly as requested
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Phase 2: Line spawner for the log phase
  useEffect(() => {
    if (phase !== 'log') return;

    if (visibleLines >= SHUTDOWN_LOG_LINES.length) {
      const timer = setTimeout(() => {
        setPhase('dead');
      }, 3000);
      return () => clearTimeout(timer);
    }
    const delay = Math.random() * 80 + 100;
    const timer = setTimeout(() => {
      setVisibleLines(prev => prev + 1);
    }, delay);
    return () => clearTimeout(timer);
  }, [phase, visibleLines]);

  // Smooth scroll loop for log phase
  useEffect(() => {
    if (phase !== 'log') return;
    let animationFrameId: number;
    const smoothScroll = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const targetScroll = container.scrollHeight - container.clientHeight;
        const currentScroll = container.scrollTop;
        if (currentScroll < targetScroll) {
          container.scrollTop += (targetScroll - currentScroll) * 0.2 + 1;
        }
      }
      animationFrameId = requestAnimationFrame(smoothScroll);
    };
    smoothScroll();
    return () => cancelAnimationFrame(animationFrameId);
  }, [phase]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={`fixed inset-0 z-[9999] overflow-hidden ${phase !== 'animation' ? 'bg-black' : ''}`}
    >
      <AnimatePresence>
        
        {/* PHASE 1: ZZZ ANIMATION */}
        {phase === 'animation' && (
          <motion.div
            key="animation"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 pointer-events-none"
          >
            <style>{`
              .z-anim {
                position: absolute;
                font-size: 32px;
                opacity: 0;
                font-family: sans-serif;
                font-weight: bold;
                color: white;
                text-shadow: 0 4px 10px rgba(0,0,0,0.5);
              }
              .z-1 { animation: swayUpToRight 2s ease-out infinite; }
              .z-2 { animation: swayUpToRight 2s ease-out 0.5s infinite; }
              .z-3 { animation: swayUpToRight 2s ease-out 1s infinite; }
              .z-4 { animation: swayUpToRight 2s ease-out 1.5s infinite; }
              @keyframes swayUpToRight {
                0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
                100% { transform: translate(80px, -100px) rotate(30deg); opacity: 0; }
              }
            `}</style>
            
            {/* Positioned near the standard bottom-right power button */}
            <div className="absolute bottom-32 right-12">
              <div className="z-anim z-1">Z</div>
              <div className="z-anim z-2">Z</div>
              <div className="z-anim z-3">Z</div>
              <div className="z-anim z-4">Z</div>
            </div>
          </motion.div>
        )}

        {/* PHASE 2: LINUX SHUTDOWN LOG */}
        {phase === 'log' && (
          <motion.div 
            key="shutdown-log"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full bg-black relative text-[#D1D5DB] font-mono text-[13px] leading-tight"
          >
            {/* CRT Scanline Overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-50"
              style={{
                background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.03), rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)'
              }}
            />
            
            {/* Scrollable Container */}
            <div className="h-full w-full overflow-y-auto px-4 py-4 sm:px-6 relative z-10 no-scrollbar" ref={containerRef}>
              <div className="flex flex-col">
                {SHUTDOWN_LOG_LINES.slice(0, visibleLines).map((line, idx) => (
                  <div key={idx} className="flex space-x-3 mb-[2px]">
                    <span className={line.status === 'OK' ? "text-[#4ADE80] flex-shrink-0 whitespace-pre" : "text-[#D1D5DB] flex-shrink-0 whitespace-pre"}>
                      [ {line.status.padEnd(2, ' ')} ]
                    </span>
                    <span className="break-words w-full">
                      {line.text}
                    </span>
                  </div>
                ))}

                {visibleLines >= SHUTDOWN_LOG_LINES.length && (
                  <div className="mt-6 mb-4 flex items-center font-sans font-medium text-white text-base sm:text-lg tracking-wide">
                    Shutting down System
                    <span className="flex ml-[2px]">
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0 }}>.</motion.span>
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}>.</motion.span>
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}>.</motion.span>
                    </span>
                  </div>
                )}
                <div className="h-16 flex-shrink-0" />
              </div>
            </div>
          </motion.div>
        )}

        {/* PHASE 3: DEAD SCREEN */}
        {phase === 'dead' && (
          <motion.div 
            key="dead-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black pointer-events-auto cursor-default" 
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
