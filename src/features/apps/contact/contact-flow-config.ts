export type QuestionType = 'single-select' | 'multi-select' | 'text';

export interface QuestionOption {
  label: string;
  value: string;
}

export interface Question {
  id: string;
  prompt: string;
  type: QuestionType;
  options?: QuestionOption[];
  required?: boolean;
}

export interface QuestionSet {
  id: string;
  title: string;
  questions: Question[];
}

// ---------------------------------------------------------
// DIRECT FLOW
// ---------------------------------------------------------

export const directQuestionSet: QuestionSet = {
  id: 'direct',
  title: 'Direct Inquiry',
  questions: [
    {
      id: 'd_q1',
      prompt: 'What do you want help with?',
      type: 'single-select',
      options: [
        { label: 'Automating repetitive work', value: 'Automating repetitive work' },
        { label: 'Improving an existing system', value: 'Improving an existing system' },
        { label: 'Building a custom internal tool', value: 'Building a custom internal tool' },
        { label: 'AI assistant or agent workflow', value: 'AI assistant or agent workflow' },
        { label: 'Not fully sure yet', value: 'Not fully sure yet' },
      ],
      required: true,
    },
    {
      id: 'd_q2',
      prompt: 'Which part of the business feels slow right now?',
      type: 'single-select',
      options: [
        { label: 'Sales or lead handling', value: 'Sales or lead handling' },
        { label: 'Operations or admin', value: 'Operations or admin' },
        { label: 'Customer support', value: 'Customer support' },
        { label: 'Content or marketing', value: 'Content or marketing' },
        { label: 'Hiring or internal workflows', value: 'Hiring or internal workflows' },
        { label: 'Something else', value: 'Something else' },
      ],
      required: true,
    },
    {
      id: 'd_q3',
      prompt: 'What is happening today without a better system?',
      type: 'single-select',
      options: [
        { label: 'Too much manual work', value: 'Too much manual work' },
        { label: 'Work gets delayed between tools', value: 'Work gets delayed between tools' },
        { label: 'Follow-ups are inconsistent', value: 'Follow-ups are inconsistent' },
        { label: 'Information is scattered', value: 'Information is scattered' },
        { label: 'Team is repeating the same tasks', value: 'Team is repeating the same tasks' },
        { label: 'Other', value: 'Other' },
      ],
      required: true,
    },
    {
      id: 'd_q4',
      prompt: 'How are you handling it right now?',
      type: 'single-select',
      options: [
        { label: 'Mostly manually', value: 'Mostly manually' },
        { label: 'Spreadsheets and copy-paste', value: 'Spreadsheets and copy-paste' },
        { label: 'Several disconnected tools', value: 'Several disconnected tools' },
        { label: 'One system that no longer fits', value: 'One system that no longer fits' },
        { label: 'A mix of all of these', value: 'A mix of all of these' },
      ],
      required: true,
    },
    {
      id: 'd_q5',
      prompt: 'What would a good result look like?',
      type: 'single-select',
      options: [
        { label: 'Save team time each week', value: 'Save team time each week' },
        { label: 'Fewer missed steps', value: 'Fewer missed steps' },
        { label: 'Faster response time', value: 'Faster response time' },
        { label: 'Better visibility across the workflow', value: 'Better visibility across the workflow' },
        { label: 'A smoother customer journey', value: 'A smoother customer journey' },
        { label: 'More consistent execution', value: 'More consistent execution' },
      ],
      required: true,
    },
    {
      id: 'd_q6',
      prompt: 'How soon are you looking to move?',
      type: 'single-select',
      options: [
        { label: 'As soon as possible', value: 'As soon as possible' },
        { label: 'Within 2–4 weeks', value: 'Within 2–4 weeks' },
        { label: 'This quarter', value: 'This quarter' },
        { label: 'Just exploring for now', value: 'Just exploring for now' },
      ],
      required: true,
    }
  ]
};

// ---------------------------------------------------------
// AUTOMATION FLOWS
// ---------------------------------------------------------

