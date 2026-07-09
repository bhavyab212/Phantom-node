import { PROCESS_PHASES } from '../../process/process-data';
import { StorySection } from '../../../story/components/StorySection';
import { useWindowStore } from '../../../window-manager/useWindowStore';

export function HomeProcessPreview() {
  const { openApp } = useWindowStore();
  // Take first 3 phases for preview
  const previewPhases = PROCESS_PHASES.slice(0, 3);

  return (
    <StorySection id="process" eyebrow="Methodology" title="How we operate">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {previewPhases.map((phase) => (
          <div key={phase.id} className="flex flex-col">
            <div className="text-4xl font-light text-white/20 mb-4">0{phase.number}</div>
            <h3 className="text-lg font-semibold text-white/95 mb-2">{phase.name}</h3>
            <p className="text-sm font-medium tracking-wide uppercase mb-2" style={{ color: phase.accentColor }}>
              {phase.duration}
            </p>
            <p className="text-sm text-white/60 leading-relaxed">
              {phase.tagline}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <button
          onClick={() => {
            const { windows } = useWindowStore.getState();
            // Actually it's easier to just import APP_REGISTRY
            const APP_REGISTRY = require('../../../window-manager/window-registry').APP_REGISTRY;
            const entry = APP_REGISTRY['process'];
            if (entry) openApp('process', entry.title, { width: entry.defaultWidth, height: entry.defaultHeight, x: entry.defaultX, y: entry.defaultY });
          }}
          className="text-sm font-medium tracking-wide text-[var(--accent-color,#3b82f6)] hover:underline focus:outline-none flex items-center gap-2"
        >
          See full process &rarr;
        </button>
      </div>
    </StorySection>
  );
}
