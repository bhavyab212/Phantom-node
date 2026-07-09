'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DIAGNOSTIC_LINES = [
  { label: 'Initializing Core Systems', status: 'OK' },
  { label: 'Mounting DevOps Module', status: 'OK' },
  { label: 'Loading Security Layer', status: 'OK' },
  { label: 'Compiling Creative Drivers', status: 'OK' },
  { label: 'Establishing AI Integration Bridge', status: 'OK' },
  { label: 'Finalizing Environment', status: 'OK' },
];

export default function DiagnosticLog({ onComplete }: { onComplete?: () => void }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showOk, setShowOk] = useState(false);

  useEffect(() => {
    if (lineIndex >= DIAGNOSTIC_LINES.length) {
      if (onComplete) onComplete();
      return;
    }

    const currentLine = DIAGNOSTIC_LINES[lineIndex];

    if (charIndex < currentLine.label.length) {
      const timer = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, 20); // Fast typing speed
      return () => clearTimeout(timer);
    } else if (!showOk) {
      const timer = setTimeout(() => {
        setShowOk(true);
      }, 150); // Pause before fading in [ OK ]
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setLineIndex((prev) => prev + 1);
        setCharIndex(0);
        setShowOk(false);
      }, 200); // Pause before next line starts typing
      return () => clearTimeout(timer);
    }
  }, [lineIndex, charIndex, showOk, onComplete]);

  return (
    <div className="w-[500px] max-w-[90vw] font-mono text-[13px] text-gray-300 leading-tight">
      {DIAGNOSTIC_LINES.map((line, idx) => {
        const isCurrentLine = idx === lineIndex;
        const isPastLine = idx < lineIndex;
        
        if (idx > lineIndex) return null;

        const textToShow = isPastLine ? line.label : line.label.substring(0, charIndex);
        const okVisible = isPastLine || (isCurrentLine && showOk);

        return (
          <div key={idx} className="flex items-start mb-1">
            <div className="w-[70px] flex-shrink-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: okVisible ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="font-bold tracking-widest"
              >
                <span className="text-gray-500">[</span>
                <span className="text-[#4ADE80] mx-2">{line.status}</span>
                <span className="text-gray-500">]</span>
              </motion.div>
            </div>
            <div className="flex-1 relative">
              {textToShow}
              {isCurrentLine && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  className="inline-block w-[6px] h-[1em] bg-gray-300 align-middle ml-[2px] -mt-[2px]"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
