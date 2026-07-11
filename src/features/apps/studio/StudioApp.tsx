import React, { useState, useEffect } from 'react';
import { WindowInstance, useWindowStore } from '../../window-manager/useWindowStore';
import { NativeAppShell, SidebarGroup, SidebarItem } from '../../ui/NativeAppShell';
import { LayoutGrid, Activity, Layers, Briefcase, GitMerge, Mail, ArrowRight, CheckCircle2, Users, Star } from 'lucide-react';

import WorkApp from '../work/WorkApp';
import ServicesApp from '../services/ServicesApp';
import { ProcessApp } from '../process/ProcessApp';
import { ContactApp } from '../contact/ContactApp';
import AboutApp from '../about/AboutApp';

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

  const setTab = (tabId: string) => {
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
         <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAFA] via-[#FAFAFA]/90 to-transparent"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 p-12 max-w-6xl mx-auto h-full flex flex-col pt-8">
        <div className="mb-14 max-w-2xl relative flex items-start">
          <div className="flex-1">
            <p className="text-gray-500 text-[15px] mb-2 font-medium tracking-wide">Welcome to</p>
            <h1 className="text-6xl font-extrabold tracking-tight text-gray-900 mb-4 leading-tight">
              Phantom Node <br/>
              <span className="text-yellow-400 drop-shadow-sm">Studio</span>
            </h1>
            <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-sm">
              Engineering premium digital systems that remove manual work and help ambitious teams move faster.
            </p>
          </div>
          
          {/* Circular Graphic */}
          <div 
            className="absolute right-0 top-0 w-64 h-64 flex items-center justify-center -mr-16 -mt-8 opacity-100 cursor-default"
            onMouseEnter={() => setIsDialHovered(true)}
            onMouseLeave={() => setIsDialHovered(false)}
          >
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              {/* Base thin circle */}
              <circle 
                cx="50" cy="50" r="48" 
                fill={isDialHovered ? "#111111" : "transparent"} 
                stroke="rgba(0,0,0,0.08)" 
                strokeWidth={isDialHovered ? "3" : "1"} 
                className="transition-all duration-700 ease-in-out"
              />
              {/* Yellow arc (top-left quadrant) */}
              <circle 
                cx="50" cy="50" r="48" 
                fill="none" 
                stroke="#facc15" 
                strokeWidth={isDialHovered ? "3" : "1"} 
                strokeDasharray={isDialHovered ? "302 0" : "75 227"} 
                className="transition-all duration-700 ease-in-out"
                transform="rotate(180 50 50)"
              />
            </svg>
            <div className="relative z-10 text-[13px] font-medium tracking-[0.15em] flex flex-col items-center gap-4 mt-1">
              <div className={`relative transition-colors duration-500 ${isDialHovered ? 'delay-500 text-white' : 'delay-0 text-gray-800'}`}>
                <span className={`absolute -left-6 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full transition-all duration-1000 bg-yellow-400 ${isDialHovered ? 'delay-500 opacity-100 scale-100' : 'delay-0 opacity-0 scale-50'}`}></span>
                BUILD
              </div>
              <div className={`relative transition-colors duration-500 ${isDialHovered ? 'delay-[1000ms] text-white' : 'delay-0 text-gray-800'}`}>
                <span className={`absolute -left-6 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full transition-all duration-1000 bg-yellow-400 ${isDialHovered ? 'delay-[1000ms] opacity-100 scale-100' : 'delay-0 opacity-0 scale-50'}`}></span>
                AUTOMATE
              </div>
              <div className={`relative transition-colors duration-500 ${isDialHovered ? 'delay-[1500ms] text-white' : 'delay-0 text-gray-800'}`}>
                <span className={`absolute -left-6 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full transition-all duration-1000 bg-yellow-400 ${isDialHovered ? 'delay-[1500ms] opacity-100 scale-100' : 'delay-0 opacity-0 scale-50'}`}></span>
                SCALE
              </div>
            </div>
          </div>
        </div>
        
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full">
          <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 relative group transition-transform hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-gray-900" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Projects Delivered</span>
            </div>
            <div className="text-[44px] font-black text-gray-900 leading-none mb-4">24</div>
            <div className="flex items-center justify-between">
               <span className="text-xs font-semibold text-gray-400">+12% from last month</span>
               <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="currentColor" strokeWidth="2" className="text-yellow-400">
                 <path d="M0 15 Q 10 15, 15 10 T 25 12 T 40 5" />
               </svg>
            </div>
          </div>
          
          <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 relative group transition-transform hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-sm">
                <Users className="w-5 h-5 text-gray-900" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Active Clients</span>
            </div>
            <div className="text-[44px] font-black text-gray-900 leading-none mb-4">8</div>
            <div className="flex items-center justify-between">
               <span className="text-xs font-semibold text-gray-400"><span className="text-emerald-500">+2</span> new this month</span>
               <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="currentColor" strokeWidth="2" className="text-yellow-400">
                 <path d="M0 18 Q 15 15, 20 10 T 30 8 T 40 2" />
               </svg>
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 relative group transition-transform hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-sm">
                <Activity className="w-5 h-5 text-gray-900" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">System Uptime</span>
            </div>
            <div className="text-[44px] font-black text-gray-900 leading-none mb-4">99.9%</div>
            <div className="flex items-center justify-between">
               <span className="text-xs font-semibold text-gray-400">Excellent performance</span>
               <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="currentColor" strokeWidth="2" className="text-yellow-400">
                 <path d="M0 10 Q 5 10, 10 2 T 15 15 T 25 10 T 35 12 T 40 8" />
               </svg>
            </div>
          </div>
        </div>

        {/* Quick Launch Apps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl mt-auto pb-8">
          <button onClick={() => setTab('work')} className="group flex flex-col items-start text-left bg-[#111111] p-8 rounded-[24px] hover:bg-black transition-all shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-yellow-500 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="absolute right-8 bottom-8 w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
               <ArrowRight className="w-5 h-5 text-black" />
            </div>
            
            <div className="w-16 h-16 rounded-full bg-[#1A1A1A] border-[1.5px] border-yellow-500/30 flex items-center justify-center mb-6 shadow-inner relative z-10">
              <div className="w-12 h-12 rounded-full border border-yellow-500/20 flex items-center justify-center">
                 <Layers className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <h4 className="text-white text-xl font-bold mb-3 relative z-10">Explore Our Work</h4>
            <p className="text-gray-400 text-sm leading-relaxed max-w-[80%] relative z-10">View selected case studies and recent engineering achievements.</p>
          </button>

          <button onClick={() => setTab('services')} className="group flex flex-col items-start text-left bg-[#111111] p-8 rounded-[24px] hover:bg-black transition-all shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-yellow-500 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="absolute right-8 bottom-8 w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
               <ArrowRight className="w-5 h-5 text-black" />
            </div>
            
            <div className="w-16 h-16 rounded-full bg-[#1A1A1A] border-[1.5px] border-yellow-500/30 flex items-center justify-center mb-6 shadow-inner relative z-10">
              <div className="w-12 h-12 rounded-full border border-yellow-500/20 flex items-center justify-center">
                 <Briefcase className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <h4 className="text-white text-xl font-bold mb-3 relative z-10">Core Services</h4>
            <p className="text-gray-400 text-sm leading-relaxed max-w-[80%] relative z-10">Discover how we architect digital products and automate workflows.</p>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <NativeAppShell 
      appId={windowInstance.instanceId}
      sidebar={sidebar}
      content={content}
      onLogoClick={() => setTab('overview')}
    />
  );
}
