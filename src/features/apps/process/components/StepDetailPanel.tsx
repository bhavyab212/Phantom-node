import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { GlassPanel } from '@/features/native-app-shell';
import { CheckCircle2, ListChecks } from 'lucide-react';
import type { ProcessStepData } from '../data';

export interface StepDetailPanelProps {
  step: ProcessStepData;
  className?: string;
}

export const StepDetailPanel: React.FC<StepDetailPanelProps> = ({ step, className }) => {
  // Simple fade-in effect when step changes
  const [key, setKey] = useState(step.id);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setKey(step.id);
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [step.id]);

  return (
    <div key={key} className={cn("w-full transition-all duration-500 ease-out", animate ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0", className)}>
      <GlassPanel elevation="high" tint="light" className="p-8 md:p-12 w-full max-w-4xl mx-auto rounded-2xl flex flex-col gap-10 border border-[var(--glass-border)]">
        
        {/* Header & Description */}
        <div>
          <div className="flex items-end gap-4 mb-6">
            <span className="text-6xl md:text-8xl font-black tracking-tighter text-[var(--color-text)]/10 leading-none">
              {step.stepNumber}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text)] tracking-tight mb-2">
              {step.title}
            </h2>
          </div>
          <p className="text-lg md:text-xl text-[var(--color-text)]/80 leading-relaxed font-serif max-w-3xl">
            {step.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 border-t border-[var(--glass-border)]">
          {/* Activities */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <ListChecks className="text-[var(--color-accent)] w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text)]/60">
                Key Activities
              </h3>
            </div>
            <ul className="flex flex-col gap-4">
              {step.activities.map((activity, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-text)]/30 mt-2 shrink-0" />
                  <span className="text-[var(--color-text)] font-medium leading-relaxed">{activity}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deliverables */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="text-[var(--color-accent)] w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text)]/60">
                Client Deliverables
              </h3>
            </div>
            <ul className="flex flex-col gap-4">
              {step.deliverables.map((deliverable, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-[var(--color-surface)]/50 p-3 rounded-lg border border-[var(--glass-border)]">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" />
                  <span className="text-[var(--color-text)] font-semibold leading-relaxed">{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </GlassPanel>
    </div>
  );
};
