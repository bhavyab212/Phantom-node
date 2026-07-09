import { WidgetLayoutRect } from '../desktop-widgets/widget-types';

export type DesktopLayer = 
  | 'wallpaper' 
  | 'widget-layer' 
  | 'icon-layer' 
  | 'window-layer' 
  | 'taskbar' 
  | 'overlay-layer';

export interface SurfaceRect {
  id: string;
  layer: DesktopLayer;
  rect: WidgetLayoutRect;
  zIndex: number;
  isVisible: boolean;
  isInteractive: boolean;
  opacity: number;
  blurAmount?: number;
}

export interface ConflictReport {
  id: string;
  type: 'overlap' | 'out-of-bounds' | 'z-index-conflict' | 'visibility-conflict';
  surfaceIds: string[];
  description: string;
  severity: 'info' | 'warning' | 'error';
  autoResolvable: boolean;
}

export interface CompositionState {
  surfaces: SurfaceRect[];
  activeLayer: DesktopLayer;
  conflicts: ConflictReport[];
  isAnimating: boolean;
  compositionVersion: number;
}

export interface AnimationConfig {
  type: 'open' | 'close' | 'minimize' | 'restore' | 'maximize' | 'unmaximize' | 'snap' | 'unsnap' | 'tidy' | 'focus-change';
  duration: number;
  easing: string;
  origin?: { x: number; y: number };
  respectsReducedMotion: boolean;
}

export interface WindowAnimationState {
  windowId: string;
  animation: AnimationConfig | null;
  originRect: WidgetLayoutRect | null;
  targetRect: WidgetLayoutRect | null;
  progress: number;
}
