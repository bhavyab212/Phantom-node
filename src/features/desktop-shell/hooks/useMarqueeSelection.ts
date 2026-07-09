'use client';

import { useState, useCallback } from 'react';

interface Point {
  x: number;
  y: number;
}

export function useMarqueeSelection(
  onSelectionUpdate: (ids: string[]) => void,
  clearSelection: () => void
) {
  const [isDragging, setIsDragging] = useState(false);
  const [startPoint, setStartPoint] = useState<Point>({ x: 0, y: 0 });
  const [currentPoint, setCurrentPoint] = useState<Point>({ x: 0, y: 0 });

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    // Only left click, and only if clicking directly on the background
    if (e.button !== 0) return;
    if (e.target !== e.currentTarget) return;

    setIsDragging(true);
    setStartPoint({ x: e.clientX, y: e.clientY });
    setCurrentPoint({ x: e.clientX, y: e.clientY });
    clearSelection();
    
    // Capture pointer so we keep tracking if they drag outside
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [clearSelection]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    setCurrentPoint({ x: e.clientX, y: e.clientY });

    // Calculate intersection
    const minX = Math.min(startPoint.x, e.clientX);
    const maxX = Math.max(startPoint.x, e.clientX);
    const minY = Math.min(startPoint.y, e.clientY);
    const maxY = Math.max(startPoint.y, e.clientY);

    const marqueeRect = { left: minX, right: maxX, top: minY, bottom: maxY };
    
    const selectedIds: string[] = [];
    
    // Find all icons
    const icons = document.querySelectorAll('[data-desktop-icon]');
    icons.forEach(icon => {
      const rect = icon.getBoundingClientRect();
      const id = icon.getAttribute('data-desktop-icon');
      
      if (!id) return;

      // Check intersection
      const intersectX = Math.max(0, Math.min(marqueeRect.right, rect.right) - Math.max(marqueeRect.left, rect.left));
      const intersectY = Math.max(0, Math.min(marqueeRect.bottom, rect.bottom) - Math.max(marqueeRect.top, rect.top));
      
      if (intersectX > 0 && intersectY > 0) {
        selectedIds.push(id);
      }
    });

    onSelectionUpdate(selectedIds);
  }, [isDragging, startPoint, onSelectionUpdate]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  }, [isDragging]);

  return {
    isDragging,
    startPoint,
    currentPoint,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerUp,
    }
  };
}
