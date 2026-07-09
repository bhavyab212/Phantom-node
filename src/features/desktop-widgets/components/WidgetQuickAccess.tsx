import React from 'react';
import { useWindowStore } from '../../window-manager/useWindowStore';
import { Folder, PenTool, Layout, FileText, ArrowRight } from 'lucide-react';

export function WidgetQuickAccess() {
  const { openApp } = useWindowStore();

  const actions = [
    { id: 'work', title: 'Case Studies', icon: <Layout size={18} />, desc: 'View our recent work' },
    { id: 'services', title: 'Services', icon: <PenTool size={18} />, desc: 'What we can do for you' },
    { id: 'files', title: 'File Archive', icon: <Folder size={18} />, desc: 'Browse the vault' },
    { id: 'process', title: 'Process', icon: <FileText size={18} />, desc: 'How we build things' },
  ];

  return (
    <div className="w-full h-full flex flex-col p-3 gap-2 overflow-y-auto custom-scrollbar">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={() => {
            const entry = require('../../window-manager/window-registry').APP_REGISTRY[action.id];
            if (entry) {
              openApp(action.id, entry.title, { width: entry.defaultWidth, height: entry.defaultHeight });
            }
          }}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 transition-all group text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/70 group-hover:text-white group-hover:bg-white/10 transition-colors">
              {action.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white/90">{action.title}</span>
              <span className="text-xs text-white/40">{action.desc}</span>
            </div>
          </div>
          <ArrowRight size={14} className="text-white/20 group-hover:text-white/60 transition-colors mr-2" />
        </button>
      ))}
    </div>
  );
}
