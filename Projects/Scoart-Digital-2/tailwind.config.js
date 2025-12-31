/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic background colors
        'semantic-bg': {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          elevated: 'var(--bg-elevated)',
        },

        // Semantic text colors
        'semantic-text': {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          inverse: 'var(--text-inverse)',
        },

        // Accent colors
        'semantic-accent': {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          muted: 'var(--accent-muted)',
        },

        // Border colors
        'semantic-border': {
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong)',
        },

        // Original color scales (keep for specific use cases)
        primary: {
          50: '#faf9f0',
          100: '#f5f4eb',
          200: '#e8e6d5',
          300: '#d4d0b8',
          400: '#b8b29a',
          500: '#9d9580',
          600: '#827a6b',
          700: '#6a6359',
          800: '#4f4a43',
          900: '#393530',
        },
        accent: {
          50: '#fef5f1',
          100: '#fce8df',
          200: '#f9cdb9',
          300: '#f5ab8c',
          400: '#ee7f54',
          500: '#d97757',
          600: '#c2603f',
          700: '#a04d31',
          800: '#7d3d27',
          900: '#5e2e1d',
        },
        dark: {
          50: '#f7f7f8',
          100: '#e3e3e5',
          200: '#c7c7cb',
          300: '#a4a4aa',
          400: '#7c7c84',
          500: '#5a5a61',
          600: '#46464c',
          700: '#35353a',
          800: '#1f1f22',
          900: '#131314',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'xs': ['clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)', { lineHeight: '1.5' }],
        'sm': ['clamp(0.875rem, 0.8rem + 0.25vw, 1rem)', { lineHeight: '1.6' }],
        'base': ['clamp(1rem, 0.95rem + 0.25vw, 1.125rem)', { lineHeight: '1.7' }],
        'lg': ['clamp(1.125rem, 1rem + 0.5vw, 1.5rem)', { lineHeight: '1.6' }],
        'xl': ['clamp(1.25rem, 1.1rem + 0.6vw, 1.875rem)', { lineHeight: '1.5' }],
        '2xl': ['clamp(1.5rem, 1.25rem + 1vw, 2.25rem)', { lineHeight: '1.3' }],
        '3xl': ['clamp(1.875rem, 1.5rem + 1.5vw, 3rem)', { lineHeight: '1.2' }],
        '4xl': ['clamp(2.25rem, 1.75rem + 2vw, 3.75rem)', { lineHeight: '1.1' }],
        '5xl': ['clamp(3rem, 2rem + 3vw, 4.5rem)', { lineHeight: '1' }],
        'display': ['clamp(2.5rem, 2rem + 2vw, 5rem)', { lineHeight: '1.1' }],
      },
      spacing: {
        'xs': 'clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem)',
        'sm': 'clamp(1rem, 0.8rem + 1vw, 1.5rem)',
        'md': 'clamp(1.5rem, 1rem + 2vw, 3rem)',
        'lg': 'clamp(3rem, 2rem + 4vw, 6rem)',
        'xl': 'clamp(4rem, 3rem + 5vw, 8rem)',
        'gutter': 'clamp(1rem, 4vw, 2rem)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
