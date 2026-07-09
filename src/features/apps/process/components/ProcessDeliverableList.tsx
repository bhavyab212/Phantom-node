import { CheckCircle2, ArrowRight } from 'lucide-react';

interface ProcessDeliverableListProps {
  items: string[];
  variant: 'deliverable' | 'responsibility';
}

export function ProcessDeliverableList({ items, variant }: ProcessDeliverableListProps) {
  if (!items || items.length === 0) return null;

  return (
    <ul className="flex flex-col gap-4">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          {variant === 'deliverable' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-[var(--accent-color,#3b82f6)]" />
          ) : (
            <ArrowRight className="w-5 h-5 shrink-0 mt-0.5 text-white/30" />
          )}
          <span className={`text-base leading-relaxed ${variant === 'deliverable' ? 'text-white/90' : 'text-white/60'}`}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
