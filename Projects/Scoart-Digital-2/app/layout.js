import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ThemeProvider } from '../contexts/ThemeContext'

export const metadata = {
  title: 'Scoart Digital - Bold Digital Solutions That Stand Out',
  description: 'We craft exceptional digital experiences for ambitious brands. E-commerce excellence, marketplace mastery, and custom development that drives real results.',
  keywords: 'e-commerce development, marketplace optimization, custom web development, digital transformation, modern web design',
  author: 'Scoart Digital',
  openGraph: {
    title: 'Scoart Digital - Bold Digital Solutions',
    description: 'Exceptional digital experiences for ambitious brands',
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased">
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
