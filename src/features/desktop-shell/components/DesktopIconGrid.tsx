'use client';

import { motion } from 'framer-motion';
import { SYSTEM_APPS } from '../data/apps';
import DesktopIconItem from './DesktopIconItem';
import { useDesktopPreferences } from '../../system/useDesktopPreferences';

interface DesktopIconGridProps {
  selectedIds: Set<string>;
  onSelect: (id: string, multi?: boolean) => void;
  onOpen: (id: string) => void;
  onContextMenu: (e: React.MouseEvent, id: string) => void;
}

export default function DesktopIconGrid({ selectedIds, onSelect, onOpen, onContextMenu }: DesktopIconGridProps) {
  const { iconPositions, setIconPosition, clipboard } = useDesktopPreferences();
  const { iconLayoutZone, isComputing } = require('../../desktop-widgets/useAutoLayout').useAutoLayout();
  const { composition } = require('../../desktop-shell/useDesktopComposition').useDesktopComposition();
  const { windows } = require('../../window-manager/useWindowStore').useWindowStore();

  const getInitialPosition = (index: number) => {
    const rowHeight = 110;
    const colWidth = 100;
    const availableHeight = iconLayoutZone?.height || (typeof window !== 'undefined' ? window.innerHeight - 120 : 800);
    const maxRows = Math.max(1, Math.floor(availableHeight / rowHeight));
      
    const col = Math.floor(index / maxRows);
    const row = index % maxRows;
    
    const zoneX = iconLayoutZone?.x || 10;
    const zoneY = iconLayoutZone?.y || 10;
    
    return {
      x: zoneX + col * colWidth,
      y: zoneY + row * rowHeight
    };
  };

  // Listen for tidy command
  require('react').useEffect(() => {
    const handleTidy = () => {
      const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      const visibleApps = SYSTEM_APPS.filter(app => app.showOnDesktop !== false);
      visibleApps.forEach((app, index) => {
        const delay = isReducedMotion ? 0 : index * 30;
        setTimeout(() => {
          const pos = getInitialPosition(index);
          setIconPosition(app.id, pos.x, pos.y);
        }, delay);
      });
    };

    window.addEventListener('tidy-desktop-icons', handleTidy);
    return () => window.removeEventListener('tidy-desktop-icons', handleTidy);
  }, [iconLayoutZone, setIconPosition]);

  const visibleApps = SYSTEM_APPS.filter(app => app.showOnDesktop !== false);

  return (
    <div className="relative w-full h-full p-2 overflow-hidden pointer-events-none">
      {visibleApps.map((app, index) => {
        const position = iconPositions[app.id] || getInitialPosition(index);
        const isCut = clipboard.action === 'cut' && clipboard.appId === app.id;
        
        // Determine if overlapped by a window
        // We use a simple bounds check here because icons aren't full surfaces yet, or we could check composition
        let isOverlapped = false;
        const iconRect = { x: position.x, y: position.y, width: 80, height: 100 };
        for (const win of windows) {
          if (!win.isMinimized && win.x < iconRect.x + iconRect.width && win.x + win.width > iconRect.x && win.y < iconRect.y + iconRect.height && win.y + win.height > iconRect.y) {
            isOverlapped = true;
            break;
          }
        }

        const opacity = isCut ? 0.5 : (isOverlapped ? 0.3 : 1);
        
        return (
          <motion.div 
            key={`${app.id}-${position.x}-${position.y}`} 
            className="absolute pointer-events-auto transition-opacity duration-200"
            style={{ 
              left: position.x, 
              top: position.y,
              opacity: opacity
            }}
            data-desktop-icon={app.id}
            drag
            dragMomentum={false}
            dragElastic={0}
            onDragEnd={(e, info) => {
              const rawX = position.x + info.offset.x;
              const rawY = position.y + info.offset.y;
              
              // Snap to nearest 100px column and 110px row
              const snappedX = Math.max(10, Math.round(rawX / 100) * 100);
              const snappedY = Math.max(10, Math.round(rawY / 110) * 110);
              
              setIconPosition(app.id, snappedX, snappedY);
            }}
          >
            <DesktopIconItem
              app={app}
              isSelected={selectedIds.has(app.id)}
              onSelect={onSelect}
              onOpen={onOpen}
              onContextMenu={onContextMenu}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