const sharedAutomationQuestions: Question[] = [
  {
    id: 'a_q1',
    prompt: 'What are you looking for here?',
    type: 'single-select',
    options: [
      { label: 'Something very similar', value: 'Something very similar' },
      { label: 'A version adapted to our workflow', value: 'A version adapted to our workflow' },
      { label: 'A completely custom system', value: 'A completely custom system' },
      { label: 'I want to understand what is possible first', value: 'I want to understand what is possible first' },
    ],
    required: true,
  },
  {
    id: 'a_q2',
    prompt: 'Where would this system be used first?',
    type: 'single-select',
    options: [
      { label: 'One team', value: 'One team' },
      { label: 'One process', value: 'One process' },
      { label: 'Multiple teams', value: 'Multiple teams' },
      { label: 'Client-facing workflow', value: 'Client-facing workflow' },
      { label: 'Internal operations', value: 'Internal operations' },
    ],
    required: true,
  }
];

export const automationQuestionSets: Record<string, Question[]> = {
  'calling-agent': [
    {
      id: 'a_q3_ca', prompt: 'What should calling help with most?', type: 'single-select', required: true,
      options: [{label: 'Lead qualification', value: 'Lead qualification'}, {label: 'Follow-up calls', value: 'Follow-up calls'}, {label: 'Appointment booking', value: 'Appointment booking'}, {label: 'Customer reminders', value: 'Customer reminders'}, {label: 'Support handoff', value: 'Support handoff'}]
    },
    {
      id: 'a_q4_ca', prompt: 'What matters most in this flow?', type: 'single-select', required: true,
      options: [{label: 'Better response speed', value: 'Better response speed'}, {label: 'Consistent call handling', value: 'Consistent call handling'}, {label: 'Clear call outcomes', value: 'Clear call outcomes'}, {label: 'Less manual follow-up', value: 'Less manual follow-up'}]
    },
    {
      id: 'a_q5_ca', prompt: 'What should happen after each call?', type: 'single-select', required: true,
      options: [{label: 'Update a CRM', value: 'Update a CRM'}, {label: 'Trigger a follow-up message', value: 'Trigger a follow-up message'}, {label: 'Book the next step', value: 'Book the next step'}, {label: 'Route to a team member', value: 'Route to a team member'}, {label: 'Not sure yet', value: 'Not sure yet'}]
    }
  ],
  'customer-follow-up': [
    {
      id: 'a_q3_cf', prompt: 'Where are follow-ups currently breaking?', type: 'single-select', required: true,
      options: [{label: 'After first inquiry', value: 'After first inquiry'}, {label: 'After a sales call', value: 'After a sales call'}, {label: 'After proposal sent', value: 'After proposal sent'}, {label: 'After no response', value: 'After no response'}, {label: 'After onboarding starts', value: 'After onboarding starts'}]
    },
    {
      id: 'a_q4_cf', prompt: 'What do you want the system to improve first?', type: 'single-select', required: true,
      options: [{label: 'Speed', value: 'Speed'}, {label: 'Consistency', value: 'Consistency'}, {label: 'Personalization', value: 'Personalization'}, {label: 'Visibility', value: 'Visibility'}, {label: 'Handoffs between team members', value: 'Handoffs between team members'}]
    },
    {
      id: 'a_q5_cf', prompt: 'Which follow-up channel matters most?', type: 'single-select', required: true,
      options: [{label: 'Email', value: 'Email'}, {label: 'WhatsApp', value: 'WhatsApp'}, {label: 'Calls', value: 'Calls'}, {label: 'CRM tasks', value: 'CRM tasks'}, {label: 'A mix of channels', value: 'A mix of channels'}]
    }
  ],
  'customer-support': [
    {
      id: 'a_q3_cs', prompt: 'What kind of support volume are you dealing with?', type: 'single-select', required: true,
      options: [{label: 'Low but repetitive', value: 'Low but repetitive'}, {label: 'Moderate and growing', value: 'Moderate and growing'}, {label: 'High and hard to manage', value: 'High and hard to manage'}, {label: 'Mixed request types', value: 'Mixed request types'}]
    },
    {
      id: 'a_q4_cs', prompt: 'What should the system do first?', type: 'single-select', required: true,
      options: [{label: 'Answer common questions', value: 'Answer common questions'}, {label: 'Route requests', value: 'Route requests'}, {label: 'Gather issue details', value: 'Gather issue details'}, {label: 'Reduce response time', value: 'Reduce response time'}, {label: 'Support the team internally', value: 'Support the team internally'}]
    },
    {
      id: 'a_q5_cs', prompt: 'Where does support slow down today?', type: 'single-select', required: true,
      options: [{label: 'First response', value: 'First response'}, {label: 'Repetitive questions', value: 'Repetitive questions'}, {label: 'Internal routing', value: 'Internal routing'}, {label: 'Missing context', value: 'Missing context'}, {label: 'Escalation handling', value: 'Escalation handling'}]
    }
  ],
  'crypto-news': [
    {
      id: 'a_q3_cn', prompt: 'What is the main need?', type: 'single-select', required: true,
      options: [{label: 'Faster research', value: 'Faster research'}, {label: 'Better filtering', value: 'Better filtering'}, {label: 'More structured summaries', value: 'More structured summaries'}, {label: 'Easier signal tracking', value: 'Easier signal tracking'}]
    },
    {
      id: 'a_q4_cn', prompt: 'What should the workflow produce?', type: 'single-select', required: true,
      options: [{label: 'Brief summaries', value: 'Brief summaries'}, {label: 'Tagged insights', value: 'Tagged insights'}, {label: 'Alerts', value: 'Alerts'}, {label: 'Research-ready notes', value: 'Research-ready notes'}, {label: 'Daily digests', value: 'Daily digests'}]
    },
    {
      id: 'a_q5_cn', prompt: 'What is hardest today?', type: 'single-select', required: true,
      options: [{label: 'Too many sources', value: 'Too many sources'}, {label: 'Too much noise', value: 'Too much noise'}, {label: 'Slow manual review', value: 'Slow manual review'}, {label: 'Missing important updates', value: 'Missing important updates'}, {label: 'Inconsistent analysis', value: 'Inconsistent analysis'}]
    }
  ],
  'lead-scraper': [
    {
      id: 'a_q3_ls', prompt: 'What matters most in prospecting?', type: 'single-select', required: true,
      options: [{label: 'Better lead quality', value: 'Better lead quality'}, {label: 'Verified contact details', value: 'Verified contact details'}, {label: 'Niche targeting', value: 'Niche targeting'}, {label: 'Faster list building', value: 'Faster list building'}]
    },
    {
      id: 'a_q4_ls', prompt: 'What kind of outreach list do you need?', type: 'single-select', required: true,
      options: [{label: 'Very targeted', value: 'Very targeted'}, {label: 'High volume', value: 'High volume'}, {label: 'Local market', value: 'Local market'}, {label: 'Specific industry', value: 'Specific industry'}, {label: 'Still defining it', value: 'Still defining it'}]
    },
    {
      id: 'a_q5_ls', prompt: 'What should happen after a lead is found?', type: 'single-select', required: true,
      options: [{label: 'Verify email', value: 'Verify email'}, {label: 'Enrich company data', value: 'Enrich company data'}, {label: 'Push to CRM', value: 'Push to CRM'}, {label: 'Start outreach prep', value: 'Start outreach prep'}, {label: 'Human review first', value: 'Human review first'}]
    }
  ],
  'linkedin-autopost': [
    {
      id: 'a_q3_la', prompt: 'What part of posting is hardest?', type: 'single-select', required: true,
      options: [{label: 'Ideation', value: 'Ideation'}, {label: 'Drafting', value: 'Drafting'}, {label: 'Consistency', value: 'Consistency'}, {label: 'Scheduling', value: 'Scheduling'}, {label: 'Repurposing content', value: 'Repurposing content'}]
    },
    {
      id: 'a_q4_la', prompt: 'What kind of content are you trying to publish?', type: 'single-select', required: true,
      options: [{label: 'Founder-led content', value: 'Founder-led content'}, {label: 'Brand content', value: 'Brand content'}, {label: 'Educational posts', value: 'Educational posts'}, {label: 'Sales-led content', value: 'Sales-led content'}, {label: 'Mixed content', value: 'Mixed content'}]
    },
    {
      id: 'a_q5_la', prompt: 'What result matters most?', type: 'single-select', required: true,
      options: [{label: 'Posting consistently', value: 'Posting consistently'}, {label: 'Better quality drafts', value: 'Better quality drafts'}, {label: 'Faster workflow', value: 'Faster workflow'}, {label: 'Stronger personal brand', value: 'Stronger personal brand'}, {label: 'Easier approval process', value: 'Easier approval process'}]
    }
  ],
  'offer-letter': [
    {
      id: 'a_q3_ol', prompt: 'What slows this process down most?', type: 'single-select', required: true,
      options: [{label: 'Collecting details', value: 'Collecting details'}, {label: 'Formatting documents', value: 'Formatting documents'}, {label: 'Reviews and approvals', value: 'Reviews and approvals'}, {label: 'Version mistakes', value: 'Version mistakes'}, {label: 'Sending final documents', value: 'Sending final documents'}]
    },
    {
      id: 'a_q4_ol', prompt: 'What should the system improve first?', type: 'single-select', required: true,
      options: [{label: 'Speed', value: 'Speed'}, {label: 'Accuracy', value: 'Accuracy'}, {label: 'Consistency', value: 'Consistency'}, {label: 'Approval flow', value: 'Approval flow'}, {label: 'Document organization', value: 'Document organization'}]
    },
    {
      id: 'a_q5_ol', prompt: 'Who is involved before an offer is final?', type: 'single-select', required: true,
      options: [{label: 'HR only', value: 'HR only'}, {label: 'Hiring manager + HR', value: 'Hiring manager + HR'}, {label: 'Founder + HR', value: 'Founder + HR'}, {label: 'Multiple approvers', value: 'Multiple approvers'}, {label: 'Depends on role', value: 'Depends on role'}]
    }
  ],
  'personalized-cold-email': [
    {
      id: 'a_q3_pc', prompt: 'What part needs the most help?', type: 'single-select', required: true,
      options: [{label: 'Prospect research', value: 'Prospect research'}, {label: 'Personalization', value: 'Personalization'}, {label: 'Sequence building', value: 'Sequence building'}, {label: 'Sending workflow', value: 'Sending workflow'}, {label: 'Reply handling', value: 'Reply handling'}]
    },
    {
      id: 'a_q4_pc', prompt: 'What matters most for outreach?', type: 'single-select', required: true,
      options: [{label: 'Better relevance', value: 'Better relevance'}, {label: 'Faster preparation', value: 'Faster preparation'}, {label: 'Consistent quality', value: 'Consistent quality'}, {label: 'Higher output', value: 'Higher output'}, {label: 'Safer review before sending', value: 'Safer review before sending'}]
    },
    {
      id: 'a_q5_pc', prompt: 'How tailored should the emails feel?', type: 'single-select', required: true,
      options: [{label: 'Light personalization', value: 'Light personalization'}, {label: 'Moderate personalization', value: 'Moderate personalization'}, {label: 'Deep research-based personalization', value: 'Deep research-based personalization'}, {label: 'Not sure yet', value: 'Not sure yet'}]
    }
  ],
  'product-recommendation-rag': [
    {
      id: 'a_q3_pr', prompt: 'What should recommendations use?', type: 'single-select', required: true,
      options: [{label: 'Product catalog data', value: 'Product catalog data'}, {label: 'Internal knowledge base', value: 'Internal knowledge base'}, {label: 'FAQs and support content', value: 'FAQs and support content'}, {label: 'A mix of all three', value: 'A mix of all three'}]
    },
    {
      id: 'a_q4_pr', prompt: 'Where will recommendations appear?', type: 'single-select', required: true,
      options: [{label: 'Website', value: 'Website'}, {label: 'Sales workflow', value: 'Sales workflow'}, {label: 'Support workflow', value: 'Support workflow'}, {label: 'Internal team tool', value: 'Internal team tool'}, {label: 'Multiple places', value: 'Multiple places'}]
    },
    {
      id: 'a_q5_pr', prompt: 'What matters most here?', type: 'single-select', required: true,
      options: [{label: 'Better relevance', value: 'Better relevance'}, {label: 'Faster answers', value: 'Faster answers'}, {label: 'Easier product discovery', value: 'Easier product discovery'}, {label: 'More consistent information', value: 'More consistent information'}, {label: 'Reduced manual lookup', value: 'Reduced manual lookup'}]
    }
  ],
  'sales-agent': [
    {
      id: 'a_q3_sa', prompt: 'Which sales stage needs the most help?', type: 'single-select', required: true,
      options: [{label: 'Lead qualification', value: 'Lead qualification'}, {label: 'Follow-up', value: 'Follow-up'}, {label: 'Proposal stage', value: 'Proposal stage'}, {label: 'Meeting scheduling', value: 'Meeting scheduling'}, {label: 'Pipeline updates', value: 'Pipeline updates'}]
    },
    {
      id: 'a_q4_sa', prompt: 'What do you want this system to improve first?', type: 'single-select', required: true,
      options: [{label: 'Response speed', value: 'Response speed'}, {label: 'Consistency', value: 'Consistency'}, {label: 'Lead handling', value: 'Lead handling'}, {label: 'Team visibility', value: 'Team visibility'}, {label: 'Admin workload', value: 'Admin workload'}]
    },
    {
      id: 'a_q5_sa', prompt: 'What should happen after a qualified lead is identified?', type: 'single-select', required: true,
      options: [{label: 'Book a call', value: 'Book a call'}, {label: 'Send next-step email', value: 'Send next-step email'}, {label: 'Create CRM task', value: 'Create CRM task'}, {label: 'Route to sales rep', value: 'Route to sales rep'}, {label: 'Trigger nurture flow', value: 'Trigger nurture flow'}]
    }
  ],
  'social-media-factory': [
    {
      id: 'a_q3_sm', prompt: 'What part of content production is slowest?', type: 'single-select', required: true,
      options: [{label: 'Planning', value: 'Planning'}, {label: 'Drafting', value: 'Drafting'}, {label: 'Repurposing', value: 'Repurposing'}, {label: 'Review and approval', value: 'Review and approval'}, {label: 'Publishing', value: 'Publishing'}]
    },
    {
      id: 'a_q4_sm', prompt: 'What output matters most?', type: 'single-select', required: true,
      options: [{label: 'More consistent content', value: 'More consistent content'}, {label: 'Faster turnaround', value: 'Faster turnaround'}, {label: 'Better use of source content', value: 'Better use of source content'}, {label: 'Smoother content workflow', value: 'Smoother content workflow'}, {label: 'Multi-channel output', value: 'Multi-channel output'}]
    },
    {
      id: 'a_q5_sm', prompt: 'What kind of input do you usually start with?', type: 'single-select', required: true,
      options: [{label: 'Ideas only', value: 'Ideas only'}, {label: 'Notes or outlines', value: 'Notes or outlines'}, {label: 'Long-form content', value: 'Long-form content'}, {label: 'Existing videos', value: 'Existing videos'}, {label: 'Existing posts/assets', value: 'Existing posts/assets'}]
    }
  ],
  'website-audit': [
    {
      id: 'a_q3_wa', prompt: 'What kind of audits are you trying to run?', type: 'single-select', required: true,
      options: [{label: 'Marketing/site clarity', value: 'Marketing/site clarity'}, {label: 'UX issues', value: 'UX issues'}, {label: 'SEO/content review', value: 'SEO/content review'}, {label: 'Conversion review', value: 'Conversion review'}, {label: 'General site review', value: 'General site review'}]
    },
    {
      id: 'a_q4_wa', prompt: 'What should the output help with?', type: 'single-select', required: true,
      options: [{label: 'Prioritizing fixes', value: 'Prioritizing fixes'}, {label: 'Spotting missed issues', value: 'Spotting missed issues'}, {label: 'Sharing clearer findings', value: 'Sharing clearer findings'}, {label: 'Speeding up reviews', value: 'Speeding up reviews'}, {label: 'Standardizing audits', value: 'Standardizing audits'}]
    },
    {
      id: 'a_q5_wa', prompt: 'Who usually uses the audit output?', type: 'single-select', required: true,
      options: [{label: 'Internal marketing team', value: 'Internal marketing team'}, {label: 'Founder/leadership', value: 'Founder/leadership'}, {label: 'Clients', value: 'Clients'}, {label: 'Sales team', value: 'Sales team'}, {label: 'Product/design team', value: 'Product/design team'}]
    }
  ],
  'whatsapp-restaurant': [
    {
      id: 'a_q3_wr', prompt: 'What should the workflow handle first?', type: 'single-select', required: true,
      options: [{label: 'Menu questions', value: 'Menu questions'}, {label: 'Reservations', value: 'Reservations'}, {label: 'Order-related questions', value: 'Order-related questions'}, {label: 'Business hours/location', value: 'Business hours/location'}, {label: 'Repetitive customer queries', value: 'Repetitive customer queries'}]
    },
    {
      id: 'a_q4_wr', prompt: 'What matters most in this experience?', type: 'single-select', required: true,
      options: [{label: 'Faster replies', value: 'Faster replies'}, {label: 'Better consistency', value: 'Better consistency'}, {label: 'Fewer missed messages', value: 'Fewer missed messages'}, {label: 'Cleaner handoff to staff', value: 'Cleaner handoff to staff'}, {label: 'Better customer experience', value: 'Better customer experience'}]
    },
    {
      id: 'a_q5_wr', prompt: 'When should a human step in?', type: 'single-select', required: true,
      options: [{label: 'Booking-related cases', value: 'Booking-related cases'}, {label: 'Payment/order issues', value: 'Payment/order issues'}, {label: 'Unclear customer intent', value: 'Unclear customer intent'}, {label: 'Escalations', value: 'Escalations'}, {label: 'Most conversations after first reply', value: 'Most conversations after first reply'}]
    }
  ],
  'youtube-thumbnail': [
    {
      id: 'a_q3_yt', prompt: 'What is hardest in the thumbnail process?', type: 'single-select', required: true,
      options: [{label: 'Coming up with concepts', value: 'Coming up with concepts'}, {label: 'Keeping quality consistent', value: 'Keeping quality consistent'}, {label: 'Turning ideas into assets', value: 'Turning ideas into assets'}, {label: 'Working fast enough', value: 'Working fast enough'}, {label: 'Managing variations', value: 'Managing variations'}]
    },
    {
      id: 'a_q4_yt', prompt: 'What kind of channel is this for?', type: 'single-select', required: true,
      options: [{label: 'Educational', value: 'Educational'}, {label: 'Business/personal brand', value: 'Business/personal brand'}, {label: 'Entertainment', value: 'Entertainment'}, {label: 'Product/tutorial', value: 'Product/tutorial'}, {label: 'Mixed', value: 'Mixed'}]
    },
    {
      id: 'a_q5_yt', prompt: 'What matters most?', type: 'single-select', required: true,
      options: [{label: 'Stronger click appeal', value: 'Stronger click appeal'}, {label: 'Faster production', value: 'Faster production'}, {label: 'Better consistency', value: 'Better consistency'}, {label: 'Easier creative direction', value: 'Easier creative direction'}, {label: 'More organized workflow', value: 'More organized workflow'}]
    }
  ]
};

