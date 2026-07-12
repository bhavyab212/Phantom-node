export const CONTACT_CONTEXT_KEY = 'phantom-node.contact-context.v1';
export const SESSION_EXPIRY_DAYS = 7;

export interface ContactEvent {
  type: 'contact_answer_selected' | 'contact_question_skipped' | 'contact_navigation' | 'contact_form_started' | 'contact_form_submitted';
  at: string;
  questionId?: string;
  sourceId?: string;
  value?: string;
  isCustom?: boolean;
}

export interface LocalContactContext {
  version: string;
  consent: {
    localPersonalization: boolean;
    updatedAt: string;
  };
  session: {
    sessionId: string;
    startedAt: string;
    lastUpdatedAt: string;
  };
  entryContext: {
    sourceType: string;
    sourceId: string | null;
    sourceTitle: string | null;
  };
  events: ContactEvent[];
  answers: Record<string, {
    value: string;
    isCustom: boolean;
    updatedAt: string;
  }>;
  derivedContext: {
    coveredDimensions: string[];
    likelyNeeds: string[];
    currentStage: string;
  };
}

export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function getLocalContext(): LocalContactContext | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(CONTACT_CONTEXT_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as LocalContactContext;
    
    // Check expiry
    const lastUpdated = new Date(parsed.session.lastUpdatedAt);
    const expiry = new Date(lastUpdated.getTime() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
    if (new Date() > expiry) {
      clearLocalContext();
      return null;
    }
    
    return parsed;
  } catch (e) {
    return null;
  }
}

export function saveLocalContext(context: LocalContactContext): void {
  if (typeof window === 'undefined') return;
  context.session.lastUpdatedAt = new Date().toISOString();
  localStorage.setItem(CONTACT_CONTEXT_KEY, JSON.stringify(context));
}

export function clearLocalContext(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CONTACT_CONTEXT_KEY);
}

export function initLocalContext(sourceType: string, sourceId?: string, sourceTitle?: string): LocalContactContext {
  const existing = getLocalContext();
  if (existing) {
    existing.entryContext = {
      sourceType,
      sourceId: sourceId || null,
      sourceTitle: sourceTitle || null
    };
    saveLocalContext(existing);
    return existing;
  }

  const now = new Date().toISOString();
  const context: LocalContactContext = {
    version: '1.0',
    consent: {
      localPersonalization: false,
      updatedAt: now,
    },
    session: {
      sessionId: generateUUID(),
      startedAt: now,
      lastUpdatedAt: now,
    },
    entryContext: {
      sourceType,
      sourceId: sourceId || null,
      sourceTitle: sourceTitle || null
    },
    events: [],
    answers: {},
    derivedContext: {
      coveredDimensions: [],
      likelyNeeds: [],
      currentStage: 'intake'
    }
  };
  
  saveLocalContext(context);
  return context;
}

export function updateConsent(granted: boolean): LocalContactContext | null {
  let context = getLocalContext();
  if (!context) {
    context = initLocalContext('direct'); // Fallback
  }
  
  context.consent = {
    localPersonalization: granted,
    updatedAt: new Date().toISOString()
  };
  
  if (!granted) {
    clearLocalContext();
    return null;
  }
  
  saveLocalContext(context);
  return context;
}

export function addContactEvent(event: Omit<ContactEvent, 'at'>): void {
  const context = getLocalContext();
  if (!context || !context.consent.localPersonalization) return;
  
  context.events.push({
    ...event,
    at: new Date().toISOString()
  });
  
  saveLocalContext(context);
}

export function saveAnswerToContext(questionId: string, value: string, isCustom: boolean, sourceId?: string): void {
  const context = getLocalContext();
  if (!context) return;
  
  context.answers[questionId] = {
    value,
    isCustom,
    updatedAt: new Date().toISOString()
  };
  
  if (context.consent.localPersonalization) {
    context.events.push({
      type: 'contact_answer_selected',
      at: new Date().toISOString(),
      questionId,
      sourceId,
      value: isCustom ? undefined : value, // Keep text local if it's custom text until form submission
      isCustom
    });
  }
  
  saveLocalContext(context);
}
