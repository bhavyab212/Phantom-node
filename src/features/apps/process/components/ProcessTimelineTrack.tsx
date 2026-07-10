import React from 'react';
import { cn } from '@/lib/utils';
import { NeumorphicControl } from '@/features/native-app-shell';
import { ProcessStepDial } from './ProcessStepDial';
import { PROCESS_STEPS } from '../data';

export interface ProcessTimelineTrackProps {
  activeStepIndex: number;
  onStepSelect: (index: number) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const ProcessTimelineTrack: React.FC<ProcessTimelineTrackProps> = ({
  activeStepIndex,
  onStepSelect,
  orientation = 'horizontal',
  className
}) => {
  const isHorizontal = orientation === 'horizontal';
  const stepsCount = PROCESS_STEPS.length;
  
  // Calculate the percentage of the track that should be filled based on active step
  const fillPercentage = stepsCount > 1 ? (activeStepIndex / (stepsCount - 1)) * 100 : 0;

  return (
    <div className={cn("relative flex items-center justify-center", isHorizontal ? 'w-full py-8' : 'h-full px-8', className)}>
      
      {/* The underlying recessed track rail */}
      <NeumorphicControl
        raised={false}
        pressed={true}
        rounded="full"
        className={cn(
          "absolute pointer-events-none",
          isHorizontal ? "w-full h-4 left-0 top-1/2 -translate-y-1/2" : "h-full w-4 top-0 left-12"
        )}
      >
        {/* The animated fill progress */}
        <div 
          className={cn(
            "absolute top-0 left-0 bg-[var(--color-accent)] rounded-full transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_0_15px_var(--color-accent)]",
            isHorizontal ? "h-full" : "w-full"
          )}
          style={isHorizontal ? { width: `${fillPercentage}%` } : { height: `${fillPercentage}%` }}
        />
      </NeumorphicControl>

      {/* The Dials positioned along the track */}
      <div 
        className={cn(
          "relative z-10 flex justify-between w-full h-full",
          isHorizontal ? "flex-row" : "flex-col"
        )}
      >
        {PROCESS_STEPS.map((step, index) => (
          <ProcessStepDial
            key={step.id}
            stepNumber={step.stepNumber}
            label={step.title}
            isActive={index === activeStepIndex}
            onClick={() => onStepSelect(index)}
            orientation={orientation}
            // Add a small background to nodes in vertical mode so the rail doesn't bleed through
            className={cn(
              !isHorizontal && "bg-[var(--color-surface)] py-2 rounded-full",
              !isHorizontal && index === 0 ? "pt-0" : "",
              !isHorizontal && index === PROCESS_STEPS.length - 1 ? "pb-0" : ""
            )}
          />
        ))}
      </div>
    </div>
  );
};
