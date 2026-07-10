import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { bringToFront, normalizeZIndices } from './z-index-manager';
import { getDesktopWidth, getDesktopHeight } from '../../utils/windowUtils';

export interface WindowInstance {
  instanceId: string;
  appId: string;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  snapState: string;
  snapLayoutId?: string;
  snapZoneId?: string;
  previousBounds?: { x: number; y: number; width: number; height: number };
  isFocused: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  fileContext?: any;
  targetContext?: any;
}

interface WindowState {
  windows: WindowInstance[];
  topZIndex: number;
  cascadeStack: Array<{ windowId: string; originalRect: { x: number; y: number; width: number; height: number } }>;
  openApp: (appId: string, title: string, defaultProps: Partial<WindowInstance>, fileContext?: any, targetContext?: any) => void;
  closeWindow: (instanceId: string) => void;
  minimizeWindow: (instanceId: string) => void;
  restoreWindow: (instanceId: string) => void;
  focusWindow: (instanceId: string) => void;
  updateWindowPosition: (instanceId: string, x: number, y: number) => void;
  updateWindowSize: (instanceId: string, width: number, height: number) => void;
  toggleMaximizeWindow: (instanceId: string) => void;
  maximizeWindow: (instanceId: string) => void;
  snapWindow: (instanceId: string, snapState: string, snapLayoutId?: string, snapZoneId?: string) => void;
  restorePreviousBounds: (instanceId: string) => void;
  clearCascadeStack: () => void;
}

