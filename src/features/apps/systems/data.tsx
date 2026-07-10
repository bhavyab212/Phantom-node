import React from 'react';
import { 
  Workflow, 
  Bot, 
  LineChart, 
  Settings, 
  Webhook,
  Database,
  Mail,
  Zap
} from 'lucide-react';

export interface WorkflowNode {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

export interface SystemData {
  id: string;
  title: string;
  shortDescription: string;
  fullProblem: string;
  outcomes: { label: string; value: string }[];
  nodes: WorkflowNode[];
  icon: React.ReactNode;
}

export const SYSTEMS_DATA: SystemData[] = [
  {
    id: 'workflow-automation',
    title: 'Workflow Automation',
    shortDescription: 'Connect your tools and automate repetitive tasks silently and reliably.',
    fullProblem: 'Your team is spending hours copy-pasting data between disconnected apps. This manual work is error-prone, demoralizing, and scales poorly as you grow.',
    icon: <Workflow />,
    outcomes: [
      { label: 'Hours Saved', value: '40+/mo' },
      { label: 'Error Rate', value: '< 0.1%' },
      { label: 'ROI', value: '3x' }
    ],
    nodes: [
      { id: 'trigger', label: 'Webhook', icon: <Webhook className="w-4 h-4" />, description: 'Listens for incoming data instantly.' },
      { id: 'transform', label: 'Transform', icon: <Settings className="w-4 h-4" />, description: 'Cleans and maps the payload.' },
      { id: 'action', label: 'Database', icon: <Database className="w-4 h-4" />, description: 'Updates records in your core system.' }
    ]
  },
  {
    id: 'ai-agents',
    title: 'AI Agents',
    shortDescription: 'Deploy custom LLM agents to handle tier-1 support and data analysis.',
    fullProblem: 'High volume, low-complexity inquiries are burying your best people. You need intelligent routing that resolves simple issues without human intervention.',
    icon: <Bot />,
    outcomes: [
      { label: 'Resolution Time', value: '-80%' },
      { label: 'Deflection', value: '65%' },
      { label: 'CSAT', value: '98%' }
    ],
    nodes: [
      { id: 'ingest', label: 'Ingest', icon: <Mail className="w-4 h-4" />, description: 'Receives the customer inquiry.' },
      { id: 'llm', label: 'Reasoning', icon: <Bot className="w-4 h-4" />, description: 'Classifies intent and drafts response.' },
      { id: 'execute', label: 'Reply', icon: <Zap className="w-4 h-4" />, description: 'Sends the formatted answer instantly.' }
    ]
  },
  {
    id: 'crm-sales',
    title: 'CRM & Sales Automation',
    shortDescription: 'Close deals faster with automated lead enrichment and follow-ups.',
    fullProblem: 'Leads are falling through the cracks because sales reps are bogged down by data entry instead of having high-value conversations.',
    icon: <LineChart />,
    outcomes: [
      { label: 'Lead Response', value: '< 5m' },
      { label: 'Close Rate', value: '+15%' },
      { label: 'Pipeline', value: 'Clean' }
    ],
    nodes: [
      { id: 'lead', label: 'New Lead', icon: <Zap className="w-4 h-4" />, description: 'Triggers when a prospect fills a form.' },
      { id: 'enrich', label: 'Enrich', icon: <Database className="w-4 h-4" />, description: 'Pulls firmographic data automatically.' },
      { id: 'notify', label: 'Notify', icon: <Mail className="w-4 h-4" />, description: 'Alerts the right rep in Slack/Teams.' }
    ]
  },
  {
    id: 'custom-ops',
    title: 'Custom Operations',
    shortDescription: 'Bespoke operational systems tailored to your unique agency processes.',
    fullProblem: 'Off-the-shelf software doesn\'t fit how you actually work, forcing you to use messy spreadsheets and duct-taped workarounds.',
    icon: <Settings />,
    outcomes: [
      { label: 'Efficiency', value: '+40%' },
      { label: 'Visibility', value: '100%' },
      { label: 'Scalability', value: 'Infinite' }
    ],
    nodes: [
      { id: 'audit', label: 'Sync', icon: <Workflow className="w-4 h-4" />, description: 'Monitors custom endpoints.' },
      { id: 'process', label: 'Logic', icon: <Settings className="w-4 h-4" />, description: 'Executes highly specific business rules.' },
      { id: 'dashboard', label: 'Report', icon: <LineChart className="w-4 h-4" />, description: 'Pushes insights to a live dashboard.' }
    ]
  }
];
