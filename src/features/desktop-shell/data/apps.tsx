import { ReactNode } from 'react';
import { Folder, FileText, Settings, Terminal, Info, Mail, Briefcase, Layout, Layers, Map } from 'lucide-react';
import { StudioLogoIcon } from '../../ui/StudioLogoIcon';

export interface AppDefinition {
  id: string;
  label: string;
  icon: ReactNode;
  category: string;
  pinned: boolean;
  showOnDesktop?: boolean;
  showInTaskbar?: boolean;
  showInStartMenu?: boolean;
}

export const SYSTEM_APPS: AppDefinition[] = [
  {
    id: 'phantom-node-studio',
    label: 'Studio',
    icon: <StudioLogoIcon />,
    category: 'Action',
    pinned: true,
    showOnDesktop: true,
    showInTaskbar: true,
    showInStartMenu: true,
  },
  {
    id: 'files',
    label: 'Files',
    icon: <Folder color="#3b82f6" fill="#3b82f6" fillOpacity={0.3} strokeWidth={1.5} className="w-full h-full" />,
    category: 'System',
    pinned: true,
    showOnDesktop: true,
    showInTaskbar: false,
    showInStartMenu: true,
  },
  {
    id: 'notepad',
    label: 'Notepad',
    icon: <FileText color="#f59e0b" fill="#f59e0b" fillOpacity={0.2} strokeWidth={1.5} className="w-full h-full" />,
    category: 'Utility',
    pinned: true,
    showOnDesktop: true,
    showInTaskbar: false,
    showInStartMenu: true,
  },
  {
    id: 'terminal',
    label: 'Terminal',
    icon: <Terminal color="#9ca3af" strokeWidth={1.5} className="w-full h-full drop-shadow-sm" />,
    category: 'System',
    pinned: true,
    showOnDesktop: true,
    showInTaskbar: false,
    showInStartMenu: true,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings color="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={1.5} className="w-full h-full" />,
    category: 'System',
    pinned: true,
    showOnDesktop: true,
    showInTaskbar: false,
    showInStartMenu: true,
  },
  {
    id: 'about',
    label: 'About',
    icon: <Info color="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={1.5} className="w-full h-full" />,
    category: 'System',
    pinned: true,
    showOnDesktop: true,
    showInTaskbar: false,
    showInStartMenu: true,
  },
  {
    id: 'recycle-bin',
    label: 'Recycle Bin',
    icon: <Folder color="#cbd5e1" fill="#cbd5e1" fillOpacity={0.1} strokeWidth={1.5} className="w-full h-full" />,
    category: 'System',
    pinned: false,
    showOnDesktop: true,
    showInTaskbar: false,
    showInStartMenu: false,
  }
];
