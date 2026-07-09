import React from 'react';
import { WidgetDefinition, StudioMetric, WidgetLayoutRect } from './widget-types';
import { DesktopWidgetShell } from './DesktopWidgetShell';
import { WidgetSystemStatus } from './components/WidgetSystemStatus';
import { WidgetWorkspace } from './components/WidgetWorkspace';
import { WidgetQuickAccess } from './components/WidgetQuickAccess';
import { WidgetNotes } from './components/WidgetNotes';
interface DesktopWidgetProps {
  definition: WidgetDefinition;
  rect: WidgetLayoutRect;
  metrics: Record<string, StudioMetric>;
}

export function DesktopWidget({ definition, rect, metrics }: DesktopWidgetProps) {
  const primaryMetric = definition.dataSource ? metrics[definition.dataSource] : undefined;
  
  const renderContent = () => {
    switch (definition.type) {
      case 'system-status':
        return primaryMetric ? <WidgetSystemStatus metric={primaryMetric} /> : null;
      case 'workspace-progress':
        return primaryMetric ? <WidgetWorkspace metric={primaryMetric} /> : null;
      case 'quick-access':
        return <WidgetQuickAccess />;
      case 'notes':
        return <WidgetNotes />;
      default:
        return null;
    }
  };

  const isLive = primaryMetric?.live;
  
  // The Welcome panel does not need a title in its shell, its title is rendered manually or inside
  const showTitle = definition.type !== 'welcome-panel';

  return (
    <DesktopWidgetShell 
      rect={rect} 
      title={showTitle ? definition.title : ''} 
      isLive={isLive}
    >
      {renderContent()}
    </DesktopWidgetShell>
  );
}
