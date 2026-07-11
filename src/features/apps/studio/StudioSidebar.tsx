'use client';

import React, { useEffect, useRef, useState } from 'react';
import { NativeAppSidebar } from '@/features/native-app-shell';
import { useNativeApp } from '@/features/native-app-shell';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'team', label: 'Team' },
  { id: 'stack', label: 'Stack' },
  { id: 'timeline', label: 'Timeline' },
];

/**
 * StudioSidebar
 *
 * Jump-link navigation for the Studio app's single-scroll narrative.
 * Clicking a link smooth-scrolls the content area to that section.
 *
 * Active section tracking:
 * - IntersectionObserver watches each section element
 * - Active indicator (small accent dot) transitions between items smoothly
 */
export const StudioSidebar: React.FC = () => {
  const { sidebarMode } = useNativeApp();
  const isCollapsed = sidebarMode === 'collapsed';
  const [activeId, setActiveId] = useState<string>('overview');
  const observersRef = useRef<IntersectionObserver[]>([]);

  useEffect(() => {
    // Clean up any existing observers
    observersRef.current.forEach((obs) => obs.disconnect());
    observersRef.current = [];

    NAV_ITEMS.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (!section) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(id);
            }
          });
        },
        {
          // rootMargin biases toward sections entering the top half of viewport
          rootMargin: '-10% 0px -35% 0px',
          threshold: 0,
        }
      );

      observer.observe(section);
      observersRef.current.push(observer);
    });

    return () => {
      observersRef.current.forEach((obs) => obs.disconnect());
    };
  }, []);

  const handleClick = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    // Scroll within the content container, not window
    const scrollParent = section.closest('[style*="overflow"]') ?? section.parentElement;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveId(id);
  };

  return (
    <NativeAppSidebar>
      <div className="flex flex-col gap-0.5 mt-3 px-1">
        {/* Section label */}
        {!isCollapsed && (
          <p
            className="px-3 pb-2 pt-1 text-[0.55rem] font-semibold tracking-[0.2em] uppercase"
            style={{ color: 'var(--color-text)', opacity: 0.3 }}
          >
            Sections
          </p>
        )}

        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              title={isCollapsed ? item.label : undefined}
              className={cn(
                'flex items-center gap-3 px-3 py-2 mx-1 rounded-[var(--radius-lg)]',
                'transition-colors duration-150 outline-none text-left w-full',
                'focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]',
                isActive
                  ? 'bg-[color-mix(in_oklch,var(--color-accent)_12%,transparent)]'
                  : 'hover:bg-[var(--color-surface)] hover:bg-opacity-60'
              )}
            >
              {/* Active dot indicator */}
              <span
                className="flex-shrink-0 rounded-full transition-all duration-200"
                style={{
                  width: isCollapsed ? 6 : 5,
                  height: isCollapsed ? 6 : 5,
                  background: isActive ? 'var(--color-accent)' : 'var(--color-text)',
                  opacity: isActive ? 1 : 0.2,
                  boxShadow: isActive
                    ? '0 0 6px var(--color-accent)'
                    : 'none',
                  transition: 'background 200ms ease, opacity 200ms ease, box-shadow 200ms ease',
                }}
              />

              {!isCollapsed && (
                <span
                  className="text-sm font-medium transition-colors duration-150"
                  style={{
                    color: 'var(--color-text)',
                    opacity: isActive ? 0.95 : 0.5,
                  }}
                >
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </NativeAppSidebar>
  );
};
