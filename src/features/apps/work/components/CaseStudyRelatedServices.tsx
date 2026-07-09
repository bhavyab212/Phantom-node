import { CaseStudy } from '../work-types';
import { StorySection } from '../../../story/components/StorySection';
import { useGlobalContentIndex } from '../../../story/useGlobalContentIndex';
import { Briefcase } from 'lucide-react';

interface CaseStudyRelatedServicesProps {
  project: CaseStudy;
}

export default function CaseStudyRelatedServices({ project }: CaseStudyRelatedServicesProps) {
  const { executeAction } = useGlobalContentIndex();

  const handleOpenServices = () => {
    executeAction({ 
      id: project.serviceIntent, 
      type: 'service', 
      label: 'Service', 
      keywords: [], 
      targetApp: 'services',
      targetSectionId: project.serviceIntent.replace('idx-', '')
    });
  };

  const handleStartProject = () => {
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
    <StorySection id="services" eyebrow="Related Service" title="">
      <div className="w-full bg-[var(--accent-color,#3b82f6)]/10 rounded-3xl p-8 md:p-12 border border-[var(--accent-color,#3b82f6)]/20 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div>
          <h2 className="text-2xl font-bold text-white/95 mb-2">
            Want results like this?
          </h2>
          <p className="text-[var(--accent-color,#3b82f6)]/80 text-lg">
            Learn more about our {project.category} services.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <button 
            onClick={handleOpenServices}
            className="px-6 py-3.5 rounded-xl text-[var(--accent-color,#3b82f6)] font-medium transition-colors bg-[var(--accent-color,#3b82f6)]/10 hover:bg-[var(--accent-color,#3b82f6)]/20 border border-[var(--accent-color,#3b82f6)]/20 flex items-center gap-3"
          >
            <Briefcase size={20} />
            View Service
          </button>
          <button 
            onClick={handleStartProject}
            className="px-6 py-3.5 rounded-xl text-white font-medium transition-colors bg-[var(--accent-color,#3b82f6)] hover:bg-[var(--accent-color,#3b82f6)]/90 flex items-center justify-center"
          >
            Start a similar project
          </button>
        </div>
      </div>
    </StorySection>
  );
}
