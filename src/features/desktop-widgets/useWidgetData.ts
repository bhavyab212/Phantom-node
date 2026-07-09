import { useState, useEffect } from 'react';
import { StudioMetric } from './widget-types';
import { INITIAL_STUDIO_METRICS, DEFAULT_WIDGET_DEFINITIONS } from './widget-data';

export function useWidgetData() {
  const [metrics, setMetrics] = useState<Record<string, StudioMetric>>(INITIAL_STUDIO_METRICS);
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const intervalMultiplier = prefersReducedMotion ? 3 : 1;

    const intervals: NodeJS.Timeout[] = [];

    DEFAULT_WIDGET_DEFINITIONS.forEach(def => {
      if (!def.dataSource) return;
      const metric = INITIAL_STUDIO_METRICS[def.dataSource];
      if (!metric?.live || !def.refreshInterval) return;

      const timer = setInterval(() => {
        setMetrics(current => {
          const prev = current[def.dataSource!];
          if (!prev) return current;

          const next = { ...prev, lastUpdated: Date.now() };

          if (next.id === 'system-status') {
            const lastVal = next.sparklineData ? next.sparklineData[next.sparklineData.length - 1] : 100;
            const change = Math.floor(Math.random() * 20) - 10;
            const newVal = Math.max(50, Math.min(100, lastVal + change));
            if (next.sparklineData) {
              next.sparklineData = [...next.sparklineData.slice(1), newVal];
            }
          } 
          else if (next.id === 'workspace-progress' && typeof next.value === 'string') {
            let val = parseInt(next.value, 10);
            const change = Math.random() > 0.5 ? (Math.random() > 0.5 ? 1 : -1) : 0;
            val = Math.max(80, Math.min(99, val + change));
            next.value = val.toString();
            next.ringProgress = val / 100;
          }

          setLastUpdate(Date.now());
          return { ...current, [def.dataSource!]: next };
        });
      }, def.refreshInterval * intervalMultiplier);

      intervals.push(timer);
    });

    return () => {
      intervals.forEach(clearInterval);
    };
  }, []);

  return { metrics, isLive: true, lastUpdate };
}
