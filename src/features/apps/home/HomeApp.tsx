import React, { useState } from 'react';
import { WindowInstance, useWindowStore } from '../../window-manager/useWindowStore';
import { NativeAppShell, SidebarGroup, SidebarItem } from '../../ui/NativeAppShell';
import { Layout, Layers, Briefcase, Map, Mail, Activity, ArrowUpRight, CheckCircle, Users } from 'lucide-react';

interface HomeAppProps {
  window: WindowInstance;
}

export default function HomeApp({ window }: HomeAppProps) {
  const { openApp } = useWindowStore();
  const [activeTab, setActiveTab] = useState('overview');

  const sidebar = (
    <div className="py-2">
      <SidebarGroup title="Studio Workspace">
        <SidebarItem 
          icon={Layout} 
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
      
      <SidebarGroup title="Agency Apps">
        <SidebarItem icon={Layers} label="Work" onClick={() => openApp('work', 'Work', {})} />
        <SidebarItem icon={Briefcase} label="Services" onClick={() => openApp('services', 'Services', {})} />
        <SidebarItem icon={Map} label="Process" onClick={() => openApp('process', 'Process', {})} />
      </SidebarGroup>

      <SidebarGroup title="System">
        <SidebarItem icon={Mail} label="Contact" onClick={() => openApp('contact', 'Contact', {})} />
      </SidebarGroup>
    </div>
  );

  const toolbar = (
    <div className="flex items-center gap-2 text-sm font-medium">
      <span className="text-white/40">Studio</span>
      <span className="text-white/40">/</span>
      <span className="text-white/90">Overview</span>
    </div>
  );

  const content = (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Welcome to Phantom Node</h1>
      <p className="text-white/50 text-sm mb-8">Engineering premium digital platforms that drive growth.</p>
      
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-3 text-white/50 mb-3">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium uppercase tracking-wider">Projects Delivered</span>
          </div>
          <div className="text-3xl font-semibold text-white">24</div>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-3 text-white/50 mb-3">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-medium uppercase tracking-wider">Active Clients</span>
          </div>
          <div className="text-3xl font-semibold text-white">8</div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-3 text-white/50 mb-3">
            <Activity className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-medium uppercase tracking-wider">System Uptime</span>
          </div>
          <div className="text-3xl font-semibold text-white">99.9%</div>
        </div>
      </div>

      {/* Quick Launch Apps */}
      <h3 className="text-sm font-semibold text-white/80 mb-4">Quick Launch</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button onClick={() => openApp('work', 'Work', {})} className="group flex flex-col items-start text-left bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-all">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Layers className="w-5 h-5 text-emerald-400" />
          </div>
          <h4 className="text-white font-medium mb-1 flex items-center gap-2">Explore Our Work <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></h4>
          <p className="text-white/50 text-sm">View selected case studies and recent engineering achievements.</p>
        </button>

        <button onClick={() => openApp('services', 'Services', {})} className="group flex flex-col items-start text-left bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-all">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Briefcase className="w-5 h-5 text-purple-400" />
          </div>
          <h4 className="text-white font-medium mb-1 flex items-center gap-2">Core Services <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></h4>
          <p className="text-white/50 text-sm">Discover how we architect digital products and automate workflows.</p>
        </button>
      </div>
    </div>
  );

  return (
    <NativeAppShell 
      appId={window.instanceId}
      sidebar={sidebar}
      toolbar={toolbar}
      content={content}
    />
  );
}
