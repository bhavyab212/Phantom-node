export interface QuestionOption {
  label: string;
  value: string;
}

export interface Question {
  id: string; // we'll use dimension ID here
  sourceId: string;
  sourceTitle: string;
  text: string;
  type: string;
  required: boolean;
  answerMode: string;
  options: QuestionOption[];
  dimension: string; // The semantic dimension being covered
}

export const DIMENSION_MAPS: Record<string, string[]> = {
  'direct': [
    'what they want help with',
    'where the friction is',
    'how they handle it today',
    'what outcome matters',
    'how urgent it is',
    'anything custom / constraint'
  ],
  'website-design': [
    'primary site goal',
    'page priority',
    'audience',
    'content / brand readiness',
    'conversion path',
    'launch timing or constraints'
  ],
  'workflow-automation': [
    'workflow to improve',
    'current bottleneck',
    'tools involved',
    'ownership / handoff',
    'desired outcome',
    'exceptions / constraints'
  ],
  'customer-follow-up-system': [
    'break point',
    'main channel',
    'desired improvement',
    'stop / pause condition',
    'CRM or handoff expectation'
  ],
  'sales-agent': [
    'stage needing support',
    'qualification logic',
    'next-step action',
    'system / CRM involved',
    'human handoff boundary'
  ]
};

const DEFAULT_OPTIONS = [
  { label: 'Option A', value: 'Option A' },
  { label: 'Option B', value: 'Option B' },
  { label: 'Option C', value: 'Option C' }
];

export const FALLBACK_TEMPLATES: Record<string, string> = {
  'what they want help with': 'What do you primarily need help with?',
  'where the friction is': 'Where are you experiencing the most friction?',
  'how they handle it today': 'How are you currently handling this process?',
  'what outcome matters': 'What is the most important outcome for this project?',
  'how urgent it is': 'How urgent is this requirement?',
  'anything custom / constraint': 'Are there any specific constraints we should know about?',
  'primary site goal': 'What is the primary goal of the new website?',
  'page priority': 'Which pages or sections are the highest priority?',
  'audience': 'Who is the primary audience for this site?',
  'content / brand readiness': 'Do you already have content and branding assets ready?',
  'conversion path': 'What is the primary action you want visitors to take?',
  'launch timing or constraints': 'Do you have a specific launch deadline or constraint?',
  'workflow to improve': 'Which specific workflow are you trying to improve?',
  'current bottleneck': 'What is the biggest bottleneck in this workflow currently?',
  'tools involved': 'Which software tools are involved in this workflow?',
  'ownership / handoff': 'Who owns this process, and how are handoffs managed?',
  'desired outcome': 'What would a successful outcome look like for this workflow?',
  'exceptions / constraints': 'Are there any exceptions or special cases we must handle?',
  'break point': 'At which stage in the customer journey is follow-up breaking down?',
  'main channel': 'Which communication channel is most important for follow-ups?',
  'desired improvement': 'What specific improvement are you looking for in follow-ups?',
  'stop / pause condition': 'Under what condition should follow-ups automatically pause?',
  'CRM or handoff expectation': 'How should these follow-ups log into your CRM or alert the team?',
  'stage needing support': 'Which stage of your sales process needs the most support?',
  'qualification logic': 'What criteria do you use to qualify a lead?',
  'next-step action': 'What is the typical next step after a lead is qualified?',
  'system / CRM involved': 'Which CRM or sales tools are your team using?',
  'human handoff boundary': 'At what point should the AI hand off to a human agent?'
};

export function getDimensionsForSource(sourceType: string, sourceId?: string): string[] {
  if (sourceId && DIMENSION_MAPS[sourceId]) {
    return DIMENSION_MAPS[sourceId];
  }
  if (sourceType === 'service' && sourceId) {
    return DIMENSION_MAPS[sourceId] || DIMENSION_MAPS['direct'];
  }
  if (sourceType === 'automation' && sourceId) {
    return DIMENSION_MAPS[sourceId] || DIMENSION_MAPS['workflow-automation'];
  }
  return DIMENSION_MAPS['direct'];
}

export function getNextTargetDimension(sourceType: string, sourceId: string | undefined, answeredCount: number): string | null {
  const dimensions = getDimensionsForSource(sourceType, sourceId);
  if (answeredCount >= dimensions.length) return null;
  return dimensions[answeredCount];
}

export function getFallbackQuestion(dimension: string, sourceId: string, sourceTitle: string): Question {
  const text = FALLBACK_TEMPLATES[dimension] || 'What is the next step for this project?';
  return {
    id: `dim-${dimension.replace(/\s+/g, '-')}`,
    dimension,
    sourceId,
    sourceTitle,
    text,
    type: 'select',
    required: true,
    answerMode: 'single-select-or-custom',
    options: DEFAULT_OPTIONS
  };
}

// Global cache for dynamically generated questions
const dynamicQuestions: Question[] = [];

export function registerDynamicQuestion(question: Question) {
  const existingIndex = dynamicQuestions.findIndex(q => q.id === question.id);
  if (existingIndex >= 0) {
    dynamicQuestions[existingIndex] = question;
  } else {
    dynamicQuestions.push(question);
  }
}

export function getQuestionById(id: string): Question | null {
  return dynamicQuestions.find(q => q.id === id) || null;
}
