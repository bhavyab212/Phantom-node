import { motion, AnimatePresence } from 'framer-motion';
import { useSnapZones } from '../useSnapZones';
import { getZoneRect } from '../snap-layouts';
import { useAutoLayout } from '../../desktop-widgets/useAutoLayout';

export function SnapZoneOverlay() {
  const { isDraggingOverZone, hoveredZoneId, activeLayoutId } = useSnapZones();
  const { safeArea } = useAutoLayout();

  if (!isDraggingOverZone || !hoveredZoneId || !activeLayoutId) return null;

  const rect = getZoneRect(activeLayoutId, hoveredZoneId, safeArea);
  if (!rect) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className="fixed pointer-events-none z-[9999] rounded-xl border-2 border-blue-500/50 bg-blue-500/10 backdrop-blur-sm"
        style={{
          left: rect.x,
          top: rect.y,
          width: rect.width,
          height: rect.height
        }}
      />
    </AnimatePresence>
  );
}
