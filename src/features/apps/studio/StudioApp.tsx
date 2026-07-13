import React, { useState, useEffect } from 'react';
import { WindowInstance, useWindowStore } from '../../window-manager/useWindowStore';
import { NativeAppShell, SidebarGroup, SidebarItem } from '../../ui/NativeAppShell';
import { SpotlightCard } from '../../ui/SpotlightCard';
import { LayoutGrid, Activity, Layers, Briefcase, GitMerge, Mail, ArrowRight, CheckCircle2, Users, Star, Workflow, ChevronDown, Search, Bell, User, ShieldCheck, Cpu, LineChart, Clock, Headset, Zap } from 'lucide-react';

import WorkApp from '../work/WorkApp';
import ServicesApp from '../services/ServicesApp';
import { ProcessApp } from '../process/ProcessApp';
import { ContactApp } from '../contact/ContactApp';
import AboutApp from '../about/AboutApp';
import AutomationsApp from '../automations/AutomationsApp';

interface StudioAppProps {
  window: WindowInstance;
}

export default function StudioApp({ window: windowInstance }: StudioAppProps) {
  const [activeTab, setActiveTab] = useState(windowInstance.targetContext?.view || 'overview');
  const [isDialHovered, setIsDialHovered] = useState(false);
  
  // Sync tab with external launch intents
  useEffect(() => {
    if (windowInstance.targetContext?.view) {
      setActiveTab(windowInstance.targetContext.view);
    }
  }, [windowInstance.targetContext?.view]);

  const setTab = (tabId: string, navigationSource: 'sidebar' | 'quick_launch' | 'internal_cta' | 'deep_link' = 'sidebar') => {
    import('../../../lib/analytics').then(({ trackStudioViewChanged, trackStudioNavigationClicked }) => {
      if (activeTab !== tabId) {
        trackStudioNavigationClicked(tabId, navigationSource);
        trackStudioViewChanged(tabId, activeTab, navigationSource);
      }
    });
    setActiveTab(tabId);
  };

  const sidebar = (
    <div className="py-2">
      <SidebarGroup title="MAIN">
        <SidebarItem icon={LayoutGrid} label="Overview" isActive={activeTab === 'overview'} onClick={() => setTab('overview')} />
        <SidebarItem icon={Activity} label="Activity Feed" isActive={activeTab === 'activity'} onClick={() => setTab('activity')} badge="3 New" />
      </SidebarGroup>
      
      <SidebarGroup title="AGENCY APPS">
        <SidebarItem icon={Layers} label="Work" isActive={activeTab === 'work'} onClick={() => setTab('work')} />
        <SidebarItem icon={Briefcase} label="Services" isActive={activeTab === 'services'} onClick={() => setTab('services')} />
        <SidebarItem icon={Workflow} label="Automations" isActive={activeTab === 'automations'} onClick={() => setTab('automations')} />
        <SidebarItem icon={GitMerge} label="Process" isActive={activeTab === 'process'} onClick={() => setTab('process')} />
        <SidebarItem icon={Star} label="Results" isActive={activeTab === 'results'} onClick={() => setTab('results')} />
      </SidebarGroup>

      <SidebarGroup title="SYSTEM">
        <SidebarItem icon={Mail} label="Contact" isActive={activeTab === 'contact'} onClick={() => setTab('contact')} />
      </SidebarGroup>
    </div>
  );

  if (activeTab === 'work') return <WorkApp window={windowInstance} onHome={() => setTab('overview')} />;

  let content;
  
  if (activeTab === 'services') content = <ServicesApp window={windowInstance} />;
  else if (activeTab === 'automations') content = <AutomationsApp window={windowInstance} />;
  else if (activeTab === 'process') content = <ProcessApp />;
  else if (activeTab === 'contact') content = <ContactApp />;
  else if (activeTab === 'results') content = <AboutApp window={windowInstance} />;
  else if (activeTab === 'activity') content = (
    <div className="h-full w-full bg-[#FAFAFA] p-12 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
        <Activity className="w-6 h-6 text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">The studio is quiet right now.</h2>
      <p className="text-gray-500 max-w-md">New project activity will appear here as systems move from discovery to deployment.</p>
    </div>
  );
  else content = (
    <div className="h-full w-full relative">
      <div className="absolute inset-0 z-0 overflow-hidden rounded-br-2xl pointer-events-none">
         <img 
           src="/images/studio-bg-light.png" 
           alt="Studio Light Background" 
           className="w-full h-full object-cover object-right-top mix-blend-multiply opacity-90"
           onError={(e) => {
             (e.target as HTMLImageElement).style.display = 'none';
           }}
         />
         {/* Isometric Graphic as a background effect */}
         <div 
           className="absolute right-0 top-0 w-[600px] h-[600px] opacity-100 mix-blend-multiply pointer-events-none translate-x-[15%] -translate-y-[10%]"
           style={{ maskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 70%)' }}
         >
           <img 
             src="/images/home-hero-cube.png" 
             alt="3D Systems Isometric Background" 
             className="w-full h-full object-contain"
             draggable={false}
           />
         </div>
         <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAFA] via-[#FAFAFA]/90 to-transparent"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 px-12 pb-12 pt-12 max-w-[1400px] mx-auto min-h-full flex flex-col">
        <div className="mb-12 relative flex items-start justify-between w-full">
          <div className="max-w-2xl relative z-10">
            <p className="text-gray-400 text-[16px] mb-1 font-bold tracking-wide">Welcome to</p>
            <h1 className="text-[72px] font-black tracking-tight text-[#0a1128] mb-6 leading-[1.05]">
              Phantom Node <br/>
              <span 
                className="text-[#facc15]" 
                style={{ textShadow: '2px 3px 0px rgba(202, 138, 4, 0.7), 0px 8px 15px rgba(250, 204, 21, 0.25)' }}
              >
                Studio
              </span>
            </h1>
            <p className="text-gray-500 text-[18px] font-semibold leading-relaxed max-w-md mb-12">
              Engineering premium digital systems that remove manual work and help ambitious teams move faster.
            </p>

            {/* Features Bar */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row items-center justify-between mt-12 mb-8 gap-4 md:gap-6 w-[120%] relative z-10 transition-all hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-4 flex-1 group cursor-default">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200/50 shadow-inner flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_4px_12px_rgba(249,115,22,0.15)]">
                  <Zap className="w-5 h-5 text-orange-500 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900 mb-0.5 group-hover:text-orange-600 transition-colors">Rapid Execution</h4>
                  <p className="text-[12px] text-gray-500 font-medium">Weeks, not months</p>
                </div>
              </div>

              <div className="w-full md:w-[1px] h-[1px] md:h-12 bg-gray-100"></div>

              <div className="flex items-center gap-4 flex-1 group cursor-default">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200/50 shadow-inner flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_4px_12px_rgba(168,85,247,0.15)]">
                  <Cpu className="w-5 h-5 text-purple-500 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900 mb-0.5 group-hover:text-purple-600 transition-colors">AI-Native</h4>
                  <p className="text-[12px] text-gray-500 font-medium">Smart automation</p>
                </div>
              </div>

              <div className="w-full md:w-[1px] h-[1px] md:h-12 bg-gray-100"></div>

              <div className="flex items-center gap-4 flex-1 group cursor-default">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50 shadow-inner flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_4px_12px_rgba(59,130,246,0.15)]">
                  <GitMerge className="w-5 h-5 text-blue-500 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900 mb-0.5 group-hover:text-blue-600 transition-colors">Seamless Sync</h4>
                  <p className="text-[12px] text-gray-500 font-medium">Fits your stack</p>
                </div>
              </div>

              <div className="w-full md:w-[1px] h-[1px] md:h-12 bg-gray-100"></div>

              <div className="flex items-center gap-4 flex-1 group cursor-default">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200/50 shadow-inner flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_4px_12px_rgba(16,185,129,0.15)]">
                  <LineChart className="w-5 h-5 text-emerald-500 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900 mb-0.5 group-hover:text-emerald-600 transition-colors">Infinite Scale</h4>
                  <p className="text-[12px] text-gray-500 font-medium">Built for growth</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Circular Graphic */}
          <div className="absolute right-[35%] top-[-20px] flex items-center">
            <div 
              className="relative w-[280px] h-[280px] flex items-center justify-center cursor-default z-10"
              onMouseEnter={() => setIsDialHovered(true)}
              onMouseLeave={() => setIsDialHovered(false)}
            >
              {/* Outer decorative orbit ring */}
              <svg className={`absolute inset-0 w-full h-full scale-[1.08] pointer-events-none transition-all duration-1000 ease-in-out ${!isDialHovered ? 'animate-[spin_40s_linear_infinite_reverse] opacity-100' : 'opacity-0 scale-[1.15]'}`} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="0.5" strokeDasharray="4 4" />
                {/* Little orbiting satellite dot */}
                <circle cx="50" cy="2" r="1.5" fill="#facc15" className="shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
                <circle cx="98" cy="50" r="1" fill="rgba(0,0,0,0.2)" />
                <circle cx="2" cy="50" r="1" fill="rgba(0,0,0,0.2)" />
              </svg>

              {/* Main SVG with inner rotation */}
              <svg className={`absolute inset-0 w-full h-full transition-transform duration-1000 ease-in-out ${!isDialHovered ? 'animate-[spin_25s_linear_infinite]' : '[transform:rotate(0deg)]'}`} viewBox="0 0 100 100">
                {/* Base thin circle */}
                <circle 
                  cx="50" cy="50" r="48" 
                  fill={isDialHovered ? "#111111" : "transparent"} 
                  stroke="rgba(0,0,0,0.06)" 
                  strokeWidth={isDialHovered ? "3" : "1"} 
                  className="transition-all duration-700 ease-in-out"
                />
                {/* Yellow arc */}
                <circle 
                  cx="50" cy="50" r="48" 
                  fill="none" 
                  stroke="#facc15" 
                  strokeWidth={isDialHovered ? "3" : "1.5"} 
                  strokeDasharray={isDialHovered ? "302 0" : "75 227"} 
                  className="transition-all duration-700 ease-in-out"
                  transform="rotate(180 50 50)"
                />
              </svg>
              <div className="relative z-10 text-[12px] font-bold tracking-[0.2em] flex flex-col items-center gap-4 mt-1 text-gray-700">
                <div className={`relative transition-colors duration-500 ${isDialHovered ? 'delay-500 text-white' : 'delay-0'}`}>
                  <span className={`absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-1000 bg-yellow-400 ${isDialHovered ? 'delay-500 opacity-100 scale-100' : 'delay-0 opacity-0 scale-50'}`}></span>
                  BUILD
                </div>
                <div className={`relative transition-colors duration-500 ${isDialHovered ? 'delay-[1000ms] text-white' : 'delay-0'}`}>
                  <span className={`absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-1000 bg-yellow-400 ${isDialHovered ? 'delay-[1000ms] opacity-100 scale-100' : 'delay-0 opacity-0 scale-50'}`}></span>
                  AUTOMATE
                </div>
                <div className={`relative transition-colors duration-500 ${isDialHovered ? 'delay-[1500ms] text-white' : 'delay-0'}`}>
                  <span className={`absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-1000 bg-yellow-400 ${isDialHovered ? 'delay-[1500ms] opacity-100 scale-100' : 'delay-0 opacity-0 scale-50'}`}></span>
                  SCALE
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 w-full">
          <div className="relative rounded-[24px] overflow-hidden p-[1px] bg-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1.5 duration-300 group">
            <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,black_50%,transparent_100%)] opacity-80" />
            <SpotlightCard spotlightColor="rgba(0, 0, 0, 0.08)" className="relative bg-white w-full h-full rounded-[23px] px-6 py-5">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#facc15] flex items-center justify-center shadow-[0_2px_10px_rgba(250,204,21,0.3)]">
                  <CheckCircle2 className="w-5 h-5 text-black" strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Projects Delivered</span>
              </div>
              <div className="text-[56px] font-black text-[#0a1128] leading-none mb-3 tracking-tight">24</div>
              <div className="flex items-center justify-between">
                 <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1">↑ 12% <span className="text-gray-400 font-medium">from last month</span></span>
                 <svg width="60" height="30" viewBox="0 0 60 30" fill="none" stroke="url(#gradient-line-1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                   <defs>
                     <linearGradient id="gradient-line-1" x1="0" y1="0" x2="1" y2="0">
                       <stop offset="0%" stopColor="#facc15" />
                       <stop offset="100%" stopColor="#fef08a" />
                     </linearGradient>
                   </defs>
                   <path d="M5 25 L 15 15 L 25 20 L 40 5 L 55 10" className="drop-shadow-[0_2px_4px_rgba(250,204,21,0.3)]" />
                 </svg>
              </div>
            </SpotlightCard>
          </div>
          
          <div className="relative rounded-[24px] overflow-hidden p-[1px] bg-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1.5 duration-300 group">
            <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,black_50%,transparent_100%)] opacity-80" />
            <SpotlightCard spotlightColor="rgba(0, 0, 0, 0.08)" className="relative bg-white w-full h-full rounded-[23px] px-6 py-5">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#facc15] flex items-center justify-center shadow-[0_2px_10px_rgba(250,204,21,0.3)]">
                  <Users className="w-5 h-5 text-black" strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Active Clients</span>
              </div>
              <div className="text-[56px] font-black text-[#0a1128] leading-none mb-3 tracking-tight">8</div>
              <div className="flex items-center justify-between">
                 <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1">↑ 2 <span className="text-gray-400 font-medium">new this month</span></span>
                 <svg width="60" height="30" viewBox="0 0 60 30" fill="none" stroke="url(#gradient-line-2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                   <defs>
                     <linearGradient id="gradient-line-2" x1="0" y1="0" x2="1" y2="0">
                       <stop offset="0%" stopColor="#facc15" />
                       <stop offset="100%" stopColor="#fef08a" />
                     </linearGradient>
                   </defs>
                   <path d="M5 28 L 20 20 L 30 12 L 45 18 L 55 5" className="drop-shadow-[0_2px_4px_rgba(250,204,21,0.3)]" />
                 </svg>
              </div>
            </SpotlightCard>
          </div>

          <div className="relative rounded-[24px] overflow-hidden p-[1px] bg-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1.5 duration-300 group">
            <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,black_50%,transparent_100%)] opacity-80" />
            <SpotlightCard spotlightColor="rgba(0, 0, 0, 0.08)" className="relative bg-white w-full h-full rounded-[23px] px-6 py-5">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#facc15] flex items-center justify-center shadow-[0_2px_10px_rgba(250,204,21,0.3)]">
                  <Activity className="w-5 h-5 text-black" strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">System Uptime</span>
              </div>
              <div className="text-[56px] font-black text-[#0a1128] leading-none mb-3 tracking-tight">99.9%</div>
              <div className="flex items-center justify-between">
                 <span className="text-xs font-semibold text-gray-400">Excellent performance</span>
                 <div className="flex items-end gap-1 h-6">
                   <div className="w-1.5 h-3 bg-yellow-400 rounded-sm"></div>
                   <div className="w-1.5 h-4 bg-yellow-400 rounded-sm"></div>
                   <div className="w-1.5 h-6 bg-yellow-400 rounded-sm"></div>
                   <div className="w-1.5 h-5 bg-yellow-400 rounded-sm"></div>
                 </div>
              </div>
            </SpotlightCard>
          </div>
          <div className="relative rounded-[24px] overflow-hidden p-[1px] bg-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1.5 duration-300 group">
            <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,black_50%,transparent_100%)] opacity-80" />
            <SpotlightCard spotlightColor="rgba(0, 0, 0, 0.08)" className="relative bg-white w-full h-full rounded-[23px] px-6 py-5">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#facc15] flex items-center justify-center shadow-[0_2px_10px_rgba(250,204,21,0.3)]">
                  <Workflow className="w-5 h-5 text-black" strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Hours Saved</span>
              </div>
              <div className="text-[56px] font-black text-[#0a1128] leading-none mb-3 tracking-tight">12k+</div>
              <div className="flex items-center justify-between">
                 <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1">↑ 800 <span className="text-gray-400 font-medium">this week</span></span>
                 <svg width="60" height="30" viewBox="0 0 60 30" fill="none" stroke="url(#gradient-line-3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                   <defs>
                     <linearGradient id="gradient-line-3" x1="0" y1="0" x2="1" y2="0">
                       <stop offset="0%" stopColor="#facc15" />
                       <stop offset="100%" stopColor="#fef08a" />
                     </linearGradient>
                   </defs>
                   <path d="M5 28 L 20 15 L 35 18 L 45 8 L 55 5" className="drop-shadow-[0_2px_4px_rgba(250,204,21,0.3)]" />
                 </svg>
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* Lower Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full mb-6">
          {/* Work Card */}
          <SpotlightCard spotlightColor="rgba(250, 204, 21, 0.15)" onClick={() => {
            import('../../../lib/analytics').then(({ trackQuickLaunchClicked }) => trackQuickLaunchClicked('explore_work', 'work'));
            setTab('work', 'quick_launch');
          }} className="h-[220px] group flex flex-col items-start bg-[#111111] p-8 rounded-[24px] hover:bg-black transition-all shadow-xl border border-white/[0.04]">
            {/* Wave image background */}
            <div className="absolute inset-0 z-0 opacity-40 transition-opacity group-hover:opacity-60">
              <img 
                src="/images/quick-launch-wave.png" 
                alt="Wave" 
                className="w-full h-full object-cover object-right mix-blend-screen" 
                draggable={false}
                style={{ maskImage: 'linear-gradient(to right, transparent 10%, black 80%)', WebkitMaskImage: 'linear-gradient(to right, transparent 10%, black 80%)' }}
              />
            </div>

            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-yellow-500 via-transparent to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-40"></div>
            
            {/* Subtle Theme Effect */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-yellow-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-yellow-500/25 transition-all duration-500"></div>

            <div className="absolute right-8 bottom-8 w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(234,179,8,0.5)] group-hover:shadow-[0_0_30px_rgba(234,179,8,0.8)] z-10">
               <ArrowRight className="w-5 h-5 text-black" strokeWidth={2.5} />
            </div>
            
            <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border-[1.5px] border-yellow-500/30 flex items-center justify-center mb-auto shadow-inner relative z-10">
              <div className="w-9 h-9 rounded-full border border-yellow-500/20 flex items-center justify-center">
                 <Layers className="w-4 h-4 text-yellow-400" />
              </div>
            </div>
            <h4 className="text-white text-[19px] font-bold mb-2 relative z-10">Explore Our Work</h4>
            <p className="text-gray-400 text-[13px] leading-relaxed max-w-[85%] relative z-10">View selected case studies and recent engineering achievements.</p>
          </SpotlightCard>

          {/* Services Card */}
          <SpotlightCard spotlightColor="rgba(250, 204, 21, 0.15)" onClick={() => {
            import('../../../lib/analytics').then(({ trackQuickLaunchClicked }) => trackQuickLaunchClicked('core_services', 'services'));
            setTab('services', 'quick_launch');
          }} className="h-[220px] group flex flex-col items-start bg-[#111111] p-8 rounded-[24px] hover:bg-black transition-all shadow-xl border border-white/[0.04]">
            {/* Wave image background */}
            <div className="absolute inset-0 z-0 opacity-40 transition-opacity group-hover:opacity-60">
              <img 
                src="/images/quick-launch-wave.png" 
                alt="Wave" 
                className="w-full h-full object-cover object-right mix-blend-screen -scale-y-100" 
                draggable={false}
                style={{ maskImage: 'linear-gradient(to right, transparent 10%, black 80%)', WebkitMaskImage: 'linear-gradient(to right, transparent 10%, black 80%)' }}
              />
            </div>

            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-yellow-500 via-transparent to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-40"></div>
            
            {/* Subtle Theme Effect */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-yellow-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-yellow-500/25 transition-all duration-500"></div>

            <div className="absolute right-8 bottom-8 w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(234,179,8,0.5)] group-hover:shadow-[0_0_30px_rgba(234,179,8,0.8)] z-10">
               <ArrowRight className="w-5 h-5 text-black" strokeWidth={2.5} />
            </div>
            
            <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border-[1.5px] border-yellow-500/30 flex items-center justify-center mb-auto shadow-inner relative z-10">
              <div className="w-9 h-9 rounded-full border border-yellow-500/20 flex items-center justify-center">
                 <Briefcase className="w-4 h-4 text-yellow-400" />
              </div>
            </div>
            <h4 className="text-white text-[19px] font-bold mb-2 relative z-10">Core Services</h4>
            <p className="text-gray-400 text-[13px] leading-relaxed max-w-[85%] relative z-10">Discover how we architect digital products and automate workflows.</p>
          </SpotlightCard>
          
          {/* Technologies Panel */}
          <div className="h-[220px] bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col relative overflow-hidden">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4 ml-2 shrink-0">Technologies We Use</h4>
            
            {/* Scrollable area */}
            <div className="overflow-y-auto pr-2 -mr-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <div className="grid grid-cols-3 gap-y-4 gap-x-2 pb-2">
                {[
                  { name: 'Next.js', icon: <span className="font-serif italic text-lg font-bold">N</span>, color: 'bg-black text-white' },
                  { name: 'React', icon: <svg className="w-5 h-5" viewBox="-11.5 -10.23174 23 20.46348"><circle cx="0" cy="0" r="2.05" fill="currentColor"/><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>, color: 'bg-[#eff6ff] text-[#3b82f6]' },
                  { name: 'TypeScript', icon: <span className="font-bold text-[13px] tracking-tight">TS</span>, color: 'bg-[#2563eb] text-white' },
                  { name: 'Tailwind', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C7.666,17.818,9.027,19.2,12.001,19.2c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/></svg>, color: 'bg-[#f0fdfa] text-[#0d9488]' },
                  { name: 'Node.js', icon: <span className="font-bold text-[13px] tracking-tighter">JS</span>, color: 'bg-[#f0fdf4] text-[#16a34a]' },
                  { name: 'Python', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.43-.44.5-.33.56-.24.64-.18.7-.13.77-.08h2.96c.66 0 .9-.25.9-.9v-1.9H7.66l-.63-.05-.55-.13-.46-.21-.38-.26-.31-.3-.25-.33-.19-.35-.14-.35-.1-.33-.07-.3-.04-.26-.02-.21V1.16l.03-.21.08-.26.12-.3.17-.32.22-.33.27-.32.32-.3.38-.27.43-.22.5-.16.57-.1.65-.05h4.63l.63.05.55.13.46.21.38.26.31.3.25.33.19.35.14.35.1.33.07.3.04.26.02.21zm-4.7 1.76c-.3 0-.54.08-.73.26-.19.18-.28.41-.28.7 0 .28.09.52.28.7.19.18.43.27.73.27.29 0 .54-.09.73.27.19-.18.28-.42.28-.7 0-.29-.09-.52-.28-.7a1.05 1.05 0 0 0-.73-.26zm9.95 9.07l.21.03.28.07.32.12.35.18.36.26.36.36.35.46.32.59.28.73.21.88.14 1.05.05 1.23-.06 1.22-.16 1.04-.24.87-.32.71-.36.57-.43.44-.5.33-.56.24-.64.18-.7.13-.77.08h-2.96c-.66 0-.9.25-.9.9v1.9h2.34l.63.05.55.13.46.21.38.26.31.3.25.33.19.35.14.35.1.33.07.3.04.26.02.21v3.2l-.03.21-.08.26-.12.3-.17.32-.22.33-.27.32-.32.3-.38.27-.43.22-.5.16-.57.1-.65.05H9.75l-.9-.2-.73-.26-.59-.3-.45-.32-.34-.34-.25-.34-.16-.33-.1-.3-.04-.26-.02-.2.01-.13V15.5l.05-.63.13-.55.21-.46.26-.38.3-.31.33-.25.35-.19.35-.14.33-.1.3-.07.26-.04.21-.02h4.52l.69-.05.59-.14.5-.22.41-.27.33-.32.27-.35.2-.36.15-.37.1-.35.07-.32.04-.27.02-.21v-3.06h2.24zm-4.47 9.4c.3 0 .54-.08.73-.26.19-.18.28-.41.28-.7 0-.28-.09-.52-.28-.7-.19-.18-.43-.27-.73-.27-.29 0-.54.09-.73.27-.19.18-.28.42-.28.7 0 .29.09.52.28.7.19.18.43.26.73.26z"/></svg>, color: 'bg-[#fefce8] text-[#ca8a04]' },
                  { name: 'PostgreSQL', icon: <div className="w-4 h-4 rounded-full border-2 border-indigo-600 flex items-center justify-center"><div className="w-1.5 h-1.5 bg-indigo-600 rounded-sm"></div></div>, color: 'bg-[#eef2ff] text-[#4f46e5]' },
                  { name: 'Supabase', icon: <div className="w-4 h-4 rounded-full border-2 border-emerald-500 bg-emerald-500/20"></div>, color: 'bg-[#ecfdf5] text-[#10b981]' },
                  { name: 'AWS', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 14c2.5 2.5 7.5 2.5 11 0"/></svg>, color: 'bg-[#fff7ed] text-[#f97316]' },
                  { name: 'Docker', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13.983 11.233h2.115v2.102h-2.115v-2.102zM10.963 11.233h2.113v2.102h-2.113v-2.102zM7.945 11.233h2.113v2.102h-2.113v-2.102zM10.963 8.21h2.113v2.103h-2.113v-2.103zM7.945 8.21h2.113v2.103h-2.113v-2.103zM4.925 8.21h2.113v2.103h-2.113v-2.103zM7.945 5.187h2.113v2.103h-2.113v-2.103zM21.94 11.164c-.183-.695-.733-2.146-2.124-2.589-.136-.532-.475-1.545-1.523-2.31l-.22-.162v4.887h-1.047l-.004-9h-2.138v9h-11.96c-.347 2.193.305 4.394 1.706 6.012 1.488 1.724 3.738 2.68 6.064 2.68 5.766 0 10.428-4.225 11.085-9.845.025-.228.16-.677.16-1.025z"/></svg>, color: 'bg-[#eff6ff] text-[#2496ed]' },
                  { name: 'Redis', icon: <span className="font-bold text-[13px] tracking-tight text-[#dc2626]">RE</span>, color: 'bg-red-50 text-red-600' },
                  { name: 'Prisma', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2l9 20-9-4-9 4z" /></svg>, color: 'bg-[#f4f4f5] text-[#18181b]' },
                  { name: 'Figma', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 7a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm0 5a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm4 5a4 4 0 1 1-4 4v-4zm-4-5a4 4 0 1 1 4 4h-4v-4z" /></svg>, color: 'bg-[#fce7f3] text-[#db2777]' },
                ].map((tech) => (
                  <div key={tech.name} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors cursor-default border border-transparent hover:border-gray-100 group">
                    <div className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:drop-shadow-[0_4px_8px_rgba(0,0,0,0.12)] ${tech.color}`}>
                      {tech.icon}
                    </div>
                    <span className="text-[12px] font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Fade out effect at the bottom for scroll cue */}
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-[24px]"></div>
          </div>
        </div>

        {/* Bottom Trust Banner */}
        <div className="w-full bg-white rounded-[20px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-gray-100 mt-auto flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 justify-center px-4">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-orange-500" />
            </div>
            <div>
              <h5 className="text-[13px] font-bold text-gray-900">On-time delivery</h5>
              <p className="text-[12px] text-gray-500">We respect your time</p>
            </div>
          </div>
          
          <div className="w-px h-10 bg-gray-100"></div>
          
          <div className="flex items-center gap-4 flex-1 justify-center px-4">
            <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <h5 className="text-[13px] font-bold text-gray-900">Transparent process</h5>
              <p className="text-[12px] text-gray-500">You're always in the loop</p>
            </div>
          </div>
          
          <div className="w-px h-10 bg-gray-100"></div>

          <div className="flex items-center gap-4 flex-1 justify-center px-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <Headset className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <h5 className="text-[13px] font-bold text-gray-900">Dedicated support</h5>
              <p className="text-[12px] text-gray-500">We've got your back</p>
            </div>
          </div>
          
          <div className="w-px h-10 bg-gray-100"></div>

          <div className="flex items-center gap-4 flex-1 justify-center px-4">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <h5 className="text-[13px] font-bold text-gray-900">Secure & reliable</h5>
              <p className="text-[12px] text-gray-500">Built with best practices</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  const userProfileWidget = (
    <div className="mt-4 flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/10 group">
       <div className="flex items-center gap-3">
         <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
           <div className="absolute inset-0 rounded-full border-[2.2px] border-transparent border-t-[#facc15] border-b-[#facc15] rotate-45" />
           <div className="w-[82%] h-[82%] rounded-full bg-[#111] flex items-center justify-center text-[#facc15] font-bold text-[10px] tracking-wider">
             PN
           </div>
         </div>
         <div className="flex flex-col">
           <span className="text-[13px] font-semibold text-white/90 group-hover:text-white transition-colors">Phantom Node</span>
           <span className="text-[10px] text-white/40">Studio Account</span>
         </div>
       </div>
       <ChevronDown className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
    </div>
  );

  return (
    <NativeAppShell 
      appId={windowInstance.instanceId}
      sidebar={sidebar}
      content={content}
      onLogoClick={() => setTab('overview')}
      bottomWidget={userProfileWidget}
    />
  );
}
