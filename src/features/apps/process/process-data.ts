import { ProcessPhase, ProcessPrinciple, ProcessFAQ, ProcessExpectation } from './process-types';

export const PROCESS_PHASES: ProcessPhase[] = [
  {
    id: 'discovery',
    number: 1,
    name: 'Discovery & Strategy',
    tagline: 'We dive deep to find the highest-leverage opportunities.',
    description: 'Before we design or build, we need to understand your business inside and out. This phase uncovers the technical, competitive, and strategic landscape so that everything we do is grounded in reality, not assumptions.',
    duration: '1-2 weeks',
    deliverables: [
      'Project brief',
      'Competitive audit',
      'Sitemap and information architecture',
      'Technical requirements document'
    ],
    clientResponsibilities: [
      'Share business goals and constraints',
      'Provide access to existing analytics and CMS',
      'Approve project brief'
    ],
    keyActivities: [
      'Stakeholder interviews',
      'Analytics review',
      'Competitive analysis',
      'Technical scoping'
    ],
    icon: 'search',
    accentColor: '#3b82f6'
  },
  {
    id: 'design',
    number: 2,
    name: 'Design & Direction',
    tagline: 'We build the visual and interactive blueprint.',
    description: 'We translate strategy into tangible layouts and aesthetic directions. We start with wireframes to nail down the UX, then apply a cohesive visual design system that aligns with your brand and appeals to your audience.',
    duration: '2-3 weeks',
    deliverables: [
      'Wireframes for all key pages',
      'Visual design system',
      'Interactive prototype',
      'Design revision rounds'
    ],
    clientResponsibilities: [
      'Review and provide structured feedback',
      'Approve final design direction',
      'Provide brand assets and content drafts'
    ],
    keyActivities: [
      'UX wireframing',
      'Visual design exploration',
      'Prototyping',
      'Design review sessions'
    ],
    icon: 'pen-tool',
    accentColor: '#a855f7'
  },
  {
    id: 'build',
    number: 3,
    name: 'Build & Integrate',
    tagline: 'We engineer robust, scalable solutions.',
    description: 'With designs approved, our engineering team brings the platform to life. We focus on performance, accessibility, and clean code while integrating with your CMS and any required third-party APIs.',
    duration: '3-5 weeks',
    deliverables: [
      'Fully responsive frontend',
      'CMS integration',
      'Performance optimization',
      'Cross-browser testing report'
    ],
    clientResponsibilities: [
      'Provide final content',
      'Review staging builds',
      'Flag issues during QA'
    ],
    keyActivities: [
      'Frontend development',
      'CMS setup and configuration',
      'API integrations',
      'Performance and accessibility audit'
    ],
    icon: 'code',
    accentColor: '#10b981'
  },
  {
    id: 'launch',
    number: 4,
    name: 'Launch & Handoff',
    tagline: 'We deploy flawlessly and set you up for success.',
    description: 'The final push to get your new platform live. We handle the deployment intricacies, perform final end-to-end testing, and train your team on how to manage and scale the product moving forward.',
    duration: '1 week + ongoing',
    deliverables: [
      'Production deployment',
      'Documentation and training guide',
      '30-day post-launch support',
      'Analytics handoff'
    ],
    clientResponsibilities: [
      'Final content review',
      'DNS and domain configuration',
      'Approve go-live'
    ],
    keyActivities: [
      'Deployment',
      'QA and testing',
      'Training session',
      'Post-launch monitoring'
    ],
    icon: 'rocket',
    accentColor: '#f59e0b'
  }
];

export const PROCESS_PRINCIPLES: ProcessPrinciple[] = [
  {
    id: 'no-surprises',
    title: 'No surprises',
    description: 'Pricing, timeline, and scope are agreed upfront. If scope changes, we discuss the impact before doing the work.',
    icon: 'shield-check'
  },
  {
    id: 'ownership',
    title: 'You own everything',
    description: 'All files, code, design assets, and content belong entirely to you upon project completion.',
    icon: 'key'
  },
  {
    id: 'weekly-checkins',
    title: 'Weekly check-ins',
    description: 'We rely on structured communication, not ad-hoc pings. You\'ll always know what we accomplished and what\'s next.',
    icon: 'calendar'
  },
  {
    id: 'incremental-shipping',
    title: 'Ship in increments',
    description: 'We want you to see progress early and often, avoiding a massive, risky reveal at the very end.',
    icon: 'git-merge'
  }
];

export const PROCESS_FAQS: ProcessFAQ[] = [
  {
    id: 'post-launch',
    question: 'What if I need changes after launch?',
    answer: 'Every project includes 30 days of post-launch support for bugs and minor adjustments. For ongoing feature development or maintenance, we offer tailored retainer agreements to keep your platform evolving.'
  },
  {
    id: 'revisions',
    question: 'How do revisions work?',
    answer: 'We typically include 2 dedicated rounds of revisions per major milestone (e.g., wireframes, visual design). We use centralized tools for feedback to ensure all comments are captured and addressed systematically.'
  },
  {
    id: 'urgent-timeline',
    question: 'What if my timeline is urgent?',
    answer: 'We can accommodate rush projects depending on our current bandwidth. This requires an expedited fee and highly responsive communication from your team to hit accelerated milestones.'
  },
  {
    id: 'existing-cms',
    question: 'Do you work with our existing CMS?',
    answer: 'Yes, we frequently integrate with modern headless CMS platforms (Sanity, Contentful, Strapi) as well as traditional ones (WordPress, Webflow) depending on the project architecture and your team\'s needs.'
  },
  {
    id: 'source-files',
    question: 'What happens to the source files?',
    answer: 'At the end of the project, you receive full ownership and access to all Figma files, GitHub repositories, and original assets. There is no vendor lock-in.'
  }
];

export const PROCESS_EXPECTATIONS: ProcessExpectation[] = [
  {
    id: 'communication',
    category: 'Communication',
    title: 'Response time expectations',
    detail: 'We respond to all emails and basecamp messages within 24 business hours. We hold one standing weekly alignment call.'
  },
  {
    id: 'timeline',
    category: 'Timeline',
    title: 'What affects delivery dates',
    detail: 'Timelines are collaborative. Delays in client feedback or asset delivery will directly push back the final launch date.'
  },
  {
    id: 'revisions',
    category: 'Revisions',
    title: 'Structured feedback',
    detail: 'We ask that you consolidate feedback from all your stakeholders into a single, cohesive list per revision round to avoid conflicting requests.'
  },
  {
    id: 'payment',
    category: 'Payment',
    title: 'Milestone invoicing',
    detail: 'We require a 50% deposit to secure your start date. The remaining balance is tied to specific, agreed-upon project milestones (e.g., 25% at design approval, 25% at launch).'
  }
];
