import { motion } from 'framer-motion';

export interface SectionDef {
  id: string;
  label: string;
}

interface StorySectionNavProps {
  sections: SectionDef[];
  activeSectionId: string;
  onNavigate: (id: string) => void;
}

export function StorySectionNav({ sections, activeSectionId, onNavigate }: StorySectionNavProps) {
  if (sections.length === 0) return null;

  return (
    <nav className="hidden md:flex sticky top-8 z-40 bg-[#121212]/80 backdrop-blur-md border border-white/10 rounded-2xl px-2 py-2 mb-12 shadow-2xl self-start">
      <ul className="flex items-center gap-1">
        {sections.map(section => {
          const isActive = section.id === activeSectionId;
          return (
            <li key={section.id}>
              <button
                onClick={() => onNavigate(section.id)}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-section-pill"
                    className="absolute inset-0 bg-white/10 rounded-xl"
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  />
                )}
                <span className="relative z-10">{section.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
