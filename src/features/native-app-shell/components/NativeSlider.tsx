import React, { useRef, useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { NeumorphicControl } from './NeumorphicControl';

export interface NativeSliderProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  className?: string;
}

export const NativeSlider: React.FC<NativeSliderProps> = ({
  value,
  min = 0,
  max = 100,
  onChange,
  className,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  const handleMove = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const newPercentage = x / rect.width;
      const newValue = min + newPercentage * (max - min);
      onChange(Math.round(newValue)); // Optional rounding, or pass exact
    },
    [min, max, onChange]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      className={cn('relative w-full h-8 flex items-center touch-none', className)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <NeumorphicControl
        ref={trackRef}
        raised={false}
        pressed={true}
        size="sm"
        rounded="full"
        className="w-full h-2 relative cursor-pointer overflow-hidden p-0"
      >
        {/* Fill */}
        <div
          className="absolute inset-y-0 left-0 bg-[var(--color-accent)]"
          style={{ width: `${percentage}%` }}
        />
      </NeumorphicControl>

      {/* Knob */}
      <div
        className={cn(
          'absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full cursor-grab active:cursor-grabbing',
          'bg-[var(--color-surface)] dark:bg-[var(--color-surface-2)]',
          'shadow-[var(--neu-shadow-light-raised)] dark:shadow-[var(--neu-shadow-dark-raised)]',
          'transition-transform duration-150',
          isDragging ? 'scale-110' : 'hover:scale-105'
        )}
        style={{ left: `calc(${percentage}% - 10px)` }}
      />
    </div>
  );
};
