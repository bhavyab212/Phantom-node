import React from 'react';
import { cn } from '@/lib/utils';

interface NeumorphicControlProps extends React.HTMLAttributes<HTMLDivElement> {
  raised?: boolean;
  pressed?: boolean;
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'full' | 'lg' | 'md';
  children?: React.ReactNode;
}

export const NeumorphicControl = React.forwardRef<HTMLDivElement, NeumorphicControlProps>(
  ({ className, raised = true, pressed = false, size = 'md', rounded = 'lg', children, ...props }, ref) => {
    
    // Base surface color (opaque)
    const baseClass = 'bg-[var(--neu-base-light)] dark:bg-[var(--neu-base-dark)]';
    
    // Shadows based on state and theme. We use CSS custom properties defined in our tokens.
    // In dark mode, tailwind uses `dark:` prefix to swap classes.
    const shadowClass = pressed
      ? 'shadow-[var(--neu-shadow-light-pressed)] dark:shadow-[var(--neu-shadow-dark-pressed)]'
      : raised
        ? 'shadow-[var(--neu-shadow-light-raised)] dark:shadow-[var(--neu-shadow-dark-raised)]'
        : 'shadow-none'; // Ghost/flat state

    const roundedClasses = {
      full: 'rounded-full',
      lg: 'rounded-[var(--radius-lg)]',
      md: 'rounded-md',
    };

    const sizeClasses = {
      sm: 'px-2 py-1 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'transition-shadow duration-100 ease-out',
          baseClass,
          shadowClass,
          roundedClasses[rounded],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NeumorphicControl.displayName = 'NeumorphicControl';