export const useWindowStore = create<WindowState>()(
  persist(
    (set, get) => {
      const getNextZIndex = () => {
        const { windows } = get();
        if (windows.length === 0) return 10;
        return Math.max(...windows.map(w => w.zIndex)) + 1;
      };

      return {
        windows: [],
        topZIndex: 10,
        cascadeStack: [],
        
        openApp: (appId, title, defaultProps, fileContext, targetContext) => {
          const { windows, topZIndex } = get();
          const existingWindow = windows.find(w => w.appId === appId);
          
          if (existingWindow) {
            // App already open, just restore and focus, and update title/fileContext/targetContext
            set((state) => ({
              windows: state.windows.map(w => {
                if (w.instanceId === existingWindow.instanceId) {
                  return { 
                    ...w, 
                    title: title || w.title,
                    isMinimized: false, 
                    isFocused: true, 
                    zIndex: getNextZIndex(),
                    fileContext: fileContext !== undefined ? fileContext : w.fileContext,
                    targetContext: targetContext !== undefined ? targetContext : w.targetContext
                  };
                }
                return { ...w, isFocused: false };
              })
            }));
            get().focusWindow(existingWindow.instanceId);
            return;
          }
          
          // Cascade offset
          const offset = (windows.length % 5) * 30;
          
          const newWindow: WindowInstance = {
            instanceId: `win-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            appId,
            title,
            isMinimized: false,
            isMaximized: false,
            snapState: 'none',
            isFocused: true,
            zIndex: topZIndex + 1,
            x: defaultProps.x !== undefined ? defaultProps.x : (100 + offset),
            y: defaultProps.y !== undefined ? defaultProps.y : (100 + offset),
            width: defaultProps.width || 800,
            height: defaultProps.height || 600,
            fileContext,
            targetContext,
          };

          set((state) => ({
            windows: [...state.windows.map(w => ({ ...w, isFocused: false })), newWindow],
            topZIndex: state.topZIndex + 1,
            cascadeStack: [...state.cascadeStack, { windowId: newWindow.instanceId, originalRect: { x: newWindow.x, y: newWindow.y, width: newWindow.width, height: newWindow.height } }]
          }));
          get().focusWindow(newWindow.instanceId);
        },
        
        closeWindow: (instanceId) => {
          set((state) => {
            const remaining = state.windows.filter(w => w.instanceId !== instanceId);
            
            // Auto-focus the topmost remaining non-minimized window if the closed one was focused
            const wasFocused = state.windows.find(w => w.instanceId === instanceId)?.isFocused;
            
            if (wasFocused && remaining.length > 0) {
              const nonMinimized = remaining.filter(w => !w.isMinimized);
              if (nonMinimized.length > 0) {
                // Find highest z-index
                const topmost = nonMinimized.reduce((prev, current) => (prev.zIndex > current.zIndex) ? prev : current);
                return {
                  windows: remaining.map(w => w.instanceId === topmost.instanceId ? { ...w, isFocused: true } : w)
                };
              }
            }
            
            return { 
              windows: remaining,
              cascadeStack: state.cascadeStack.filter(c => c.windowId !== instanceId)
            };
          });
        },
        
        minimizeWindow: (instanceId) => {
          set((state) => {
            const nextWindows = state.windows.map(w => w.instanceId === instanceId ? { ...w, isMinimized: true, isFocused: false } : w);
            const remaining = nextWindows.filter(w => w.instanceId !== instanceId && !w.isMinimized);
            
            // Auto-focus the topmost remaining non-minimized window
            if (remaining.length > 0) {
              const topmost = remaining.reduce((prev, current) => (prev.zIndex > current.zIndex) ? prev : current);
              return {
                windows: nextWindows.map(w => w.instanceId === topmost.instanceId ? { ...w, isFocused: true } : w)
              };
            }
            return { windows: nextWindows };
          });
        },
        restoreWindow: (instanceId) => {
          set((state) => ({
            windows: state.windows.map(w => {
              if (w.instanceId === instanceId) {
                return { ...w, isMinimized: false };
              }
              return w;
            })
          }));
          get().focusWindow(instanceId);
        },
        
        focusWindow: (instanceId) => {
          set((state) => {
            const win = state.windows.find(w => w.instanceId === instanceId);
            if (!win) return state;
            if (win.isFocused && win.zIndex === state.topZIndex) return state; // Already focused and on top
            
            const currentZIndices = Object.fromEntries(state.windows.map(w => [w.instanceId, w.zIndex]));
            const { newZIndices, newTopZIndex } = bringToFront(instanceId, currentZIndices, state.topZIndex);

            return {
              topZIndex: newTopZIndex,
              windows: state.windows.map(w => {
                const isTarget = w.instanceId === instanceId;
                return { 
                  ...w, 
                  isFocused: isTarget, 
                  zIndex: newZIndices[w.instanceId]
                };
              })
            };
          });
        },
        
        updateWindowPosition: (instanceId, x, y) => {
          set((state) => ({
            windows: state.windows.map(w => {
              if (w.instanceId === instanceId) {
                const isTearingAway = w.isMaximized || w.snapState !== 'none';
                return { 
                  ...w, 
                  x, 
                  y,
                  isMaximized: false,
                  snapState: 'none',
                  snapLayoutId: undefined,
                  snapZoneId: undefined,
                  width: isTearingAway && w.previousBounds ? w.previousBounds.width : w.width,
                  height: isTearingAway && w.previousBounds ? w.previousBounds.height : w.height,
                };
              }
              return w;
            })
          }));
        },
        
        updateWindowSize: (instanceId, width, height) => {
          set((state) => ({
            windows: state.windows.map(w => w.instanceId === instanceId ? { 
              ...w, 
              width, 
              height,
              isMaximized: false,
              snapState: 'none',
              snapLayoutId: undefined,
              snapZoneId: undefined
            } : w)
          }));
        },

        toggleMaximizeWindow: (instanceId) => {
          set((state) => {
            const win = state.windows.find(w => w.instanceId === instanceId);
            if (!win) return state;

            if (win.isMaximized || win.snapState !== 'none') {
              // Restore from maximize or snap
              return {
                windows: state.windows.map(w => w.instanceId === instanceId ? {
                  ...w,
                  isMaximized: false,
                  snapState: 'none',
                  snapLayoutId: undefined,
                  snapZoneId: undefined,
                  x: w.previousBounds?.x ?? w.x,
                  y: w.previousBounds?.y ?? w.y,
                  width: w.previousBounds?.width ?? w.width,
                  height: w.previousBounds?.height ?? w.height,
                } : w)
              };
            } else {
              const taskbarHeight = 64;
              const maxWidth = getDesktopWidth();
              const maxHeight = getDesktopHeight() - taskbarHeight;

              return {
                windows: state.windows.map(w => w.instanceId === instanceId ? {
                  ...w,
                  isMaximized: true,
                  snapState: 'none',
                  snapLayoutId: undefined,
                  snapZoneId: undefined,
                  previousBounds: { x: w.x, y: w.y, width: w.width, height: w.height },
                  x: 0,
                  y: 0,
                  width: maxWidth,
                  height: maxHeight,
                } : w)
              };
            }
          });
          get().focusWindow(instanceId);
        },

        maximizeWindow: (instanceId) => {
          set((state) => {
            const win = state.windows.find(w => w.instanceId === instanceId);
            if (!win || win.isMaximized) return state;

            const taskbarHeight = 64;
            const maxWidth = getDesktopWidth();
            const maxHeight = getDesktopHeight() - taskbarHeight;

            return {
              windows: state.windows.map(w => w.instanceId === instanceId ? {
                ...w,
                isMaximized: true,
                snapState: 'none',
                snapLayoutId: undefined,
                snapZoneId: undefined,
                previousBounds: (w.snapState !== 'none') ? w.previousBounds : { x: w.x, y: w.y, width: w.width, height: w.height },
                x: 0,
                y: 0,
                width: maxWidth,
                height: maxHeight,
              } : w)
            };
          });
          get().focusWindow(instanceId);
        },

        snapWindow: (instanceId, snapState, snapLayoutId, snapZoneId) => {
          set((state) => {
            const win = state.windows.find(w => w.instanceId === instanceId);
            if (!win) return state;

            const taskbarHeight = 64;
            const screenWidth = getDesktopWidth();
            const screenHeight = getDesktopHeight() - taskbarHeight;
            const halfWidth = screenWidth / 2;
            
            return {
              windows: state.windows.map(w => w.instanceId === instanceId ? {
                ...w,
                isMaximized: false,
                snapState,
                snapLayoutId,
                snapZoneId,
                previousBounds: (w.isMaximized || w.snapState !== 'none') ? w.previousBounds : { x: w.x, y: w.y, width: w.width, height: w.height },
                x: snapState === 'left-half' ? 0 : halfWidth,
                y: 0,
                width: halfWidth,
                height: screenHeight,
              } : w)
            };
          });
          get().focusWindow(instanceId);
        },

        restorePreviousBounds: (instanceId) => {
          set((state) => {
            const win = state.windows.find(w => w.instanceId === instanceId);
            if (!win || !win.previousBounds) return state;
            
            return {
              windows: state.windows.map(w => w.instanceId === instanceId ? {
                ...w,
                isMaximized: false,
                snapState: 'none',
                snapLayoutId: undefined,
                snapZoneId: undefined,
                x: w.previousBounds!.x,
                y: w.previousBounds!.y,
                width: w.previousBounds!.width,
                height: w.previousBounds!.height,
              } : w)
            };
          });
        },
        
        clearCascadeStack: () => {
          set({ cascadeStack: [] });
        }
      };
    },
    {
      name: 'webos-windows',
      version: 1,
      storage: createJSONStorage(() => {
        try {
          return localStorage;
        } catch {
          // In-memory fallback if localStorage is disabled/unavailable
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
      }),
      // Only persist serializable properties, excluding actions & non-serializable fields (like fileContext/focus)
      partialize: (state) => ({
        windows: state.windows.map((w) => ({
          instanceId: w.instanceId,
          appId: w.appId,
          title: w.title,
          isMinimized: w.isMinimized,
          isMaximized: w.isMaximized,
          snapState: w.snapState,
          snapLayoutId: w.snapLayoutId,
          snapZoneId: w.snapZoneId,
          previousBounds: w.previousBounds,
          zIndex: w.zIndex,
          x: w.x,
          y: w.y,
          width: w.width,
          height: w.height,
        })),
      }),
      // Set focused state, strip handlers, reassign zIndices, and check screen boundaries on rehydration
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        
        let processed = state.windows || [];
        
        // Remove internal file handlers silently (such as pdf-viewer and json-viewer)
        processed = processed.filter(w => w.appId !== 'pdf-viewer' && w.appId !== 'json-viewer');

        if (processed.length > 0) {
          // Order by zIndex and allocate fresh zIndices starting at 10
          processed.sort((a, b) => a.zIndex - b.zIndex);
          processed = processed.map((w, idx) => ({
            ...w,
            zIndex: 10 + idx,
            isFocused: false, // temporarily reset focus
          }));

          // Set topmost window as focused
          processed[processed.length - 1].isFocused = true;
          
          useWindowStore.setState({ topZIndex: 10 + processed.length - 1, cascadeStack: [] });

          // Clamping offscreen window coordinates if the viewport resized
          if (typeof window !== 'undefined') {
            const screenW = window.innerWidth;
            const screenH = window.innerHeight - 64; // taskbar offset
            
            processed = processed.map(w => {
              let newX = w.x;
              let newY = w.y;
              
              // Standard clamping rules (must keep at least 40px of title bar visible)
              newX = Math.max(newX, -w.width + 40);
              newX = Math.min(newX, screenW - 40);
              newY = Math.max(0, newY);
              newY = Math.min(newY, screenH - 40);

              return { ...w, x: newX, y: newY };
            });
          }
        }
        
        useWindowStore.setState({ windows: processed });
      },
      migrate: (persistedState: any, version) => {
        // Fall back to clean state on schema changes
        return { windows: [] };
      }
    }
  )
);
