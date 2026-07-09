import { ChevronRight } from 'lucide-react';
import { FileItem } from '../files-data';

interface FilesBreadcrumbsProps {
  path: FileItem[];
  onNavigate: (folderId: string) => void;
}

export function FilesBreadcrumbs({ path, onNavigate }: FilesBreadcrumbsProps) {
  return (
    <div className="flex items-center px-2 py-1 bg-black/20 border border-white/5 rounded-md flex-1 overflow-x-auto no-scrollbar">
      {path.map((item, index) => {
        const isLast = index === path.length - 1;
        
        return (
          <div key={item.id} className="flex items-center flex-shrink-0">
            <button
              onClick={() => {
                if (!isLast) onNavigate(item.id);
              }}
              className={`px-2 py-1 text-sm rounded transition-colors ${
                isLast 
                  ? 'text-white font-medium cursor-default' 
                  : 'text-white/60 hover:bg-white/10 hover:text-white cursor-pointer'
              }`}
            >
              {item.name}
            </button>
            
            {!isLast && (
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            )}
          </div>
        );
      })}
    </div>
  );
}
