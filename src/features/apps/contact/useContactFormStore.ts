import { create } from 'zustand';

export interface ContactFormData {
  intent: string;
  customIntentText: string;
  budgetRange: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface ContactFormState extends ContactFormData {
  currentStep: number;
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
  
  // Actions
  setField: <K extends keyof ContactFormData>(field: K, value: ContactFormData[K]) => void;
  nextStep: () => void;
  prevStep: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
  setSubmitted: (isSubmitted: boolean) => void;
  setError: (error: string | null) => void;
  resetForm: () => void;
  setInitialIntent: (intent: string) => void;
}

const initialState = {
  currentStep: 1,
  intent: '',
  customIntentText: '',
  budgetRange: '',
  timeline: '',
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  isSubmitting: false,
  isSubmitted: false,
  error: null,
};

export const useContactFormStore = create<ContactFormState>((set) => ({
  ...initialState,
  
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 3) })),
  
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
  
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
  
  setSubmitted: (isSubmitted) => set({ isSubmitted }),
  
  setError: (error) => set({ error }),
  
  resetForm: () => set(initialState),
  
  setInitialIntent: (intent) => set((state) => ({
    ...initialState,
    intent,
  })),
}));
