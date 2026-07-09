import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAutoLayout } from './useAutoLayout';
import { useWidgetData } from './useWidgetData';
import { useWidgetVisibility } from './useWidgetVisibility';
import { DEFAULT_WIDGET_DEFINITIONS } from './widget-data';
import { DesktopWidget } from './DesktopWidget';

export function DesktopWidgetLayer() {
  const { widgetLayouts } = useAutoLayout();
  const { metrics } = useWidgetData();
  const { visibleWidgetIds, widgetsEnabled } = useWidgetVisibility();

  if (!widgetsEnabled) return null;

  return (
    <div 
      className="absolute inset-0 z-10 pointer-events-none" 
      aria-label="Studio metrics dashboard"
    >
      <AnimatePresence>
        {visibleWidgetIds.map(widgetId => {
          const layout = widgetLayouts[widgetId];
          if (!layout) return null; // Still computing layout for this widget

          const def = DEFAULT_WIDGET_DEFINITIONS.find(w => w.id === widgetId);
          if (!def) return null;

          return (
            <DesktopWidget 
              key={widgetId}
              definition={def}
              rect={layout}
              metrics={metrics}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
