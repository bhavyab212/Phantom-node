import { create } from 'zustand';
import { 
  initLocalContext, 
  updateConsent, 
  saveAnswerToContext, 
  getLocalContext, 
  clearLocalContext,
  addContactEvent
} from './lib/local-context';
import { getNextTargetDimension } from './lib/routing-engine';
export type SourceType = 'direct' | 'automation' | 'service';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  message: string;
}

interface ContactFormState extends ContactFormData {
  sourceType: SourceType;
  sourceId?: string;
  sourceTitle?: string;
  
  answers: Record<string, string>; // questionId -> answer value
  answeredQuestionIds: string[];
  
  consentGranted: boolean;
  
  currentQuestionId: string | null;
  history: string[]; // for back navigation
  
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
  
  // Custom tracking for UI
  isFinalForm: boolean;
  
  // Actions
  setField: <K extends keyof ContactFormData>(field: K, value: ContactFormData[K]) => void;
  setAnswer: (questionId: string, answer: string, isCustom?: boolean) => void;
  setNextQuestion: (questionId: string | null, isFinal?: boolean) => void;
  prevStep: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
  setSubmitted: (isSubmitted: boolean) => void;
  setError: (error: string | null) => void;
  resetForm: () => void;
  setSource: (sourceType: SourceType, sourceId?: string, sourceTitle?: string) => void;
  setConsent: (granted: boolean) => void;
  clearSession: () => void;
}

const initialState = {
  sourceType: 'direct' as SourceType,
  sourceId: undefined,
  sourceTitle: undefined,
  
  answers: {},
  answeredQuestionIds: [],
  
  consentGranted: false,
  
  currentQuestionId: null,
  history: [],
  
  name: '',
  email: '',
  phone: '',
  company: '',
  website: '',
  message: '',
  
  isSubmitting: false,
  isSubmitted: false,
  error: null,
  
  isFinalForm: false,
};

export const useContactFormStore = create<ContactFormState>((set, get) => ({
  ...initialState,
  
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  
  setAnswer: (questionId, answer, isCustom = false) => {
    const { sourceId } = get();
    // Persist to local context
    saveAnswerToContext(questionId, answer, isCustom, sourceId);
    
    set((state) => {
      const newAnswers = { ...state.answers, [questionId]: answer };
      const newAnsweredIds = state.answeredQuestionIds.includes(questionId) 
        ? state.answeredQuestionIds 
        : [...state.answeredQuestionIds, questionId];
        
      return {
        answers: newAnswers,
        answeredQuestionIds: newAnsweredIds
      };
    });
  },
  
  setNextQuestion: (questionId, isFinal = false) => set((state) => {
    if (isFinal) {
      addContactEvent({ type: 'contact_form_started' });
      return { isFinalForm: true };
    }
    
    const newHistory = state.currentQuestionId 
      ? [...state.history, state.currentQuestionId] 
      : state.history;
      
    return {
      currentQuestionId: questionId,
      history: newHistory,
      isFinalForm: false
    };
  }),
  
  prevStep: () => set((state) => {
    if (state.isFinalForm) {
      return { isFinalForm: false };
    }
    if (state.history.length === 0) return state;
    
    const newHistory = [...state.history];
    const prevId = newHistory.pop() || null;
    
    addContactEvent({ type: 'contact_navigation', value: 'back' });
    
    return {
      currentQuestionId: prevId,
      history: newHistory
    };
  }),
  
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
  
  setSubmitted: (isSubmitted) => {
    if (isSubmitted) {
      addContactEvent({ type: 'contact_form_submitted' });
    }
    set({ isSubmitted });
  },
  
  setError: (error) => set({ error }),
  
  resetForm: () => set(initialState),
  
  setSource: (sourceType, sourceId, sourceTitle) => {
    const context = initLocalContext(sourceType, sourceId, sourceTitle);
    const firstDim = getNextTargetDimension(sourceType, sourceId, 0);
    const entryId = firstDim ? `dim-${firstDim.replace(/\\s+/g, '-')}` : null;
    
    set((state) => ({
      ...initialState,
      sourceType,
      sourceId,
      sourceTitle,
      consentGranted: context?.consent?.localPersonalization || false,
      currentQuestionId: entryId,
      history: []
    }));
  },
  
  setConsent: (granted: boolean) => {
    updateConsent(granted);
    set({ consentGranted: granted });
  },
  
  clearSession: () => {
    clearLocalContext();
    set({ consentGranted: false });
  }
}));
