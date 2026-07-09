import React, { useEffect, useRef, useMemo } from 'react';
import { CommandPaletteResultItem } from './CommandPaletteResultItem';
import { CommandPaletteEmptyState } from './CommandPaletteEmptyState';
import { SearchResultItem } from './search-utils';

interface CommandPaletteResultsProps {
  query: string;
  results: SearchResultItem[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export function CommandPaletteResults({ query, results, selectedIndex, onSelect }: CommandPaletteResultsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to keep selected item visible
  useEffect(() => {
    if (!scrollRef.current) return;
    const selectedEl = scrollRef.current.querySelector(`[aria-selected="true"]`) as HTMLElement;
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  // Group results by type
  const groupedResults = useMemo(() => {
    if (results.length === 0) return null;
    
    const groups: Record<string, { items: SearchResultItem[], startIndex: number }> = {};
    let currentIndex = 0;
    
    results.forEach((item) => {
      let groupName = 'Other';
      if (item.type === 'action') groupName = 'Actions';
      else if (item.type === 'app') groupName = 'Pages';
      else if (item.type === 'case-study') groupName = 'Case Studies';
      else if (item.type === 'service') groupName = 'Services';
      else if (item.type === 'document') groupName = 'Documents';
      else if (item.type === 'section') groupName = 'Sections';
      else if (item.type === 'testimonial') groupName = 'Testimonials';
      
      if (!groups[groupName]) {
        groups[groupName] = { items: [], startIndex: currentIndex };
      }
      
      groups[groupName].items.push(item);
      currentIndex++;
    });
    
    return groups;
  }, [results]);

  if (query && results.length === 0) {
    return <CommandPaletteEmptyState query={query} />;
  }
  
  if (!groupedResults) return null;
  
  const groupKeys = Object.keys(groupedResults);
  const showGroupHeadings = groupKeys.length > 1;

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto custom-scrollbar max-h-[400px] p-2"
      role="listbox"
    >
      {groupKeys.map((groupName) => {
        const group = groupedResults[groupName];
        return (
          <div key={groupName} className="mb-2 last:mb-0">
            {showGroupHeadings && (
              <div className="px-4 py-2 text-[11px] font-semibold tracking-wider text-white/30 uppercase select-none">
                {groupName}
              </div>
            )}
            <div className="flex flex-col gap-1">
              {group.items.map((item, localIdx) => {
                const globalIdx = group.startIndex + localIdx;
                return (
                  <CommandPaletteResultItem
                    key={item.id}
                    item={item}
                    isSelected={globalIdx === selectedIndex}
                    onSelect={() => onSelect(globalIdx)}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
