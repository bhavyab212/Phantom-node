import { useEffect, useRef } from 'react';
import { ExternalLink, Maximize, Pin, Type, Info, Scissors } from 'lucide-react';
import { useWindowStore } from '../../window-manager/useWindowStore';
import { APP_REGISTRY } from '../../window-manager/window-registry';
import { useDesktopPreferences } from '../../system/useDesktopPreferences';

interface Point {
  x: number;
  y: number;
}

interface DesktopIconContextMenuProps {
  isOpen: boolean;
  position: Point;
  appId: string | null;
  onClose: () => void;
}

export function DesktopIconContextMenu({ isOpen, position, appId, onClose }: DesktopIconContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { openApp } = useWindowStore();
  const { setClipboard } = useDesktopPreferences();

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('pointerdown', handlePointerDown, true);
    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true);
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !appId) return null;

  return (
    <div 
      ref={menuRef}
      className="fixed z-[100] w-64 py-1.5 bg-[#202020]/95 backdrop-blur-3xl border border-white/10 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-sm flex flex-col"
      style={{ left: position.x, top: position.y }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <button 
        className="w-full flex items-center gap-3 px-4 py-1.5 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
        onClick={() => {
          const entry = APP_REGISTRY[appId];
          if (entry) {
            openApp(appId, entry.title, { width: entry.defaultWidth, height: entry.defaultHeight });
          }
          onClose();
        }}
      >
        <ExternalLink className="w-4 h-4" />
        <span>Open</span>
      </button>

      <button 
        className="w-full flex items-center gap-3 px-4 py-1.5 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
        onClick={() => {
          setClipboard('cut', appId);
          onClose();
        }}
      >
        <Scissors className="w-4 h-4" />
        <span>Cut</span>
      </button>

      <button 
        className="w-full flex items-center gap-3 px-4 py-1.5 text-white/50 cursor-not-allowed"
        disabled
      >
        <Maximize className="w-4 h-4" />
        <span>Open in new window</span>
      </button>

      <div className="h-px bg-white/10 my-1 mx-2" />

      <button 
        className="w-full flex items-center gap-3 px-4 py-1.5 text-white/50 cursor-not-allowed"
        disabled
      >
        <Pin className="w-4 h-4" />
        <span>Pin to taskbar</span>
      </button>

      <div className="h-px bg-white/10 my-1 mx-2" />

      <button 
        className="w-full flex items-center gap-3 px-4 py-1.5 text-white/50 cursor-not-allowed"
        disabled
      >
        <Type className="w-4 h-4" />
        <span>Rename</span>
      </button>

      <button 
        className="w-full flex items-center gap-3 px-4 py-1.5 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
        onClick={() => {
          const entry = APP_REGISTRY['about'];
          if (entry) {
            openApp('about', 'Properties', { width: entry.defaultWidth, height: entry.defaultHeight });
          }
          onClose();
        }}
      >
        <Info className="w-4 h-4" />
        <span>Properties</span>
      </button>
    </div>
  );
}
