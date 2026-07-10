import React from 'react';
import { cn } from '@/lib/utils';
import { useNativeApp } from './NativeAppFrame';
import { Menu } from 'lucide-react';

export interface NativeAppToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title?: string;
  switcher?: React.ReactNode;
  search?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode; // If custom content is needed
}

export const NativeAppToolbar: React.FC<NativeAppToolbarProps> = ({
  icon,
  title,
  switcher,
  search,
  actions,
  children,
  className,
  ...props
}) => {
  const { sidebarMode, toggleSidebar } = useNativeApp();

  return (
    <div
      className={cn(
        'flex items-center px-4 h-[52px] select-none',
        'bg-[var(--glass-bg-light)] dark:bg-[var(--glass-bg-dark)]',
        'backdrop-blur-[var(--glass-blur)] backdrop-saturate-[var(--glass-saturate)]',
        'border-b border-[var(--glass-border)] z-20',
        className
      )}
      style={{ gridArea: 'toolbar' }}
      // data-window-drag="true" is a hook for standard electron/tauri/custom window managers to drag the window
      data-window-drag="true"
      {...props}
    >
      {/* Sidebar Toggle (Only in compact mode) */}
      {sidebarMode === 'hidden' && (
        <button
          type="button"
          onClick={toggleSidebar}
          className="mr-3 p-1.5 rounded-md hover:bg-[var(--color-surface)] dark:hover:bg-[var(--color-surface-2)] text-[var(--color-text)] transition-colors data-[window-drag]:no-drag"
          data-window-drag="false" // Ensure buttons don't trigger window drag
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* App Icon + Title */}
      <div className="flex items-center mr-6 gap-2 pointer-events-none">
        {icon && <div className="text-[var(--color-text)] flex items-center justify-center">{icon}</div>}
        {title && <span className="font-semibold text-[var(--color-text)] text-sm tracking-tight">{title}</span>}
      </div>

      {/* View Switcher / Tabs */}
      {switcher && (
        <div className="flex-shrink-0" data-window-drag="false">
          {switcher}
        </div>
      )}

      {/* Spacer to push search/actions to right */}
      <div className="flex-1" />

      {/* Custom Content */}
      {children && (
        <div className="flex items-center" data-window-drag="false">
          {children}
        </div>
      )}

      {/* Search */}
      {search && (
        <div className="mx-2 w-48 transition-all duration-200 focus-within:w-64" data-window-drag="false">
          {search}
        </div>
      )}

      {/* Actions */}
      {actions && (
        <div className="flex items-center ml-2 gap-2" data-window-drag="false">
          {actions}
        </div>
      )}
    </div>
  );
};
