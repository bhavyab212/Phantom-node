import React from 'react';
import { WorkflowNode } from '@/features/apps/systems/data';
import { Mail, Database, Bot, Zap, Globe, FileText, CheckCircle } from 'lucide-react';

export interface CaseStudyData {
  id: string;
  client: string;
  category: string;
  title: string;
  shortDescription: string;
  situation: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  workflowNodes: WorkflowNode[];
  beforeText: string;
  afterText: string;
}

export const CASE_STUDIES: CaseStudyData[] = [
  {
    id: 'law-firm-intake',
    client: 'Apex Legal Group',
    category: 'Workflow Automation',
    title: 'Zero-Touch Client Onboarding',
    shortDescription: 'Replaced a 14-step manual intake process with an instant, secure automated flow.',
    situation: 'Apex Legal was losing potential clients because their intake process took 3 days. Paralegals manually transcribed PDF forms into their CRM, drafted standardized welcome emails, and assigned tasks in Asana.',
    stack: ['n8n', 'DocuSign API', 'Salesforce', 'Asana'],
    metrics: [
      { label: 'Intake Time', value: '-95%' },
      { label: 'Data Errors', value: '0%' },
      { label: 'Hours Saved', value: '120/mo' }
    ],
    workflowNodes: [
      { id: 'webhook', label: 'Form Submit', icon: <Globe className="w-4 h-4" />, description: 'Client submits intake form on website.' },
      { id: 'crm', label: 'Salesforce', icon: <Database className="w-4 h-4" />, description: 'Creates Contact & Matter records.' },
      { id: 'doc', label: 'DocuSign', icon: <FileText className="w-4 h-4" />, description: 'Generates & sends retainer agreement.' }
    ],
    beforeText: 'Paralegals spent 3 days manually transcribing PDFs and routing emails.',
    afterText: 'Clients receive a digital retainer within 30 seconds of form submission.'
  },
  {
    id: 'ecommerce-support',
    title: 'Tier-1 Support Deflection',
    client: 'Nordic Wares',
    category: 'AI Agents',
    shortDescription: 'Deployed a custom LLM agent that resolves 70% of shipping and return inquiries instantly.',
    situation: 'Nordic Wares faced a massive backlog of support tickets during the holiday season. The team was buried in "Where is my order?" and "How do I return this?" emails, delaying responses to complex issues.',
    stack: ['Anthropic Claude', 'Zendesk', 'Shopify API'],
    metrics: [
      { label: 'Deflection', value: '72%' },
      { label: 'Response Time', value: '< 1m' },
      { label: 'CSAT Score', value: '+14pts' }
    ],
    workflowNodes: [
      { id: 'ticket', label: 'Zendesk', icon: <Mail className="w-4 h-4" />, description: 'New ticket triggers the AI agent.' },
      { id: 'lookup', label: 'Shopify', icon: <Database className="w-4 h-4" />, description: 'Agent fetches real-time order status.' },
      { id: 'resolve', label: 'Claude 3', icon: <Bot className="w-4 h-4" />, description: 'Drafts empathetic, accurate response.' }
    ],
    beforeText: 'Average response time was 24 hours, leading to frustrated customers.',
    afterText: '72% of tickets are resolved instantly, freeing humans for complex issues.'
  },
  {
    id: 'b2b-sales-enrichment',
    title: 'Instant Lead Enrichment',
    client: 'SaaS Dynamics',
    category: 'CRM & Sales',
    shortDescription: 'Automated lead research to give sales reps complete firmographic data before the first call.',
    situation: 'Sales reps were spending 15 minutes researching every new inbound lead on LinkedIn and Crunchbase before reaching out, causing delayed responses and lost deals to faster competitors.',
    stack: ['n8n', 'Clearbit', 'HubSpot', 'Slack'],
    metrics: [
      { label: 'Research Time', value: '0 min' },
      { label: 'Speed to Lead', value: '2 min' },
      { label: 'Conversion', value: '+22%' }
    ],
    workflowNodes: [
      { id: 'lead', label: 'HubSpot', icon: <CheckCircle className="w-4 h-4" />, description: 'New lead enters CRM.' },
      { id: 'enrich', label: 'Clearbit', icon: <Zap className="w-4 h-4" />, description: 'Appends revenue, tech stack, & headcount.' },
      { id: 'alert', label: 'Slack', icon: <Mail className="w-4 h-4" />, description: 'Alerts AE with a complete dossier.' }
    ],
    beforeText: 'Reps spent 15 minutes manually researching each lead before calling.',
    afterText: 'Reps receive a Slack alert with a full dossier in 2 seconds.'
  }
];
