import React, { useState } from 'react';
import { WindowInstance } from '../../window-manager/useWindowStore';
import { NativeAppShell, SidebarGroup, SidebarItem } from '../../ui/NativeAppShell';
import { Info, Code, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

interface AboutAppProps {
  window: WindowInstance;
}

export default function AboutApp({ window: windowInstance }: AboutAppProps) {
  const [activeSection, setActiveSection] = useState('system');

  const sidebar = (
    <div className="py-2">
      <SidebarGroup title="About">
        <SidebarItem 
          icon={Cpu} 
          label="System Details" 
          isActive={activeSection === 'system'} 
          onClick={() => setActiveSection('system')} 
        />
        <SidebarItem 
          icon={Code} 
          label="Tech Stack" 
          isActive={activeSection === 'tech'} 
          onClick={() => setActiveSection('tech')} 
        />
      </SidebarGroup>
    </div>
  );

  const toolbar = (
    <div className="flex items-center gap-2 text-sm font-medium">
      <span className="text-white/40">About</span>
      <span className="text-white/40">/</span>
      <span className="text-white/90">
        {activeSection === 'system' ? 'System Details' : 'Tech Stack'}
      </span>
    </div>
  );

  const renderContent = () => {
    if (activeSection === 'system') {
      return (
        <div className="p-8 max-w-2xl mx-auto w-full flex flex-col items-center text-center mt-12">
          <div 
            className="w-24 h-24 rounded-3xl shadow-2xl mb-6 flex items-center justify-center text-4xl font-bold text-white border border-white/20"
            style={{ backgroundImage: 'linear-gradient(135deg, var(--accent-color, #3b82f6), #8b5cf6)' }}
          >
            PN
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Phantom Node OS</h1>
          <div className="text-white/50 text-sm mb-8 font-mono">Version 1.0 (Build 2026.07)</div>
          
          <div className="text-white/70 mb-12 max-w-md">
            A high-performance desktop shell built with modern web technologies, 
            designed to simulate a complete operating system environment inside the browser.
          </div>
          
          <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm border-t border-white/10 pt-8 px-8 w-full">
            <div className="text-white/40 text-right font-medium">Processor</div>
            <div className="text-white/90 text-left">Quantum Core i9 @ 5.8 GHz</div>
            
            <div className="text-white/40 text-right font-medium">Memory</div>
            <div className="text-white/90 text-left">32 GB Unified RAM</div>
            
            <div className="text-white/40 text-right font-medium">Graphics</div>
            <div className="text-white/90 text-left">Phantom GPU Matrix</div>
          </div>
        </div>
      );
    }

    if (activeSection === 'tech') {
      return (
        <div className="p-8 max-w-2xl mx-auto w-full mt-8">
          <h1 className="text-2xl font-bold tracking-tight mb-8 text-white">Technology Stack</h1>
          
          <div className="space-y-4">
             <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-medium mb-2">Core Framework</h3>
                <p className="text-white/60 text-sm leading-relaxed">Next.js 16 (App Router), React 18 with Server Components, and Turbopack for ultra-fast compilation.</p>
             </div>
             
             <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-medium mb-2">State Management</h3>
                <p className="text-white/60 text-sm leading-relaxed">Zustand for highly responsive, un-opinionated state architecture controlling window hierarchies and cascading.</p>
             </div>
             
             <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-medium mb-2">Animation & Styling</h3>
                <p className="text-white/60 text-sm leading-relaxed">Framer Motion for fluid spring physics on window dragging, and Tailwind CSS for utility-first styling and frosted glass effects.</p>
             </div>
          </div>
        </div>
      );
    }
  };

  return (
    <NativeAppShell 
      appId={windowInstance.instanceId}
      sidebar={sidebar}
      toolbar={toolbar}
      content={renderContent()}
    />
  );
}
