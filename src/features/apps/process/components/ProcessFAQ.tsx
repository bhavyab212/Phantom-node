import { useState } from 'react';
import { PROCESS_FAQS } from '../process-data';
import { StorySection } from '../../../story/components/StorySection';
import { ChevronDown } from 'lucide-react';
import { useWindowStore } from '../../../window-manager/useWindowStore';

import { APP_REGISTRY } from '../../../window-manager/window-registry';

export function ProcessFAQ() {
  const [openId, setOpenId] = useState<string | null>(PROCESS_FAQS[0]?.id || null);
  const { openApp } = useWindowStore();

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <StorySection id="process-faq" eyebrow="FAQ" title="Common questions">
      <div className="flex flex-col gap-4 max-w-3xl">
        {PROCESS_FAQS.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div 
              key={faq.id} 
              className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden transition-colors hover:bg-white/[0.04]"
            >
              <button
                onClick={() => toggleOpen(faq.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:bg-white/[0.05]"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className="text-lg font-medium text-white/90 pr-8">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-white/40 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                />
              </button>
              <div 
                id={`faq-answer-${faq.id}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-6 pt-2 text-white/60 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
        
        <div className="mt-8 text-center text-white/60">
          Still have questions?{' '}
          <button 
            onClick={() => {
              const entry = APP_REGISTRY['contact'];
              if (entry) openApp('contact', entry.title, { width: entry.defaultWidth, height: entry.defaultHeight, x: entry.defaultX, y: entry.defaultY });
            }}
            className="text-[var(--accent-color,#3b82f6)] hover:underline focus:outline-none"
          >
            Contact us
          </button>
        </div>
      </div>
    </StorySection>
  );
}
