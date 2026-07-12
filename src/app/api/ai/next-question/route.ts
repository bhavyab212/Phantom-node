import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You generate exactly one next intake question and its answer options for a digital systems studio's contact flow.

Rules:
- Use the provided source context and full prior question/answer history.
- The new question must logically build on the most recent answer.
- Stay strictly within the given source topic. Do not drift to unrelated topics.
- Never repeat a question or ask about something already answered.
- Tone: Ask the question exactly like a normal, non-technical person would. Speak in plain, everyday language. Avoid jargon completely unless the visitor used it first.
- Pacing: Only ask 1 or 2 technical or deeply specific questions, and ONLY at the very end of the flow (when Current Question Count is near Max Questions).
- Provide 3 to 5 concrete, mutually distinct, REAL answer options. DO NOT use generic placeholders like "Option A".
- Add the prefix "(Recommended) " to the option that you think is the best or most common choice for their situation.
- Always allow a custom free-text answer; include a short customAnswerPlaceholder.
- Keep the question one plain sentence.
- Do not invent facts about the studio, pricing, or timelines.
- Do not ask for personal identifying information; that is collected later in a separate form.
- Return strict JSON only, matching the required schema. No extra commentary.

Example output format (DO NOT USE THESE EXACT STRINGS, use relevant ones for the context):
{
  "question": "What is the main goal for your new website?",
  "options": ["(Recommended) Generate more leads", "Improve brand awareness", "Sell products online", "Reduce customer support tickets"],
  "allowCustomAnswer": true,
  "customAnswerPlaceholder": "Or describe your specific goal..."
}`;

const STRICT_RETRY_PROMPT = `You failed to follow the rules in your last attempt. 
Try again and ensure you STRICTLY output valid JSON, exact 3-5 distinct options, no personal info requests, and stay on topic.

Example output format MUST match exactly this structure:
{
  "question": "What specifically is causing the bottleneck?",
  "options": ["Too many manual data entry steps", "Waiting for approvals from others", "Finding the right information takes too long"],
  "allowCustomAnswer": true,
  "customAnswerPlaceholder": "Or describe the bottleneck..."
}`;

function validateAIResponse(data: any, history: any[]): boolean {
  if (!data.question || typeof data.question !== 'string' || data.question.length > 200 || data.question.length === 0) {
    return false;
  }
  if (!Array.isArray(data.options) || data.options.length < 3 || data.options.length > 5) {
    return false;
  }
  if (data.options.some((opt: any) => typeof opt !== 'string' || opt.trim() === '')) {
    return false;
  }
  if (data.allowCustomAnswer !== true || typeof data.customAnswerPlaceholder !== 'string') {
    return false;
  }
  // Check for duplicate questions in history
  if (history.some((h: any) => h.question.toLowerCase() === data.question.toLowerCase())) {
    return false;
  }
  // Basic PII check
  const lowerQuestion = data.question.toLowerCase();
  if (lowerQuestion.includes('name') || lowerQuestion.includes('email') || lowerQuestion.includes('phone') || lowerQuestion.includes('number')) {
    return false;
  }
  return true;
}

export async function POST(req: Request) {
  try {
    const aiEnabled = process.env.AI_ENABLED === 'true';
    if (!aiEnabled) {
      return NextResponse.json({ error: 'AI disabled' }, { status: 403 });
    }

    const body = await req.json();
    const { source, history, questionCount, minQuestions, maxQuestions } = body;

    if (questionCount >= maxQuestions) {
      return NextResponse.json({ ok: true, isFinal: true });
    }

    const userPrompt = `Context:
Source: ${JSON.stringify(source)}
History: ${JSON.stringify(history)}
Current Question Count: ${questionCount}
Max Questions: ${maxQuestions}

Generate the next question based on this context.`;

    const apiKey = process.env.AI_API_KEY;
    const baseUrl = process.env.AI_API_BASE_URL || 'https://api.openai.com/v1';
    const model = process.env.AI_MODEL || 'gpt-4o-mini';

    if (!apiKey) {
      return NextResponse.json({ error: 'Missing API Key' }, { status: 500 });
    }

    const callAI = async (retry: boolean = false) => {
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ];
      if (retry) {
        messages.push({ role: 'system', content: STRICT_RETRY_PROMPT });
      }

      const payload: any = {
        model: model,
        messages: messages,
        temperature: 0.2,
        max_tokens: 300,
      };
      
      // We rely entirely on the system prompt to enforce JSON output.
      // Removed response_format to prevent termination errors on some OpenRouter models.

      const res = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`AI provider error: ${res.status} ${errorText}`);
      }

      const data = await res.json();
      let content = data.choices?.[0]?.message?.content;
      
      if (!content) {
        throw new Error('No content from AI');
      }
      
      content = content.replace(/```json/gi, '').replace(/```/g, '').trim();
      
      return JSON.parse(content);
    };

    let parsed = null;
    try {
      parsed = await callAI(false);
      if (!validateAIResponse(parsed, history)) {
        throw new Error('Validation failed');
      }
    } catch (err) {
      console.log('AI first attempt failed, retrying...');
      try {
        parsed = await callAI(true);
        if (!validateAIResponse(parsed, history)) {
          throw new Error('Retry validation failed');
        }
      } catch (retryErr) {
        console.error('AI retry failed:', retryErr);
        return NextResponse.json({ error: 'AI failed to generate valid question' }, { status: 502 });
      }
    }

    return NextResponse.json({
      ok: true,
      question: parsed.question,
      options: parsed.options,
      allowCustomAnswer: parsed.allowCustomAnswer,
      customAnswerPlaceholder: parsed.customAnswerPlaceholder,
      isFinal: false
    });

  } catch (error) {
    console.error('Next Question Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
