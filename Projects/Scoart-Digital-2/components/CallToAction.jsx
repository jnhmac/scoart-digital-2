'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function CallToAction() {
  const benefits = [
    'Free initial consultation',
    'Custom strategy tailored to your goals',
    'Transparent pricing, no hidden fees',
    'Dedicated project manager',
  ]

  return (
    <section className="section-padding bg-white dark:bg-dark-900 relative overflow-hidden transition-colors duration-300">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-primary-300/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container-fluid relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-dark-900 to-dark-800 dark:from-primary-100 dark:to-primary-200 border-4 border-dark-900 dark:border-dark-800 shadow-brutal p-8 md:p-12 lg:p-16 transition-colors duration-300"
          >
            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-6"
                >
                  <div className="inline-block px-4 py-2 bg-accent-500 dark:bg-dark-900 border-2 border-white dark:border-dark-800 mb-6 transition-colors duration-300">
                    <span className="text-sm font-medium uppercase tracking-wider text-white dark:text-gray-200">
                      Let's Work Together
                    </span>
                  </div>
                  <h2 className="heading-xl text-white dark:text-dark-900 mb-6 transition-colors duration-300">
                    Ready to Transform Your{' '}
                    <span className="text-accent-400 dark:text-accent-600">Digital Presence?</span>
                  </h2>
                  <p className="body-lg text-gray-100 dark:text-dark-700 mb-8 transition-colors duration-300">
                    Join 200+ satisfied clients who've scaled their business with our
                    proven digital solutions. Let's create something exceptional together.
                  </p>
                </motion.div>

                {/* Benefits List */}
                <motion.ul
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="space-y-4 mb-8"
                >
                  {benefits.map((benefit, index) => (
                    <motion.li
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-3 text-white dark:text-dark-900 transition-colors duration-300"
                    >
                      <CheckCircle2 size={24} className="text-accent-400 dark:text-accent-600 flex-shrink-0" />
                      <span className="text-base md:text-lg">{benefit}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-accent-500 dark:bg-dark-900 text-white dark:text-gray-200 font-medium border-2 border-white dark:border-dark-800 transition-all duration-300 hover:bg-accent-600 dark:hover:bg-dark-800 hover:scale-105 active:scale-95 group"
                  >
                    Start Your Project
                    <ArrowRight
                      size={20}
                      className="ml-2 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                  <a
                    href="mailto:info@scoartdigital.com"
                    className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white dark:border-dark-800 text-white dark:text-dark-900 font-medium transition-all duration-300 hover:bg-white dark:hover:bg-dark-800 hover:text-dark-900 dark:hover:text-gray-200"
                  >
                    Email Us
                  </a>
                </motion.div>
              </div>

              {/* Right Column - Visual Element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="hidden lg:block"
              >
                <div className="relative">
                  {/* Decorative Boxes */}
                  <div className="relative w-full aspect-square">
                    <motion.div
                      animate={{
                        y: [0, -20, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="absolute top-0 right-0 w-40 h-40 bg-accent-500 border-4 border-white"
                    />
                    <motion.div
                      animate={{
                        y: [0, 20, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.5,
                      }}
                      className="absolute bottom-0 left-0 w-48 h-48 bg-white border-4 border-accent-500"
                    />
                    <motion.div
                      animate={{
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent-400 border-4 border-white"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Corners */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-accent-500" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-accent-500" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
