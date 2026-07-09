import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Monitor, Image as ImageIcon, LayoutGrid, Info } from 'lucide-react';
import { APP_REGISTRY } from '../../window-manager/window-registry';
import { useDesktopPreferences } from '../../system/useDesktopPreferences';
import { useSettingsStore } from '../../system/useSettingsStore';

const WALLPAPERS = [
  { id: 'default', name: 'Default Blue', css: 'bg-gradient-to-br from-blue-900 to-black' },
  { id: 'purple', name: 'Deep Purple', css: 'bg-gradient-to-br from-purple-900 to-black' },
  { id: 'green', name: 'Emerald', css: 'bg-gradient-to-br from-emerald-900 to-black' },
  { id: 'gray', name: 'Carbon', css: 'bg-[#121212]' },
];

const ACCENT_COLORS = [
  { id: 'blue', name: 'Windows Blue', hex: '#3b82f6' },
  { id: 'purple', name: 'Deep Purple', hex: '#a855f7' },
  { id: 'green', name: 'Emerald Green', hex: '#10b981' },
  { id: 'red', name: 'Crimson Red', hex: '#ef4444' },
  { id: 'orange', name: 'Sunset Orange', hex: '#f97316' },
];

export default function SettingsApp() {
  const { activeSettingsPage: activeTab, setActiveSettingsPage: setActiveTab } = useSettingsStore();
  const { 
    wallpaperId, 
    accentColor, 
    taskbarAutoHide, 
    setWallpaperId, 
    setAccentColor, 
    setTaskbarAutoHide 
  } = useDesktopPreferences();
  
  const [uptime, setUptime] = useState(0);

  // Uptime counter
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      setUptime(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const tabs = [
    { id: 'system', label: 'System', icon: Monitor },
    { id: 'personalization', label: 'Personalization', icon: ImageIcon },
    { id: 'apps', label: 'Apps', icon: LayoutGrid },
    { id: 'widgets', label: 'Desktop & Widgets', icon: LayoutGrid }, // Reuse icon for now
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <div className="flex w-full h-full bg-[#202020] text-white/90 font-sans select-none">
      {/* Sidebar */}
      <div className="w-64 bg-[#1E1E1E] border-r border-white/5 py-4 px-3 flex flex-col gap-1">
        <h2 className="text-xl font-semibold mb-4 px-3 flex items-center gap-2">
          <SettingsIcon size={20} className="text-white/70 animate-spin-slow" />
          Settings
        </h2>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left w-full"
              style={isActive ? { backgroundColor: 'var(--accent-color)', color: 'white' } : {}}
            >
              <Icon size={18} className={isActive ? 'text-white' : 'text-white/70'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
        {activeTab === 'system' && (
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h3 className="text-2xl font-semibold mb-6">System</h3>
            <div className="space-y-6">
              <div className="p-6 bg-white/5 border border-white/5 rounded-xl shadow-sm">
                <h4 className="text-lg font-medium mb-4">Device Specifications</h4>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                  <div className="text-white/50">Processor</div>
                  <div>Quantum Core i9-14900K @ 5.8 GHz</div>
                  
                  <div className="text-white/50">Installed RAM</div>
                  <div>32.0 GB (31.8 GB usable)</div>
                  
                  <div className="text-white/50">System type</div>
                  <div>64-bit operating system, Web-based processor</div>
                  
                  <div className="text-white/50">Storage</div>
                  <div>2 TB NVMe SSD</div>
                </div>
              </div>
              
              <div className="p-6 bg-white/5 border border-white/5 rounded-xl shadow-sm">
                <h4 className="text-lg font-medium mb-4">Session Status</h4>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                  <div className="text-white/50">Current Uptime</div>
                  <div className="font-mono" style={{ color: 'var(--accent-color)' }}>{formatUptime(uptime)}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'personalization' && (
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h3 className="text-2xl font-semibold mb-6">Personalization</h3>
            
            <div className="space-y-6">
              {/* Background Selection */}
              <div className="p-6 bg-white/5 border border-white/5 rounded-xl shadow-sm">
                <h4 className="text-lg font-medium mb-4">Background</h4>
                <div className="grid grid-cols-2 gap-4">
                  {WALLPAPERS.map(wp => {
                    const isSelected = wallpaperId === wp.id;
                    return (
                      <button
                        key={wp.id}
                        onClick={() => setWallpaperId(wp.id)}
                        className="flex flex-col items-center gap-2 group w-full"
                      >
                        <div 
                          className={`w-full h-24 rounded-lg shadow-inner border transition-all ${wp.css}`} 
                          style={isSelected ? { borderColor: 'var(--accent-color)', borderWidth: '2px' } : { borderColor: 'rgba(255,255,255,0.1)' }}
                        />
                        <span className="text-sm text-white/70 group-hover:text-white transition-colors">{wp.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Accent Color Selection */}
              <div className="p-6 bg-white/5 border border-white/5 rounded-xl shadow-sm">
                <h4 className="text-lg font-medium mb-4">Accent Color</h4>
                <div className="flex flex-wrap gap-3">
                  {ACCENT_COLORS.map(c => {
                    const isSelected = accentColor.toLowerCase() === c.hex.toLowerCase();
                    return (
                      <button
                        key={c.id}
                        onClick={() => setAccentColor(c.hex)}
                        className="w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center hover:scale-105 active:scale-95"
                        style={{
                          backgroundColor: c.hex,
                          borderColor: isSelected ? 'white' : 'transparent',
                          boxShadow: isSelected ? '0 0 10px rgba(255,255,255,0.5)' : 'none'
                        }}
                        title={c.name}
                      >
                        {isSelected && (
                          <div className="w-2.5 h-2.5 bg-white rounded-full shadow-sm" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Window Animations */}
              <div className="p-6 bg-white/5 border border-white/5 rounded-xl shadow-sm">
                <h4 className="text-lg font-medium mb-4">Window Animations</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Enable window animations</div>
                    <div className="text-sm text-white/50">Show animations when minimizing, restoring, opening, and closing windows</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only"
                      checked={true}
                      onChange={(e) => {
                         const useWindowAnimations = require('../../desktop-shell/useWindowAnimations').useWindowAnimations;
                         useWindowAnimations.getState().updateGlobalSettings({ animationsEnabled: e.target.checked });
                      }}
                    />
                    <div 
                      className={`w-11 h-6 bg-white/20 rounded-full transition-colors relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:translate-x-full after:border-white`}
                      style={{ backgroundColor: 'var(--accent-color)' }}
                    />
                  </label>
                </div>
              </div>

              {/* Taskbar Preferences */}
              <div className="p-6 bg-white/5 border border-white/5 rounded-xl shadow-sm">
                <h4 className="text-lg font-medium mb-4">Taskbar</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Automatically hide the taskbar</div>
                    <div className="text-sm text-white/50">Hides the taskbar when not hovered</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only"
                      checked={taskbarAutoHide}
                      onChange={(e) => setTaskbarAutoHide(e.target.checked)}
                    />
                    <div 
                      className={`w-11 h-6 bg-white/20 rounded-full transition-colors relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                        taskbarAutoHide ? 'after:translate-x-full after:border-white' : ''
                      }`}
                      style={taskbarAutoHide ? { backgroundColor: 'var(--accent-color)' } : {}}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'apps' && (
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h3 className="text-2xl font-semibold mb-6">Installed Apps</h3>
            <div className="space-y-2 mb-8">
              {Object.values(APP_REGISTRY)
                .filter(app => !app.internal)
                .map(app => (
                <div key={app.appId} className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-xl shadow-sm hover:bg-white/10 transition-colors">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bold capitalize"
                    style={{ 
                      backgroundColor: 'rgba(var(--accent-color-rgb), 0.2)', 
                      border: '1px solid rgba(var(--accent-color-rgb), 0.3)',
                      color: 'var(--accent-color)'
                    }}
                  >
                    {app.title.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-white/90">{app.title}</div>
                    <div className="text-xs text-white/50">System Application • v1.0</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10">
              <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Internal Handlers</h4>
              <div className="space-y-2 opacity-70">
                {Object.values(APP_REGISTRY)
                  .filter(app => app.internal)
                  .map(app => (
                  <div key={app.appId} className="flex items-center gap-4 p-3 bg-black/20 border border-white/5 rounded-lg shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-gray-500/20 flex items-center justify-center text-gray-400 font-bold capitalize text-sm">
                      {app.title.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-sm text-white/70">{app.title}</div>
                      <div className="text-xs text-white/40">Launch Mode: {app.launchMode}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'widgets' && (
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h3 className="text-2xl font-semibold mb-6">Desktop Widgets</h3>
            <SettingsWidgetsSection />
          </div>
        )}
        
        {activeTab === 'about' && (
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h3 className="text-2xl font-semibold mb-6">About</h3>
            <p className="text-white/60 mb-4">
              Use the dedicated About app from the Start menu for a premium overview, or see system specs in the System tab.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// We'll place the new section in a separate function to keep it organized
function SettingsWidgetsSection() {
  const { 
    widgetsEnabled, 
    visibleWidgetIds, 
    widgetSizes, 
    toggleWidgetsGlobally, 
    toggleWidget, 
    setWidgetSize, 
    resetToDefaults 
  } = require('../../desktop-widgets/useWidgetVisibility').useWidgetVisibility();
  
  const DEFAULT_WIDGET_DEFINITIONS = require('../../desktop-widgets/widget-data').DEFAULT_WIDGET_DEFINITIONS;

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white/5 border border-white/5 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-lg font-medium">Show desktop widgets</div>
            <div className="text-sm text-white/50">Display live studio metrics on the desktop</div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only"
              checked={widgetsEnabled}
              onChange={() => toggleWidgetsGlobally()}
            />
            <div 
              className={`w-11 h-6 bg-white/20 rounded-full transition-colors relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                widgetsEnabled ? 'after:translate-x-full after:border-white' : ''
              }`}
              style={widgetsEnabled ? { backgroundColor: 'var(--accent-color)' } : {}}
            />
          </label>
        </div>
      </div>

      {widgetsEnabled && (
        <div className="p-6 bg-white/5 border border-white/5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-medium">Available Widgets</h4>
            <button 
              onClick={resetToDefaults}
              className="px-3 py-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 rounded-md transition-colors"
            >
              Reset to defaults
            </button>
          </div>
          
          <div className="space-y-4">
            {DEFAULT_WIDGET_DEFINITIONS.map((def: any) => {
              const isVisible = visibleWidgetIds.includes(def.id);
              const currentSize = widgetSizes[def.id] || def.size;
              
              return (
                <div key={def.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only"
                        checked={isVisible}
                        onChange={() => toggleWidget(def.id)}
                      />
                      <div 
                        className={`w-9 h-5 bg-white/20 rounded-full transition-colors relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${
                          isVisible ? 'after:translate-x-full after:border-white' : ''
                        }`}
                        style={isVisible ? { backgroundColor: 'var(--accent-color)' } : {}}
                      />
                    </label>
                    <div>
                      <div className="font-medium text-white/90">{def.title}</div>
                      <div className="text-xs text-white/50 capitalize">{def.type.replace('-', ' ')}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <select
                      value={currentSize}
                      onChange={(e) => setWidgetSize(def.id, e.target.value)}
                      disabled={!isVisible}
                      className="bg-black/30 border border-white/10 rounded px-2 py-1 text-xs text-white disabled:opacity-50"
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      <div className="p-6 bg-white/5 border border-white/5 rounded-xl shadow-sm">
        <h4 className="text-lg font-medium mb-2">Auto-layout engine</h4>
        <p className="text-sm text-white/60 mb-4">
          Widgets are automatically arranged to prevent overlapping with each other, desktop icons, and the taskbar. 
          Manual positioning coming soon.
        </p>
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Engine Active</span>
        </div>
      </div>
    </div>
  );
}
