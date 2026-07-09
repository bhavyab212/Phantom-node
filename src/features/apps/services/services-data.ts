// Services data — each id maps to a Contact app intent option exactly
// Intent options in ContactStepIntent.tsx: 'Web Design / Development', 'Branding / Identity', 'Marketing / Growth', 'Other'

export interface Service {
  id: string;           // must match Contact intent id for pre-fill
  title: string;
  oneLine: string;      // one sentence — who it's for
  description: string;  // 2–3 sentences on what's included
  deliverables: string[];
  priceLabel: string;   // e.g. "Starting at $2,500"
  timelineEstimate: string;
  bestFor: string;
  featured?: boolean;   // highlights one card in the grid
}

export const SERVICES: Service[] = [
  {
    id: 'Web Design / Development',
    title: 'Web Design & Development',
    oneLine: 'For businesses that need a site that actually converts, not just looks good.',
    description:
      'We design and build performance-first websites from the ground up — custom design, clean code, and no page-builder bloat. Every site ships fully responsive, optimised for Core Web Vitals, and connected to your analytics from day one.',
    deliverables: [
      'Custom UI design (Figma → production)',
      'Responsive, accessible front-end build',
      'CMS integration (Sanity, Contentful, or WordPress)',
      'SEO foundations & structured data',
      'Google Analytics 4 + Search Console setup',
      '30-day post-launch support',
    ],
    priceLabel: 'Starting at $3,500',
    timelineEstimate: '3–6 weeks',
    bestFor: 'Startups, SaaS products, and service businesses replacing a DIY or template site',
    featured: true,
  },
  {
    id: 'Branding / Identity',
    title: 'Brand Identity',
    oneLine: 'For founders who need a visual identity that holds up across every touchpoint.',
    description:
      'We develop brand identities that are distinctive and durable — not trend-chasing. The deliverable is a complete system you can hand to any designer or developer and have them work consistently within it.',
    deliverables: [
      'Logo suite (primary, secondary, icon mark)',
      'Color palette with accessibility ratios',
      'Typography system (2–3 typefaces)',
      'Brand guidelines document (PDF + Figma)',
      'Business card & email signature templates',
    ],
    priceLabel: 'Starting at $2,000',
    timelineEstimate: '2–4 weeks',
    bestFor: 'Pre-launch startups and established businesses undergoing a rebrand',
  },
  {
    id: 'Marketing / Growth',
    title: 'Marketing & Growth',
    oneLine: 'For teams generating traffic but not turning visitors into qualified leads.',
    description:
      'We audit your existing funnel, identify the highest-leverage interventions, and implement them — from landing page copy to paid acquisition to conversion rate optimisation. We focus on ROI-positive work, not vanity metrics.',
    deliverables: [
      'Full funnel audit & conversion teardown',
      'Landing page redesign & copywriting',
      'Paid media setup (Google Ads or Meta)',
      'Email nurture sequence (3–5 emails)',
      'Monthly performance report with recommendations',
    ],
    priceLabel: 'From $1,500/month',
    timelineEstimate: 'Ongoing — first results in 30 days',
    bestFor: 'Growth-stage companies with existing traffic but a leaky funnel',
  },
  {
    id: 'Other',
    title: 'Strategy & Consulting',
    oneLine: 'For teams that need an outside perspective before committing to a direction.',
    description:
      'Half-day and full-day advisory sessions where we work through your positioning, tech stack choices, roadmap prioritisation, or product strategy. You leave with documented decisions and a clear next step, not a slide deck of vague recommendations.',
    deliverables: [
      'Pre-session intake questionnaire',
      'Structured 3–6 hour working session',
      'Session notes & decision log',
      'Recommended next steps document',
      'One follow-up call within 14 days',
    ],
    priceLabel: 'From $800/session',
    timelineEstimate: 'Book within 1–2 weeks',
    bestFor: 'Founders, CTOs, and product leads facing a high-stakes decision',
  },
];
