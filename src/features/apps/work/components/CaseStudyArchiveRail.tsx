import { CaseStudy } from '../work-types';
import { StorySection } from '../../../story/components/StorySection';
import { Folder, FileText } from 'lucide-react';
import { useGlobalContentIndex } from '../../../story/useGlobalContentIndex';

interface CaseStudyArchiveRailProps {
  project: CaseStudy;
}

export default function CaseStudyArchiveRail({ project }: CaseStudyArchiveRailProps) {
  const { executeAction } = useGlobalContentIndex();

  const handleOpenFiles = () => {
    executeAction({ 
      id: 'idx-act-files', 
      type: 'app', 
      label: 'Files', 
      keywords: [], 
      targetApp: 'files',
      targetContext: { targetFolderId: project.linkedFileFolderId }
    });
  };

  return (
    <StorySection id="files" eyebrow="Source Files" title="">
      <div className="w-full bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10 flex flex-col items-center text-center">
        <Folder size={48} className="text-[var(--accent-color,#3b82f6)] mb-6 opacity-80" />
        <h2 className="text-3xl font-bold text-white/95 mb-4">
          Inspect the working documents
        </h2>
        <p className="text-lg text-white/60 max-w-2xl leading-relaxed mb-10">
          This isn't just a marketing story. We maintain a public archive of the real strategy documents, wireframes, and brand guidelines created during this project.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button 
            onClick={handleOpenFiles}
            className="px-8 py-4 rounded-xl text-white font-medium transition-transform active:scale-[0.98] flex items-center justify-center gap-3 bg-[var(--accent-color,#3b82f6)] hover:bg-[var(--accent-color,#3b82f6)]/90"
          >
            <Folder size={20} />
            Open project folder in Files
          </button>
        </div>
      </div>
    </StorySection>
  );
}
