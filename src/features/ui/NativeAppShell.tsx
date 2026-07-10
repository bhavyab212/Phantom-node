import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, Settings } from 'lucide-react';
import { useWindowStore } from '../window-manager/useWindowStore';

export interface NativeAppShellProps {
  sidebar?: ReactNode;
  toolbar?: ReactNode;
  content: ReactNode;
  appId?: string;
}

export function NativeAppShell({ sidebar, toolbar, content, appId }: NativeAppShellProps) {
  const { windows } = useWindowStore();
  const isActive = !appId || windows[windows.length - 1]?.instanceId === appId;

  return (
    <div className="flex w-full h-full bg-[#09090b] text-white overflow-hidden pointer-events-auto selection:bg-blue-500/30">
      
      {/* Sidebar - Fixed width, frosted glass */}
      {sidebar && (
        <div className={`w-64 flex-shrink-0 bg-white/5 backdrop-blur-3xl border-r border-white/10 flex flex-col transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
          <div className="h-full overflow-y-auto overflow-x-hidden p-3 custom-scrollbar">
            {sidebar}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0c0c0e] relative">
        
        {/* Toolbar / Header */}
        <div className={`h-14 flex-shrink-0 border-b border-white/5 bg-white/[0.02] backdrop-blur-md flex items-center px-4 justify-between transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
          <div className="flex items-center gap-4 flex-1">
            {toolbar ? toolbar : (
               <div className="flex items-center gap-2 text-white/50 text-sm font-medium">
                  {/* Default fallback toolbar */}
               </div>
            )}
          </div>
          
          {/* Universal Native Actions (Search, Notification, Settings) */}
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-md flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-md flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors">
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar relative">
          <div className="absolute inset-0">
             {content}
          </div>
        </div>
      </div>
      
      {/* Global Native App Styles overrides */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}

// Reusable Native Sidebar Components
export function SidebarGroup({ title, children }: { title: string, children: ReactNode }) {
  return (
    <div className="mb-6">
      <h4 className="px-3 text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">{title}</h4>
      <div className="space-y-0.5">
        {children}
      </div>
    </div>
  );
}

export function SidebarItem({ icon: Icon, label, isActive, onClick, badge }: { icon: any, label: string, isActive?: boolean, onClick?: () => void, badge?: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
        isActive 
          ? 'bg-blue-500/20 text-blue-400 font-medium' 
          : 'text-white/70 hover:bg-white/5 hover:text-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-white/50'}`} />
        <span>{label}</span>
      </div>
      {badge && (
        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-blue-500/30 text-blue-300' : 'bg-white/10 text-white/50'}`}>
          {badge}
        </span>
      )}
    </button>
  );
}
