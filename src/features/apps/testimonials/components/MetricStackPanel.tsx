import React from 'react';
import { cn } from '@/lib/utils';
import { GlassPanel, NeumorphicControl } from '@/features/native-app-shell';
import { AGENCY_METRICS } from '../data';

export interface MetricStackPanelProps {
  className?: string;
}

export const MetricStackPanel: React.FC<MetricStackPanelProps> = ({ className }) => {
  return (
    <GlassPanel elevation="low" className={cn("p-6 flex flex-col gap-4", className)}>
      <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text)]/50 mb-2 px-2">
        Agency Performance
      </h3>
      
      {AGENCY_METRICS.map((metric, idx) => (
        <NeumorphicControl
          key={idx}
          raised={true}
          rounded="md"
          className="p-4 flex items-center justify-between"
        >
          <span className="text-sm font-semibold text-[var(--color-text)]/70">
            {metric.label}
          </span>
          <span className="text-lg font-black text-[var(--color-text)] tracking-tight">
            {metric.value}
          </span>
        </NeumorphicControl>
      ))}
    </GlassPanel>
  );
};
