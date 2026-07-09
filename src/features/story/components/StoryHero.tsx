import { ReactNode } from 'react';
import { StoryCTACluster } from './StoryCTACluster';

interface StoryHeroProps {
  headline: ReactNode;
  subheadline: ReactNode;
  eyebrow?: string;
  ctaCluster?: ReactNode;
  ambient?: ReactNode;
  primaryCtaLabel?: string;
  onPrimaryCtaClick?: () => void;
  secondaryCtaLabel?: string;
  onSecondaryCtaClick?: () => void;
  className?: string;
}

export function StoryHero({ 
  headline, 
  subheadline,
  eyebrow,
  ctaCluster,
  ambient,
  primaryCtaLabel, 
  onPrimaryCtaClick,
  secondaryCtaLabel,
  onSecondaryCtaClick,
  className = ''
}: StoryHeroProps) {
  return (
    <section className={`py-20 md:py-32 flex flex-col items-start relative ${className}`}>
      {ambient && ambient}
      <div className="relative z-10 w-full">
        {eyebrow && (
          <div className="text-sm font-medium tracking-widest text-[var(--accent-color,#3b82f6)] uppercase mb-6">
            {eyebrow}
          </div>
        )}
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white/95 leading-[1.1] mb-8 max-w-3xl">
        {headline}
      </h1>
      <div className="text-xl text-white/60 mb-12 max-w-2xl leading-relaxed">
        {subheadline}
      </div>
      {ctaCluster ? (
        ctaCluster
      ) : (
        primaryCtaLabel && onPrimaryCtaClick && (
          <StoryCTACluster 
            primaryLabel={primaryCtaLabel}
            onPrimaryClick={onPrimaryCtaClick}
            secondaryLabel={secondaryCtaLabel}
            onSecondaryClick={onSecondaryCtaClick}
          />
        )
      )}
      </div>
    </section>
  );
}
