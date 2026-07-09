import { StudioMetric, WidgetDefinition } from './widget-types';

export const INITIAL_STUDIO_METRICS: Record<string, StudioMetric> = {
  'system-status': {
    id: 'system-status',
    label: 'All Systems Operational',
    value: 100,
    sparklineData: [60, 65, 75, 70, 85, 80, 95, 90, 100],
    live: true,
  },
  'workspace-progress': {
    id: 'workspace-progress',
    label: 'Projects Delivered',
    value: '87',
    unit: '%',
    ringProgress: 0.87,
    live: true,
  }
};

export const DEFAULT_WIDGET_DEFINITIONS: WidgetDefinition[] = [
  {
    id: 'w-system-status',
    type: 'system-status',
    size: 'medium',
    title: 'System Status',
    dataSource: 'system-status',
    visible: true,
    order: 1,
    refreshInterval: 5000,
  },
  {
    id: 'w-workspace',
    type: 'workspace-progress',
    size: 'medium',
    title: 'Workspace',
    dataSource: 'workspace-progress',
    visible: true,
    order: 2,
    refreshInterval: 12000,
    accentColor: '#10b981', // emerald-500
  },
  {
    id: 'w-quick-access',
    type: 'quick-access',
    size: 'tall',
    title: 'Quick Access',
    visible: true,
    order: 3,
  },
  {
    id: 'w-notes',
    type: 'notes',
    size: 'large', // Make notes a bit taller
    title: 'Notes',
    visible: true,
    order: 4,
  }
];
