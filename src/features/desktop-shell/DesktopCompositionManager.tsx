'use client';

import React, { useEffect, useRef } from 'react';
import { useDesktopComposition } from './useDesktopComposition';
import { detectConflicts } from './useConflictDetection';
import { useWindowStore } from '../window-manager/useWindowStore';
import { useDesktopPreferences } from '../system/useDesktopPreferences';
import { getDesktopWidth, getDesktopHeight } from '../../utils/windowUtils';

export function DesktopCompositionManager({ children }: { children: React.ReactNode }) {
  const { composition, setConflicts, tidyDesktop } = useDesktopComposition();
  const { windows, minimizeWindow, restoreWindow } = useWindowStore();
  
  const compositionRef = useRef(composition);
  compositionRef.current = composition;

  // Conflict Detection Loop
  useEffect(() => {
    // Run conflict detection on composition version change
    // Using a microtask or small timeout to debounce
    const timeout = setTimeout(() => {
      const safeArea = { x: 0, y: 0, width: getDesktopWidth(), height: getDesktopHeight() - 48 }; // 48 is taskbar height
      const newConflicts = detectConflicts(compositionRef.current, safeArea);
      
      // Only update if conflicts changed (simple length check for now, can be deep equal)
      if (newConflicts.length !== compositionRef.current.conflicts.length) {
        setConflicts(newConflicts);
      }
    }, 50);
    
    return () => clearTimeout(timeout);
  }, [composition.compositionVersion, setConflicts]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl+Shift+T: Tidy desktop
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        tidyDesktop();
      }
      
      // Cmd/Ctrl+Shift+D: Show/Hide desktop
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        
        // Check if any windows are visible
        const anyVisible = windows.some(w => !w.isMinimized);
        if (anyVisible) {
          windows.forEach(w => {
            if (!w.isMinimized) minimizeWindow(w.instanceId);
          });
        } else {
          windows.forEach(w => restoreWindow(w.instanceId));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tidyDesktop, minimizeWindow, restoreWindow, windows]);

  return <>{children}</>;
}
