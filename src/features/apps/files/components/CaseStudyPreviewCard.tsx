import { CaseStudy } from '../case-studies-data';
import { ArrowUpRight } from 'lucide-react';

interface CaseStudyPreviewCardProps {
  caseStudy: CaseStudy;
}

export function CaseStudyPreviewCard({ caseStudy }: CaseStudyPreviewCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-sm font-semibold text-white/90">{caseStudy.projectName}</h4>
          <p className="text-xs text-white/50">{caseStudy.clientName}</p>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-white/40 bg-white/5 px-2 py-1 rounded">
          {caseStudy.year}
        </span>
      </div>
      
      <div className="bg-[#1a1a1a] rounded p-2.5 border border-white/5">
        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Key Result</div>
        <div className="text-sm font-medium text-[var(--accent-color,#3b82f6)] flex items-center gap-1.5">
          <ArrowUpRight size={14} />
          {caseStudy.results[0]}
        </div>
      </div>
      
      <div className="text-xs text-white/60">
        <span className="text-white/40">Category:</span> {caseStudy.category}
      </div>
    </div>
  );
}
