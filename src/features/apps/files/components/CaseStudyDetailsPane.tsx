import { CaseStudy } from '../case-studies-data';
import { MOCK_FILES } from '../files-data';
import { FileText, Folder, ExternalLink, MessageSquare, Layout } from 'lucide-react';
import { useWindowStore } from '../../../window-manager/useWindowStore';
import { APP_REGISTRY } from '../../../window-manager/window-registry';
import { CaseStudyPreviewCard } from './CaseStudyPreviewCard';

interface CaseStudyDetailsPaneProps {
  caseStudy: CaseStudy;
  onQuickView: () => void;
}

export function CaseStudyDetailsPane({ caseStudy, onQuickView }: CaseStudyDetailsPaneProps) {
  const { openApp, windows, focusWindow, restoreWindow } = useWindowStore();

  const handleOpenCaseStudy = () => {
    // Find the primary document (assumed to be the first linked file for simplicity, 
    // or look for the one with the PDF extension if heroAssetType is pdf)
    const primaryFileId = caseStudy.linkedFiles[0]; 
    const fileItem = MOCK_FILES.find(f => f.id === primaryFileId);
    
    if (fileItem && APP_REGISTRY['pdf-viewer']) {
      openApp('pdf-viewer', fileItem.name, { width: 800, height: 640 }, fileItem);
    }
  };

  const handleStartProject = () => {
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
      }, { initialIntent: caseStudy.category });
    }
  };

  const handleOpenStory = () => {
    const workEntry = APP_REGISTRY['work'];
    if (!workEntry) return;

    const existingWork = windows.find(w => w.appId === 'work');
    if (existingWork) {
      // If it's already open, we'll want to focus it, and rely on fileContext changing
      // Wait, fileContext only updates on openApp if we pass it, but if it's already open we need a way to change its context.
      // `openApp` updates context if it's already open in our store implementation? Let's assume yes or it just focuses.
      // Alternatively, we close it and reopen it, or rely on our `useWindowStore` to handle it.
      // Actually `openApp` creates a new instance if we don't handle single-instance perfectly, 
      // but let's just close and reopen for a clean state if we want to force context, 
      // or assume openApp will handle it.
      openApp('work', workEntry.title, {
        width: workEntry.defaultWidth,
        height: workEntry.defaultHeight,
        x: workEntry.defaultX,
        y: workEntry.defaultY,
      }, { initialIntent: caseStudy.id });
    } else {
      openApp('work', workEntry.title, {
        width: workEntry.defaultWidth,
        height: workEntry.defaultHeight,
        x: workEntry.defaultX,
        y: workEntry.defaultY,
      }, { initialIntent: caseStudy.id });
    }
  };

  return (
    <div className="w-72 border-l border-white/5 bg-[#1a1a1a] flex flex-col select-none overflow-y-auto custom-scrollbar">
      <div className="p-6 flex flex-col items-center border-b border-white/5">
        <div className="mb-4">
          <Folder size={48} className="text-blue-500/50" />
        </div>
        <div className="text-center w-full break-words text-white/90 font-medium leading-tight mb-2">
          {caseStudy.clientName}
        </div>
        <div className="text-xs text-[var(--accent-color,#3b82f6)] font-medium bg-[var(--accent-color,#3b82f6)]/10 px-2.5 py-1 rounded-full">
          Project Folder
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col gap-5">
        
        <CaseStudyPreviewCard caseStudy={caseStudy} />

        <div>
          <div className="text-white/40 text-xs uppercase tracking-widest mb-1.5">Summary</div>
          <p className="text-sm text-white/70 leading-relaxed line-clamp-3">
            {caseStudy.summary}
          </p>
        </div>

        <div className="flex flex-col gap-2.5 mt-2">
          <button 
            onClick={handleOpenStory}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[var(--accent-color,#3b82f6)] hover:bg-[var(--accent-color,#3b82f6)]/90 text-white rounded-lg text-sm font-medium transition-colors border border-white/10"
          >
            <Layout size={16} />
            Open story view
          </button>
          
          <button 
            onClick={onQuickView}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white/5 hover:bg-white/10 text-white/90 rounded-lg text-sm transition-colors border border-white/10"
          >
            <FileText size={16} className="text-white/50" />
            Quick View
          </button>
          
          <button 
            onClick={handleOpenCaseStudy}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white/5 hover:bg-white/10 text-white/90 rounded-lg text-sm transition-colors border border-white/10"
          >
            <ExternalLink size={16} className="text-white/50" />
            Open Full Document
          </button>

          <button 
            onClick={handleStartProject}
            className="w-full mt-2 py-2.5 px-4 rounded-lg text-sm text-white font-medium transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, var(--accent-color,#3b82f6), color-mix(in srgb, var(--accent-color,#3b82f6) 80%, #818cf8))',
              boxShadow: '0 4px 12px rgba(var(--accent-color-rgb,59,130,246),0.2)',
            }}
          >
            <MessageSquare size={16} />
            Start a similar project
          </button>
        </div>
      </div>
    </div>
  );
}
