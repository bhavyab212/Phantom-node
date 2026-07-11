export interface CaseStudy {
  id: string;
  slug: string;
  projectName: string;
  clientName: string;
  category: string;
  tagline: string;
  headlineMetric: string;
  year: number;
  duration: string;
  status: 'Completed' | 'In Progress';
  impact: string;
  heroMedia: {
    type: 'image';
    url?: string;
    alt: string;
  };
  challenge: {
    title: string;
    body: string;
  };
  strategy: {
    title: string;
    body: string;
    keyPoints: string[];
  };
  execution: {
    title: string;
    body: string;
    deliverables: string[];
  };
  results: {
    title: string;
    body: string;
  };
  metrics: Array<{
    value: string;
    label: string;
    context?: string;
  }>;
  timeline: Array<{
    phase: string;
    label: string;
    duration: string;
  }>;
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
  } | null;
  gallery: Array<{
    url: string;
    alt: string;
    caption: string;
  }>;
  serviceIntent: string;
  linkedFileFolderId: string;
  linkedFileIds: string[];
  featured: boolean;
  sortOrder: number;
}
