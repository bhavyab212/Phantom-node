import React from 'react';
import { cn } from '@/lib/utils';
import { NeumorphicControl } from './NeumorphicControl';

export interface NativeToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const NativeToggle = React.forwardRef<HTMLInputElement, NativeToggleProps>(
  ({ className, checked, onChange, disabled, ...props }, ref) => {
    return (
      <label
        className={cn(
          'relative inline-flex items-center cursor-pointer select-none',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        <NeumorphicControl
          raised={false}
          pressed={true}
          size="sm"
          rounded="full"
          className={cn(
            'w-11 h-6 transition-colors duration-200 ease-in-out p-[2px]',
            checked ? 'bg-[var(--color-accent)]' : 'bg-[var(--neu-base-light)] dark:bg-[var(--neu-base-dark)]'
          )}
        >
          <div
            className={cn(
              'w-5 h-5 rounded-full bg-[var(--color-surface)] dark:bg-[var(--color-surface-2)] shadow-[var(--neu-shadow-light-raised)] dark:shadow-[var(--neu-shadow-dark-raised)]',
              'transition-transform duration-200 cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Spring-like
              'motion-reduce:transition-none motion-reduce:transform-none', // respect prefers-reduced-motion
              checked ? 'translate-x-5' : 'translate-x-0'
            )}
          />
        </NeumorphicControl>
      </label>
    );
  }
);

NativeToggle.displayName = 'NativeToggle';
