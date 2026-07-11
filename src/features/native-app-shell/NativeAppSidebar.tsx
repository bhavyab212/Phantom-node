import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useNativeApp } from './NativeAppFrame';

export interface SidebarItemProps {
  id: string;
  icon?: React.ReactNode;
  label: string;
  badge?: number | string;
  isActive?: boolean;
  onClick?: (id: string) => void;
  children?: React.ReactNode; // For nested items
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  id,
  icon,
  label,
  badge,
  isActive,
  onClick,
  children,
}) => {
  const { sidebarMode } = useNativeApp();
  const isCollapsed = sidebarMode === 'collapsed';

  return (
    <div className="flex flex-col mb-1">
      <button
        onClick={() => onClick?.(id)}
        className={cn(
          'flex items-center gap-3 px-3 py-1.5 mx-2 rounded-[var(--radius-lg)] transition-all duration-200 group relative outline-none',
          'focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]',
          isActive
            ? 'bg-[var(--color-surface-2)] shadow-[var(--neu-shadow-dark-pressed)] dark:shadow-[var(--neu-shadow-light-pressed)] text-[var(--color-text)]'
            : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]'
        )}
        title={isCollapsed ? label : undefined}
      >
        {/* Active signal dot */}
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-[var(--color-accent)] rounded-r-full" />
        )}
        {icon && (
          <div className={cn("flex items-center justify-center w-5 h-5 flex-shrink-0 transition-colors", isActive ? "text-[var(--color-accent)]" : "text-current")}>
            {icon}
          </div>
        )}
        {!isCollapsed && (
          <span className="text-sm font-medium flex-1 text-left truncate">{label}</span>
        )}
        {!isCollapsed && badge && (
          <span className="px-1.5 py-0.5 text-xs font-semibold bg-[var(--color-surface)] text-[var(--color-text)]/80 rounded-full">
            {badge}
          </span>
        )}
      </button>
      {!isCollapsed && children && <div className="ml-6 pl-2 border-l border-[var(--glass-border)] mt-1">{children}</div>}
    </div>
  );
};

export interface NativeAppSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const NativeAppSidebar: React.FC<NativeAppSidebarProps> = ({
  children,
  header,
  footer,
  className,
  ...props
}) => {
  const { sidebarMode, isSidebarOpen, closeSidebar } = useNativeApp();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Handle click outside for mobile overlay
  useEffect(() => {
    if (sidebarMode !== 'hidden' || !isSidebarOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarMode, isSidebarOpen, closeSidebar]);

  // Handle escape key
  useEffect(() => {
    if (sidebarMode !== 'hidden' || !isSidebarOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSidebar();
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [sidebarMode, isSidebarOpen, closeSidebar]);

  const isOverlay = sidebarMode === 'hidden';

  return (
    <>
      {/* Overlay Scrim */}
      {isOverlay && (
        <div
          className={cn(
            'fixed inset-0 bg-black/40 backdrop-blur-sm z-30 transition-opacity duration-250',
            isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
          style={{ gridArea: '1 / 1 / -1 / -1' }}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Content */}
      <div
        ref={sidebarRef}
        className={cn(
          'flex flex-col border-r border-[var(--glass-border)] transition-[width,transform] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden',
          'bg-[var(--glass-bg-light)] dark:bg-[var(--glass-bg-dark)]',
          'backdrop-blur-[var(--glass-blur)] backdrop-saturate-[var(--glass-saturate)]',
          // Depth separation tint (surface-2 vs surface)
          'dark:bg-[color-mix(in_oklch,var(--color-surface-2)_65%,transparent)]',
          isOverlay ? 'fixed inset-y-0 left-0 z-40 w-[240px]' : '',
          isOverlay && !isSidebarOpen ? '-translate-x-full' : 'translate-x-0',
          !isOverlay && sidebarMode === 'collapsed' ? 'w-[56px]' : '',
          !isOverlay && sidebarMode === 'expanded' ? 'w-[240px]' : '',
          className
        )}
        style={!isOverlay ? { gridArea: 'sidebar' } : undefined}
        {...props}
      >
        {header && (
          <div className={cn('p-3', sidebarMode === 'collapsed' ? 'flex justify-center' : '')}>
            {header}
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto no-scrollbar py-2">
          {children}
        </div>

        {footer && (
          <div className={cn('p-3 border-t border-[var(--glass-border)]', sidebarMode === 'collapsed' ? 'flex justify-center' : '')}>
            {footer}
          </div>
        )}
      </div>
    </>
  );
};
