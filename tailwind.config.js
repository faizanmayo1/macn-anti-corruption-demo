import animate from 'tailwindcss-animate'

// MACN OS — Maritime Anti-Corruption Intelligence. "Deep Current": a trustworthy,
// institutional LIGHT system on a cool off-white canvas, structured in DEEP MARITIME
// INK (the MACN brand / governance frame), with a single TEAL-GREEN "current" accent
// carrying the AI / Lodestar layer (clean water = clean shipping), and a RISK-AMBER
// reserved for corruption-risk / high-risk-port emphasis. Green/amber/red stay STRICTLY
// for status (clear / watch / high-risk). Signature motifs: redaction bars (raw→sanitized),
// maritime cartography (port nodes + corridor arcs), sonar risk pulses.
// Token keys kept as steel/azure/cyan/gold/amber (+ navy/sky/volt aliases) so the shared
// shadcn + blueprint primitives stay wired unedited; only the VALUES are remapped.

// Structure / primary — deep maritime ink (MACN governance brand)
const steel = {
  DEFAULT: '#0E2E38',
  raised: '#143C49',
  line: '#23525E',
  muted: '#6E8794',
  soft: '#A9BEC6',
  fore: '#E8F1F3',
  50: '#EDF3F4',
  100: '#D6E2E5',
  200: '#AEC6CB',
  300: '#7FA3AB',
  400: '#537B85',
  500: '#2F5763',
  600: '#1F4651',
  700: '#193E48',
  800: '#0E2E38',
  900: '#08212A',
}

// TEAL-GREEN "current" accent — AI / Lodestar / sanitized-safe + live pulse
const cyan = {
  DEFAULT: '#0FB5A6',
  deep: '#0A7E73',
  soft: '#DCF6F1',
  glow: '#34D6C6',
  50: '#ECFBF8',
  100: '#CCF3EC',
  200: '#9DE7DB',
  300: '#5FD6C7',
  400: '#2EC4B4',
  500: '#0FB5A6',
  600: '#0E9C8F',
  700: '#0B8175',
}

