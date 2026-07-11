'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { KineticHeadline } from '../components/KineticHeadline';
import { ScrollRevealText } from '../components/ScrollRevealText';
import { GrainOverlay } from '../components/GrainOverlay';
import { overviewCopy } from '../content/studio-copy';

interface StudioOverviewProps {
  className?: string;
}

/**
 * StudioOverview
 *
 * Full-bleed hero treatment. The only section in the app with:
 * - Display-scale headline (the ONE moment of oversized type)
 * - GrainOverlay on the background (barely perceptible, cinematic)
 * - Oversized typographic quotation mark as a design device (not an icon)
 * - KineticHeadline per-line reveal
 * - Founder note in a distinct editorial treatment
 *
 * Max editorial column: ~640px for paragraphs
 */
export const StudioOverview: React.FC<StudioOverviewProps> = ({ className }) => {
  return (
    <section
      id="overview"
      className={cn('relative pt-12 pb-16 md:pt-16 md:pb-20', className)}
      style={{ scrollMarginTop: '52px' }}
    >
      {/* Background grain — Overview only, this is its intentional singular use */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
        <GrainOverlay />
      </div>

      <div className="relative z-10">
        {/* Kicker */}
        <ScrollRevealText>
          <p
            className="text-[0.6rem] font-semibold tracking-[0.28em] uppercase mb-6"
            style={{ color: 'var(--color-accent)', opacity: 0.7 }}
          >
            {overviewCopy.kicker}
          </p>
        </ScrollRevealText>

        {/* Headline — the one display-scale moment in this app */}
        {/* Split into lines for the kinetic reveal */}
        <KineticHeadline
          text={[
            "We don't sell automation.",
            "We remove the parts of your business",
            "that shouldn't need a human anymore.",
          ].join('\n')}
          splitBy="lines"
          as="h1"
          className="font-bold tracking-tight leading-[1.12] mb-6"
          style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
            color: 'var(--color-text)',
            maxWidth: '16em',
          }}
          staggerMs={50}
          durationMs={520}
        />

        {/* Subhead */}
        <ScrollRevealText delayMs={200}>
          <p
            className="leading-[1.65] mb-10"
            style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              color: 'var(--color-text)',
              opacity: 0.55,
              maxWidth: '52ch',
            }}
          >
            {overviewCopy.subhead}
          </p>
        </ScrollRevealText>

        {/* Body paragraphs — editorial column */}
        <div
          className="flex flex-col gap-5 mb-14"
          style={{ maxWidth: '62ch' }}
        >
          {overviewCopy.bodyParagraphs.map((para, i) => (
            <ScrollRevealText key={i} delayMs={i * 60}>
              <p
                className="leading-[1.8] text-sm md:text-base"
                style={{ color: 'var(--color-text)', opacity: 0.62 }}
              >
                {para}
              </p>
            </ScrollRevealText>
          ))}
        </div>

        {/* Founder's note — distinct editorial treatment */}
        <ScrollRevealText delayMs={80}>
          <FounderNote
            quote={overviewCopy.founderNote.quote}
            attribution={overviewCopy.founderNote.attribution}
          />
        </ScrollRevealText>
      </div>
    </section>
  );
};

// ─── Founder Note ─────────────────────────────────────────────────────────────

interface FounderNoteProps {
  quote: string;
  attribution: string;
}

/**
 * FounderNote
 *
 * NOT a glass card. An editorial typographic treatment:
 * - Oversized opening " as a structural device, not an icon
 * - Quote in slightly larger body type
 * - Attribution in tracked uppercase
 *
 * This is the app's one moment of pure typographic craft.
 */
const FounderNote: React.FC<FounderNoteProps> = ({ quote, attribution }) => {
  return (
    <div
      className="relative py-6 pl-0 md:pl-2"
      style={{ maxWidth: '58ch' }}
    >
      {/* Left accent rule */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{
          background:
            'linear-gradient(to bottom, transparent, var(--color-accent), transparent)',
          opacity: 0.4,
        }}
      />

      {/* Oversized opening quote — typographic device */}
      <span
        aria-hidden="true"
        className="absolute font-bold leading-none select-none"
        style={{
          top: '-0.15em',
          left: '0.1em',
          fontSize: 'clamp(4rem, 8vw, 6.5rem)',
          color: 'var(--color-accent)',
          opacity: 0.12,
          fontFamily: 'Georgia, "Times New Roman", serif',
          lineHeight: 1,
        }}
      >
        "
      </span>

      <div className="pl-6 md:pl-8">
        {/* Quote */}
        <blockquote
          className="leading-[1.75] mb-4"
          style={{
            fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)',
            color: 'var(--color-text)',
            opacity: 0.78,
            fontStyle: 'italic',
          }}
        >
          {quote}
        </blockquote>

        {/* Attribution */}
        <p
          className="text-[0.65rem] tracking-[0.15em] uppercase"
          style={{ color: 'var(--color-text)', opacity: 0.4 }}
        >
          {attribution}
        </p>
      </div>
    </div>
  );
};
