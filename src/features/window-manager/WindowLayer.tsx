'use client';

import { useWindowStore } from './useWindowStore';
import AppWindow from './AppWindow';

interface WindowLayerProps {
  onInteract?: () => void;
}

export default function WindowLayer({ onInteract }: WindowLayerProps) {
  const { windows } = useWindowStore();

  return (
    <div 
      className="absolute inset-0 pointer-events-none z-20"
      onPointerDownCapture={onInteract}
    >
      {windows.map(win => (
        <AppWindow key={win.instanceId} window={win} />
      ))}
    </div>
  );
}
