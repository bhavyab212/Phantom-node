import React, { useState, useRef, useEffect } from 'react';
import { Info, X, Lightbulb, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { QuestionHelpRecord } from '../../lib/useQuestionHelp';

interface QuestionHelpTriggerProps {
  record: QuestionHelpRecord;
}

export const QuestionHelpTrigger: React.FC<QuestionHelpTriggerProps> = ({ record }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        isOpen &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Handle interaction delays for hover
  let timeoutId: NodeJS.Timeout;
  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsOpen(true);
  };
  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => setIsOpen(false), 300);
  };

  return (
    <div className="relative inline-flex items-center ml-3 align-middle">
      <style dangerouslySetInnerHTML={{ __html: `
        .help-trigger-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 9999px;
          box-shadow: 2px 2px 0px rgba(0,0,0,0.03);
          color: #9ca3af;
          position: relative;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          height: 32px;
          padding: 0 8px;
          max-width: 32px;
        }
        
        .help-trigger-btn:hover, .help-trigger-btn:focus-visible {
          background-color: #ffffff;
          border-color: #d1d5db;
          transform: translate(-2px, -2px) rotate(1deg);
          box-shadow: 4px 4px 0 rgba(0,0,0,0.06), 6px 6px 12px rgba(0,0,0,0.04);
          color: #4b5563;
          max-width: 140px; 
          outline: none;
        }

        .help-trigger-btn::before {
          content: "";
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
          transition: 0.6s;
          left: -100%;
        }

        .help-trigger-btn:hover::before, .help-trigger-btn:focus-visible::before {
          animation: swipeRight 1.5s infinite;
        }

        @keyframes swipeRight {
          100% {
            transform: translateX(200%) skew(-45deg);
          }
        }

        .help-icon {
          width: 16px;
          height: 16px;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          z-index: 3;
          flex-shrink: 0;
        }

        @keyframes spin-and-zoom-soft {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); color: #eab308; } 
          100% { transform: rotate(360deg) scale(1); }
        }

        .help-trigger-btn:hover .help-icon, .help-trigger-btn:focus-visible .help-icon {
          animation: spin-and-zoom-soft 4s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
        }

        .help-text-reveal {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
          opacity: 0;
          width: 0;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          z-index: 3;
          padding-left: 0;
        }

        .help-trigger-btn:hover .help-text-reveal, .help-trigger-btn:focus-visible .help-text-reveal {
          opacity: 1;
          width: auto;
          padding-left: 6px;
        }
      `}} />
      <button
        ref={triggerRef}
        type="button"
        className="help-trigger-btn"
        aria-label="Why we ask this question"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
      >
        <Info className="help-icon" />
        <span className="help-text-reveal">Why?</span>
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="fixed inset-x-0 bottom-0 z-50 md:absolute md:inset-auto md:bottom-full md:left-1/2 md:-translate-x-1/2 md:mb-3 md:w-[340px] w-full animate-in fade-in slide-in-from-bottom-4 md:slide-in-from-bottom-2 duration-200"
          role="dialog"
          aria-modal="false"
        >
          {/* Mobile backdrop for better focus, hidden on desktop */}
          <div className="fixed inset-0 bg-black/10 md:hidden -z-10" aria-hidden="true" onClick={() => setIsOpen(false)} />
          
          <div className="bg-white/95 backdrop-blur-md border border-gray-200 shadow-xl rounded-t-2xl md:rounded-xl p-5 w-full max-h-[85vh] overflow-y-auto custom-scrollbar flex flex-col gap-4">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                {record.hoverTitle || 'Why we ask this'}
              </h4>
              <button 
                className="md:hidden p-2 -mr-2 text-gray-400 hover:text-gray-700 rounded-full bg-gray-50 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
                aria-label="Close help"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-[13px] leading-relaxed text-gray-700 flex flex-col gap-3 font-medium">
              {record.about && <p>{record.about}</p>}
              {record.detail && <p className="text-gray-500 font-normal">{record.detail}</p>}
            </div>

            {(record.whatGoodAnswerLooksLike || record.exampleAnswer) && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex flex-col gap-2 shadow-inner">
                {record.whatGoodAnswerLooksLike && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5 mb-1.5">
                      <Target className="w-3 h-3" />
                      What a useful answer looks like
                    </span>
                    <p className="text-[13px] text-gray-800 font-semibold">{record.whatGoodAnswerLooksLike}</p>
                  </div>
                )}
                {record.exampleAnswer && (
                  <div className={cn(record.whatGoodAnswerLooksLike && "mt-3 pt-3 border-t border-gray-200")}>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 block">
                      Example
                    </span>
                    <p className="text-[13px] text-gray-600 italic">"{record.exampleAnswer.replace(/^Example:\s*/i, '').replace(/^"|"$/g, '')}"</p>
                  </div>
                )}
              </div>
            )}

            {record.privacyNote && (
              <p className="text-[10px] text-gray-400 mt-2 text-center opacity-80">
                {record.privacyNote}
              </p>
            )}
            
            {/* Down arrow for desktop popover */}
            <div className="hidden md:block absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-b border-r border-gray-200"></div>
          </div>
        </div>
      )}
    </div>
  );
};
