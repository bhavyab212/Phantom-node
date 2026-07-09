import { create } from 'zustand';

interface CommandPaletteState {
  isOpen: boolean;
  query: string;
  selectedIndex: number;
  recentSelections: string[]; // Keep in-memory only for privacy & simplicity
  
  open: () => void;
  close: () => void;
  toggle: () => void;
  setQuery: (q: string) => void;
  setSelectedIndex: (i: number) => void;
  moveSelectionUp: (maxIndex: number) => void;
  moveSelectionDown: (maxIndex: number) => void;
  resetSelection: () => void;
  addRecent: (id: string) => void;
}

export const useCommandPalette = create<CommandPaletteState>((set, get) => ({
  isOpen: false,
  query: '',
  selectedIndex: 0,
  recentSelections: [],
  
  open: () => set({ isOpen: true, query: '', selectedIndex: 0 }),
  
  close: () => {
    set({ isOpen: false });
    // Clear query slightly after closing so the exit animation doesn't flash empty state
    setTimeout(() => {
      set({ query: '', selectedIndex: 0 });
    }, 200);
  },
  
  toggle: () => {
    const { isOpen, open, close } = get();
    if (isOpen) close();
    else open();
  },
  
  setQuery: (query) => set({ query, selectedIndex: 0 }), // Reset selection when query changes
  
  setSelectedIndex: (selectedIndex) => set({ selectedIndex }),
  
  moveSelectionUp: (maxIndex) => set((state) => ({
    selectedIndex: state.selectedIndex > 0 ? state.selectedIndex - 1 : maxIndex
  })),
  
  moveSelectionDown: (maxIndex) => set((state) => ({
    selectedIndex: state.selectedIndex < maxIndex ? state.selectedIndex + 1 : 0
  })),
  
  resetSelection: () => set({ selectedIndex: 0 }),
  
  addRecent: (id) => set((state) => {
    const withoutCurrent = state.recentSelections.filter(r => r !== id);
    return {
      recentSelections: [id, ...withoutCurrent].slice(0, 5) // Keep max 5 recent items
    };
  })
}));
