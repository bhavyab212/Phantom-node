import React from 'react';
import { StudioMetric } from '../widget-types';

interface WidgetWorkspaceProps {
  metric: StudioMetric;
}

export function WidgetWorkspace({ metric }: WidgetWorkspaceProps) {
  return (
    <div className="w-full h-full flex flex-col p-5">
      <div className="flex items-end gap-2">
        <span className="text-4xl font-light tracking-tight text-white/90">24</span>
      </div>
      <span className="text-sm font-medium text-white/50 mt-1">Active Projects</span>

      <div className="flex-1" />

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="flex flex-col gap-1 bg-white/5 p-3 rounded-xl border border-white/5">
          <span className="text-xs text-white/40 uppercase tracking-wider font-semibold">In Review</span>
          <span className="text-lg font-medium text-white/80">3</span>
        </div>
        <div className="flex flex-col gap-1 bg-[#10b981]/10 p-3 rounded-xl border border-[#10b981]/20">
          <span className="text-xs text-[#10b981]/70 uppercase tracking-wider font-semibold">Deploying</span>
          <span className="text-lg font-medium text-[#10b981]">2</span>
        </div>
      </div>
    </div>
  );
}
