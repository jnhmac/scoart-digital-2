'use client'

import { motion } from 'framer-motion'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container-fluid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-block mb-6 px-4 py-2 bg-white border-2 border-dark-900 shadow-brutal-sm">
              <span className="text-sm font-medium uppercase tracking-wider">
                Legal
              </span>
            </div>
            <h1 className="heading-display mb-8">Privacy Policy</h1>

            <div className="prose prose-lg max-w-none">
              <div className="bg-white border-2 border-dark-900 p-8 md:p-12 mb-8">
                <p className="text-sm text-dark-600 mb-8">
                  <strong>Last Updated:</strong> December 30, 2024
                </p>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-dark-900">Introduction</h2>
                  <p className="text-dark-700 leading-relaxed mb-4">
                    Scoart Digital ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                    explains how we collect, use, disclose, and safeguard your information when you visit our website
                    or use our services.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-dark-900">Information We Collect</h2>
                  <p className="text-dark-700 leading-relaxed mb-4">
                    We may collect information about you in a variety of ways, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-dark-700">
                    <li>Personal information (name, email address, phone number) that you voluntarily provide</li>
                    <li>Business information you provide when requesting services</li>
                    <li>Usage data and analytics from your interaction with our website</li>
                    <li>Communication preferences and history</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-dark-900">How We Use Your Information</h2>
                  <p className="text-dark-700 leading-relaxed mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-dark-700">
                    <li>Provide, operate, and maintain our services</li>
                    <li>Respond to your inquiries and provide customer support</li>
                    <li>Send you updates, marketing communications, and promotional materials</li>
                    <li>Improve our website and services</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-dark-900">Data Security</h2>
                  <p className="text-dark-700 leading-relaxed">
                    We use administrative, technical, and physical security measures to protect your personal
                    information. However, no electronic transmission or storage method is 100% secure, and we
                    cannot guarantee absolute security.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-dark-900">Third-Party Services</h2>
                  <p className="text-dark-700 leading-relaxed">
                    We may use third-party service providers to help us operate our business and deliver services
                    to you. These providers have access to your information only to perform specific tasks on our
                    behalf and are obligated to protect your information.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-dark-900">Your Rights</h2>
                  <p className="text-dark-700 leading-relaxed mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-dark-700">
                    <li>Access the personal information we hold about you</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Opt-out of marketing communications</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-dark-900">Contact Us</h2>
                  <p className="text-dark-700 leading-relaxed">
                    If you have questions about this Privacy Policy, please contact us at:
                  </p>
                  <div className="mt-4 p-4 bg-primary-50 border-l-4 border-accent-500">
                    <p className="text-dark-900 font-medium">Scoart Digital</p>
                    <p className="text-dark-700">Email: info@scoartdigital.com</p>
                    <p className="text-dark-700">Phone: +1 (480) 572-4596</p>
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
