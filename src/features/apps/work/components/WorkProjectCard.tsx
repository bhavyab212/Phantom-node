import { CaseStudy } from '../work-types';

interface WorkProjectCardProps {
  project: CaseStudy;
  onClick: () => void;
  isFeatured?: boolean;
}

export default function WorkProjectCard({ project, onClick, isFeatured = false }: WorkProjectCardProps) {
  return (
    <button 
      onClick={onClick}
      className={`group w-full text-left bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/[0.07] hover:border-white/20 transition-all flex flex-col ${isFeatured ? 'md:flex-row' : ''}`}
      aria-label={`Open case study: ${project.projectName}, Key result: ${project.headlineMetric}`}
    >
      {/* Visual Placeholder / Thumbnail */}
      <div className={`relative bg-gradient-to-br from-white/[0.02] to-white/[0.08] ${isFeatured ? 'md:w-1/2 min-h-[300px]' : 'h-48'}`}>
        {/* We would render project.heroMedia.url here if we had images */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:scale-105 transition-transform duration-500">
          <div className="w-24 h-24 rounded-full bg-[var(--accent-color,#3b82f6)] blur-3xl" />
        </div>
      </div>

      <div className={`p-8 md:p-10 flex flex-col justify-center ${isFeatured ? 'md:w-1/2' : ''}`}>
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full border border-[var(--accent-color,#3b82f6)]/30 text-[var(--accent-color,#3b82f6)] text-xs font-semibold tracking-widest uppercase bg-[var(--accent-color,#3b82f6)]/10">
            {project.category}
          </span>
          <span className="text-white/40 text-xs font-medium">{project.year}</span>
        </div>
        
        <h3 className="text-3xl font-bold text-white/95 mb-4 group-hover:text-[var(--accent-color,#3b82f6)] transition-colors">
          {project.projectName}
        </h3>
        
        <p className="text-white/60 text-lg leading-relaxed mb-8">
          {project.tagline}
        </p>

        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="text-sm text-white/40 font-medium uppercase tracking-wider mb-2">Key Outcome</div>
          <div className="text-xl font-semibold text-white/90">{project.headlineMetric}</div>
        </div>
      </div>
    </button>
  );
}
