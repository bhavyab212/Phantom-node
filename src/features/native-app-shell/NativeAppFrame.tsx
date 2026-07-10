import React, { createContext, useContext, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useResponsiveAppLayout, AppBreakpoint, AppOrientation, SidebarMode } from './useResponsiveAppLayout';

interface NativeAppFrameContextValue {
  breakpoint: AppBreakpoint;
  orientation: AppOrientation;
  sidebarMode: SidebarMode;
  contentColumns: number;
  width: number;
  height: number;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const NativeAppFrameContext = createContext<NativeAppFrameContextValue | null>(null);

export function useNativeApp() {
  const context = useContext(NativeAppFrameContext);
  if (!context) {
    throw new Error('useNativeApp must be used within a NativeAppFrame');
  }
  return context;
}

export interface NativeAppFrameProps {
  children: React.ReactNode;
  className?: string;
  defaultSidebarOpen?: boolean;
}

export const NativeAppFrame: React.FC<NativeAppFrameProps> = ({
  children,
  className,
  defaultSidebarOpen = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layout = useResponsiveAppLayout(containerRef);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(defaultSidebarOpen);

  const toggleSidebar = React.useCallback(() => setIsSidebarOpen((prev) => !prev), []);
  const closeSidebar = React.useCallback(() => setIsSidebarOpen(false), []);

  return (
    <NativeAppFrameContext.Provider
      value={{
        ...layout,
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
      }}
    >
      <div
        ref={containerRef}
        className={cn(
          'relative w-full h-full overflow-hidden bg-[var(--color-bg)]',
          className
        )}
        style={{
          display: 'grid',
          gridTemplateColumns: layout.sidebarMode === 'hidden' ? '1fr' : 'auto 1fr',
          gridTemplateRows: 'auto 1fr auto',
          gridTemplateAreas: layout.sidebarMode === 'hidden'
            ? `
              "toolbar"
              "content"
              "status"
            `
            : `
              "toolbar toolbar"
              "sidebar content"
              "status status"
            `
        }}
      >
        {children}
      </div>
    </NativeAppFrameContext.Provider>
  );
};
