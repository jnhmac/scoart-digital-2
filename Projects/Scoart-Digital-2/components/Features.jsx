'use client'

import { motion } from 'framer-motion'
import { Zap, Target, Shield, Rocket, Users, Award } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance that keeps customers engaged and conversions high.',
    },
    {
      icon: Target,
      title: 'Results Focused',
      description: 'Every decision backed by data, every strategy designed to achieve your goals.',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security protocols protecting your business and customer data.',
    },
    {
      icon: Rocket,
      title: 'Scalable Growth',
      description: 'Infrastructure that grows with your business, from startup to enterprise.',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Dedicated specialists with years of experience in digital transformation.',
    },
    {
      icon: Award,
      title: 'Proven Track Record',
      description: '200+ successful projects delivered on time and within budget.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  }

  return (
    <section className="section-padding bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container-fluid relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4 px-4 py-2 bg-accent-500 border-2 border-white"
          >
            <span className="text-sm font-medium uppercase tracking-wider text-white">
              Why Choose Us
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-display font-bold leading-tight text-white mb-6"
          >
            Built for <span className="text-accent-400">Performance</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg leading-relaxed text-white max-w-2xl mx-auto"
          >
            We combine technical excellence with strategic thinking to deliver
            solutions that make a real difference.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <div className="h-full p-8 bg-dark-800/50 border-2 border-dark-700 backdrop-blur-sm transition-all duration-300 hover:border-accent-500 hover:bg-dark-800">
                  {/* Icon */}
                  <div className="mb-6 relative">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 border-2 border-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <Icon size={28} className="text-white" strokeWidth={2} />
                    </div>
                    {/* Decorative dot */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-accent-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 md:mt-20 text-center"
        >
          <p className="text-lg leading-relaxed text-white mb-6">
            Ready to transform your digital presence?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent-500 text-white font-medium border-2 border-white transition-all duration-300 hover:bg-accent-600 hover:scale-105 active:scale-95"
          >
            Get Started Today
            <Rocket size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
