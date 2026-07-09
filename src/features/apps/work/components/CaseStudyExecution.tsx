import { CaseStudy } from '../work-types';
import { StorySection } from '../../../story/components/StorySection';
import { ArrowRight } from 'lucide-react';

interface CaseStudyExecutionProps {
  execution: CaseStudy['execution'];
}

export default function CaseStudyExecution({ execution }: CaseStudyExecutionProps) {
  return (
    <StorySection 
      id="execution" 
      eyebrow="Execution" 
      title={execution.title}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        <div className="prose prose-invert prose-lg">
          <p className="text-white/70 leading-relaxed">
            {execution.body}
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-2">
            Deliverables
          </h4>
          {execution.deliverables.map((deliverable, index) => (
            <div key={index} className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0">
              <ArrowRight size={16} className="text-[var(--accent-color,#3b82f6)] shrink-0" />
              <p className="text-white/90 font-medium">
                {deliverable}
              </p>
            </div>
          ))}
        </div>
      </div>
    </StorySection>
  );
}
