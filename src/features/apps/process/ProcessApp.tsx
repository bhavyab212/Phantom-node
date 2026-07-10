import React, { useState } from 'react';
import { WindowInstance, useWindowStore } from '../../window-manager/useWindowStore';
import { NativeAppShell, SidebarGroup, SidebarItem } from '../../ui/NativeAppShell';
import { Map, CheckSquare, HelpCircle, ShieldCheck, MapPin } from 'lucide-react';
import { PROCESS_PHASES } from './process-data';
import { ProcessPhaseSection } from './components/ProcessPhaseSection';
import { ProcessPrinciples } from './components/ProcessPrinciples';
import { ProcessFAQ } from './components/ProcessFAQ';

interface ProcessAppProps {
  window: WindowInstance;
}

export default function ProcessApp({ window: windowInstance }: ProcessAppProps) {
  const [activeSection, setActiveSection] = useState<string>('timeline');

  const sidebar = (
    <div className="py-2">
      <SidebarGroup title="Methodology">
        <SidebarItem 
          icon={Map} 
          label="The Roadmap" 
          isActive={activeSection === 'timeline'} 
          onClick={() => setActiveSection('timeline')} 
        />
        <SidebarItem 
          icon={ShieldCheck} 
          label="Principles" 
          isActive={activeSection === 'principles'} 
          onClick={() => setActiveSection('principles')} 
        />
      </SidebarGroup>
      
      <SidebarGroup title="Phases">
        {PROCESS_PHASES.map((phase) => (
          <SidebarItem 
            key={phase.id}
            icon={CheckSquare} 
            label={phase.name.split(' & ')[0]} 
            isActive={activeSection === phase.id} 
            onClick={() => setActiveSection(phase.id)} 
          />
        ))}
      </SidebarGroup>

      <SidebarGroup title="Resources">
        <SidebarItem 
          icon={HelpCircle} 
          label="FAQ" 
          isActive={activeSection === 'faq'} 
          onClick={() => setActiveSection('faq')} 
        />
      </SidebarGroup>
    </div>
  );

  const toolbar = (
    <div className="flex items-center gap-2 text-sm font-medium">
      <span className="text-white/40">Process</span>
      <span className="text-white/40">/</span>
      <span className="text-white/90">
        {activeSection === 'timeline' && 'The Roadmap'}
        {activeSection === 'principles' && 'Principles'}
        {activeSection === 'faq' && 'FAQ'}
        {PROCESS_PHASES.find(p => p.id === activeSection)?.name}
      </span>
    </div>
  );

  const renderContent = () => {
    if (activeSection === 'timeline') {
      return (
        <div className="p-8 max-w-4xl mx-auto w-full">
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Our Methodology</h1>
          <p className="text-white/50 text-sm mb-12">How we take projects from concept to production.</p>
          
          <div className="space-y-6">
            {PROCESS_PHASES.map((phase, idx) => (
              <button 
                key={phase.id}
                onClick={() => setActiveSection(phase.id)}
                className="w-full group flex items-center bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors text-left"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mr-6 group-hover:scale-110 transition-transform flex-shrink-0">
                  <span className="text-blue-400 font-bold">0{idx + 1}</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1 group-hover:text-blue-400 transition-colors">{phase.name}</h3>
                  <p className="text-white/50 text-sm line-clamp-1">{phase.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }
    
    if (activeSection === 'principles') {
      return (
        <div className="w-full">
           <ProcessPrinciples />
        </div>
      );
    }
    
    if (activeSection === 'faq') {
      return (
        <div className="w-full">
           <ProcessFAQ />
        </div>
      );
    }
    
    const phase = PROCESS_PHASES.find(p => p.id === activeSection);
    if (phase) {
      return (
        <div className="w-full h-full p-8 max-w-4xl mx-auto">
          <button onClick={() => setActiveSection('timeline')} className="text-blue-400 hover:text-blue-300 text-sm font-medium mb-8 transition-colors flex items-center gap-2">
            &larr; Back to Timeline
          </button>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-8">
            <h2 className="text-3xl font-semibold text-white mb-4">{phase.name}</h2>
            <p className="text-white/60 text-lg leading-relaxed">{phase.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white/5 border border-white/10 rounded-xl p-6">
               <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Activities</h4>
               <ul className="space-y-3">
                 {phase.keyActivities.map((act, i) => (
                   <li key={i} className="flex items-start gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-400/50 mt-2" />
                     <span className="text-white/80">{act}</span>
                   </li>
                 ))}
               </ul>
             </div>
             
             <div className="bg-white/5 border border-white/10 rounded-xl p-6">
               <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Deliverables</h4>
               <ul className="space-y-3">
                 {phase.deliverables.map((del, i) => (
                   <li key={i} className="flex items-start gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/50 mt-2" />
                     <span className="text-white/80">{del}</span>
                   </li>
                 ))}
               </ul>
             </div>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <NativeAppShell 
      appId={windowInstance.instanceId}
      sidebar={sidebar}
      toolbar={toolbar}
      content={
        <div className="flex flex-col h-full w-full">
          {renderContent()}
        </div>
      }
    />
  );
}
