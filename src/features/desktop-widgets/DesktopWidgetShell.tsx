import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Rnd } from 'react-rnd';
import { WidgetLayoutRect } from './widget-types';
import { useWindowStore } from '../window-manager/useWindowStore';
import { useWidgetStore } from './useWidgetStore';
import { useDesktopPreferences } from '../system/useDesktopPreferences';
import { rectsIntersect } from './layout-utils';
import { useDesktopComposition } from '../desktop-shell/useDesktopComposition';

interface DesktopWidgetShellProps {
  rect: WidgetLayoutRect;
  title?: string;
  icon?: React.ReactNode;
  isLive?: boolean;
  children: React.ReactNode;
  trendNode?: React.ReactNode;
}

export function DesktopWidgetShell({ rect, title, icon, isLive, children, trendNode }: DesktopWidgetShellProps) {
  const [opacity, setOpacity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const { windows } = useWindowStore();
  const { updateWidgetLayout } = useWidgetStore();
  const { composition } = useDesktopComposition();
  const desktopZoom = useDesktopPreferences(state => state.desktopZoom) || 100;

  useEffect(() => {
    // If user prefers reduced motion, always keep opacity at 1
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOpacity(1);
      return;
    }

    if (isHovered) {
      setOpacity(1);
      return;
    }

    let isOverlapped = false;

    // Check if composition manager found an overlap with a window
    const overlapConflict = composition.conflicts.find(
      c => c.type === 'overlap' && c.surfaceIds.includes(rect.id) && 
           c.surfaceIds.some(id => windows.some(w => w.instanceId === id && !w.isMinimized))
    );

    if (overlapConflict) {
      isOverlapped = true;
    }

    const isMaximizedActive = windows.some(w => !w.isMinimized && w.isMaximized);

    if (isMaximizedActive) {
      setOpacity(0.15);
    } else if (isOverlapped) {
      setOpacity(0.3);
    } else {
      setOpacity(windows.some(w => !w.isMinimized) ? 0.7 : 1);
    }

  }, [windows, rect.id, isHovered, composition.conflicts]);

  return (
    <Rnd
      scale={desktopZoom / 100}
      default={{
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      }}
      position={{ x: rect.x, y: rect.y }}
      size={{ width: rect.width, height: rect.height }}
      onDragStop={(e, d) => {
        updateWidgetLayout(rect.id, {
          ...rect,
          x: d.x,
          y: d.y,
        });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        updateWidgetLayout(rect.id, {
          ...rect,
          x: position.x,
          y: position.y,
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
        });
      }}
      dragHandleClassName="widget-drag-handle"
      bounds="parent"
      className="absolute z-10 pointer-events-auto"
      minWidth={160}
      minHeight={160}
      {...({ 'data-dev-target': rect.id } as any)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: opacity, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ 
          duration: 0.4, 
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.3 },
          scale: { duration: 0.3 }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full h-full pointer-events-auto rounded-[24px] shadow-2xl overflow-hidden flex flex-col transition-opacity duration-300"
        style={{
          backdropFilter: 'blur(40px) saturate(200%)',
          WebkitBackdropFilter: 'blur(40px) saturate(200%)',
          backgroundColor: 'rgba(15, 15, 15, 0.65)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
        role="figure"
        aria-label={title ? `Widget: ${title}` : 'Desktop Widget'}
      >
      {/* Header */}
      {title && (
        <div className="widget-drag-handle flex items-center justify-between px-5 pt-5 pb-2 cursor-grab active:cursor-grabbing">
          <div className="flex items-center gap-2 text-white/90">
            {icon && <span className="text-white/70">{icon}</span>}
            <span className="text-[13px] font-semibold tracking-wide uppercase text-white/50">{title}</span>
          </div>
          {isLive && (
            <div className="flex items-center gap-1.5 bg-[#10b981]/10 px-2 py-0.5 rounded-full border border-[#10b981]/20">
              <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981] animate-pulse" />
              <span className="text-[10px] font-medium text-[#10b981]">Live</span>
            </div>
          )}
        </div>
      )}

      {/* Body */}
      <div className="flex-1 flex flex-col w-full h-full relative">
        {children}
      </div>

      {/* Footer (if trend) */}
      {trendNode && (
        <div className="px-4 pb-3">
          {trendNode}
        </div>
      )}
      </motion.div>
    </Rnd>
  );
}
