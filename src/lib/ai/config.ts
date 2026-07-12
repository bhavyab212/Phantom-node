/**
 * src/lib/ai/config.ts
 *
 * Centralized, unified configuration layer for all AI features.
 * Validates and normalizes environment variables for provider-agnostic usage.
 */

export interface AIConfig {
  enabled: boolean;
  provider: string;
  baseUrl: string;
  apiKey: string;
  model: string;
  apiFormat: string;
  
  // Contact Flow Specific
  contact: {
    enabled: boolean;
    maxCallsPerSession: number;
    timeoutMs: number;
    maxOutputTokens: number;
    temperature: number;
    fallbackToDeterministic: boolean;
    requireConsent: boolean;
  };
}

export type AIErrorCode = 
  | 'AI_DISABLED'
  | 'MISSING_API_KEY'
  | 'MISSING_MODEL'
  | 'MISSING_BASE_URL'
  | 'INVALID_BASE_URL'
  | 'INVALID_PROVIDER'
  | 'PROVIDER_REQUEST_FAILED'
  | 'PROVIDER_UNAUTHORIZED'
  | 'PROVIDER_RATE_LIMITED'
  | 'PROVIDER_TIMEOUT'
  | 'INVALID_PROVIDER_RESPONSE'
  | 'FALLBACK_USED';

export class AIConfigError extends Error {
  constructor(public code: AIErrorCode, message: string) {
    super(message);
    this.name = 'AIConfigError';
  }
}

export function getAIConfig(): AIConfig {
  const enabled = process.env.AI_ENABLED === 'true';
  const provider = process.env.AI_PROVIDER || 'openai-compatible';
  const baseUrl = process.env.AI_API_BASE_URL || '';
  const apiKey = process.env.AI_API_KEY || '';
  const model = process.env.AI_MODEL || '';
  const apiFormat = process.env.AI_API_FORMAT || 'chat_completions';

  return {
    enabled,
    provider,
    baseUrl,
    apiKey,
    model,
    apiFormat,
    contact: {
      enabled: process.env.CONTACT_AI_ENABLED !== 'false',
      maxCallsPerSession: parseInt(process.env.CONTACT_AI_MAX_CALLS_PER_SESSION || '2', 10),
      timeoutMs: parseInt(process.env.CONTACT_AI_TIMEOUT_MS || '8000', 10),
      maxOutputTokens: parseInt(process.env.CONTACT_AI_MAX_OUTPUT_TOKENS || '180', 10),
      temperature: parseFloat(process.env.CONTACT_AI_TEMPERATURE || '0.2'),
      fallbackToDeterministic: process.env.CONTACT_AI_FALLBACK_TO_DETERMINISTIC !== 'false',
      requireConsent: process.env.CONTACT_AI_REQUIRE_CONSENT !== 'false',
    }
  };
}

export function validateAIConfig(config: AIConfig) {
  if (!config.enabled || !config.contact.enabled) {
    throw new AIConfigError('AI_DISABLED', 'AI features are disabled in configuration.');
  }
  if (!config.apiKey) {
    throw new AIConfigError('MISSING_API_KEY', 'AI_API_KEY is not configured.');
  }
  if (!config.baseUrl) {
    throw new AIConfigError('MISSING_BASE_URL', 'AI_API_BASE_URL is not configured.');
  }
  try {
    new URL(config.baseUrl);
  } catch {
    throw new AIConfigError('INVALID_BASE_URL', 'AI_API_BASE_URL must be a valid URL.');
  }
  if (!config.model) {
    throw new AIConfigError('MISSING_MODEL', 'AI_MODEL is not configured.');
  }
}

export function isAIReady(): boolean {
  try {
    const config = getAIConfig();
    validateAIConfig(config);
    return true;
  } catch {
    return false;
  }
}
