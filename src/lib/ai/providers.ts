/**
 * src/lib/ai/providers.ts
 *
 * Provider adapter layer. Allows swapping between different AI providers
 * (e.g., OpenAI-compatible, Nara, Grok) with custom request/response logic if needed.
 */

import { AIConfig, AIConfigError } from './config';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ProviderRequestOptions {
  messages: ChatMessage[];
  responseFormat?: 'json_object' | 'text';
}

export function buildChatCompletionUrl(config: AIConfig): string {
  // If the provider specifically doesn't need `/chat/completions` appended, handle it here.
  // By default, assuming standard OpenAI-compatible format.
  const base = config.baseUrl.replace(/\/$/, '');
  if (base.endsWith('/chat/completions')) {
    return base;
  }
  return `${base}/chat/completions`;
}

export function buildHeaders(config: AIConfig): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (config.apiKey) {
    // If the provider expects a different auth header, switch on config.provider
    headers['Authorization'] = `Bearer ${config.apiKey}`;
  }

  return headers;
}

export function buildRequestBody(config: AIConfig, options: ProviderRequestOptions): Record<string, any> {
  const body: Record<string, any> = {
    model: config.model,
    messages: options.messages,
    temperature: config.contact.temperature,
    max_tokens: config.contact.maxOutputTokens,
  };

  if (options.responseFormat === 'json_object') {
    body.response_format = { type: 'json_object' };
  }

  return body;
}

export async function parseResponse(response: Response, config: AIConfig): Promise<string> {
  if (!response.ok) {
    const errText = await response.text();
    let detail = 'Unknown Error';
    try {
      const errJson = JSON.parse(errText);
      detail = errJson.error?.message || errJson.error || errText;
    } catch {
      detail = errText;
    }

    if (response.status === 401 || response.status === 403) {
      throw new AIConfigError('PROVIDER_UNAUTHORIZED', `Unauthorized API key: ${detail}`);
    }
    if (response.status === 429) {
      throw new AIConfigError('PROVIDER_RATE_LIMITED', `Rate limited: ${detail}`);
    }
    if (response.status >= 500) {
      throw new AIConfigError('PROVIDER_REQUEST_FAILED', `Provider server error: ${detail}`);
    }
    throw new AIConfigError('PROVIDER_REQUEST_FAILED', `Provider request failed: ${detail}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  
  if (!content) {
    throw new AIConfigError('INVALID_PROVIDER_RESPONSE', 'Response did not contain choices[0].message.content');
  }

  return content;
}
