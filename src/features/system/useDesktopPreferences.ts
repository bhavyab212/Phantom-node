import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface DesktopPreferencesState {
  wallpaperId: string;
  accentColor: string;
  taskbarAutoHide: boolean;
  volume: number;
  brightness: number;
  nightLight: boolean;
  desktopZoom: number; // 50–200 (percent)
  iconPositions: Record<string, { x: number; y: number }>;
  clipboard: { action: 'cut' | 'copy' | null; appId: string | null };
  setWallpaperId: (id: string) => void;
  setAccentColor: (color: string) => void;
  setTaskbarAutoHide: (hide: boolean) => void;
  setVolume: (v: number) => void;
  setBrightness: (b: number) => void;
  setNightLight: (active: boolean) => void;
  setDesktopZoom: (zoom: number) => void;
  setIconPosition: (appId: string, x: number, y: number) => void;
  setClipboard: (action: 'cut' | 'copy' | null, appId: string | null) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
}

export const useDesktopPreferences = create<DesktopPreferencesState>()(
  persist(
    (set) => ({
      wallpaperId: 'default',
      accentColor: '#3b82f6', // Default Tailwind blue-500
      taskbarAutoHide: false,
      volume: 75,
      brightness: 100,
      nightLight: false,
      desktopZoom: 80,
      iconPositions: {},
      clipboard: { action: null, appId: null },
      theme: 'dark', // default to dark theme for the studio
      setTheme: (theme) => {
        set({ theme });
        if (typeof document !== 'undefined') {
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      },
      toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'dark' ? 'light' : 'dark';
        if (typeof document !== 'undefined') {
          if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
        return { theme: newTheme };
      }),
      setWallpaperId: (wallpaperId) => set({ wallpaperId }),
      setAccentColor: (accentColor) => {
        set({ accentColor });
        if (typeof document !== 'undefined') {
          // Convert hex to rgb
          const hex = accentColor.replace('#', '');
          const r = parseInt(hex.substring(0, 2), 16);
          const g = parseInt(hex.substring(2, 4), 16);
          const b = parseInt(hex.substring(4, 6), 16);
          const rgb = `${r}, ${g}, ${b}`;
          document.documentElement.style.setProperty('--accent-color', accentColor);
          document.documentElement.style.setProperty('--accent-color-rgb', rgb);
        }
      },
      setTaskbarAutoHide: (taskbarAutoHide) => set({ taskbarAutoHide }),
      setVolume: (volume) => set({ volume }),
      setBrightness: (brightness) => set({ brightness }),
      setNightLight: (nightLight) => set({ nightLight }),
      setDesktopZoom: (desktopZoom) => {
        const clamped = Math.min(200, Math.max(50, desktopZoom));
        set({ desktopZoom: clamped });
        if (typeof document !== 'undefined') {
          const z = clamped / 100;
          document.documentElement.style.zoom = String(z);
          document.documentElement.style.setProperty('--desktop-zoom', String(z));
        }
      },
      setIconPosition: (appId, x, y) =>
        set((state) => ({
          iconPositions: { ...state.iconPositions, [appId]: { x, y } },
        })),
      setClipboard: (action, appId) => set({ clipboard: { action, appId } }),
    }),
    {
      name: 'webos-desktop-preferences',
      version: 2,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState: any, version: number) => {
        if (version < 2) {
          return {
            ...persistedState,
            iconPositions: {},
            desktopZoom: 80
          };
        }
        return persistedState;
      },
      onRehydrateStorage: () => (state) => {
        if (state) {
          const accentColor = state.accentColor || '#3b82f6';
          const hex = accentColor.replace('#', '');
          const r = parseInt(hex.substring(0, 2), 16);
          const g = parseInt(hex.substring(2, 4), 16);
          const b = parseInt(hex.substring(4, 6), 16);
          const rgb = `${r}, ${g}, ${b}`;
          const theme = state.theme || 'dark';
          if (typeof document !== 'undefined') {
            document.documentElement.style.setProperty('--accent-color', accentColor);
            document.documentElement.style.setProperty('--accent-color-rgb', rgb);
            
            if (theme === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }

            // Restore zoom level
            const zoom = state.desktopZoom ?? 80;
            document.documentElement.style.zoom = String(zoom / 100);
            document.documentElement.style.setProperty('--desktop-zoom', String(zoom / 100));
          }
        }
      }
    }
  )
);
