import { ReactNode, UIEvent, useEffect, useRef, useState } from 'react';
import { StorySectionNav, SectionDef } from './StorySectionNav';
import { StoryScrollProgress } from './StoryScrollProgress';
import { useWindowStore } from '../../window-manager/useWindowStore';

interface StoryWindowLayoutProps {
  children: ReactNode;
  sections?: SectionDef[];
  ambientBackground?: ReactNode;
  instanceId?: string; // Optional: used if we need to interact with the window manager
  showSectionNav?: boolean;
}

export function StoryWindowLayout({ 
  children, 
  sections = [], 
  ambientBackground,
  instanceId,
  showSectionNav = true
}: StoryWindowLayoutProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id || '');
  const { windows } = useWindowStore();
  const windowInstance = windows.find(w => w.instanceId === instanceId);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollHeight = target.scrollHeight - target.clientHeight;
    if (scrollHeight > 0) {
      setScrollProgress(target.scrollTop / scrollHeight);
    } else {
      setScrollProgress(0);
    }

    // Determine active section based on scroll position
    if (sections.length > 0 && showSectionNav) {
      let currentActive = sections[0].id;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Adjust threshold based on where you consider a section "active"
          if (rect.top <= window.innerHeight * 0.4) {
            currentActive = section.id;
          }
        }
      }
      setActiveSectionId(currentActive);
    }
  };

  const handleNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (el && scrollRef.current) {
      // Scroll to element with some padding
      const offsetTop = el.offsetTop - 100;
      scrollRef.current.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  // Listen for scrollToSection from window context
  useEffect(() => {
    if (windowInstance?.fileContext?.scrollToSection) {
      // Small timeout to ensure render
      setTimeout(() => {
        handleNavigate(windowInstance.fileContext.scrollToSection);
      }, 100);
    }
  }, [windowInstance?.fileContext?.scrollToSection]);

  return (
    <div className="w-full h-full relative bg-[#0a0a0a] text-white flex flex-col font-sans">
      {ambientBackground && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
          {ambientBackground}
        </div>
      )}
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto custom-scrollbar relative z-10 scroll-smooth"
        onScroll={handleScroll}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12 flex flex-col items-center">
          
          {showSectionNav && sections.length > 0 && (
            <StorySectionNav 
              sections={sections} 
              activeSectionId={activeSectionId} 
              onNavigate={handleNavigate} 
            />
          )}
          
          <div className="w-full">
            {children}
          </div>
          
        </div>
      </div>
      
      <StoryScrollProgress progress={scrollProgress} />
    </div>
  );
}
