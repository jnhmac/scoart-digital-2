'use client'

import { useState } from 'react'
import { Linkedin, Link2, Check } from 'lucide-react'

export default function ShareButtons({ title, slug }) {
  const [copied, setCopied] = useState(false)
  const url = `https://scoartdigital.com/blog/${slug}`

  const shareLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      '_blank',
      'width=600,height=400'
    )
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = url
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-semantic-text-tertiary">Share:</span>
      <button
        onClick={shareLinkedIn}
        className="p-2 border-2 border-dark-900 dark:border-dark-700 bg-white dark:bg-dark-800 hover:bg-accent-500 hover:text-white hover:border-accent-500 transition-all duration-300"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={18} />
      </button>
      <button
        onClick={copyLink}
        className="p-2 border-2 border-dark-900 dark:border-dark-700 bg-white dark:bg-dark-800 hover:bg-accent-500 hover:text-white hover:border-accent-500 transition-all duration-300"
        aria-label="Copy link"
      >
        {copied ? <Check size={18} className="text-green-500" /> : <Link2 size={18} />}
      </button>
    </div>
  )
}
