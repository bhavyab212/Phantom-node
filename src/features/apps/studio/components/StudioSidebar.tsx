import React from 'react';
import { NativeAppSidebar, SidebarItem } from '@/features/native-app-shell';
import { Eye, Lightbulb, Users, Wrench, Mail } from 'lucide-react';

export const StudioSidebar: React.FC = () => {
  const [activeId, setActiveId] = React.useState('overview');

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <Eye /> },
    { id: 'philosophy', label: 'Philosophy', icon: <Lightbulb /> },
    { id: 'team', label: 'Team', icon: <Users /> },
    { id: 'tools', label: 'Tools & Stack', icon: <Wrench /> },
    { id: 'contact', label: 'Contact', icon: <Mail /> },
  ];

  return (
    <NativeAppSidebar>
      <div className="flex flex-col gap-1 mt-4">
        {navItems.map((item) => (
          <SidebarItem
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            isActive={activeId === item.id}
            onClick={setActiveId}
          />
        ))}
      </div>
    </NativeAppSidebar>
  );
};
