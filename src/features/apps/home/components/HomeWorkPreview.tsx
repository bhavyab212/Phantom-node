import { StorySection } from '../../../story/components/StorySection';
import { useGlobalContentIndex } from '../../../story/useGlobalContentIndex';
import { ArrowRight } from 'lucide-react';
import { WORK_PROJECTS } from '../../work/work-data';

export function HomeWorkPreview() {
  const { executeAction } = useGlobalContentIndex();

  const featuredProjects = WORK_PROJECTS.filter(p => p.featured).slice(0, 2);

  return (
    <StorySection 
      id="work" 
      eyebrow="Selected Work" 
      title="Proof of impact"
      sideNote={
        <div className="flex flex-col gap-4">
          <p className="text-sm text-white/60">
            We measure success not just by aesthetics, but by business outcomes. Explore our portfolio to see the raw files and results.
          </p>
          <button 
            onClick={() => executeAction({ id: 'work', type: 'app', label: 'Work', keywords: [], targetApp: 'work' })}
            className="flex items-center gap-2 text-sm text-[var(--accent-color,#3b82f6)] font-medium hover:text-white transition-colors mt-4"
          >
            View all work <ArrowRight size={16} />
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {featuredProjects.map((cs) => (
          <div 
            key={cs.id}
            onClick={() => executeAction({ 
              id: `work-${cs.slug}`, 
              type: 'case-study', 
              label: cs.projectName, 
              keywords: [], 
              targetApp: 'work', 
              targetContext: { projectId: cs.id } 
            })}
            className="group cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-[#1a1a1a] border border-white/5 rounded-2xl hover:border-white/20 transition-colors gap-4"
          >
            <div>
              <h3 className="text-xl font-semibold text-white/95 group-hover:text-[var(--accent-color,#3b82f6)] transition-colors">
                {cs.projectName}
              </h3>
              <p className="text-sm text-white/50 mt-1">{cs.category}</p>
            </div>
            <div className="px-4 py-2 rounded-lg border font-medium text-sm whitespace-nowrap bg-[var(--accent-color,#3b82f6)]/10 text-[var(--accent-color,#3b82f6)] border-[var(--accent-color,#3b82f6)]/20">
              {cs.headlineMetric}
            </div>
          </div>
        ))}
      </div>
    </StorySection>
  );
}
