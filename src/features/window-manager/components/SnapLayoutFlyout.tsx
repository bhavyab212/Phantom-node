import { useEffect, useRef } from 'react';
import { useSnapZones } from '../useSnapZones';
import { SNAP_LAYOUTS, getLayoutsForScreenSize } from '../snap-layouts';
import { useWindowStore } from '../useWindowStore';
import { motion, AnimatePresence } from 'framer-motion';

interface SnapLayoutFlyoutProps {
  windowId: string;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

export function SnapLayoutFlyout({ windowId, buttonRef }: SnapLayoutFlyoutProps) {
  const { showSnapFlyout, flyoutWindowId, hideFlyout, hoveredZoneId, setHoveredZone } = useSnapZones();
  const { snapWindow } = useWindowStore();
  const flyoutRef = useRef<HTMLDivElement>(null);

  const isVisible = showSnapFlyout && flyoutWindowId === windowId;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        flyoutRef.current && 
        !flyoutRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        hideFlyout();
      }
    }

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isVisible, hideFlyout, buttonRef]);

  if (!isVisible) return null;

  const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
  const availableLayouts = getLayoutsForScreenSize(width);

  return (
    <AnimatePresence>
      <motion.div
        ref={flyoutRef}
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className="absolute top-full right-0 mt-2 p-3 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl flex flex-col gap-3 z-50 pointer-events-auto"
        onMouseLeave={() => setHoveredZone(null)}
      >
        <div className="text-xs text-white/60 px-1">Snap Layouts</div>
        <div className="flex gap-3">
          {availableLayouts.map((layout) => (
            <div 
              key={layout.id}
              className="flex gap-1 w-20 h-16 bg-white/5 border border-white/10 rounded-md p-1 group cursor-pointer hover:bg-white/10 transition-colors"
            >
              {layout.zones.map((zone) => {
                const isHovered = hoveredZoneId === zone.id;
                return (
                  <div
                    key={zone.id}
                    onMouseEnter={() => setHoveredZone(zone.id)}
                    onClick={() => {
                      snapWindow(windowId, 'none', layout.id, zone.id);
                      hideFlyout();
                    }}
                    className={`rounded-[2px] transition-colors ${isHovered ? 'bg-blue-500' : 'bg-white/20 group-hover:bg-white/30'}`}
                    style={{
                      width: `${zone.rect.width * 100}%`,
                      height: `${zone.rect.height * 100}%`,
                      marginTop: `${zone.rect.y * 100}%`,
                      marginLeft: zone.rect.x === 0 ? 0 : undefined // simplified positioning
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
