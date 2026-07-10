import React from 'react';
import { cn } from '@/lib/utils';
import { GlassPanel } from '@/features/native-app-shell';
import { WorkflowNodePreview } from '@/features/apps/systems/components/WorkflowNodePreview';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { ResultMetricPlaque } from './ResultMetricPlaque';
import type { CaseStudyData } from '../data';

export interface CaseStudyDetailViewProps {
  caseStudy: CaseStudyData;
  className?: string;
}

export const CaseStudyDetailView: React.FC<CaseStudyDetailViewProps> = ({ caseStudy, className }) => {
  return (
    <div className={cn("flex flex-col gap-12 w-full", className)}>
      
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-[var(--color-surface)] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[var(--color-text)]/80 shadow-[var(--shadow-sm)] border border-[var(--glass-border)]">
            {caseStudy.client}
          </span>
          <span className="text-[var(--color-text)]/40 text-sm">•</span>
          <span className="text-sm font-semibold text-[var(--color-text)]/60">{caseStudy.category}</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] tracking-tight">
          {caseStudy.title}
        </h2>
      </div>

      {/* Situation */}
      <section>
        <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text)]/50 mb-4 px-2">The Situation</h3>
        <GlassPanel elevation="low" className="p-6 md:p-8">
          <p className="text-lg text-[var(--color-text)]/90 leading-relaxed font-serif">
            {caseStudy.situation}
          </p>
        </GlassPanel>
      </section>

      {/* Before/After Comparison */}
      <section>
        <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text)]/50 mb-4 px-2">Transformation</h3>
        <BeforeAfterSlider
          beforeContent={
            <div className="flex items-center justify-center h-full text-center px-8">
              <p className="text-xl font-medium text-[var(--color-text)]/60 italic leading-relaxed">
                "{caseStudy.beforeText}"
              </p>
            </div>
          }
          afterContent={
            <div className="flex items-center justify-center h-full text-center px-8">
              <p className="text-xl font-medium text-[var(--color-text)] leading-relaxed">
                "{caseStudy.afterText}"
              </p>
            </div>
          }
        />
      </section>

      {/* System Architecture */}
      <section>
        <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text)]/50 mb-4 px-2">System Architecture</h3>
        <div className="bg-[var(--glass-bg-dark)]/20 rounded-2xl p-6 md:p-10 border border-[var(--glass-border)]">
          <WorkflowNodePreview nodes={caseStudy.workflowNodes} interactive={true} />
        </div>
      </section>

      {/* Results & Stack */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text)]/50 mb-4 px-2">Measurable Impact</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {caseStudy.metrics.map((metric, idx) => (
              <ResultMetricPlaque key={idx} label={metric.label} value={metric.value} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text)]/50 mb-4 px-2">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {caseStudy.stack.map((tech) => (
              <GlassPanel key={tech} elevation="low" className="px-4 py-2 rounded-full">
                <span className="text-sm font-semibold text-[var(--color-text)]/80">{tech}</span>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
};
