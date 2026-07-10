import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

export interface NativeFormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  isTextarea?: boolean;
}

export const NativeFormField: React.FC<NativeFormFieldProps> = ({
  label,
  error,
  isTextarea = false,
  className,
  value,
  onChange,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow logic for textarea
  useEffect(() => {
    if (isTextarea && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, isTextarea]);

  const baseClasses = cn(
    "w-full bg-[var(--color-surface)] dark:bg-[#1a1a1a] text-[var(--color-text)] outline-none rounded-lg px-4 py-3 transition-all duration-200",
    "shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_2px_6px_rgba(0,0,0,0.5)]",
    "border border-[var(--glass-border)]",
    "focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.05),0_0_0_2px_var(--color-accent)] dark:focus:shadow-[inset_0_2px_6px_rgba(0,0,0,0.5),0_0_0_2px_var(--color-accent)]",
    "placeholder:text-[var(--color-text)]/30 font-medium",
    error && "shadow-[inset_0_0_0_1px_var(--color-error)] dark:shadow-[inset_0_0_0_1px_var(--color-error)]",
    className
  );

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-bold uppercase tracking-wider text-[var(--color-text)]/70 px-1">
        {label}
      </label>
      
      {isTextarea ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          className={cn(baseClasses, "resize-none min-h-[100px] overflow-hidden")}
          rows={3}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          value={value}
          onChange={onChange}
          className={baseClasses}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {error && (
        <div className="flex items-center gap-1.5 px-1 mt-1 text-[var(--color-error)] animate-in slide-in-from-top-1 opacity-90">
          <AlertCircle className="w-4 h-4" />
          <span className="text-xs font-semibold">{error}</span>
        </div>
      )}
    </div>
  );
};
