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
      description: 'Build powerful online stores that convert visitors into customers.',
      features: [
        'Shopify Plus & WooCommerce platforms',
        'Payment gateway integration',
        'Mobile-responsive design',
        'Inventory management systems',
        'Customer analytics and reporting',
        'Ongoing maintenance and support',
      ],
      benefits: 'From platform selection to launch, we create shopping experiences that customers love and that drive sales.',
    },
    {
      id: 'marketplace',
      icon: TrendingUp,
      title: 'Marketplace Optimization',
      description: 'Dominate Amazon, eBay, Etsy and other major marketplaces.',
      features: [
        'Product listing optimization',
        'Amazon, eBay, and Etsy expertise',
        'PPC campaign management',
        'Performance analytics',
        'Competitor analysis',
        'Review management strategies',
      ],
      benefits: 'Strategic optimization that increases visibility, drives traffic, and boosts sales across all major marketplaces.',
    },
    {
      id: 'development',
      icon: Code2,
      title: 'Custom Development',
      description: 'Tailored web and mobile applications built for your business.',
      features: [
        'Web applications (React, Next.js, Vue)',
        'Mobile apps (iOS & Android)',
        'API development and integrations',
        'Cloud infrastructure setup',
        'Database design and optimization',
        'Quality assurance and testing',
      ],
      benefits: 'Scalable, secure applications designed to grow with your business, built with cutting-edge technology.',
    },
    {
      id: 'marketing',
      icon: Megaphone,
      title: 'Digital Marketing',
      description: 'Data-driven marketing strategies that deliver ROI.',
      features: [
        'Google Ads and PPC campaigns',
        'Search Engine Optimization (SEO)',
        'Social media marketing',
        'Email campaign management',
        'Content marketing strategy',
        'Conversion rate optimization',
      ],
      benefits: 'Connect with your target audience through strategic campaigns that drive measurable results and growth.',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-fluid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block mb-6 px-4 py-2 bg-white border-2 border-dark-900 shadow-brutal-sm">
              <span className="text-sm font-medium uppercase tracking-wider">
                Our Services
              </span>
            </div>
            <h1 className="heading-display mb-6">
              Solutions That Drive{' '}
              <span className="text-gradient">Real Results</span>
            </h1>
            <p className="body-lg text-dark-600">
              Comprehensive digital services to help your business thrive in the US market
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
                      <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-6 bg-accent-500 border-2 border-dark-900">
                        <Icon size={36} className="text-white" strokeWidth={2} />
                      </div>
                      <h2 className="heading-lg mb-4">{service.title}</h2>
                      <p className="body-lg text-dark-600 mb-6">
                        {service.description}
                      </p>
                      <p className="text-dark-700 mb-8 leading-relaxed">
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
                      <div className="p-8 md:p-10 bg-white border-2 border-dark-900 shadow-brutal">
                        <h3 className="text-xl font-bold mb-6 text-dark-900">
                          What's Included:
                        </h3>
                        <ul className="space-y-4">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-accent-500 border-2 border-dark-900 flex items-center justify-center mt-0.5">
                                <Check size={14} className="text-white" strokeWidth={3} />
                              </div>
                              <span className="text-dark-700">{feature}</span>
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
              <h2 className="heading-xl mb-6">
                Ready to Get Started?
              </h2>
              <p className="body-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Let's discuss how we can help your business succeed in the US market.
                Free consultation and project estimate available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-accent-500 text-white font-medium border-2 border-white transition-all duration-300 hover:bg-accent-600 hover:scale-105"
                >
                  Contact Us Today
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-medium transition-all duration-300 hover:bg-white hover:text-dark-900"
                >
                  Learn More About Us
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