// ---------------------------------------------------------
// SERVICE FLOWS
// ---------------------------------------------------------

const sharedServiceQuestion: Question = {
  id: 's_q1',
  prompt: 'What are you looking for from this service?',
  type: 'single-select',
  options: [
    { label: 'A focused solution for one workflow', value: 'A focused solution for one workflow' },
    { label: 'A broader system across the team', value: 'A broader system across the team' },
    { label: 'Help improving something existing', value: 'Help improving something existing' },
    { label: 'Guidance before deciding', value: 'Guidance before deciding' },
  ],
  required: true,
};

export const serviceQuestionSets: Record<string, Question[]> = {
  'Custom Web App': [
    {
      id: 's_q2_cwa', prompt: 'What kind of tool are you thinking about?', type: 'single-select', required: true,
      options: [{label: 'Internal operations tool', value: 'Internal operations tool'}, {label: 'Client-facing portal', value: 'Client-facing portal'}, {label: 'Team dashboard', value: 'Team dashboard'}, {label: 'Workflow management system', value: 'Workflow management system'}, {label: 'Still exploring', value: 'Still exploring'}]
    },
    {
      id: 's_q3_cwa', prompt: 'What is missing from your current setup?', type: 'single-select', required: true,
      options: [{label: 'Too many tools', value: 'Too many tools'}, {label: 'No system fits the process', value: 'No system fits the process'}, {label: 'Existing tool is too limited', value: 'Existing tool is too limited'}, {label: 'Team works around broken steps', value: 'Team works around broken steps'}, {label: 'Hard to scale what we have', value: 'Hard to scale what we have'}]
    },
    {
      id: 's_q4_cwa', prompt: 'Who will use this most?', type: 'single-select', required: true,
      options: [{label: 'Internal team', value: 'Internal team'}, {label: 'Operations team', value: 'Operations team'}, {label: 'Sales/support team', value: 'Sales/support team'}, {label: 'Clients/customers', value: 'Clients/customers'}, {label: 'Multiple groups', value: 'Multiple groups'}]
    },
    {
      id: 's_q5_cwa', prompt: 'What matters most in the build?', type: 'single-select', required: true,
      options: [{label: 'Fit to our workflow', value: 'Fit to our workflow'}, {label: 'Ease of use', value: 'Ease of use'}, {label: 'Faster operations', value: 'Faster operations'}, {label: 'Better visibility', value: 'Better visibility'}, {label: 'Long-term flexibility', value: 'Long-term flexibility'}]
    },
    {
      id: 's_q6_cwa', prompt: 'What stage are you at?', type: 'single-select', required: true,
      options: [{label: 'Clear idea and ready', value: 'Clear idea and ready'}, {label: 'Rough scope only', value: 'Rough scope only'}, {label: 'Comparing options', value: 'Comparing options'}, {label: 'Need help defining it', value: 'Need help defining it'}]
    }
  ],
  'AI / Automations': [
    {
      id: 's_q2_ai', prompt: 'What kind of AI system are you considering?', type: 'single-select', required: true,
      options: [{label: 'Internal assistant', value: 'Internal assistant'}, {label: 'Customer-facing assistant', value: 'Customer-facing assistant'}, {label: 'Research/analysis workflow', value: 'Research/analysis workflow'}, {label: 'Content generation workflow', value: 'Content generation workflow'}, {label: 'Process automation with AI', value: 'Process automation with AI'}]
    },
    {
      id: 's_q3_ai', prompt: 'What should the system help with first?', type: 'single-select', required: true,
      options: [{label: 'Answering questions', value: 'Answering questions'}, {label: 'Organizing information', value: 'Organizing information'}, {label: 'Producing drafts', value: 'Producing drafts'}, {label: 'Making recommendations', value: 'Making recommendations'}, {label: 'Reducing manual review', value: 'Reducing manual review'}]
    },
    {
      id: 's_q4_ai', prompt: 'What inputs would it rely on?', type: 'single-select', required: true,
      options: [{label: 'Documents', value: 'Documents'}, {label: 'Product/company knowledge', value: 'Product/company knowledge'}, {label: 'Support or CRM data', value: 'Support or CRM data'}, {label: 'Mixed sources', value: 'Mixed sources'}, {label: 'Still unclear', value: 'Still unclear'}]
    },
    {
      id: 's_q5_ai', prompt: 'What is the biggest concern?', type: 'single-select', required: true,
      options: [{label: 'Accuracy', value: 'Accuracy'}, {label: 'Hallucinations', value: 'Hallucinations'}, {label: 'Poor workflow fit', value: 'Poor workflow fit'}, {label: 'Adoption by the team', value: 'Adoption by the team'}, {label: 'Unclear ROI', value: 'Unclear ROI'}]
    },
    {
      id: 's_q6_ai', prompt: 'What would make it genuinely useful?', type: 'single-select', required: true,
      options: [{label: 'Saves real team time', value: 'Saves real team time'}, {label: 'Gives reliable outputs', value: 'Gives reliable outputs'}, {label: 'Fits current tools', value: 'Fits current tools'}, {label: 'Handles repeatable tasks well', value: 'Handles repeatable tasks well'}, {label: 'Improves service speed', value: 'Improves service speed'}]
    }
  ],
  // Fallback for other services using the Workflow Automation questions
  'default_service': [
    {
      id: 's_q2_def', prompt: 'Which workflow is the best place to start?', type: 'single-select', required: true,
      options: [{label: 'Lead handling', value: 'Lead handling'}, {label: 'Operations/admin', value: 'Operations/admin'}, {label: 'Support', value: 'Support'}, {label: 'Reporting', value: 'Reporting'}, {label: 'Content/marketing', value: 'Content/marketing'}]
    },
    {
      id: 's_q3_def', prompt: 'What is causing the most friction today?', type: 'single-select', required: true,
      options: [{label: 'Manual repetition', value: 'Manual repetition'}, {label: 'Delays between tools', value: 'Delays between tools'}, {label: 'Missed handoffs', value: 'Missed handoffs'}, {label: 'Inconsistent follow-up', value: 'Inconsistent follow-up'}, {label: 'Lack of visibility', value: 'Lack of visibility'}]
    },
    {
      id: 's_q4_def', prompt: 'How many people touch this workflow?', type: 'single-select', required: true,
      options: [{label: 'Just me', value: 'Just me'}, {label: '2–5 people', value: '2–5 people'}, {label: '6–15 people', value: '6–15 people'}, {label: 'Multiple teams', value: 'Multiple teams'}]
    },
    {
      id: 's_q5_def', prompt: 'What would make this a success?', type: 'single-select', required: true,
      options: [{label: 'Save time every week', value: 'Save time every week'}, {label: 'Reduce missed steps', value: 'Reduce missed steps'}, {label: 'Improve response speed', value: 'Improve response speed'}, {label: 'Create a clearer process', value: 'Create a clearer process'}, {label: 'Connect tools properly', value: 'Connect tools properly'}]
    },
    {
      id: 's_q6_def', prompt: 'How structured is the current process?', type: 'single-select', required: true,
      options: [{label: 'Very clear', value: 'Very clear'}, {label: 'Somewhat clear', value: 'Somewhat clear'}, {label: 'Mostly in people’s heads', value: 'Mostly in people’s heads'}, {label: 'It changes often', value: 'It changes often'}]
    }
  ]
};

export const getQuestionSet = (sourceType: 'direct' | 'automation' | 'service', sourceId?: string, sourceTitle?: string): QuestionSet => {
  if (sourceType === 'automation' && sourceId) {
    const specificQs = automationQuestionSets[sourceId];
    if (specificQs) {
      return {
        id: `auto_${sourceId}`,
        title: sourceTitle ? `From Automations: ${sourceTitle}` : 'From Automations',
        questions: [...sharedAutomationQuestions, ...specificQs]
      };
    }
  }

  if (sourceType === 'service' && sourceId) {
    let specificQs = serviceQuestionSets[sourceId];
    if (!specificQs) {
      specificQs = serviceQuestionSets['default_service'];
    }
    return {
      id: `service_${sourceId}`,
      title: sourceTitle ? `From Services: ${sourceTitle}` : 'From Services',
      questions: [sharedServiceQuestion, ...specificQs]
    };
  }

  // Fallback to direct
  return directQuestionSet;
};
