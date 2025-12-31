# Scoart Digital - Bold Digital Solutions

A modern, visually distinctive website for Scoart Digital - a digital agency specializing in e-commerce solutions, marketplace optimization, and custom development.

## Features

- **Bold, Distinctive Design**: Modern aesthetic that stands out from typical agency websites
- **Smooth Animations**: Framer Motion powered animations with respect for reduced motion preferences
- **Fully Responsive**: Mobile-first design that works beautifully on all devices
- **Accessibility First**: WCAG AA compliant with semantic HTML and ARIA labels
- **Performance Optimized**: Fast loading times with optimized assets
- **Modern Tech Stack**: Built with Next.js 14, React 18, Tailwind CSS

## Design System

### Color Palette

- **Primary**: Warm cream tones (#faf9f0) for a sophisticated, bookish feel
- **Accent**: Rust-orange (#d97757) for bold highlights and CTAs
- **Dark**: Deep slate (#131314) for contrast and text
- **White**: Clean backgrounds and breathing room

### Typography

- **Display Font**: Georgia (serif) for headlines - refined and distinctive
- **Body Font**: System fonts for optimal performance and readability
- **Fluid Scaling**: clamp() functions for responsive typography across all devices

### Layout Principles

- 12-column responsive grid system
- Fluid spacing using CSS clamp()
- Generous whitespace for clarity
- Bold borders and shadow effects (brutalist influence)

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **UI Library**: React 18
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 11
- **Icons**: Lucide React
- **Language**: JavaScript (can be migrated to TypeScript)

## Getting Started

### Prerequisites

- Node.js 18+ or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
cd /Users/jya/Projects/Scoart-Digital-2
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
Scoart-Digital-2/
├── app/
│   ├── contact/
│   │   └── page.js          # Contact page
│   ├── globals.css          # Global styles and utilities
│   ├── layout.js            # Root layout with Header/Footer
│   └── page.js              # Homepage
├── components/
│   ├── CallToAction.jsx     # CTA section with benefits
│   ├── Features.jsx         # Features grid with icons
│   ├── Footer.jsx           # Site footer with links
│   ├── Header.jsx           # Navigation header
│   ├── Hero.jsx             # Hero section with animations
│   └── ServicesGrid.jsx     # Services cards grid
├── public/                  # Static assets
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
└── tailwind.config.js
```

## Key Components

### Hero
- Animated headline with SVG underline
- Floating background elements
- Stats display
- Scroll indicator

### ServicesGrid
- 4 service cards with hover effects
- Bold borders and shadows
- Icon-based visual hierarchy
- Decorative corner elements on hover

### Features
- 6 feature cards in responsive grid
- Dark background with pattern overlay
- Animated icons and hover states
- Built-in CTA

### CallToAction
- Two-column layout with benefits list
- Animated decorative boxes
- Multiple CTA options
- Decorative corner accents

### Contact Page
- Full-page contact form
- Contact info cards
- Form validation
- Loading states

## Customization

### Colors
Edit `tailwind.config.js` to modify the color palette:
```javascript
colors: {
  primary: { /* your colors */ },
  accent: { /* your colors */ },
  dark: { /* your colors */ },
}
```

### Typography
Modify font families in `tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['your-sans-font', 'sans-serif'],
  display: ['your-display-font', 'serif'],
}
```

### Animations
Adjust animation duration and easing in `app/globals.css` and component files.

## Accessibility

- Semantic HTML5 elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast meets WCAG AA standards (4.5:1 for text)
- Respects `prefers-reduced-motion`
- Focus indicators on all interactive elements

## Performance

- Server-side rendering with Next.js
- Automatic code splitting
- Optimized images (when using next/image)
- CSS purging in production
- Minimal JavaScript bundle

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Private - All rights reserved by Scoart Digital

## Contact

For questions or support:
- Email: hello@scoartdigital.com
- Phone: +1 (234) 567-890
- Location: San Francisco, CA
