import { useState, useEffect } from 'react';
import { WindowInstance } from '../../window-manager/useWindowStore';
import { useNotepadStore } from '../../system/useNotepadStore';

interface NotepadAppProps {
  window: WindowInstance;
}

export default function NotepadApp({ window: appWindow }: NotepadAppProps) {
  const fileId = appWindow.fileContext?.id;
  const draftId = appWindow.instanceId; // use window instanceId as temporary draft identifier
  
  const { documents, unsavedDrafts, setDocumentContent, setDraftContent } = useNotepadStore();

  const [content, setContent] = useState('');
  const [wordWrap, setWordWrap] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load initial content
  useEffect(() => {
    if (fileId) {
      // Check if we have a persisted copy in the store first
      if (documents[fileId] !== undefined) {
        setContent(documents[fileId]);
      } else if (appWindow.fileContext?.content) {
        // Fallback to the original mock content
        setContent(appWindow.fileContext.content);
        setDocumentContent(fileId, appWindow.fileContext.content);
      }
    } else {
      // Check for an unsaved draft
      if (unsavedDrafts[draftId] !== undefined) {
        setContent(unsavedDrafts[draftId]);
      } else {
        setContent('');
      }
    }
  }, [fileId, draftId]);

  // Auto-save on every keystroke
  const handleContentChange = (val: string) => {
    setContent(val);
    if (fileId) {
      setDocumentContent(fileId, val);
    } else {
      setDraftContent(draftId, val);
    }
  };

  const handleSave = () => {
    if (fileId) {
      setDocumentContent(fileId, content);
      setToastMessage('Document saved successfully');
    } else {
      setDraftContent(draftId, content);
      setToastMessage('Draft saved successfully');
    }
    setTimeout(() => setToastMessage(null), 2000);
  };

  const charCount = content.length;
  const lineCount = content.split('\n').length;

  return (
    <div className="flex flex-col w-full h-full bg-[#1E1E1E] text-[#D4D4D4] font-sans">
      {/* Menu Bar */}
      <div className="flex items-center px-2 py-1 bg-[#2D2D2D] border-b border-[#3E3E42] text-sm select-none">
        <div className="group relative">
          <button className="px-3 py-1 rounded hover:bg-white/10 transition-colors">File</button>
          <div className="hidden group-hover:block absolute top-full left-0 bg-[#252526] border border-[#454545] shadow-lg py-1 min-w-[150px] z-50 rounded-sm">
            <button 
              className="w-full text-left px-4 py-1.5 hover:bg-[#04395E] transition-colors"
              onClick={handleSave}
            >
              Save
            </button>
            <button className="w-full text-left px-4 py-1.5 hover:bg-[#04395E] transition-colors">Exit</button>
          </div>
        </div>
        <div className="group relative">
          <button className="px-3 py-1 rounded hover:bg-white/10 transition-colors">Edit</button>
          <div className="hidden group-hover:block absolute top-full left-0 bg-[#252526] border border-[#454545] shadow-lg py-1 min-w-[150px] z-50 rounded-sm">
            <button className="w-full text-left px-4 py-1.5 hover:bg-[#04395E] transition-colors">Undo</button>
            <button className="w-full text-left px-4 py-1.5 hover:bg-[#04395E] transition-colors">Redo</button>
          </div>
        </div>
        <div className="group relative">
          <button className="px-3 py-1 rounded hover:bg-white/10 transition-colors">Format</button>
          <div className="hidden group-hover:block absolute top-full left-0 bg-[#252526] border border-[#454545] shadow-lg py-1 min-w-[150px] z-50 rounded-sm">
            <button 
              className="w-full text-left px-4 py-1.5 hover:bg-[#04395E] transition-colors flex items-center justify-between"
              onClick={() => setWordWrap(!wordWrap)}
            >
              <span>Word Wrap</span>
              {wordWrap && <span>✓</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 relative overflow-hidden bg-[#1E1E1E] flex">
        <div className="w-8 bg-[#1E1E1E] border-r border-[#3E3E42] flex-shrink-0 flex flex-col items-end py-4 text-xs text-white/30 pt-4 px-2 select-none">
          {Array.from({ length: Math.max(1, lineCount) }).map((_, i) => (
            <div key={i} className="leading-6">{i + 1}</div>
          ))}
        </div>
        
        <textarea
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          spellCheck={false}
          className={`flex-1 p-4 bg-transparent resize-none outline-none font-mono text-[14px] leading-6 custom-scrollbar text-[#D4D4D4] ${
            wordWrap ? 'whitespace-pre-wrap' : 'whitespace-pre overflow-x-auto'
          }`}
          style={{ tabSize: 2 }}
        />

        {toastMessage && (
          <div 
            className="absolute bottom-4 right-4 text-white border px-3 py-1.5 rounded shadow-lg text-sm animate-in fade-in slide-in-from-bottom-2 z-50"
            style={{ 
              backgroundColor: 'rgba(var(--accent-color-rgb), 0.2)', 
              borderColor: 'var(--accent-color)'
            }}
          >
            {toastMessage}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div 
        className="flex items-center justify-between px-4 py-0.5 text-white text-xs select-none"
        style={{ backgroundColor: 'var(--accent-color)' }}
      >
        <div className="flex items-center space-x-4">
          <span>UTF-8</span>
          <span>{wordWrap ? 'Word Wrap: On' : 'Word Wrap: Off'}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Ln {lineCount}, Ch {charCount}</span>
        </div>
      </div>
    </div>
  );
}
