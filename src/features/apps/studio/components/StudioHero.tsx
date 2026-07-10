import React from 'react';
import { GlassPanel } from '@/features/native-app-shell';
import { cn } from '@/lib/utils';

export const StudioHero: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <GlassPanel 
      elevation="medium" 
      tint="light"
      className={cn("p-8 md:p-12 overflow-hidden relative", className)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text)] mb-6 leading-[1.1]">
          We build digital tools that feel like physical objects.
        </h1>
        <p className="text-lg md:text-xl text-[var(--color-text)]/80 leading-relaxed font-serif italic max-w-2xl">
          Founded on the principle that software shouldn't just be functional—it should be a joy to use. 
          We merge the precision of modern engineering with the tactile warmth of crafted materials.
        </p>
      </div>
    </GlassPanel>
  );
};
