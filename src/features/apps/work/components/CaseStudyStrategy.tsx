import { CaseStudy } from '../work-types';
import { StorySection } from '../../../story/components/StorySection';
import { Check } from 'lucide-react';

interface CaseStudyStrategyProps {
  strategy: CaseStudy['strategy'];
}

export default function CaseStudyStrategy({ strategy }: CaseStudyStrategyProps) {
  return (
    <StorySection 
      id="strategy" 
      eyebrow="Our Approach" 
      title={strategy.title}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        <div className="prose prose-invert prose-lg">
          <p className="text-white/70 leading-relaxed">
            {strategy.body}
          </p>
        </div>
        
        <div className="flex flex-col gap-6">
          <h4 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-2">
            Strategic Pillars
          </h4>
          {strategy.keyPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-[var(--accent-color,#3b82f6)]/20 flex items-center justify-center">
                <Check size={14} className="text-[var(--accent-color,#3b82f6)]" />
              </div>
              <p className="text-white/90 leading-relaxed font-medium">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>
    </StorySection>
  );
}
