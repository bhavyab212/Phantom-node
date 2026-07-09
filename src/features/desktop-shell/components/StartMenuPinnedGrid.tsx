'use client';

import AppIconTile from './AppIconTile';
import { AppDefinition } from '../data/apps';

interface StartMenuPinnedGridProps {
  apps: AppDefinition[];
  onAppSelect: (appId: string) => void;
}

export default function StartMenuPinnedGrid({ apps, onAppSelect }: StartMenuPinnedGridProps) {
  if (apps.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-white/50">
        No pinned apps match your search.
      </div>
    );
  }

  return (
    <div className="px-8 pb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white/90">Pinned</h3>
      </div>
      
      {/* 6 columns for desktop feeling, scales down gracefully if needed */}
      <div className="grid grid-cols-6 gap-y-2 gap-x-1 place-items-center">
        {apps.map((app) => (
          <AppIconTile
            key={app.id}
            variant="start"
            label={app.label}
            icon={app.icon}
            onClick={() => onAppSelect(app.id)}
          />
        ))}
      </div>
    </div>
  );
}