// RISK-AMBER accent — corruption-risk / high-risk port / early-warning emphasis
const gold = {
  DEFAULT: '#CE7519',
  deep: '#A85C12',
  soft: '#FBEAD2',
  glow: '#E9A949',
  50: '#FDF4EA',
  100: '#FAE6CC',
  200: '#F3C896',
  300: '#EAA85E',
  400: '#E08C36',
  500: '#CE7519',
  600: '#A85C12',
  700: '#84480F',
}

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: '2rem', screens: { '2xl': '1400px' } },
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'Georgia', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },

        // MACN "Deep Current" palette
        canvas: { DEFAULT: '#F7F9FA', subtle: '#EEF2F4', raised: '#FFFFFF' },
        ink: { DEFAULT: '#0B2129', muted: '#3C5560', subtle: '#5C7681', faint: '#93A7AE' },
        hairline: { DEFAULT: '#E2E9EB', strong: '#CFDADD' },
        // Structure — deep maritime ink
        steel,
        // TEAL-GREEN — AI / Lodestar / sanitized-safe
        azure: cyan,
        cyan,
        // RISK-AMBER — corruption-risk emphasis
        amber: gold,
        gold,
        // Back-compat aliases so shared components stay on-brand
        navy: steel,
        sky: cyan,
        red: { DEFAULT: '#DC2626', deep: '#B91C1C', soft: '#FEE2E2' },
        volt: cyan,
        // Status — RESERVED traffic-light semantics (clear / watch / high-risk)
        signal: {
          positive: '#15803D',
          'positive-soft': '#DCFCE7',
          warning: '#B26B08',
          'warning-soft': '#FBEAD2',
          risk: '#DC2626',
          'risk-soft': '#FEE2E2',
          info: '#0A7E73',
          'info-soft': '#DCF6F1',
          neutral: '#5C7681',
          'neutral-soft': '#EEF2F4',
        },
      },
      borderRadius: { lg: 'var(--radius)', md: 'calc(var(--radius) - 2px)', sm: 'calc(var(--radius) - 4px)' },
      boxShadow: {
        'card-sm': '0 1px 2px rgba(11, 33, 41, 0.04), 0 2px 6px rgba(11, 33, 41, 0.04)',
        card: '0 2px 4px rgba(11, 33, 41, 0.05), 0 8px 20px -4px rgba(11, 33, 41, 0.07)',
        'card-md': '0 4px 10px rgba(11, 33, 41, 0.06), 0 14px 32px -6px rgba(11, 33, 41, 0.10)',
        'card-lg': '0 18px 50px -10px rgba(11, 33, 41, 0.22), 0 6px 14px -4px rgba(11, 33, 41, 0.08)',
        inset: 'inset 0 0 0 1px rgba(11, 33, 41, 0.05)',
        'volt-glow': '0 0 0 4px rgba(15, 181, 166, 0.14)',
        'volt-lift': '0 10px 30px -8px rgba(15, 181, 166, 0.28), 0 4px 10px -4px rgba(11, 33, 41, 0.12)',
        'cta': '0 6px 18px -4px rgba(15, 181, 166, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.18)',
        'gold-lift': '0 10px 30px -8px rgba(206, 117, 25, 0.30), 0 4px 10px -4px rgba(11, 33, 41, 0.12)',
        'device': '0 30px 60px -18px rgba(11, 33, 41, 0.42), 0 12px 24px -10px rgba(11, 33, 41, 0.22)',
      },
      letterSpacing: { 'tight-bank': '-0.02em', 'wide-eyebrow': '0.08em' },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'fade-in': { from: { opacity: '0', transform: 'translateY(4px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        'scan-sweep': { '0%': { transform: 'translateY(-10%)', opacity: '0' }, '15%': { opacity: '1' }, '85%': { opacity: '1' }, '100%': { transform: 'translateY(940%)', opacity: '0' } },
        'slide-in-right': { from: { opacity: '0', transform: 'translateX(16px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        'pulse-soft': { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.45' } },
        'pulse-ring': { '0%': { transform: 'scale(0.7)', opacity: '0.7' }, '100%': { transform: 'scale(2.2)', opacity: '0' } },
        'stream-in': { from: { opacity: '0', transform: 'translateY(-8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'ring-fill': { from: { strokeDashoffset: 'var(--ring-circ)' }, to: { strokeDashoffset: 'var(--ring-offset)' } },
        'box-in': { from: { opacity: '0', transform: 'scale(0.92)' }, to: { opacity: '1', transform: 'scale(1)' } },
        ticker: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'redact-wipe': { '0%': { width: '0%' }, '100%': { width: '100%' } },
        'sonar-ping': { '0%': { transform: 'scale(0.5)', opacity: '0.65' }, '100%': { transform: 'scale(2.4)', opacity: '0' } },
        'dash-flow': { to: { strokeDashoffset: '-24' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.4s ease-out both',
        shimmer: 'shimmer 2.4s linear infinite',
        'scan-sweep': 'scan-sweep 2.4s cubic-bezier(0.4,0,0.2,1) infinite',
        'slide-in-right': 'slide-in-right 0.28s ease-out both',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 1.8s ease-out infinite',
        'stream-in': 'stream-in 0.5s ease-out both',
        'ring-fill': 'ring-fill 1.1s cubic-bezier(0.4,0,0.2,1) both',
        'box-in': 'box-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
        'redact-wipe': 'redact-wipe 0.7s cubic-bezier(0.65,0,0.35,1) both',
        'sonar-ping': 'sonar-ping 2s ease-out infinite',
        'dash-flow': 'dash-flow 1s linear infinite',
      },
    },
  },
  plugins: [animate],
}
