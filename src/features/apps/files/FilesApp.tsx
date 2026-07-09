import { useState, useMemo, useEffect, useRef } from 'react';
import { MOCK_FILES, FileItem } from './files-data';
import { FilesSidebar } from './components/FilesSidebar';
import { FilesToolbar } from './components/FilesToolbar';
import { FileListView } from './components/FileListView';
import { FilesDetailsPane } from './components/FilesDetailsPane';
import { useWindowStore } from '../../window-manager/useWindowStore';
import { getAppForFile } from '../../system/file-associations';
import { PortfolioFolderHero } from './components/PortfolioFolderHero';
import { CaseStudyQuickView } from './components/CaseStudyQuickView';
import { CASE_STUDIES } from './case-studies-data';
import { AnimatePresence } from 'framer-motion';
import { APP_REGISTRY } from '../../window-manager/window-registry';

import { WindowInstance } from '../../window-manager/useWindowStore';

interface FilesAppProps {
  initialFolderId?: string;
  window?: WindowInstance;
}

export default function FilesApp({ initialFolderId = 'home', window: windowInstance }: FilesAppProps) {
  const [currentFolderId, setCurrentFolderId] = useState<string>(initialFolderId);
  const [history, setHistory] = useState<string[]>([initialFolderId]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewCaseStudyId, setQuickViewCaseStudyId] = useState<string | null>(null);
  
  const { openApp, windows, focusWindow, restoreWindow } = useWindowStore();
  const fileContextFolder = useWindowStore(s => {
    const w = s.windows.find(w => w.appId === 'files');
    return w?.fileContext?.initialIntent as string | undefined;
  });

  const prevIntentRef = useRef<string | undefined>(undefined);
  const targetFolderId = windowInstance?.targetContext?.targetFolderId;

  useEffect(() => {
    if (targetFolderId && targetFolderId !== prevIntentRef.current) {
      prevIntentRef.current = targetFolderId;
      handleNavigate(targetFolderId);
      return;
    }

    if (fileContextFolder && fileContextFolder !== prevIntentRef.current) {
      prevIntentRef.current = fileContextFolder;
      // If the intent is a file ID, find its parent folder
      const file = MOCK_FILES.find(f => f.id === fileContextFolder);
      if (file) {
        if (file.type === 'folder') {
          handleNavigate(file.id);
        } else if (file.parentId) {
          handleNavigate(file.parentId);
          handleSelect(file.id);
        }
      }
    }
  }, [fileContextFolder, targetFolderId]);

  const handleNavigate = (folderId: string) => {
    if (folderId === currentFolderId) return;
    
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(folderId);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    
    setCurrentFolderId(folderId);
    setSelectedIds(new Set());
    setSearchQuery('');
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentFolderId(history[historyIndex - 1]);
      setSelectedIds(new Set());
      setSearchQuery('');
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentFolderId(history[historyIndex + 1]);
      setSelectedIds(new Set());
      setSearchQuery('');
    }
  };

  const handleUp = () => {
    const currentFolder = MOCK_FILES.find(f => f.id === currentFolderId);
    if (currentFolder && currentFolder.parentId) {
      handleNavigate(currentFolder.parentId);
    }
  };

  const handleSelect = (id: string) => {
    setSelectedIds(new Set([id]));
  };

  const handleClearSelection = () => {
    setSelectedIds(new Set());
  };

  const handleDoubleClick = (item: FileItem) => {
    if (item.type === 'folder') {
      handleNavigate(item.id);
    } else {
      // Find associated app
      const appId = getAppForFile(item);
      if (appId) {
        // Pass file context to the app, use item.name as title for file handlers
        openApp(appId, item.name, { width: 800, height: 600 }, item);
      } else {
        alert(`No app available to open ${item.extension ? `.${item.extension}` : 'this'} file.`);
      }
    }
  };

  const handleOpenFullDocument = (caseStudyId: string) => {
    const cs = CASE_STUDIES.find(c => c.id === caseStudyId);
    if (!cs) return;
    
    const primaryFileId = cs.linkedFiles[0]; 
    const fileItem = MOCK_FILES.find(f => f.id === primaryFileId);
    
    if (fileItem && APP_REGISTRY['pdf-viewer']) {
      openApp('pdf-viewer', fileItem.name, { width: 800, height: 640 }, fileItem);
    }
  };

  const handleStartSimilarProject = (caseStudyId: string) => {
    const cs = CASE_STUDIES.find(c => c.id === caseStudyId);
    if (!cs) return;

    const contactEntry = APP_REGISTRY['contact'];
    if (!contactEntry) return;

    const existingContact = windows.find(w => w.appId === 'contact');

    if (existingContact) {
      if (existingContact.isMinimized) {
        restoreWindow(existingContact.instanceId);
      } else {
        focusWindow(existingContact.instanceId);
      }
    } else {
      openApp('contact', contactEntry.title, {
        width: contactEntry.defaultWidth,
        height: contactEntry.defaultHeight,
        x: contactEntry.defaultX,
        y: contactEntry.defaultY,
      }, { initialIntent: cs.category });
    }
  };

  // Build breadcrumb path
  const breadcrumbPath = useMemo(() => {
    const path: FileItem[] = [];
    let currentId: string | null = currentFolderId;
    
    // Fallback safeguard to prevent infinite loops if data is malformed
    let iterations = 0;
    while (currentId && iterations < 20) {
      const folder = MOCK_FILES.find(f => f.id === currentId);
      if (folder) {
        path.unshift(folder);
        currentId = folder.parentId;
      } else {
        currentId = null;
      }
      iterations++;
    }
    return path;
  }, [currentFolderId]);

  // Filter current directory files
  const currentFiles = useMemo(() => {
    let files = MOCK_FILES.filter(f => f.parentId === currentFolderId);
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      files = files.filter(f => f.name.toLowerCase().includes(q));
    }
    
    // Sort folders first, then by name
    return files.sort((a, b) => {
      if (a.type === 'folder' && b.type === 'file') return -1;
      if (a.type === 'file' && b.type === 'folder') return 1;
      return a.name.localeCompare(b.name);
    });
  }, [currentFolderId, searchQuery]);

  const isRecycleBin = currentFolderId === 'recycle-bin';

  return (
    <div className="flex-1 flex bg-[#1A1A1A] h-full w-full rounded-b-xl overflow-hidden font-sans select-none">
      <FilesSidebar 
        currentFolderId={currentFolderId} 
        onNavigate={handleNavigate} 
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <FilesToolbar 
          canGoBack={historyIndex > 0}
          canGoForward={historyIndex < history.length - 1}
          canGoUp={!!MOCK_FILES.find(f => f.id === currentFolderId)?.parentId}
          onBack={handleBack}
          onForward={handleForward}
          onUp={handleUp}
          path={breadcrumbPath}
          onNavigateBreadcrumb={handleNavigate}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col min-w-0 h-full relative">
            {currentFolderId === 'portfolio' && <PortfolioFolderHero />}
            
            <FileListView 
              files={currentFiles}
              selectedIds={selectedIds}
              onSelect={handleSelect}
              onClearSelection={handleClearSelection}
              onDoubleClick={handleDoubleClick}
              isRecycleBin={isRecycleBin}
            />
          </div>
          
          <FilesDetailsPane 
            item={selectedIds.size === 1 ? MOCK_FILES.find(f => f.id === Array.from(selectedIds)[0]) || null : null}
            onOpen={handleDoubleClick}
            onQuickView={setQuickViewCaseStudyId}
          />
        </div>

        {/* Quick View Overlay */}
        <AnimatePresence>
          {quickViewCaseStudyId && (
            <CaseStudyQuickView 
              caseStudy={CASE_STUDIES.find(cs => cs.id === quickViewCaseStudyId)!}
              onClose={() => setQuickViewCaseStudyId(null)}
              onOpenFull={() => handleOpenFullDocument(quickViewCaseStudyId)}
              onStartSimilar={() => handleStartSimilarProject(quickViewCaseStudyId)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
