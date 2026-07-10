import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { NeumorphicControl } from '@/features/native-app-shell';
import { GripVertical } from 'lucide-react';

export interface BeforeAfterSliderProps {
  beforeContent: React.ReactNode;
  afterContent: React.ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeContent,
  afterContent,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className
}) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

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
      className={cn("relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-xl select-none touch-none bg-[var(--glass-bg-dark)] border border-[var(--glass-border)]", className)}
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* After (Background layer) */}
      <div className="absolute inset-0 flex items-center justify-center p-8 bg-[color-mix(in_oklch,var(--color-accent)_10%,transparent)]">
        {afterContent}
        <div className="absolute bottom-4 right-4 bg-[var(--color-surface)]/80 backdrop-blur-md px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest text-[var(--color-text)]">
          {afterLabel}
        </div>
      </div>

      {/* Before (Foreground layer, clipped) */}
      <div 
        className="absolute inset-0 flex items-center justify-center p-8 bg-[var(--color-surface-2)]"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        {beforeContent}
        <div className="absolute bottom-4 left-4 bg-[var(--color-surface)]/80 backdrop-blur-md px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest text-[var(--color-text)]/60">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-[var(--glass-border)] z-10 cursor-col-resize"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <NeumorphicControl
          raised={true}
          rounded="full"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-12 flex items-center justify-center p-0 shadow-[var(--shadow-md)]"
        >
          <GripVertical className="w-4 h-4 text-[var(--color-text)]/60" />
        </NeumorphicControl>
      </div>
    </div>
  );
};
