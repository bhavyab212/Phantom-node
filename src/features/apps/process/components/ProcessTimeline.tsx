import { PROCESS_PHASES } from '../process-data';
import { StorySection } from '../../../story/components/StorySection';

export function ProcessTimeline() {
  return (
    <StorySection id="timeline" title="The Journey">
      <div className="w-full relative">
        <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-white/10" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {PROCESS_PHASES.map((phase) => (
            <div key={phase.id} className="relative z-10 flex flex-col pt-4 md:pt-0">
              <div className="hidden md:flex w-24 h-24 rounded-full bg-[#0a0a0a] border border-white/10 items-center justify-center text-3xl font-light text-white/40 mb-6 shrink-0 relative">
                <span className="absolute inset-0 rounded-full border border-current opacity-20 scale-110" style={{ color: phase.accentColor }} />
                0{phase.number}
              </div>
              <div className="md:hidden text-4xl font-light text-white/20 mb-2">
                0{phase.number}
              </div>
              <h3 className="text-xl font-medium text-white/95 mb-2">{phase.name}</h3>
              <p className="text-sm font-medium tracking-wide uppercase mb-3" style={{ color: phase.accentColor }}>
                {phase.duration}
              </p>
            </div>
          ))}
        </div>
      </div>
    </StorySection>
  );
}
