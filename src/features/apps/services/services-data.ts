// Services data — each id maps to a Contact app intent option exactly
// Intent options in ContactStepIntent.tsx will be updated to match this list.

export interface Service {
  id: string;
  title: string;
  oneLine: string;
  description: string;
  deliverables: string[];
  process: { title: string; description: string }[];
  techStack: string[];
  faq: { question: string; answer: string }[];
  priceLabel: string;
  timelineEstimate: string;
  bestFor: string;
  featured?: boolean;
  logoType: string;
}

export const SERVICES: Service[] = [
  {
    id: 'Web Design / Development',
    title: 'Web Design & Development',
    oneLine: 'For businesses that need a site that actually converts, not just looks good.',
    description: 'We design and build performance-first websites from the ground up — custom design, clean code, and no page-builder bloat. Every site ships fully responsive, optimised for Core Web Vitals, and connected to your analytics from day one.',
    deliverables: [
      'Custom UI design (Figma → production)',
      'Responsive, accessible front-end build',
      'CMS integration (Sanity, Contentful, or WordPress)',
      'SEO foundations & structured data',
      'Google Analytics 4 + Search Console setup',
      '30-day post-launch support',
    ],
    process: [
      { title: 'Discovery & Strategy', description: 'Deep dive into your business goals, target audience, and current analytics to define site architecture.' },
      { title: 'UX & UI Design', description: 'Wireframing key flows followed by high-fidelity Figma designs, ensuring the aesthetic aligns with your brand.' },
      { title: 'Development', description: 'Building the frontend and integrating the CMS for blazing fast performance and easy content editing.' },
      { title: 'QA & Launch', description: 'Rigorous cross-browser testing, SEO audits, and a seamless zero-downtime deployment.' }
    ],
    techStack: ['Figma', 'Next.js', 'React', 'Tailwind CSS', 'Sanity CMS'],
    faq: [
      { question: 'Do you use templates?', answer: 'No, every site we build is completely custom designed in Figma and coded from scratch for optimal performance.' },
      { question: 'Will I be able to edit the site myself?', answer: 'Yes! We integrate an intuitive Headless CMS (like Sanity) so your team can publish content without touching code.' }
    ],
    priceLabel: 'Starts from $500 | ₹15,000',
    timelineEstimate: '1–2 weeks',
    bestFor: 'Startups, SaaS products, and service businesses replacing a DIY or template site',
    featured: true,
    logoType: 'web-design'
  },
  {
    id: 'Custom Web App',
    title: 'Custom Web App Development',
    oneLine: 'For complex ideas that require robust backend logic and interactive user experiences.',
    description: 'We build scalable, secure, and lightning-fast web applications. From internal dashboards to SaaS products, we engineer full-stack solutions that solve real business problems and scale with your user base.',
    deliverables: [
      'Full-stack architecture design',
      'Custom API development & third-party integrations',
      'Secure authentication & role-based access',
      'Scalable database design',
      'CI/CD pipeline setup',
      'Scalable cloud deployment'
    ],
    process: [
      { title: 'Architecture Planning', description: 'Mapping out data models, user flows, and choosing the right tech stack for scale.' },
      { title: 'Frontend Development', description: 'Building a snappy, reactive user interface using modern frameworks.' },
      { title: 'Backend & API', description: 'Developing the core business logic, securing endpoints, and setting up the database.' },
      { title: 'Testing & Deployment', description: 'Automated testing and deploying to a scalable cloud environment.' }
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Vercel'],
    faq: [
      { question: 'Can you integrate with our existing software?', answer: 'Yes, we specialize in building custom APIs and integrating with legacy systems or third-party platforms via REST or GraphQL.' },
      { question: 'Who owns the code?', answer: 'You do. Upon completion and final payment, the entire codebase and intellectual property is transferred to you.' }
    ],
    priceLabel: 'Starts from $1,500 | ₹50,000',
    timelineEstimate: '2–4 weeks',
    bestFor: 'Founders building a SaaS, or enterprises needing custom internal tooling.',
    logoType: 'custom-web-app'
  },
  {
    id: 'Mobile App Development',
    title: 'Mobile App Development',
    oneLine: 'For brands that need a native-feeling experience in their customers pockets.',
    description: 'We develop beautiful, performant mobile applications for iOS and Android. Using modern frameworks, we ensure your app feels native, fast, and provides an exceptional user experience on any device.',
    deliverables: [
      'iOS & Android native or cross-platform apps',
      'App Store & Google Play submission',
      'Push notification infrastructure',
      'Offline-first capability design',
      'Mobile-optimized API endpoints',
    ],
    process: [
      { title: 'Prototyping', description: 'Creating interactive mobile prototypes to test the user experience before coding.' },
      { title: 'Development', description: 'Building the app using React Native or Swift/Kotlin, depending on performance needs.' },
      { title: 'Beta Testing', description: 'Distributing via TestFlight and Google Play Console for real-world user feedback.' },
      { title: 'Launch', description: 'Handling the complex App Store review processes and successful public launch.' }
    ],
    techStack: ['React Native', 'Swift', 'Kotlin', 'Firebase'],
    faq: [
      { question: 'Do you build native or cross-platform?', answer: 'We typically recommend React Native for 80% of use cases to save time and budget, but we build fully native apps when absolute maximum performance is required.' },
      { question: 'Do you help with App Store rejection?', answer: 'Yes, our team handles the entire submission process and will resolve any compliance issues raised by Apple or Google.' }
    ],
    priceLabel: 'Starts from $2,000 | ₹75,000',
    timelineEstimate: '2–4 weeks',
    bestFor: 'Consumer brands, communities, and SaaS platforms expanding to mobile.',
    logoType: 'mobile-app'
  },
  {
    id: 'E-commerce Development',
    title: 'E-commerce Development',
    oneLine: 'For merchants who need high-converting, blazing-fast online storefronts.',
    description: 'We build headless e-commerce experiences that don\'t suffer from the typical Shopify theme bloat. By decoupling the frontend, we deliver sub-second page loads that dramatically increase your conversion rate.',
    deliverables: [
      'Headless Shopify or WooCommerce setup',
      'Custom highly-optimized frontend',
      'Advanced product filtering and search',
      'Custom cart and checkout flows',
      'Inventory management integration'
    ],
    process: [
      { title: 'Store Strategy', description: 'Analyzing your product catalogue and defining the optimal taxonomy and user journey.' },
      { title: 'UI Design', description: 'Designing a bespoke storefront that highlights your brand and reduces friction.' },
      { title: 'Headless Build', description: 'Connecting a custom frontend framework to your e-commerce backend via APIs.' },
      { title: 'Migration & Launch', description: 'Securely migrating old customer data and launching the new high-performance storefront.' }
    ],
    techStack: ['Shopify Plus', 'Next.js', 'Stripe', 'Algolia'],
    faq: [
      { question: 'Why headless e-commerce?', answer: 'Headless allows us to build a frontend that is infinitely customizable and incredibly fast, without being constrained by traditional Shopify theme limits.' },
      { question: 'Will I still use the Shopify admin dashboard?', answer: 'Yes! Your team will continue to manage products, orders, and customers in the familiar Shopify backend.' }
    ],
    priceLabel: 'Starts from $1,000 | ₹30,000',
    timelineEstimate: '1–3 weeks',
    bestFor: 'Scaling DTC brands hitting the limits of standard e-commerce themes.',
    logoType: 'ecommerce'
  },
  {
    id: 'Branding / Identity',
    title: 'Brand Identity',
    oneLine: 'For founders who need a visual identity that holds up across every touchpoint.',
    description: 'We develop brand identities that are distinctive and durable — not trend-chasing. The deliverable is a complete system you can hand to any designer or developer and have them work consistently within it.',
    deliverables: [
      'Logo suite (primary, secondary, icon mark)',
      'Color palette with accessibility ratios',
      'Typography system (2–3 typefaces)',
      'Brand guidelines document (PDF + Figma)',
      'Business card & email signature templates',
    ],
    process: [
      { title: 'Brand Workshop', description: 'A collaborative session to define your brand archetypes, voice, and visual direction.' },
      { title: 'Concepting', description: 'Presenting 2-3 distinct visual directions based on our strategic findings.' },
      { title: 'Refinement', description: 'Iterating on the chosen concept to perfection.' },
      { title: 'Systemization', description: 'Building the final brand book and exporting all assets in every necessary format.' }
    ],
    techStack: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop'],
    faq: [
      { question: 'Do you offer naming services?', answer: 'Yes, brand naming can be added as a preliminary phase before we begin visual identity work.' },
      { question: 'What files do I receive?', answer: 'You receive all raw vector files (.ai, .svg), raster exports (.png, .jpg), and a comprehensive PDF brand guideline.' }
    ],
    priceLabel: 'Starts from $300 | ₹10,000',
    timelineEstimate: '2–5 days',
    bestFor: 'Pre-launch startups and established businesses undergoing a rebrand',
    logoType: 'brand-identity'
  },
  {
    id: 'Marketing / Growth',
    title: 'Marketing & Growth',
    oneLine: 'For teams generating traffic but not turning visitors into qualified leads.',
    description: 'We audit your existing funnel, identify the highest-leverage interventions, and implement them — from landing page copy to paid acquisition to conversion rate optimisation. We focus on ROI-positive work, not vanity metrics.',
    deliverables: [
      'Full funnel audit & conversion teardown',
      'Landing page redesign & copywriting',
      'Paid media setup (Google Ads or Meta)',
      'Email nurture sequence (3–5 emails)',
      'Monthly performance report with recommendations',
    ],
    process: [
      { title: 'Audit', description: 'Deep analysis of your current traffic, conversion rates, and ad spend.' },
      { title: 'Strategy', description: 'Identifying the low-hanging fruit and high-impact changes.' },
      { title: 'Implementation', description: 'Designing new landing pages, writing copy, and launching new campaigns.' },
      { title: 'Optimization', description: 'Continuous A/B testing and budget reallocation based on real data.' }
    ],
    techStack: ['Google Ads', 'Meta Ads', 'HubSpot', 'PostHog'],
    faq: [
      { question: 'Do you manage ad spend?', answer: 'Yes, we can take over media buying and actively manage your ad budgets across Google and Meta.' },
      { question: 'How do you measure success?', answer: 'We measure success strictly on Cost Per Acquisition (CPA) and Return on Ad Spend (ROAS), never just clicks or impressions.' }
    ],
    priceLabel: 'Starts from $300 | ₹10,000',
    timelineEstimate: 'Depends on scope',
    bestFor: 'Growth-stage companies with existing traffic but a leaky funnel',
    logoType: 'marketing-growth'
  },
  {
    id: 'SEO & Content',
    title: 'SEO & Content Strategy',
    oneLine: 'For businesses looking to build a sustainable, long-term organic acquisition engine.',
    description: 'We build SEO strategies that actually drive revenue, not just arbitrary traffic. Through deep technical optimization, high-intent keyword targeting, and programmatic content architectures, we build moats around your business.',
    deliverables: [
      'Comprehensive Technical SEO Audit',
      'Keyword Gap & Opportunity Analysis',
      'Content architecture and topic clusters',
      'Programmatic SEO page generation templates',
      'High-quality foundational blog content'
    ],
    process: [
      { title: 'Technical Audit', description: 'Fixing crawl errors, site speed issues, and architecture flaws.' },
      { title: 'Keyword Strategy', description: 'Mapping out high-intent, low-competition keywords that your competitors are missing.' },
      { title: 'Content Production', description: 'Creating high-quality, helpful content that ranks and converts.' },
      { title: 'Link Building', description: 'Strategic outreach to build domain authority through high-quality backlinks.' }
    ],
    techStack: ['Ahrefs', 'Semrush', 'Google Search Console', 'Screaming Frog'],
    faq: [
      { question: 'How long until we see results?', answer: 'SEO is a long-term play. While technical fixes can show immediate bumps, content strategies typically take 3-6 months to show significant ROI.' },
      { question: 'Do you write the content?', answer: 'Yes, we have specialized technical writers who produce the content, or we can provide detailed briefs for your internal team.' }
    ],
    priceLabel: 'Starts from $400 | ₹15,000',
    timelineEstimate: 'Depends on scope',
    bestFor: 'B2B SaaS and service businesses looking for long-term customer acquisition.',
    logoType: 'seo-content'
  },
  {
    id: 'AI / Automations',
    title: 'AI & Automation Integration',
    oneLine: 'For operations bogged down by manual data entry and repetitive tasks.',
    description: 'We replace human manual labor with intelligent, autonomous AI workflows. By connecting your existing software stack with LLMs and automation platforms, we can reduce operational costs by up to 80%.',
    deliverables: [
      'Workflow inefficiency audit',
      'Custom AI Agent development',
      'Zapier / Make.com complex integrations',
      'Custom LLM fine-tuning on company data',
      'Staff training on new automated systems'
    ],
    process: [
      { title: 'Process Mapping', description: 'Documenting your current manual workflows step-by-step.' },
      { title: 'Tool Selection', description: 'Identifying the right APIs, automation platforms, and AI models for the job.' },
      { title: 'Integration Build', description: 'Wiring the systems together and writing custom scripts for edge cases.' },
      { title: 'Testing & Handover', description: 'Running edge-case scenarios and training your team on how to monitor the automations.' }
    ],
    techStack: ['OpenAI', 'Anthropic', 'Make.com', 'Zapier', 'Python'],
    faq: [
      { question: 'Are our internal documents safe with AI?', answer: 'Yes. We strictly use enterprise APIs with zero-data-retention policies, meaning your data is never used to train public models.' },
      { question: 'What if an API changes?', answer: 'We build robust error handling and offer ongoing maintenance retainers to ensure your automations never break.' }
    ],
    priceLabel: 'Starts from $800 | ₹25,000',
    timelineEstimate: '1–3 weeks',
    bestFor: 'Agencies, real estate firms, and e-commerce brands with high administrative overhead.',
    logoType: 'ai-automation'
  },
  {
    id: 'Other',
    title: 'Strategy & Consulting',
    oneLine: 'For teams that need an outside perspective before committing to a direction.',
    description: 'Half-day and full-day advisory sessions where we work through your positioning, tech stack choices, roadmap prioritisation, or product strategy. You leave with documented decisions and a clear next step, not a slide deck of vague recommendations.',
    deliverables: [
      'Pre-session intake questionnaire',
      'Structured 3–6 hour working session',
      'Session notes & decision log',
      'Recommended next steps document',
      'One follow-up call within 14 days',
    ],
    process: [
      { title: 'Preparation', description: 'You provide us with your current metrics, challenges, and goals via an intake form.' },
      { title: 'The Workshop', description: 'A highly structured, no-BS video call where we tear down problems and build solutions.' },
      { title: 'Documentation', description: 'We synthesize the discussion into an actionable playbook.' },
      { title: 'Review', description: 'A 30-minute follow-up call two weeks later to ensure momentum.' }
    ],
    techStack: ['Miro', 'Notion', 'Loom'],
    faq: [
      { question: 'Is this just a glorified sales pitch?', answer: 'Absolutely not. This is a paid, intensive consulting session. If we find you need execution help afterwards, we can discuss it, but the goal is to give you everything you need to execute yourself.' },
      { question: 'Can my whole team join?', answer: 'Yes, though we recommend keeping the group under 5 people to ensure the session remains productive and focused.' }
    ],
    priceLabel: 'Starts from $150 | ₹5,000',
    timelineEstimate: '2–5 days',
    bestFor: 'Founders, CTOs, and product leads facing a high-stakes decision',
    logoType: 'strategy'
  },
  {
    id: 'UI/UX Design',
    title: 'UI/UX Design',
    oneLine: 'For products that need a user-centered interface that looks beautiful and works flawlessly.',
    description: 'We design intuitive and stunning user interfaces for mobile and web apps. By focusing on user experience, we ensure that your product not only looks great but is extremely easy to use.',
    deliverables: [
      'User research & persona creation',
      'Wireframing & prototyping',
      'High-fidelity Figma designs',
      'Interactive prototypes',
      'Design system & component library'
    ],
    process: [
      { title: 'Research', description: 'Understanding your users and market to define the design strategy.' },
      { title: 'Wireframing', description: 'Creating the skeleton of the app to map out the user journey.' },
      { title: 'Visual Design', description: 'Applying colors, typography, and visual elements to bring the wireframes to life.' },
      { title: 'Handoff', description: 'Preparing detailed design specs for developers.' }
    ],
    techStack: ['Figma', 'Protopie', 'Adobe XD'],
    faq: [
      { question: 'Do you also code the designs?', answer: 'This specific service focuses on design, but our development team can absolutely build it for you.' },
      { question: 'How many revisions do we get?', answer: 'We include 2 major revision rounds during the visual design phase.' }
    ],
    priceLabel: 'Starts from $400 | ₹15,000',
    timelineEstimate: '1–3 weeks',
    bestFor: 'Startups and enterprises needing a complete UI/UX overhaul or new product design.',
    logoType: 'ui-ux'
  },
  {
    id: 'Social Media Management',
    title: 'Social Media Management',
    oneLine: 'For brands that want to grow their online presence without the daily hassle.',
    description: 'We handle your entire social media presence—from content creation to community management. We focus on building authentic connections and driving engagement across all platforms.',
    deliverables: [
      'Content strategy & calendar',
      'Custom graphic design & copywriting',
      'Daily posting & community management',
      'Influencer outreach',
      'Monthly performance analytics'
    ],
    process: [
      { title: 'Strategy', description: 'Defining the brand voice, content pillars, and platform focus.' },
      { title: 'Creation', description: 'Designing graphics, writing captions, and scheduling posts.' },
      { title: 'Engagement', description: 'Responding to comments and building relationships with your audience.' },
      { title: 'Reporting', description: 'Analyzing metrics to refine the strategy for the next month.' }
    ],
    techStack: ['Buffer', 'Canva', 'Later', 'Meta Business Suite'],
    faq: [
      { question: 'Which platforms do you manage?', answer: 'We cover Instagram, LinkedIn, Twitter/X, Facebook, and TikTok.' },
      { question: 'Do you respond to DMs?', answer: 'Yes, we handle basic customer service inquiries and escalate complex issues to your team.' }
    ],
    priceLabel: 'Starts from $250 | ₹10,000',
    timelineEstimate: 'Depends on scope',
    bestFor: 'Brands and personalities looking for consistent, high-quality social output.',
    logoType: 'social-media'
  }
];
