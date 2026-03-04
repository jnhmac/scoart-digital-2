'use client'

import { motion } from 'framer-motion'

export default function TermsPage() {
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
            <h1 className="heading-display mb-8">Terms of Service</h1>

            <div className="prose prose-lg max-w-none">
              <div className="bg-white border-2 border-dark-900 p-8 md:p-12 mb-8">
                <p className="text-sm text-dark-600 mb-8">
                  <strong>Last Updated:</strong> December 30, 2024
                </p>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-dark-900">Agreement to Terms</h2>
                  <p className="text-dark-700 leading-relaxed">
                    By accessing and using Scoart Digital's website and services, you agree to be bound by these
                    Terms of Service and all applicable laws and regulations. If you do not agree with any of these
                    terms, you are prohibited from using our services.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-dark-900">Services</h2>
                  <p className="text-dark-700 leading-relaxed mb-4">
                    Scoart Digital provides digital business solutions including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-dark-700">
                    <li>E-commerce development and solutions</li>
                    <li>Marketplace optimization services</li>
                    <li>Custom web and mobile application development</li>
                    <li>Digital marketing and consulting</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-dark-900">Client Responsibilities</h2>
                  <p className="text-dark-700 leading-relaxed mb-4">
                    As a client, you agree to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-dark-700">
                    <li>Provide accurate and complete information necessary for service delivery</li>
                    <li>Respond to requests for information in a timely manner</li>
                    <li>Pay all fees according to the agreed-upon terms</li>
                    <li>Use our services in compliance with all applicable laws</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-dark-900">Payment Terms</h2>
                  <p className="text-dark-700 leading-relaxed">
                    Payment terms will be outlined in individual service agreements. Generally, we require:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-dark-700 mt-4">
                    <li>Payment schedules as outlined in project proposals</li>
                    <li>Timely payment according to invoices issued</li>
                    <li>Late payments may incur additional fees</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-dark-900">Intellectual Property</h2>
                  <p className="text-dark-700 leading-relaxed">
                    Upon full payment, clients receive ownership of the final deliverables created specifically
                    for their project. However, Scoart Digital retains ownership of any pre-existing materials,
                    proprietary tools, frameworks, and methodologies used in service delivery.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-dark-900">Limitation of Liability</h2>
                  <p className="text-dark-700 leading-relaxed">
                    Scoart Digital shall not be liable for any indirect, incidental, special, consequential, or
                    punitive damages resulting from your use of or inability to use our services. Our total
                    liability shall not exceed the amount paid by you for the specific service in question.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-dark-900">Termination</h2>
                  <p className="text-dark-700 leading-relaxed">
                    Either party may terminate services with written notice as outlined in individual service
                    agreements. Termination does not relieve you of payment obligations for services already
                    rendered.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-dark-900">Changes to Terms</h2>
                  <p className="text-dark-700 leading-relaxed">
                    We reserve the right to modify these terms at any time. We will notify clients of any
                    material changes via email or through our website.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-dark-900">Contact Information</h2>
                  <p className="text-dark-700 leading-relaxed">
                    For questions about these Terms of Service, please contact us:
                  </p>
                  <div className="mt-4 p-4 bg-primary-50 border-l-4 border-accent-500">
                    <p className="text-dark-900 font-medium">Scoart Digital</p>
                    <p className="text-dark-700">Email: info@scoartdigital.com</p>
                    <p className="text-dark-700">Phone: +1 (480) 572-4596</p>
                    <p className="text-dark-700">Location: Greater Phoenix Area, AZ</p>
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
