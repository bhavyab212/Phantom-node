import React from 'react';
import { Mail, Home, Briefcase, Grid, Map, Folder, Settings, Moon, Info, FileText, Star, File } from 'lucide-react';
import { SearchResultItem } from './search-utils';

interface CommandPaletteResultItemProps {
  item: SearchResultItem;
  isSelected: boolean;
  onSelect: () => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  mail: <Mail size={16} />,
  home: <Home size={16} />,
  briefcase: <Briefcase size={16} />,
  grid: <Grid size={16} />,
  workflow: <Map size={16} />,
  folder: <Folder size={16} />,
  settings: <Settings size={16} />,
  moon: <Moon size={16} />,
  info: <Info size={16} />,
  'case-study': <Briefcase size={16} />,
  service: <Grid size={16} />,
  document: <FileText size={16} />,
  testimonial: <Star size={16} />,
  app: <Home size={16} />,
  section: <Map size={16} />
};

export const CommandPaletteResultItem = React.memo(({ item, isSelected, onSelect }: CommandPaletteResultItemProps) => {
  // Determine icon based on item type or explicit icon
  let iconNode: React.ReactNode = <File size={16} />;
  
  if ('icon' in item && item.icon) {
    iconNode = ICON_MAP[item.icon] || iconNode;
  } else if (item.type) {
    iconNode = ICON_MAP[item.type] || iconNode;
  }

  return (
    <div
      role="option"
      aria-selected={isSelected}
      onClick={onSelect}
      className={`
        flex items-center gap-3 px-4 py-3 cursor-pointer group select-none relative
        ${isSelected ? 'bg-[color-mix(in_srgb,var(--accent-color,#3b82f6)_20%,transparent)]' : 'hover:bg-white/[0.04]'}
      `}
    >
      {isSelected && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent-color,#3b82f6)] rounded-r" />
      )}
      
      <div className={`
        flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
        ${isSelected ? 'text-[var(--accent-color,#3b82f6)] bg-[var(--accent-color,#3b82f6)]/10' : 'text-white/40 bg-white/5'}
      `}>
        {iconNode}
      </div>
      
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <span className={`text-sm font-medium truncate ${isSelected ? 'text-white' : 'text-white/80'}`}>
          {item.label}
        </span>
        {/* We can show secondary text like the type or target context */}
        {item.type !== 'action' && (
          <span className="text-xs text-white/40 truncate capitalize">
            {item.type.replace('-', ' ')}
          </span>
        )}
      </div>

      {isSelected && (
        <span className="text-xs text-white/30 hidden sm:block">
          Press Enter to select
        </span>
      )}
    </div>
  );
});
