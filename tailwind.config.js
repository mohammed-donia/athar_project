/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f0f9f9',
          100: '#d9f0f0',
          200: '#b3e0e0',
          300: '#7fc7c7',
          400: '#5ba3a3',
          500: '#3d8b8b',
          600: '#2d7a7a',
          700: '#1e5f5f',
          800: '#144343',
          900: '#0a2a2a',
          950: '#051515',
        },
        success: '#10b981',
        warning: '#f59e0b',
        danger:  '#ef4444',
        info:    '#0ea5e9',
        neutral: {
          50:  '#f7f9f9',
          100: '#eef2f2',
          200: '#dde4e4',
          300: '#c4cece',
          400: '#9aa8a8',
          500: '#6b7c7c',
          600: '#4d5c5c',
          700: '#3a4646',
          800: '#252e2e',
          900: '#131a1a',
          950: '#080d0d',
        },
      },
      fontFamily: {
        sans: ['Cairo', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        'xl':  '16px',
        '2xl': '20px',
      },
      boxShadow: {
        'soft':     '0 1px 2px rgba(30, 95, 95, 0.05)',
        'card':     '0 4px 12px rgba(30, 95, 95, 0.08)',
        'elevated': '0 10px 30px rgba(30, 95, 95, 0.12)',
      },
    },
  },
  plugins: [],
}