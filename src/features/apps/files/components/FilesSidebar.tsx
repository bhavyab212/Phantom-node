import { Folder, Home, FileText, Download, Briefcase, Trash2 } from 'lucide-react';

interface FilesSidebarProps {
  currentFolderId: string;
  onNavigate: (folderId: string) => void;
}

const SIDEBAR_LINKS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'desktop', label: 'Desktop', icon: Folder },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'downloads', label: 'Downloads', icon: Download },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
];

export function FilesSidebar({ currentFolderId, onNavigate }: FilesSidebarProps) {
  return (
    <div className="w-56 flex flex-col bg-[#202020] border-r border-white/5 pt-4 pb-2 px-2 h-full">
      <div className="text-xs font-medium text-white/40 mb-2 px-3 uppercase tracking-wider">
        Quick Access
      </div>
      
      <div className="flex-1 space-y-0.5">
        {SIDEBAR_LINKS.map((link) => {
          const isActive = currentFolderId === link.id;
          const Icon = link.icon;
          
          return (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-md text-sm transition-colors ${
                isActive 
                  ? 'bg-white/10 text-white' 
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon 
                className="w-4 h-4" 
                style={{ color: isActive ? 'var(--accent-color)' : 'rgba(var(--accent-color-rgb), 0.7)' }}
                strokeWidth={2}
              />
              <span>{link.label}</span>
            </button>
          );
        })}
      </div>

      <div className="h-px bg-white/5 mx-2 my-2" />
      
      <button
        onClick={() => onNavigate('recycle-bin')}
        className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-md text-sm transition-colors ${
          currentFolderId === 'recycle-bin'
            ? 'bg-white/10 text-white' 
            : 'text-white/70 hover:bg-white/5 hover:text-white'
        }`}
      >
        <Trash2 
          className={`w-4 h-4 ${currentFolderId === 'recycle-bin' ? 'text-gray-300' : 'text-gray-400'}`} 
          strokeWidth={2}
        />
        <span>Recycle Bin</span>
      </button>
    </div>
  );
}
