'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ScrollRevealText } from '../components/ScrollRevealText';
import { TimelineMarker } from '../components/TimelineMarker';
import { timelineCopy } from '../content/studio-copy';

interface StudioTimelineProps {
  className?: string;
}

/**
 * StudioTimeline
 *
 * Narrow editorial column. Reads like a build log, not a corporate "our journey."
 *
 * Progress rail: The connecting lines between markers fill with accent color
 * as the user scrolls through THIS section specifically — scroll-scrubbed,
 * not viewport-triggered. This is the one place in the app where
 * scroll-linked animation is intentional (progress indicator, not decoration).
 *
 * DEMO_DATA: All timeline entries are placeholder tone examples.
 * Replace with real milestones from the founder (see studio-copy.ts).
 */
export const StudioTimeline: React.FC<StudioTimelineProps> = ({ className }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll-scrubbed progress for the timeline rail
  // Tracks the content scroll container (not window) since we're inside NativeAppContent
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Walk up to find the scrollable container
    const findScrollParent = (el: HTMLElement): HTMLElement | null => {
      let current = el.parentElement;
      while (current) {
        const style = window.getComputedStyle(current);
        if (
          style.overflow === 'auto' ||
          style.overflow === 'scroll' ||
          style.overflowY === 'auto' ||
          style.overflowY === 'scroll'
        ) {
          return current;
        }
        current = current.parentElement;
      }
      return document.documentElement;
    };

    const scrollEl = findScrollParent(section);
    if (!scrollEl) return;

    const update = () => {
      const sectionRect = section.getBoundingClientRect();
      const containerRect = scrollEl.getBoundingClientRect?.() ?? {
        top: 0,
        height: window.innerHeight,
      };

      // How far the section has been scrolled through
      const containerHeight = scrollEl.clientHeight || window.innerHeight;
      const sectionTop = sectionRect.top - (containerRect.top ?? 0);
      const sectionHeight = sectionRect.height;

      // Progress from 0 (section top entering) to 1 (section bottom leaving)
      const raw = (containerHeight * 0.6 - sectionTop) / sectionHeight;
      setScrollProgress(Math.min(1, Math.max(0, raw)));
    };

    scrollEl.addEventListener('scroll', update, { passive: true });
    update(); // initial

    return () => scrollEl.removeEventListener('scroll', update);
  }, []);

  const entries = timelineCopy.entries;

  // Distribute fill progress across the N-1 connecting lines
  const getLineFill = (index: number) => {
    if (index >= entries.length - 1) return 0;
    const perEntry = 1 / (entries.length - 1);
    const start = index * perEntry;
    const raw = (scrollProgress - start) / perEntry;
    return Math.min(1, Math.max(0, raw));
  };

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className={cn('py-16 md:py-20', className)}
      style={{ scrollMarginTop: '52px' }}
    >
      {/* Section header */}
      <div className="mb-12" style={{ maxWidth: '40ch' }}>
        <ScrollRevealText>
          <p
            className="text-[0.6rem] font-semibold tracking-[0.28em] uppercase mb-4"
            style={{ color: 'var(--color-accent)', opacity: 0.7 }}
          >
            {timelineCopy.kicker}
          </p>
        </ScrollRevealText>

        <ScrollRevealText delayMs={60}>
          <h2
            className="font-bold tracking-tight leading-tight"
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.85rem)',
              color: 'var(--color-text)',
            }}
          >
            {timelineCopy.headline}
          </h2>
        </ScrollRevealText>
      </div>

      {/* Vertical timeline — narrow column */}
      <div style={{ maxWidth: '56ch' }}>
        {entries.map((entry, i) => (
          <TimelineMarker
            key={entry.id}
            entry={entry}
            index={i}
            total={entries.length}
            fillProgress={getLineFill(i)}
            isLast={i === entries.length - 1}
          />
        ))}
      </div>
    </section>
  );
};
