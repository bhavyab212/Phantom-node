'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ScrollRevealText } from '../components/ScrollRevealText';
import { TeamPortrait } from '../components/TeamPortrait';
import { teamCopy } from '../content/studio-copy';

interface StudioTeamProps {
  className?: string;
}

/**
 * StudioTeam
 *
 * IMPORTANT: This section uses REAL content only. DEMO_DATA markers in studio-copy.ts
 * indicate where actual team details (name, role, credential, bio) must be provided
 * by the founder before publishing. Do not pad with invented names or bios.
 *
 * Single-founder treatment (per spec):
 * - Large portrait with skeuomorphic frame on one side
 * - Name, role, credential, bio on the other
 * - Honest note about team size — "currently a team of one, growing deliberately"
 *
 * If multiple members: horizontal scroll or staggered cards would render here.
 * Currently renders single TeamPortrait as the strong feature treatment.
 */
export const StudioTeam: React.FC<StudioTeamProps> = ({ className }) => {
  const members = teamCopy.members;
  const isSingleFounder = members.length === 1;

  return (
    <section
      id="team"
      className={cn('py-16 md:py-20', className)}
      style={{ scrollMarginTop: '52px' }}
    >
      {/* Section header */}
      <div className="mb-10 md:mb-14">
        <ScrollRevealText>
          <p
            className="text-[0.6rem] font-semibold tracking-[0.28em] uppercase mb-4"
            style={{ color: 'var(--color-accent)', opacity: 0.7 }}
          >
            {teamCopy.kicker}
          </p>
        </ScrollRevealText>

        <ScrollRevealText delayMs={60}>
          <h2
            className="font-bold tracking-tight leading-tight mb-3"
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.85rem)',
              color: 'var(--color-text)',
            }}
          >
            {teamCopy.headline}
          </h2>
        </ScrollRevealText>

        <ScrollRevealText delayMs={120}>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--color-text)', opacity: 0.52, maxWidth: '50ch' }}
          >
            {isSingleFounder ? teamCopy.singleFounderNote : teamCopy.intro}
          </p>
        </ScrollRevealText>
      </div>

      {/* Portrait feature */}
      <ScrollRevealText delayMs={80}>
        {isSingleFounder ? (
          <TeamPortrait member={members[0]} />
        ) : (
          // Multiple members: staggered with varied sizing for editorial rhythm
          <div className="flex flex-col gap-12">
            {members.map((member) => (
              <TeamPortrait key={member.name} member={member} />
            ))}
          </div>
        )}
      </ScrollRevealText>
    </section>
  );
};
