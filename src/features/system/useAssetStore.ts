import { create } from 'zustand';

interface AssetStore {
  lockScreenWallpaperUrl: string | null;
  desktopWallpaperUrl: string | null;
  setLockScreenWallpaperUrl: (url: string) => void;
  setDesktopWallpaperUrl: (url: string) => void;
  clearAssets: () => void;
}

export const useAssetStore = create<AssetStore>((set) => ({
  lockScreenWallpaperUrl: null,
  desktopWallpaperUrl: null,
  setLockScreenWallpaperUrl: (url) => set({ lockScreenWallpaperUrl: url }),
  setDesktopWallpaperUrl: (url) => set({ desktopWallpaperUrl: url }),
  clearAssets: () => {
    // Optionally revoke object URLs to prevent memory leaks if we ever clear them
    set((state) => {
      if (state.lockScreenWallpaperUrl && state.lockScreenWallpaperUrl.startsWith('blob:')) {
        URL.revokeObjectURL(state.lockScreenWallpaperUrl);
      }
      if (state.desktopWallpaperUrl && state.desktopWallpaperUrl.startsWith('blob:')) {
        URL.revokeObjectURL(state.desktopWallpaperUrl);
      }
      return { lockScreenWallpaperUrl: null, desktopWallpaperUrl: null };
    });
  }
}));
