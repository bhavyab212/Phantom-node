import { SnapLayoutDefinition, SnapZone } from './types/smart-placement-types';
import { WidgetLayoutRect } from '../desktop-widgets/widget-types';

export const SNAP_LAYOUTS: Record<string, SnapLayoutDefinition> = {
  'two-halves': {
    id: 'two-halves',
    zones: [
      { id: 'left-half', rect: { id: 'zh-1', x: 0, y: 0, width: 0.5, height: 1 } },
      { id: 'right-half', rect: { id: 'zh-2', x: 0.5, y: 0, width: 0.5, height: 1 } },
    ]
  },
  'three-thirds': {
    id: 'three-thirds',
    zones: [
      { id: 'left-third', rect: { id: 'zt-1', x: 0, y: 0, width: 0.333, height: 1 } },
      { id: 'center-third', rect: { id: 'zt-2', x: 0.333, y: 0, width: 0.334, height: 1 } },
      { id: 'right-third', rect: { id: 'zt-3', x: 0.667, y: 0, width: 0.333, height: 1 } },
    ]
  },
  'quarters': {
    id: 'quarters',
    zones: [
      { id: 'top-left', rect: { id: 'zq-1', x: 0, y: 0, width: 0.5, height: 0.5 } },
      { id: 'top-right', rect: { id: 'zq-2', x: 0.5, y: 0, width: 0.5, height: 0.5 } },
      { id: 'bottom-left', rect: { id: 'zq-3', x: 0, y: 0.5, width: 0.5, height: 0.5 } },
      { id: 'bottom-right', rect: { id: 'zq-4', x: 0.5, y: 0.5, width: 0.5, height: 0.5 } },
    ]
  },
  'two-thirds-left': {
    id: 'two-thirds-left',
    zones: [
      { id: 'left-two-thirds', rect: { id: 'zl-1', x: 0, y: 0, width: 0.667, height: 1 } },
      { id: 'right-one-third', rect: { id: 'zl-2', x: 0.667, y: 0, width: 0.333, height: 1 } },
    ]
  },
  'two-thirds-right': {
    id: 'two-thirds-right',
    zones: [
      { id: 'left-one-third', rect: { id: 'zr-1', x: 0, y: 0, width: 0.333, height: 1 } },
      { id: 'right-two-thirds', rect: { id: 'zr-2', x: 0.333, y: 0, width: 0.667, height: 1 } },
    ]
  },
  'large-stacked': {
    id: 'large-stacked',
    zones: [
      { id: 'left-half', rect: { id: 'zl-1', x: 0, y: 0, width: 0.5, height: 1 } },
      { id: 'top-right', rect: { id: 'zl-2', x: 0.5, y: 0, width: 0.5, height: 0.5 } },
      { id: 'bottom-right', rect: { id: 'zl-3', x: 0.5, y: 0.5, width: 0.5, height: 0.5 } },
    ]
  }
};

export function getLayoutsForScreenSize(width: number): SnapLayoutDefinition[] {
  if (width < 600) {
    return [SNAP_LAYOUTS['two-halves']];
  }
  if (width < 1024) {
    return [
      SNAP_LAYOUTS['two-halves'], 
      SNAP_LAYOUTS['three-thirds'], 
      SNAP_LAYOUTS['two-thirds-left'],
      SNAP_LAYOUTS['two-thirds-right']
    ];
  }
  return Object.values(SNAP_LAYOUTS);
}

export function getZoneRect(layoutId: string, zoneId: string, safeArea: { width: number; height: number }): WidgetLayoutRect | null {
  const layout = SNAP_LAYOUTS[layoutId];
  if (!layout) return null;
  
  const zone = layout.zones.find(z => z.id === zoneId);
  if (!zone) return null;

  return {
    id: zone.rect.id,
    x: Math.round(zone.rect.x * safeArea.width),
    y: Math.round(zone.rect.y * safeArea.height),
    width: Math.round(zone.rect.width * safeArea.width),
    height: Math.round(zone.rect.height * safeArea.height),
  };
}
