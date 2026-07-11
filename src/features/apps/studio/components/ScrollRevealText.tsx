'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ScrollRevealTextProps {
  children: React.ReactNode;
  className?: string;
  /** How far into the viewport (0–1) before revealing. Default: 0.12 (12% visible) */
  threshold?: number;
  /** Delay before the animation starts (ms). Default: 0 */
  delayMs?: number;
}

/**
 * ScrollRevealText
 *
 * Wraps paragraph blocks. Each instance fades + slides in as it crosses a scroll
 * threshold in the viewport. This is restraint-craft — the reveal should feel
 * like the page is "attentive to reading pace," not like a flashy entrance effect.
 *
 * - opacity 0 → 1 + translateY 12px → 0, 400ms
 * - Fires once per mount; does NOT re-trigger on scroll-back
 * - Respects prefers-reduced-motion: instant appearance
 */
export const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({
  children,
  className,
  threshold = 0.12,
  delayMs = 0,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const reveal = useCallback(() => setVisible(true), []);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reveal, threshold, prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: visible || prefersReducedMotion ? 1 : 0,
        transform:
          visible || prefersReducedMotion ? 'translateY(0)' : 'translateY(12px)',
        transition: prefersReducedMotion
          ? 'none'
          : `opacity 400ms ease-out ${delayMs}ms, transform 400ms ease-out ${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
};
