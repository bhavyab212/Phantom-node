import { ArrowRight, ChevronRight } from 'lucide-react';

interface StoryCTAClusterProps {
  primaryLabel: string;
  onPrimaryClick: () => void;
  secondaryLabel?: string;
  onSecondaryClick?: () => void;
  tertiaryLabel?: string;
  onTertiaryClick?: () => void;
  className?: string;
}

export function StoryCTACluster({ 
  primaryLabel, 
  onPrimaryClick, 
  secondaryLabel, 
  onSecondaryClick,
  tertiaryLabel,
  onTertiaryClick,
  className = '' 
}: StoryCTAClusterProps) {
  return (
    <div className={`flex flex-col sm:flex-row items-center gap-4 ${className}`}>
      <button 
        onClick={onPrimaryClick}
        className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-white font-medium transition-all active:scale-[0.98] flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(var(--accent-color-rgb),0.3)] group"
        style={{
          background: 'linear-gradient(135deg, var(--accent-color,#3b82f6), color-mix(in srgb, var(--accent-color,#3b82f6) 80%, #818cf8))',
        }}
      >
        {primaryLabel}
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>

      {secondaryLabel && onSecondaryClick && (
        <button 
          onClick={onSecondaryClick}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-white/90 font-medium transition-colors bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2 group"
        >
          {secondaryLabel}
          <ChevronRight size={18} className="text-white/50 group-hover:text-white/80 transition-colors" />
        </button>
      )}

      {tertiaryLabel && onTertiaryClick && (
        <button 
          onClick={onTertiaryClick}
          className="text-sm font-medium text-white/50 hover:text-white/90 underline decoration-white/20 hover:decoration-white/60 transition-colors underline-offset-4 mt-2 sm:mt-0 sm:ml-2"
        >
          {tertiaryLabel}
        </button>
      )}
    </div>
  );
}
