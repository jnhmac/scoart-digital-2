'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const form = e.target
      const formData = new FormData(form)

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', company: '', service: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'info@scoartdigital.com',
      link: 'mailto:info@scoartdigital.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (480) 572-4596',
      link: 'tel:+14805724596',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Greater Phoenix Area, AZ',
      link: '#',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      value: 'Mon-Fri: 9AM - 6PM MST',
      link: '#',
    },
  ]

  const services = [
    'E-commerce Solutions',
    'Marketplace Optimization',
    'Custom Development',
    'Digital Marketing',
    'Other',
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
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-block mb-6 px-4 py-2 bg-white border-2 border-dark-900 shadow-brutal-sm">
              <span className="text-sm font-medium uppercase tracking-wider">
                Get In Touch
              </span>
            </div>
            <h1 className="heading-display mb-6">
              Let's Build Something{' '}
              <span className="text-gradient">Amazing Together</span>
            </h1>
            <p className="body-lg text-dark-600">
              Have a project in mind? We'd love to hear about it. Fill out the form
              below or reach out directly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-20 md:pb-32">
        <div className="container-fluid">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="heading-md mb-6">Contact Information</h2>
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <motion.a
                    key={info.title}
                    href={info.link}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="block p-6 bg-white border-2 border-dark-900 transition-all duration-300 hover:shadow-brutal-sm hover:-translate-y-1 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-accent-500 border-2 border-dark-900 flex items-center justify-center transition-transform group-hover:scale-110">
                        <Icon size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-dark-900 mb-1">{info.title}</h3>
                        <p className="text-dark-600">{info.value}</p>
                      </div>
                    </div>
                  </motion.a>
                )
              })}

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="p-6 bg-dark-900 border-2 border-dark-900 text-white"
              >
                <h3 className="font-bold text-lg mb-3">Quick Response</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  We typically respond to all inquiries within 24 hours during business
                  days. For urgent matters, please call us directly.
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="bg-white border-4 border-dark-900 shadow-brutal p-8 md:p-10">
                <h2 className="heading-md mb-8">Send Us a Message</h2>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-50 border-2 border-green-500 text-green-800"
                  >
                    <p className="font-medium">Thank you for your message!</p>
                    <p className="text-sm mt-1">
                      We'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border-2 border-red-500 text-red-800"
                  >
                    <p className="font-medium">Oops! Something went wrong.</p>
                    <p className="text-sm mt-1">
                      Please try again or email us directly at{' '}
                      <a
                        href="mailto:info@scoartdigital.com"
                        className="underline font-medium"
                      >
                        info@scoartdigital.com
                      </a>
                    </p>
                  </motion.div>
                )}

                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Netlify form detection */}
                  <input type="hidden" name="form-name" value="contact" />

                  {/* Honeypot field for spam protection */}
                  <p className="hidden">
                    <label>
                      Don't fill this out if you're human: <input name="bot-field" />
                    </label>
                  </p>
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-dark-900 mb-2"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-dark-900 bg-white focus:outline-none focus:border-accent-500 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-dark-900 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-dark-900 bg-white focus:outline-none focus:border-accent-500 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-dark-900 mb-2"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-dark-900 bg-white focus:outline-none focus:border-accent-500 transition-colors"
                      placeholder="Your Company"
                    />
                  </div>

                  {/* Service */}
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-dark-900 mb-2"
                    >
                      Service Interested In *
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-dark-900 bg-white focus:outline-none focus:border-accent-500 transition-colors"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-dark-900 mb-2"
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-dark-900 bg-white focus:outline-none focus:border-accent-500 transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-dark-900 text-white font-medium transition-all duration-300 hover:bg-accent-500 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={20} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
