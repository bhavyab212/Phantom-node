import { PROCESS_PRINCIPLES } from '../process-data';
import { StorySection } from '../../../story/components/StorySection';
import { ShieldCheck, Key, Calendar, GitMerge } from 'lucide-react';

const iconMap: Record<string, any> = {
  'shield-check': ShieldCheck,
  'key': Key,
  'calendar': Calendar,
  'git-merge': GitMerge
};

export function ProcessPrinciples() {
  return (
    <StorySection id="process-principles" eyebrow="Core Values" title="Principles over process">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {PROCESS_PRINCIPLES.map((principle, idx) => {
          const IconComponent = iconMap[principle.icon] || ShieldCheck;
          return (
            <div key={principle.id} className={`flex flex-col ${idx % 2 !== 0 ? 'md:mt-16' : ''}`}>
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <IconComponent className="w-6 h-6 text-white/70" />
              </div>
              <h3 className="text-2xl font-semibold text-white/95 mb-4">{principle.title}</h3>
              <p className="text-white/60 text-lg leading-relaxed">
                {principle.description}
              </p>
            </div>
          );
        })}
      </div>
    </StorySection>
  );
}
