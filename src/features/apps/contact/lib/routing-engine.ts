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

const FALLBACK_OPTIONS: Record<string, string[]> = {
  'what they want help with': ['Automate a repetitive process', 'Build a custom tool or integration', 'Improve an existing workflow', 'Set up an AI assistant', "I'm not sure yet"],
  'where the friction is': ['Sales or lead management', 'Operations and admin tasks', 'Customer support', 'Data entry and reporting'],
  'how they handle it today': ['Mostly manually', 'With spreadsheets', 'Disconnected tools patched together', 'A mix of all of these'],
  'what outcome matters': ['Save time for my team', 'Fewer errors and missed steps', 'Faster response times', 'Better visibility across the process'],
  'how urgent it is': ['As soon as possible', 'Within the next month', 'This quarter', 'Just exploring right now'],
  'anything custom / constraint': ['Budget constraints', 'Specific timeline', 'Must use existing tools', 'No major constraints'],
  'primary site goal': ['Generate more qualified leads', 'Build brand credibility', 'Sell products or services online', 'Provide information to clients'],
  'page priority': ['Homepage', 'Services or product pages', 'About us', 'Contact page'],
  'audience': ['Business clients (B2B)', 'Direct consumers (B2C)', 'Investors or partners', 'Internal team'],
  'content / brand readiness': ['Brand and content fully ready', 'Have branding, need content help', 'Need both branding and content', 'Starting from scratch'],
  'conversion path': ['Book a call or demo', 'Submit an enquiry form', 'Purchase directly', 'Sign up for updates'],
  'launch timing or constraints': ['Launch ASAP', 'Within 4–6 weeks', 'Within 3 months', 'No fixed deadline'],
  'workflow to improve': ['Lead intake and qualification', 'Client onboarding', 'Reporting and data aggregation', 'Internal operations'],
  'current bottleneck': ['Too much manual data entry', 'Waiting on approvals', 'Handoffs between people or tools', 'Finding information takes too long'],
  'tools involved': ['CRM (e.g. HubSpot, Salesforce)', 'Email and calendar (e.g. Gmail, Outlook)', 'Spreadsheets (e.g. Google Sheets, Excel)', 'Project management (e.g. Notion, Asana)'],
  'ownership / handoff': ['Just me', 'A small team', 'Multiple departments', 'External partners or contractors'],
  'desired outcome': ['Save significant team time', 'Reduce errors and rework', 'Scale the process without hiring', 'Full visibility into the workflow'],
  'exceptions / constraints': ['Must work within existing tech stack', 'Tight budget', 'Compliance or data privacy requirements', 'No major constraints'],
  'break point': ['After the first inquiry comes in', 'After a sales call or demo', 'After a proposal is sent', 'After a period of no response'],
  'main channel': ['Email', 'WhatsApp or SMS', 'Phone calls', 'CRM tasks and reminders'],
  'desired improvement': ['Faster follow-up speed', 'More consistent messaging', 'Better personalisation', 'Full visibility into follow-up status'],
  'stop / pause condition': ['When they reply', 'After a set number of attempts', 'When they book a call', 'When deal is marked won/lost'],
  'CRM or handoff expectation': ['Update the deal status automatically', 'Create a task for a team member', 'Log all activity in the CRM', 'No CRM involvement needed'],
  'stage needing support': ['Lead qualification', 'Sending proposals', 'Following up after demos', 'Scheduling meetings'],
  'qualification logic': ['Budget fit', 'Timeline and urgency', 'Decision-maker involvement', 'Specific need or use case'],
  'next-step action': ['Book a discovery call', 'Send a tailored proposal', 'Route to a sales rep', 'Add to a nurture sequence'],
  'system / CRM involved': ['HubSpot', 'Salesforce', 'Pipedrive', 'Custom or in-house CRM'],
  'human handoff boundary': ['For complex or sensitive questions', 'To close the deal', 'For pricing discussions', 'Immediately — AI just qualifies']
};

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
  const opts = FALLBACK_OPTIONS[dimension] || ['Yes, this fits well', 'Partially — needs discussion', 'Not quite — let me explain'];
  return {
    id: `dim-${dimension.replace(/\s+/g, '-')}`,
    dimension,
    sourceId,
    sourceTitle,
    text,
    type: 'select',
    required: true,
    answerMode: 'single-select-or-custom',
    options: opts.map(o => ({ label: o, value: o }))
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
