'use client';

import AppIconTile from './AppIconTile';
import { SYSTEM_APPS } from '../data/apps';
import { useWindowStore } from '../../window-manager/useWindowStore';
import { APP_REGISTRY } from '../../window-manager/window-registry';

import { useSmartPlacement } from '../../window-manager/useSmartPlacement';
import { useState } from 'react';

export default function TaskbarPinnedApps() {
  const pinnedApps = SYSTEM_APPS.filter(app => app.pinned && app.showInTaskbar !== false);
  
  const { windows, openApp, focusWindow, minimizeWindow, restoreWindow } = useWindowStore();
  const { placeWindow } = useSmartPlacement();

  const [bouncingAppId, setBouncingAppId] = useState<string | null>(null);

  const handleAppClick = (appId: string) => {
    // Start bounce
    setBouncingAppId(appId);
    setTimeout(() => setBouncingAppId(null), 400);

    const win = windows.find(w => w.appId === appId);
    if (!win) {
      const entry = APP_REGISTRY[appId];
      if (entry) {
        const placement = placeWindow(appId);
        openApp(appId, entry.title, {
          width: placement ? placement.rect.width : entry.defaultWidth,
          height: placement ? placement.rect.height : entry.defaultHeight,
          x: placement ? placement.rect.x : entry.defaultX,
          y: placement ? placement.rect.y : entry.defaultY
        });
      }
    } else {
      if (win.isMinimized) {
        restoreWindow(win.instanceId);
      } else if (win.isFocused) {
        minimizeWindow(win.instanceId);
      } else {
        focusWindow(win.instanceId);
      }
    }
  };

  return (
    <>
      {pinnedApps.map((app) => {
        const win = windows.find(w => w.appId === app.id);
        const isRunning = !!win;
        const isFocused = win?.isFocused && !win?.isMinimized;
        const isBouncing = bouncingAppId === app.id;
        
        return (
          <div key={app.id} className="relative flex flex-col items-center justify-center">
            <div className={isBouncing ? "animate-[bounce_0.4s_ease-in-out_1]" : ""}>
              <AppIconTile
                label={app.label}
                icon={app.icon}
                isActive={isFocused} 
                onClick={() => handleAppClick(app.id)}
              />
            </div>
            {/* Running indicator pill (Windows 11 Style) */}
            {isRunning && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end justify-center h-1 pointer-events-none pb-[2px]">
                <div 
                  className={`h-[3px] rounded-full transition-all duration-300 ease-out ${
                    isFocused ? 'w-[16px] bg-white/90' : 'w-[6px] bg-white/50'
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
