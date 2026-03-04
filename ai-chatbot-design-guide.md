# AI Chatbot Implementation Plan

## Context
Scoart Digital needs a 24/7 support chatbot to handle common questions when the team is offline (especially for international visitors in different time zones). The chatbot should provide service information, understand visitor needs, and either create a support case or direct them to the contact form. The solution must be cost-effective ($1-5/mo), blend seamlessly with the current design system, and store conversation data for follow-up.

## Requirements
- Provide information about Scoart Digital services
- Understand what visitor is looking for
- Create a case OR direct to contact form (no booking)
- Simple, design-system-integrated UI
- Store conversation data for analysis/follow-up
- Low cost for new site with low traffic

## Technical Stack

### Frontend
- **Chat Widget Component**: React component with Framer Motion animations
- **Styling**: Tailwind CSS matching current design system (orange accent, dark mode support)
- **Position**: Fixed bottom-right corner with minimizable interface

### Backend
- **Netlify Function**: `netlify/functions/chatbot.js`
- **AI Provider**: OpenRouter API (access to multiple models)
- **Models**: GPT-4o-mini (recommended, $0.15/M input) or GPT-3.5-turbo (cheaper alternative)

### Database
- **Supabase** (recommended over Google Sheets)
  - Real-time capabilities
  - Built-in auth (for future admin panel)
  - SQL queries for analytics
  - Free tier: 500MB database, 2GB bandwidth/mo (sufficient for chat logs)

### Cost Breakdown
- OpenRouter API (GPT-4o-mini): $1-3/mo (low traffic)
- Supabase: $0/mo (free tier)
- **Total: $1-3/mo**

## Implementation Plan

### Phase 1: Database Setup (Supabase)

**Schema:**
```sql
CREATE TABLE chat_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  visitor_email TEXT,
  visitor_name TEXT,
  started_at TIMESTAMP DEFAULT NOW(),
  ended_at TIMESTAMP,
  lead_status TEXT, -- 'qualified', 'to_contact', 'info_only'
  summary TEXT
);

CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES chat_conversations(id),
  role TEXT NOT NULL, -- 'user' or 'assistant'
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_conversation_session ON chat_conversations(session_id);
CREATE INDEX idx_messages_conversation ON chat_messages(conversation_id);
```

### Phase 2: System Prompt & Knowledge Base

**System Prompt** (`netlify/functions/chatbot-prompt.js`):
```javascript
export const SYSTEM_PROMPT = `You are a helpful support assistant for Scoart Digital, a digital agency specializing in e-commerce and US market entry for international brands.

Your role:
- Answer questions about services (e-commerce, marketplace optimization, custom development, digital marketing)
- Understand what the visitor is looking for
- When appropriate, suggest they fill out the contact form for a free strategy call
- Be friendly, professional, and concise

Key services:
1. E-commerce Solutions - Shopify, WooCommerce, OpenCart setup with payment integration
2. Marketplace Optimization - Amazon, Shopify listing optimization and PPC campaigns
3. Custom Development - React/Next.js web apps, HubSpot CRM integration
4. Digital Marketing - SEO, GEO (AI search optimization), Google Ads, ABM

Pricing: Custom quotes based on project scope
Response time: 24-48 hours for inquiries
Location: Phoenix, AZ (serves US market)

When visitor seems qualified (asking about specific services, timeline, budget):
- Suggest: "I can connect you with our team for a free strategy call. Would you like to fill out our contact form?"
- Provide link: /contact

Keep responses under 100 words. Be helpful but direct visitors to contact form for detailed quotes.`
```

### Phase 3: Netlify Function

**File**: `netlify/functions/chatbot.js`

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const { messages, sessionId } = JSON.parse(event.body)

  try {
    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini', // or 'openai/gpt-3.5-turbo'
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
      }),
    })

    const data = await response.json()
    const assistantMessage = data.choices[0].message.content

    // Store in Supabase
    await supabase.from('chat_messages').insert([
      { conversation_id: sessionId, role: 'user', content: messages[messages.length - 1].content },
      { conversation_id: sessionId, role: 'assistant', content: assistantMessage }
    ])

    return {
      statusCode: 200,
      body: JSON.stringify({ message: assistantMessage })
    }
  } catch (error) {
    console.error('Chatbot error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to get response' })
    }
  }
}
```

### Phase 4: Chat Widget Component

**File**: `components/ChatWidget.jsx`

```javascript
'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId] = useState(() => crypto.randomUUID())

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/.netlify/functions/chatbot', {
        method: 'POST',
        body: JSON.stringify({
          messages: [...messages, userMessage],
          sessionId
        })
      })

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try the contact form.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-accent-500 text-white rounded-full shadow-brutal-lg border-2 border-dark-900 hover:scale-105 transition-transform"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-white dark:bg-dark-800 border-2 border-dark-900 dark:border-primary-200 shadow-brutal-lg flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b-2 border-dark-900 dark:border-primary-200 bg-accent-500">
              <h3 className="font-bold text-white">Scoart Digital Support</h3>
              <p className="text-sm text-white/90">Ask about our services</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 ${
                    msg.role === 'user'
                      ? 'bg-accent-500 text-white'
                      : 'bg-gray-100 dark:bg-dark-700 text-dark-900 dark:text-gray-200'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-dark-700 p-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-accent-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-accent-500 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-accent-500 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t-2 border-dark-900 dark:border-primary-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask about our services..."
                  className="flex-1 px-3 py-2 border-2 border-dark-900 dark:border-gray-600 dark:bg-dark-700 dark:text-white"
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading}
                  className="px-4 py-2 bg-accent-500 text-white border-2 border-dark-900 hover:bg-accent-600 disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

### Phase 5: Integration

**Update** `app/layout.js`:
```javascript
import ChatWidget from '../components/ChatWidget'

// Add before closing body tag:
<ChatWidget />
```

## Environment Variables

Add to Netlify:
```
OPENROUTER_API_KEY=your_openrouter_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Testing Plan

1. **Local Testing**:
   - Start dev server: `npm run dev`
   - Open chat widget
   - Test service questions
   - Verify responses are relevant
   - Check Supabase for stored messages

2. **Edge Cases**:
   - Empty messages
   - Long conversations
   - API errors
   - Network timeouts

3. **Dark Mode**:
   - Test widget in both themes
   - Verify contrast ratios

4. **Mobile**:
   - Test on small screens
   - Verify responsive sizing

## Deployment

1. Set up Supabase project
2. Run SQL schema
3. Add environment variables to Netlify
4. Deploy code
5. Test on production

## Future Enhancements

- Lead qualification scoring
- Email notifications for qualified leads
- Admin panel to view conversations
- Analytics dashboard
- Sentiment analysis
- Multi-language support
