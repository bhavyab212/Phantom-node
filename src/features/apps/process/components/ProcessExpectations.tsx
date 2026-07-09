import { PROCESS_EXPECTATIONS } from '../process-data';
import { StorySection } from '../../../story/components/StorySection';

export function ProcessExpectations() {
  return (
    <StorySection id="process-expectations" eyebrow="Expectations" title="What to expect as a client">
      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12">
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {PROCESS_EXPECTATIONS.map((exp) => (
            <div key={exp.id} className="flex flex-col">
              <dt className="flex flex-col mb-3">
                <span className="text-sm font-semibold tracking-widest text-[var(--accent-color,#3b82f6)] uppercase mb-2">
                  {exp.category}
                </span>
                <span className="text-xl font-semibold text-white/90">
                  {exp.title}
                </span>
              </dt>
              <dd className="text-white/60 leading-relaxed">
                {exp.detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </StorySection>
  );
}
