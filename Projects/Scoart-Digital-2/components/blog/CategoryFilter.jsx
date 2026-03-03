'use client'

import { motion } from 'framer-motion'
import { CATEGORIES } from '../../lib/blog-utils'

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  const allCategories = [{ slug: 'all', label: 'All' }, ...CATEGORIES]

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12 md:mb-16">
      {allCategories.map((category) => (
        <motion.button
          key={category.slug}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category.slug)}
          className={`
            px-4 py-2 text-sm font-medium border-2 transition-all duration-300
            ${
              activeCategory === category.slug
                ? 'bg-accent-500 text-white border-dark-900 dark:border-white shadow-brutal-sm'
                : 'bg-white dark:bg-dark-800 text-dark-900 dark:text-gray-200 border-dark-900 dark:border-dark-700 hover:bg-primary-50 dark:hover:bg-dark-700'
            }
          `}
        >
          {category.label}
        </motion.button>
      ))}
    </div>
  )
}
