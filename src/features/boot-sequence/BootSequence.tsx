'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FastBootLog from './FastBootLog';

// ─── Stage machine ─────────────────────────────────────────────────────────────
// splash → bootlog → progress → flash → done
type Stage = 'splash' | 'bootlog' | 'progress' | 'flash' | 'done';

interface BootSequenceProps {
  onSequenceComplete?: () => void;
}

// ─── Progress steps (uneven bursts feel authentic) ─────────────────────────────
const PROGRESS_STEPS = [
  { value: 20,  delay: 150 },
  { value: 45,  delay: 600 },
  { value: 70,  delay: 950 },
  { value: 100, delay: 1250 },
];

export default function BootSequence({ onSequenceComplete }: BootSequenceProps) {
  const [stage, setStage]       = useState<Stage>('splash');
  const [progress, setProgress] = useState(0);

  // ── Skip: any keypress or click jumps immediately to done ──────────────────
  const skip = useCallback(() => {
    setStage('done');
    onSequenceComplete?.();
  }, [onSequenceComplete]);

  useEffect(() => {
    window.addEventListener('keydown', skip);
    window.addEventListener('click',   skip);
    return () => {
      window.removeEventListener('keydown', skip);
      window.removeEventListener('click',   skip);
    };
  }, [skip]);

  // ── Stage: splash — hold for 2.4s then transition to bootlog ──────────────
  useEffect(() => {
    if (stage !== 'splash') return;
    const t = setTimeout(() => setStage('bootlog'), 2400);
    return () => clearTimeout(t);
  }, [stage]);

  // ── Stage: bootlog → progress (driven by FastBootLog onComplete) ───────────
  const handleLogComplete = useCallback(() => {
    setStage('progress');
  }, []);

  // ── Stage: progress fill sequence ──────────────────────────────────────────
  useEffect(() => {
    if (stage !== 'progress') return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    PROGRESS_STEPS.forEach(({ value, delay }) => {
      timers.push(setTimeout(() => setProgress(value), delay));
    });
    // Hold at 100% for 400ms then flash
    timers.push(setTimeout(() => setStage('flash'), 1650));
    return () => timers.forEach(clearTimeout);
  }, [stage]);

  // ── Stage: flash → done ────────────────────────────────────────────────────
  useEffect(() => {
    if (stage !== 'flash') return;
    const t = setTimeout(() => {
      setStage('done');
      onSequenceComplete?.();
    }, 450);
    return () => clearTimeout(t);
  }, [stage, onSequenceComplete]);

  if (stage === 'done') return null;

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          STAGE 1 — Agency WebOS Splash
          Full-screen centered branding, pure black, fades out when bootlog starts
      ══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'splash' && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9999] bg-[#000000] flex flex-col items-center justify-center"
          >
            {/* Agency name */}
            <motion.h1
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
              className="text-white font-mono text-5xl sm:text-6xl tracking-[0.2em] select-none"
              style={{ textShadow: '0 0 40px rgba(255,255,255,0.5), 0 0 80px rgba(255,255,255,0.2)' }}
            >
              Agency WebOS
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-gray-500 font-mono text-sm tracking-[0.35em] mt-4 uppercase select-none"
            >
              Initializing System
            </motion.p>

            {/* Thin pulsing line under tagline */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.4 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 1.1 }}
              className="mt-6 h-[1px] w-48 bg-white origin-left"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════════════
          STAGE 2 — Full-screen Linux Boot Log
          Covers the entire viewport, no scrollbar, slightly slower line speed
      ══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'bootlog' && (
          <motion.div
            key="bootlog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[9999]" // true full-screen
          >
            <FastBootLog embedded onComplete={handleLogComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════════════
          STAGE 3 — Logo + Progress Bar
          Black screen returns, centred LOGO + stepped fill bar
      ══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {(stage === 'progress' || stage === 'flash') && (
          <motion.div
            key="progress-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9999] bg-[#000000] flex flex-col items-center justify-center gap-10"
          >
            {/* LOGO */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="text-white font-mono text-[52px] tracking-widest select-none"
              style={{ textShadow: '0 0 30px rgba(255,255,255,0.6), 0 0 60px rgba(255,255,255,0.25)' }}
            >
              LOGO
            </motion.div>

            {/* Progress bar + percentage */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-[240px] h-[2px] rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
              <span className="text-gray-500 font-mono text-[11px] tracking-[0.3em]">
                {progress}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════════════
          FLASH — White wipe on top of everything (z-[10000])
      ══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'flash' && (
          <motion.div
            key="flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[10000] bg-white pointer-events-none"
          />
        )}
      </AnimatePresence>
    </>
  );
}
