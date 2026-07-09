import { Search } from 'lucide-react';
import React from 'react';

interface CommandPaletteInputProps {
  query: string;
  setQuery: (q: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export function CommandPaletteInput({ query, setQuery, inputRef }: CommandPaletteInputProps) {
  return (
    <div className="relative flex items-center px-4 border-b border-white/[0.08]">
      <Search className="w-5 h-5 text-white/40 shrink-0" />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search projects, services, or type a command..."
        className="w-full bg-transparent border-none py-4 pl-3 pr-12 text-base text-white placeholder-white/30 focus:outline-none focus:ring-0"
        aria-label="Search input"
        aria-autocomplete="list"
      />
      <div className="absolute right-4 text-[10px] font-medium text-white/30 border border-white/10 rounded px-1.5 py-0.5 bg-white/5 tracking-widest uppercase">
        ESC
      </div>
    </div>
  );
}
