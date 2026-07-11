'use client';

import React, { useState, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import { GlassPanel } from '@/features/native-app-shell';
import { useNativeApp } from '@/features/native-app-shell';
import type { StackTool } from '../content/studio-copy';

interface StackDialProps {
  tools: readonly StackTool[];
  className?: string;
}

/**
 * StackDial
 *
 * Interactive featured-card pattern for the tool stack.
 * One tool is "active" (featured, large), others orbit/flank it as smaller cards.
 * Clicking a smaller card swaps it into the featured position with crossfade+scale.
 *
 * At compact width: becomes a horizontal swipeable strip of cards,
 * still with one featured card.
 *
 * This should feel like flipping through physical reference cards,
 * not scanning a bullet list.
 */
export const StackDial: React.FC<StackDialProps> = ({ tools, className }) => {
  const { breakpoint } = useNativeApp();
  const isCompact = breakpoint === 'compact';
  const [activeId, setActiveId] = useState<string>(tools[0].id);
  const [transitioning, setTransitioning] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);

  const activeTool = tools.find((t) => t.id === activeId) ?? tools[0];

  const handleSelect = useCallback(
    (id: string) => {
      if (id === activeId || transitioning) return;
      setTransitioning(true);
      setTimeout(() => {
        setActiveId(id);
        setTransitioning(false);
      }, 150); // half the crossfade duration
    },
    [activeId, transitioning]
  );

  // Touch-swipe support for compact strip
  const touchStartX = useRef<number>(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    const currentIdx = tools.findIndex((t) => t.id === activeId);
    if (Math.abs(delta) < 40) return;
    if (delta > 0 && currentIdx < tools.length - 1) {
      handleSelect(tools[currentIdx + 1].id);
    } else if (delta < 0 && currentIdx > 0) {
      handleSelect(tools[currentIdx - 1].id);
    }
  };

  if (isCompact) {
    return (
      <div className={cn('flex flex-col gap-4', className)}>
        {/* Swipeable strip */}
        <div
          ref={stripRef}
          className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory px-1 pb-2"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {tools.map((tool) => {
            const isActive = tool.id === activeId;
            return (
              <button
                key={tool.id}
                onClick={() => handleSelect(tool.id)}
                className={cn(
                  'snap-center shrink-0 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 outline-none',
                  'focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]'
                )}
                style={{
                  background: isActive
                    ? 'color-mix(in oklch, var(--color-accent) 15%, var(--color-surface))'
                    : 'var(--color-surface)',
                  color: isActive ? 'var(--color-accent)' : 'var(--color-text)',
                  opacity: isActive ? 1 : 0.6,
                  border: `1px solid ${isActive ? 'var(--color-accent)' : 'var(--glass-border)'}`,
                }}
              >
                {tool.name}
              </button>
            );
          })}
        </div>

        {/* Active tool detail */}
        <FeaturedToolCard tool={activeTool} transitioning={transitioning} />
      </div>
    );
  }

  // Wide layout: featured card + flanking selector column
  const nonActiveTools = tools.filter((t) => t.id !== activeId);

  return (
    <div className={cn('flex gap-6 items-stretch', className)}>
      {/* Left column: selector cards */}
      <div className="flex flex-col gap-3 w-[220px] shrink-0">
        {nonActiveTools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => handleSelect(tool.id)}
            className={cn(
              'text-left rounded-[var(--radius-lg)] px-4 py-3 transition-all duration-200 outline-none group',
              'focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]'
            )}
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--glass-border)',
              opacity: transitioning ? 0.5 : 0.7,
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.opacity = '1')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.opacity = transitioning ? '0.5' : '0.7')
            }
          >
            <p
              className="text-sm font-semibold tracking-tight leading-tight"
              style={{ color: 'var(--color-text)' }}
            >
              {tool.name}
            </p>
            <p
              className="text-xs mt-0.5 line-clamp-1"
              style={{ color: 'var(--color-text)', opacity: 0.45 }}
            >
              {tool.role}
            </p>
          </button>
        ))}
      </div>

      {/* Right: featured card */}
      <div className="flex-1">
        <FeaturedToolCard tool={activeTool} transitioning={transitioning} />
      </div>
    </div>
  );
};

// ─── Featured Tool Card ───────────────────────────────────────────────────────

interface FeaturedToolCardProps {
  tool: StackTool;
  transitioning: boolean;
}

const FeaturedToolCard: React.FC<FeaturedToolCardProps> = ({ tool, transitioning }) => {
  // Split useCase into individual chips
  const chips = tool.useCase.split(',').map((c) => c.trim());

  return (
    <GlassPanel
      elevation="medium"
      tint="none"
      className="h-full p-6 md:p-8"
      style={{
        opacity: transitioning ? 0 : 1,
        transform: transitioning ? 'scale(0.97)' : 'scale(1)',
        transition: 'opacity 300ms ease-out, transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Tool name — display type, this is the active featured moment */}
      <h3
        className="text-2xl md:text-3xl font-bold tracking-tight mb-3 leading-tight"
        style={{ color: 'var(--color-text)' }}
      >
        {tool.name}
      </h3>

      {/* Role description */}
      <p
        className="text-sm leading-[1.75] mb-6 max-w-[48ch]"
        style={{ color: 'var(--color-text)', opacity: 0.65 }}
      >
        {tool.role}
      </p>

      {/* Use case chips */}
      <div className="flex flex-wrap gap-2">
        {chips.map((chip, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: 'var(--color-surface-2)',
              color: 'var(--color-text)',
              border: '1px solid var(--glass-border)',
            }}
          >
            {chip}
          </span>
        ))}
      </div>
    </GlassPanel>
  );
};
