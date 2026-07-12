import React, { useState } from 'react';
import { WindowInstance, useWindowStore } from '../../window-manager/useWindowStore';
import { NativeAppShell, SidebarGroup, SidebarItem } from '../../ui/NativeAppShell';
import { LayoutGrid, Activity, Layers, Briefcase, GitMerge, Mail, ArrowRight, CheckCircle2, Users } from 'lucide-react';

interface HomeAppProps {
  window: WindowInstance;
}

export default function HomeApp({ window }: HomeAppProps) {
  const { openApp } = useWindowStore();
  const [activeTab, setActiveTab] = useState('overview');

  const sidebar = (
    <div className="py-2">
      <SidebarGroup>
        <SidebarItem 
          icon={LayoutGrid} 
          label="Overview" 
          isActive={activeTab === 'overview'} 
          onClick={() => setActiveTab('overview')} 
        />
        <SidebarItem 
          icon={Activity} 
          label="Activity Feed" 
          isActive={activeTab === 'activity'} 
          onClick={() => setActiveTab('activity')} 
          badge="3 New"
        />
      </SidebarGroup>
      
      <SidebarGroup title="AGENCY APPS">
        <SidebarItem icon={Layers} label="Work" onClick={() => openApp('work', 'Work', {})} />
        <SidebarItem icon={Briefcase} label="Services" onClick={() => openApp('services', 'Services', {})} />
        <SidebarItem icon={GitMerge} label="Process" onClick={() => openApp('process', 'Process', {})} />
      </SidebarGroup>

      <SidebarGroup title="SYSTEM">
        <SidebarItem icon={Mail} label="Contact" onClick={() => openApp('contact', 'Contact', {})} />
      </SidebarGroup>
    </div>
  );

  const content = (
    <div className="h-full w-full bg-[#F4F4F6] overflow-auto relative">

      {/* ── HERO SECTION ── */}
      <div className="relative px-10 pt-8 pb-0 min-h-[300px]">

        {/* 3D Glass Cube — top right */}
        <div className="absolute top-0 right-0 w-[340px] h-[280px] pointer-events-none select-none z-0">
          <img
            src="/images/home-hero-cube.png"
            alt="3D glass cube"
            className="w-full h-full object-contain object-right-top"
            draggable={false}
          />
        </div>

        {/* BUILD / AUTOMATE / SCALE circular badge — overlapping cube */}
        <div className="absolute top-6 right-[155px] z-10 pointer-events-none">
          <div className="w-[88px] h-[88px] rounded-full bg-white/90 border border-gray-200/70 shadow-[0_4px_24px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center gap-[3px]">
            <span className="text-[8px] font-bold text-gray-800 tracking-[0.12em] uppercase">BUILD</span>
            <div className="flex items-center gap-1">
              <div className="w-[5px] h-[5px] rounded-full bg-yellow-400"></div>
              <span className="text-[8px] font-bold text-gray-800 tracking-[0.12em] uppercase">AUTOMATE</span>
            </div>
            <span className="text-[8px] font-bold text-gray-800 tracking-[0.12em] uppercase">SCALE</span>
          </div>
        </div>

        {/* Text content */}
        <div className="relative z-10 max-w-[420px]">
          <p className="text-[13px] text-gray-500 font-medium mb-2 tracking-wide">Welcome to</p>
          <h1 className="text-[46px] font-black text-gray-900 leading-[1.05] tracking-tight mb-0">
            Phantom Node
          </h1>
          <h1 className="text-[46px] font-black text-yellow-400 leading-[1.05] tracking-tight mb-5">
            Studio
          </h1>
          <p className="text-[14px] text-gray-500 font-normal leading-relaxed max-w-[340px]">
            Engineering premium digital platforms<br />that drive growth.
          </p>
        </div>

        {/* ── KPI CARDS ── */}
        <div className="grid grid-cols-3 gap-4 mt-8 pr-4 relative z-10">

          {/* Card 1 — Projects Delivered */}
          <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-gray-100 hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-sm shrink-0">
                <CheckCircle2 className="w-5 h-5 text-gray-900" strokeWidth={2.5} />
              </div>
              <span className="text-[10.5px] font-bold uppercase tracking-[0.1em] text-gray-400">Projects Delivered</span>
            </div>
            <div className="text-[42px] font-black text-gray-900 leading-none mb-4">24</div>
            <div className="flex items-center justify-between">
              <span className="text-[11.5px] font-semibold text-gray-400">+12% from last month</span>
              {/* Wavy sparkline */}
              <svg width="48" height="22" viewBox="0 0 48 22" fill="none">
                <path d="M2 16 Q8 16, 12 10 T20 13 T28 6 T36 9 T46 4" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
          </div>

          {/* Card 2 — Active Clients */}
          <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-gray-100 hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-sm shrink-0">
                <Users className="w-5 h-5 text-gray-900" strokeWidth={2.5} />
              </div>
              <span className="text-[10.5px] font-bold uppercase tracking-[0.1em] text-gray-400">Active Clients</span>
            </div>
            <div className="text-[42px] font-black text-gray-900 leading-none mb-4">8</div>
            <div className="flex items-center justify-between">
              <span className="text-[11.5px] font-semibold text-gray-400">+2 new this month</span>
              <svg width="48" height="22" viewBox="0 0 48 22" fill="none">
                <path d="M2 18 Q10 15, 16 10 T26 8 T38 5 T46 2" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
          </div>

          {/* Card 3 — System Uptime */}
          <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-gray-100 hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-sm shrink-0">
                <Activity className="w-5 h-5 text-gray-900" strokeWidth={2.5} />
              </div>
              <span className="text-[10.5px] font-bold uppercase tracking-[0.1em] text-gray-400">System Uptime</span>
            </div>
            <div className="text-[42px] font-black text-gray-900 leading-none mb-4">99.9%</div>
            <div className="flex items-center justify-between">
              <span className="text-[11.5px] font-semibold text-gray-400">Excellent performance</span>
              {/* Zigzag / pulse-style sparkline */}
              <svg width="48" height="22" viewBox="0 0 48 22" fill="none">
                <path d="M2 11 L8 3 L14 18 L20 11 L26 11 L32 11 L38 7 L44 14" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
          </div>

        </div>
      </div>

      {/* ── QUICK LAUNCH ── */}
      <div className="px-10 pt-8 pb-10">
        <h3 className="text-[15px] font-bold text-gray-900 mb-5">Quick Launch</h3>
        <div className="grid grid-cols-2 gap-5">

          {/* Work card */}
          <button
            onClick={() => openApp('work', 'Work', {})}
            className="group relative flex flex-col items-start text-left bg-gradient-to-br from-[#1c1c1e] to-[#0a0a0b] p-8 rounded-[28px] hover:brightness-110 transition-all shadow-[0_12px_32px_rgba(0,0,0,0.15)] border border-white/[0.08] overflow-hidden"
          >
            {/* Wave image background */}
            <div className="absolute inset-0 z-0 opacity-50 transition-opacity group-hover:opacity-70">
              <img 
                src="/images/quick-launch-wave-2.png" 
                alt="Wave" 
                className="w-full h-full object-cover object-right mix-blend-screen" 
                draggable={false}
                style={{ maskImage: 'linear-gradient(to right, transparent 10%, black 80%)', WebkitMaskImage: 'linear-gradient(to right, transparent 10%, black 80%)' }}
              />
            </div>
            
            {/* Subtle Theme Effect */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-yellow-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-yellow-500/15 transition-all duration-500"></div>

            {/* Card inner top highlight */}
            <div className="absolute inset-0 rounded-[28px] border border-white/[0.06] pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, black 0%, transparent 40%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 40%)' }}></div>

            {/* 3D Glass Icon Button */}
            <div className="w-[64px] h-[64px] rounded-full bg-gradient-to-b from-[#333336] to-[#121213] p-[2px] shadow-[0_12px_24px_rgba(0,0,0,0.6)] relative mb-6 z-10 shrink-0">
              {/* Outer ring highlight */}
              <div className="absolute inset-0 rounded-full border border-white/20" style={{ maskImage: 'linear-gradient(to bottom, black 0%, transparent 50%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 50%)' }}></div>
              
              {/* Inner concave well */}
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#050505] to-[#1e1e1e] shadow-[inset_0_4px_10px_rgba(0,0,0,0.8)] border border-black/80 flex items-center justify-center relative">
                 <Layers className="w-[26px] h-[26px] text-[#FFD700] drop-shadow-[0_0_12px_rgba(255,215,0,0.4)]" strokeWidth={1.5} />
              </div>
            </div>

            <h4 className="text-white text-[22px] font-bold mb-3 z-10 relative tracking-tight">Explore Our Work</h4>
            <p className="text-[#a1a1aa] text-[14px] leading-[1.6] max-w-[75%] z-10 relative font-medium">View selected case studies and recent engineering achievements.</p>

            {/* Arrow button */}
            <div className="absolute right-8 bottom-8 w-[46px] h-[46px] bg-white rounded-full flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg z-10">
              <ArrowRight className="w-5 h-5 text-black" strokeWidth={2.5} />
            </div>
          </button>

          {/* Services card */}
          <button
            onClick={() => openApp('services', 'Services', {})}
            className="group relative flex flex-col items-start text-left bg-gradient-to-br from-[#1c1c1e] to-[#0a0a0b] p-8 rounded-[28px] hover:brightness-110 transition-all shadow-[0_12px_32px_rgba(0,0,0,0.15)] border border-white/[0.08] overflow-hidden"
          >
            {/* Wave image background */}
            <div className="absolute inset-0 z-0 opacity-50 transition-opacity group-hover:opacity-70">
              <img 
                src="/images/quick-launch-wave.png" 
                alt="Wave" 
                className="w-full h-full object-cover object-right mix-blend-screen" 
                draggable={false}
                style={{ maskImage: 'linear-gradient(to right, transparent 10%, black 80%)', WebkitMaskImage: 'linear-gradient(to right, transparent 10%, black 80%)' }}
              />
            </div>
            
            {/* Subtle Theme Effect */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-yellow-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-yellow-500/15 transition-all duration-500"></div>
            
            {/* Card inner top highlight */}
            <div className="absolute inset-0 rounded-[28px] border border-white/[0.06] pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, black 0%, transparent 40%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 40%)' }}></div>

            {/* 3D Glass Icon Button */}
            <div className="w-[64px] h-[64px] rounded-full bg-gradient-to-b from-[#333336] to-[#121213] p-[2px] shadow-[0_12px_24px_rgba(0,0,0,0.6)] relative mb-6 z-10 shrink-0">
              {/* Outer ring highlight */}
              <div className="absolute inset-0 rounded-full border border-white/20" style={{ maskImage: 'linear-gradient(to bottom, black 0%, transparent 50%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 50%)' }}></div>
              
              {/* Inner concave well */}
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#050505] to-[#1e1e1e] shadow-[inset_0_4px_10px_rgba(0,0,0,0.8)] border border-black/80 flex items-center justify-center relative">
                 <Briefcase className="w-[26px] h-[26px] text-[#FFD700] drop-shadow-[0_0_12px_rgba(255,215,0,0.4)]" strokeWidth={1.5} />
              </div>
            </div>

            <h4 className="text-white text-[22px] font-bold mb-3 z-10 relative tracking-tight">Core Services</h4>
            <p className="text-[#a1a1aa] text-[14px] leading-[1.6] max-w-[75%] z-10 relative font-medium">Discover how we architect digital products and automate workflows.</p>

            {/* Arrow button */}
            <div className="absolute right-8 bottom-8 w-[46px] h-[46px] bg-white rounded-full flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg z-10">
              <ArrowRight className="w-5 h-5 text-black" strokeWidth={2.5} />
            </div>
          </button>

        </div>
      </div>

    </div>
  );

  return (
    <NativeAppShell 
      appId={window.instanceId}
      sidebar={sidebar}
      content={content}
    />
  );
}
