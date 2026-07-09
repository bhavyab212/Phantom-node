export type FileType = 'folder' | 'file';

export interface FileItem {
  id: string;
  name: string;
  type: FileType;
  parentId: string | null;
  size?: number; // in bytes
  modifiedAt: string;
  extension?: string;
  content?: string;
  url?: string;
  actualContentType?: string;
  openWith?: string;
}

export const MOCK_FILES: FileItem[] = [
  // --- Root Folders ---
  { id: 'home', name: 'Home', type: 'folder', parentId: null, modifiedAt: '2026-07-08T09:00:00Z' },
  
  // --- Home Children ---
  { id: 'desktop', name: 'Desktop', type: 'folder', parentId: 'home', modifiedAt: '2026-07-08T09:00:00Z' },
  { id: 'documents', name: 'Documents', type: 'folder', parentId: 'home', modifiedAt: '2026-07-08T09:00:00Z' },
  { id: 'downloads', name: 'Downloads', type: 'folder', parentId: 'home', modifiedAt: '2026-07-08T09:00:00Z' },
  { id: 'projects', name: 'Projects', type: 'folder', parentId: 'home', modifiedAt: '2026-07-08T09:00:00Z' },
  { id: 'portfolio', name: 'Portfolio', type: 'folder', parentId: 'home', modifiedAt: '2026-07-08T09:00:00Z' },
  { id: 'recycle-bin', name: 'Recycle Bin', type: 'folder', parentId: 'home', modifiedAt: '2026-07-08T09:00:00Z' },

  // --- Projects Children ---
  { id: 'agency-assets', name: 'Agency Assets', type: 'folder', parentId: 'projects', modifiedAt: '2026-07-07T14:30:00Z' },
  { id: 'automation', name: 'Automation', type: 'folder', parentId: 'projects', modifiedAt: '2026-07-06T11:20:00Z' },

  // --- Portfolio Children ---
  { id: 'proj-northstar', name: 'Northstar Health', type: 'folder', parentId: 'portfolio', modifiedAt: '2026-07-08T10:00:00Z' },
  { id: 'proj-atlas', name: 'Atlas Automation', type: 'folder', parentId: 'portfolio', modifiedAt: '2026-07-08T10:05:00Z' },
  { id: 'proj-apex', name: 'Apex Financial', type: 'folder', parentId: 'portfolio', modifiedAt: '2026-07-08T10:10:00Z' },

  // --- Files ---
  { 
    id: 'f1', 
    name: 'proposal.md', 
    type: 'file', 
    parentId: 'documents', 
    size: 14500, 
    modifiedAt: '2026-07-08T08:15:00Z', 
    extension: 'md',
    content: `# Web OS Project Proposal

## Executive Summary
This proposal outlines the architecture and phased delivery for the new Agency Web OS. Our goal is to build a high-performance desktop shell in the browser.

## Key Features
- Multi-window management
- Native-feeling file explorer
- Real system utilities (Notepad, Settings, PDF Viewer)

## Timeline
- Phase 1: Core Shell (Completed)
- Phase 2: Apps & File System (In Progress)
- Phase 3: Persistence & Polish (Upcoming)`
  },
  { 
    id: 'f2', 
    name: 'client-onboarding.doc', 
    type: 'file', 
    parentId: 'documents', 
    size: 2450000, 
    modifiedAt: '2026-07-05T16:45:00Z', 
    extension: 'doc',
    actualContentType: 'application/pdf',
    openWith: 'pdf-viewer',
    url: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'
  },
  { 
    id: 'f2b', 
    name: 'project-proposal.docs', 
    type: 'file', 
    parentId: 'documents', 
    size: 3250000, 
    modifiedAt: '2026-07-06T10:15:00Z', 
    extension: 'docs',
    actualContentType: 'application/pdf',
    openWith: 'pdf-viewer',
    url: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'
  },
  { 
    id: 'f3', 
    name: 'n8n-workflows.json', 
    type: 'file', 
    parentId: 'automation', 
    size: 89000, 
    modifiedAt: '2026-07-01T09:12:00Z', 
    extension: 'json',
    content: `{
  "nodes": [
    {
      "parameters": {},
      "id": "1a2b3c4d",
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300],
      "webhookId": "test-webhook"
    },
    {
      "parameters": {
        "url": "https://api.openai.com/v1/chat/completions",
        "method": "POST"
      },
      "id": "5e6f7g8h",
      "name": "OpenAI API",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [450, 300]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [
        [
          { "node": "OpenAI API", "type": "main", "index": 0 }
        ]
      ]
    }
  }
}`
  },
  { 
    id: 'f4', 
    name: 'agency-brand-guide.pdf', 
    type: 'file', 
    parentId: 'agency-assets', 
    size: 12500000, 
    modifiedAt: '2026-06-20T10:00:00Z', 
    extension: 'pdf',
    url: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'
  },
  { 
    id: 'f5', 
    name: 'landing-page-wireframe.fig', 
    type: 'file', 
    parentId: 'agency-assets', 
    size: 45000000, 
    modifiedAt: '2026-07-02T13:30:00Z', 
    extension: 'fig' 
  },
  { 
    id: 'f6', 
    name: 'infra-plan.txt', 
    type: 'file', 
    parentId: 'desktop', 
    size: 3400, 
    modifiedAt: '2026-07-08T09:45:00Z', 
    extension: 'txt',
    content: `INFRASTRUCTURE PLAN - v1.2
---------------------------

Servers:
- 2x Load Balancers (Nginx)
- 3x App Servers (Node.js/Next.js)
- 1x Primary DB (PostgreSQL)
- 1x Replica DB
- Redis Cluster for Caching & Session

Deployment:
- GitHub Actions for CI/CD
- Dockerized containers deployed to AWS ECS
- Terraform for IaC

Notes:
Need to ensure the PDF.js workers are cached effectively at the CDN level.`
  },
  
  // --- Case Study: Northstar Health ---
  { 
    id: 'f-ns-case-study', 
    name: 'case-study.pdf', 
    type: 'file', 
    parentId: 'proj-northstar', 
    size: 4500000, 
    modifiedAt: '2025-11-10T14:00:00Z', 
    extension: 'pdf',
    url: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'
  },
  { 
    id: 'f-ns-brand-guidelines', 
    name: 'brand-guidelines.pdf', 
    type: 'file', 
    parentId: 'proj-northstar', 
    size: 12500000, 
    modifiedAt: '2025-10-15T09:30:00Z', 
    extension: 'pdf',
    url: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'
  },
  { 
    id: 'f-ns-homepage-wireframe', 
    name: 'homepage-wireframe.fig', 
    type: 'file', 
    parentId: 'proj-northstar', 
    size: 32000000, 
    modifiedAt: '2025-09-01T11:15:00Z', 
    extension: 'fig' 
  },

  // --- Case Study: Atlas Automation ---
  { 
    id: 'f-at-automation-audit', 
    name: 'automation-audit.pdf', 
    type: 'file', 
    parentId: 'proj-atlas', 
    size: 2800000, 
    modifiedAt: '2026-03-22T16:20:00Z', 
    extension: 'pdf',
    url: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'
  },
  { 
    id: 'f-at-n8n-workflows', 
    name: 'n8n-workflows.json', 
    type: 'file', 
    parentId: 'proj-atlas', 
    size: 145000, 
    modifiedAt: '2026-04-10T08:45:00Z', 
    extension: 'json',
    content: `{
  "nodes": [
    { "name": "Webhook (Dispatch)", "type": "n8n-nodes-base.webhook" },
    { "name": "PostgreSQL (Update Status)", "type": "n8n-nodes-base.postgres" },
    { "name": "QuickBooks (Create Invoice)", "type": "n8n-nodes-base.quickbooks" },
    { "name": "Slack (Notify Driver)", "type": "n8n-nodes-base.slack" }
  ],
  "connections": {
    "Webhook (Dispatch)": { "main": [[{"node":"PostgreSQL (Update Status)","type":"main","index":0}]] },
    "PostgreSQL (Update Status)": { "main": [[{"node":"QuickBooks (Create Invoice)","type":"main","index":0}], [{"node":"Slack (Notify Driver)","type":"main","index":0}]] }
  }
}`
  },
  { 
    id: 'f-at-infra-plan', 
    name: 'infra-plan.txt', 
    type: 'file', 
    parentId: 'proj-atlas', 
    size: 4200, 
    modifiedAt: '2026-03-25T10:00:00Z', 
    extension: 'txt',
    content: `Atlas Automation - Infra Architecture
-------------------------------------
- Self-hosted n8n instance on AWS EC2 (t4g.small)
- PostgreSQL database for workflow execution history
- PM2 for process management
- Redis for queued jobs handling high-throughput dispatch events
- Cloudflare for DNS & basic DDoS protection`
  },

  // --- Case Study: Apex Financial ---
  { 
    id: 'f-ap-brand-book', 
    name: 'brand-book-vfinal.pdf', 
    type: 'file', 
    parentId: 'proj-apex', 
    size: 18500000, 
    modifiedAt: '2024-08-12T13:00:00Z', 
    extension: 'pdf',
    url: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'
  },
  { 
    id: 'f-ap-logo-suite', 
    name: 'logo-suite.zip', 
    type: 'file', 
    parentId: 'proj-apex', 
    size: 8500000, 
    modifiedAt: '2024-07-28T09:15:00Z', 
    extension: 'zip' 
  },
  { 
    id: 'f-ap-launch-deck', 
    name: 'launch-campaign.pdf', 
    type: 'file', 
    parentId: 'proj-apex', 
    size: 6200000, 
    modifiedAt: '2024-08-05T15:45:00Z', 
    extension: 'pdf',
    url: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'
  }
];
