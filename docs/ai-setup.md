# Phantom Node Studio - AI Setup Guide

The Contact Flow incorporates an optional AI layer to select the next best question based on user context and suggest answers.

## 1. Minimal Setup

By default, the AI layer is entirely configured through environment variables. 
To get started:

1. Copy `.env.example` to `.env.local`
2. Fill in the required AI parameters:
   - `AI_PROVIDER`
   - `AI_API_BASE_URL`
   - `AI_API_KEY`
   - `AI_MODEL`
3. Restart your dev server (`npm run dev`)
4. Open the site, open the DevTools overlay, and click **"Test AI Connection"**.

**Important:** Your `.env.local` file is explicitly ignored in Git and must NEVER be committed to the repository. These API keys run purely on the server-side (`/api/contact/...`) and are never exposed to the browser bundle.

---

## 2. Example Configurations

### Example 1: Grok / xAI-compatible
\`\`\`env
AI_PROVIDER=xai-compatible
AI_API_BASE_URL=https://api.x.ai/v1
AI_API_KEY=YOUR_GROK_API_KEY
AI_MODEL=grok-2-latest
AI_API_FORMAT=chat_completions
\`\`\`

### Example 2: Nara
\`\`\`env
AI_PROVIDER=nara
AI_API_BASE_URL=https://router.bynara.id/v1
AI_API_KEY=YOUR_NARA_API_KEY
AI_MODEL=tencent-hy3
AI_API_FORMAT=chat_completions
\`\`\`

### Example 3: Generic OpenAI-compatible
\`\`\`env
AI_PROVIDER=openai-compatible
AI_API_BASE_URL=https://api.openai.com/v1
AI_API_KEY=YOUR_OPENAI_API_KEY
AI_MODEL=gpt-4o
AI_API_FORMAT=chat_completions
\`\`\`

---

## 3. Fallback Logic

The AI functionality is designed to fail gracefully. If any of the following occur:
- `AI_ENABLED=false`
- Missing or invalid API key
- Network timeout (exceeding `CONTACT_AI_TIMEOUT_MS`)
- Provider rate limits or 500 errors
- Unauthorized requests

...the system will catch the error server-side, log the specific reason internally, and automatically fall back to **Deterministic Routing**. The end user will experience a seamless transition to the next pre-defined question.

## 4. Troubleshooting

If the "Test AI Connection" button fails, you will see a detailed error code, such as:
- `MISSING_API_KEY`: You haven't added `AI_API_KEY` to your `.env.local`.
- `INVALID_BASE_URL`: Your `AI_API_BASE_URL` is missing or malformed.
- `PROVIDER_UNAUTHORIZED`: Your API key is invalid or has been revoked. Ensure you've copied it correctly from your provider's dashboard.
- `PROVIDER_REQUEST_FAILED`: The provider is returning an error (e.g., model does not exist, or the provider's API is down).
