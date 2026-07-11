'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ScrollRevealText } from '../components/ScrollRevealText';
import { StackDial } from '../components/StackDial';
import { stackCopy } from '../content/studio-copy';

interface StudioStackProps {
  className?: string;
}

/**
 * StudioStack
 *
 * Full-bleed tool showcase using StackDial.
 * NOT a symmetric grid of equal cards — one tool is featured at a time.
 * The featured tool gets display-scale name, role description, use-case chips.
 *
 * This should feel like flipping through physical reference cards.
 */
export const StudioStack: React.FC<StudioStackProps> = ({ className }) => {
  return (
    <section
      id="stack"
      className={cn('py-16 md:py-20', className)}
      style={{ scrollMarginTop: '52px' }}
    >
      {/* Section header */}
      <div className="mb-10 md:mb-12">
        <ScrollRevealText>
          <p
            className="text-[0.6rem] font-semibold tracking-[0.28em] uppercase mb-4"
            style={{ color: 'var(--color-accent)', opacity: 0.7 }}
          >
            {stackCopy.kicker}
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
            {stackCopy.headline}
          </h2>
        </ScrollRevealText>
      </div>

      {/* StackDial — the interactive featured-card system */}
      <ScrollRevealText delayMs={100}>
        <StackDial tools={stackCopy.tools} />
      </ScrollRevealText>
    </section>
  );
};
