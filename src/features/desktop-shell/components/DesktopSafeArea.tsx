'use client';

import { ReactNode } from 'react';

interface DesktopSafeAreaProps {
  children: ReactNode;
}

export default function DesktopSafeArea({ children }: DesktopSafeAreaProps) {
  return (
    <div className="w-full h-full pt-4 px-4 pb-[80px] flex flex-col relative z-0">
      {/* Inner safe layout bounds. Bottom padding reserves space for the future taskbar. */}
      {children}
    </div>
  );
}
