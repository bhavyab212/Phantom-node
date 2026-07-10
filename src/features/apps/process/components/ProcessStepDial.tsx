import React from 'react';
import { cn } from '@/lib/utils';
import { NeumorphicControl } from '@/features/native-app-shell';

export interface ProcessStepDialProps {
  stepNumber: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const ProcessStepDial: React.FC<ProcessStepDialProps> = ({
  stepNumber,
  label,
  isActive,
  onClick,
  orientation = 'horizontal',
  className
}) => {
  return (
    <div 
      className={cn("flex items-center gap-4 group cursor-pointer", className, orientation === 'horizontal' ? 'flex-col' : 'flex-row')}
      onClick={onClick}
    >
      <NeumorphicControl
        raised={!isActive}
        pressed={isActive}
        rounded="full"
        className={cn(
          "w-16 h-16 md:w-20 md:h-20 flex flex-col items-center justify-center p-0 transition-all duration-300",
          isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text)]/50 group-hover:text-[var(--color-text)]/80"
        )}
      >
        <span className="text-sm md:text-base font-black tracking-widest">{stepNumber}</span>
      </NeumorphicControl>

      <div className={cn("text-center", orientation === 'horizontal' ? 'w-24' : 'text-left')}>
        <span className={cn(
          "text-xs md:text-sm font-bold uppercase tracking-wider transition-colors duration-300",
          isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text)]/50 group-hover:text-[var(--color-text)]/80"
        )}>
          {label}
        </span>
      </div>
    </div>
  );
};
