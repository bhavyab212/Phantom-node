import React, { useState } from 'react';
import { WindowInstance, useWindowStore } from '../../../window-manager/useWindowStore';
import { AutomationEntry } from '../automation-data';
import { AutomationMark } from './AutomationMark';
import { ArrowLeft, ZoomIn, ZoomOut, Maximize, MessageSquare } from 'lucide-react';

interface AutomationDetailProps {
  automation: AutomationEntry;
  onBack: () => void;
  windowInstance: WindowInstance;
}

export function AutomationDetail({ automation, onBack, windowInstance }: AutomationDetailProps) {
  const { openApp } = useWindowStore();
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  const handleReset = () => {
    setZoomLevel(1);
    setIsZoomed(false);
  };

  const handleDiscuss = () => {
    openApp('contact', 'Contact', {}, { initialIntent: `Automation: ${automation.title}` });
  };

  return (
    <div className="absolute inset-0 z-50 bg-white overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-white z-10">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-4">
            <AutomationMark type={automation.logoType} size="md" />
            <div>
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                {automation.category}
              </div>
              <h2 className="text-xl font-bold text-gray-900 leading-tight">
                {automation.title}
              </h2>
            </div>
          </div>
        </div>
        <button 
          onClick={handleDiscuss}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#111111] text-white rounded-xl text-sm font-bold hover:bg-black transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          Discuss a similar system
        </button>
      </div>

      {/* Main Content Split */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Explainer Panel */}
        <div className="w-[320px] lg:w-[380px] flex-shrink-0 bg-gray-50 border-r border-gray-100 p-8 overflow-y-auto flex flex-col">
          <div className="mb-8">
            <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-4">
              How this workflow is structured
            </h3>
            <p className="text-[15px] text-gray-700 leading-relaxed">
              {automation.explainer}
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Category</div>
              <div className="text-sm font-semibold text-gray-900">{automation.category}</div>
            </div>
            
            <div>
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Capabilities</div>
              <div className="flex flex-wrap gap-2">
                {automation.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-white border border-gray-200 rounded-md text-[12px] font-medium text-gray-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Status</div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-200 rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                <span className="text-[12px] font-semibold text-gray-700">Workflow concept</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Canvas */}
        <div className="flex-1 bg-[#1A1A1A] relative overflow-hidden flex flex-col">
          {/* Canvas Controls */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1 p-1 bg-black/50 backdrop-blur-md rounded-lg border border-white/10">
            <button onClick={handleZoomOut} className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-md transition-colors">
              <ZoomOut className="w-4 h-4" />
            </button>
            <div className="w-12 text-center text-[12px] font-medium text-white/70 font-mono">
              {Math.round(zoomLevel * 100)}%
            </div>
            <button onClick={handleZoomIn} className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-md transition-colors">
              <ZoomIn className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-white/10 mx-1"></div>
            <button onClick={handleReset} className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-md transition-colors">
              <Maximize className="w-4 h-4" />
            </button>
          </div>

          {/* Draggable/Zoomable Stage */}
          <div className="flex-1 overflow-auto flex items-center justify-center p-8">
            <div 
              className="relative transition-transform duration-200 ease-out flex items-center justify-center"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* Subtle dark backdrop for the image itself */}
              <div className="bg-[#111] p-4 rounded-[20px] shadow-2xl border border-white/5">
                <img 
                  src={automation.workflowImage} 
                  alt={`Workflow screenshot for ${automation.title}`}
                  className="max-w-none rounded-[12px] shadow-inner"
                  style={{ maxHeight: '80vh' }}
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
