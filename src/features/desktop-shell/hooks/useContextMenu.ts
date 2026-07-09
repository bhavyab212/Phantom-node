import { useState, useCallback } from 'react';

interface Point {
  x: number;
  y: number;
}

export function useContextMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });

  const handleContextMenu = useCallback((e: React.MouseEvent, menuWidth = 240, menuHeight = 250) => {
    e.preventDefault();
    e.stopPropagation();
    
    let x = e.clientX;
    let y = e.clientY;
    
    // Viewport clamping
    const screenW = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const screenH = typeof window !== 'undefined' ? window.innerHeight : 768;
    
    if (x + menuWidth > screenW) {
      x = screenW - menuWidth - 10;
    }
    
    if (y + menuHeight > screenH - 64) { // avoid taskbar
      y = screenH - 64 - menuHeight - 10;
    }
    
    setPosition({ x: Math.max(10, x), y: Math.max(10, y) });
    setIsOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, position, handleContextMenu, closeMenu };
}
