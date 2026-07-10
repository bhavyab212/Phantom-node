import React, { useState } from 'react';
import {
  NativeAppFrame,
  NativeAppToolbar,
  NativeAppContent,
  NativeSegmentedControl,
  useNativeApp
} from '@/features/native-app-shell';
import { SystemsSidebar } from './components/SystemsSidebar';
import { SystemCard } from './components/SystemCard';
import { SystemDetailPanel } from './components/SystemDetailPanel';
import { SYSTEMS_DATA } from './data';

// Internal component accessing the layout context
const SystemsAppContent: React.FC = () => {
  const { breakpoint } = useNativeApp();
  const isCompact = breakpoint === 'compact';

  // State
  const [viewMode, setViewMode] = useState<'overview' | 'detail'>('overview');
  const [activeSystemId, setActiveSystemId] = useState<string>(SYSTEMS_DATA[0].id);

  const activeSystem = SYSTEMS_DATA.find(s => s.id === activeSystemId) || SYSTEMS_DATA[0];

  const handleSystemSelect = (id: string) => {
    setActiveSystemId(id);
    setViewMode('detail');
  };

  // Switcher for wide mode: Overview vs Detail
  const wideModeSwitcher = (
    <NativeSegmentedControl
      segments={[
        { id: 'overview', label: 'Grid Overview' },
        { id: 'detail', label: 'Detailed View' },
      ]}
      activeId={viewMode}
      onChange={(id) => setViewMode(id as 'overview' | 'detail')}
      className="w-64"
    />
  );

  // Switcher for compact mode: Navigate the 4 systems directly (no sidebar)
  const compactSystemSwitcher = (
    <NativeSegmentedControl
      segments={SYSTEMS_DATA.map(s => ({
        id: s.id,
        // Shorten labels slightly for mobile tab display if needed, but we'll use title here
        label: s.title.split(' ')[0] 
      }))}
      activeId={activeSystemId}
      onChange={(id) => {
        setActiveSystemId(id);
        setViewMode('detail');
      }}
      className="w-full mt-2 mx-4 max-w-[calc(100vw-32px)]"
    />
  );

  return (
    <>
      <NativeAppToolbar 
        title="Systems" 
        switcher={!isCompact ? wideModeSwitcher : undefined}
      />
      
      {isCompact && (
        <div className="bg-[var(--glass-bg-light)] dark:bg-[var(--glass-bg-dark)] backdrop-blur-[var(--glass-blur)] backdrop-saturate-[var(--glass-saturate)] border-b border-[var(--glass-border)] pb-2 z-10 sticky top-[52px]">
          {compactSystemSwitcher}
        </div>
      )}

      {!isCompact && (
        <SystemsSidebar 
          activeSystemId={activeSystemId} 
          onSystemSelect={handleSystemSelect} 
        />
      )}

      <NativeAppContent maxWidth={isCompact || viewMode === 'detail' ? 'xl' : 'none'} className="pb-24 pt-8">
        {viewMode === 'overview' && !isCompact ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 md:p-8">
            {SYSTEMS_DATA.map(system => (
              <SystemCard 
                key={system.id} 
                system={system} 
                onClick={() => handleSystemSelect(system.id)} 
              />
            ))}
          </div>
        ) : (
          <div className="p-4 md:p-8">
            <SystemDetailPanel 
              system={activeSystem} 
              onDiscuss={() => console.log('Discuss clicked for', activeSystem.title)}
            />
          </div>
        )}
      </NativeAppContent>
    </>
  );
};

export const SystemsApp: React.FC = () => {
  return (
    <NativeAppFrame>
      <SystemsAppContent />
    </NativeAppFrame>
  );
};
