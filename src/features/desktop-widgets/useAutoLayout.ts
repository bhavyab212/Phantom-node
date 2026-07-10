import { useState, useEffect, useCallback, useRef } from 'react';
import { WidgetLayoutRect, WidgetSize } from './widget-types';
import { getDesktopSafeArea, findFreePosition } from './layout-utils';
import { DEFAULT_WIDGET_DEFINITIONS } from './widget-data';
import { useWidgetVisibility } from './useWidgetVisibility';
import { useWidgetStore } from './useWidgetStore';
import { getDesktopWidth, getDesktopHeight } from '../../utils/windowUtils';
import { useDesktopComposition } from '../desktop-shell/useDesktopComposition';

const WIDGET_DIMENSIONS: Record<WidgetSize, { width: number; height: number }> = {
  small: { width: 160, height: 160 },
  medium: { width: 340, height: 220 },
  tall: { width: 340, height: 300 },
  large: { width: 440, height: 340 },
  square: { width: 340, height: 340 }
};

// DEV TOOLS: The dev-tools API writes directly to this object when you click "Hardcode It" on a widget layout.
const HARDCODED_LAYOUTS: Record<string, Partial<WidgetLayoutRect>> = {
  // e.g. 'w-system-status': { x: 1204.1375732421875, y: 15.866646766662598, width: 300, height: 328 },
  'w-notes': { x: 1230.3500366210938, y: 582.9192810058594, width: 264, height: 160 },
  'w-workspace': { x: 1243.7509765625, y: 11.790000915527344, width: 256, height: 249 },
  'w-quick-access': { x: 1505.4290673828125, y: 369.90661987304685, width: 319, height: 375 },
  'w-system-status': { x: 1519.8544921875, y: 14.339713096618652, width: 300, height: 332 },
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
  const screenRef = useRef({ width: getDesktopWidth(), height: getDesktopHeight() });

  const computeLayout = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    setIsComputing(true);
    
    const width = getDesktopWidth();
    const height = getDesktopHeight();
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
      // Clamp custom rect to screen boundaries instead of safe area
      const clampedX = Math.max(0, Math.min(customRect.x, width - customRect.width));
      const clampedY = Math.max(0, Math.min(customRect.y, height - customRect.height));

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

    // ─── Fixed 2×2 Widget Grid (right-anchored) ─────────────────────────
    // Layout from reference image (proportional):
    //   [System Status ~380h] [Workspace ~380h]   ← row 1 (same height)
    //   [Notes         ~200h] [Quick Access ~380h] ← row 2 (notes bottom-aligned with QA)
    // Each widget ~300px wide, 16px gap, 16px from right screen edge.

    const GRID_GAP = 16;
    const WIDGET_W = 300;
    
    const SYS_H = 380;
    const WORKSPACE_H = 380;
    const QA_H = 380;
    const NOTES_H = 200;

    const gridRightEdge = width - 16; // 16px from right screen edge

    // Column X positions (right-anchored, two columns)
    const col2X = gridRightEdge - WIDGET_W;              // right column
    const col1X = col2X - GRID_GAP - WIDGET_W;           // left column

    // Y positions
    const TOP_MARGIN = safeArea.y + GRID_GAP;
    
    const sysY = TOP_MARGIN;
    const workspaceY = TOP_MARGIN;
    const qaY = workspaceY + WORKSPACE_H + GRID_GAP;
    
    // Notes bottom aligns with Quick Access bottom
    const qaBottom = qaY + QA_H;
    const notesY = qaBottom - NOTES_H;

    for (const widget of autoWidgets) {
      let wx: number, wy: number, ww: number, wh: number;

      if (widget.id === 'w-system-status') {
        wx = col1X; wy = sysY; ww = WIDGET_W; wh = SYS_H;
      } else if (widget.id === 'w-workspace') {
        wx = col2X; wy = workspaceY; ww = WIDGET_W; wh = WORKSPACE_H;
      } else if (widget.id === 'w-notes') {
        wx = col1X; wy = notesY; ww = WIDGET_W; wh = NOTES_H;
      } else if (widget.id === 'w-quick-access') {
        wx = col2X; wy = qaY; ww = WIDGET_W; wh = QA_H;
      } else {
        // fallback for any other widgets
        const sizeStr = widgetSizes[widget.id] || widget.size;
        const dims = WIDGET_DIMENSIONS[sizeStr] || WIDGET_DIMENSIONS.small;
        const freePos = findFreePosition(
          { width: dims.width + GRID_GAP, height: dims.height + GRID_GAP },
          placedRects, safeArea, 8, 'right'
        );
        wx = freePos.x; wy = freePos.y; ww = dims.width; wh = dims.height;
      }

      // Apply DEV TOOLS hardcoded layout if one exists for this widget
      const override = HARDCODED_LAYOUTS[widget.id];
      if (override) {
        if (override.x !== undefined) wx = override.x;
        if (override.y !== undefined) wy = override.y;
        if (override.width !== undefined) ww = override.width;
        if (override.height !== undefined) wh = override.height;
      } else {
        // Clamp to screen boundaries (only if not hardcoded)
        wx = Math.max(16, Math.min(wx, width - 16 - ww));
        wy = Math.max(safeArea.y, wy);
      }

      const rect: WidgetLayoutRect = { id: widget.id, x: wx, y: wy, width: ww, height: wh };
      newLayouts[widget.id] = rect;

      placedRects.push({
        id: `obstacle-${widget.id}`,
        x: wx - GRID_GAP / 2,
        y: wy - GRID_GAP / 2,
        width: ww + GRID_GAP,
        height: wh + GRID_GAP
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
        if (getDesktopWidth() !== screenRef.current.width || getDesktopHeight() !== screenRef.current.height) {
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
      width: getDesktopWidth() - 48,
      height: getDesktopHeight() - 112 // 64 (taskbar) + 48 (margins)
    },
    isComputing 
  };
}
