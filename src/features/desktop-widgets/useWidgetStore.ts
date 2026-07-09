import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WidgetLayoutRect } from './widget-types';

interface WidgetStoreState {
  customLayouts: Record<string, WidgetLayoutRect>;
  
  updateWidgetLayout: (id: string, rect: WidgetLayoutRect) => void;
  resetWidgetLayouts: () => void;
}

export const useWidgetStore = create<WidgetStoreState>()(
  persist(
    (set) => ({
      customLayouts: {},

      updateWidgetLayout: (id, rect) => set((state) => ({
        customLayouts: {
          ...state.customLayouts,
          [id]: rect
        }
      })),

      resetWidgetLayouts: () => set({ customLayouts: {} }),
    }),
    {
      name: 'widget-custom-layouts'
    }
  )
);
