export interface AppConfig {
  id: string;
  title: string;
  icon: string;
  route: string;
  defaultSize: { width: number; height: number };
}

export const appsRegistry: AppConfig[] = [
  {
    id: 'devops',
    title: 'DevOps Services',
    icon: 'Terminal',
    route: '/apps/devops',
    defaultSize: { width: 800, height: 600 },
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Dev',
    icon: 'Code',
    route: '/apps/fullstack',
    defaultSize: { width: 800, height: 600 },
  },
  {
    id: 'pentesting',
    title: 'Cybersecurity',
    icon: 'Shield',
    route: '/apps/pentesting',
    defaultSize: { width: 800, height: 600 },
  },
  {
    id: 'ai-integration',
    title: 'AI Integration',
    icon: 'BrainCircuit',
    route: '/apps/ai-integration',
    defaultSize: { width: 800, height: 600 },
  },
];
