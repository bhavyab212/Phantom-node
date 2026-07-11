'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { SkeuomorphicAccent } from '@/features/native-app-shell';
import type { TeamMember } from '../content/studio-copy';

interface TeamPortraitProps {
  member: TeamMember;
  className?: string;
}

/**
 * TeamPortrait
 *
 * The studio app's ONE signature skeuomorphic moment.
 * A portrait framed with an embossed leather-texture border — physical, intentional.
 *
 * Layout:
 * - Portrait occupies one side; name, role, credential, bio on the other
 * - Asymmetric split: 40% portrait / 60% text, or responsive vertical stack
 *
 * Interaction:
 * - On hover: frame border brightens/lifts (shadow deepens)
 * - A credential caption slides up from the bottom of the portrait (200ms)
 * - This is a reveal-on-hover micro-interaction, tasteful and quick
 */
export const TeamPortrait: React.FC<TeamPortraitProps> = ({ member, className }) => {
  const [hovered, setHovered] = useState(false);
  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={cn(
        'flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center',
        className
      )}
    >
      {/* ── Portrait (40% at md+) ── */}
      <div
        className="flex-shrink-0 w-full md:w-[38%] lg:w-[35%]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative group">
          {/* Skeuomorphic embossed frame — the app's one skeuo moment */}
          <SkeuomorphicAccent
            variant="leather-texture"
            className={cn(
              'rounded-2xl p-2.5 transition-shadow duration-300',
              // Hover: shadow deepens for physical lift
              hovered
                ? 'shadow-[0_12px_40px_rgba(0,0,0,0.5),0_4px_12px_rgba(0,0,0,0.3)]'
                : 'shadow-[0_6px_20px_rgba(0,0,0,0.3),0_2px_6px_rgba(0,0,0,0.2)]'
            )}
            style={{
              transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
              transition: 'transform 250ms ease-out, box-shadow 250ms ease-out',
            }}
          >
            {/* Portrait inner */}
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[var(--color-surface)]">
              {/* Inner shadow for depth */}
              <div className="absolute inset-0 shadow-[inset_0_4px_12px_rgba(0,0,0,0.4)] rounded-xl z-10 pointer-events-none" />

              {member.imageUrl ? (
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                // Honest placeholder — no fake stock photo
                <div className="w-full h-full flex items-center justify-center bg-[var(--color-surface-2)]">
                  <span
                    className="text-4xl font-bold tracking-tight select-none"
                    style={{ color: 'var(--color-text)', opacity: 0.2 }}
                  >
                    {initials}
                  </span>
                </div>
              )}

              {/* Credential reveal on hover — slides up from bottom */}
              <div
                className="absolute inset-x-0 bottom-0 z-20 px-4 py-3"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
                  transform: hovered ? 'translateY(0)' : 'translateY(100%)',
                  opacity: hovered ? 1 : 0,
                  transition: 'transform 200ms ease-out, opacity 200ms ease-out',
                }}
              >
                <p
                  className="text-xs font-medium leading-snug"
                  style={{ color: 'rgba(255,255,255,0.9)' }}
                >
                  {member.credential}
                </p>
              </div>
            </div>
          </SkeuomorphicAccent>
        </div>
      </div>

      {/* ── Text (60% at md+) ── */}
      <div className="flex-1 min-w-0">
        <p
          className="text-[0.6rem] font-semibold tracking-[0.25em] uppercase mb-3"
          style={{ color: 'var(--color-accent)', opacity: 0.8 }}
        >
          Founder
        </p>

        <h3
          className="text-2xl md:text-3xl font-bold tracking-tight mb-1 leading-tight"
          style={{ color: 'var(--color-text)' }}
        >
          {member.name}
        </h3>

        <p
          className="text-sm font-medium mb-5"
          style={{ color: 'var(--color-text)', opacity: 0.55 }}
        >
          {member.role}
        </p>

        {/* Credential line — the one specific thing */}
        <div
          className="border-l-2 pl-4 mb-6"
          style={{ borderColor: 'var(--color-accent)', opacity: 0.8 }}
        >
          <p
            className="text-sm font-medium italic leading-relaxed"
            style={{ color: 'var(--color-text)', opacity: 0.75 }}
          >
            {member.credential}
          </p>
        </div>

        {/* Bio */}
        <p
          className="text-sm leading-[1.8] max-w-[52ch]"
          style={{ color: 'var(--color-text)', opacity: 0.6 }}
        >
          {member.bio}
        </p>
      </div>
    </div>
  );
};
