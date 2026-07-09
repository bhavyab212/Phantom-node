import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useWidgetVisibility } from '../useWidgetVisibility';

export function WidgetWelcome() {
  const { toggleWidget } = useWidgetVisibility();

  const handleClose = () => {
    toggleWidget('w-welcome');
  };

  const handleCTA = () => {
    if (typeof window !== 'undefined') {
      const { useWindowStore } = require('../../window-manager/useWindowStore');
      const { APP_REGISTRY } = require('../../window-manager/window-registry');
      const app = APP_REGISTRY['contact-app'];
      if (app) {
        useWindowStore.getState().openApp('contact-app', app.title, { width: app.defaultWidth, height: app.defaultHeight });
      }
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-6 relative">
      <button 
        onClick={handleClose}
        className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white"
        aria-label="Close welcome panel"
      >
        <X size={16} />
      </button>
      
      <div className="flex-1 mt-6 space-y-3">
        <p className="text-[15px] text-white/90 leading-relaxed font-medium">
          We build, automate and scale businesses with AI and modern technology.
        </p>
      </div>

      <button 
        onClick={handleCTA}
        className="mt-6 w-full py-3 px-4 rounded-xl font-medium text-sm text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
          boxShadow: '0 4px 14px rgba(168, 85, 247, 0.4)'
        }}
      >
        Let's Work Together
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
