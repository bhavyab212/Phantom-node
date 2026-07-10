'use client';

import { Rnd } from 'react-rnd';
import { Minus, X, Square, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import { WindowInstance, useWindowStore } from './useWindowStore';
import { APP_REGISTRY } from './window-registry';
import { useSnapZones } from './useSnapZones';
import { SnapLayoutFlyout } from './components/SnapLayoutFlyout';
import { useDesktopPreferences } from '../system/useDesktopPreferences';
import { getDesktopWidth, getDesktopHeight } from '../../utils/windowUtils';
import { useSettingsStore } from '../system/useSettingsStore';
import { useRef } from 'react';
import { FocusRing } from '../desktop-shell/components/FocusRing';
import { InactiveWindowDim } from '../desktop-shell/components/InactiveWindowDim';
import { useDesktopComposition } from '../desktop-shell/useDesktopComposition';

interface AppWindowProps {
  window: WindowInstance;
}

export default function AppWindow({ window }: AppWindowProps) {
  const { 
    focusWindow, 
    closeWindow, 
    minimizeWindow, 
    updateWindowPosition, 
    updateWindowSize,
    toggleMaximizeWindow,
    maximizeWindow,
    snapWindow
  } = useWindowStore();

  const { showFlyout, hideFlyout, hoveredZoneId, setIsDraggingOverZone } = useSnapZones();
  const settings = useSettingsStore(state => state.settings);
  const desktopZoom = useDesktopPreferences(state => state.desktopZoom) || 100;
  const enableWindowResizing = useDesktopPreferences(state => state.enableWindowResizing) ?? true;
  const maximizeBtnRef = useRef<HTMLButtonElement>(null);

  const appEntry = APP_REGISTRY[window.appId];
  
  if (!appEntry) return null;

  return (
    <Rnd
      scale={desktopZoom / 100}
      default={{
        x: window.x,
        y: window.y,
        width: window.width,
        height: window.height,
      }}
      size={{ width: window.width, height: window.height }}
      position={{ x: window.x, y: window.y }}
      disableDragging={window.isMaximized}
      enableResizing={enableWindowResizing && !window.isMaximized && window.snapState === 'none'}
      onDragStart={() => {
        focusWindow(window.instanceId);
        setIsDraggingOverZone(true);
      }}
      onDrag={(e, d) => {
        // We could calculate which zone we're over, but for now we rely on 
        // the edge snap logic below for simplicity
      }}
      onDragStop={(e, d) => {
        setIsDraggingOverZone(false);
        const taskbarHeight = 64;
        const screenW = getDesktopWidth();
        const screenH = getDesktopHeight() - taskbarHeight;
        
        // Edge snapping
        if (d.x <= 24) {
          snapWindow(window.instanceId, 'left-half');
          return;
        }
        if (d.x + window.width >= screenW - 24) {
          snapWindow(window.instanceId, 'right-half');
          return;
        }
        if (d.y <= 5) {
          maximizeWindow(window.instanceId);
          return;
        }

        // Custom Clamping (Keep title bar accessible)
        let newY = Math.max(0, d.y);
        newY = Math.min(newY, screenH - 40);
        
        let newX = Math.max(d.x, -window.width + 40);
        newX = Math.min(newX, screenW - 40);

        updateWindowPosition(window.instanceId, newX, newY);
      }}
      onResizeStart={() => focusWindow(window.instanceId)}
      onResizeStop={(e, direction, ref, delta, position) => {
        updateWindowSize(window.instanceId, parseInt(ref.style.width, 10), parseInt(ref.style.height, 10));
        updateWindowPosition(window.instanceId, position.x, position.y);
      }}
      minWidth={appEntry.minWidth}
      minHeight={appEntry.minHeight}
      dragHandleClassName="window-drag-handle"
      className={`absolute ${
        window.isMinimized ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      style={{ zIndex: window.zIndex }}
      onMouseDownCapture={() => focusWindow(window.instanceId)}
      role="dialog"
      aria-label={window.title}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={
          window.isMinimized 
            ? { opacity: 0, scale: 0.1, y: 50 } 
            : { opacity: 1, scale: 1, y: 0 }
        }
        transition={{ type: 'spring', damping: 26, stiffness: 340 }}
        className={`flex flex-col w-full h-full bg-transparent origin-bottom overflow-hidden border transition-all duration-200 ${
          (window.isMaximized || window.snapState !== 'none') ? 'rounded-none border-white/10' : 'rounded-xl border-white/5'
        }`}
        style={{
          boxShadow: window.isFocused 
            ? '0 30px 60px rgba(0,0,0,0.6)' 
            : '0 20px 50px rgba(0,0,0,0.5)',
        }}
      >
        <FocusRing isFocused={window.isFocused} />
        <InactiveWindowDim isFocused={window.isFocused} isDragging={false} />
        
        {/* Title Bar */}
        <div 
          className="window-drag-handle h-10 bg-[#2C2C2C]/90 backdrop-blur-md flex items-center justify-between px-3 select-none pointer-events-auto"
          onDoubleClick={(e) => { e.stopPropagation(); toggleMaximizeWindow(window.instanceId); }}
        >
          <div className="flex items-center space-x-2 overflow-hidden flex-1">
            <span className="text-xs font-medium text-white/80 truncate">{window.title}</span>
          </div>
          
          {/* Window Controls */}
          <div className="flex items-center space-x-1 ml-4 shrink-0">
            <button 
              className="w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); minimizeWindow(window.instanceId); }}
              aria-label="Minimize"
            >
              <Minus size={14} />
            </button>
            <div className="relative">
              <button 
                ref={maximizeBtnRef}
                className="w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                onClick={(e) => { e.stopPropagation(); toggleMaximizeWindow(window.instanceId); }}
                onMouseEnter={() => {
                  if (settings.showSnapLayoutFlyoutOnHover) {
                    showFlyout(window.instanceId);
                  }
                }}
                aria-label={window.isMaximized ? "Restore" : "Maximize"}
              >
                {window.isMaximized ? <Copy size={13} /> : <Square size={12} />}
              </button>
              <SnapLayoutFlyout windowId={window.instanceId} buttonRef={maximizeBtnRef} />
            </div>
            <button 
              className="w-8 h-8 rounded hover:bg-red-500 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); closeWindow(window.instanceId); }}
              aria-label="Close"
            >
              <X size={14} />
            </button>
          </div>
        </div>
        
        {/* Content Area */}
        <div className={`flex-1 flex flex-col relative pointer-events-auto overflow-hidden ${appEntry.storyMode ? '' : 'bg-transparent'}`}>
          {/* Overlay to block clicks inside inputs/iframes when not focused, ensuring smooth click-to-focus */}
          {!window.isFocused && (
            <div className="absolute inset-0 z-50 pointer-events-auto" onMouseDown={() => focusWindow(window.instanceId)} />
          )}
          {appEntry.render(window)}
        </div>
      </motion.div>
    </Rnd>
  );
}
