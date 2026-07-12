import { motion } from 'framer-motion';
import { ArrowRight, Clock, Banknote } from 'lucide-react';
import { Service } from '../services-data';

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
  index: number;
}

export default function ServiceCard({ service, onClick, index }: ServiceCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`View details for ${service.title}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: 'easeOut' }}
      whileHover={{ y: -2 }}
      className={`
        group w-full text-left p-5 rounded-2xl border transition-all duration-200 outline-none
        focus-visible:ring-2 focus-visible:ring-[var(--accent-color,#3b82f6)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1C1E]
        ${service.featured
          ? 'bg-gradient-to-br from-[var(--accent-color,#3b82f6)]/10 to-[var(--accent-color,#3b82f6)]/5 border-[var(--accent-color,#3b82f6)]/30 hover:border-[var(--accent-color,#3b82f6)]/50 hover:shadow-[0_8px_32px_rgba(var(--accent-color-rgb,59,130,246),0.12)]'
          : 'bg-white/[0.04] border-white/8 hover:bg-white/[0.07] hover:border-white/15 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]'
        }
      `}
    >
      {/* Featured badge */}
      {service.featured && (
        <div className="mb-3">
          <span
            className="inline-block text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: 'rgba(var(--accent-color-rgb,59,130,246),0.15)',
              color: 'var(--accent-color,#3b82f6)',
            }}
          >
            Most popular
          </span>
        </div>
      )}

      {/* Title + arrow */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-base font-semibold text-white/90 leading-snug">{service.title}</h3>
        <ArrowRight
          size={16}
          className="flex-shrink-0 mt-0.5 text-white/30 group-hover:text-white/70 group-hover:translate-x-0.5 transition-all"
        />
      </div>

      {/* One-liner */}
      <p className="text-sm text-white/55 leading-relaxed mb-4 line-clamp-2">{service.oneLine}</p>

      {/* Metadata row */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-1.5 flex-1 justify-end min-w-0">
          <Banknote size={12} className="text-white/35 flex-shrink-0" />
          <span className="text-xs font-medium text-white/60 truncate">{service.priceLabel}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={12} className="text-white/35 flex-shrink-0" />
          <span className="text-xs font-medium text-white/60">{service.timelineEstimate}</span>
        </div>
      </div>
    </motion.button>
  );
}
