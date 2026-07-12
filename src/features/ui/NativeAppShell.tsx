import React, { ReactNode } from 'react';
import { Search, Bell, Menu, ChevronDown, ChevronLeft } from 'lucide-react';
import { useWindowStore } from '../window-manager/useWindowStore';
import { StudioLogoIcon } from './StudioLogoIcon';

export interface NativeAppShellProps {
  sidebar?: ReactNode;
  toolbar?: ReactNode;
  content: ReactNode;
  appId?: string;
  onLogoClick?: () => void;
  onBackClick?: () => void;
  bottomWidget?: ReactNode;
}

export function NativeAppShell({ sidebar, toolbar, content, appId, onLogoClick, onBackClick, bottomWidget }: NativeAppShellProps) {
  const { windows } = useWindowStore();
  const isActive = !appId || windows[windows.length - 1]?.instanceId === appId;

  return (
    <div className="flex w-full h-full bg-[#111111] overflow-hidden pointer-events-auto selection:bg-yellow-500/30 font-sans" data-liquid-cursor>
      
      {/* Sidebar - Dark, topographic/sleek aesthetic */}
      {sidebar && (
        <div className={`w-[260px] flex-shrink-0 bg-[#161618] flex flex-col transition-opacity duration-300 z-30 relative ${isActive ? 'opacity-100' : 'opacity-70'} relative`}>
          {/* Subtle topographic background effect can be applied here if needed */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          {/* Mac Window Controls & Logo Section */}
          <div className="px-6 pt-5 pb-2 flex flex-col gap-6 shrink-0 relative z-10">
             {/* Window Controls or Back Button */}
             {onBackClick && (
               <div className="flex items-center h-12 mb-2">
                 <button onClick={onBackClick} className="native-back-button">
                   <ChevronLeft className="icon" />
                   <span className="text">Back</span>
                 </button>
               </div>
             )}

             {/* Logo */}
             <button onClick={onLogoClick} className={`flex items-center gap-3 text-left ${onLogoClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : 'cursor-default'}`}>
               <div className="w-12 h-12 rounded-xl bg-[#1C1C1F] border border-white/10 flex items-center justify-center shrink-0 shadow-lg relative overflow-hidden">
                  <StudioLogoIcon />
               </div>
               <div className="flex flex-col">
                 <span className="text-[15px] font-bold tracking-wide text-white leading-tight">PHANTOM NODE</span>
                 <span className="text-[11px] font-semibold tracking-widest text-yellow-500 uppercase mt-0.5">Studio</span>
               </div>
             </button>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 custom-scrollbar flex flex-col justify-between relative z-10">
            <div>{sidebar}</div>
            
            <div className="mt-8 flex flex-col gap-4">
              {/* System Status */}
              <div className="bg-[#1B1B1E] rounded-[16px] p-4 border border-white/5 flex flex-col shadow-lg">
                 <div className="flex items-center gap-3 mb-2">
                   <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center border border-white/5">
                      <div className="text-yellow-500">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                      </div>
                   </div>
                   <span className="text-[11px] font-medium text-white/50">System Status</span>
                   <div className="w-2 h-2 rounded-full bg-emerald-500 ml-auto shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                 </div>
                 <span className="text-[13px] font-semibold text-white/90 mt-1">All Systems Operational</span>
                 <span className="text-[10px] text-white/40 mt-1">Last updated 2 mins ago</span>
              </div>
              
              {/* Optional Bottom Widget (e.g., User Account) */}
              {bottomWidget}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area - Light Theme */}
      <div className={`flex-1 flex flex-col min-w-0 bg-[#FAFAFA] relative transition-opacity duration-300 ${sidebar ? 'rounded-tl-[24px] rounded-bl-[24px] border-l border-white/10 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-40' : ''} ${isActive ? 'opacity-100' : 'opacity-50'}`}>
        

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden light-scrollbar relative z-10">
          {content}
        </div>
      </div>
      
      {/* Global Native App Styles overrides */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
        
        .light-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .light-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .light-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.1); border-radius: 10px; }
        .light-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, 0.2); }

        /* Uiverse Proud Goat 69 Effect - Adapted for Back Button */
        .native-back-button {
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.15);
          font-family: inherit;
          letter-spacing: 1.5px;
          padding: 0 12px;
          text-align: center;
          width: 130px;
          height: 44px;
          font-size: 14px;
          text-transform: uppercase;
          font-weight: 600;
          border-radius: 8px;
          outline: none;
          user-select: none;
          cursor: pointer;
          transform: translateY(0px);
          position: relative;
          box-shadow:
            inset 0 30px 30px -15px rgba(255, 255, 255, 0.05),
            inset 0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 20px rgba(0, 0, 0, 0),
            0 3px 0 rgba(255, 255, 255, 0.15),
            0 3px 2px rgba(0, 0, 0, 0.2),
            0 5px 10px rgba(0, 0, 0, 0.3),
            0 10px 20px rgba(0, 0, 0, 0.3);
          background: #1C1C1F;
          color: white;
          text-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);
          transition: 150ms all ease-in-out;
        }

        .native-back-button .icon {
          margin-right: 8px;
          width: 20px;
          height: 20px;
          transition: all 0.5s ease-in-out;
        }

        .native-back-button:active {
          transform: translateY(3px);
          box-shadow:
            inset 0 16px 2px -15px rgba(0, 0, 0, 0),
            inset 0 0 0 1px rgba(255, 255, 255, 0.05),
            inset 0 1px 20px rgba(0, 0, 0, 0.1),
            0 0 0 rgba(255, 255, 255, 0.15),
            0 0 0 2px rgba(255, 255, 255, 0.1),
            0 0 0 rgba(0, 0, 0, 0),
            0 0 0 rgba(0, 0, 0, 0);
        }

        .native-back-button:hover .text {
          transform: translateX(80px);
        }
        
        .native-back-button:hover .icon {
          transform: translate(25px);
        }

        .native-back-button .text {
          transition: all 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}

// Reusable Native Sidebar Components
export function SidebarGroup({ title, children }: { title?: string, children: ReactNode }) {
  return (
    <div className="mb-6">
      {title && (
        <h4 className="px-3 text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-3">{title}</h4>
      )}
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}

export function SidebarItem({ icon: Icon, label, isActive, onClick, badge }: { icon: any, label: string, isActive?: boolean, onClick?: () => void, badge?: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-[14px] transition-all group ${
        isActive 
          ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-md' 
          : 'text-white/60 hover:bg-white/5 hover:text-white border border-transparent'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`flex items-center justify-center ${isActive ? 'text-black' : 'text-white/40 group-hover:text-white/70'} transition-colors`}>
          <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.5} />
        </div>
        <span className={isActive ? 'text-black font-semibold tracking-wide' : 'font-medium tracking-wide'}>{label}</span>
      </div>
      {badge && (
        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
          isActive 
            ? 'bg-black/10 text-black' 
            : 'bg-white/5 text-yellow-500/90 border border-yellow-500/20'
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}
