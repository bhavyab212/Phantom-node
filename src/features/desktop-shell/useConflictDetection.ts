import { CompositionState, ConflictReport, SurfaceRect } from './composition-types';
import { rectsIntersect } from '../desktop-widgets/layout-utils';

export function detectConflicts(state: CompositionState, safeArea: { x: number, y: number, width: number, height: number }): ConflictReport[] {
  const conflicts: ConflictReport[] = [];
  const { surfaces } = state;

  // 1. Out of bounds detection
  surfaces.forEach(surface => {
    if (!surface.isVisible) return;
    
    // Check if surface is completely outside or significantly clipped
    const isOutOfBounds = 
      surface.rect.x < 0 || 
      surface.rect.y < 0 || 
      (surface.rect.x + surface.rect.width > safeArea.width + safeArea.x + 100) ||
      (surface.rect.y + surface.rect.height > safeArea.height + safeArea.y + 100);

    if (isOutOfBounds) {
      conflicts.push({
        id: `oob-${surface.id}`,
        type: 'out-of-bounds',
        surfaceIds: [surface.id],
        description: `Surface ${surface.id} is out of safe bounds.`,
        severity: 'warning',
        autoResolvable: true // We can clamp it
      });
    }
  });

  // 2. Overlap detection
  // We only care about specific layer overlaps
  const windows = surfaces.filter(s => s.layer === 'window-layer' && s.isVisible);
  const widgets = surfaces.filter(s => s.layer === 'widget-layer' && s.isVisible);
  const taskbars = surfaces.filter(s => s.layer === 'taskbar' && s.isVisible);
  const iconZones = surfaces.filter(s => s.layer === 'icon-layer' && s.isVisible);

  // Widget vs Taskbar (Critical - widgets should never go under taskbar)
  widgets.forEach(widget => {
    taskbars.forEach(taskbar => {
      if (rectsIntersect(widget.rect, taskbar.rect)) {
        conflicts.push({
          id: `overlap-widget-taskbar-${widget.id}`,
          type: 'overlap',
          surfaceIds: [widget.id, taskbar.id],
          description: `Widget ${widget.id} overlaps with taskbar.`,
          severity: 'error',
          autoResolvable: true
        });
      }
    });
  });

  // Window vs Widget (Info - widgets should dim)
  windows.forEach(window => {
    widgets.forEach(widget => {
      if (rectsIntersect(window.rect, widget.rect)) {
        conflicts.push({
          id: `overlap-window-widget-${window.id}-${widget.id}`,
          type: 'overlap',
          surfaceIds: [window.id, widget.id],
          description: `Window ${window.id} overlaps with widget ${widget.id}.`,
          severity: 'info', // Expected behavior, we just dim the widget
          autoResolvable: false
        });
      }
    });
  });

  // Window vs Icon Zone (Info - icons should dim)
  windows.forEach(window => {
    iconZones.forEach(zone => {
      if (rectsIntersect(window.rect, zone.rect)) {
        conflicts.push({
          id: `overlap-window-icon-${window.id}-${zone.id}`,
          type: 'overlap',
          surfaceIds: [window.id, zone.id],
          description: `Window ${window.id} overlaps with icon zone.`,
          severity: 'info', // Expected behavior, we just dim the icons
          autoResolvable: false
        });
      }
    });
  });

  // Window vs Taskbar (Warning - windows should not go under taskbar unless full screen)
  windows.forEach(window => {
    taskbars.forEach(taskbar => {
      if (rectsIntersect(window.rect, taskbar.rect)) {
        conflicts.push({
          id: `overlap-window-taskbar-${window.id}`,
          type: 'overlap',
          surfaceIds: [window.id, taskbar.id],
          description: `Window ${window.id} overlaps with taskbar.`,
          severity: 'warning',
          autoResolvable: true // Can be clamped
        });
      }
    });
  });

  return conflicts;
}
