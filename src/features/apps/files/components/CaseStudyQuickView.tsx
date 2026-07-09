import { motion } from 'framer-motion';
import { X, ExternalLink, MessageSquare, CheckCircle2, Quote, Layout, FileText } from 'lucide-react';
import { CaseStudy } from '../case-studies-data';
import { useWindowStore } from '../../../window-manager/useWindowStore';
import { APP_REGISTRY } from '../../../window-manager/window-registry';

interface CaseStudyQuickViewProps {
  caseStudy: CaseStudy;
  onClose: () => void;
  onOpenFull: () => void;
  onStartSimilar: () => void;
}

export function CaseStudyQuickView({ 
  caseStudy, 
  onClose, 
  onOpenFull, 
  onStartSimilar 
}: CaseStudyQuickViewProps) {
  const { openApp } = useWindowStore();

  const handleOpenStory = () => {
    const workEntry = APP_REGISTRY['work'];
    if (!workEntry) return;

    openApp('work', workEntry.title, {
      width: workEntry.defaultWidth,
      height: workEntry.defaultHeight,
      x: workEntry.defaultX,
      y: workEntry.defaultY,
    }, { initialIntent: caseStudy.id });
    
    onClose();
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } }}
        exit={{ x: '100%', transition: { ease: 'easeIn', duration: 0.2 } }}
        className="w-[500px] h-full bg-[#1a1a1a] border-l border-white/10 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 flex-shrink-0">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">
              {caseStudy.category} • {caseStudy.year}
            </div>
            <h2 className="text-xl font-semibold text-white/95">{caseStudy.projectName}</h2>
            <p className="text-sm text-white/50">{caseStudy.clientName}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-white/90 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
          
          <section>
            <p className="text-[15px] leading-relaxed text-white/80 font-medium">
              {caseStudy.summary}
            </p>
          </section>

          <div className="grid grid-cols-2 gap-6">
            <section>
              <h3 className="text-xs uppercase tracking-widest text-white/40 mb-2">The Problem</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {caseStudy.problem}
              </p>
            </section>
            <section>
              <h3 className="text-xs uppercase tracking-widest text-white/40 mb-2">Our Approach</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {caseStudy.approach}
              </p>
            </section>
          </div>

          <section className="bg-white/5 border border-white/5 rounded-xl p-5">
            <h3 className="text-xs uppercase tracking-widest text-[var(--accent-color,#3b82f6)] mb-4">
              Key Results
            </h3>
            <ul className="space-y-3">
              {caseStudy.results.map((result, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[var(--accent-color,#3b82f6)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white/90 font-medium">{result}</span>
                </li>
              ))}
            </ul>
          </section>

          {caseStudy.testimonialQuote && (
            <section className="relative px-6 py-4">
              <Quote size={24} className="absolute top-0 left-0 text-white/10" />
              <p className="text-sm italic text-white/70 leading-relaxed relative z-10 mb-3">
                "{caseStudy.testimonialQuote}"
              </p>
              <p className="text-xs font-semibold text-white/50">
                — {caseStudy.testimonialAuthor}
              </p>
            </section>
          )}

        </div>

        {/* Footer actions */}
        <div className="p-6 border-t border-white/5 space-y-3 flex-shrink-0 bg-[#1a1a1a]">
          <div className="flex gap-3">
            <button 
              onClick={handleOpenStory}
              className="flex-1 py-3 px-4 bg-[var(--accent-color,#3b82f6)] hover:bg-[var(--accent-color,#3b82f6)]/90 text-white rounded-xl text-sm font-medium transition-colors border border-white/10 flex items-center justify-center gap-2"
            >
              <Layout size={18} />
              Open story view
            </button>
            <button 
              onClick={() => {
                onOpenFull();
                onClose();
              }}
              className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 text-white/90 rounded-xl text-sm font-medium transition-colors border border-white/10 flex items-center justify-center gap-2"
            >
              <FileText size={18} className="text-white/50" />
              Open source file
            </button>
          </div>
          <button 
            onClick={() => {
              onStartSimilar();
              onClose();
            }}
            className="w-full py-3 px-4 rounded-xl text-sm text-white font-medium transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, var(--accent-color,#3b82f6), color-mix(in srgb, var(--accent-color,#3b82f6) 80%, #818cf8))',
              boxShadow: '0 4px 12px rgba(var(--accent-color-rgb,59,130,246),0.2)',
            }}
          >
            <MessageSquare size={16} />
            Start similar project
          </button>
        </div>

      </motion.div>
    </motion.div>
  );
}
