export type WidgetType = 'system-status' | 'workspace-progress' | 'quick-access' | 'notes' | 'welcome-panel';

export type WidgetSize = 'small' | 'medium' | 'large' | 'tall' | 'square';

export interface WidgetDefinition {
  id: string;
  type: WidgetType;
  size: WidgetSize;
  title?: string;
  dataSource?: string;
  icon?: string;
  accentColor?: string;
  refreshInterval?: number;
  position?: { x: number; y: number };
  visible: boolean;
  order: number;
}

export interface WidgetLayoutRect {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LayoutZone {
  id: string;
  rect: WidgetLayoutRect;
  type: 'widget' | 'icon' | 'reserved';
}

export interface StudioMetric {
  id: string;
  label: string;
  value: number | string;
  unit?: string;
  trend?: 'up' | 'down' | 'flat';
  trendValue?: string;
  sparklineData?: number[];
  ringProgress?: number;
  live?: boolean;
  lastUpdated?: number;
}
