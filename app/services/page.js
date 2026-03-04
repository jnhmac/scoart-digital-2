'use client'

import { motion } from 'framer-motion'
import { ShoppingCart, TrendingUp, Code2, Megaphone, Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function ServicesPage() {
  const services = [
    {
      id: 'ecommerce',
      icon: ShoppingCart,
      title: 'E-commerce Solutions',
      description: 'Launch a market-ready online store with payments, shipping, and tax compliance built in.',
      features: [
        'Shopify Plus, OpenCart & WooCommerce setup',
        'Payment gateway integration (Stripe, PayPal, multi-currency)',
        'Mobile-first responsive design',
        'Inventory and order management',
        'Analytics and conversion tracking',
        'Ongoing maintenance and support',
      ],
      benefits: 'We handle the technical complexity of online selling so you can focus on your products and customers.',
    },
    {
      id: 'marketplace',
      icon: TrendingUp,
      title: 'Marketplace Optimization',
      description: 'Get your products ranking and selling on Amazon, Shopify, and WooCommerce.',
      features: [
        'Product listing optimization that drives conversions',
        'Amazon, Shopify, WordPress, WooCommerce, and OpenCart management',
        'Sponsored ads and marketplace advertising',
        'Sales tracking and revenue reporting',
        'Competitor analysis and pricing strategy',
        'Review management and brand protection',
      ],
      benefits: 'We optimize every part of your marketplace presence so your products get found, clicked, and purchased.',
    },
    {
      id: 'development',
      icon: Code2,
      title: 'Custom Development',
      description: 'Web apps, marketing operations, and integrations built to handle your specific workflow.',
      features: [
        'Web applications (React, Next.js, Vue)',
        'Mobile apps (iOS & Android)',
        'API development and third-party integrations',
        'HubSpot and CRM administration',
        'Lead scoring, routing, and lifecycle management',
        'Custom reporting dashboards and analytics',
      ],
      benefits: 'We build the tools your business actually needs, not off-the-shelf software with workarounds.',
    },
    {
      id: 'marketing',
      icon: Megaphone,
      title: 'Digital Marketing',
      description: 'Marketing that reaches buyers across search engines, AI platforms, and social media, with full spend transparency.',
      features: [
        'Search Engine Optimization (SEO) for Google rankings',
        'Generative Engine Optimization (GEO) for AI platforms',
        'AI search visibility (ChatGPT, Perplexity, Google AI Overviews)',
        'Google Ads and PPC campaign management',
        'Social media marketing and paid advertising',
        'Email marketing and Account-Based Marketing (ABM)',
        'Marketing operations and funnel optimization',
      ],
      benefits: 'We build marketing systems that get your brand found in Google, AI search platforms, and social media, and give you clear data on what\'s driving real revenue.',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-dark-900 dark:via-dark-900 dark:to-dark-800 transition-colors duration-300">
      {/* Hero Section */}
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
                Our Services
              </span>
            </div>
            <h1 className="heading-display mb-6">
              Solutions That Drive{' '}
              <span className="text-gradient">Real Results</span>
            </h1>
            <p className="body-lg text-dark-600 dark:text-gray-400">
              From your first US sale to full-scale operations, we build the systems that get you there.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="pb-20 md:pb-32">
        <div className="container-fluid">
          <div className="space-y-16 md:space-y-24">
            {services.map((service, index) => {
              const Icon = service.icon
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6 }}
                  className="scroll-mt-24"
                >
                  <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Content */}
                    <div className={!isEven ? 'lg:order-2' : ''}>
                      <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-6 bg-accent-500 border-2 border-dark-900 dark:border-dark-600">
                        <Icon size={36} className="text-white" strokeWidth={2} />
                      </div>
                      <h2 className="heading-lg mb-4">{service.title}</h2>
                      <p className="body-lg text-dark-600 dark:text-gray-400 mb-6">
                        {service.description}
                      </p>
                      <p className="text-dark-700 dark:text-gray-300 mb-8 leading-relaxed">
                        {service.benefits}
                      </p>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-accent-500 font-medium hover:text-accent-600 transition-colors group"
                      >
                        Get Started
                        <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>

                    {/* Features */}
                    <div className={!isEven ? 'lg:order-1' : ''}>
                      <div className="p-8 md:p-10 bg-white dark:bg-dark-800 border-2 border-dark-900 dark:border-dark-700 shadow-brutal">
                        <h3 className="text-xl font-bold mb-6 text-dark-900 dark:text-gray-100">
                          What's Included:
                        </h3>
                        <ul className="space-y-4">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-accent-500 border-2 border-dark-900 dark:border-dark-600 flex items-center justify-center mt-0.5">
                                <Check size={14} className="text-white" strokeWidth={3} />
                              </div>
                              <span className="text-dark-700 dark:text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark-900 text-white">
        <div className="container-fluid">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-xl mb-6 !text-white">
                Not Sure Where to Start?
              </h2>
              <p className="body-lg !text-gray-300 mb-8 max-w-2xl mx-auto">
                Tell us about your business and goals. We&apos;ll recommend the right
                services and give you an honest estimate. No pressure, no obligations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-accent-500 text-white font-medium border-2 border-white transition-all duration-300 hover:bg-accent-600 hover:scale-105"
                >
                  Book a Free Strategy Call
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-medium transition-all duration-300 hover:bg-white hover:text-dark-900"
                >
                  Learn About Our Team
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
