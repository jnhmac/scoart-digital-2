'use client'

import { motion } from 'framer-motion'

export default function BlogHero() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="container-fluid">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-block mb-6 px-4 py-2 bg-white dark:bg-dark-800 border-2 border-dark-900 dark:border-dark-700 shadow-brutal-sm">
            <span className="text-sm font-medium uppercase tracking-wider dark:text-gray-200">
              Insights & Resources
            </span>
          </div>
          <h1 className="heading-display mb-6">
            Ideas That Drive{' '}
            <span className="text-gradient">Growth</span>
          </h1>
          <p className="body-lg text-dark-600 dark:text-gray-400">
            Practical guides on e-commerce, marketplace strategy, AI search optimization, and growing your brand in the US market.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
