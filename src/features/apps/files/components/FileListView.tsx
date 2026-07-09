import { FileItem } from '../files-data';
import { FileRow } from './FileRow';
import { FilesEmptyState } from './FilesEmptyState';

interface FileListViewProps {
  files: FileItem[];
  selectedIds: Set<string>;
  onSelect: (id: string) => void;
  onClearSelection: () => void;
  onDoubleClick: (item: FileItem) => void;
  isRecycleBin?: boolean;
}

export function FileListView({ 
  files, 
  selectedIds, 
  onSelect, 
  onClearSelection, 
  onDoubleClick,
  isRecycleBin = false
}: FileListViewProps) {
  
  if (files.length === 0) {
    return (
      <div className="flex-1 h-full w-full" onClick={onClearSelection}>
        <FilesEmptyState isRecycleBin={isRecycleBin} />
      </div>
    );
  }

  return (
    <div 
      className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar"
      onClick={onClearSelection}
    >
      <div className="sticky top-0 z-10 flex items-center w-full px-4 py-2 text-xs font-medium text-white/40 border-b border-white/5 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="w-5/12 min-w-[200px]">Name</div>
        <div className="w-3/12 min-w-[120px]">Date modified</div>
        <div className="w-2/12 min-w-[100px]">Type</div>
        <div className="w-2/12 min-w-[80px] text-right">Size</div>
      </div>
      
      <div className="py-1">
        {files.map(file => (
          <FileRow 
            key={file.id}
            item={file}
            isSelected={selectedIds.has(file.id)}
            onSelect={onSelect}
            onDoubleClick={onDoubleClick}
          />
        ))}
      </div>
    </div>
  );
}
