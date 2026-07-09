import React, { useEffect, useRef, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommandPalette } from './useCommandPalette';
import { usePaletteKeyboard } from './usePaletteKeyboard';
import { CommandPaletteInput } from './CommandPaletteInput';
import { CommandPaletteResults } from './CommandPaletteResults';
import { CommandPaletteFooter } from './CommandPaletteFooter';
import { searchAll, SearchResultItem } from './search-utils';
import { PALETTE_COMMANDS } from './commands-data';
import { useGlobalContentIndex } from '../story/useGlobalContentIndex';
import { GLOBAL_CONTENT_INDEX } from '../story/story-data';
import { useWindowStore } from '../window-manager/useWindowStore';
import { APP_REGISTRY } from '../window-manager/window-registry';

export default function CommandPalette() {
  const { 
    isOpen, query, selectedIndex, recentSelections, 
    close, setQuery, setSelectedIndex, addRecent 
  } = useCommandPalette();
  
  const { executeAction: executeContentAction } = useGlobalContentIndex();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Keep track of the previously focused element to restore focus on close
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Focus input on next tick
      setTimeout(() => inputRef.current?.focus(), 10);
    } else {
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
    }
  }, [isOpen]);

  // Compute search results based on query
  const results = useMemo(() => {
    if (!query.trim()) {
      // Empty state: show recent + quick actions
      const items: SearchResultItem[] = [];
      
      // Quick actions (default)
      const quickActionIds = ['cmd-open-contact', 'cmd-open-work', 'cmd-open-services', 'cmd-open-process'];
      
      // Add quick actions
      const quickActions = PALETTE_COMMANDS
        .filter(c => quickActionIds.includes(c.id))
        .map(c => ({ ...c, score: 0 })); // score doesn't matter for empty state
      
      // We could add recents here if we want to show them first
      
      return quickActions;
    }
    
    // Perform search
    return searchAll(query, GLOBAL_CONTENT_INDEX, PALETTE_COMMANDS);
  }, [query]);

  const executeAction = (index: number) => {
    const item = results[index];
    if (!item) return;

    if (item.type === 'action') {
      // It's a palette command
      (item as any).action();
    } else {
      // It's a content index item
      executeContentAction(item as any);
    }

    addRecent(item.id);
    close();
  };

  usePaletteKeyboard({
    resultCount: results.length,
    onExecute: executeAction,
    containerRef,
    inputRef
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={close}
          />
          
          {/* Palette Container */}
          <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Search and commands"
            initial={{ opacity: 0, y: -8, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[560px] mx-4 bg-[#1a1a1a]/95 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-xl overflow-hidden flex flex-col"
          >
            <CommandPaletteInput 
              query={query} 
              setQuery={setQuery} 
              inputRef={inputRef} 
            />
            
            <CommandPaletteResults
              query={query}
              results={results}
              selectedIndex={selectedIndex}
              onSelect={executeAction}
            />
            
            <CommandPaletteFooter />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
