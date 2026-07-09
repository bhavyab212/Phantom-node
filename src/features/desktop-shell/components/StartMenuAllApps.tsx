'use client';

import AppIconTile from './AppIconTile';
import { AppDefinition } from '../data/apps';

interface StartMenuAllAppsProps {
  apps: AppDefinition[];
  onAppSelect: (appId: string) => void;
}

export default function StartMenuAllApps({ apps, onAppSelect }: StartMenuAllAppsProps) {
  if (apps.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-white/50">
        No apps found.
      </div>
    );
  }

  // A to Z sort
  const sortedApps = [...apps].sort((a, b) => a.label.localeCompare(b.label));

  return (
    <div className="px-8 pb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-white/90">All apps</h3>
      </div>
      
      {/* Simple alphabetic list using the 'list' variant */}
      <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {sortedApps.map((app) => (
          <AppIconTile
            key={app.id}
            variant="list"
            label={app.label}
            icon={app.icon}
            onClick={() => onAppSelect(app.id)}
          />
        ))}
      </div>
    </div>
  );
}
