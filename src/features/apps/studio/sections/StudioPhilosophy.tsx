'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ScrollRevealText } from '../components/ScrollRevealText';
import { PhilosophyPlaque } from '../components/PhilosophyPlaque';
import { philosophyCopy } from '../content/studio-copy';

interface StudioPhilosophyProps {
  className?: string;
}

/**
 * StudioPhilosophy
 *
 * Four plaques in a ZIGZAG layout — NOT a symmetric 2×2 grid.
 * Plaque 1 aligns left (more right margin), Plaque 2 aligns right (more left margin),
 * alternating. This is an award-winning editorial pattern: staggered vertical rhythm.
 *
 * At compact width: full-width stacked, oversized numeral watermark stays.
 *
 * The column width is narrower than Overview — this section is about reading, not scanning.
 */
export const StudioPhilosophy: React.FC<StudioPhilosophyProps> = ({ className }) => {
  const alignments: Array<'left' | 'right'> = ['left', 'right', 'left', 'right'];

  return (
    <section
      id="philosophy"
      className={cn('py-16 md:py-20', className)}
      style={{ scrollMarginTop: '52px' }}
    >
      {/* Section header — editorial column, left-aligned */}
      <div className="mb-12 md:mb-16" style={{ maxWidth: '44ch' }}>
        <ScrollRevealText>
          <p
            className="text-[0.6rem] font-semibold tracking-[0.28em] uppercase mb-4"
            style={{ color: 'var(--color-accent)', opacity: 0.7 }}
          >
            {philosophyCopy.kicker}
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
            {philosophyCopy.headline}
          </h2>
        </ScrollRevealText>
      </div>

      {/* Zigzag plaque layout */}
      <div className="flex flex-col gap-5 md:gap-6">
        {philosophyCopy.principles.map((principle, i) => (
          <PhilosophyPlaque
            key={principle.number}
            principle={principle}
            align={alignments[i]}
            delayMs={i * 80}
          />
        ))}
      </div>
    </section>
  );
};
