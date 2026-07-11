import React from 'react';
import { cn } from '@/lib/utils';
import { GlassPanel, NeumorphicControl, NativeButton } from '@/features/native-app-shell';
import { WorkflowNodePreview } from './WorkflowNodePreview';
import type { SystemData } from '../data';

export interface SystemDetailPanelProps {
  system: SystemData;
  className?: string;
  onDiscuss?: () => void;
}

export const SystemDetailPanel: React.FC<SystemDetailPanelProps> = ({ system, className, onDiscuss }) => {
  return (
    <div className={cn("flex flex-col gap-10 max-w-4xl mx-auto w-full", className)}>
      
      {/* Header & Problem Callout */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="text-[var(--color-accent)] w-10 h-10 flex items-center justify-center">
            {system.icon}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] tracking-tight">
            {system.title}
          </h2>
        </div>
        
        <div className="pl-6 border-l-2 border-[var(--color-accent)] mb-12">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">The Problem</h4>
          <p className="text-xl md:text-2xl text-[var(--color-text)] leading-relaxed font-serif italic">
            "{system.fullProblem}"
          </p>
        </div>
      </div>

      {/* Interactive Workflow Diagram */}
      <div className="py-8">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text)]/60 mb-6 px-2">
          How the system works
        </h4>
        <div className="bg-[var(--glass-bg-dark)]/10 rounded-2xl p-8 border border-[var(--glass-border)]">
          <WorkflowNodePreview nodes={system.nodes} interactive={true} />
        </div>
      </div>

      {/* Outcomes & Action */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text)]/60 mb-4 px-2">
            Typical Outcomes
          </h4>
          <div className="grid grid-cols-3 gap-4">
            {system.outcomes.map((outcome, idx) => (
              <NeumorphicControl
                key={idx}
                raised={true}
                rounded="md"
                className="p-4 flex flex-col items-center justify-center text-center h-24"
              >
                <span className="text-2xl font-bold text-[var(--color-text)] mb-1">
                  {outcome.value}
                </span>
                <span className="text-xs text-[var(--color-text)]/60 font-medium uppercase tracking-wider">
                  {outcome.label}
                </span>
              </NeumorphicControl>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <NativeButton size="lg" variant="primary" onClick={onDiscuss} className="w-full md:w-auto px-12">
            Discuss this system
          </NativeButton>
        </div>
      </div>
      
    </div>
  );
};
