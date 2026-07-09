import { CASE_STUDIES } from '../case-studies-data';
import { Briefcase, BarChart, Clock } from 'lucide-react';

export function PortfolioFolderHero() {
  const numCaseStudies = CASE_STUDIES.length;
  const categories = new Set(CASE_STUDIES.map(cs => cs.category)).size;

  return (
    <div className="flex-shrink-0 bg-white/5 border-b border-white/5 p-6 mb-2">
      <div className="flex items-center gap-4 mb-3">
        <div className="p-3 bg-white/10 rounded-xl">
          <Briefcase size={24} className="text-white/80" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white/90">Selected Work</h2>
          <p className="text-sm text-white/50 mt-0.5">Explore our case studies, project files, and proven results.</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6 mt-4">
        <div className="flex items-center gap-2 text-xs text-white/60">
          <BarChart size={14} className="text-white/40" />
          <span>{numCaseStudies} case studies</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <Briefcase size={14} className="text-white/40" />
          <span>{categories} categories represented</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <Clock size={14} className="text-white/40" />
          <span>Est. 2024–2026</span>
        </div>
      </div>
    </div>
  );
}
