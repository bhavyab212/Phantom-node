import React from 'react';
import { SearchX } from 'lucide-react';
import { useWindowStore } from '../window-manager/useWindowStore';

interface CommandPaletteEmptyStateProps {
  query: string;
}

export function CommandPaletteEmptyState({ query }: CommandPaletteEmptyStateProps) {
  const { openApp } = useWindowStore();
  
  return (
    <div 
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
      role="status" 
      aria-live="polite"
    >
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 text-white/20">
        <SearchX size={24} />
      </div>
      <p className="text-white/80 font-medium mb-1">
        No results for "{query}"
      </p>
      <p className="text-sm text-white/40 mb-6 max-w-xs">
        Try searching for services, work, or process instead.
      </p>
      
      <button
        onClick={() => {
          const APP_REGISTRY = require('../window-manager/window-registry').APP_REGISTRY;
          const entry = APP_REGISTRY['contact'];
          if (entry) openApp('contact', entry.title, { width: entry.defaultWidth, height: entry.defaultHeight, x: entry.defaultX, y: entry.defaultY });
        }}
        className="text-sm font-medium text-[var(--accent-color,#3b82f6)] hover:underline focus:outline-none"
      >
        Looking to start a project? Open Contact
      </button>
    </div>
  );
}
