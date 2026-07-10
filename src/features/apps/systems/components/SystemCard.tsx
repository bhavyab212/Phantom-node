import React from 'react';
import { cn } from '@/lib/utils';
import { GlassPanel } from '@/features/native-app-shell';
import { WorkflowNodePreview } from './WorkflowNodePreview';
import type { SystemData } from '../data';

export interface SystemCardProps {
  system: SystemData;
  onClick: () => void;
  className?: string;
}

export const SystemCard: React.FC<SystemCardProps> = ({ system, onClick, className }) => {
  return (
    <GlassPanel
      elevation="medium"
      tint="light"
      onClick={onClick}
      className={cn(
        "flex flex-col cursor-pointer transition-transform duration-200 hover:-translate-y-1 group overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
        className
      )}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Visual Preview Area */}
      <div className="bg-[var(--glass-bg-dark)]/30 border-b border-[var(--glass-border)] p-6 h-40 flex items-center justify-center">
        <WorkflowNodePreview nodes={system.nodes} interactive={false} className="scale-90" />
      </div>
      
      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-[var(--color-accent)] opacity-80 group-hover:opacity-100 transition-opacity">
            {system.icon}
          </div>
          <h3 className="text-xl font-bold text-[var(--color-text)] tracking-tight">
            {system.title}
          </h3>
        </div>
        <p className="text-sm text-[var(--color-text)]/70 leading-relaxed">
          {system.shortDescription}
        </p>
      </div>
    </GlassPanel>
  );
};
