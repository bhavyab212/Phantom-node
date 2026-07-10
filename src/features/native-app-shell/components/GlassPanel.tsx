import React from 'react';
import { cn } from '@/lib/utils'; // Assuming this project uses a standard `cn` utility from shadcn/tailwind merge

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 'low' | 'medium' | 'high';
  tint?: 'light' | 'dark' | 'accent' | 'none';
  children: React.ReactNode;
}

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, elevation = 'medium', tint = 'none', children, ...props }, ref) => {
    
    // Elevation classes map to the CSS variables we defined
    const elevationClasses = {
      low: 'shadow-[var(--shadow-sm)] backdrop-blur-[12px]',
      medium: 'shadow-[var(--shadow-md)] backdrop-blur-[var(--glass-blur)]',
      high: 'shadow-[var(--shadow-lg)] backdrop-blur-[28px]',
    };

    // Tint classes define the background color
    const tintClasses = {
      light: 'bg-[var(--glass-bg-light)]',
      dark: 'bg-[var(--glass-bg-dark)]',
      accent: 'bg-[color-mix(in_oklch,var(--color-accent)_15%,var(--glass-bg-light))]',
      none: '',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-[var(--radius-lg)] border border-[var(--glass-border)]',
          'backdrop-saturate-[var(--glass-saturate)]',
          elevationClasses[elevation],
          tintClasses[tint],
          // Pseudo-element for the inset top highlight to give that glass edge feel
          'before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:shadow-[var(--glass-highlight)]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';
