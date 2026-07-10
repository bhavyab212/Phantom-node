import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { NeumorphicControl } from './NeumorphicControl';

export interface Segment {
  id: string;
  label: string | React.ReactNode;
}

export interface NativeSegmentedControlProps {
  segments: Segment[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export const NativeSegmentedControl: React.FC<NativeSegmentedControlProps> = ({
  segments,
  activeId,
  onChange,
  className,
}) => {
  const activeIndex = segments.findIndex((s) => s.id === activeId);

  return (
    <NeumorphicControl
      raised={false}
      pressed={true}
      size="sm"
      className={cn('relative flex p-1 items-center', className)}
    >
      <div
        className="absolute inset-y-1 rounded-[var(--radius-lg)] bg-[var(--color-surface-2)] shadow-[var(--neu-shadow-light-raised)] dark:shadow-[var(--neu-shadow-dark-raised)] transition-transform duration-250 ease-out z-0"
        style={{
          width: `calc(100% / ${segments.length} - 8px)`,
          transform: `translateX(calc(${activeIndex} * 100% + ${activeIndex * 8}px + 4px))`, // Adjust padding/margin
        }}
      />
      {segments.map((segment) => (
        <button
          key={segment.id}
          onClick={() => onChange(segment.id)}
          className={cn(
            'relative z-10 flex-1 px-3 py-1.5 text-sm font-medium transition-colors duration-200 outline-none rounded-[var(--radius-lg)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]',
            activeId === segment.id
              ? 'text-[var(--color-text)]'
              : 'text-[var(--color-text)]/60 hover:text-[var(--color-text)]'
          )}
        >
          {segment.label}
        </button>
      ))}
    </NeumorphicControl>
  );
};
