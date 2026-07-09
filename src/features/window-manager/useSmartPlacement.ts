import { useCallback } from 'react';
import { calculatePlacement } from './smart-placement';
import { PlacementContext, PlacementStrategy } from './types/smart-placement-types';
import { APP_REGISTRY } from './window-registry';
import { useWindowStore } from './useWindowStore';
import { useAutoLayout } from '../desktop-widgets/useAutoLayout';
import { useSettingsStore } from '../system/useSettingsStore';

export function useSmartPlacement() {
  const { windows, cascadeStack } = useWindowStore();
  const { placedRects: oldPlacedRects, iconLayoutZone, safeArea } = useAutoLayout();
  const { composition } = require('../desktop-shell/useDesktopComposition').useDesktopComposition();
  
  // Use composition surfaces as obstacles, fallback to old auto-layout rects if none
  const placedRects = composition.surfaces.length > 0 
    ? composition.surfaces 
    : oldPlacedRects;
  const settings = useSettingsStore(state => state.settings);

  const placeWindow = useCallback((
    appId: string, 
    options?: { strategy?: PlacementStrategy; preferredZone?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' }
  ) => {
    const app = APP_REGISTRY[appId];
    if (!app) return null;

    const taskbarHeight = 64; // Hardcoded or fetch from somewhere
    const screenRect = {
      id: 'screen',
      x: 0,
      y: 0,
      width: typeof window !== 'undefined' ? window.innerWidth : 1024,
      height: typeof window !== 'undefined' ? window.innerHeight : 768
    };

    const taskbarRect = {
      id: 'taskbar',
      x: 0,
      y: screenRect.height - taskbarHeight,
      width: screenRect.width,
      height: taskbarHeight
    };

    const windowSize = {
      width: app.defaultWidth,
      height: app.defaultHeight
    };

    const existingWindows = windows.map(w => ({
      id: w.instanceId,
      rect: { id: w.instanceId, x: w.x, y: w.y, width: w.width, height: w.height },
      isFocused: w.isFocused
    }));

    let strategy = options?.strategy || 'best-fit';
    
    // Apply settings overrides if smart placement is enabled
    if (settings.smartWindowPlacement) {
       if (settings.placementStrategy === 'always-cascade') strategy = 'cascade';
       if (settings.placementStrategy === 'always-best-fit') strategy = 'best-fit';
    } else {
       // Old default behavior essentially just uses a fixed offset, we can simulate with cascade or a hardcoded center
       strategy = 'cascade'; 
    }

    const lastCascadeItem = cascadeStack && cascadeStack.length > 0 ? cascadeStack[cascadeStack.length - 1] : undefined;
    const lastCascade = lastCascadeItem ? { id: lastCascadeItem.windowId, ...lastCascadeItem.originalRect } : undefined;

    const context: PlacementContext = {
      strategy,
      windowSize,
      screenRect,
      existingWindows,
      widgetRects: placedRects,
      iconZone: iconLayoutZone,
      taskbarRect,
      preferredZone: options?.preferredZone,
      lastOpenedWindowRect: lastCascade,
      cascadeOffset: { x: settings.cascadeOffset || 24, y: settings.cascadeOffset || 24 },
      appMetadata: {
        storyMode: !!app.storyMode,
        defaultWidth: app.defaultWidth,
        defaultHeight: app.defaultHeight
      }
    };

    return calculatePlacement(context);
  }, [windows, placedRects, iconLayoutZone, safeArea, cascadeStack, settings]);

  return { placeWindow };
}
