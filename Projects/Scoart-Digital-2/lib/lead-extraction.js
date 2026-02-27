const EXTRACTION_PROMPT = `You are a data extraction tool. Analyze the conversation below between a visitor and a consultant. Extract any lead information the visitor has shared.

Return ONLY valid JSON with these fields (use null if not mentioned):
{
  "name": "visitor's name or null",
  "email": "visitor's email or null",
  "need": "what they need help with (brief summary) or null",
  "timeline": "when they want to start or null",
  "urgency": "high, medium, low, or unknown"
}

Rules:
- Only extract information the visitor explicitly stated
- Do not infer or guess values
- For urgency: "high" if they mention ASAP/urgent/this week, "medium" if within a month, "low" if no rush, "unknown" if not mentioned
- Keep "need" under 100 characters
- Return ONLY the JSON object, no other text`

export function buildExtractionMessages(messages) {
  const transcript = messages
    .map(m => `${m.role === 'user' ? 'Visitor' : 'Consultant'}: ${m.content}`)
    .join('\n')

  return [
    { role: 'user', content: `${EXTRACTION_PROMPT}\n\nConversation:\n${transcript}` }
  ]
}

export function parseExtraction(text) {
  try {
    const cleaned = text.replace(/```json?\n?/g, '').replace(/```/g, '').trim()
    const data = JSON.parse(cleaned)

    const result = {
      name: data.name || null,
      email: data.email || null,
      need: data.need || null,
      timeline: data.timeline || null,
      urgency: data.urgency || 'unknown',
    }

    // If email is captured but no specific need stated, default to handoff intent
    if (result.email && !result.need) {
      result.need = 'Requested to speak with team'
    }

    // Lead is qualified when we have email + need
    result.qualified = !!(result.email && result.need)

    return result
  } catch (err) {
    console.error('Lead extraction parse error:', err.message)
    return null
  }
}
