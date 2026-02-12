'use client'

import { motion } from 'framer-motion'
import { ShoppingCart, TrendingUp, Code2, Megaphone, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export default function ServicesGrid() {
  const services = [
    {
      icon: ShoppingCart,
      title: 'E-commerce Solutions',
      description:
        'Launch a market-ready storefront with payment processing, tax compliance, and shipping built in. Shopify, WooCommerce, or fully custom.',
      color: 'accent',
      link: '/services#ecommerce',
    },
    {
      icon: TrendingUp,
      title: 'Marketplace Optimization',
      description:
        'Get your products ranking on Amazon, Shopify, and WooCommerce. We handle listings, PPC campaigns, and performance tracking so you sell more.',
      color: 'primary',
      link: '/services#marketplace',
    },
    {
      icon: Code2,
      title: 'Custom Development',
      description:
        'Web apps, marketing automation, and API integrations built with React, Next.js, and HubSpot. Designed to handle growth from day one.',
      color: 'dark',
      link: '/services#development',
    },
    {
      icon: Megaphone,
      title: 'Digital Marketing',
      description:
        'SEO, GEO (AI search optimization), Google Ads, and content strategy that drives results. We get your brand found on Google, ChatGPT, and AI search platforms, and track every dollar.',
      color: 'accent',
      link: '/services#marketing',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  }

  return (
    <section className="section-padding bg-white dark:bg-dark-900 transition-colors duration-300">
      <div className="container-fluid">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4 px-4 py-2 bg-accent-500 border-2 border-dark-900 dark:border-white"
          >
            <span className="text-sm font-medium uppercase tracking-wider text-white">
              What We Do
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-xl mb-6"
          >
            Services That Drive{' '}
            <span className="text-gradient">Real Results</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-lg max-w-2xl mx-auto"
          >
            Everything you need to sell, grow, and compete in the US digital market.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <Link href={service.link}>
                  <div
                    className={`
                    relative h-full p-8 md:p-10
                    bg-white dark:bg-dark-800 border-2 border-dark-900 dark:border-accent-500
                    transition-all duration-300
                    ${isEven ? 'shadow-brutal hover:shadow-none' : ''}
                    ${!isEven ? 'hover:shadow-brutal' : ''}
                  `}
                  >
                    {/* Icon */}
                    <div
                      className={`
                      inline-flex items-center justify-center
                      w-16 h-16 md:w-20 md:h-20 mb-6
                      border-2 border-dark-900 dark:border-white
                      transition-all duration-300
                      bg-accent-500 group-hover:bg-accent-600 dark:bg-accent-500 dark:group-hover:bg-accent-600
                    `}
                    >
                      <Icon
                        size={32}
                        className="text-dark-900 dark:text-white"
                        strokeWidth={2}
                      />
                    </div>

                    {/* Content */}
                    <h3 className="heading-md mb-4 group-hover:text-semantic-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="body-base mb-6">
                      {service.description}
                    </p>

                    {/* Arrow Link */}
                    <div className="flex items-center gap-2 text-sm font-medium text-semantic-text-primary group-hover:text-semantic-accent transition-colors">
                      <span>Learn More</span>
                      <ArrowUpRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
