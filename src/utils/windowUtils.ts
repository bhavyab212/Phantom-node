export function getDesktopWidth(): number {
  if (typeof window === 'undefined') return 1024;
  const zoom = typeof document !== 'undefined' && document.documentElement.style.zoom
    ? parseFloat(document.documentElement.style.zoom) || 1
    : 1;
  return window.innerWidth / zoom;
}

export function getDesktopHeight(): number {
  if (typeof window === 'undefined') return 768;
  const zoom = typeof document !== 'undefined' && document.documentElement.style.zoom
    ? parseFloat(document.documentElement.style.zoom) || 1
    : 1;
  return window.innerHeight / zoom;
}
