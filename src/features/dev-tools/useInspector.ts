import { useEffect, useState } from 'react';

export function useInspector(isActive: boolean, onSelect: (targetId: string) => void) {
  const [hoveredTarget, setHoveredTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) {
      if (hoveredTarget) {
        hoveredTarget.style.outline = '';
        hoveredTarget.style.outlineOffset = '';
        setHoveredTarget(null);
      }
      return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      // Find closest element with data-dev-target
      let el = e.target as HTMLElement | null;
      let targetEl: HTMLElement | null = null;
      
      while (el && el !== document.body) {
        if (el.hasAttribute('data-dev-target')) {
          targetEl = el;
          break;
        }
        el = el.parentElement;
      }

      setHoveredTarget(prev => {
        if (prev !== targetEl) {
          if (prev) {
            prev.style.outline = '';
            prev.style.outlineOffset = '';
          }
          if (targetEl) {
            targetEl.style.outline = '2px dashed #10b981'; // Emerald 500
            targetEl.style.outlineOffset = '2px';
            targetEl.style.cursor = 'crosshair';
          }
        }
        return targetEl;
      });
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (!hoveredTarget) return;
      e.preventDefault();
      e.stopPropagation();
      
      const targetId = hoveredTarget.getAttribute('data-dev-target');
      if (targetId) {
        onSelect(targetId);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, true);
    window.addEventListener('pointerdown', handlePointerDown, true);
    
    // Set a global cursor for the document body
    document.body.style.cursor = 'crosshair';

    return () => {
      window.removeEventListener('pointermove', handlePointerMove, true);
      window.removeEventListener('pointerdown', handlePointerDown, true);
      document.body.style.cursor = '';
      if (hoveredTarget) {
        hoveredTarget.style.outline = '';
        hoveredTarget.style.outlineOffset = '';
        hoveredTarget.style.cursor = '';
      }
    };
  }, [isActive, hoveredTarget, onSelect]);
}
