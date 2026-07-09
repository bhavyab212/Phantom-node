import { create } from 'zustand';
import { AnimationConfig, WindowAnimationState } from './composition-types';
import { WidgetLayoutRect } from '../desktop-widgets/widget-types';

interface GlobalAnimationSettings {
  minimizeStyle: 'scale' | 'genie';
  openStyle: 'scale-from-taskbar' | 'fade-in' | 'slide-up';
  closeStyle: 'scale-to-taskbar' | 'fade-out' | 'slide-down';
  durationMultiplier: number;
  staggerDelay: number;
  animationsEnabled: boolean;
}

interface WindowAnimationStore {
  animations: Record<string, WindowAnimationState>;
  globalSettings: GlobalAnimationSettings;
  
  startAnimation: (windowId: string, config: AnimationConfig, originRect: WidgetLayoutRect | null, targetRect: WidgetLayoutRect | null) => void;
  completeAnimation: (windowId: string) => void;
  updateAnimationProgress: (windowId: string, progress: number) => void;
  
  updateGlobalSettings: (partial: Partial<GlobalAnimationSettings>) => void;
  getAnimation: (windowId: string) => WindowAnimationState | null;
}

export const useWindowAnimations = create<WindowAnimationStore>((set, get) => ({
  animations: {},
  
  globalSettings: {
    minimizeStyle: 'scale',
    openStyle: 'scale-from-taskbar',
    closeStyle: 'scale-to-taskbar',
    durationMultiplier: 1,
    staggerDelay: 30,
    animationsEnabled: true,
  },
  
  startAnimation: (windowId, config, originRect, targetRect) => {
    set(state => ({
      animations: {
        ...state.animations,
        [windowId]: {
          windowId,
          animation: config,
          originRect,
          targetRect,
          progress: 0
        }
      }
    }));
  },
  
  completeAnimation: (windowId) => {
    set(state => {
      const newAnimations = { ...state.animations };
      delete newAnimations[windowId];
      return { animations: newAnimations };
    });
  },
  
  updateAnimationProgress: (windowId, progress) => {
    set(state => {
      if (!state.animations[windowId]) return state;
      return {
        animations: {
          ...state.animations,
          [windowId]: {
            ...state.animations[windowId],
            progress
          }
        }
      };
    });
  },
  
  updateGlobalSettings: (partial) => {
    set(state => ({
      globalSettings: { ...state.globalSettings, ...partial }
    }));
  },
  
  getAnimation: (windowId) => {
    return get().animations[windowId] || null;
  }
}));
