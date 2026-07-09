import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SettingsState {
  activeSettingsPage: string;
  setActiveSettingsPage: (page: string) => void;

  // Window Management Settings
  settings: {
    smartWindowPlacement: boolean;
    placementStrategy: 'automatic' | 'always-best-fit' | 'story-center-utility-best-fit' | 'always-cascade';
    snapLayouts: boolean;
    snapAssist: boolean;
    cascadeOffset: number;
    showSnapLayoutFlyoutOnHover: boolean;
  };
  updateSettings: (updates: Partial<SettingsState['settings']>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      activeSettingsPage: 'system',
      setActiveSettingsPage: (activeSettingsPage) => set({ activeSettingsPage }),

      settings: {
        smartWindowPlacement: true,
        placementStrategy: 'automatic',
        snapLayouts: true,
        snapAssist: true,
        cascadeOffset: 24,
        showSnapLayoutFlyoutOnHover: true,
      },
      updateSettings: (updates) => set((state) => ({ 
        settings: { ...state.settings, ...updates } 
      })),
    }),
    {
      name: 'webos-settings',
      version: 1,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
