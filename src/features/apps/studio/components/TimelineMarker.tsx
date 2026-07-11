'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import type { TimelineEntry } from '../content/studio-copy';

interface TimelineMarkerProps {
  entry: TimelineEntry;
  index: number;
  total: number;
  /** 0–1 fill progress for the connecting line below this marker */
  fillProgress: number;
  isLast: boolean;
  className?: string;
}

/**
 * TimelineMarker
 *
 * A neumorphic dot node on a vertical track.
 * The connecting line below each marker fills with accent color as the user scrolls
 * through the timeline section — a scroll-scrubbed progress-reveal.
 *
 * Layout:
 * - Dot positioned to left of text block
 * - Short date/milestone label above body text
 * - Reads like someone's honest build log, not a corporate infographic
 */
export const TimelineMarker: React.FC<TimelineMarkerProps> = ({
  entry,
  index,
  total,
  fillProgress,
  isLast,
  className,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [nodeVisible, setNodeVisible] = useState(false);

  useEffect(() => {
    const el = nodeRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setNodeVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const clampedFill = Math.min(1, Math.max(0, fillProgress));

  return (
    <div
      ref={nodeRef}
      className={cn('flex gap-5 md:gap-7 relative', className)}
      style={{
        opacity: nodeVisible || prefersReducedMotion ? 1 : 0,
        transform: nodeVisible || prefersReducedMotion ? 'translateX(0)' : 'translateX(-8px)',
        transition: prefersReducedMotion
          ? 'none'
          : `opacity 450ms ease-out ${index * 80}ms, transform 450ms ease-out ${index * 80}ms`,
      }}
    >
      {/* Left gutter: dot + connecting line */}
      <div className="flex flex-col items-center flex-shrink-0 pt-0.5" style={{ width: 20 }}>
        {/* Neumorphic dot */}
        <div
          className="rounded-full flex-shrink-0 relative z-10"
          style={{
            width: 14,
            height: 14,
            background: clampedFill > 0 ? 'var(--color-accent)' : 'var(--color-surface-2)',
            boxShadow: clampedFill > 0
              ? '0 0 0 3px color-mix(in oklch, var(--color-accent) 20%, transparent), var(--neu-shadow-dark-raised)'
              : 'var(--neu-shadow-dark-raised)',
            transition: 'background 300ms ease, box-shadow 300ms ease',
          }}
        />

        {/* Connecting vertical line — scroll-scrubbed fill */}
        {!isLast && (
          <div
            className="flex-1 relative mt-2"
            style={{
              width: 1,
              background: 'var(--glass-border)',
              minHeight: 60,
            }}
          >
            {/* Fill overlay */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: prefersReducedMotion ? '100%' : `${clampedFill * 100}%`,
                background: 'var(--color-accent)',
                transition: prefersReducedMotion ? 'none' : 'height 60ms linear',
                borderRadius: 1,
              }}
            />
          </div>
        )}
      </div>

      {/* Right: content */}
      <div className="pb-10 flex-1 min-w-0">
        <p
          className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase mb-2"
          style={{ color: 'var(--color-accent)', opacity: 0.75 }}
        >
          {entry.label}
        </p>
        <p
          className="text-sm leading-[1.8] max-w-[54ch]"
          style={{ color: 'var(--color-text)', opacity: 0.65 }}
        >
          {entry.body}
        </p>
      </div>
    </div>
  );
};
