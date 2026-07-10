import { useState, useEffect } from 'react';
import { useDesktopPreferences } from '../../system/useDesktopPreferences';
import { useAssetStore } from '../../system/useAssetStore';

const WALLPAPER_GRADIENTS: Record<string, string> = {
  default: 'bg-gradient-to-br from-blue-900 to-black',
  purple: 'bg-gradient-to-br from-purple-900 to-black',
  green: 'bg-gradient-to-br from-emerald-900 to-black',
  gray: 'bg-[#121212]',
};

export default function DesktopBackground() {
  const [fetchedWallpaper, setFetchedWallpaper] = useState<string | null>(null);
  const wallpaperId = useDesktopPreferences((s) => s.wallpaperId);
  const { desktopWallpaperUrl } = useAssetStore();

  useEffect(() => {
    if (wallpaperId !== 'default') return;

    if (desktopWallpaperUrl) {
      setFetchedWallpaper(desktopWallpaperUrl);
      return;
    }

    fetch('/api/wallpapers')
      .then((res) => res.json())
      .then((data) => {
        const wallpapers = data.wallpapers || [];
        if (wallpapers.length > 0) {
          const randomIndex = Math.floor(Math.random() * wallpapers.length);
          setFetchedWallpaper(`/api/image?file=${encodeURIComponent(wallpapers[randomIndex])}`);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch wallpapers', err);
      });
  }, [wallpaperId]);

  // Determine background styling
  const isGradient = wallpaperId !== 'default' || !fetchedWallpaper;
  const gradientClass = WALLPAPER_GRADIENTS[wallpaperId] || WALLPAPER_GRADIENTS.default;

  return (
    <div 
      className={`absolute inset-0 overflow-hidden -z-10 select-none pointer-events-auto transition-all duration-500 ease-in-out ${
        isGradient ? gradientClass : 'bg-black'
      }`}
      {...({ 'data-dev-target': 'desktop' } as any)}
    >
      {/* Background Image */}
      {!isGradient && fetchedWallpaper && (
        <img
          src={fetchedWallpaper}
          alt="Desktop Wallpaper"
          className="object-cover w-full h-full absolute inset-0 transition-opacity duration-500"
        />
      )}

      {/* Subtle vignette around the edges to frame the desktop and taskbar */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.5)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent h-48 bottom-0 mt-auto" />
      
      {/* Widget Backdrop Enhancer: subtle darkening on the right side where widgets usually go */}
      <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black/20 to-transparent opacity-50" />
    </div>
  );
}
