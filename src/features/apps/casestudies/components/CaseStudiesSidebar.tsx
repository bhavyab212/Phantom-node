import React from 'react';
import { NativeAppSidebar, SidebarItem } from '@/features/native-app-shell';
import { Filter, Briefcase, Bot, LayoutTemplate } from 'lucide-react';
import { CASE_STUDIES } from '../data';

export interface CaseStudiesSidebarProps {
  activeCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export const CaseStudiesSidebar: React.FC<CaseStudiesSidebarProps> = ({ activeCategory, onSelectCategory }) => {
  // Extract unique categories from data
  const categories = Array.from(new Set(CASE_STUDIES.map(cs => cs.category)));

  // Simple icon mapping based on category text (fallback to Briefcase)
  const getIconForCategory = (cat: string) => {
    const lower = cat.toLowerCase();
    if (lower.includes('ai')) return <Bot />;
    if (lower.includes('workflow') || lower.includes('operations')) return <LayoutTemplate />;
    return <Briefcase />;
  };

  return (
    <NativeAppSidebar>
      <div className="flex flex-col gap-1 mt-4">
        <SidebarItem
          id="all"
          label="All Projects"
          icon={<Filter />}
          isActive={activeCategory === null}
          onClick={() => onSelectCategory(null)}
          badge={CASE_STUDIES.length}
        />
        
        <div className="my-2 border-t border-[var(--glass-border)] mx-4" />
        
        {categories.map(cat => {
          const count = CASE_STUDIES.filter(cs => cs.category === cat).length;
          return (
            <SidebarItem
              key={cat}
              id={cat}
              label={cat}
              icon={getIconForCategory(cat)}
              isActive={activeCategory === cat}
              onClick={() => onSelectCategory(cat)}
              badge={count}
            />
          );
        })}
      </div>
    </NativeAppSidebar>
  );
};
