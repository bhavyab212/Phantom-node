import { CaseStudy } from '../work-types';

interface CaseStudyMetricsProps {
  metrics: CaseStudy['metrics'];
}

export default function CaseStudyMetrics({ metrics }: CaseStudyMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12">
      {metrics.map((metric, i) => (
        <div key={i} className="flex flex-col p-8 bg-white/[0.03] border border-white/5 rounded-3xl relative overflow-hidden group hover:bg-white/[0.05] transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-color,#3b82f6)] opacity-[0.05] blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:opacity-[0.1] transition-opacity" />
          
          <div className="text-5xl font-bold text-white/95 mb-4 tracking-tight">
            {metric.value}
          </div>
          <div className="text-white/60 font-medium text-lg leading-snug">
            {metric.label}
          </div>
          {metric.context && (
            <div className="mt-4 pt-4 border-t border-white/10 text-white/40 text-sm">
              {metric.context}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
