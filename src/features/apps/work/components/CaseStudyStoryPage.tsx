import { CaseStudy } from '../work-types';
import { StoryWindowLayout } from '../../../story/components/StoryWindowLayout';
import CaseStudyHero from './CaseStudyHero';
import CaseStudyChallenge from './CaseStudyChallenge';
import CaseStudyStrategy from './CaseStudyStrategy';
import CaseStudyExecution from './CaseStudyExecution';
import CaseStudyResults from './CaseStudyResults';
import CaseStudyTimeline from './CaseStudyTimeline';
import CaseStudyQuote from './CaseStudyQuote';
import CaseStudyGallery from './CaseStudyGallery';
import CaseStudyArchiveRail from './CaseStudyArchiveRail';
import CaseStudyRelatedServices from './CaseStudyRelatedServices';
import CaseStudyNextProject from './CaseStudyNextProject';
import { WindowInstance } from '../../../window-manager/useWindowStore';
import { ArrowLeft } from 'lucide-react';
import { useGlobalContentIndex } from '../../../story/useGlobalContentIndex';

interface CaseStudyStoryPageProps {
  project: CaseStudy;
  onBack: () => void;
  onOpenProject: (id: string) => void;
  windowInstance?: WindowInstance;
}

export default function CaseStudyStoryPage({ project, onBack, onOpenProject, windowInstance }: CaseStudyStoryPageProps) {
  const { executeAction } = useGlobalContentIndex();

  const handleOpenArchive = () => {
    executeAction({ 
      id: 'idx-act-files', 
      type: 'app', 
      label: 'Files', 
      keywords: [], 
      targetApp: 'files',
      targetContext: { targetFolderId: project.linkedFileFolderId }
    });
  };

  const SECTIONS = [
    { id: 'challenge', label: 'Challenge' },
    { id: 'strategy', label: 'Strategy' },
    { id: 'execution', label: 'Execution' },
    { id: 'results', label: 'Results' },
    ...(project.gallery && project.gallery.length > 0 ? [{ id: 'gallery', label: 'Gallery' }] : []),
    ...(project.testimonial ? [{ id: 'quote', label: 'Testimonial' }] : []),
    { id: 'files', label: 'Files' },
    { id: 'services', label: 'Services' }
  ];

  return (
    <StoryWindowLayout 
      instanceId={windowInstance?.instanceId}
      sections={SECTIONS}
      ambientBackground={
        <div className="absolute top-0 right-0 w-[80%] h-[60%] bg-[var(--accent-color,#3b82f6)] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      }
    >
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 md:left-12 z-50 flex items-center gap-2 text-white/50 hover:text-white/90 transition-colors text-sm font-medium"
      >
        <ArrowLeft size={16} /> All Work
      </button>

      <CaseStudyHero project={project} onOpenArchive={handleOpenArchive} />
      
      <CaseStudyChallenge challenge={project.challenge} />
      
      <CaseStudyStrategy strategy={project.strategy} />
      <CaseStudyTimeline timeline={project.timeline} />
      
      <CaseStudyExecution execution={project.execution} />
      
      <CaseStudyResults results={project.results} metrics={project.metrics} />
      
      <CaseStudyGallery gallery={project.gallery} />
      <CaseStudyQuote testimonial={project.testimonial} />
      
      <CaseStudyArchiveRail project={project} />
      <CaseStudyRelatedServices project={project} />
      
      <CaseStudyNextProject 
        currentProject={project}
        onOpenProject={onOpenProject}
        onBackToIndex={onBack}
      />
    </StoryWindowLayout>
  );
}
