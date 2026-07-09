import { useState, useCallback } from 'react';
import { WORK_PROJECTS } from './work-data';

type WorkView = 'index' | 'case-study';

interface WorkNavigationState {
  view: WorkView;
  activeProjectId: string | null;
}

export function useWorkNavigation(initialProjectId?: string | null) {
  const [state, setState] = useState<WorkNavigationState>(() => {
    if (initialProjectId && WORK_PROJECTS.some(p => p.id === initialProjectId)) {
      return { view: 'case-study', activeProjectId: initialProjectId };
    }
    return { view: 'index', activeProjectId: null };
  });

  // Track simple history for back button functionality
  const [history, setHistory] = useState<WorkNavigationState[]>([state]);

  const openProject = useCallback((id: string) => {
    if (!WORK_PROJECTS.some(p => p.id === id)) return;
    const newState: WorkNavigationState = { view: 'case-study', activeProjectId: id };
    setState(newState);
    setHistory(prev => [...prev, newState]);
  }, []);

  const openProjectBySlug = useCallback((slug: string) => {
    const project = WORK_PROJECTS.find(p => p.slug === slug);
    if (project) {
      openProject(project.id);
    }
  }, [openProject]);

  const backToIndex = useCallback(() => {
    const newState: WorkNavigationState = { view: 'index', activeProjectId: null };
    setState(newState);
    setHistory(prev => [...prev, newState]);
  }, []);

  const goBack = useCallback(() => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // Remove current state
      const previousState = newHistory[newHistory.length - 1];
      setState(previousState);
      setHistory(newHistory);
    } else {
      backToIndex();
    }
  }, [history, backToIndex]);

  return {
    view: state.view,
    activeProjectId: state.activeProjectId,
    openProject,
    openProjectBySlug,
    backToIndex,
    goBack,
    // Provide the active project data directly for convenience
    activeProject: state.activeProjectId ? WORK_PROJECTS.find(p => p.id === state.activeProjectId) || null : null
  };
}
