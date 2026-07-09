import { useState, useEffect, useRef } from 'react';
import DesktopBackground from './components/DesktopBackground';
import DesktopSafeArea from './components/DesktopSafeArea';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import DesktopIconGrid from './components/DesktopIconGrid';
import { useDesktopSelection } from './hooks/useDesktopSelection';
import { useMarqueeSelection } from './hooks/useMarqueeSelection';
import { useContextMenu } from './hooks/useContextMenu';
import { DesktopContextMenu } from './components/DesktopContextMenu';
import { DesktopIconContextMenu } from './components/DesktopIconContextMenu';
import { useWindowStore } from '../window-manager/useWindowStore';
import WindowLayer from '../window-manager/WindowLayer';
import { APP_REGISTRY } from '../window-manager/window-registry';
import SessionRecovery from '../system/SessionRecovery';
import { useDesktopPreferences } from '../system/useDesktopPreferences';
import CommandPalette from '../search/CommandPalette';
import { useCommandPalette } from '../search/useCommandPalette';
import { DesktopWidgetLayer } from '../desktop-widgets/DesktopWidgetLayer';
import { SnapZoneOverlay } from '../window-manager/components/SnapZoneOverlay';
import { SnapAssist } from '../window-manager/components/SnapAssist';
import { useSmartPlacement } from '../window-manager/useSmartPlacement';
import { DesktopCompositionManager } from './DesktopCompositionManager';

