import { CaseStudy } from '../work-types';
import { StorySection } from '../../../story/components/StorySection';

interface CaseStudyTimelineProps {
  timeline: CaseStudy['timeline'];
}

export default function CaseStudyTimeline({ timeline }: CaseStudyTimelineProps) {
  return (
    <StorySection id="timeline" eyebrow="Timeline" title="Project Phases">
      <div className="relative border-l border-white/10 ml-4 py-4">
        {timeline.map((phase, i) => (
          <div key={i} className="mb-12 last:mb-0 relative pl-8">
            <div className="absolute w-3 h-3 bg-[var(--accent-color,#3b82f6)] rounded-full -left-[6.5px] top-1.5 shadow-[0_0_10px_rgba(var(--accent-color-rgb),0.5)]" />
            <div className="flex items-center gap-3 mb-1">
              <div className="text-xs font-bold text-white/30 uppercase tracking-widest">{phase.phase}</div>
              <div className="text-sm font-medium text-white/50">{phase.duration}</div>
            </div>
            <h3 className="text-xl font-semibold text-white/90">{phase.label}</h3>
          </div>
        ))}
      </div>
    </StorySection>
  );
}
