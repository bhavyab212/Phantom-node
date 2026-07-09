'use client';

import AppIconTile from './AppIconTile';
import { AppDefinition } from '../data/apps';

interface DesktopIconItemProps {
  app: AppDefinition;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onOpen: (id: string) => void;
  onContextMenu: (e: React.MouseEvent, id: string) => void;
}

export default function DesktopIconItem({ app, isSelected, onSelect, onOpen, onContextMenu }: DesktopIconItemProps) {
  return (
    <AppIconTile
      variant="desktop"
      label={app.label}
      icon={app.icon}
      isActive={isSelected}
      onClick={(e) => {
        // Stop propagation so the click doesn't bubble up to the wallpaper background layer
        e?.stopPropagation();
        onSelect(app.id);
      }}
      onDoubleClick={(e) => {
        e?.stopPropagation();
        onOpen(app.id);
      }}
      onContextMenu={(e) => {
        e?.stopPropagation();
        onSelect(app.id);
        onContextMenu(e, app.id);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onOpen(app.id);
        }
        if (e.key === ' ') {
          e.preventDefault();
          onSelect(app.id);
        }
      }}
    />
  );
}
