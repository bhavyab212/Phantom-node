import React, { useState } from 'react';
import { WindowInstance } from '../../window-manager/useWindowStore';
import { NativeAppShell, SidebarGroup, SidebarItem } from '../../ui/NativeAppShell';
import { Info, Code, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

interface AboutAppProps {
  window: WindowInstance;
}

export default function AboutApp({ window: windowInstance }: AboutAppProps) {
  return (
    <div className="flex flex-col h-full w-full bg-[#FAFAFA] overflow-y-auto">
      <div className="p-12 max-w-6xl mx-auto w-full pt-8 flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-4">Client Results</h1>
        <p className="text-gray-500 text-[15px] max-w-lg mb-8 leading-relaxed">
          We believe in letting the work speak for itself. We are currently compiling our latest case study metrics and client outcomes.
        </p>
        <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center shadow-sm bg-white">
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
        </div>
      </div>
    </div>
  );
}
