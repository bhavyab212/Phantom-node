export interface TestimonialData {
  id: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  quote: string;
  serviceType: string;
  // A small deterministic rotation value between -2 and 2
  rotationDeg: number; 
}

export const TESTIMONIALS: TestimonialData[] = [
  {
    id: 't1',
    clientName: 'Sarah Jenkins',
    clientRole: 'VP of Operations',
    clientCompany: 'Apex Legal Group',
    quote: 'They completely overhauled our intake process. What used to take three days of manual data entry now happens instantly. We’ve recovered hundreds of hours a month.',
    serviceType: 'Workflow Automation',
    rotationDeg: -1.5,
  },
  {
    id: 't2',
    clientName: 'David Chen',
    clientRole: 'Founder',
    clientCompany: 'Nordic Wares',
    quote: 'The AI agent they built handles 70% of our tier-1 support tickets perfectly. Our customer satisfaction scores have actually gone UP since deploying it.',
    serviceType: 'AI Agents',
    rotationDeg: 1.2,
  },
  {
    id: 't3',
    clientName: 'Elena Rostova',
    clientRole: 'Director of Sales',
    clientCompany: 'SaaS Dynamics',
    quote: 'Our sales team used to spend hours researching leads on LinkedIn. Now, they get a Slack alert with a full dossier the second a lead comes in. Game changer.',
    serviceType: 'CRM & Sales',
    rotationDeg: -0.5,
  },
  {
    id: 't4',
    clientName: 'Marcus Thorne',
    clientRole: 'CEO',
    clientCompany: 'Thorne Logistics',
    quote: 'We couldn’t find off-the-shelf software to handle our dispatch routing. They built a custom operational system that fits our weird, specific needs perfectly.',
    serviceType: 'Custom Operations',
    rotationDeg: 2.0,
  },
  {
    id: 't5',
    clientName: 'Julia Vance',
    clientRole: 'Marketing Director',
    clientCompany: 'Bloom E-Commerce',
    quote: 'I used to hate Mondays because it meant compiling reports from 6 different platforms. Now I just open the dashboard they built and everything is live.',
    serviceType: 'Workflow Automation',
    rotationDeg: -1.8,
  },
  {
    id: 't6',
    clientName: 'Tom Booker',
    clientRole: 'Head of Support',
    clientCompany: 'FinTech Plus',
    quote: 'They didn’t just hand us a bot and leave. They mapped out our entire support hierarchy and built an AI router that actually understands urgency.',
    serviceType: 'AI Agents',
    rotationDeg: 1.5,
  },
];

export const AGENCY_METRICS = [
  { label: 'Avg Response Time', value: '< 15m' },
  { label: 'Client Retention', value: '98%' },
  { label: 'Project Success Rate', value: '100%' }
];
