import React from 'react';
import { cn } from '@/lib/utils';
import { SkeuomorphicAccent } from '@/features/native-app-shell';
import type { CaseStudyData } from '../data';

export interface CaseFolderCardProps {
  caseStudy: CaseStudyData;
  onClick: () => void;
  className?: string;
}

export const CaseFolderCard: React.FC<CaseFolderCardProps> = ({ caseStudy, onClick, className }) => {
  return (
    <div
      onClick={onClick}
      className={cn("group cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-lg", className)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* 
        The folder tab. 
        We use a simple skewed div or just a rounded top-left corner box to look like a manila folder tab. 
      */}
      <div className="flex">
        <div className="bg-[var(--glass-bg-light)] dark:bg-[var(--glass-bg-dark)] border-t border-l border-r border-[var(--glass-border)] rounded-t-lg px-4 py-2 relative top-[1px] z-10 shadow-[var(--shadow-sm)]">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text)]/70">
            {caseStudy.client}
          </span>
        </div>
      </div>

      {/* The main folder body using the skeuomorphic stitched edge and paper grain */}
      <SkeuomorphicAccent 
        variant="paper-grain" 
        className="w-full h-full rounded-b-lg rounded-tr-lg transition-transform duration-300 group-hover:-translate-y-1 group-active:translate-y-0"
      >
        <SkeuomorphicAccent variant="stitched-edge" className="h-full border-[var(--glass-border)]">
          <div className="bg-[var(--glass-bg-light)] dark:bg-[var(--glass-bg-dark)] backdrop-blur-[var(--glass-blur)] backdrop-saturate-[var(--glass-saturate)] p-6 min-h-[14rem] h-auto flex flex-col justify-between relative shadow-[var(--shadow-md)] rounded-b-lg rounded-tr-lg">
            
            {/* Top right category pill */}
            <div className="absolute top-4 right-4 bg-[var(--color-surface)] px-2 py-1 rounded-md shadow-sm border border-[var(--glass-border)]">
              <span className="text-[10px] font-semibold text-[var(--color-text)]/80 uppercase">{caseStudy.category}</span>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-bold text-[var(--color-text)] tracking-tight leading-tight mb-2">
                {caseStudy.title}
              </h3>
              <p className="text-sm text-[var(--color-text)]/70 line-clamp-3">
                {caseStudy.shortDescription}
              </p>
            </div>

            {/* Simulated file contents peeking out (purely visual depth) */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none rounded-[inherit] overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-[var(--glass-highlight)]" />
            </div>

          </div>
        </SkeuomorphicAccent>
      </SkeuomorphicAccent>
    </div>
  );
};
