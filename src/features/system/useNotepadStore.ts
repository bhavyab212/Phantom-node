import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface NotepadState {
  documents: Record<string, string>; // fileId -> text content
  unsavedDrafts: Record<string, string>; // instanceId/draftId -> text content
  setDocumentContent: (fileId: string, content: string) => void;
  setDraftContent: (draftId: string, content: string) => void;
  deleteDraft: (draftId: string) => void;
}

export const useNotepadStore = create<NotepadState>()(
  persist(
    (set) => ({
      documents: {},
      unsavedDrafts: {},
      setDocumentContent: (fileId, content) =>
        set((state) => ({
          documents: { ...state.documents, [fileId]: content },
        })),
      setDraftContent: (draftId, content) =>
        set((state) => ({
          unsavedDrafts: { ...state.unsavedDrafts, [draftId]: content },
        })),
      deleteDraft: (draftId) =>
        set((state) => {
          const newDrafts = { ...state.unsavedDrafts };
          delete newDrafts[draftId];
          return { unsavedDrafts: newDrafts };
        }),
    }),
    {
      name: 'webos-notepad',
      version: 1,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
