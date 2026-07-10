import React from 'react';
import { NeumorphicControl } from '@/features/native-app-shell';
import { cn } from '@/lib/utils';

export interface ResultMetricPlaqueProps {
  label: string;
  value: string;
  className?: string;
}

export const ResultMetricPlaque: React.FC<ResultMetricPlaqueProps> = ({ label, value, className }) => {
  return (
    <NeumorphicControl
      raised={true}
      rounded="lg"
      className={cn("p-6 flex flex-col items-center justify-center text-center", className)}
    >
      <div className="text-4xl md:text-5xl font-black text-[var(--color-text)] tracking-tighter mb-2">
        {value}
      </div>
      <div className="text-xs font-semibold text-[var(--color-text)]/60 uppercase tracking-widest">
        {label}
      </div>
    </NeumorphicControl>
  );
};
