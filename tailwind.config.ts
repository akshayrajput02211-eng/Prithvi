import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        world: {
          primary: 'var(--world-primary)',
          accent: 'var(--world-accent)',
          bg: 'var(--world-bg)',
          text: 'var(--world-text)',
          cursor: 'var(--world-cursor)',
        },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        heading: ['var(--world-font-heading)', 'sans-serif'],
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'ember-rise': 'ember-rise 7s linear infinite',
        'shooting-star': 'shooting-star 5.5s ease-in-out infinite',
        shimmer: 'shimmer 2.8s linear infinite',
        glitch: 'glitch 1.5s steps(2, end) infinite',
        'count-rotate': 'count-rotate 120s linear infinite',
      },
      boxShadow: {
        'world-glow': '0 0 24px var(--world-accent)',
      },
    },
  },
  plugins: [],
};

export default config;