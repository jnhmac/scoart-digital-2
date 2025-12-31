'use client'

import { motion } from 'framer-motion'
import { Target, Users, TrendingUp, Globe, Shield, Zap } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Results-Focused',
      description: 'Strategies designed to deliver measurable business outcomes and sustainable growth for your brand.',
    },
    {
      icon: Users,
      title: 'Partnership Approach',
      description: 'We position ourselves as extensions of your team, offering continuous support and strategic direction.',
    },
    {
      icon: TrendingUp,
      title: 'Excellence',
      description: 'Commitment to maintaining highest standards across code quality and customer service.',
    },
    {
      icon: Globe,
      title: 'Global Perspective',
      description: 'International experience enabling us to bridge cultural and technical gaps effectively.',
    },
  ]

  const differentiators = [
    'Deep US market specialization and consumer behavior understanding',
    'Full-stack solutions from strategy through optimization',
    'Proven methodology minimizing risk',
    'Cutting-edge technology and security practices',
    'Ongoing monitoring and support',
    'Cultural navigation expertise',
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
                About Us
              </span>
            </div>
            <h1 className="heading-display mb-6">
              Empowering Brands to{' '}
              <span className="text-gradient">Succeed in America</span>
            </h1>
            <p className="body-lg text-dark-600 max-w-3xl mx-auto">
              We help established international businesses expand their digital operations into the US market
              through expert e-commerce, marketplace optimization, and custom development solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-fluid">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="heading-xl mb-6">Our Mission</h2>
              <p className="body-lg text-dark-700 leading-relaxed max-w-3xl mx-auto">
                To empower global brands with the digital tools and strategies they need to succeed in the
                American market, providing expert guidance every step of the way.
              </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16">
              {[
                { value: '50+', label: 'Projects Delivered' },
                { value: '100%', label: 'Client Satisfaction' },
                { value: '24/7', label: 'Support Available' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center p-6 bg-primary-50 border-2 border-dark-900"
                >
                  <div className="text-4xl md:text-5xl font-display font-bold text-accent-500 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-dark-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary-50 to-white">
        <div className="container-fluid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="heading-xl mb-6">Our Core Values</h2>
            <p className="body-lg text-dark-600 max-w-2xl mx-auto">
              The principles that drive everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group p-8 bg-white border-2 border-dark-900 transition-all duration-300 hover:shadow-brutal"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-accent-500 border-2 border-dark-900 flex items-center justify-center transition-transform group-hover:scale-110">
                      <Icon size={28} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-3 text-dark-900">
                        {value.title}
                      </h3>
                      <p className="text-dark-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-16 md:py-20 bg-dark-900 text-white">
        <div className="container-fluid">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="heading-xl mb-6">What Sets Us Apart</h2>
              <p className="body-lg text-gray-300 max-w-2xl mx-auto">
                Why established brands choose Scoart Digital
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {differentiators.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 bg-dark-800/50 border-2 border-dark-700 hover:border-accent-500 transition-colors"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-accent-500 border-2 border-white mt-1" />
                  <p className="text-gray-300 leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mt-16"
            >
              <p className="body-lg text-gray-300 mb-8">
                Ready to expand into the US market?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent-500 text-white font-medium border-2 border-white transition-all duration-300 hover:bg-accent-600 hover:scale-105 active:scale-95"
              >
                Get Started Today
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-fluid">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-lg mb-6">Based in Arizona, Serving the World</h2>
              <p className="body-lg text-dark-600 mb-8">
                Located in the Greater Phoenix Area, we bring local expertise with a global perspective.
                Our team specializes in helping international brands navigate the US market successfully.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-2 text-dark-700">
                  <Globe size={20} className="text-accent-500" />
                  <span className="font-medium">Greater Phoenix Area, AZ</span>
                </div>
                <div className="flex items-center gap-2 text-dark-700">
                  <Shield size={20} className="text-accent-500" />
                  <span className="font-medium">US Market Specialists</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
