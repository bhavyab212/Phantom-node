import React, { useState } from 'react';
import { WindowInstance, useWindowStore } from '../../window-manager/useWindowStore';
import { ArrowRight, CheckCircle2, Clock, Banknote, Target, Code2, ListOrdered, HelpCircle } from 'lucide-react';
import { SERVICES, Service } from './services-data';
import { ServiceMark } from './components/ServiceMark';

interface ServicesAppProps {
  window: WindowInstance;
}

export default function ServicesApp({ window: windowInstance }: ServicesAppProps) {
  const { openApp } = useWindowStore();
  const [activeServiceId, setActiveServiceId] = useState<string | null>(windowInstance?.targetContext?.serviceId || null);

  const activeService = SERVICES.find(s => s.id === activeServiceId) || null;

  return (
    <div className="flex flex-col h-full w-full bg-[#FAFAFA] overflow-y-auto custom-scrollbar">
      {activeService ? (
        <div className="p-8 lg:p-12 max-w-5xl mx-auto w-full pt-8 pb-32">
          <button onClick={() => setActiveServiceId(null)} className="text-gray-500 hover:text-gray-900 text-[13px] font-bold tracking-wide mb-10 transition-colors flex items-center gap-2 group">
            <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> BACK TO ALL SERVICES
          </button>
          
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center mb-6">
            <ServiceMark type={activeService.logoType} size="lg" className="shadow-md" />
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-2">{activeService.title}</h1>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">{activeService.oneLine}</p>
            </div>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-2xl p-8 mb-12 shadow-[0_8px_30px_rgba(0,0,0,0.03)] mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" /> Overview
            </h3>
            <p className="text-gray-600 leading-relaxed text-[16px]">{activeService.description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Deliverables */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  What You Get
                </h3>
                <ul className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  {activeService.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                      <span className="text-gray-700 leading-relaxed text-[14px] font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                  <ListOrdered className="w-5 h-5 text-yellow-500" />
                  Our Process
                </h3>
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                  {activeService.process.map((step, i) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-gray-100 group-hover:bg-yellow-400 group-hover:text-white text-gray-500 font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors z-10">
                        {i + 1}
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-2xl border border-gray-100 shadow-sm group-hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-gray-900 mb-1">{step.title}</h4>
                        <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                  <HelpCircle className="w-5 h-5 text-purple-500" />
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {activeService.faq.map((q, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <h4 className="font-bold text-gray-900 mb-2">{q.question}</h4>
                      <p className="text-gray-600 text-[14px] leading-relaxed">{q.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6 lg:sticky lg:top-8 self-start">
              {/* Investment & Timeline */}
              <div className="bg-[#111111] text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl"></div>
                <div className="space-y-8 relative z-10">
                  <div>
                    <div className="flex items-center gap-3 text-gray-400 mb-2">
                      <Banknote className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">Investment</span>
                    </div>
                    <div className="text-2xl font-bold">{activeService.priceLabel}</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3 text-gray-400 mb-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">Timeline</span>
                    </div>
                    <div className="text-xl font-bold">{activeService.timelineEstimate}</div>
                  </div>

                  <button 
                    onClick={() => openApp('contact', 'Contact', {}, { sourceType: 'service', sourceId: activeService.id, sourceTitle: activeService.title })}
                    className="w-full bg-yellow-400 text-black px-6 py-4 rounded-xl font-bold hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex justify-center items-center gap-2"
                  >
                    Request this service <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-gray-400" />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeService.techStack.map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-[13px] font-semibold text-gray-600">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 lg:p-12 max-w-6xl mx-auto w-full pt-8 pb-32">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">Our Capabilities</h1>
          <p className="text-gray-500 text-[16px] font-medium mb-12 max-w-2xl leading-relaxed">Premium digital solutions focused on business growth, operational efficiency, and cutting-edge technology.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <button 
                key={service.id}
                onClick={() => setActiveServiceId(service.id)} 
                className="group flex flex-col text-left bg-white border border-gray-100 rounded-[24px] hover:-translate-y-4 hover:scale-[1.05] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] hover:z-20 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.04)] magic-card min-h-[320px]"
              >
                <div className="flex flex-col relative z-10 bg-white rounded-[inherit] overflow-hidden w-full h-full p-8">
                  <div className="flex justify-between items-start mb-6">
                    <ServiceMark type={service.logoType} size="md" />
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-yellow-400 transition-colors">
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-yellow-500 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-500 text-[14px] leading-relaxed mb-8 flex-1 line-clamp-3">{service.oneLine}</p>
                  
                  <div className="flex flex-col gap-3 pt-6 border-t border-gray-100 w-full text-xs font-semibold">
                    <span className="text-gray-500 flex items-center gap-2">
                      <Banknote className="w-3.5 h-3.5 text-gray-300" /> {service.priceLabel}
                    </span>
                    <span className="text-gray-500 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-gray-300" /> {service.timelineEstimate}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
