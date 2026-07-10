import React from 'react';
import { cn } from '@/lib/utils';

export type SkeuomorphicVariant = 'paper-grain' | 'stitched-edge' | 'brushed-metal' | 'leather-texture';

export interface SkeuomorphicAccentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: SkeuomorphicVariant;
  children?: React.ReactNode;
}

export const SkeuomorphicAccent = React.forwardRef<HTMLDivElement, SkeuomorphicAccentProps>(
  ({ className, variant, children, ...props }, ref) => {
    
    // Renders the underlying SVG noise filters for textures that need it
    const renderFilters = () => {
      if (variant === 'paper-grain' || variant === 'brushed-metal' || variant === 'leather-texture') {
        return (
          <svg className="hidden">
            <defs>
              <filter id={`noise-${variant}`}>
                <feTurbulence 
                  type={variant === 'leather-texture' ? 'fractalNoise' : 'turbulence'} 
                  baseFrequency={
                    variant === 'paper-grain' ? '0.8' : 
                    variant === 'brushed-metal' ? '0.1 0.8' : 
                    '0.5' // leather
                  } 
                  numOctaves={variant === 'leather-texture' ? '4' : '2'} 
                  stitchTiles="stitch" 
                />
                <feColorMatrix type="saturate" values="0" />
                {variant === 'leather-texture' && (
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.3" />
                  </feComponentTransfer>
                )}
                <feBlend mode="multiply" in="SourceGraphic" in2="noise" />
              </filter>
            </defs>
          </svg>
        );
      }
      return null;
    };

    const variantClasses = {
      'paper-grain': 'relative before:absolute before:inset-0 before:pointer-events-none before:opacity-[var(--skeu-grain-opacity)] before:bg-[#000] before:[filter:url(#noise-paper-grain)]',
      'stitched-edge': 'border border-dashed border-[var(--skeu-stitch-color)] rounded-lg p-1', // Real implementation could use a complex repeating gradient
      'brushed-metal': 'bg-[var(--skeu-metal-gradient)] relative before:absolute before:inset-0 before:pointer-events-none before:opacity-[var(--skeu-grain-opacity)] before:bg-[#000] before:[filter:url(#noise-brushed-metal)]',
      'leather-texture': 'bg-[var(--color-surface-2)] shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] relative before:absolute before:inset-0 before:pointer-events-none before:opacity-[calc(var(--skeu-grain-opacity)*1.5)] before:bg-[#000] before:[filter:url(#noise-leather-texture)]',
    };

    return (
      <div
        ref={ref}
        className={cn('relative overflow-hidden', variantClasses[variant], className)}
        {...props}
      >
        {renderFilters()}
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </div>
    );
  }
);

SkeuomorphicAccent.displayName = 'SkeuomorphicAccent';
