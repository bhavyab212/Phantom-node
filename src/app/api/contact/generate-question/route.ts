import { NextResponse } from 'next/server';
import { getAIConfig, isAIReady, AIConfigError } from '@/lib/ai/config';
import { buildChatCompletionUrl, buildHeaders, buildRequestBody, parseResponse } from '@/lib/ai/providers';

export async function POST(req: Request) {
  try {
    const config = getAIConfig();
    
    // Check if AI is enabled and configured properly
    if (!config.enabled || !config.contact.enabled) {
      return NextResponse.json({ error: 'AI features are disabled' }, { status: 400 });
    }
    
    const body = await req.json();
    const { 
      sourceType, 
      sourceId, 
      sourceTitle, 
      flowStage, 
      stepNumber, 
      maxSteps, 
      alreadyCoveredDimensions, 
      nextTargetDimension, 
      previousAnswers 
    } = body;
    
    if (!nextTargetDimension) {
      return NextResponse.json({ error: 'Missing nextTargetDimension' }, { status: 400 });
    }

    const previousAnswersFormatted = previousAnswers?.map((pa: any) => `- Q: ${pa.question}\n  A: ${pa.answer}`).join('\n') || 'None';
    const coveredDimensionsFormatted = alreadyCoveredDimensions?.join(', ') || 'None';

    const systemPrompt = `You generate one concise project-intake question and 3 to 5 high-quality answer options.

You are helping a premium digital systems studio ask better intake questions.

You are NOT creating a survey.
You are NOT deciding the flow.
You are NOT changing the topic.
You are only generating the next question for the provided context.

Rules:
1. Stay inside the provided source context.
2. Respect the nextTargetDimension.
3. Use previous answers to make the question more specific.
4. Keep the wording practical, concise, and non-salesy.
5. Avoid repeating previously covered dimensions.
6. Generate 3 to 5 distinct, useful options.
7. Return strict JSON only.

Output format:
{
  "question": "...",
  "options": ["...", "..."],
  "helperText": "..."
}`;

    const userPrompt = `Context:
- Source Type: ${sourceType}
- Source ID: ${sourceId}
- Source Title: ${sourceTitle || 'Direct Inquiry'}
- Flow Stage: ${flowStage || 'mid'}
- Step Number: ${stepNumber || 1} of ${maxSteps || 6}
- Already Covered Dimensions: ${coveredDimensionsFormatted}
- Next Target Dimension: ${nextTargetDimension}

Previous Answers:
${previousAnswersFormatted}

Generate the question and options for the next target dimension as JSON.`;

    const url = buildChatCompletionUrl(config);
    const headers = buildHeaders(config);
    
    const requestBody = buildRequestBody(config, {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      responseFormat: 'json_object'
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.contact.timeoutMs);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const content = await parseResponse(response, config);
      
      let parsed;
      try {
        // Handle markdown block wrapping if present
        let cleanContent = content.trim();
        if (cleanContent.startsWith('```json')) cleanContent = cleanContent.slice(7);
        if (cleanContent.startsWith('```')) cleanContent = cleanContent.slice(3);
        if (cleanContent.endsWith('```')) cleanContent = cleanContent.slice(0, -3);
        
        parsed = JSON.parse(cleanContent.trim());
      } catch (parseErr) {
        throw new Error('Failed to parse AI response as JSON');
      }

      if (!parsed.options || !Array.isArray(parsed.options) || parsed.options.length === 0) {
        throw new Error('AI failed to generate valid options array');
      }

      // Filter out any "Something else" options if the AI generated them natively,
      // because the UI provides a permanent custom input text area.
      parsed.options = parsed.options.filter((o: string) => !o.toLowerCase().includes("something else"));

      if (parsed.options.length === 0) {
        throw new Error('AI generated only a something else option, invalidating.');
      }

      return NextResponse.json(parsed);

    } catch (fetchError: any) {
      if (fetchError.name === 'AbortError') {
        throw new AIConfigError('PROVIDER_TIMEOUT', 'The AI provider request timed out.');
      }
      throw fetchError;
    }

  } catch (error: any) {
    console.error('generate-question API Error:', error);
    console.error('Stack:', error.stack);
    if (error instanceof AIConfigError) {
      return NextResponse.json({
        ok: false,
        code: error.code,
        message: error.message
      }, { status: 400 }); 
    }

    return NextResponse.json({
      ok: false,
      code: 'UNKNOWN_ERROR',
      message: error.message || 'An unknown error occurred.'
    }, { status: 500 });
  }
}
