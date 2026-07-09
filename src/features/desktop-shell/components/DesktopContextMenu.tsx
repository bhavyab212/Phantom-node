import { useEffect, useRef } from 'react';
import { Sparkles, LayoutGrid, AlignHorizontalDistributeCenter, Home, Folder, Palette, Monitor } from 'lucide-react';
import { useWindowStore } from '../../window-manager/useWindowStore';
import { APP_REGISTRY } from '../../window-manager/window-registry';
import { useDesktopPreferences } from '../../system/useDesktopPreferences';
import { useDesktopComposition } from '../useDesktopComposition';

interface Point {
  x: number;
  y: number;
}

interface DesktopContextMenuProps {
  isOpen: boolean;
  position: Point;
  onClose: () => void;
  onRefresh: () => void;
}

export function DesktopContextMenu({ isOpen, position, onClose }: DesktopContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { openApp } = useWindowStore();
  const { tidyDesktop } = useDesktopComposition();

  // Close when clicking outside
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

  // Handle positioning to prevent going off-screen
  const menuStyle: React.CSSProperties = {
    left: position.x,
    top: position.y,
  };
  
  if (typeof window !== 'undefined') {
    if (position.x + 256 > window.innerWidth) {
      menuStyle.left = position.x - 256;
    }
    if (position.y + 300 > window.innerHeight) {
      menuStyle.top = position.y - 300;
    }
  }

  if (!isOpen) return null;

  return (
    <div 
      ref={menuRef}
      className="fixed z-[100] w-64 py-1.5 bg-[#202020]/95 backdrop-blur-3xl border border-white/10 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-sm flex flex-col"
      style={menuStyle}
      onContextMenu={(e) => e.preventDefault()}
      role="menu"
      aria-label="Desktop context menu"
    >
      <button 
        className="w-full flex items-center gap-3 px-4 py-1.5 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
        onClick={() => {
          tidyDesktop();
          onClose();
        }}
        role="menuitem"
      >
        <Sparkles className="w-4 h-4 text-[var(--accent-color)]" />
        <span>Tidy desktop</span>
      </button>

      <div className="h-px bg-white/10 my-1 mx-2" />

      {/* These would normally toggle states, but for now we'll just keep them as static buttons or connected to preferences later */}
      <button 
        className="w-full flex items-center justify-between px-4 py-1.5 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
        onClick={() => onClose()}
        role="menuitem"
      >
        <div className="flex items-center gap-3">
          <LayoutGrid className="w-4 h-4" />
          <span>Show widgets</span>
        </div>
        <span className="text-white/50 text-xs">✓</span>
      </button>

      <button 
        className="w-full flex items-center justify-between px-4 py-1.5 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
        onClick={() => onClose()}
        role="menuitem"
      >
        <div className="flex items-center gap-3">
          <AlignHorizontalDistributeCenter className="w-4 h-4" />
          <span>Auto-arrange</span>
        </div>
      </button>

      <div className="h-px bg-white/10 my-1 mx-2" />

      <button 
        className="w-full flex items-center gap-3 px-4 py-1.5 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
        onClick={() => {
          const entry = APP_REGISTRY['home'];
          if (entry) openApp('home', entry.title, { width: entry.defaultWidth, height: entry.defaultHeight });
          onClose();
        }}
        role="menuitem"
      >
        <Home className="w-4 h-4" />
        <span>Open Studio</span>
      </button>

      <button 
        className="w-full flex items-center gap-3 px-4 py-1.5 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
        onClick={() => {
          const entry = APP_REGISTRY['files'];
          if (entry) openApp('files', entry.title, { width: entry.defaultWidth, height: entry.defaultHeight });
          onClose();
        }}
        role="menuitem"
      >
        <Folder className="w-4 h-4" />
        <span>Open Files</span>
      </button>

      <div className="h-px bg-white/10 my-1 mx-2" />

      <button 
        className="w-full flex items-center gap-3 px-4 py-1.5 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
        onClick={() => {
          const entry = APP_REGISTRY['settings'];
          if (entry) openApp('settings', entry.title, { width: entry.defaultWidth, height: entry.defaultHeight });
          onClose();
        }}
        role="menuitem"
      >
        <Palette className="w-4 h-4" />
        <span>Personalize</span>
      </button>
      
      <button 
        className="w-full flex items-center gap-3 px-4 py-1.5 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
        onClick={() => {
          const entry = APP_REGISTRY['settings'];
          if (entry) openApp('settings', entry.title, { width: entry.defaultWidth, height: entry.defaultHeight });
          onClose();
        }}
        role="menuitem"
      >
        <Monitor className="w-4 h-4" />
        <span>Display settings</span>
      </button>
    </div>
  );
}
