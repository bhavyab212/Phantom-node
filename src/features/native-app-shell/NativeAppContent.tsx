import React from 'react';
import { cn } from '@/lib/utils';
import { useNativeApp } from './NativeAppFrame';

export interface NativeAppContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'none'; // none = full bleed
}

export const NativeAppContent: React.FC<NativeAppContentProps> = ({
  children,
  maxWidth = 'none',
  className,
  ...props
}) => {
  const { breakpoint } = useNativeApp();

  const maxWidthClasses = {
    sm: 'max-w-screen-sm mx-auto w-full',
    md: 'max-w-screen-md mx-auto w-full',
    lg: 'max-w-screen-lg mx-auto w-full',
    xl: 'max-w-screen-xl mx-auto w-full',
    none: 'w-full h-full',
  };

  const paddingClasses = {
    compact: 'p-[var(--space-4)]',
    regular: 'p-[var(--space-6)]',
    wide: 'p-[var(--space-8)]',
    expanded: 'p-[var(--space-12)]',
  };

  return (
    <div
      className={cn(
        'relative overflow-y-auto w-full h-full bg-[var(--color-bg)]',
        // content-visibility is good for performance but needs explicit containment which breaks some sticky headers, use with care. We use basic transform instead.
        // Custom scrollbar classes (requires tailwind plugin or global css, we'll assume global css handles the scrollbar styling or we use custom webkit rules here)
        '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/10 dark:[&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-black/20 dark:hover:[&::-webkit-scrollbar-thumb]:bg-white/20',
        paddingClasses[breakpoint],
        className
      )}
      style={{ gridArea: 'content' }}
      {...props}
    >
      <div className={cn(maxWidthClasses[maxWidth])}>
        {children}
      </div>
    </div>
  );
};
