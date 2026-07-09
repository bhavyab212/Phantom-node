import { ProcessPhase } from '../process-types';
import { StorySection } from '../../../story/components/StorySection';
import { ProcessDeliverableList } from './ProcessDeliverableList';
import { ChevronRight } from 'lucide-react';

interface ProcessPhaseSectionProps {
  phase: ProcessPhase;
  isAlternate?: boolean;
}

export function ProcessPhaseSection({ phase, isAlternate }: ProcessPhaseSectionProps) {
  return (
    <StorySection 
      id={`process-${phase.id}`} 
      title=""
      className={isAlternate ? 'bg-white/[0.02]' : ''}
    >
      <div className="flex flex-col w-full relative">
        {/* Large watermark number */}
        <div className="absolute top-0 right-0 text-[200px] font-bold text-white/[0.02] leading-none pointer-events-none select-none">
          0{phase.number}
        </div>

        <div className="relative z-10 w-full max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 rounded-full border border-white/10 text-xs font-semibold tracking-widest uppercase" style={{ color: phase.accentColor, backgroundColor: `${phase.accentColor}10` }}>
              {phase.duration}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white/95 mb-6">
            Phase 0{phase.number}: {phase.name}
          </h2>
          
          <h3 className="text-2xl font-light text-white/80 mb-6" style={{ color: phase.accentColor }}>
            {phase.tagline}
          </h3>

          <div className="prose prose-invert prose-lg max-w-none mb-12">
            <p className="text-white/60 leading-relaxed text-lg">
              {phase.description}
            </p>
          </div>

          <div className="mb-12">
            <h4 className="text-sm font-semibold tracking-widest text-white/40 uppercase mb-6">Key Activities</h4>
            <div className="flex flex-wrap gap-3">
              {phase.keyActivities.map((activity, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-sm text-white/70">
                  <ChevronRight size={14} className="text-white/30" />
                  {activity}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-sm font-semibold tracking-widest text-white/40 uppercase mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: phase.accentColor }} />
                Deliverables
              </h4>
              <ProcessDeliverableList items={phase.deliverables} variant="deliverable" />
            </div>

            <div>
              <h4 className="text-sm font-semibold tracking-widest text-white/40 uppercase mb-6">
                Client Needs
              </h4>
              <ProcessDeliverableList items={phase.clientResponsibilities} variant="responsibility" />
            </div>
          </div>
        </div>
      </div>
    </StorySection>
  );
}
