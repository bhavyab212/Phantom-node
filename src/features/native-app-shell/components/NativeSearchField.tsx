import React from 'react';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';

export interface NativeSearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
}

export const NativeSearchField = React.forwardRef<HTMLInputElement, NativeSearchFieldProps>(
  ({ className, value, onChange, onClear, disabled, placeholder = 'Search...', ...props }, ref) => {
    return (
      <div
        className={cn(
          'relative flex items-center h-8 rounded-md transition-all duration-200',
          'bg-[var(--glass-bg-light)] dark:bg-[var(--glass-bg-dark)]',
          'shadow-[inset_0_1px_3px_var(--glass-border)]',
          'border border-[var(--glass-border)]',
          'focus-within:ring-2 focus-within:ring-[var(--color-accent)] focus-within:scale-[1.01]',
          disabled && 'opacity-50',
          className
        )}
      >
        <Search className="absolute left-2 w-4 h-4 text-[var(--color-text)]/50 pointer-events-none" />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            'w-full h-full pl-8 pr-8 bg-transparent text-sm text-[var(--color-text)] outline-none',
            'placeholder:text-[var(--color-text)]/40'
          )}
          {...props}
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange('');
              onClear?.();
            }}
            disabled={disabled}
            className="absolute right-1 w-6 h-6 flex items-center justify-center text-[var(--color-text)]/50 hover:text-[var(--color-text)] transition-colors rounded-full focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] outline-none"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }
);

NativeSearchField.displayName = 'NativeSearchField';
