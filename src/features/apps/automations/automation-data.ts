import { LucideIcon } from 'lucide-react';
import React from 'react';

export interface AutomationEntry {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  explainer: string;
  workflowImage: string;
  logoType: string;
  tags: string[];
  status: string;
  isPublished: boolean;
}

export const AUTOMATION_PROJECTS: AutomationEntry[] = [
  {
    id: 'calling-agent',
    title: 'Calling Agent',
    category: 'Voice & Operations',
    shortDescription: 'Routes and manages structured calling tasks through an automated workflow.',
    explainer: 'A workflow concept for handling calling steps, follow-up triggers, and outcome tracking in one connected process.',
    workflowImage: '/images/automations/calling_agent.png',
    logoType: 'calling-agent',
    tags: ['Voice', 'Follow-up', 'Workflow'],
    status: 'Workflow ready',
    isPublished: true
  },
  {
    id: 'customer-follow-up',
    title: 'Customer Follow-up System',
    category: 'Sales & CRM',
    shortDescription: 'Keeps customer follow-ups moving without relying on manual reminders.',
    explainer: 'Designed to organize follow-up stages, trigger timely messages, and make customer conversations easier to track.',
    workflowImage: '/images/automations/coustmer_follow_up_system.png',
    logoType: 'customer-follow-up',
    tags: ['CRM', 'Follow-up', 'Operations'],
    status: 'Workflow ready',
    isPublished: true
  },
  {
    id: 'customer-support',
    title: 'Customer Support Agent',
    category: 'Support',
    shortDescription: 'Organizes support requests into a structured AI-assisted response flow.',
    explainer: 'A support workflow concept that helps classify incoming questions, prepare responses, and route requests to the right next step.',
    workflowImage: '/images/automations/coustmer_support_agent.png',
    logoType: 'customer-support',
    tags: ['Support', 'AI Agent', 'Routing'],
    status: 'Workflow ready',
    isPublished: true
  },
  {
    id: 'crypto-news',
    title: 'Crypto News Analysis Agent',
    category: 'Research',
    shortDescription: 'Collects and processes crypto-news inputs for structured analysis.',
    explainer: 'A research workflow concept for gathering relevant news, organizing source material, and producing a more usable analysis output.',
    workflowImage: '/images/automations/crypto_news_analysis_agent.png',
    logoType: 'crypto-news',
    tags: ['Research', 'Analysis', 'AI Agent'],
    status: 'Workflow ready',
    isPublished: true
  },
  {
    id: 'lead-scraper',
    title: 'Lead Scraper with Verified Email',
    category: 'Lead Generation',
    shortDescription: 'Finds prospect records and prepares verified contact details for outreach.',
    explainer: 'A lead-generation workflow concept that combines prospect discovery, contact enrichment, and verification steps before outreach begins.',
    workflowImage: '/images/automations/leads_scraper_with_verified_email.png',
    logoType: 'lead-scraper',
    tags: ['Leads', 'Enrichment', 'Email'],
    status: 'Workflow ready',
    isPublished: true
  },
  {
    id: 'linkedin-autopost',
    title: 'LinkedIn Auto-post Creation',
    category: 'Content',
    shortDescription: 'Turns structured inputs into a repeatable LinkedIn content workflow.',
    explainer: 'A content-operations workflow concept for preparing, reviewing, and scheduling LinkedIn posts without rebuilding the process every time.',
    workflowImage: '/images/automations/linkedine_autoPost_creation_autopost.png',
    logoType: 'linkedin-autopost',
    tags: ['LinkedIn', 'Content', 'Publishing'],
    status: 'Workflow ready',
    isPublished: true
  },
  {
    id: 'offer-letter',
    title: 'Offer Letter Generator',
    category: 'HR & Operations',
    shortDescription: 'Generates structured offer-letter documents from a repeatable process.',
    explainer: 'A document workflow concept that gathers required information, applies it to a defined format, and prepares an offer letter for review.',
    workflowImage: '/images/automations/offer_letter_genrate_agent.png',
    logoType: 'offer-letter',
    tags: ['Documents', 'HR', 'Generation'],
    status: 'Workflow ready',
    isPublished: true
  },
  {
    id: 'personalized-cold-email',
    title: 'Personalised Cold Email Marketing',
    category: 'Outbound',
    shortDescription: 'Prepares personalized outreach sequences from structured prospect data.',
    explainer: 'An outbound workflow concept that combines lead details, personalization inputs, and controlled email-sequence preparation.',
    workflowImage: '/images/automations/personalised_cold_email_marketing.png',
    logoType: 'personalized-cold-email',
    tags: ['Email', 'Outbound', 'Personalization'],
    status: 'Workflow ready',
    isPublished: true
  },
  {
    id: 'product-recommendation-rag',
    title: 'Product Recommendation RAG System',
    category: 'AI Systems',
    shortDescription: 'Uses product knowledge to support more relevant recommendations.',
    explainer: 'A retrieval-augmented workflow concept that organizes product information so an AI assistant can provide context-aware product suggestions.',
    workflowImage: '/images/automations/product_recomation_rag_system.png',
    logoType: 'product-recommendation-rag',
    tags: ['RAG', 'Recommendations', 'AI'],
    status: 'Workflow ready',
    isPublished: true
  },
  {
    id: 'sales-agent',
    title: 'Sales Agent',
    category: 'Sales & CRM',
    shortDescription: 'Supports structured sales conversations and next-step handling.',
    explainer: 'A sales workflow concept for qualifying leads, organizing context, and helping move opportunities through a consistent process.',
    workflowImage: '/images/automations/sales_agent.png',
    logoType: 'sales-agent',
    tags: ['Sales', 'AI Agent', 'CRM'],
    status: 'Workflow ready',
    isPublished: true
  },
  {
    id: 'social-media-factory',
    title: 'Social Media Content Factory Agent',
    category: 'Content',
    shortDescription: 'Converts content inputs into a repeatable social-media production flow.',
    explainer: 'A content workflow concept for ideation, drafting, repurposing, and organizing social outputs across channels.',
    workflowImage: '/images/automations/social_media_content_factory_agent.png',
    logoType: 'social-media-factory',
    tags: ['Social Media', 'Content', 'AI Agent'],
    status: 'Workflow ready',
    isPublished: true
  },
  {
    id: 'website-audit',
    title: 'Website Audit Agent',
    category: 'Research',
    shortDescription: 'Structures website-review tasks into a repeatable audit workflow.',
    explainer: 'An audit workflow concept for collecting site observations, organizing findings, and preparing a clearer review output.',
    workflowImage: '/images/automations/website_audit_agent.png',
    logoType: 'website-audit',
    tags: ['Website', 'Audit', 'Analysis'],
    status: 'Workflow ready',
    isPublished: true
  },
  {
    id: 'whatsapp-restaurant',
    title: 'WhatsApp AI Restaurant Agent',
    category: 'Customer Experience',
    shortDescription: 'Handles restaurant conversations through a structured WhatsApp workflow.',
    explainer: 'A customer-experience workflow concept for responding to common restaurant questions, organizing requests, and guiding conversations to the right outcome.',
    workflowImage: '/images/automations/whatsapp_ai_agent_resturant.png',
    logoType: 'whatsapp-restaurant',
    tags: ['WhatsApp', 'Restaurant', 'AI Agent'],
    status: 'Workflow ready',
    isPublished: true
  },
  {
    id: 'youtube-thumbnail',
    title: 'YouTube Thumbnail Creator',
    category: 'Content',
    shortDescription: 'Organizes thumbnail-generation tasks into a repeatable creative workflow.',
    explainer: 'A content-production workflow concept for preparing creative inputs, generating thumbnail directions, and keeping output organized.',
    workflowImage: '/images/automations/youtube_thumbnail_creator.png',
    logoType: 'youtube-thumbnail',
    tags: ['YouTube', 'Creative', 'Generation'],
    status: 'Workflow ready',
    isPublished: true
  }
];
