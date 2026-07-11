/**
 * studio-copy.ts
 * Authoritative source of truth for all editorial content in the Studio app.
 * Copy used verbatim from the brief. Do not replace with generic placeholders.
 */

// ─── OVERVIEW ────────────────────────────────────────────────────────────────

export const overviewCopy = {
  kicker: 'STUDIO — 002',
  headline:
    "We don't sell automation. We remove the parts of your business that shouldn't need a human anymore.",
  subhead:
    'Founded by builders who got tired of watching operations teams do by hand what software should already be doing.',
  bodyParagraphs: [
    "Most agencies show up with a deck. We show up with a working system, usually within the first two weeks, because the fastest way to earn trust is to prove the thing actually runs.",
    "We work in the unglamorous middle of a business — the handoffs between sales and delivery, the spreadsheet someone updates every morning, the follow-up that gets forgotten because everyone is busy. That middle is where automation pays for itself the fastest.",
    "We are not a software vendor. We design and operate systems built on tools you can inspect, extend, and eventually run yourself if you want to.",
  ],
  founderNote: {
    quote:
      "The best compliment a client can give us isn't 'this looks great.' It's 'I forgot this was even running — it just works.'",
    attribution:
      "— Founder's note, written after the third client asked why their ops team suddenly had a lighter week",
  },
} as const;

// ─── PHILOSOPHY ──────────────────────────────────────────────────────────────

export interface Principle {
  number: string;
  title: string;
  description: string;
}

export const philosophyCopy = {
  kicker: 'HOW WE THINK',
  headline: "Four things we won't compromise on",
  principles: [
    {
      number: '01',
      title: 'Boring problems first',
      description:
        'The unglamorous, repetitive task nobody wants to fix is almost always the highest-leverage place to start. We chase that, not the flashy AI demo.',
    },
    {
      number: '02',
      title: 'Systems you can see inside',
      description:
        "No black boxes. Every workflow we build is documented well enough that your team could open it, understand it, and change it without calling us first.",
    },
    {
      number: '03',
      title: 'Automate the handoff, not the judgment',
      description:
        'We remove repetitive motion, not human decision-making. The system prepares the ground; a person still makes the call that matters.',
    },
    {
      number: '04',
      title: 'Measured, not vibes-based',
      description:
        "Every system ships with a number attached to it — hours saved, response time cut, error rate dropped. If we can't measure it, we haven't finished the job.",
    },
  ] satisfies Principle[],
} as const;

// ─── TEAM ────────────────────────────────────────────────────────────────────

export interface TeamMember {
  name: string;
  role: string;
  credential: string;
  bio: string;
  imageUrl?: string;
}

/**
 * DEMO_DATA — Replace with real founder/team details before launch.
 * The spec requires real names, credentials, and bios. Do not invent them.
 * Ask the user for: name, role, one-line credential, 2-3 sentence bio, headshot URL.
 */
export const teamCopy = {
  kicker: 'WHO\'S BUILDING THIS',
  headline: 'A small team that ships',
  intro:
    'We stay small on purpose. Every person here can read a workflow diagram, talk to a client, and ship a fix in the same afternoon.',
  singleFounderNote: 'Currently a team of one, growing deliberately.',
  members: [
    {
      // DEMO_DATA: Replace with real founder info
      name: 'Founder',
      role: 'Founder & Automation Engineer',
      credential: 'Real credential goes here — ask the founder before publishing',
      bio: 'Real bio goes here. Two or three sentences. Specific, not generic. Ask before writing.',
      imageUrl: undefined,
    },
  ] satisfies TeamMember[],
} as const;

// ─── STACK ───────────────────────────────────────────────────────────────────

export interface StackTool {
  id: string;
  name: string;
  role: string;
  useCase: string;
}

export const stackCopy = {
  kicker: 'WHAT WE BUILD WITH',
  headline: 'Tools we trust enough to put our name on',
  tools: [
    {
      id: 'n8n',
      name: 'n8n',
      role: 'Workflow orchestration — the backbone connecting almost everything we ship',
      useCase: 'Routing leads, syncing CRMs, triggering approvals, running scheduled reports',
    },
    {
      id: 'ai',
      name: 'OpenAI / Claude',
      role: 'Reasoning layer for agents that read, summarize, and decide',
      useCase: 'Support triage, lead qualification, research summarization',
    },
    {
      id: 'apis',
      name: 'APIs & Webhooks',
      role: "The connective tissue between tools that were never meant to talk to each other",
      useCase: 'Stripe, HubSpot, Notion, Slack, custom internal tools',
    },
    {
      id: 'db',
      name: 'Postgres / Airtable',
      role: 'Where state lives when a workflow needs memory',
      useCase: 'Job queues, client records, audit trails',
    },
    {
      id: 'dashboards',
      name: 'Dashboards',
      role: 'So the automation is never invisible to the people relying on it',
      useCase: 'Live status, exception alerts, weekly digests',
    },
  ] satisfies StackTool[],
} as const;

// ─── TIMELINE ────────────────────────────────────────────────────────────────

export interface TimelineEntry {
  id: string;
  label: string;
  body: string;
}

/**
 * DEMO_DATA — All timeline entries below are placeholder tone examples.
 * Replace with real milestones before publishing. The spec says:
 * ask for 4-6 real milestones — first client, first workflow shipped,
 * a hard lesson learned, current focus.
 * Do not fabricate specific client names or numbers that haven't been confirmed.
 */
export const timelineCopy = {
  kicker: 'HOW WE GOT HERE',
  headline: 'A short, honest history',
  entries: [
    {
      id: 'entry-1',
      // DEMO_DATA
      label: 'The beginning',
      body: 'Real milestone goes here. Something specific — a decision, a client, a moment that made it clear this was the right direction.',
    },
    {
      id: 'entry-2',
      // DEMO_DATA
      label: 'First system shipped',
      body: 'Real milestone. Specific numbers welcome — response time cut, hours saved. If the number is real, use it. If not, keep the tone honest without the number.',
    },
    {
      id: 'entry-3',
      // DEMO_DATA
      label: 'Something hard',
      body: 'A hard lesson learned. Every honest studio history has one. This is where credibility lives.',
    },
    {
      id: 'entry-4',
      // DEMO_DATA
      label: 'Right now',
      body: 'What the current focus is. Where the work is going. Honest and specific.',
    },
  ] satisfies TimelineEntry[],
} as const;
