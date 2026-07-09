'use client';

import { Wifi, Volume2, Volume1, Volume, VolumeX, Battery, Power } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDesktopPreferences } from '../../system/useDesktopPreferences';
import { useWindowStore } from '../../window-manager/useWindowStore';
import QuickSettingsPanel from './QuickSettingsPanel';
import CalendarFlyout from './CalendarFlyout';
import PowerMenu from '../../power-system/PowerMenu';

export default function SystemTray() {
  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');

  // Flyout states
  const [isQuickSettingsOpen, setIsQuickSettingsOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isPowerMenuOpen, setIsPowerMenuOpen] = useState(false);

  // Preference store
  const { volume, setVolume, brightness, setBrightness } = useDesktopPreferences();

  // Window store for Show Desktop
  const { windows, minimizeWindow, restoreWindow } = useWindowStore();
  const [minimizedIds, setMinimizedIds] = useState<string[]>([]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));
      setDateStr(now.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' }));
    };
    
    updateTime(); // initial call
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Listen to custom global events to close flyouts on desktop click or Escape key
  useEffect(() => {
    const handleCloseAll = () => {
      setIsQuickSettingsOpen(false);
      setIsCalendarOpen(false);
      setIsPowerMenuOpen(false);
    };

    // Close on Escape or click outside
    window.addEventListener('close-tray-flyouts', handleCloseAll);
    return () => window.removeEventListener('close-tray-flyouts', handleCloseAll);
  }, []);

  // Volume icon helper
  const renderVolumeIcon = () => {
    if (volume === 0) return <VolumeX className="w-4 h-4" strokeWidth={2} />;
    if (volume < 33) return <Volume className="w-4 h-4" strokeWidth={2} />;
    if (volume < 66) return <Volume1 className="w-4 h-4" strokeWidth={2} />;
    return <Volume2 className="w-4 h-4" strokeWidth={2} />;
  };

  // Show desktop toggler
  const handleShowDesktop = () => {
    const activeWindows = windows.filter(w => !w.isMinimized);
    
    if (activeWindows.length > 0) {
      // Save open window IDs and minimize all
      const idsToMinimize = activeWindows.map(w => w.instanceId);
      setMinimizedIds(idsToMinimize);
      idsToMinimize.forEach(id => minimizeWindow(id));
    } else {
      // Restore previously minimized windows (or all if we don't have any saved)
      const idsToRestore = minimizedIds.length > 0 ? minimizedIds : windows.map(w => w.instanceId);
      idsToRestore.forEach(id => restoreWindow(id));
      setMinimizedIds([]);
    }
  };

  return (
    <div className="flex items-center h-full px-2 gap-0.5 text-white/90 relative">
      
      {/* Icon Group: Wifi, Volume, Battery acts as Quick Settings trigger */}
      <button 
        onClick={() => {
          setIsQuickSettingsOpen(!isQuickSettingsOpen);
          setIsCalendarOpen(false); // Close calendar if opening quick settings
          setIsPowerMenuOpen(false);
        }}
        className={`flex items-center gap-2 px-3 h-[calc(100%-8px)] rounded-md transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
          isQuickSettingsOpen ? 'bg-white/10' : 'hover:bg-white/10'
        }`}
        aria-label="Network, Volume, and Battery status"
      >
        <Wifi className="w-4 h-4" strokeWidth={2} />
        {renderVolumeIcon()}
        <Battery className="w-[18px] h-[18px]" strokeWidth={2} />
      </button>

      {/* Clock / Date Group: acts as Calendar trigger */}
      <button 
        onClick={() => {
          setIsCalendarOpen(!isCalendarOpen);
          setIsQuickSettingsOpen(false); // Close quick settings if opening calendar
          setIsPowerMenuOpen(false);
        }}
        className={`flex flex-col items-end justify-center px-3 h-[calc(100%-8px)] rounded-md transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
          isCalendarOpen ? 'bg-white/10' : 'hover:bg-white/10'
        }`}
        aria-label="Clock and Calendar"
      >
        <span className="text-xs tracking-wide">{timeStr || '...'}</span>
        <span className="text-[11px] text-white/70 leading-tight">{dateStr || '...'}</span>
      </button>

      {/* Power Button */}
      <div className="relative h-full flex items-center">
        <button 
          onClick={() => {
            setIsPowerMenuOpen(!isPowerMenuOpen);
            setIsQuickSettingsOpen(false);
            setIsCalendarOpen(false);
          }}
          className={`flex items-center justify-center px-3 h-[calc(100%-8px)] rounded-md transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
            isPowerMenuOpen ? 'bg-white/10' : 'hover:bg-white/10'
          }`}
          aria-label="Power Options"
        >
          <Power className="w-4 h-4 text-white/90" strokeWidth={2} />
        </button>
        <PowerMenu 
          isOpen={isPowerMenuOpen} 
          onClose={() => setIsPowerMenuOpen(false)} 
          onSleep={() => window.dispatchEvent(new CustomEvent('power-action', { detail: { action: 'sleep' } }))}
          onRestart={() => window.dispatchEvent(new CustomEvent('power-action', { detail: { action: 'restart' } }))}
          onShutdown={() => window.dispatchEvent(new CustomEvent('power-action', { detail: { action: 'shutdown' } }))}
        />
      </div>

      {/* Show desktop sliver */}
      <div className="w-[1px] h-6 bg-white/10 mx-1 hidden sm:block" />
      <button 
        onClick={handleShowDesktop}
        className="h-full w-2 hover:bg-white/10 border-l border-transparent hidden sm:block" 
        aria-label="Show Desktop" 
      />

      {/* Quick Settings Panel Flyout */}
      <QuickSettingsPanel 
        isOpen={isQuickSettingsOpen} 
        onClose={() => setIsQuickSettingsOpen(false)}
        volume={volume}
        setVolume={setVolume}
        brightness={brightness}
        setBrightness={setBrightness}
      />

      {/* Calendar Grid Flyout */}
      <CalendarFlyout 
        isOpen={isCalendarOpen} 
        onClose={() => setIsCalendarOpen(false)} 
      />
    </div>
  );
}
