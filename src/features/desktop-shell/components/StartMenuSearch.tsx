'use client';

import { Search } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface StartMenuSearchProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isOpen: boolean;
}

export default function StartMenuSearch({ isOpen }: { isOpen: boolean }) {
  const handleClick = () => {
    // We dispatch a custom event to close the start menu and open command palette
    // Actually we can just require the store directly
    const { open } = require('../../search/useCommandPalette').useCommandPalette.getState();
    
    // Fire a generic click so the StartMenu knows to close, or better, we can just call an event.
    // Let's close start menu by simulating Escape key or dispatching an event if needed.
    // The easiest is just open() the command palette, and let the user interact there. The Start Menu will close if we click outside.
    // But since it's cleaner, we can dispatch an event to close StartMenu.
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    
    open();
  };

  return (
    <div className="px-6 pt-6 pb-4">
      <button
        onClick={handleClick}
        className="relative flex items-center w-full group overflow-hidden bg-black/20 hover:bg-black/30 rounded-full transition-all duration-200"
      >
        <Search className="absolute left-4 w-4 h-4 text-white/50 pointer-events-none" />
        <div className="w-full h-9 flex items-center pl-11 pr-4 text-sm text-white/50 text-left">
          Search for apps, settings, and documents...
        </div>
      </button>
    </div>
  );
}
