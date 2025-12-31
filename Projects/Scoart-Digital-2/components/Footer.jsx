'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Services: [
      { label: 'E-commerce Solutions', href: '/services#ecommerce' },
      { label: 'Marketplace Optimization', href: '/services#marketplace' },
      { label: 'Custom Development', href: '/services#development' },
      { label: 'Digital Marketing', href: '/services#marketing' },
    ],
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  }

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ]

  return (
    <footer className="bg-semantic-bg-secondary text-semantic-text-primary transition-colors duration-300">
      {/* Main Footer Content */}
      <div className="container-fluid section-padding border-b border-semantic-border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-block text-3xl font-display font-bold text-semantic-text-primary hover:text-semantic-accent transition-colors duration-300 mb-6"
            >
              Scoart<span className="text-semantic-accent">.</span>
            </Link>
            <p className="body-base text-semantic-text-secondary mb-6 max-w-md">
              We craft exceptional digital experiences for ambitious brands. Let's build something remarkable together.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:info@scoartdigital.com"
                className="flex items-center gap-3 text-semantic-text-secondary hover:text-semantic-accent transition-colors"
              >
                <Mail size={20} />
                <span>info@scoartdigital.com</span>
              </a>
              <a
                href="tel:+14805724596"
                className="flex items-center gap-3 text-semantic-text-secondary hover:text-semantic-accent transition-colors"
              >
                <Phone size={20} />
                <span>+1 (480) 572-4596</span>
              </a>
              <div className="flex items-center gap-3 text-semantic-text-secondary">
                <MapPin size={20} />
                <span>Greater Phoenix Area, AZ</span>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-semantic-text-primary">Services</h3>
            <ul className="space-y-3">
              {footerLinks.Services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-semantic-text-secondary hover:text-semantic-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-semantic-text-primary">Company</h3>
            <ul className="space-y-3">
              {footerLinks.Company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-semantic-text-secondary hover:text-semantic-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container-fluid py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-semantic-text-tertiary">
            © {currentYear} Scoart Digital. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-semantic-text-secondary hover:text-semantic-accent transition-colors"
                  aria-label={social.label}
                >
                  <Icon size={20} />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
