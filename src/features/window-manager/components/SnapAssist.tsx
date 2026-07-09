import { useWindowStore } from '../useWindowStore';
import { useSnapZones } from '../useSnapZones';
import { motion, AnimatePresence } from 'framer-motion';
import { APP_REGISTRY } from '../window-registry';
import { getZoneRect, SNAP_LAYOUTS } from '../snap-layouts';
import { useAutoLayout } from '../../desktop-widgets/useAutoLayout';
import { SYSTEM_APPS } from '../../desktop-shell/data/apps';

export function SnapAssist() {
  const { windows, snapWindow } = useWindowStore();
  const { activeSnapGroup, activeLayoutId, removeFromSnapGroup, clearSnapGroup } = useSnapZones();
  const { safeArea } = useAutoLayout();

  if (activeSnapGroup.length === 0 || !activeLayoutId) return null;

  const layout = SNAP_LAYOUTS[activeLayoutId];
  if (!layout) return null;

  // Find unfilled zones
  const filledZoneIds = windows
    .filter(w => activeSnapGroup.includes(w.instanceId))
    .map(w => w.snapZoneId)
    .filter(Boolean);

  const emptyZones = layout.zones.filter(z => !filledZoneIds.includes(z.id));

  // If no empty zones, clear the snap group as the layout is full
  if (emptyZones.length === 0) {
    clearSnapGroup();
    return null;
  }

  // Windows that are open but NOT in the snap group
  const availableWindows = windows.filter(w => !activeSnapGroup.includes(w.instanceId) && !w.isMinimized);

  if (availableWindows.length === 0) {
    clearSnapGroup();
    return null;
  }

  return (
    <>
      {emptyZones.map(zone => {
        const rect = getZoneRect(activeLayoutId, zone.id, safeArea);
        if (!rect) return null;

        return (
          <AnimatePresence key={zone.id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed z-[9000] rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-4 flex flex-col gap-4 overflow-hidden"
              style={{
                left: rect.x + 8,
                top: rect.y + 8,
                width: rect.width - 16,
                height: rect.height - 16
              }}
            >
              <div className="text-white/70 font-medium text-sm text-center">
                Select a window to fill this space
              </div>
              
              <div className="grid grid-cols-2 gap-4 overflow-y-auto pr-2 pb-2">
                {availableWindows.map(win => {
                  const Icon = SYSTEM_APPS.find(a => a.id === win.appId)?.icon as React.ElementType;

                  return (
                    <motion.button
                      key={win.instanceId}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        snapWindow(win.instanceId, 'none', activeLayoutId, zone.id);
                        // Add to group to trigger next unfilled zone
                        useSnapZones.getState().addToSnapGroup(win.instanceId);
                      }}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-3 flex flex-col items-center justify-center gap-2 transition-colors aspect-video"
                    >
                      {Icon && <Icon className="w-8 h-8 text-white" />}
                      <span className="text-xs text-white/90 truncate w-full text-center">
                        {win.title}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        );
      })}
    </>
  );
}
