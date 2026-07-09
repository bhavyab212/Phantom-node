import { FileItem } from '../files-data';
import { Folder, FileText, File as FileIcon, FileJson, FileSpreadsheet, FileImage, Briefcase } from 'lucide-react';
import { CASE_STUDIES } from '../case-studies-data';

interface FileRowProps {
  item: FileItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDoubleClick: (item: FileItem) => void;
}

const getIcon = (item: FileItem) => {
  const isCaseStudyFolder = item.id.startsWith('proj-');
  if (isCaseStudyFolder) {
    return (
      <Folder 
        className="w-5 h-5" 
        style={{ color: 'var(--accent-color)', fill: 'rgba(var(--accent-color-rgb), 0.3)' }} 
        strokeWidth={1.5} 
      />
    );
  }

  if (item.type === 'folder') {
    return (
      <Folder 
        className="w-5 h-5" 
        style={{ color: 'var(--accent-color)', fill: 'rgba(var(--accent-color-rgb), 0.3)' }} 
        strokeWidth={1.5} 
      />
    );
  }
  
  switch (item.extension) {
    case 'md':
    case 'txt':
      return <FileText className="w-5 h-5 text-gray-400" strokeWidth={1.5} />;
    case 'json':
      return <FileJson className="w-5 h-5 text-yellow-400" strokeWidth={1.5} />;
    case 'pdf':
      return <FileIcon className="w-5 h-5 text-red-400" strokeWidth={1.5} />;
    case 'fig':
      return <FileImage className="w-5 h-5 text-purple-400" strokeWidth={1.5} />;
    case 'doc':
    case 'docs':
    case 'docx':
      return (
        <FileText 
          className="w-5 h-5" 
          style={{ color: 'var(--accent-color)' }} 
          strokeWidth={1.5} 
        />
      );
    default:
      return <FileIcon className="w-5 h-5 text-gray-400" strokeWidth={1.5} />;
  }
};

const formatSize = (bytes?: number) => {
  if (bytes === undefined) return '--';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
};

export function FileRow({ item, isSelected, onSelect, onDoubleClick }: FileRowProps) {
  const hasStory = item.type === 'folder' && CASE_STUDIES.some(cs => cs.linkedFiles.includes(item.id) || (cs as any).linkedFileFolderId === item.id);

  return (
    <div
      className={`group flex items-center w-full px-4 py-1.5 text-sm cursor-default select-none transition-colors border-b ${
        isSelected 
          ? 'border-b-transparent' 
          : 'hover:bg-white/5 border-b-white/5'
      }`}
      style={
        isSelected 
          ? { 
              backgroundColor: 'rgba(var(--accent-color-rgb), 0.15)',
              borderBottomColor: 'rgba(var(--accent-color-rgb), 0.1)'
            }
          : {}
      }
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item.id);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onDoubleClick(item);
      }}
    >
      <div className="flex items-center gap-3 w-5/12 min-w-[200px]">
        {getIcon(item)}
        <span className="text-white/90 truncate pr-2">{item.name}</span>
        {hasStory && (
          <span className="ml-auto flex-shrink-0 flex items-center gap-1 text-[10px] uppercase tracking-wider text-[var(--accent-color,#3b82f6)] bg-[var(--accent-color,#3b82f6)]/10 px-1.5 py-0.5 rounded">
            <Briefcase size={10} /> Story
          </span>
        )}
      </div>
      
      <div className="w-3/12 min-w-[120px] text-white/50 truncate pr-4">
        {formatDate(item.modifiedAt)}
      </div>
      
      <div className="w-2/12 min-w-[100px] text-white/50 capitalize truncate pr-4">
        {item.type === 'folder' ? 'File folder' : `${item.extension?.toUpperCase() || 'Unknown'} File`}
      </div>
      
      <div className="w-2/12 min-w-[80px] text-white/50 text-right">
        {formatSize(item.size)}
      </div>
    </div>
  );
}
