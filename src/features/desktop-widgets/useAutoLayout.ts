import { useState, useEffect, useCallback, useRef } from 'react';
import { WidgetLayoutRect, WidgetSize } from './widget-types';
import { getDesktopSafeArea, findFreePosition } from './layout-utils';
import { DEFAULT_WIDGET_DEFINITIONS } from './widget-data';
import { useWidgetVisibility } from './useWidgetVisibility';
import { useWidgetStore } from './useWidgetStore';
import { useDesktopComposition } from '../desktop-shell/useDesktopComposition';

const WIDGET_DIMENSIONS: Record<WidgetSize, { width: number; height: number }> = {
  small: { width: 160, height: 160 },
  medium: { width: 340, height: 220 },
  tall: { width: 340, height: 300 },
  large: { width: 440, height: 340 },
  square: { width: 340, height: 340 }
};

interface AutoLayoutResult {
  widgetLayouts: Record<string, WidgetLayoutRect>;
  iconLayoutZone: WidgetLayoutRect;
  placedRects: WidgetLayoutRect[];
  safeArea: { x: number; y: number; width: number; height: number };
  isComputing: boolean;
}

export function useAutoLayout(): AutoLayoutResult {
  const [layouts, setLayouts] = useState<Record<string, WidgetLayoutRect>>({});
  const [iconZone, setIconZone] = useState<WidgetLayoutRect>({ id: 'icons', x: 0, y: 0, width: 0, height: 0 });
  const [isComputing, setIsComputing] = useState(true);
  
  const { visibleWidgetIds, widgetSizes, widgetsEnabled } = useWidgetVisibility();
  const customLayouts = useWidgetStore(state => state.customLayouts);
  
  // Ref to track last screen dimensions to prevent infinite loops
  const screenRef = useRef({ width: typeof window !== 'undefined' ? window.innerWidth : 1920, height: typeof window !== 'undefined' ? window.innerHeight : 1080 });

  const computeLayout = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    setIsComputing(true);
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    screenRef.current = { width, height };

    const taskbarHeight = 64; // from Taskbar.tsx
    const margin = 24;
    const gap = 16;
    
    const safeArea = getDesktopSafeArea(width, height, taskbarHeight, margin);

    // 1. Reserve Icon Zone (Left side)
    const iconColWidth = 100;
    const iconCols = width > 1200 ? 2 : 1;
    const iconZoneWidth = iconColWidth * iconCols + margin;
    
    const iconLayoutZone: WidgetLayoutRect = {
      id: 'icon-zone',
      x: safeArea.x,
      y: safeArea.y,
      width: iconZoneWidth,
      height: safeArea.height
    };
    
    setIconZone(iconLayoutZone);

    // 2. Compute Widget Positions
    const newLayouts: Record<string, WidgetLayoutRect> = {};
    
    // If screen is too small or widgets disabled, hide widgets
    if (width < 600 || !widgetsEnabled) {
      setLayouts({});
      setIsComputing(false);
      return;
    }

    const placedRects: WidgetLayoutRect[] = [iconLayoutZone]; // Start with icon zone as an obstacle

    // Sort widgets by order to ensure consistent layout flow
    const widgetsToPlace = DEFAULT_WIDGET_DEFINITIONS
      .filter(w => visibleWidgetIds.includes(w.id))
      .sort((a, b) => a.order - b.order);

    // 2a. First pass: Apply custom layouts as fixed obstacles
    const customWidgets = widgetsToPlace.filter(w => customLayouts[w.id]);
    const autoWidgets = widgetsToPlace.filter(w => !customLayouts[w.id]);

    for (const widget of customWidgets) {
      const customRect = customLayouts[widget.id];
      // Clamp custom rect to safe area
      const clampedX = Math.max(safeArea.x, Math.min(customRect.x, safeArea.x + safeArea.width - customRect.width));
      const clampedY = Math.max(safeArea.y, Math.min(customRect.y, safeArea.y + safeArea.height - customRect.height));

      const rect = { ...customRect, x: clampedX, y: clampedY };
      newLayouts[widget.id] = rect;

      placedRects.push({
        id: `obstacle-${widget.id}`,
        x: rect.x - gap / 2,
        y: rect.y - gap / 2,
        width: rect.width + gap,
        height: rect.height + gap
      });
    }

    // 2b. Second pass: Auto layout remaining widgets
    for (const widget of autoWidgets) {
      const sizeStr = widgetSizes[widget.id] || widget.size;
      const dims = WIDGET_DIMENSIONS[sizeStr] || WIDGET_DIMENSIONS.small;
      
      // We add gap to the target size to ensure padding between widgets
      const targetSize = {
        width: dims.width + gap,
        height: dims.height + gap
      };

      let pos = { x: 0, y: 0 };
      let width = dims.width;
      let height = dims.height;

      // Exact pixel-perfect default layout matching the user's design
      const row1Y = safeArea.y + 24;
      const row2Y = row1Y + 220 + gap;
      const col2X = safeArea.x + safeArea.width - 340; // Right column
      const col1X_system = col2X - gap - 340;
      const col1X_notes = col2X - gap - 440;

      if (widget.id === 'w-system-status') {
        width = 340; height = 220;
        pos.x = col1X_system; pos.y = row1Y;
      } else if (widget.id === 'w-workspace') {
        width = 340; height = 220;
        pos.x = col2X; pos.y = row1Y;
      } else if (widget.id === 'w-quick-access') {
        width = 340; height = 380;
        pos.x = col2X; pos.y = row2Y;
      } else if (widget.id === 'w-notes') {
        width = 440; height = 380;
        pos.x = col1X_notes; pos.y = row2Y;
      } else {
        pos = findFreePosition(targetSize, placedRects, safeArea, 8, 'right');
      }

      // Ensure they don't clip outside safe area
      pos.x = Math.max(safeArea.x, Math.min(pos.x, safeArea.x + safeArea.width - width));
      pos.y = Math.max(safeArea.y, Math.min(pos.y, safeArea.y + safeArea.height - height));

      const rect: WidgetLayoutRect = {
        id: widget.id,
        x: pos.x,
        y: pos.y,
        width: width,
        height: height
      };

      newLayouts[widget.id] = rect;
      
      // Add the rect + gap to placed rects as an obstacle
      placedRects.push({
        id: `obstacle-${widget.id}`,
        x: pos.x,
        y: pos.y,
        width: width + gap,
        height: height + gap
      });
    }

    setLayouts(newLayouts);
    setIsComputing(false);

    // Register surfaces with composition manager
    const { registerSurface, unregisterSurface } = useDesktopComposition.getState();
    // In a real app we'd diff these, but for now we'll just register them all
    // Since registerSurface handles duplicates by ID, it's safe to call it repeatedly
    // but updateSurface is better. Let's do a simple sync:
    Object.values(newLayouts).forEach(rect => {
      // Find if it exists, if so update, else register
      const existing = useDesktopComposition.getState().composition.surfaces.find(s => s.id === rect.id);
      if (existing) {
        useDesktopComposition.getState().updateSurface(rect.id, { 
          rect: { id: rect.id, x: rect.x, y: rect.y, width: rect.width, height: rect.height } 
        });
      } else {
        registerSurface({
          id: rect.id,
          layer: 'widget-layer',
          rect: { id: rect.id, x: rect.x, y: rect.y, width: rect.width, height: rect.height },
          zIndex: 10,
          isVisible: true,
          isInteractive: true,
          opacity: 1
        });
      }
    });

  }, [visibleWidgetIds, widgetSizes, widgetsEnabled, customLayouts]);

  // Initial compute
  useEffect(() => {
    computeLayout();
  }, [computeLayout]);

  // Handle window resize
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      // Debounce resize
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.innerWidth !== screenRef.current.width || window.innerHeight !== screenRef.current.height) {
          computeLayout();
        }
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [computeLayout]);

  return { 
    widgetLayouts: layouts, 
    iconLayoutZone: iconZone, 
    placedRects: Object.values(layouts), // approximation, or better yet store placedRects in state
    safeArea: {
      x: 24, // margin
      y: 24, // margin
      width: typeof window !== 'undefined' ? window.innerWidth - 48 : 1024,
      height: typeof window !== 'undefined' ? window.innerHeight - 64 - 48 : 768
    },
    isComputing 
  };
}
