import React, { useState } from 'react';
import { WindowInstance } from '../../window-manager/useWindowStore';
import { Workflow, CheckCircle2, ArrowRight } from 'lucide-react';
import { AUTOMATION_PROJECTS, AutomationEntry } from './automation-data';
import { AutomationMark } from './components/AutomationMark';
import { AutomationDetail } from './components/AutomationDetail';

// Manual source folder for verified automation assets. Do not display or
// import files automatically without an approved integration.
export const AUTOMATIONS_DRIVE_FOLDER_URL = "D:\\Projects\\Phantom Node\\Ai_automation_workflows-20260711T170723Z-2-001";

interface AutomationsAppProps {
  window: WindowInstance;
}

export default function AutomationsApp({ window: windowInstance }: AutomationsAppProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedAutomation, setSelectedAutomation] = useState<AutomationEntry | null>(null);

  const publishedEntries = AUTOMATION_PROJECTS.filter(e => e.isPublished);
  
  const displayedEntries = activeCategory === 'All' 
    ? publishedEntries 
    : publishedEntries.filter(e => e.category.includes(activeCategory) || e.tags.includes(activeCategory));

  if (selectedAutomation) {
    return (
      <AutomationDetail 
        automation={selectedAutomation}
        onBack={() => setSelectedAutomation(null)}
        windowInstance={windowInstance}
      />
    );
  }

  const categories = ['All', 'Sales & CRM', 'Lead Generation', 'Support', 'Content', 'AI Systems', 'Research', 'Operations'];

  return (
    <div className="h-full w-full relative bg-[#FAFAFA] overflow-auto flex flex-col">
      {/* Header Zone */}
      <div className="relative px-12 pt-10 pb-8 bg-[#FAFAFA] shrink-0">
        <div className="max-w-4xl">
          {/* Eyebrow label */}
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
            AUTOMATION LIBRARY
          </div>
          {/* Title */}
          <div className="flex items-baseline gap-4 mb-4">
            <h1 className="text-[40px] font-black text-gray-900 leading-[1.1] tracking-tight">
              Automations
            </h1>
            {publishedEntries.length > 0 && (
              <span className="text-[14px] font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                {publishedEntries.length} workflow systems
              </span>
            )}
          </div>
          {/* Supporting text */}
          <p className="text-[16px] text-gray-500 font-medium leading-relaxed max-w-2xl mb-8">
            Selected workflow systems designed to remove repetitive work, connect tools, and keep operations moving.
          </p>

          {/* Filter row */}
          {publishedEntries.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all ${
                    activeCategory === cat 
                      ? 'bg-[#111111] text-white shadow-md' 
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-12">
        {publishedEntries.length === 0 ? (
          <div className="flex flex-col items-center text-center max-w-md">
            <div className="w-20 h-20 bg-white border border-gray-100 rounded-full flex items-center justify-center mb-8 shadow-sm">
              <div className="w-14 h-14 bg-[#FAFAFA] rounded-full flex items-center justify-center relative">
                <Workflow className="w-7 h-7 text-gray-400" strokeWidth={1.5} />
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-yellow-400 rounded-full border-2 border-[#FAFAFA]"></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Automation library in progress</h2>
            <p className="text-[16px] text-gray-500 mb-6 leading-relaxed">
              Selected workflow examples and system walkthroughs will appear here.
            </p>
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-full border border-yellow-100/50">
              <CheckCircle2 className="w-4 h-4 text-yellow-600" />
              <span className="text-[12px] font-semibold text-yellow-700 tracking-wide">
                This space is reserved for real automation work only.
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-6xl mx-auto space-y-6">
            {/* Featured Card */}
            {displayedEntries.length > 0 && (
              <button 
                onClick={() => setSelectedAutomation(displayedEntries[0])}
                className="w-full text-left group bg-white border border-gray-100 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-[1.04] hover:-translate-y-3 hover:z-20 magic-card"
              >
                {/* Wrap the content in a relative z-10 element to sit above the magic glow, with inherit border-radius to prevent visual leakage */}
                <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10 bg-white rounded-[inherit] overflow-hidden w-full h-full">
                  <div className="bg-[#1A1A1A] p-8 lg:p-12 flex items-center justify-center relative overflow-hidden aspect-video lg:aspect-auto min-h-[300px]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/5 to-transparent pointer-events-none"></div>
                    <img 
                      src={displayedEntries[0].workflowImage} 
                      alt={`Workflow for ${displayedEntries[0].title}`}
                      className="w-full h-full object-contain filter drop-shadow-2xl relative z-10"
                    />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <AutomationMark type={displayedEntries[0].logoType} size="lg" className="mb-6" />
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                      {displayedEntries[0].category}
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors">
                      {displayedEntries[0].title}
                    </h2>
                    <p className="text-gray-600 text-[16px] leading-relaxed mb-6">
                      {displayedEntries[0].explainer}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {displayedEntries[0].tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-[12px] font-semibold text-gray-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-[14px] font-bold text-[#111111] mt-auto">
                      View workflow <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:text-yellow-500 transition-all" />
                    </div>
                  </div>
                </div>
              </button>
            )}

            {/* Grid for remaining entries */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedEntries.slice(1).map(entry => (
                <button 
                  key={entry.id}
                  onClick={() => setSelectedAutomation(entry)}
                  className="w-full text-left group bg-white border border-gray-100 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-[1.05] hover:-translate-y-4 hover:z-20 flex flex-col magic-card"
                >
                  <div className="flex flex-col relative z-10 bg-white rounded-[inherit] overflow-hidden w-full h-full">
                    <div className="bg-[#1A1A1A] p-6 aspect-video flex items-center justify-center relative overflow-hidden">
                    <img 
                      src={entry.workflowImage} 
                      alt={`Workflow for ${entry.title}`}
                      className="w-full h-full object-contain filter drop-shadow-xl"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <AutomationMark type={entry.logoType} size="sm" />
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {entry.category}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors leading-tight">
                      {entry.title}
                    </h3>
                    <p className="text-gray-500 text-[14px] leading-relaxed mb-6 line-clamp-2">
                      {entry.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {entry.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-gray-50 border border-gray-100 rounded-md text-[11px] font-semibold text-gray-500">
                          {tag}
                        </span>
                      ))}
                      {entry.tags.length > 2 && (
                        <span className="px-2 py-0.5 bg-gray-50 border border-gray-100 rounded-md text-[11px] font-semibold text-gray-400">
                          +{entry.tags.length - 2}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[13px] font-bold text-gray-400 group-hover:text-[#111111] mt-auto transition-colors">
                      View workflow <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:text-yellow-500 transition-transform" />
                    </div>
                  </div>
                  </div>
                </button>
              ))}
            </div>

            {displayedEntries.length === 0 && (
              <div className="text-center py-20 text-gray-500 font-medium">
                No workflows found for the selected category.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
