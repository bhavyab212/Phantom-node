import React, { useState } from 'react';
import { WindowInstance, useWindowStore } from '../../window-manager/useWindowStore';
import { NativeAppShell, SidebarGroup, SidebarItem } from '../../ui/NativeAppShell';
import { Briefcase, ArrowRight, CheckCircle2, Clock, DollarSign, Target } from 'lucide-react';
import { SERVICES, Service } from './services-data';

interface ServicesAppProps {
  window: WindowInstance;
}

export default function ServicesApp({ window: windowInstance }: ServicesAppProps) {
  const { openApp } = useWindowStore();
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);

  const activeService = SERVICES.find(s => s.id === activeServiceId) || null;

  const sidebar = (
    <div className="py-2">
      <SidebarGroup title="Capabilities">
        <SidebarItem 
          icon={Briefcase} 
          label="All Services" 
          isActive={!activeServiceId} 
          onClick={() => setActiveServiceId(null)} 
        />
      </SidebarGroup>
      
      <SidebarGroup title="Core Offerings">
        {SERVICES.map((service) => (
          <SidebarItem 
            key={service.id}
            icon={Target} 
            label={service.title} 
            isActive={activeServiceId === service.id} 
            onClick={() => setActiveServiceId(service.id)} 
          />
        ))}
      </SidebarGroup>
    </div>
  );

  const toolbar = (
    <div className="flex items-center gap-2 text-sm font-medium">
      <span className="text-white/40">Services</span>
      <span className="text-white/40">/</span>
      <span className="text-white/90">
        {activeService ? activeService.title : 'All Services'}
      </span>
    </div>
  );

  const content = (
    <div className="flex flex-col h-full w-full">
      {activeService ? (
        <div className="p-8 max-w-4xl mx-auto w-full">
          <button onClick={() => setActiveServiceId(null)} className="text-blue-400 hover:text-blue-300 text-sm font-medium mb-8 transition-colors flex items-center gap-2">
            &larr; Back to all services
          </button>
          
          <h1 className="text-4xl font-semibold tracking-tight text-white mb-4">{activeService.title}</h1>
          <p className="text-xl text-white/70 mb-10 leading-relaxed">{activeService.oneLine}</p>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-10">
            <h3 className="text-lg font-medium text-white mb-4">Overview</h3>
            <p className="text-white/60 leading-relaxed">{activeService.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Deliverables
              </h3>
              <ul className="space-y-4">
                {activeService.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/50 mt-2 flex-shrink-0" />
                    <span className="text-white/70 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 text-white/50 mb-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-medium uppercase tracking-wider">Investment</span>
                </div>
                <div className="text-xl font-medium text-white">{activeService.priceLabel}</div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 text-white/50 mb-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-medium uppercase tracking-wider">Timeline</span>
                </div>
                <div className="text-xl font-medium text-white">{activeService.timelineEstimate}</div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-8 border-t border-white/10">
            <button 
              onClick={() => openApp('contact', 'Contact', {}, { initialIntent: activeService.id })}
              className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors"
            >
              Request this service
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8 max-w-5xl mx-auto w-full">
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Our Capabilities</h1>
          <p className="text-white/50 text-sm mb-10">Premium digital solutions focused on business growth and operational efficiency.</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {SERVICES.map((service) => (
              <button 
                key={service.id}
                onClick={() => setActiveServiceId(service.id)} 
                className="group flex flex-col text-left bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-medium text-white group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-white/60 mb-6 flex-1">{service.oneLine}</p>
                <div className="flex gap-4 pt-4 border-t border-white/10 w-full text-sm">
                  <span className="text-white/40 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" /> {service.priceLabel}
                  </span>
                  <span className="text-white/40 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {service.timelineEstimate}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <NativeAppShell 
      appId={windowInstance.instanceId}
      sidebar={sidebar}
      toolbar={toolbar}
      content={content}
    />
  );
}