export default function DesktopShell() {
  const [isStartOpen, setIsStartOpen] = useState(false);
  
  // This state is used just to force a visual "refresh" effect
  const [refreshKey, setRefreshKey] = useState(0);

  const { selectedIds, select, setSelection, clearSelection } = useDesktopSelection();
  const { isDragging, startPoint, currentPoint, handlers } = useMarqueeSelection(setSelection, clearSelection);
  const contextMenu = useContextMenu();
  const iconContextMenu = useContextMenu();
  const [contextMenuAppId, setContextMenuAppId] = useState<string | null>(null);
  
  const { openApp } = useWindowStore();
  const { placeWindow } = useSmartPlacement();
  const { brightness, nightLight, clipboard, setClipboard, setIconPosition } = useDesktopPreferences();
  const mousePosRef = useRef({ x: 150, y: 150 });

  // Track mouse coordinates for pasting at cursor position on Ctrl+V
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleStart = () => {
    setIsStartOpen(prev => !prev);
    contextMenu.closeMenu();
    iconContextMenu.closeMenu();
    window.dispatchEvent(new CustomEvent('close-tray-flyouts'));
  };
  
  const closeStart = () => setIsStartOpen(false);
  
  const handleAppLaunch = (appId: string) => {
    const entry = APP_REGISTRY[appId];
    if (entry) {
      const placement = placeWindow(appId);
      openApp(appId, entry.title, {
        width: placement ? placement.rect.width : entry.defaultWidth,
        height: placement ? placement.rect.height : entry.defaultHeight,
        x: placement ? placement.rect.x : entry.defaultX,
        y: placement ? placement.rect.y : entry.defaultY
      });
    }
  };

  const handleAppSelect = (appId: string) => {
    setIsStartOpen(false);
    handleAppLaunch(appId);
  };

  const handleAppOpenDesktop = (appId: string) => {
    handleAppLaunch(appId);
    clearSelection();
  };

  const handleRefresh = () => {
    clearSelection();
    setRefreshKey(prev => prev + 1);
  };

  const handleIconContextMenu = (e: React.MouseEvent, appId: string) => {
    contextMenu.closeMenu();
    window.dispatchEvent(new CustomEvent('close-tray-flyouts'));
    setContextMenuAppId(appId);
    iconContextMenu.handleContextMenu(e, 256, 300);
  };

  const handleDesktopContextMenu = (e: React.MouseEvent) => {
    iconContextMenu.closeMenu();
    window.dispatchEvent(new CustomEvent('close-tray-flyouts'));
    contextMenu.handleContextMenu(e, 256, 300);
  };

  const handleDesktopPointerDown = (e: React.PointerEvent) => {
    // If we click empty wallpaper, clear selection and close menus
    if (e.target === e.currentTarget) {
      clearSelection();
      contextMenu.closeMenu();
      iconContextMenu.closeMenu();
      if (isStartOpen) setIsStartOpen(false);
      window.dispatchEvent(new CustomEvent('close-tray-flyouts'));
    }
    // Call the original pointer down handler from marquee selection
    handlers.onPointerDown(e);
  };

  // Keyboard Escape listener to close menus (does not close app windows)
  // Also listens to Ctrl+X and Ctrl+V for Cut/Paste operations
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        contextMenu.closeMenu();
        iconContextMenu.closeMenu();
        setIsStartOpen(false);
        window.dispatchEvent(new CustomEvent('close-tray-flyouts'));
      }

      // Ctrl + X: Cut selected app icon
      if (e.ctrlKey && e.key.toLowerCase() === 'x') {
        const selectedAppId = Array.from(selectedIds)[0];
        if (selectedAppId) {
          e.preventDefault();
          setClipboard('cut', selectedAppId);
        }
      }

      // Ctrl + V: Paste app icon at mouse position
      if (e.ctrlKey && e.key.toLowerCase() === 'v') {
        if (clipboard.appId) {
          e.preventDefault();
          const snappedX = Math.max(10, Math.round(mousePosRef.current.x / 100) * 100);
          const snappedY = Math.max(10, Math.round(mousePosRef.current.y / 110) * 110);
          setIconPosition(clipboard.appId, snappedX, snappedY);
          setClipboard(null, null);
        }
      }
      // Command Palette (Cmd/Ctrl+K or /)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const { toggle } = useCommandPalette.getState();
        toggle();
      } else if (e.key === '/') {
        // Only open on '/' if not typing in an input
        const activeEl = document.activeElement;
        const isInput = activeEl instanceof HTMLInputElement || 
                        activeEl instanceof HTMLTextAreaElement || 
                        (activeEl as HTMLElement).isContentEditable;
        if (!isInput) {
          e.preventDefault();
          const { open } = useCommandPalette.getState();
          open();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [contextMenu, iconContextMenu, selectedIds, clipboard, setClipboard, setIconPosition]);

  // Calculate marquee box styles
  const marqueeStyle = isDragging ? {
    left: Math.min(startPoint.x, currentPoint.x),
    top: Math.min(startPoint.y, currentPoint.y),
    width: Math.abs(currentPoint.x - startPoint.x),
    height: Math.abs(currentPoint.y - startPoint.y),
  } : {};

  const handleWindowInteract = () => {
    if (isStartOpen) setIsStartOpen(false);
    contextMenu.closeMenu();
    iconContextMenu.closeMenu();
    window.dispatchEvent(new CustomEvent('close-tray-flyouts'));
  };

  // Screen Brightness Overlay calculations
  const brightnessOpacity = ((100 - brightness) / 100) * 0.7; // cap dimming at 70% black

  return (
    <SessionRecovery>
      <DesktopCompositionManager>
        {/* Screen Brightness Overlay */}
        {brightnessOpacity > 0 && (
          <div 
            className="fixed inset-0 bg-black pointer-events-none z-[99999]"
            style={{ opacity: brightnessOpacity }}
          />
        )}

        {/* Night Light Tint Overlay */}
        {nightLight && (
          <div 
            className="fixed inset-0 pointer-events-none z-[99998] transition-opacity duration-500"
            style={{ 
              backgroundColor: 'rgba(255, 130, 0, 0.12)',
              opacity: 1
            }}
          />
        )}

        <div key={refreshKey} className="fixed inset-0 overflow-hidden w-screen h-screen">
          <DesktopBackground />
          
          <DesktopSafeArea>
            {/* Desktop Widget Layer */}
            <DesktopWidgetLayer />

            <WindowLayer onInteract={handleWindowInteract} />

            {/* Desktop Icons layer */}
            <div className="relative z-0 w-full h-full pointer-events-none">
              {/* This wrapper catches background drags, clicks, and right clicks */}
              <div 
                className="pointer-events-auto h-full w-full"
                {...handlers}
                onPointerDown={handleDesktopPointerDown}
                onContextMenu={handleDesktopContextMenu}
              >
                <DesktopIconGrid 
                  selectedIds={selectedIds} 
                  onSelect={select} 
                  onOpen={handleAppOpenDesktop} 
                  onContextMenu={handleIconContextMenu}
                />
              </div>
            </div>
          </DesktopSafeArea>

          {/* Marquee Selection Box */}
          {isDragging && (
            <div 
              className="fixed pointer-events-none z-50 border"
              style={{
                ...marqueeStyle,
                backgroundColor: 'rgba(var(--accent-color-rgb), 0.2)',
                borderColor: 'var(--accent-color)'
              }}
            />
          )}

          <DesktopContextMenu 
            isOpen={contextMenu.isOpen}
            position={contextMenu.position}
            onClose={contextMenu.closeMenu}
            onRefresh={handleRefresh}
          />

          <DesktopIconContextMenu
            isOpen={iconContextMenu.isOpen}
            position={iconContextMenu.position}
            appId={contextMenuAppId}
            onClose={iconContextMenu.closeMenu}
          />

          <StartMenu isOpen={isStartOpen} onClose={closeStart} onAppSelect={handleAppSelect} />
          <Taskbar isStartOpen={isStartOpen} toggleStart={toggleStart} />
          <CommandPalette />
          <SnapZoneOverlay />
          <SnapAssist />
        </div>
      </DesktopCompositionManager>
    </SessionRecovery>
  );
}
