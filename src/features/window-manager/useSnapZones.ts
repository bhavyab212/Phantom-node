import { create } from 'zustand';

interface SnapZonesState {
  activeLayoutId: string | null;
  activeSnapGroup: string[];
  isDraggingOverZone: boolean;
  hoveredZoneId: string | null;
  showSnapFlyout: boolean;
  flyoutWindowId: string | null;

  showFlyout: (windowId: string) => void;
  hideFlyout: () => void;
  setHoveredZone: (zoneId: string | null) => void;
  setIsDraggingOverZone: (isDragging: boolean) => void;
  setActiveLayoutId: (layoutId: string | null) => void;
  
  addToSnapGroup: (windowId: string) => void;
  removeFromSnapGroup: (windowId: string) => void;
  clearSnapGroup: () => void;
}

export const useSnapZones = create<SnapZonesState>((set) => ({
  activeLayoutId: null,
  activeSnapGroup: [],
  isDraggingOverZone: false,
  hoveredZoneId: null,
  showSnapFlyout: false,
  flyoutWindowId: null,

  showFlyout: (windowId) => set({ showSnapFlyout: true, flyoutWindowId: windowId }),
  hideFlyout: () => set({ showSnapFlyout: false, flyoutWindowId: null, hoveredZoneId: null, activeLayoutId: null }),
  setHoveredZone: (zoneId) => set({ hoveredZoneId: zoneId }),
  setIsDraggingOverZone: (isDragging) => set({ isDraggingOverZone: isDragging }),
  setActiveLayoutId: (layoutId) => set({ activeLayoutId: layoutId }),

  addToSnapGroup: (windowId) => set((state) => ({ 
    activeSnapGroup: state.activeSnapGroup.includes(windowId) 
      ? state.activeSnapGroup 
      : [...state.activeSnapGroup, windowId] 
  })),
  removeFromSnapGroup: (windowId) => set((state) => ({
    activeSnapGroup: state.activeSnapGroup.filter(id => id !== windowId)
  })),
  clearSnapGroup: () => set({ activeSnapGroup: [] }),
}));
