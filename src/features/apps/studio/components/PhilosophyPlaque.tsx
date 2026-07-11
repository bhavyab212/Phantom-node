'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { NeumorphicControl } from '@/features/native-app-shell';
import type { Principle } from '../content/studio-copy';

interface PhilosophyPlaqueProps {
  principle: Principle;
  /** Alignment determines zigzag direction. 'left' = more right padding; 'right' = more left padding */
  align: 'left' | 'right';
  /** Entry delay for scroll-reveal stagger */
  delayMs?: number;
  className?: string;
}

/**
 * PhilosophyPlaque
 *
 * A neumorphic raised surface with an oversized numeral watermark.
 * The number is a structural typographic device — positioned large behind the title,
 * low-opacity, not decoration.
 *
 * Layout behavior:
 * - align="left": plaque sits left-weighted, extra right margin
 * - align="right": plaque sits right-weighted, extra left margin
 * - At compact width: full-width, alignment resets; numeral watermark stays
 *
 * Hover: translateY(-2px) + deeper shadow — physical lift, not bouncy.
 * Scroll reveal: number scales from 0.9 → 1 + opacity 0 → 1, staggered per plaque.
 */
export const PhilosophyPlaque: React.FC<PhilosophyPlaqueProps> = ({
  principle,
  align,
  delayMs = 0,
  className,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [hovered, setHovered] = useState(false);

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const reveal = useCallback(() => setRevealed(true), []);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reveal, prefersReducedMotion]);

  const isReady = revealed || prefersReducedMotion;

  return (
    <div
      ref={ref}
      className={cn(
        // Zigzag margin logic — asymmetric, not centered
        'w-full',
        // At md+: align determines which side gets the offset indent
        align === 'left'
          ? 'md:pr-[15%] lg:pr-[20%]'
          : 'md:pl-[15%] lg:pl-[20%]',
        className
      )}
      style={{
        opacity: isReady ? 1 : 0,
        transform: isReady ? 'translateY(0)' : 'translateY(16px)',
        transition: prefersReducedMotion
          ? 'none'
          : `opacity 500ms ease-out ${delayMs}ms, transform 500ms ease-out ${delayMs}ms`,
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          transform: !prefersReducedMotion && hovered ? 'translateY(-2px)' : 'translateY(0)',
          transition: 'transform 200ms ease-out',
        }}
      >
        <NeumorphicControl
          raised={!hovered}
          pressed={false}
          rounded="lg"
          className="relative p-7 md:p-8 overflow-hidden"
          style={{
            // Deepen shadow on hover for physical lift feel
            boxShadow: hovered
              ? 'var(--neu-shadow-dark-raised), 0 8px 24px rgba(0,0,0,0.25)'
              : undefined,
          }}
        >
          {/* Oversized numeral watermark — structural device, not decoration */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-0.1em',
              right: '0.1em',
              fontSize: 'clamp(6rem, 14vw, 10rem)',
              lineHeight: 1,
              fontWeight: 900,
              color: 'var(--color-text)',
              opacity: 0.04,
              userSelect: 'none',
              pointerEvents: 'none',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.04em',
              transform: isReady ? 'scale(1)' : 'scale(0.9)',
              transition: prefersReducedMotion
                ? 'none'
                : `transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs + 100}ms`,
            }}
          >
            {principle.number}
          </span>

          {/* Content */}
          <div className="relative z-10">
            <p
              className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase mb-3"
              style={{ color: 'var(--color-accent)', opacity: 0.8 }}
            >
              {principle.number}
            </p>
            <h3
              className="text-xl font-bold tracking-tight mb-3 leading-snug"
              style={{ color: 'var(--color-text)' }}
            >
              {principle.title}
            </h3>
            <p
              className="text-sm leading-[1.75] max-w-[52ch]"
              style={{ color: 'var(--color-text)', opacity: 0.65 }}
            >
              {principle.description}
            </p>
          </div>
        </NeumorphicControl>
      </div>
    </div>
  );
};
