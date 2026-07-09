import { Search } from 'lucide-react';

export function StoryCommandHint() {

  // Note: toggleStart isn't in useDesktopPreferences, we might need a custom event or store for this.
  // We can dispatch a custom event to open start menu for search.
  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent('open-start-menu'));
  };

  return (
    <button 
      onClick={handleOpenSearch}
      className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors group mx-auto my-16 text-sm text-white/50"
    >
      <Search size={16} className="text-white/40 group-hover:text-white/80 transition-colors" />
      <span>Tip: You can search projects, services, and documents using the Start menu.</span>
    </button>
  );
}
