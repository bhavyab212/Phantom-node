'use client';

import React from 'react';
import { Rnd } from 'react-rnd';
import { useWindowStore } from './useWindowStore';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({ id, title, children }) => {
  const { windows, focusWindow, closeWindow } = useWindowStore();
  const isActive = windows.find(w => w.instanceId === id)?.isFocused || false;

  return (
    <Rnd
      default={{
        x: 100,
        y: 100,
        width: 800,
        height: 600,
      }}
      minWidth={400}
      minHeight={300}
      bounds="window"
      onMouseDown={() => focusWindow(id)}
      style={{ zIndex: isActive ? 50 : 10 }}
      className={`bg-black border ${isActive ? 'border-neon' : 'border-gray-800'} rounded-lg shadow-2xl overflow-hidden flex flex-col`}
      dragHandleClassName="window-titlebar"
    >
      <div className="window-titlebar bg-gray-900 text-white p-2 flex justify-between items-center cursor-move select-none">
        <span className="font-mono text-sm">{title}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            closeWindow(id);
          }}
          className="text-gray-400 hover:text-red-500"
        >
          X
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4 bg-black text-gray-300">
        {children}
      </div>
    </Rnd>
  );
};
