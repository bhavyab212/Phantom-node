import { ReactNode } from 'react';

interface StorySectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  sideNote?: ReactNode;
  className?: string;
}

export function StorySection({ id, eyebrow, title, children, sideNote, className = '' }: StorySectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 border-t border-white/5 first:border-0 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
        <div className="md:col-span-8">
          {eyebrow && (
            <div className="text-[var(--accent-color,#3b82f6)] text-xs uppercase tracking-widest font-semibold mb-4">
              {eyebrow}
            </div>
          )}
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white/95 mb-8">
            {title}
          </h2>
          <div className="prose prose-invert prose-lg max-w-none text-white/70">
            {children}
          </div>
        </div>
        
        {sideNote && (
          <div className="md:col-span-4 flex flex-col pt-2 md:pt-16">
            <div className="sticky top-32 p-6 rounded-2xl bg-white/5 border border-white/10">
              {sideNote}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
