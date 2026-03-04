'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { getCategoryLabel } from '../../lib/blog-utils'

export default function BlogCard({ post, index = 0, featured = false }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`}>
        <div
          className={`
            h-full p-8 md:p-10
            bg-white dark:bg-dark-800
            border-2 border-dark-900 dark:border-dark-700
            transition-all duration-300
            hover:shadow-brutal
          `}
        >
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-accent-500 text-white border border-dark-900 dark:border-dark-600">
              {getCategoryLabel(post.category)}
            </span>
          </div>

          {/* Title */}
          <h3
            className={`${
              featured ? 'heading-lg' : 'heading-md'
            } mb-3 group-hover:text-semantic-accent transition-colors`}
          >
            {post.title}
          </h3>

          {/* Description */}
          <p className="body-base mb-6 line-clamp-3">{post.description}</p>

          {/* Meta */}
          <div className="flex items-center justify-between pt-4 border-t border-semantic-border">
            <span className="text-sm text-semantic-text-tertiary">
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
              {post.readTime && ` · ${post.readTime}`}
            </span>
            <span className="flex items-center gap-1 text-sm font-medium text-semantic-text-primary group-hover:text-semantic-accent transition-colors">
              Read More
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
