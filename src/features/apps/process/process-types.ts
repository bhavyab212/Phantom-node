export interface ProcessPhase {
  id: string;
  number: number;
  name: string;
  tagline: string;
  description: string;
  duration: string;
  deliverables: string[];
  clientResponsibilities: string[];
  keyActivities: string[];
  icon: string;
  accentColor?: string;
}

export interface ProcessPrinciple {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ProcessFAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ProcessExpectation {
  id: string;
  category: string;
  title: string;
  detail: string;
}