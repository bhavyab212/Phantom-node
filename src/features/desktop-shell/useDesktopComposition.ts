import { create } from 'zustand';
import { CompositionState, SurfaceRect, ConflictReport, DesktopLayer } from './composition-types';

interface DesktopCompositionStore {
  composition: CompositionState;
  isTidying: boolean;
  registerSurface: (surface: SurfaceRect) => void;
  unregisterSurface: (id: string) => void;
  updateSurface: (id: string, partial: Partial<SurfaceRect>) => void;
  getCompositionSnapshot: () => CompositionState;
  tidyDesktop: () => void;
  resolveConflict: (conflictId: string) => void;
  setIsTidying: (isTidying: boolean) => void;
  setConflicts: (conflicts: ConflictReport[]) => void;
}

export const useDesktopComposition = create<DesktopCompositionStore>((set, get) => ({
  composition: {
    surfaces: [],
    activeLayer: 'window-layer',
    conflicts: [],
    isAnimating: false,
    compositionVersion: 0,
  },
  isTidying: false,
  
  registerSurface: (surface) => {
    set((state) => {
      const exists = state.composition.surfaces.some(s => s.id === surface.id);
      if (exists) return state;
      
      const newSurfaces = [...state.composition.surfaces, surface];
      return {
        composition: {
          ...state.composition,
          surfaces: newSurfaces,
          compositionVersion: state.composition.compositionVersion + 1
        }
      };
    });
  },
  
  unregisterSurface: (id) => {
    set((state) => ({
      composition: {
        ...state.composition,
        surfaces: state.composition.surfaces.filter(s => s.id !== id),
        compositionVersion: state.composition.compositionVersion + 1
      }
    }));
  },
  
  updateSurface: (id, partial) => {
    set((state) => {
      const index = state.composition.surfaces.findIndex(s => s.id === id);
      if (index === -1) return state;
      
      const newSurfaces = [...state.composition.surfaces];
      newSurfaces[index] = { ...newSurfaces[index], ...partial };
      
      return {
        composition: {
          ...state.composition,
          surfaces: newSurfaces,
          compositionVersion: state.composition.compositionVersion + 1
        }
      };
    });
  },
  
  getCompositionSnapshot: () => get().composition,
  
  tidyDesktop: () => {
    set({ isTidying: true });
    // The actual tidy logic will be handled by the TidyDesktopAnimation component
    // which listens to isTidying and coordinates the animations across widgets, windows, and icons.
  },
  
  resolveConflict: (conflictId) => {
    // Left empty for now. The conflict resolution is handled by useConflictDetection automatically
    // or manually based on the specific conflict type.
  },
  
  setIsTidying: (isTidying) => set({ isTidying }),
  
  setConflicts: (conflicts) => {
    set((state) => ({
      composition: {
        ...state.composition,
        conflicts,
        // Don't increment version here to avoid infinite loops if conflicts are updated during render check
      }
    }));
  }
}));
