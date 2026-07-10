import React from 'react';
import { cn } from '@/lib/utils';
import { GlassPanel } from './GlassPanel';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div className={cn('flex w-full h-full items-center justify-center p-8', className)}>
      <GlassPanel
        elevation="low"
        tint="light"
        className="flex flex-col items-center justify-center p-8 text-center max-w-sm w-full"
      >
        {icon && (
          <div className="mb-4 text-[var(--color-text)]/40 flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-surface)] dark:bg-[var(--color-surface-2)] shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-medium text-[var(--color-text)] mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-[var(--color-text)]/70 mb-6">{description}</p>
        )}
        {action && <div>{action}</div>}
      </GlassPanel>
    </div>
  );
};
