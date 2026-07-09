import { ReactNode } from 'react';

interface Stat {
  value: string;
  label: string;
}

interface StoryStatStripProps {
  stats: Stat[];
  className?: string;
}

export function StoryStatStrip({ stats, className = '' }: StoryStatStripProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-white/5 ${className}`}>
      {stats.map((stat, i) => (
        <div key={i} className="flex flex-col">
          <div className="text-3xl md:text-4xl font-semibold text-white/95 mb-2">{stat.value}</div>
          <div className="text-sm font-medium text-white/50 uppercase tracking-widest">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
