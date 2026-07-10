import React from 'react';
import { cn } from '@/lib/utils';

export interface NativeAppStatusBarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const NativeAppStatusBar: React.FC<NativeAppStatusBarProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex items-center px-4 h-[28px] select-none text-[var(--color-text)]/60 text-xs',
        'bg-[var(--glass-bg-light)] dark:bg-[var(--glass-bg-dark)]',
        'backdrop-blur-[var(--glass-blur)] backdrop-saturate-[var(--glass-saturate)]',
        'border-t border-[var(--glass-border)] z-20',
        className
      )}
      style={{ gridArea: 'status' }}
      {...props}
    >
      {children}
    </div>
  );
};
