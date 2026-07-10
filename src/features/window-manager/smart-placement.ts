import { PlacementContext, PlacementResult, PlacementStrategy } from './types/smart-placement-types';
import { WidgetLayoutRect } from '../desktop-widgets/widget-types';

const GRID_STEP = 16;

function rectsIntersect(r1: WidgetLayoutRect, r2: WidgetLayoutRect): boolean {
  return !(
    r1.x + r1.width <= r2.x ||
    r1.x >= r2.x + r2.width ||
    r1.y + r1.height <= r2.y ||
    r1.y >= r2.y + r2.height
  );
}

function getOverlapArea(r1: WidgetLayoutRect, r2: WidgetLayoutRect): number {
  if (!rectsIntersect(r1, r2)) return 0;
  const overlapX = Math.max(0, Math.min(r1.x + r1.width, r2.x + r2.width) - Math.max(r1.x, r2.x));
  const overlapY = Math.max(0, Math.min(r1.y + r1.height, r2.y + r2.height) - Math.max(r1.y, r2.y));
  return overlapX * overlapY;
}

function calculateTotalOverlap(
  candidate: WidgetLayoutRect, 
  context: PlacementContext
): number {
  let totalOverlap = 0;

  for (const win of context.existingWindows) {
    totalOverlap += getOverlapArea(candidate, win.rect);
  }

  for (const widget of context.widgetRects) {
    totalOverlap += getOverlapArea(candidate, widget);
  }

  totalOverlap += getOverlapArea(candidate, context.iconZone);
  totalOverlap += getOverlapArea(candidate, context.taskbarRect);

  return totalOverlap;
}

function getCenterRect(context: PlacementContext): WidgetLayoutRect {
  const { screenRect, windowSize, taskbarRect } = context;
  
  // Available height is screen height minus taskbar
  const availableHeight = screenRect.height - taskbarRect.height;
  
  const width = Math.min(windowSize.width, screenRect.width);
  const height = Math.min(windowSize.height, availableHeight);

  const x = Math.max(0, (screenRect.width - width) / 2);
  const y = Math.max(0, (availableHeight - height) / 2);

  return { id: 'temp', x, y, width, height };
}

function calculateBestFit(context: PlacementContext, breakOnFirstFit: boolean): PlacementResult {
  const { screenRect, windowSize, taskbarRect } = context;
  
  const width = Math.min(windowSize.width, screenRect.width);
  const height = Math.min(windowSize.height, screenRect.height - taskbarRect.height);

  let bestRect = getCenterRect(context);
  let minOverlap = Infinity;
  let perfectFits: WidgetLayoutRect[] = [];

  const maxX = screenRect.width - width;
  const maxY = screenRect.height - taskbarRect.height - height;

  if (maxX <= 0 || maxY <= 0) {
    return {
      rect: bestRect,
      strategy: context.strategy,
      overlapped: true,
      overlapArea: calculateTotalOverlap(bestRect, context)
    };
  }

  // Scan grid
  for (let y = 0; y <= maxY; y += GRID_STEP) {
    for (let x = 0; x <= maxX; x += GRID_STEP) {
      const candidate: WidgetLayoutRect = { id: 'temp', x, y, width, height };
      const overlap = calculateTotalOverlap(candidate, context);

      if (overlap === 0) {
        if (breakOnFirstFit) {
          return {
            rect: candidate,
            strategy: 'first-fit',
            overlapped: false,
            overlapArea: 0
          };
        }
        perfectFits.push(candidate);
      } else if (overlap < minOverlap) {
        minOverlap = overlap;
        bestRect = candidate;
      }
    }
  }

  if (perfectFits.length > 0) {
    // Pick based on preferred zone
    let chosen = perfectFits[0];
    
    if (context.preferredZone) {
      const targetX = context.preferredZone.includes('right') ? maxX : context.preferredZone.includes('left') ? 0 : maxX / 2;
      const targetY = context.preferredZone.includes('bottom') ? maxY : context.preferredZone.includes('top') ? 0 : maxY / 2;
      
      let minDistance = Infinity;
      for (const fit of perfectFits) {
        const dist = Math.pow(fit.x - targetX, 2) + Math.pow(fit.y - targetY, 2);
        if (dist < minDistance) {
          minDistance = dist;
          chosen = fit;
        }
      }
    }
    
    return {
      rect: chosen,
      strategy: context.strategy,
      overlapped: false,
      overlapArea: 0
    };
  }

  return {
    rect: bestRect,
    strategy: context.strategy,
    overlapped: true,
    overlapArea: minOverlap
  };
}

function calculateCascade(context: PlacementContext): PlacementResult {
  const { screenRect, windowSize, taskbarRect, lastOpenedWindowRect, cascadeOffset } = context;
  const availableHeight = screenRect.height - taskbarRect.height;
  
  const width = Math.min(windowSize.width, screenRect.width);
  const height = Math.min(windowSize.height, availableHeight);

  if (!lastOpenedWindowRect) {
    return calculateBestFit({ ...context, strategy: 'best-fit' }, false);
  }

  let nextX = lastOpenedWindowRect.x + cascadeOffset.x;
  let nextY = lastOpenedWindowRect.y + cascadeOffset.y;

  // Wrap horizontally
  if (nextX + width > screenRect.width) {
    nextX = 0;
  }
  
  // Wrap vertically
  if (nextY + height > availableHeight) {
    nextY = 0;
  }

  // If both wrap, reset to top-left with a slight offset
  if (nextX === 0 && nextY === 0) {
    nextX = cascadeOffset.x;
    nextY = cascadeOffset.y;
  }

  const rect: WidgetLayoutRect = { id: 'temp', x: nextX, y: nextY, width, height };

  return {
    rect,
    strategy: 'cascade',
    overlapped: calculateTotalOverlap(rect, context) > 0,
    overlapArea: calculateTotalOverlap(rect, context)
  };
}

export function calculatePlacement(context: PlacementContext): PlacementResult {
  // Determine strategy if not explicitly forced
  let strategy = context.strategy;

  if (strategy !== 'restore' && strategy !== 'snap-zone') {
    if (context.existingWindows.length === 0) {
      strategy = 'center';
    } else {
      strategy = 'cascade';
    }
  }

  switch (strategy) {
    case 'center':
      const centerRect = getCenterRect(context);
      return {
        rect: centerRect,
        strategy: 'center',
        overlapped: calculateTotalOverlap(centerRect, context) > 0,
        overlapArea: calculateTotalOverlap(centerRect, context)
      };
    case 'cascade':
    default:
      return calculateCascade(context);
  }
}
