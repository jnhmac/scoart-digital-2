'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Send, Check } from 'lucide-react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState(null)
  const turnstileRef = useRef(null)

  const renderTurnstile = useCallback(() => {
    if (window.turnstile && turnstileRef.current && !turnstileRef.current.dataset.rendered) {
      turnstileRef.current.dataset.rendered = 'true'
      window.turnstile.render(turnstileRef.current, {
        sitekey: '0x4AAAAAACa63rOxIIndsaqz',
        callback: (token) => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(null),
        theme: 'dark',
        size: 'normal',
      })
    }
  }, [])

  useEffect(() => {
    if (window.turnstile) {
      renderTurnstile()
      return
    }
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoadNewsletter&render=explicit'
    script.async = true
    window.onTurnstileLoadNewsletter = renderTurnstile
    document.head.appendChild(script)
    return () => {
      delete window.onTurnstileLoadNewsletter
    }
  }, [renderTurnstile])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(false)

    if (!turnstileToken) {
      setError(true)
      setIsSubmitting(false)
      return
    }

    try {
      const formData = new URLSearchParams()
      formData.append('email', email)
      formData.append('cf-turnstile-response', turnstileToken)

      const response = await fetch('/.netlify/functions/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      })

      if (response.ok) {
        setSubmitted(true)
        setEmail('')
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 md:py-20 bg-dark-900 text-white"
    >
      <div className="container-fluid">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="heading-lg !text-white mb-4">
            Stay Ahead of the Market
          </h2>
          <p className="body-lg !text-gray-300 mb-8">
            Get practical insights on e-commerce, AI search optimization, and digital growth strategies. No fluff, no spam.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 p-4 bg-accent-500/20 border-2 border-accent-500"
            >
              <Check size={24} className="text-accent-500" />
              <span className="text-lg font-medium">You&apos;re subscribed. Welcome aboard.</span>
            </motion.div>
          ) : (
            <div className="max-w-lg mx-auto">
              {error && (
                <p className="mb-4 text-sm text-red-400">
                  Something went wrong. Please try again.
                </p>
              )}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 bg-dark-800 border-2 border-dark-700 text-white placeholder-gray-500 focus:border-accent-500 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent-500 text-white font-medium border-2 border-white transition-all duration-300 hover:bg-accent-600 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Send size={18} />
                  {isSubmitting ? 'Sending...' : 'Subscribe'}
                </button>
              </form>
              <div className="mt-4 flex justify-center" ref={turnstileRef} />
            </div>
          )}

          <p className="mt-4 text-sm text-gray-500">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </motion.section>
  )
}
