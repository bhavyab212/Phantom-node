'use client';

import { useEffect } from 'react';
import { useDesktopComposition } from '../useDesktopComposition';
import { useDesktopPreferences } from '../../system/useDesktopPreferences';
import { useWindowStore } from '../../window-manager/useWindowStore';
import { useSmartPlacement } from '../../window-manager/useSmartPlacement';

export function TidyDesktopAnimation() {
  const { isTidying, setIsTidying, composition } = useDesktopComposition();
  const { windows, updateWindowPosition, updateWindowSize } = useWindowStore();
  const { placeWindow } = useSmartPlacement();

  useEffect(() => {
    if (!isTidying) return;

    const performTidy = async () => {
      const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const visibleWindows = windows.filter(w => !w.isMinimized);

      // 1. Flash effect (via DOM since we want it completely disconnected from React render cycles for speed)
      if (!isReducedMotion) {
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.inset = '0';
        flash.style.backgroundColor = 'var(--accent-color)';
        flash.style.opacity = '0.05';
        flash.style.pointerEvents = 'none';
        flash.style.zIndex = '999999';
        flash.style.transition = 'opacity 0.3s ease-out';
        document.body.appendChild(flash);
        
        requestAnimationFrame(() => {
          flash.style.opacity = '0';
          setTimeout(() => flash.remove(), 300);
        });
      }

      // 2. Tidy Windows
      if (visibleWindows.length > 0) {
        // Are they already nicely placed? (simplified check: if many are open, let's just minimize them all for a clean slate,
        // or we could cascade them. Let's cascade.)
        
        visibleWindows.forEach((win, index) => {
          const delay = isReducedMotion ? 0 : index * 50;
          
          setTimeout(() => {
            const placement = placeWindow(win.appId);
            if (placement) {
              updateWindowPosition(win.instanceId, placement.rect.x, placement.rect.y);
              updateWindowSize(win.instanceId, placement.rect.width, placement.rect.height);
            }
          }, delay);
        });
      }

      // 3. Widgets and Icons will auto-tidy if we tell them to, but for now we just 
      // trigger the layout refresh. We'll use a global event to signal widgets to snap to their default grid.
      window.dispatchEvent(new CustomEvent('tidy-desktop-widgets'));
      window.dispatchEvent(new CustomEvent('tidy-desktop-icons'));

      // Wait for animations to finish before clearing the flag
      const totalDelay = isReducedMotion ? 0 : 800;
      setTimeout(() => {
        setIsTidying(false);
      }, totalDelay);
    };

    performTidy();
  }, [isTidying, setIsTidying, windows, updateWindowPosition, updateWindowSize, placeWindow]);

  return null;
}
