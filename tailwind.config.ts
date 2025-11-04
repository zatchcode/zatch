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
        'zatch-neon': 'var(--zatch-neon)',
        'zatch-green': 'var(--zatch-green)',
        'zatch-dark': 'var(--zatch-dark)',
        'zatch-muted': 'var(--zatch-muted)',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(198, 255, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(198, 255, 0, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
export default config