import { CaseStudy } from '../work-types';
import { StoryCTACluster } from '../../../story/components/StoryCTACluster';
import { StoryHero } from '../../../story/components/StoryHero';
import { useGlobalContentIndex } from '../../../story/useGlobalContentIndex';

interface CaseStudyHeroProps {
  project: CaseStudy;
  onOpenArchive: () => void;
}

export default function CaseStudyHero({ project, onOpenArchive }: CaseStudyHeroProps) {
  const { executeAction } = useGlobalContentIndex();

  const handleStartProject = () => {
    import('../../../../lib/analytics').then(({ trackWorkContactRequested }) => {
      trackWorkContactRequested(project.id, project.clientName, project.category);
    });
    executeAction({ 
      id: 'idx-act-start', 
      type: 'action', 
      label: 'Start', 
      keywords: [], 
      targetApp: 'contact',
      actionIntent: project.serviceIntent 
    });
  };

  return (
    <StoryHero 
      eyebrow={project.category}
      headline={project.projectName}
      subheadline={
        <div className="flex flex-col gap-6">
          <p className="text-xl text-white/60 leading-relaxed">{project.tagline}</p>
          <div className="flex items-center gap-4 py-4 px-6 bg-white/5 rounded-2xl border border-white/10 w-fit">
            <div className="w-12 h-12 rounded-full bg-[var(--accent-color,#3b82f6)]/20 flex items-center justify-center">
              <span className="text-[var(--accent-color,#3b82f6)] font-bold text-lg">!</span>
            </div>
            <div>
              <div className="text-sm text-white/40 font-medium uppercase tracking-wider mb-1">Key Outcome</div>
              <div className="text-2xl font-bold text-white/95">{project.headlineMetric}</div>
            </div>
          </div>
        </div>
      }
      ctaCluster={
        <StoryCTACluster 
          primaryLabel="Start a similar project"
          onPrimaryClick={handleStartProject}
          secondaryLabel="Open source files"
          onSecondaryClick={onOpenArchive}
        />
      }
    />
  );
}
