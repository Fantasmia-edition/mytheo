import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        nuit: '#0D1B2A',
        or: '#C29B40',
        'or-light': '#D4AF55',
        'or-pale': '#E8D08A',
        creme: '#FEFAE0',
        'creme-dark': '#F5EFC8',
        'nuit-light': '#152233',
        'nuit-mid': '#1E2E42',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'wax-pulse': 'waxPulse 3s ease-in-out infinite',
        'ink-draw': 'inkDraw 2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        waxPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(194, 155, 64, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(194, 155, 64, 0.7)' },
        },
        inkDraw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C29B40, #E8D08A, #C29B40)',
        'parchment': 'radial-gradient(ellipse at center, #FEFAE0 0%, #F0E6B8 100%)',
      },
    },
  },
  plugins: [],
}
export default config
