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
  const [activeServiceId, setActiveServiceId] = useState<string | null>(windowInstance?.targetContext?.serviceId || null);

  const activeService = SERVICES.find(s => s.id === activeServiceId) || null;

  return (
    <div className="flex flex-col h-full w-full bg-[#FAFAFA]">
      {activeService ? (
        <div className="p-12 max-w-4xl mx-auto w-full pt-8">
          <button onClick={() => setActiveServiceId(null)} className="text-gray-500 hover:text-gray-900 text-[13px] font-bold tracking-wide mb-10 transition-colors flex items-center gap-2">
            &larr; BACK TO ALL SERVICES
          </button>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">{activeService.title}</h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">{activeService.oneLine}</p>
          
          <div className="bg-white border border-gray-100 rounded-2xl p-8 mb-12 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Overview</h3>
            <p className="text-gray-600 leading-relaxed text-[15px]">{activeService.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-yellow-500" />
                Deliverables
              </h3>
              <ul className="space-y-4">
                {activeService.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
                    <span className="text-gray-600 leading-relaxed text-[15px]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-3 text-gray-400 mb-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span className="text-xs font-bold uppercase tracking-widest">Investment</span>
                </div>
                <div className="text-xl font-bold text-gray-900">{activeService.priceLabel}</div>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-3 text-gray-400 mb-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-xs font-bold uppercase tracking-widest">Timeline</span>
                </div>
                <div className="text-xl font-bold text-gray-900">{activeService.timelineEstimate}</div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-10 border-t border-gray-100">
            <button 
              onClick={() => openApp('contact', 'Contact', {}, { initialIntent: activeService.id })}
              className="bg-[#111111] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Request this service
            </button>
          </div>
        </div>
      ) : (
        <div className="p-12 max-w-5xl mx-auto w-full pt-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">Our Capabilities</h1>
          <p className="text-gray-500 text-[15px] font-medium mb-12">Premium digital solutions focused on business growth and operational efficiency.</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <button 
                key={service.id}
                onClick={() => setActiveServiceId(service.id)} 
                className="group flex flex-col text-left bg-white border border-gray-100 rounded-[20px] p-8 hover:-translate-y-1 transition-all shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow-500 transition-colors">
                    {service.title}
                  </h3>
                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-gray-500 text-[15px] leading-relaxed mb-8 flex-1">{service.oneLine}</p>
                <div className="flex gap-6 pt-6 border-t border-gray-100 w-full text-sm font-semibold">
                  <span className="text-gray-400 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-300" /> {service.priceLabel}
                  </span>
                  <span className="text-gray-400 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-300" /> {service.timelineEstimate}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
