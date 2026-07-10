import React from 'react';
import { cn } from '@/lib/utils';
import { SkeuomorphicAccent, useNativeApp } from '@/features/native-app-shell';
import type { TestimonialData } from '../data';
import { Quote } from 'lucide-react';

export interface TestimonialNoteCardProps {
  testimonial: TestimonialData;
  className?: string;
}

export const TestimonialNoteCard: React.FC<TestimonialNoteCardProps> = ({ testimonial, className }) => {
  const { breakpoint } = useNativeApp();
  const isCompact = breakpoint === 'compact';

  // Apply rotation only if not in compact mode
  const style = isCompact ? {} : { transform: `rotate(${testimonial.rotationDeg}deg)` };

  return (
    <div 
      className={cn(
        "relative transition-transform duration-300 hover:z-10 group", 
        !isCompact && "hover:scale-105",
        className
      )}
      style={style}
    >
      <SkeuomorphicAccent 
        variant="paper-grain" 
        className="w-full rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-[var(--glass-border)]"
      >
        <div className="bg-[var(--glass-bg-light)] dark:bg-[#2a2a2a] backdrop-blur-md p-8 rounded-xl flex flex-col justify-between h-full min-h-[300px]">
          
          <div className="text-[var(--color-accent)] opacity-40 mb-4">
            <Quote className="w-8 h-8 fill-current" />
          </div>
          
          <p className="text-lg md:text-xl font-serif text-[var(--color-text)]/90 leading-relaxed mb-8 flex-1 italic">
            "{testimonial.quote}"
          </p>
          
          <div className="mt-auto pt-6 border-t border-[var(--color-text)]/10">
            <h4 className="font-bold text-[var(--color-text)] tracking-tight">
              {testimonial.clientName}
            </h4>
            <div className="text-sm font-medium text-[var(--color-text)]/60">
              {testimonial.clientRole}, <span className="text-[var(--color-accent)]">{testimonial.clientCompany}</span>
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-widest font-bold text-[var(--color-text)]/40">
              {testimonial.serviceType}
            </div>
          </div>
          
        </div>
      </SkeuomorphicAccent>
    </div>
  );
};
