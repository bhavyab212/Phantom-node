import { CaseStudy } from '../work-types';
import { StorySection } from '../../../story/components/StorySection';
import { CheckCircle2 } from 'lucide-react';

interface CaseStudyResultGridProps {
  project: CaseStudy;
}

export default function CaseStudyResultGrid({ project }: CaseStudyResultGridProps) {
  return (
    <StorySection id="results" eyebrow="Outcomes" title="The Impact">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {project.execution.deliverables.map((outcome, i) => (
          <div key={i} className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl">
            <CheckCircle2 size={24} className="text-[var(--accent-color,#3b82f6)] shrink-0 mt-0.5" />
            <p className="text-white/90 text-lg leading-relaxed">
              {outcome}
            </p>
          </div>
        ))}
      </div>
    </StorySection>
  );
}
