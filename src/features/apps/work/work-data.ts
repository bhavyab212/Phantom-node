import { CaseStudy } from './work-types';

export const WORK_PROJECTS: CaseStudy[] = [
  {
    id: 'cs-northstar',
    slug: 'northstar-health',
    projectName: 'Digital Transformation & Patient Portal',
    clientName: 'Northstar Health',
    category: 'Web Design & Development',
    tagline: 'Modernizing patient onboarding and increasing appointments.',
    headlineMetric: '42% faster page loads, 27% more qualified leads',
    year: 2025,
    duration: '12 weeks',
    heroMedia: { type: 'image', alt: 'Northstar Health Patient Portal Preview' },
    challenge: {
      title: 'Friction at the front door.',
      body: "Northstar Health's legacy site was losing 40% of mobile visitors before they ever reached the booking form. Their CMS was 6 years old, and every content update required a developer, making marketing agility impossible. The brand felt clinical and outdated compared to newer telehealth competitors."
    },
    strategy: {
      title: 'A unified, empathetic experience.',
      body: "We audited the entire patient journey and identified the highest-leverage bottlenecks. Instead of just a visual refresh, we architected a new front-end designed around specific patient intents: booking, billing, and finding care.",
      keyPoints: [
        'Migrated to a headless Next.js architecture for sub-second load times',
        'Redesigned the booking flow from a 7-step process to a seamless 3-step wizard',
        'Implemented a warm, accessible color palette to reduce patient anxiety'
      ]
    },
    execution: {
      title: 'Building for scale and speed.',
      body: "We delivered a custom web application integrating securely with their existing EHR system. The marketing team was empowered with a headless CMS (Sanity) to manage content instantly.",
      deliverables: [
        'Custom Next.js Web Application',
        'EHR API Integration',
        'Headless CMS Implementation',
        'Accessible Design System'
      ]
    },
    results: {
      title: 'Measurable growth in patient acquisition.',
      body: "The new platform completely eliminated the mobile drop-off bottleneck and established Northstar as a modern healthcare provider. Bookings skyrocketed within the first 30 days."
    },
    metrics: [
      { value: '42%', label: 'Faster page load' },
      { value: '27%', label: 'Increase in qualified leads' },
      { value: '30%', label: 'Reduction in bounce rate' }
    ],
    timeline: [
      { phase: '01', label: 'Discovery & UX Audit', duration: 'Weeks 1-2' },
      { phase: '02', label: 'UI Design & Prototyping', duration: 'Weeks 3-6' },
      { phase: '03', label: 'Development & Integration', duration: 'Weeks 7-10' },
      { phase: '04', label: 'Testing & Launch', duration: 'Weeks 11-12' }
    ],
    testimonial: {
      quote: "The new platform is a game-changer. We're seeing more bookings, fewer support calls about the website, and our marketing team can finally move fast. Phantom Node didn't just build a site; they solved a core business problem.",
      author: "Dr. Elena Rostova",
      role: "Chief Medical Officer",
      company: "Northstar Health"
    },
    gallery: [],
    serviceIntent: 'idx-srv-web',
    linkedFileFolderId: 'f-portfolio-1',
    linkedFileIds: ['f-ns-case-study', 'f-ns-brand-guidelines', 'f-ns-homepage-wireframe'],
    featured: true,
    sortOrder: 1
  },
  {
    id: 'cs-atlas',
    slug: 'atlas-automation',
    projectName: 'Operations Automation Engine',
    clientName: 'Atlas Logistics',
    category: 'Growth & Marketing',
    tagline: 'Eliminating manual data entry and accelerating operations.',
    headlineMetric: '18 hours saved per week on manual dispatch',
    year: 2026,
    duration: '8 weeks',
    heroMedia: { type: 'image', alt: 'Atlas Automation Dashboard Preview' },
    challenge: {
      title: 'Drowning in manual processes.',
      body: "Atlas was paralyzed by manual data entry. Dispatchers were spending up to 4 hours a day copying data between their CRM, fleet management software, and accounting tools. This led to frequent human errors and delayed invoicing, hurting cash flow."
    },
    strategy: {
      title: 'Event-driven operational sync.',
      body: "We mapped out their entire dispatch workflow and identified the core bottlenecks. We designed an event-driven automation architecture that securely synchronized data across their disparate tools in real-time.",
      keyPoints: [
        'Audited 14 distinct manual workflows',
        'Designed a self-hosted n8n infrastructure for absolute data privacy',
        'Standardized data payloads between the CRM and accounting software'
      ]
    },
    execution: {
      title: 'Connecting the unconnectable.',
      body: "We deployed a robust data pipeline that listened for dispatch events, automatically generated invoices, and notified drivers via SMS.",
      deliverables: [
        'Self-hosted n8n Instance',
        'Custom API Connectors',
        'Automated Invoicing Pipeline',
        'Staff Training Protocol'
      ]
    },
    results: {
      title: 'Instant ROI through reclaimed time.',
      body: "By automating the dispatch-to-invoice pipeline, Atlas reclaimed nearly an entire part-time role's worth of hours each week, completely eliminating transcription errors."
    },
    metrics: [
      { value: '18 hrs', label: 'Manual work saved per week' },
      { value: '0', label: 'Data entry errors post-launch' },
      { value: '5 min', label: 'Invoice processing time (down from 3 days)' }
    ],
    timeline: [
      { phase: '01', label: 'Workflow Mapping', duration: 'Weeks 1-2' },
      { phase: '02', label: 'Architecture Design', duration: 'Weeks 3-4' },
      { phase: '03', label: 'Pipeline Development', duration: 'Weeks 5-7' },
      { phase: '04', label: 'Deployment & Training', duration: 'Week 8' }
    ],
    testimonial: null,
    gallery: [],
    serviceIntent: 'idx-srv-growth',
    linkedFileFolderId: 'f-portfolio-2',
    linkedFileIds: ['f-at-automation-audit', 'f-at-n8n-workflows', 'f-at-infra-plan'],
    featured: true,
    sortOrder: 2
  },
  {
    id: 'cs-apex',
    slug: 'apex-financial',
    projectName: 'Global Rebrand & Launch',
    clientName: 'Apex Financial',
    category: 'Branding & Identity',
    tagline: 'Bridging legacy stability with modern accessibility.',
    headlineMetric: '250% increase in social engagement post-launch',
    year: 2024,
    duration: '10 weeks',
    heroMedia: { type: 'image', alt: 'Apex Financial Rebrand Preview' },
    challenge: {
      title: 'An outdated perception of trust.',
      body: "Apex’s visual identity hadn’t been updated in 15 years. Their messaging felt rigid, failing to resonate with the emerging millennial and Gen-Z investor demographics who demand transparency and modern, approachable design."
    },
    strategy: {
      title: 'Honoring the past, designing for the future.',
      body: "We conducted extensive market research and stakeholder interviews to uncover the core values that defined Apex. The strategy was to bridge their history of stability with a modern, digital-first aesthetic.",
      keyPoints: [
        'Conducted 20+ stakeholder interviews',
        'Developed a new brand voice centered on transparent education',
        'Designed a scalable design system for digital and print'
      ]
    },
    execution: {
      title: 'A comprehensive identity system.',
      body: "We delivered a complete identity system including a modernized logo, dynamic color palette, and comprehensive typographic guidelines, alongside a suite of marketing assets for the launch campaign.",
      deliverables: [
        'Brand Strategy & Positioning',
        'Logo & Visual Identity',
        'Comprehensive Brand Guidelines',
        'Launch Campaign Assets'
      ]
    },
    results: {
      title: 'A revitalized market presence.',
      body: "The rebrand successfully shifted public perception, driving immediate engagement from younger demographics without alienating their core legacy clients."
    },
    metrics: [
      { value: '+250%', label: 'Social engagement post-launch' },
      { value: '+15%', label: 'Growth in under-35 accounts' },
      { value: '2', label: 'Industry design awards' }
    ],
    timeline: [
      { phase: '01', label: 'Research & Strategy', duration: 'Weeks 1-3' },
      { phase: '02', label: 'Identity Concepting', duration: 'Weeks 4-6' },
      { phase: '03', label: 'System Refinement', duration: 'Weeks 7-8' },
      { phase: '04', label: 'Asset Production', duration: 'Weeks 9-10' }
    ],
    testimonial: {
      quote: "The new brand is a perfect reflection of where we are going, while honoring where we came from. It's been a game-changer for our recruitment and marketing efforts.",
      author: "Sarah Jenkins",
      role: "Chief Marketing Officer",
      company: "Apex Financial"
    },
    gallery: [],
    serviceIntent: 'idx-srv-brand',
    linkedFileFolderId: 'f-portfolio-3',
    linkedFileIds: ['f-ap-brand-book', 'f-ap-logo-suite', 'f-ap-launch-deck'],
    featured: false,
    sortOrder: 3
  }
];
