import { WORK_PROJECTS } from '../work/work-data';

export interface CaseStudy {
  id: string;
  projectName: string;
  clientName: string;
  category: string;
  summary: string;
  problem: string;
  approach: string;
  solution: string;
  results: string[];
  deliverables: string[];
  timeline: string;
  year: string;
  heroAssetType: 'image' | 'pdf';
  heroAssetUrl?: string;
  linkedFiles: string[];
  linkedFileFolderId: string;
  testimonialQuote?: string;
  testimonialAuthor?: string;
}

export const CASE_STUDIES: CaseStudy[] = WORK_PROJECTS.map(project => ({
  id: project.id,
  projectName: project.projectName,
  clientName: project.clientName,
  category: project.category,
  summary: project.tagline,
  problem: project.challenge.body,
  approach: project.strategy.body,
  solution: project.execution.body,
  results: project.metrics.map(m => `${m.value} ${m.label}`),
  deliverables: project.execution.deliverables,
  timeline: project.duration,
  year: project.year.toString(),
  heroAssetType: project.heroMedia.type as 'image' | 'pdf',
  heroAssetUrl: project.heroMedia.url,
  linkedFiles: project.linkedFileIds,
  linkedFileFolderId: project.linkedFileFolderId,
  testimonialQuote: project.testimonial?.quote,
  testimonialAuthor: project.testimonial?.author
}));
