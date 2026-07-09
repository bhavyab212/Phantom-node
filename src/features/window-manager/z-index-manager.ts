export function normalizeZIndices(
  currentZIndices: Record<string, number>,
  focusOrder: string[]
): Record<string, number> {
  const normalized: Record<string, number> = {};
  // focusOrder is highest to lowest, so we reverse it to assign 0, 1, 2...
  const reversed = [...focusOrder].reverse();
  
  reversed.forEach((id, index) => {
    normalized[id] = index;
  });
  
  return normalized;
}

export function bringToFront(
  windowId: string,
  currentZIndices: Record<string, number>,
  topZIndex: number,
  threshold: number = 1000
): { newZIndices: Record<string, number>, newTopZIndex: number } {
  let nextTop = topZIndex + 1;
  let nextZIndices = { ...currentZIndices, [windowId]: nextTop };

  if (nextTop > threshold) {
    // Need to normalize
    const orderedIds = Object.entries(nextZIndices)
      .sort(([, zA], [, zB]) => zB - zA)
      .map(([id]) => id);
      
    nextZIndices = normalizeZIndices(nextZIndices, orderedIds);
    nextTop = orderedIds.length - 1;
  }

  return { newZIndices: nextZIndices, newTopZIndex: nextTop };
}

export function sendToBack(
  windowId: string,
  currentZIndices: Record<string, number>
): { newZIndices: Record<string, number> } {
  const nextZIndices = { ...currentZIndices };
  
  // Shift everything else up by 1
  for (const id in nextZIndices) {
    if (id !== windowId) {
      nextZIndices[id] += 1;
    }
  }
  
  nextZIndices[windowId] = 0;
  
  return { newZIndices: nextZIndices };
}
