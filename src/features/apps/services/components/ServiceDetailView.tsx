import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Clock, Banknote, Users } from 'lucide-react';
import { Service } from '../services-data';
import { useWindowStore } from '../../../window-manager/useWindowStore';
import { useContactFormStore } from '../../contact/useContactFormStore';
import { APP_REGISTRY } from '../../../window-manager/window-registry';

interface ServiceDetailViewProps {
  service: Service;
  onBack: () => void;
}

export default function ServiceDetailView({ service, onBack }: ServiceDetailViewProps) {
  const { windows, openApp, focusWindow, restoreWindow } = useWindowStore();
  const answeredQuestionIds = useContactFormStore(s => s.answeredQuestionIds);

  useEffect(() => {
    import('../../../../lib/analytics').then(({ trackServiceDetailOpened }) => {
      trackServiceDetailOpened(service.id, service.title, 'services_grid');
    });
  }, [service.id, service.title]);

  const handleGetQuote = () => {
    import('../../../../lib/analytics').then(({ trackServiceContactRequested }) => {
      trackServiceContactRequested(service.id, service.title, 'service_detail_sticky_bar');
    });
    
    const contactEntry = APP_REGISTRY['contact'];
    if (!contactEntry) return;

    const existingContact = windows.find(w => w.appId === 'contact');

    if (existingContact) {
      // Contact is already open — check if user has not answered any questions yet (step 1)
      const isOnStep1 = answeredQuestionIds.length === 0;

      if (isOnStep1) {
        // Safe to update intent — pass new initialIntent through fileContext
        openApp('contact', contactEntry.title, {
          width: contactEntry.defaultWidth,
          height: contactEntry.defaultHeight,
          x: contactEntry.defaultX,
          y: contactEntry.defaultY,
        }, { initialIntent: service.id });
      } else {
        // User is mid-flow — just focus the window, don't overwrite
        if (existingContact.isMinimized) {
          restoreWindow(existingContact.instanceId);
        } else {
          focusWindow(existingContact.instanceId);
        }
      }
    } else {
      // Contact not open — open fresh with pre-fill
      openApp('contact', contactEntry.title, {
        width: contactEntry.defaultWidth,
        height: contactEntry.defaultHeight,
        x: contactEntry.defaultX,
        y: contactEntry.defaultY,
      }, { initialIntent: service.id });
    }
  };

  return (
    <motion.div
      key={service.id}
      initial={{ x: 32, opacity: 0 }}
      animate={{ x: 0, opacity: 1, transition: { duration: 0.28, ease: 'easeOut' } }}
      exit={{ x: -32, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
      className="flex flex-col h-full w-full"
    >
      {/* Back button + breadcrumb */}
      <div className="flex items-center gap-2 mb-5 flex-shrink-0">
        <button
          onClick={onBack}
          aria-label="Back to all services"
          className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white/90 transition-colors group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Services</span>
        </button>
        <span className="text-white/20">/</span>
        <span className="text-sm text-white/70 truncate">{service.title}</span>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar min-h-0 pr-1 space-y-6">

        {/* Title + featured badge */}
        <div>
          {service.featured && (
            <div className="mb-2">
              <span
                className="inline-block text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: 'rgba(var(--accent-color-rgb,59,130,246),0.12)',
                  color: 'var(--accent-color,#3b82f6)',
                }}
              >
                Most popular
              </span>
            </div>
          )}
          <h2 className="text-2xl font-bold text-white/95 leading-tight mb-3">{service.title}</h2>
          <p className="text-sm text-white/65 leading-relaxed">{service.description}</p>
        </div>

        {/* Metadata pills */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Banknote size={13} className="text-white/50" />
            <span className="text-sm font-medium text-white/80 whitespace-nowrap">{service.priceLabel}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8">
            <Clock size={13} className="text-white/50" />
            <span className="text-sm font-medium text-white/80">{service.timelineEstimate}</span>
          </div>
        </div>

        {/* Best for */}
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/6">
          <Users size={14} className="text-white/40 mt-0.5 flex-shrink-0" />
          <div>
            <span className="text-xs font-semibold text-white/35 uppercase tracking-wider">Best for</span>
            <p className="text-sm text-white/70 mt-0.5 leading-relaxed">{service.bestFor}</p>
          </div>
        </div>

        {/* Deliverables */}
        {service.deliverables.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-white/35 uppercase tracking-widest mb-3">
              What's included
            </h3>
            <ul className="space-y-2" aria-label="Deliverables">
              {service.deliverables.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: 'rgba(var(--accent-color-rgb,59,130,246),0.15)' }}
                  >
                    <Check size={11} style={{ color: 'var(--accent-color,#3b82f6)' }} />
                  </div>
                  <span className="text-sm text-white/75 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Process Link */}
        <div className="pt-2">
          <button
            onClick={() => {
              const entry = APP_REGISTRY['process'];
              if (entry) openApp('process', entry.title, { width: entry.defaultWidth, height: entry.defaultHeight, x: entry.defaultX, y: entry.defaultY });
            }}
            className="text-[13px] font-medium text-white/40 hover:text-white/80 transition-colors flex items-center gap-1.5 focus:outline-none"
          >
            How this works <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="flex-shrink-0 pt-4 mt-4 border-t border-white/6">
        <button
          onClick={handleGetQuote}
          aria-label={`Get a quote for ${service.title}`}
          className="w-full py-3 rounded-xl font-semibold text-sm text-white tracking-wide transition-all active:scale-[0.99] flex items-center justify-center gap-2 group"
          style={{
            background: 'linear-gradient(135deg, var(--accent-color,#3b82f6), color-mix(in srgb, var(--accent-color,#3b82f6) 80%, #818cf8))',
            boxShadow: '0 4px 20px rgba(var(--accent-color-rgb,59,130,246),0.25)',
          }}
        >
          Get a quote for {service.title}
          <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
