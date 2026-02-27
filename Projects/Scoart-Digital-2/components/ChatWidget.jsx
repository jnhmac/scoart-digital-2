'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, AlertCircle, RotateCcw, Sparkles } from 'lucide-react'

function renderMessageContent(text) {
  const linkPattern = /(https?:\/\/[^\s]+|\/[a-z][a-z0-9-]*(?:\/[a-z0-9-]*)*)/gi
  const parts = text.split(linkPattern)

  return parts.map((part, i) => {
    if (linkPattern.test(part)) {
      linkPattern.lastIndex = 0
      const isExternal = part.startsWith('http')
      return (
        <a
          key={i}
          href={part}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="underline font-medium hover:opacity-80"
        >
          {part}
        </a>
      )
    }
    return part
  })
}

function formatTime(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const STORAGE_KEY = 'scoart-chat'
const SESSION_KEY = 'scoart-chat-session'

const STARTER_PROMPTS = [
  'How can you help my business grow online?',
  'I need a new website for my company',
  'Tell me about your e-commerce solutions',
]

function BotAvatar({ size = 'sm', outlined = false }) {
  const sizeClasses = size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-9 h-9' : 'w-12 h-12'
  const iconSize = size === 'sm' ? 14 : size === 'md' ? 20 : 28
  const outlineClasses = outlined ? 'ring-2 ring-white/90 shadow-sm' : ''
  return (
    <div className={`${sizeClasses} ${outlineClasses} rounded-full flex-shrink-0 bg-[#335a69] flex items-center justify-center`}>
      <Sparkles size={iconSize} className="text-white" />
    </div>
  )
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [leadQualified, setLeadQualified] = useState(false)
  const [showEndConfirm, setShowEndConfirm] = useState(false)
  const [shouldBounce, setShouldBounce] = useState(false)
  const sessionIdRef = useRef(null)
  const messagesEndRef = useRef(null)
  const abortRef = useRef(null)
  const chatPanelRef = useRef(null)
  const hasInteractedRef = useRef(false)

  // Initialize session ID and restore messages on mount
  useEffect(() => {
    try {
      let sid = sessionStorage.getItem(SESSION_KEY)
      if (!sid) {
        sid = crypto.randomUUID()
        sessionStorage.setItem(SESSION_KEY, sid)
      }
      sessionIdRef.current = sid

      const saved = sessionStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved).filter(m => m.content && m.content.trim())
        setMessages(parsed)
      }
    } catch {}
  }, [])

  // Save messages to sessionStorage on change
  useEffect(() => {
    if (messages.length > 0) {
      try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages)) } catch {}
    }
  }, [messages])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Escape key to close chat
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        if (showEndConfirm) {
          setShowEndConfirm(false)
        } else {
          setIsOpen(false)
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, showEndConfirm])

  // Gentle bounce once after 8 seconds, only if user hasn't interacted yet
  useEffect(() => {
    if (isOpen) {
      hasInteractedRef.current = true
      setShouldBounce(false)
      return
    }
    if (hasInteractedRef.current) return
    const timer = setTimeout(() => setShouldBounce(true), 8000)
    return () => clearTimeout(timer)
  }, [isOpen])

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isLoading) return

    setError(null)

    const userMsg = { id: Date.now().toString(), role: 'user', content: text.trim(), timestamp: Date.now() }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setIsLoading(true)

    const apiMessages = updatedMessages.map(m => ({
      role: m.role,
      content: m.content,
    }))

    try {
      abortRef.current = new AbortController()

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, sessionId: sessionIdRef.current }),
        signal: abortRef.current.signal,
      })

      if (!response.ok) {
        const errData = await response.text()
        throw new Error(errData || `Server error: ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      const assistantId = (Date.now() + 1).toString()
      let fullText = ''

      // Simulate natural thinking delay (2-4 seconds)
      const delay = 2000 + Math.random() * 2000
      await new Promise(r => setTimeout(r, delay))

      setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '', timestamp: Date.now() }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        fullText += chunk

        setMessages(prev =>
          prev.map(m => m.id === assistantId ? { ...m, content: fullText } : m)
        )
      }

      // Remove empty bot message if stream returned nothing
      if (!fullText.trim()) {
        setMessages(prev => prev.filter(m => m.id !== assistantId))
        setIsLoading(false)
        return
      }

      // Detect lead qualification
      const allMessages = [...updatedMessages, { role: 'assistant', content: fullText }]
      const visitorText = allMessages.filter(m => m.role === 'user').map(m => m.content).join(' ')
      const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(visitorText)
      const confirmPhrases = ['reach out', 'be in touch', 'follow up', 'contact you', 'get back to you']
      const hasConfirmation = confirmPhrases.some(p => fullText.toLowerCase().includes(p))
      if (hasEmail && hasConfirmation) {
        setLeadQualified(true)
      }
    } catch (err) {
      if (err.name === 'AbortError') return
      console.error('Chat error:', err)
      setError(err.message)
    } finally {
      setIsLoading(false)
      abortRef.current = null
    }
  }, [messages, isLoading])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    const text = input
    setInput('')
    sendMessage(text)
  }, [input, isLoading, sendMessage])

  const handleRetry = useCallback(() => {
    setError(null)
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')
    if (lastUserMsg) {
      setMessages(prev => {
        const idx = prev.findLastIndex(m => m.role === 'user')
        return prev.slice(0, idx)
      })
      sendMessage(lastUserMsg.content)
    }
  }, [messages, sendMessage])

  const handleEndChat = useCallback(() => {
    setMessages([])
    setError(null)
    setLeadQualified(false)
    setInput('')
    setShowEndConfirm(false)
    try {
      sessionStorage.removeItem(STORAGE_KEY)
      sessionStorage.removeItem(SESSION_KEY)
      const newSid = crypto.randomUUID()
      sessionStorage.setItem(SESSION_KEY, newSid)
      sessionIdRef.current = newSid
    } catch {}
  }, [])

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => { setIsOpen(!isOpen); setShouldBounce(false) }}
        className="fixed bottom-6 right-6 z-50 p-4 bg-accent-500 text-white rounded-full shadow-brutal-lg border-2 border-dark-900 hover:scale-105 transition-transform"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={shouldBounce ? { y: [0, -8, 0] } : {}}
        transition={shouldBounce ? { duration: 0.6, repeat: 2, ease: 'easeInOut' } : {}}
        onAnimationComplete={() => setShouldBounce(false)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatPanelRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[580px] max-h-[calc(100vh-8rem)] bg-white dark:bg-dark-800 border-2 border-dark-900 dark:border-primary-200 shadow-brutal-lg flex flex-col rounded-lg overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b-2 border-dark-900 dark:border-primary-200 bg-accent-500 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BotAvatar size="md" outlined />
                <div>
                  {leadQualified ? (
                    <>
                      <h3 className="font-bold text-white text-sm">Thanks for chatting!</h3>
                      <p className="text-xs text-white/80">We'll be in touch soon</p>
                    </>
                  ) : (
                    <>
                      <h3 className="font-bold text-white text-sm">Jon</h3>
                      <p className="text-xs text-white/80">AI Strategy Assistant</p>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full px-2">
                  <BotAvatar size="lg" />
                  <p className="text-sm text-dark-900 dark:text-gray-200 mt-3 text-center">
                    Hi, I'm Jon, your AI strategy assistant at Scoart Digital. How can I help?
                  </p>

                  <div className="w-full mt-6 space-y-2">
                    {STARTER_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => sendMessage(prompt)}
                        className="w-full text-left px-3 py-2.5 text-sm border-2 border-dark-900/20 dark:border-gray-600 rounded-lg hover:border-accent-500 hover:bg-accent-50 dark:hover:bg-accent-500/10 text-dark-900 dark:text-gray-200 transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, idx) => {
                const isBot = msg.role === 'assistant'
                const prevMsg = messages[idx - 1]
                const showTimestamp = !prevMsg || (msg.timestamp - prevMsg.timestamp > 120000)
                return (
                  <div key={msg.id}>
                    {showTimestamp && msg.timestamp && (
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center mb-2">
                        {formatTime(msg.timestamp)}
                      </p>
                    )}
                    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
                      {isBot && (
                        <div className="mr-2 mt-1 flex-shrink-0">
                          <BotAvatar size="sm" />
                        </div>
                      )}
                      <div className="max-w-[80%]">
                        <div
                          className={`p-3 rounded-lg whitespace-pre-wrap text-sm ${
                            isBot
                              ? 'bg-gray-100 dark:bg-dark-700 text-dark-900 dark:text-gray-200 rounded-tl-none'
                              : 'bg-accent-500 text-white rounded-br-none'
                          }`}
                        >
                          {isBot ? renderMessageContent(msg.content) : msg.content}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex justify-start">
                  <div className="mr-2 mt-1 flex-shrink-0">
                    <BotAvatar size="sm" />
                  </div>
                  <div className="bg-gray-100 dark:bg-dark-700 p-3 rounded-lg rounded-tl-none inline-block">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-accent-500 rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-accent-500 rounded-full animate-bounce [animation-delay:0.15s]" />
                        <div className="w-1.5 h-1.5 bg-accent-500 rounded-full animate-bounce [animation-delay:0.3s]" />
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-500">Jon is typing</span>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div>
                  <div className="max-w-[80%] p-3 rounded-lg rounded-tl-none bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle size={14} />
                      <span className="text-xs font-medium">Something went wrong</span>
                    </div>
                    <p className="text-xs">Sorry, I couldn't respond. Please try again.</p>
                    <button
                      onClick={handleRetry}
                      className="mt-2 flex items-center gap-1 text-xs underline hover:no-underline"
                    >
                      <RotateCcw size={12} /> Retry
                    </button>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* End Chat Confirmation */}
            <AnimatePresence>
              {showEndConfirm && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-dark-900/10 dark:border-primary-200/20 bg-gray-50 dark:bg-dark-700 px-3 py-2 overflow-hidden"
                >
                  <p className="text-xs text-dark-900 dark:text-gray-300 mb-2">End this conversation? This can't be undone.</p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleEndChat}
                      className="flex-1 text-xs py-1.5 px-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                      End chat
                    </button>
                    <button
                      onClick={() => setShowEndConfirm(false)}
                      className="flex-1 text-xs py-1.5 px-3 border border-gray-300 dark:border-gray-600 text-dark-900 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className="p-3 border-t-2 border-dark-900/10 dark:border-primary-200/20">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isLoading ? 'Waiting for response...' : 'Type a message...'}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-dark-700 dark:text-white rounded-full text-sm focus:outline-none focus:border-accent-500 transition-colors disabled:opacity-50"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="w-10 h-10 flex items-center justify-center bg-accent-500 text-white rounded-full hover:bg-accent-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                >
                  <Send size={16} />
                </button>
              </form>
              {messages.length > 0 && !showEndConfirm && (
                <button
                  onClick={() => setShowEndConfirm(true)}
                  className="w-full text-center text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 mt-2 transition-colors"
                >
                  End chat
                </button>
              )}
              {/* Trust signal */}
              <p className="text-[11px] text-gray-500 dark:text-gray-400 text-center mt-2 font-medium">
                AI-Powered by Scoart Digital
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
