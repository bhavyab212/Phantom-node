'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface KineticHeadlineProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  /** 'lines' splits on newline chars; 'words' splits every word. Default: 'lines' */
  splitBy?: 'lines' | 'words';
  /** Base element tag. Default: 'h1' */
  as?: React.ElementType;
  /** Stagger delay between each unit (ms). Default: 50 */
  staggerMs?: number;
  /** Animation duration per unit (ms). Default: 500 */
  durationMs?: number;
}

/**
 * KineticHeadline
 *
 * Splits headline text into lines (or words) and reveals each with a staggered
 * translateY + opacity animation as the element enters the viewport.
 *
 * Behavior:
 * - Uses IntersectionObserver — fires once per mount, does NOT re-trigger on scroll-back
 * - Easing: cubic-bezier(0.16, 1, 0.3, 1) — crisp deceleration, not bouncy
 * - Respects prefers-reduced-motion: text appears immediately, no stagger
 *
 * Usage:
 *   <KineticHeadline text="We don't sell\nautomation." splitBy="lines" as="h1" />
 */
export const KineticHeadline: React.FC<KineticHeadlineProps> = ({
  text,
  splitBy = 'lines',
  as: Tag = 'h1',
  className,
  style,
  staggerMs = 50,
  durationMs = 500,
  ...rest
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  // Check reduced-motion preference once
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const units = splitBy === 'words' ? text.split(/\s+/) : text.split('\n');

  const handleReveal = useCallback(() => {
    setRevealed(true);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReducedMotion) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleReveal();
          observer.disconnect(); // fire once only
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [handleReveal, prefersReducedMotion]);

  return (
    <Tag ref={containerRef} className={cn('overflow-hidden', className)} style={style} aria-label={text} {...rest}>
      {units.map((unit, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: splitBy === 'words' ? 'inline-block' : 'block',
            marginRight: splitBy === 'words' ? '0.25em' : undefined,
            // Initial state
            opacity: revealed || prefersReducedMotion ? 1 : 0,
            transform:
              revealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(22px)',
            transition: prefersReducedMotion
              ? 'none'
              : `opacity ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${i * staggerMs}ms, transform ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${i * staggerMs}ms`,
          }}
        >
          {unit}
          {splitBy === 'words' && i < units.length - 1 ? '' : ''}
        </span>
      ))}
    </Tag>
  );
};
