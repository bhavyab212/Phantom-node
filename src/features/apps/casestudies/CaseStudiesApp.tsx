import React, { useState, useMemo } from 'react';
import {
  NativeAppFrame,
  NativeAppToolbar,
  NativeAppContent,
  NativeSegmentedControl,
  GlassPanel,
  useNativeApp
} from '@/features/native-app-shell';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { CASE_STUDIES } from './data';
import { CaseStudiesSidebar } from './components/CaseStudiesSidebar';
import { CaseFolderCard } from './components/CaseFolderCard';
import { CaseStudyDetailView } from './components/CaseStudyDetailView';

const CaseStudiesAppContent: React.FC = () => {
  const { breakpoint, contentColumns } = useNativeApp();
  const isCompact = breakpoint === 'compact';

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);

  const filteredCases = useMemo(() => {
    if (!activeCategory) return CASE_STUDIES;
    return CASE_STUDIES.filter(cs => cs.category === activeCategory);
  }, [activeCategory]);

  const activeCase = useMemo(() => {
    return CASE_STUDIES.find(cs => cs.id === activeCaseId) || null;
  }, [activeCaseId]);

  // Derived layout values
  const showModalOverlay = !isCompact && activeCaseId !== null;
  const showFullScreenDetail = isCompact && activeCaseId !== null;

  // Categories for the compact segmented control filter
  const categories = useMemo(() => Array.from(new Set(CASE_STUDIES.map(cs => cs.category))), []);
  
  const compactFilterSwitcher = (
    <NativeSegmentedControl
      segments={[
        { id: 'all', label: 'All' },
        ...categories.map(c => ({ id: c, label: c }))
      ]}
      activeId={activeCategory || 'all'}
      onChange={(id) => setActiveCategory(id === 'all' ? null : id)}
      className="w-full mt-2 mx-4 max-w-[calc(100vw-32px)]"
    />
  );

  return (
    <>
      <NativeAppToolbar title="Work" />

      {/* Filter bar for compact layout (if not viewing a detail full screen) */}
      {isCompact && !showFullScreenDetail && (
        <div className="bg-[var(--glass-bg-light)] dark:bg-[var(--glass-bg-dark)] backdrop-blur-[var(--glass-blur)] backdrop-saturate-[var(--glass-saturate)] border-b border-[var(--glass-border)] pb-2 z-10 sticky top-[52px]">
          {compactFilterSwitcher}
        </div>
      )}

      {!isCompact && (
        <CaseStudiesSidebar 
          activeCategory={activeCategory} 
          onSelectCategory={setActiveCategory} 
        />
      )}

      {/* Main Content Area */}
      <NativeAppContent maxWidth="xl" className="pb-24 pt-8">
        
        {/* Detail View taking over full screen on compact mode */}
        {showFullScreenDetail && activeCase ? (
          <div className="px-4">
            <button 
              onClick={() => setActiveCaseId(null)}
              className="flex items-center gap-2 text-[var(--color-text)]/70 hover:text-[var(--color-text)] mb-6 text-sm font-semibold uppercase tracking-wider outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-md px-2 py-1 -ml-2 transition-colors"
            >
              <X className="w-4 h-4" /> Close File
            </button>
            <CaseStudyDetailView caseStudy={activeCase} />
          </div>
        ) : (
          /* Grid of Case Folders */
          <div 
            className="grid gap-8 p-4 md:p-8"
            style={{ 
              gridTemplateColumns: `repeat(${isCompact ? 1 : contentColumns}, minmax(0, 1fr))` 
            }}
          >
            {filteredCases.map((caseStudy) => (
              <CaseFolderCard 
                key={caseStudy.id} 
                caseStudy={caseStudy} 
                onClick={() => setActiveCaseId(caseStudy.id)} 
              />
            ))}
          </div>
        )}
      </NativeAppContent>

      {/* Detail View acting as Modal Overlay on wide screens */}
      {showModalOverlay && activeCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8 pointer-events-none">
          {/* Backdrop Scrim */}
          <div 
            className="absolute inset-0 bg-[var(--color-bg)]/60 backdrop-blur-sm pointer-events-auto transition-opacity" 
            onClick={() => setActiveCaseId(null)}
          />
          
          {/* Modal Content */}
          <GlassPanel 
            elevation="high" 
            tint="light" 
            className="relative pointer-events-auto w-full max-w-5xl max-h-full overflow-y-auto no-scrollbar rounded-2xl flex flex-col animate-in zoom-in-95 duration-200"
          >
            <div className="sticky top-0 bg-[var(--glass-bg-light)] dark:bg-[var(--glass-bg-dark)]/90 backdrop-blur-xl border-b border-[var(--glass-border)] p-4 flex justify-end z-20">
              <button 
                onClick={() => setActiveCaseId(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] text-[var(--color-text)] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-8 md:p-12">
              <CaseStudyDetailView caseStudy={activeCase} />
            </div>
          </GlassPanel>
        </div>
      )}
    </>
  );
};

export const CaseStudiesApp: React.FC = () => {
  return (
    <NativeAppFrame>
      <CaseStudiesAppContent />
    </NativeAppFrame>
  );
};
