import { NextResponse } from 'next/server';
import { getAIConfig, validateAIConfig, AIConfigError } from '../../../../lib/ai/config';
import { buildChatCompletionUrl, buildHeaders, buildRequestBody, parseResponse } from '../../../../lib/ai/providers';

export async function POST(req: Request) {
  try {
    const config = getAIConfig();
    validateAIConfig(config);

    const url = buildChatCompletionUrl(config);
    const headers = buildHeaders(config);
    const body = buildRequestBody(config, {
      messages: [{ role: 'user', content: 'Say "hello" and nothing else.' }],
      responseFormat: 'text'
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.contact.timeoutMs);

    let response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal: controller.signal
      });
    } catch (fetchError: any) {
      if (fetchError.name === 'AbortError') {
        throw new AIConfigError('PROVIDER_TIMEOUT', 'The AI provider request timed out.');
      }
      throw new AIConfigError('PROVIDER_REQUEST_FAILED', `Fetch failed: ${fetchError.message}`);
    } finally {
      clearTimeout(timeoutId);
    }

    const content = await parseResponse(response, config);

    return NextResponse.json({
      ok: true,
      provider: config.provider,
      model: config.model,
      baseUrl: config.baseUrl,
      message: 'AI provider connection successful',
      content: content.trim()
    });

  } catch (error: any) {
    if (error instanceof AIConfigError) {
      return NextResponse.json({
        ok: false,
        code: error.code,
        message: error.message
      }, { status: 400 }); // Status 400 or 500 depending on exact need, but structured JSON is key
    }

    return NextResponse.json({
      ok: false,
      code: 'UNKNOWN_ERROR',
      message: error.message || 'An unknown error occurred.'
    }, { status: 500 });
  }
}
