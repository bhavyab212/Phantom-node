'use client';

import { useState } from 'react';
import TaskbarStartButton from './TaskbarStartButton';
import TaskbarPinnedApps from './TaskbarPinnedApps';
import SystemTray from './SystemTray';
import { Search, MonitorDown } from 'lucide-react';
import { useDesktopPreferences } from '../../system/useDesktopPreferences';
import { useWindowStore } from '../../window-manager/useWindowStore';

interface TaskbarProps {
  isStartOpen: boolean;
  toggleStart: () => void;
}

export default function Taskbar({ isStartOpen, toggleStart }: TaskbarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const taskbarAutoHide = useDesktopPreferences((s) => s.taskbarAutoHide);
  
  const windows = useWindowStore(s => s.windows);
  const studioWindow = windows.find(w => w.appId === 'phantom-node-studio');
  const isStudioFocusMode = !!(studioWindow && !studioWindow.isMinimized);

  // Hide taskbar when studio is in focus mode (regardless of auto-hide setting)
  const isVisible = isStudioFocusMode 
    ? false
    : (!taskbarAutoHide || isHovered || isStartOpen);

  return (
    <>
      {/* Invisible hover trigger area at the very bottom of the screen */}
      {(taskbarAutoHide) && !isStudioFocusMode && !isVisible && (
        <div 
          className="fixed bottom-0 left-0 right-0 h-4 bg-transparent z-[49] pointer-events-auto cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
        />
      )}

      {/* Studio Focus Mode - Gesture Bar */}
      {isStudioFocusMode && (
        <div 
          className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[9999] pointer-events-auto flex justify-center items-end h-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            onClick={() => {
              if (studioWindow) {
                useWindowStore.getState().minimizeWindow(studioWindow.instanceId);
                setIsHovered(false);
              }
            }}
            className={`flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-lg ${
              isHovered 
                ? 'bg-[#111111]/80 hover:bg-[#222222]/90 border border-white/20 rounded-full px-4 py-2 gap-2 w-auto h-auto' 
                : 'bg-white/40 rounded-full w-32 h-1'
            }`}
          >
            {isHovered && (
              <>
                <MonitorDown size={14} className="text-white" />
                <span className="text-xs font-medium text-white whitespace-nowrap">Return to Desktop</span>
              </>
            )}
          </button>
        </div>
      )}

      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 pointer-events-none transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Taskbar Container */}
        <div 
          className="pointer-events-auto flex items-center justify-between h-16 bg-[#111111]/40 backdrop-blur-3xl border-t border-white/[0.08] w-full shadow-[0_-5px_20px_rgba(0,0,0,0.3)]"
          {...({ 'data-dev-target': 'taskbar' } as any)}
        >
          {/* Left Side: Search Affordance */}
          <div className="flex-1 hidden md:flex items-center pl-4">
            <button
              onClick={() => {
                if (isStartOpen) toggleStart();
                const { open } = require('../../search/useCommandPalette').useCommandPalette.getState();
                open();
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-white/40 hover:text-white/70"
            >
              <Search size={14} />
              <span className="text-xs font-medium">Search studio...</span>
              <span className="ml-2 text-[10px] bg-white/10 rounded px-1.5 py-0.5">⌘K</span>
            </button>
          </div>

          {/* Center: Start Button + Pinned Apps */}
          <div className="flex items-center justify-center gap-1 flex-1 md:flex-none h-full">
            <TaskbarStartButton isOpen={isStartOpen} onToggle={toggleStart} />
            <TaskbarPinnedApps />
          </div>

          {/* Right Side: System Tray */}
          <div className="flex-1 flex justify-end h-full">
            <SystemTray />
          </div>
        </div>
      </div>
    </>
  );
}
