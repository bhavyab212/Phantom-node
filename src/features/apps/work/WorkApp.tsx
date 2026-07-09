'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useWorkNavigation } from './useWorkNavigation';
import WorkIndexHero from './components/WorkIndexHero';
import WorkProjectGrid from './components/WorkProjectGrid';
import CaseStudyStoryPage from './components/CaseStudyStoryPage';
import { WindowInstance } from '../../window-manager/useWindowStore';
import { StoryWindowLayout } from '../../story/components/StoryWindowLayout';

interface WorkAppProps {
  window?: WindowInstance;
}

export default function WorkApp({ window: windowInstance }: WorkAppProps) {
  // Read intent from fileContext or targetContext
  const initialProjectId = 
    windowInstance?.targetContext?.projectId || 
    (windowInstance?.fileContext?.initialIntent as string | undefined);

  const {
    view,
    activeProject,
    openProject,
    backToIndex
  } = useWorkNavigation(initialProjectId);

  // If the window context changes while open, navigate automatically
  useEffect(() => {
    if (initialProjectId) {
      openProject(initialProjectId);
    }
  }, [initialProjectId, openProject]);

  return (
    <div className="flex flex-col w-full h-full bg-[#1C1C1E] text-white/90 font-sans rounded-b-xl overflow-hidden relative">
      <AnimatePresence mode="wait">
        {view === 'case-study' && activeProject ? (
          <motion.div
            key={`cs-${activeProject.id}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } }}
            exit={{ opacity: 0, scale: 1.02, transition: { duration: 0.2, ease: 'easeIn' } }}
            className="absolute inset-0"
          >
            <CaseStudyStoryPage 
              project={activeProject} 
              onBack={backToIndex}
              onOpenProject={openProject}
              windowInstance={windowInstance} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="index"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } }}
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2, ease: 'easeIn' } }}
            className="absolute inset-0"
          >
            <StoryWindowLayout instanceId={windowInstance?.instanceId} showSectionNav={false}>
              <WorkIndexHero />
              <WorkProjectGrid onOpenProject={openProject} />
            </StoryWindowLayout>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
