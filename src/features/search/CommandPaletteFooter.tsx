import React from 'react';

export function CommandPaletteFooter() {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.08] bg-black/20 text-[11px] text-white/40 select-none">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="flex items-center gap-0.5">
            <kbd className="font-sans font-medium px-1 rounded bg-white/10 text-white/60">↑</kbd>
            <kbd className="font-sans font-medium px-1 rounded bg-white/10 text-white/60">↓</kbd>
          </span>
          <span>to navigate</span>
        </div>
        <div className="flex items-center gap-1.5">
          <kbd className="font-sans font-medium px-1 rounded bg-white/10 text-white/60">↵</kbd>
          <span>to select</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 hidden sm:flex">
        <kbd className="font-sans font-medium px-1 rounded bg-white/10 text-white/60">esc</kbd>
        <span>to close</span>
      </div>
    </div>
  );
}
