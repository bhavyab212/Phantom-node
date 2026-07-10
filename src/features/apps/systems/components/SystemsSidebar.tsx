import React from 'react';
import { NativeAppSidebar, SidebarItem } from '@/features/native-app-shell';
import { SYSTEMS_DATA } from '../data';
import { Circle } from 'lucide-react';

export interface SystemsSidebarProps {
  activeSystemId: string;
  onSystemSelect: (id: string) => void;
}

export const SystemsSidebar: React.FC<SystemsSidebarProps> = ({ activeSystemId, onSystemSelect }) => {
  return (
    <NativeAppSidebar>
      <div className="flex flex-col gap-1 mt-4">
        {SYSTEMS_DATA.map((system) => {
          const isActive = activeSystemId === system.id;
          return (
            <SidebarItem
              key={system.id}
              id={system.id}
              label={system.title}
              // Status dot icon for each system in the sidebar
              icon={
                <Circle 
                  className={`w-2 h-2 fill-current ${isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-text)]/40'}`} 
                />
              }
              isActive={isActive}
              onClick={() => onSystemSelect(system.id)}
            />
          );
        })}
      </div>
    </NativeAppSidebar>
  );
};
