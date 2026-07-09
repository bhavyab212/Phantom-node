import { WidgetLayoutRect } from '../../desktop-widgets/widget-types';

export type PlacementStrategy = 
  | 'best-fit'
  | 'first-fit'
  | 'cascade'
  | 'center'
  | 'snap-zone'
  | 'restore';

export interface PlacementContext {
  strategy: PlacementStrategy;
  windowSize: { width: number; height: number };
  screenRect: WidgetLayoutRect;
  existingWindows: Array<{ id: string; rect: WidgetLayoutRect; isFocused: boolean }>;
  widgetRects: WidgetLayoutRect[];
  iconZone: WidgetLayoutRect;
  taskbarRect: WidgetLayoutRect;
  preferredZone?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  lastOpenedWindowRect?: WidgetLayoutRect;
  cascadeOffset: { x: number; y: number };
  appMetadata?: { storyMode: boolean; defaultWidth: number; defaultHeight: number };
}

export interface PlacementResult {
  rect: WidgetLayoutRect;
  strategy: PlacementStrategy;
  overlapped: boolean;
  overlapArea: number;
  snappedToZone?: string;
}

export interface SnapZone {
  id: string;
  rect: WidgetLayoutRect; // relative to screen, fraction 0-1
  label?: string;
}

export interface SnapLayoutDefinition {
  id: string;
  zones: SnapZone[];
}

export interface ZIndexState {
  windowZIndices: Record<string, number>;
  topZIndex: number;
  normalizationThreshold: number;
}
