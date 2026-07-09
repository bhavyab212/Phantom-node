import { FolderOpen, Trash2 } from 'lucide-react';

interface FilesEmptyStateProps {
  isRecycleBin?: boolean;
}

export function FilesEmptyState({ isRecycleBin = false }: FilesEmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-white/50 w-full h-full p-8">
      <div className="mb-4 opacity-50 bg-white/5 p-6 rounded-full">
        {isRecycleBin ? (
          <Trash2 className="w-12 h-12" strokeWidth={1.5} />
        ) : (
          <FolderOpen className="w-12 h-12" strokeWidth={1.5} />
        )}
      </div>
      <h3 className="text-lg font-medium text-white/90 mb-1">
        {isRecycleBin ? 'Recycle Bin is empty' : 'This folder is empty'}
      </h3>
      <p className="text-sm text-center max-w-xs">
        {isRecycleBin 
          ? 'Items you delete will appear here before being permanently removed.' 
          : 'Drag and drop files here, or use the toolbar to create new ones.'}
      </p>
    </div>
  );
}
