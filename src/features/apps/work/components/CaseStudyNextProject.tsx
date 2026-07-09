import { CaseStudy } from '../work-types';
import { ArrowRight } from 'lucide-react';
import { WORK_PROJECTS } from '../work-data';

interface CaseStudyNextProjectProps {
  currentProject: CaseStudy;
  onOpenProject: (id: string) => void;
  onBackToIndex: () => void;
}

export default function CaseStudyNextProject({ currentProject, onOpenProject, onBackToIndex }: CaseStudyNextProjectProps) {
  // Find the next project based on sortOrder
  const sortedProjects = [...WORK_PROJECTS].sort((a, b) => a.sortOrder - b.sortOrder);
  const currentIndex = sortedProjects.findIndex(p => p.id === currentProject.id);
  
  // If it's the last project, loop back to the first one, or we could return to index.
  // We'll loop to the first one.
  const nextProject = sortedProjects[(currentIndex + 1) % sortedProjects.length];

  if (!nextProject) return null;

  return (
    <div className="py-24 md:py-32 border-t border-white/5 mt-12 flex flex-col items-center text-center">
      <div className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-8">
        Up Next
      </div>
      
      <button 
        onClick={() => onOpenProject(nextProject.id)}
        className="group flex flex-col items-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white/95 mb-4 group-hover:text-[var(--accent-color,#3b82f6)] transition-colors">
          {nextProject.projectName}
        </h2>
        <p className="text-xl text-white/60 mb-8 max-w-2xl">
          {nextProject.tagline}
        </p>
        
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[var(--accent-color,#3b82f6)] transition-all">
          <ArrowRight size={24} className="text-white/60 group-hover:text-white group-hover:translate-x-2 transition-transform duration-300" />
        </div>
      </button>

      <button 
        onClick={onBackToIndex}
        className="mt-16 text-sm text-white/50 hover:text-white/90 transition-colors"
      >
        View all case studies
      </button>
    </div>
  );
}
