import { WidgetLayoutRect } from './widget-types';

export function rectsIntersect(a: WidgetLayoutRect, b: WidgetLayoutRect): boolean {
  return !(
    b.x >= a.x + a.width ||
    b.x + b.width <= a.x ||
    b.y >= a.y + a.height ||
    b.y + b.height <= a.y
  );
}

export function calculateOverlapArea(a: WidgetLayoutRect, b: WidgetLayoutRect): number {
  const overlapX = Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x));
  const overlapY = Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));
  return overlapX * overlapY;
}

export function snapToGrid(value: number, gridSize: number = 8): number {
  return Math.round(value / gridSize) * gridSize;
}

export function getDesktopSafeArea(
  screenWidth: number, 
  screenHeight: number, 
  taskbarHeight: number = 64,
  margin: number = 24
): WidgetLayoutRect {
  return {
    id: 'safe-area',
    x: margin,
    y: margin,
    width: Math.max(0, screenWidth - margin * 2),
    height: Math.max(0, screenHeight - taskbarHeight - margin * 2)
  };
}

// Scans the safe area and finds the first position where the target fits without overlapping existing rects
export function findFreePosition(
  targetSize: { width: number; height: number },
  existingRects: WidgetLayoutRect[],
  safeArea: WidgetLayoutRect,
  gridSize: number = 8,
  preferZone: 'right' | 'left' | 'bottom-right' = 'right'
): { x: number; y: number } {
  const stepsX = Math.floor(safeArea.width / gridSize);
  const stepsY = Math.floor(safeArea.height / gridSize);
  
  let bestPos = { x: safeArea.x, y: safeArea.y };
  let minOverlap = Infinity;

  // Define scan order based on preference
  const getScanCoordinates = () => {
    const coords: {x: number, y: number}[] = [];
    
    if (preferZone === 'right' || preferZone === 'bottom-right') {
      // Scan right-to-left
      for (let xStep = stepsX; xStep >= 0; xStep--) {
        const x = safeArea.x + xStep * gridSize;
        if (x + targetSize.width > safeArea.x + safeArea.width) continue;
        
        // Scan top-to-bottom or bottom-to-top
        if (preferZone === 'bottom-right') {
          for (let yStep = stepsY; yStep >= 0; yStep--) {
            const y = safeArea.y + yStep * gridSize;
            if (y + targetSize.height > safeArea.y + safeArea.height) continue;
            coords.push({x, y});
          }
        } else {
          for (let yStep = 0; yStep <= stepsY; yStep++) {
            const y = safeArea.y + yStep * gridSize;
            if (y + targetSize.height > safeArea.y + safeArea.height) continue;
            coords.push({x, y});
          }
        }
      }
    } else {
      // Default: left-to-right, top-to-bottom
      for (let xStep = 0; xStep <= stepsX; xStep++) {
        const x = safeArea.x + xStep * gridSize;
        if (x + targetSize.width > safeArea.x + safeArea.width) continue;
        
        for (let yStep = 0; yStep <= stepsY; yStep++) {
          const y = safeArea.y + yStep * gridSize;
          if (y + targetSize.height > safeArea.y + safeArea.height) continue;
          coords.push({x, y});
        }
      }
    }
    return coords;
  };

  const coords = getScanCoordinates();

  for (const pos of coords) {
    const testRect: WidgetLayoutRect = {
      id: 'test',
      x: pos.x,
      y: pos.y,
      width: targetSize.width,
      height: targetSize.height
    };

    let totalOverlap = 0;
    for (const existing of existingRects) {
      if (rectsIntersect(testRect, existing)) {
        totalOverlap += calculateOverlapArea(testRect, existing);
      }
    }

    if (totalOverlap === 0) {
      return pos; // Found a perfect spot
    }

    if (totalOverlap < minOverlap) {
      minOverlap = totalOverlap;
      bestPos = pos;
    }
  }

  // Return the least bad position if no perfect spot exists
  return bestPos;
}
