import { useMemo, useState } from 'react';
import { GLOBAL_CONTENT_INDEX, ContentItem } from './story-data';
import { useWindowStore } from '../window-manager/useWindowStore';
import { APP_REGISTRY } from '../window-manager/window-registry';

export function useGlobalContentIndex() {
  const [searchQuery, setSearchQuery] = useState('');
  const { openApp, windows, focusWindow, restoreWindow } = useWindowStore();

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return GLOBAL_CONTENT_INDEX.filter(item => 
      item.label.toLowerCase().includes(query) || 
      item.keywords.some(k => k.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const executeAction = (item: ContentItem) => {
    const appEntry = APP_REGISTRY[item.targetApp];
    if (!appEntry) return;

    // Pass context based on item type
    let fileContext = undefined;
    let targetContext = item.targetContext;
    
    if (item.actionIntent) {
      fileContext = { initialIntent: item.actionIntent };
    } else if (item.targetSectionId) {
      fileContext = { scrollToSection: item.targetSectionId };
    } else if (item.relatedFileId) {
      fileContext = { highlightFileId: item.relatedFileId }; // We can handle this later in Files app
    }

    const existingWindow = windows.find(w => w.appId === item.targetApp);

    if (existingWindow) {
      if (existingWindow.isMinimized) {
        restoreWindow(existingWindow.instanceId);
      } else {
        focusWindow(existingWindow.instanceId);
      }
      // If we had context, we might need a way to pass it to an already open window, 
      // but for now re-opening with the context will update it in the store
      if (fileContext || targetContext) {
        openApp(item.targetApp, appEntry.title, {}, fileContext, targetContext);
      }
    } else {
      openApp(item.targetApp, appEntry.title, {
        width: appEntry.defaultWidth,
        height: appEntry.defaultHeight,
        x: appEntry.defaultX,
        y: appEntry.defaultY
      }, fileContext, targetContext);
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    executeAction
  };
}
