import React, { useEffect } from 'react';
import { WindowInstance, useWindowStore } from '../../window-manager/useWindowStore';
import { NativeAppShell, SidebarGroup, SidebarItem } from '../../ui/NativeAppShell';
import { Briefcase, FileText, ArrowRight } from 'lucide-react';
import { useWorkNavigation } from './useWorkNavigation';
import { WORK_PROJECTS } from './work-data';
import CaseStudyStoryPage from './components/CaseStudyStoryPage';

interface WorkAppProps {
  window: WindowInstance;
}

export default function WorkApp({ window: windowInstance }: WorkAppProps) {
  const { openApp } = useWindowStore();
  
  // Read intent from fileContext or targetContext
  const initialProjectId = 
    windowInstance?.targetContext?.projectId || 
    (windowInstance?.fileContext?.initialIntent as string | undefined);

  const {
    view,
    activeProjectId,
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

  const sidebar = (
    <div className="py-2">
      <SidebarGroup title="Portfolio">
        <SidebarItem 
          icon={Briefcase} 
          label="All Projects" 
          isActive={view === 'index' || !activeProjectId} 
          onClick={backToIndex} 
        />
      </SidebarGroup>
      
      <SidebarGroup title="Case Studies">
        {WORK_PROJECTS.map((project) => (
          <SidebarItem 
            key={project.id}
            icon={FileText} 
            label={project.clientName} 
            isActive={activeProjectId === project.id} 
            onClick={() => openProject(project.id)} 
          />
        ))}
      </SidebarGroup>
    </div>
  );

  const toolbar = (
    <div className="flex items-center gap-2 text-sm font-medium">
      <span className="text-white/40">Work</span>
      <span className="text-white/40">/</span>
      <span className="text-white/90">
        {activeProject ? activeProject.clientName : 'All Projects'}
      </span>
    </div>
  );

  const content = (
    <div className="flex flex-col h-full w-full">
      {activeProject ? (
        <CaseStudyStoryPage 
          project={activeProject} 
          onBack={backToIndex}
          onOpenProject={openProject}
          windowInstance={windowInstance} 
        />
      ) : (
        <div className="p-8 max-w-5xl mx-auto w-full">
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Selected Work</h1>
          <p className="text-white/50 text-sm mb-8">Outcomes we're proud to put our name on.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WORK_PROJECTS.map((project) => (
              <button 
                key={project.id}
                onClick={() => openProject(project.id)} 
                className="group flex flex-col text-left bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">
                      {project.clientName}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h4 className="text-sm font-medium text-white/70 mb-2">{project.projectName}</h4>
                  <p className="text-white/50 text-sm line-clamp-2">{project.tagline}</p>
                </div>
                <div className="bg-black/20 px-6 py-3 border-t border-white/5 text-xs font-medium text-white/40 uppercase tracking-wider flex justify-between">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <NativeAppShell 
      appId={windowInstance.instanceId}
      sidebar={sidebar}
      toolbar={toolbar}
      content={content}
    />
  );
}
