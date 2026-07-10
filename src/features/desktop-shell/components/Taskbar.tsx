'use client';

import { useState } from 'react';
import TaskbarStartButton from './TaskbarStartButton';
import TaskbarPinnedApps from './TaskbarPinnedApps';
import SystemTray from './SystemTray';
import { Search } from 'lucide-react';
import { useDesktopPreferences } from '../../system/useDesktopPreferences';

interface TaskbarProps {
  isStartOpen: boolean;
  toggleStart: () => void;
}

export default function Taskbar({ isStartOpen, toggleStart }: TaskbarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const taskbarAutoHide = useDesktopPreferences((s) => s.taskbarAutoHide);

  const isVisible = !taskbarAutoHide || isHovered || isStartOpen;

  return (
    <>
      {/* Invisible hover trigger area at the very bottom of the screen */}
      {taskbarAutoHide && !isVisible && (
        <div 
          className="fixed bottom-0 left-0 right-0 h-2 bg-transparent z-[49] pointer-events-auto"
          onMouseEnter={() => setIsHovered(true)}
        />
      )}

      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 pointer-events-none transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : 'translate-y-[calc(100%-4px)]'
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
