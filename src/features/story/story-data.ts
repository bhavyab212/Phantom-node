export type ContentItemType = 'app' | 'service' | 'case-study' | 'document' | 'action' | 'section';

export interface ContentItem {
  id: string;
  type: ContentItemType;
  label: string;
  keywords: string[];
  targetApp: string;
  targetSectionId?: string;
  relatedFileId?: string;
  actionIntent?: string;
  targetContext?: any;
}

export const GLOBAL_CONTENT_INDEX: ContentItem[] = [
  // Apps
  { id: 'idx-app-home', type: 'app', label: 'Home / Studio', keywords: ['home', 'studio', 'agency', 'about'], targetApp: 'phantom-node-studio' },
  { id: 'idx-app-services', type: 'app', label: 'Services', keywords: ['services', 'offerings', 'what we do'], targetApp: 'services' },
  { id: 'idx-app-contact', type: 'app', label: 'Contact', keywords: ['contact', 'hire us', 'start project', 'email'], targetApp: 'contact' },
  { id: 'idx-app-work', type: 'app', label: 'Work', keywords: ['work', 'portfolio', 'case studies', 'projects'], targetApp: 'work' },
  { id: 'idx-app-process', type: 'app', label: 'Process', keywords: ['how we work', 'timeline', 'deliverables', 'process', 'methodology', 'phases'], targetApp: 'process' },
  { id: 'idx-app-files', type: 'app', label: 'Files & Archive', keywords: ['files', 'archive', 'documents'], targetApp: 'files' },
  
  // Process Sections
  { id: 'process-discovery', type: 'section', label: 'Discovery Phase', keywords: ['discovery', 'strategy', 'process'], targetApp: 'process', targetSectionId: 'process-discovery' },
  { id: 'process-design', type: 'section', label: 'Design Phase', keywords: ['design', 'direction', 'process'], targetApp: 'process', targetSectionId: 'process-design' },
  { id: 'process-build', type: 'section', label: 'Build Phase', keywords: ['build', 'integrate', 'process'], targetApp: 'process', targetSectionId: 'process-build' },
  { id: 'process-launch', type: 'section', label: 'Launch Phase', keywords: ['launch', 'handoff', 'process'], targetApp: 'process', targetSectionId: 'process-launch' },
  { id: 'process-faq', type: 'section', label: 'Process FAQ', keywords: ['faq', 'questions', 'process'], targetApp: 'process', targetSectionId: 'process-faq' },

  // Services (linking to sections in Services app)
  { id: 'idx-srv-web', type: 'service', label: 'Web Design & Development', keywords: ['web design', 'development', 'react', 'nextjs', 'website'], targetApp: 'services', targetSectionId: 'srv-web' },
  { id: 'idx-srv-brand', type: 'service', label: 'Branding & Identity', keywords: ['branding', 'identity', 'logo', 'design'], targetApp: 'services', targetSectionId: 'srv-brand' },
  { id: 'idx-srv-growth', type: 'service', label: 'Growth & Marketing', keywords: ['growth', 'marketing', 'seo', 'ads'], targetApp: 'services', targetSectionId: 'srv-growth' },

  // Case Studies (linking to Work app)
  { id: 'work-northstar-health', type: 'case-study', label: 'Northstar Health', keywords: ['northstar', 'health', 'patient portal', 'web design', '42% faster page loads', '27% more qualified leads'], targetApp: 'work', targetContext: { projectId: 'cs-northstar' } },
  { id: 'work-atlas-automation', type: 'case-study', label: 'Atlas Automation', keywords: ['atlas', 'automation', 'logistics', 'n8n', '18 hours saved per week'], targetApp: 'work', targetContext: { projectId: 'cs-atlas' } },
  { id: 'work-apex-financial', type: 'case-study', label: 'Apex Financial', keywords: ['apex', 'financial', 'rebrand', 'identity', '250% increase in social engagement'], targetApp: 'work', targetContext: { projectId: 'cs-apex' } },

  // Actions
  { id: 'idx-act-start', type: 'action', label: 'Start a Project', keywords: ['start', 'begin', 'new project', 'hire'], targetApp: 'contact' },
];
