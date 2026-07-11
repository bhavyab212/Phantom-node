'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AppIconTileProps {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: (e?: React.MouseEvent) => void;
  onDoubleClick?: (e?: React.MouseEvent) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onContextMenu?: (e: React.MouseEvent) => void;
  variant?: 'taskbar' | 'desktop' | 'start' | 'list';
}

/**
 * AppIconTile
 * 
 * Grid Concept & Safe Area:
 * This component standardizes icon sizing across the OS.
 * - Outer Box: touch-friendly standard
 * - Inner Safe Area: visually balanced scaling for generic icons
 * All icons must pass through this component rather than being used raw.
 */
export default function AppIconTile({
  icon,
  label,
  isActive = false,
  onClick,
  onDoubleClick,
  onKeyDown,
  onContextMenu,
  variant = 'taskbar',
}: AppIconTileProps) {
  
  if (variant === 'taskbar') {
    return (
      <button
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onKeyDown={onKeyDown}
        aria-label={label}
        title={label}
        // focus-visible for accessibility
        className="group relative flex items-center justify-center w-12 h-12 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition-all duration-100"
      >
        {/* Hover / Active Plate (Glass tint) */}
        <div className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/[0.08] group-active:scale-[0.85] transition-all duration-150 pointer-events-none" />

        {/* 
          Inner icon wrapper 
        */}
        <div className="relative flex items-center justify-center w-7 h-7 transition-colors duration-200 pointer-events-none drop-shadow-md">
          {icon}
        </div>

        {/* Windows 11 Active Indicator */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end justify-center h-1">
          <div 
            className={`h-[3px] rounded-full bg-white/80 transition-all duration-200 ${
              isActive 
                ? 'w-[16px] opacity-100' 
                : 'w-[6px] opacity-0 group-hover:opacity-40'
            }`} 
          />
        </div>
      </button>
    );
  }

  if (variant === 'start') {
    return (
      <button
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onKeyDown={onKeyDown}
        aria-label={label}
        title={label}
        className="group relative flex flex-col items-center justify-start pt-3 w-20 h-20 rounded-[4px] outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition-all duration-100"
      >
        <div className="absolute inset-0 rounded-[4px] bg-white/0 group-hover:bg-white/[0.06] group-active:scale-[0.96] transition-all duration-150 pointer-events-none" />
        <div className="relative flex items-center justify-center w-8 h-8 transition-colors duration-200 pointer-events-none drop-shadow-md mb-2">
          {icon}
        </div>
        <span className="text-[11px] text-white/90 group-hover:text-white font-medium tracking-wide drop-shadow-sm truncate w-full px-1 text-center">
          {label}
        </span>
      </button>
    );
  }

  if (variant === 'list') {
    return (
      <button
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onKeyDown={onKeyDown}
        aria-label={label}
        title={label}
        className="group relative flex items-center w-full px-4 py-2.5 rounded-[4px] outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition-all duration-100"
      >
        <div className="absolute inset-0 rounded-[4px] bg-white/0 group-hover:bg-white/[0.06] group-active:scale-[0.98] transition-all duration-150 pointer-events-none" />
        <div className="relative flex items-center justify-center w-7 h-7 transition-colors duration-200 pointer-events-none drop-shadow-md mr-3">
          {icon}
        </div>
        <span className="text-sm text-white/90 group-hover:text-white font-medium tracking-wide drop-shadow-sm">
          {label}
        </span>
      </button>
    );
  }

  if (variant === 'desktop') {
    return (
      <button
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onKeyDown={onKeyDown}
        onContextMenu={onContextMenu}
        aria-label={label}
        title={label}
        className={`group relative flex flex-col items-center justify-start p-2 w-[84px] h-[104px] rounded-md outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition-colors duration-100 ${
          isActive ? 'bg-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]' : 'hover:bg-white/[0.04]'
        }`}
      >
        {/* Inner icon plate (Darker blur for higher visibility) */}
        <div className="relative flex items-center justify-center w-[56px] h-[56px] rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 shadow-sm mb-2 pointer-events-none drop-shadow-xl overflow-hidden">
          <div className="relative flex items-center justify-center w-[40px] h-[40px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            {icon}
          </div>
        </div>
        
        {/* Label beneath */}
        <span 
          className={`text-[13px] font-medium leading-[1.3] tracking-wide text-center line-clamp-2 w-full px-0.5 drop-shadow-md pointer-events-none ${
            isActive ? 'text-white' : 'text-white/95 group-hover:text-white'
          }`}
          style={{ textShadow: '0 1px 4px rgba(0,0,0,1), 0 2px 8px rgba(0,0,0,0.8)' }}
        >
          {label}
        </span>
      </button>
    );
  }

  // Fallback
  return null;
}
