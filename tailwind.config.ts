import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        petrol: '#F59E0B',
        soja:   '#10B981',
        milho:  '#F97316',
        acucar: '#EC4899',
        etanol: '#8B5CF6',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      }
    }
  },
  plugins: []
} satisfies Config
