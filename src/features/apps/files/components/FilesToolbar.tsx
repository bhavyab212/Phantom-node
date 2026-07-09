import { ArrowLeft, ArrowRight, ArrowUp, Search } from 'lucide-react';
import { FilesBreadcrumbs } from './FilesBreadcrumbs';
import { FileItem } from '../files-data';

interface FilesToolbarProps {
  canGoBack: boolean;
  canGoForward: boolean;
  canGoUp: boolean;
  onBack: () => void;
  onForward: () => void;
  onUp: () => void;
  path: FileItem[];
  onNavigateBreadcrumb: (folderId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function FilesToolbar({
  canGoBack,
  canGoForward,
  canGoUp,
  onBack,
  onForward,
  onUp,
  path,
  onNavigateBreadcrumb,
  searchQuery,
  onSearchChange
}: FilesToolbarProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-[#252525] border-b border-white/5">
      {/* Navigation Buttons */}
      <div className="flex items-center gap-1 mr-2">
        <button
          onClick={onBack}
          disabled={!canGoBack}
          className={`p-1.5 rounded-md transition-colors ${
            canGoBack ? 'hover:bg-white/10 text-white/90' : 'text-white/20 cursor-not-allowed'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onForward}
          disabled={!canGoForward}
          className={`p-1.5 rounded-md transition-colors ${
            canGoForward ? 'hover:bg-white/10 text-white/90' : 'text-white/20 cursor-not-allowed'
          }`}
        >
          <ArrowRight className="w-5 h-5" />
        </button>
        <button
          onClick={onUp}
          disabled={!canGoUp}
          className={`p-1.5 rounded-md transition-colors ${
            canGoUp ? 'hover:bg-white/10 text-white/90' : 'text-white/20 cursor-not-allowed'
          }`}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>

      {/* Breadcrumbs */}
      <FilesBreadcrumbs path={path} onNavigate={onNavigateBreadcrumb} />

      {/* Search */}
      <div className="relative w-64 ml-2">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-white/40" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search this folder"
          className="block w-full pl-9 pr-3 py-1.5 border border-white/10 rounded-md leading-5 bg-black/20 text-white/90 placeholder-white/40 focus:outline-none focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] sm:text-sm transition-colors"
        />
      </div>
    </div>
  );
}
