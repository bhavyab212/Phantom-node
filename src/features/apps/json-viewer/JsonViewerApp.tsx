import { useState, useMemo } from 'react';
import { WindowInstance } from '../../window-manager/useWindowStore';
import { JsonTree } from './components/JsonTree';
import { JsonRawView } from './components/JsonRawView';
import { ListTree, Code, Copy, Check } from 'lucide-react';

interface JsonViewerAppProps {
  window: WindowInstance;
}

export default function JsonViewerApp({ window: appWindow }: JsonViewerAppProps) {
  const [viewMode, setViewMode] = useState<'tree' | 'raw'>('tree');
  const [copied, setCopied] = useState(false);

  const rawContent = appWindow.fileContext?.content || '{\n  "message": "No JSON provided"\n}';
  
  const parsedData = useMemo(() => {
    try {
      return JSON.parse(rawContent);
    } catch (e) {
      return null;
    }
  }, [rawContent]);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col w-full h-full bg-[#1E1E1E] text-white/90 font-sans select-none overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2D2D2D] border-b border-black/40 shadow-sm z-10">
        <div className="flex items-center space-x-1 bg-black/20 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('tree')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
              viewMode === 'tree' ? 'bg-[#007ACC] text-white' : 'hover:bg-white/10 text-white/70'
            }`}
          >
            <ListTree size={16} />
            <span>Tree</span>
          </button>
          <button
            onClick={() => setViewMode('raw')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
              viewMode === 'raw' ? 'bg-[#007ACC] text-white' : 'hover:bg-white/10 text-white/70'
            }`}
          >
            <Code size={16} />
            <span>Raw</span>
          </button>
        </div>

        <div className="hidden sm:block text-xs text-white/40 truncate max-w-[200px] font-mono">
          {appWindow.title}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm hover:bg-white/10 transition-colors text-white/70"
        >
          {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-[#1E1E1E]">
        {!parsedData ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
              <span className="text-red-500 font-bold text-xl">!</span>
            </div>
            <div className="text-white font-medium mb-2">Invalid JSON</div>
            <div className="text-sm text-white/60">The provided file could not be parsed as JSON.</div>
            <div className="mt-6 p-4 bg-black/40 rounded-lg text-left font-mono text-sm text-red-400 max-w-lg w-full overflow-x-auto">
              {rawContent.slice(0, 200)}...
            </div>
          </div>
        ) : (
          viewMode === 'tree' ? (
            <div className="p-4 custom-scrollbar">
              <JsonTree data={parsedData} />
            </div>
          ) : (
            <JsonRawView data={parsedData} />
          )
        )}
      </div>
    </div>
  );
}
