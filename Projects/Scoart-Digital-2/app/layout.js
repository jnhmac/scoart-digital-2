import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ThemeProvider } from '../contexts/ThemeContext'

export const metadata = {
  title: 'Scoart Digital | E-commerce & Digital Solutions in Phoenix, AZ',
  description: 'Scoart Digital helps international brands scale in the US market. E-commerce development, marketplace optimization, and digital marketing from Phoenix, AZ.',
  keywords: 'e-commerce development Phoenix, marketplace optimization, Shopify development, Amazon optimization, digital marketing agency AZ, custom web development',
  author: 'Scoart Digital',
  icons: {
    icon: '/scoart-logo-orange.svg',
    shortcut: '/scoart-logo-orange.svg',
    apple: '/scoart-logo-orange.svg',
  },
  openGraph: {
    title: 'Scoart Digital | E-commerce & Digital Solutions in Phoenix, AZ',
    description: 'Scoart Digital helps international brands scale in the US market. E-commerce development, marketplace optimization, and digital marketing from Phoenix, AZ.',
    type: 'website',
    url: 'https://scoartdigital.com',
    siteName: 'Scoart Digital',
  },
  alternates: {
    canonical: 'https://scoartdigital.com',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Scoart Digital',
  url: 'https://scoartdigital.com',
  telephone: '+1-480-572-4596',
  email: 'info@scoartdigital.com',
  description: 'Digital agency specializing in e-commerce development, marketplace optimization, custom web applications, and AI-enhanced digital marketing with GEO (Generative Engine Optimization).',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Phoenix',
    addressRegion: 'AZ',
    addressCountry: 'US',
  },
  foundingDate: '2021',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  knowsAbout: [
    'E-commerce Development',
    'Marketplace Optimization',
    'Custom Web Development',
    'Digital Marketing',
    'Generative Engine Optimization (GEO)',
    'AI Search Optimization',
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://challenges.cloudflare.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        {/* Hidden form for Netlify Forms detection during deploy */}
        <form name="contact" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
          <input name="bot-field" />
          <input name="form-name" value="contact" />
          <input name="name" />
          <input name="email" />
          <input name="company" />
          <input name="service" />
          <textarea name="message" />
        </form>
        <form name="newsletter" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
          <input name="bot-field" />
          <input name="form-name" value="newsletter" />
          <input name="email" />
        </form>
        <ThemeProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
