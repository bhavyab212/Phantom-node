import { FileItem } from '../files-data';
import { FileText, FileJson, File, Folder } from 'lucide-react';
import { getAppForFile } from '../../../system/file-associations';
import { CASE_STUDIES } from '../case-studies-data';
import { CaseStudyDetailsPane } from './CaseStudyDetailsPane';

interface FilesDetailsPaneProps {
  item: FileItem | null;
  onOpen: (item: FileItem) => void;
  onQuickView: (caseStudyId: string) => void;
}

export function FilesDetailsPane({ item, onOpen, onQuickView }: FilesDetailsPaneProps) {
  if (!item) {
    return (
      <div className="w-64 border-l border-white/5 bg-[#1a1a1a] flex items-center justify-center text-white/30 text-sm select-none p-4 text-center">
        Select a file to view details
      </div>
    );
  }

  // Check if this item is part of a case study
  const relatedCaseStudy = CASE_STUDIES.find(
    cs => cs.linkedFiles.includes(item.id) || item.id === `proj-${cs.id.replace('cs-', '')}`
  );

  if (relatedCaseStudy) {
    return (
      <CaseStudyDetailsPane 
        caseStudy={relatedCaseStudy} 
        onQuickView={() => onQuickView(relatedCaseStudy.id)} 
      />
    );
  }

  const formatSize = (bytes?: number) => {
    if (bytes === undefined) return 'Unknown size';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleString(undefined, { 
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const renderIcon = () => {
    if (item.type === 'folder') return <Folder size={48} className="text-blue-500/50" />;
    if (item.actualContentType === 'application/pdf' || item.extension === 'pdf') return <FileText size={48} className="text-red-500/50" />;
    if (item.extension === 'json') return <FileJson size={48} className="text-yellow-500/50" />;
    if (item.extension === 'txt' || item.extension === 'md') return <FileText size={48} className="text-gray-400/50" />;
    return <File size={48} className="text-gray-500/50" />;
  };

  const appId = getAppForFile(item);
  const isPdfBacked = item.actualContentType === 'application/pdf';

  return (
    <div className="w-64 border-l border-white/5 bg-[#1a1a1a] flex flex-col select-none overflow-y-auto custom-scrollbar">
      <div className="p-6 flex flex-col items-center border-b border-white/5">
        <div className="mb-4">
          {renderIcon()}
        </div>
        <div className="text-center w-full break-words text-white/90 font-medium leading-tight mb-2">
          {item.name}
        </div>
        <div className="text-xs text-white/50 capitalize">
          {isPdfBacked ? 'PDF-backed document' : item.type === 'folder' ? 'File folder' : `${item.extension?.toUpperCase() || 'Unknown'} File`}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col gap-4 text-sm">
        {item.type === 'file' && (
          <div className="flex flex-col gap-3">
            <div>
              <div className="text-white/40 text-xs mb-1">Size</div>
              <div className="text-white/80">{formatSize(item.size)}</div>
            </div>
            
            <div>
              <div className="text-white/40 text-xs mb-1">Date modified</div>
              <div className="text-white/80">{formatDate(item.modifiedAt)}</div>
            </div>

            {/* Custom previews */}
            {isPdfBacked && (
              <div className="mt-2 p-3 bg-white/5 rounded-lg border border-white/10 text-center">
                <FileText size={24} className="text-red-400 mx-auto mb-2" />
                <div className="text-xs text-white/70 mb-3">Rich Document Format</div>
                <button 
                  onClick={() => onOpen(item)}
                  className="px-4 py-1.5 text-white rounded text-xs transition-opacity hover:opacity-90 w-full"
                  style={{ backgroundColor: 'var(--accent-color)' }}
                >
                  Open Document
                </button>
              </div>
            )}

            {item.extension === 'json' && item.content && (
              <div className="mt-2 p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="text-xs text-white/40 mb-1">Keys</div>
                <div className="text-white/80 font-mono text-xs">
                  {Object.keys(JSON.parse(item.content)).length} top-level nodes
                </div>
              </div>
            )}

            {(item.extension === 'txt' || item.extension === 'md') && item.content && (
              <div className="mt-2">
                <div className="text-white/40 text-xs mb-1">Preview</div>
                <div className="p-3 bg-black/30 rounded border border-white/5 font-mono text-[11px] text-white/60 line-clamp-6 leading-relaxed">
                  {item.content}
                </div>
              </div>
            )}
          </div>
        )}

        {item.type === 'folder' && (
          <div>
            <div className="text-white/40 text-xs mb-1">Date modified</div>
            <div className="text-white/80">{formatDate(item.modifiedAt)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
