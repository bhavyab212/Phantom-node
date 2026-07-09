import React from 'react';
import { StudioMetric } from '../widget-types';

interface WidgetSystemStatusProps {
  metric: StudioMetric;
}

export function WidgetSystemStatus({ metric }: WidgetSystemStatusProps) {
  return (
    <div className="w-full h-full flex flex-col justify-between p-5">
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-light tracking-tight text-white/90">99.9%</span>
        <span className="text-sm font-medium text-white/50">Uptime (30d)</span>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/40 uppercase tracking-wider font-semibold">Servers</span>
          <span className="text-xs text-[#10b981] font-medium">Optimal</span>
        </div>
        <div className="h-[1px] w-full bg-white/5" />
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/40 uppercase tracking-wider font-semibold">Database</span>
          <span className="text-xs text-[#10b981] font-medium">Optimal</span>
        </div>
        <div className="h-[1px] w-full bg-white/5" />
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/40 uppercase tracking-wider font-semibold">Storage</span>
          <span className="text-xs text-white/80 font-medium">45% Used</span>
        </div>
      </div>
    </div>
  );
}
