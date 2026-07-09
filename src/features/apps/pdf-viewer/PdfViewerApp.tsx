import { useState, useEffect, useRef, useCallback } from 'react';
import { WindowInstance } from '../../window-manager/useWindowStore';
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Loader2, Maximize, RotateCcw } from 'lucide-react';
import type { PDFDocumentProxy } from 'pdfjs-dist';

interface PdfViewerAppProps {
  window: WindowInstance;
}

export default function PdfViewerApp({ window: appWindow }: PdfViewerAppProps) {
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const pdfUrl = appWindow.fileContext?.url || 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf';

  useEffect(() => {
    let isMounted = true;
    
    const loadPdf = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Dynamically import pdfjs-dist to avoid Next.js SSR 'DOMMatrix is not defined' error
        const pdfjsLib = await import('pdfjs-dist');

        if (!pdfjsLib.GlobalWorkerOptions.workerSrc || !pdfjsLib.GlobalWorkerOptions.workerSrc.includes('pdf.worker')) {
            // Match the worker version EXACTLY to the API version to prevent mismatch errors
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
        }

        // Create a proper URL object which satisfies strict URL checks in newer pdfjs versions
        const documentUrl = new URL(pdfUrl, window.location.origin);
        
        const loadingTask = pdfjsLib.getDocument({ url: documentUrl.href });
        const pdf = await loadingTask.promise;
        
        if (isMounted) {
          setPdfDoc(pdf);
          setNumPages(pdf.numPages);
          setPageNum(1);
          setLoading(false);
        }
      } catch (err: any) {
        console.error('Error loading PDF:', err);
        if (isMounted) {
          setError(err.message || 'Failed to load PDF.');
          setLoading(false);
        }
      }
    };

    loadPdf();

    return () => {
      isMounted = false;
    };
  }, [pdfUrl]);

  const renderPage = useCallback(async () => {
    if (!pdfDoc || !canvasRef.current) return;

    try {
      const page = await pdfDoc.getPage(pageNum);
      
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      if (!context) return;

      const viewport = page.getViewport({ scale });
      
      // Handle high-DPI screens
      const outputScale = window.devicePixelRatio || 1;
      
      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = Math.floor(viewport.width) + "px";
      canvas.style.height =  Math.floor(viewport.height) + "px";

      const transform = outputScale !== 1
        ? [outputScale, 0, 0, outputScale, 0, 0]
        : undefined;

      if (renderTaskRef.current) {
        await renderTaskRef.current.cancel();
      }

      const renderContext = {
        canvasContext: context,
        transform: transform,
        viewport: viewport,
        canvas: canvas
      };
      
      const renderTask = page.render(renderContext);
      renderTaskRef.current = renderTask;
      
      await renderTask.promise;
      renderTaskRef.current = null;
    } catch (err: any) {
      if (err.name !== 'RenderingCancelledException') {
        console.error('Error rendering page:', err);
      }
    }
  }, [pdfDoc, pageNum, scale]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      renderPage();
    }
    return () => {
      isMounted = false;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [renderPage]);

  const onPrevPage = () => {
    if (pageNum <= 1) return;
    setPageNum(prev => prev - 1);
  };

  const onNextPage = () => {
    if (pageNum >= numPages) return;
    setPageNum(prev => prev + 1);
  };

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 3.0));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));
  
  const handleFitWidth = async () => {
    if (!pdfDoc || !containerRef.current) return;
    try {
      const page = await pdfDoc.getPage(pageNum);
      // Get unscaled viewport width
      const viewport = page.getViewport({ scale: 1.0 });
      // Subtract padding (approx 64px for px-8)
      const containerWidth = containerRef.current.clientWidth - 64;
      const newScale = containerWidth / viewport.width;
      setScale(Math.max(0.5, Math.min(newScale, 3.0)));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-[#323639] text-white/90 select-none">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#323639] border-b border-black/40 shadow-sm z-10">
        
        {/* Pagination Controls */}
        <div className="flex items-center space-x-1">
          <button 
            onClick={onPrevPage} 
            disabled={pageNum <= 1 || loading || !!error}
            className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 transition-colors"
            title="Previous Page"
          >
            <ChevronLeft size={18} />
          </button>
          
          <div className="flex items-center px-2 bg-black/20 rounded h-7 text-sm font-medium">
            <span className="w-8 text-center">{loading ? '-' : pageNum}</span>
            <span className="text-white/40 px-1">/</span>
            <span className="w-8 text-center text-white/60">{loading ? '-' : numPages}</span>
          </div>
          
          <button 
            onClick={onNextPage} 
            disabled={pageNum >= numPages || loading || !!error}
            className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 transition-colors"
            title="Next Page"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Optional Metadata Center */}
        <div className="hidden sm:block text-xs text-white/40 truncate max-w-[200px]">
          {appWindow.title}
        </div>
        
        {/* Zoom Controls */}
        <div className="flex items-center space-x-1">
          <button 
            onClick={handleZoomOut} 
            disabled={loading || !!error || scale <= 0.5}
            className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={18} />
          </button>
          
          <div className="text-sm font-medium w-14 text-center">
            {Math.round(scale * 100)}%
          </div>
          
          <button 
            onClick={handleZoomIn} 
            disabled={loading || !!error || scale >= 3.0}
            className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={18} />
          </button>
          
          <div className="w-px h-4 bg-white/20 mx-1" />
          
          <button 
            onClick={handleFitWidth} 
            disabled={loading || !!error}
            className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 transition-colors"
            title="Fit to Width"
          >
            <Maximize size={16} />
          </button>
          <button 
            onClick={() => setScale(1.0)} 
            disabled={loading || !!error || scale === 1.0}
            className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 transition-colors"
            title="Actual Size"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Document Area */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto bg-[#525659] custom-scrollbar flex items-start justify-center p-8 relative"
      >
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <Loader2 className="w-8 h-8 text-blue-400 animate-spin mb-4" />
            <div className="text-sm text-white/70">Loading document...</div>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-8 text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
              <span className="text-red-500 font-bold text-xl">!</span>
            </div>
            <div className="text-white font-medium mb-2">Failed to load document</div>
            <div className="text-sm text-white/60 max-w-md">{error}</div>
            {/* Fallback Display */}
            <div className="mt-8 p-8 bg-white text-black max-w-3xl w-full text-left shadow-2xl">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">{appWindow.title} (Fallback View)</h2>
              <p className="mb-4">This is a fallback view because the PDF worker failed to load. Ensure CORS is enabled on the URL or the worker script is accessible.</p>
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center border border-dashed border-gray-300 text-gray-400">PDF Content Area</div>
            </div>
          </div>
        )}

        <div className={`relative transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          <canvas 
            ref={canvasRef} 
            className="shadow-2xl bg-white"
            style={{ maxWidth: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}
