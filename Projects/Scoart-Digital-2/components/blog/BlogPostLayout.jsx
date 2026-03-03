'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import { getCategoryLabel } from '../../lib/blog-utils'
import ShareButtons from './ShareButtons'
import RelatedPosts from './RelatedPosts'
import NewsletterSignup from './NewsletterSignup'
import ReadingProgress from './ReadingProgress'

export default function BlogPostLayout({ frontmatter, slug, relatedPosts, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-dark-900 dark:via-dark-900 dark:to-dark-800 transition-colors duration-300">
      <ReadingProgress />
      {/* Post Header */}
      <section className="pt-32 pb-8 md:pt-40 md:pb-12">
        <div className="container-fluid">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Back Link */}
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-semantic-text-tertiary hover:text-semantic-accent transition-colors mb-8 group"
              >
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                Back to Blog
              </Link>

              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-accent-500 text-white border border-dark-900 dark:border-dark-600">
                  {getCategoryLabel(frontmatter.category)}
                </span>
              </div>

              {/* Title */}
              <h1 className="heading-display mb-6">{frontmatter.title}</h1>

              {/* Description */}
              <p className="body-lg text-dark-600 dark:text-gray-400 mb-6">
                {frontmatter.description}
              </p>

              {/* Meta Row */}
              <div className="flex flex-wrap items-center gap-4 pb-8 border-b border-semantic-border">
                <div className="flex items-center gap-2 text-sm text-semantic-text-tertiary">
                  <Calendar size={16} />
                  {new Date(frontmatter.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
                {frontmatter.readTime && (
                  <div className="flex items-center gap-2 text-sm text-semantic-text-tertiary">
                    <Clock size={16} />
                    {frontmatter.readTime}
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-semantic-text-tertiary">
                  By {frontmatter.author || 'Scoart Digital'}
                </div>
                <div className="ml-auto">
                  <ShareButtons title={frontmatter.title} slug={slug} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      {frontmatter.image && (
        <section className="pb-8 md:pb-12">
          <div className="container-fluid">
            <div className="max-w-3xl mx-auto">
              <img
                src={frontmatter.image}
                alt={frontmatter.title}
                className="w-full border-2 border-dark-900 dark:border-dark-700 shadow-brutal"
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Body */}
      <section className="pb-16 md:pb-20">
        <div className="container-fluid">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto prose-custom"
          >
            {children}
          </motion.article>

          {/* Bottom Share */}
          <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-semantic-border flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-semantic-text-tertiary hover:text-semantic-accent transition-colors group"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              All Articles
            </Link>
            <ShareButtons title={frontmatter.title} slug={slug} />
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <RelatedPosts posts={relatedPosts} />

      {/* Newsletter */}
      <NewsletterSignup />
    </div>
  )
}
