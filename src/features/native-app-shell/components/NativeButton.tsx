import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { NeumorphicControl } from './NeumorphicControl';

export interface NativeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean; // For Radix/Slot integration if needed later, ignoring for simple case
}

export const NativeButton = React.forwardRef<HTMLButtonElement, NativeButtonProps>(
  ({ className, variant = 'primary', size = 'md', onMouseDown, onMouseUp, onMouseLeave, children, ...props }, ref) => {
    
    // We maintain internal pressed state to swap the shadow from raised to pressed
    const [isPressed, setIsPressed] = useState(false);

    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(true);
      onMouseDown?.(e);
    }, [onMouseDown]);

    const handleMouseUp = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(false);
      onMouseUp?.(e);
    }, [onMouseUp]);

    const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(false);
      onMouseLeave?.(e);
    }, [onMouseLeave]);

    const baseButtonClass = cn(
      'inline-flex items-center justify-center font-medium outline-none select-none',
      'transition-all duration-100 ease-out',
      'focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-bg)]',
      'disabled:pointer-events-none disabled:opacity-50',
      // Tactile scale on active (respecting prefers-reduced-motion in CSS, though tailwind supports it via motion-safe:)
      'motion-safe:active:scale-[0.97]'
    );

    if (variant === 'primary') {
      return (
        <button
          ref={ref}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className={cn(baseButtonClass, 'p-0', className)} // p-0 because NeumorphicControl handles padding
          {...props}
        >
          <NeumorphicControl
            raised={!isPressed}
            pressed={isPressed}
            size={size}
            className="w-full h-full flex items-center justify-center text-[var(--color-text)]"
          >
            {children}
          </NeumorphicControl>
        </button>
      );
    }

    if (variant === 'secondary') {
      return (
        <button
          ref={ref}
          className={cn(
            baseButtonClass,
            'bg-[var(--glass-bg-light)] dark:bg-[var(--glass-bg-dark)]',
            'border border-[var(--glass-border)] shadow-[var(--shadow-sm)]',
            'hover:shadow-[var(--neu-shadow-light-raised)] dark:hover:shadow-[var(--neu-shadow-dark-raised)]',
            'active:shadow-[var(--neu-shadow-light-pressed)] dark:active:shadow-[var(--neu-shadow-dark-pressed)]',
            'text-[var(--color-text)]',
            {
              'px-2 py-1 text-sm': size === 'sm',
              'px-4 py-2': size === 'md',
              'px-6 py-3 text-lg': size === 'lg',
              'rounded-[var(--radius-lg)]': true
            },
            className
          )}
          {...props}
        >
          {children}
        </button>
      );
    }

    // ghost
    return (
      <button
        ref={ref}
        className={cn(
          baseButtonClass,
          'hover:bg-[var(--color-surface)] dark:hover:bg-[var(--color-surface-2)] text-[var(--color-text)]',
          'active:bg-[var(--color-surface-2)] dark:active:bg-[var(--color-surface)]',
          {
            'px-2 py-1 text-sm': size === 'sm',
            'px-4 py-2': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
            'rounded-[var(--radius-lg)]': true
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

NativeButton.displayName = 'NativeButton';
