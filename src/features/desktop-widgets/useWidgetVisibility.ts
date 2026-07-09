import { create } from 'zustand';
import { WidgetSize } from './widget-types';
import { DEFAULT_WIDGET_DEFINITIONS } from './widget-data';

interface WidgetVisibilityState {
  widgetsEnabled: boolean;
  visibleWidgetIds: string[];
  widgetSizes: Record<string, WidgetSize>;
  
  toggleWidget: (id: string) => void;
  setWidgetSize: (id: string, size: WidgetSize) => void;
  enableAllWidgets: () => void;
  disableAllWidgets: () => void;
  toggleWidgetsGlobally: () => void;
  resetToDefaults: () => void;
}

const defaultVisibleIds = DEFAULT_WIDGET_DEFINITIONS.filter(w => w.visible).map(w => w.id);
const defaultSizes = DEFAULT_WIDGET_DEFINITIONS.reduce((acc, w) => {
  acc[w.id] = w.size;
  return acc;
}, {} as Record<string, WidgetSize>);

export const useWidgetVisibility = create<WidgetVisibilityState>((set) => ({
  widgetsEnabled: true,
  visibleWidgetIds: defaultVisibleIds,
  widgetSizes: defaultSizes,

  toggleWidget: (id) => set((state) => {
    const isVisible = state.visibleWidgetIds.includes(id);
    if (isVisible) {
      return { visibleWidgetIds: state.visibleWidgetIds.filter(w => w !== id) };
    } else {
      return { visibleWidgetIds: [...state.visibleWidgetIds, id] };
    }
  }),

  setWidgetSize: (id, size) => set((state) => ({
    widgetSizes: { ...state.widgetSizes, [id]: size }
  })),

  enableAllWidgets: () => set({ 
    visibleWidgetIds: DEFAULT_WIDGET_DEFINITIONS.map(w => w.id) 
  }),

  disableAllWidgets: () => set({ visibleWidgetIds: [] }),

  toggleWidgetsGlobally: () => set((state) => ({ 
    widgetsEnabled: !state.widgetsEnabled 
  })),

  resetToDefaults: () => set({
    widgetsEnabled: true,
    visibleWidgetIds: defaultVisibleIds,
    widgetSizes: defaultSizes
  })
}));
