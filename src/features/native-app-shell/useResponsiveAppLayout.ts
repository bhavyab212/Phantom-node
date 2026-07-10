import { useState, useEffect, RefObject } from 'react';

export type AppBreakpoint = 'compact' | 'regular' | 'wide' | 'expanded';
export type AppOrientation = 'narrow' | 'square' | 'wide';
export type SidebarMode = 'hidden' | 'collapsed' | 'expanded';

interface ResponsiveAppLayout {
  width: number;
  height: number;
  breakpoint: AppBreakpoint;
  orientation: AppOrientation;
  sidebarMode: SidebarMode;
  contentColumns: number;
}

export function useResponsiveAppLayout(containerRef: RefObject<HTMLElement | null>): ResponsiveAppLayout {
  const [layout, setLayout] = useState<ResponsiveAppLayout>({
    width: 0,
    height: 0,
    breakpoint: 'regular',
    orientation: 'wide',
    sidebarMode: 'collapsed',
    contentColumns: 1,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateLayout = (width: number, height: number) => {
      let breakpoint: AppBreakpoint = 'expanded';
      if (width < 560) breakpoint = 'compact';
      else if (width < 900) breakpoint = 'regular';
      else if (width < 1280) breakpoint = 'wide';

      let orientation: AppOrientation = 'square';
      const ratio = width / height;
      if (ratio < 0.8) orientation = 'narrow';
      else if (ratio > 1.2) orientation = 'wide';

      let sidebarMode: SidebarMode = 'expanded';
      if (breakpoint === 'compact') sidebarMode = 'hidden';
      else if (breakpoint === 'regular') sidebarMode = 'collapsed';

      let contentColumns = 1;
      if (width >= 1200) contentColumns = 3;
      else if (width >= 800) contentColumns = 2;

      setLayout({
        width,
        height,
        breakpoint,
        orientation,
        sidebarMode,
        contentColumns,
      });
    };

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === container) {
          // Use contentRect for the actual size of the content area
          updateLayout(entry.contentRect.width, entry.contentRect.height);
        }
      }
    });

    observer.observe(container);

    // Initial check
    const rect = container.getBoundingClientRect();
    updateLayout(rect.width, rect.height);

    return () => {
      observer.disconnect();
    };
  }, [containerRef]);

  return layout;
}
