import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── Colors — editorial token system ──────────────────────────────────
      colors: {
        brand:   { DEFAULT: '#c0392b', '2': '#8b4513' },
        surface: {
          DEFAULT: '#edeae3',
          '2':     '#e2ddd4',
          '3':     '#1a1814',
        },
        // Ink / text scale
        ink: {
          DEFAULT: '#111009',
          '2':     '#6b6558',
          '3':     '#a09890',
          inv:     '#f5f2ed',
        },
        // Legacy compat — forest alias → surface-3 values
        forest: {
          50:  '#f5f2ed',
          100: '#edeae3',
          200: '#d4cfc6',
          300: '#b5ae9e',
          400: '#8b8272',
          500: '#6b6558',
          600: '#4a4438',
          700: '#2e2a20',
          800: '#1a1814',
          900: '#111009',
          950: '#0a0906',
          DEFAULT: '#1a1814',
        },
        // Stone — mapped to new surfaces
        stone: {
          50:  '#faf9f7',
          100: '#f5f2ed',
          200: '#edeae3',
          300: '#e2ddd4',
          400: '#c5bfb5',
          500: '#a09890',
          600: '#6b6558',
          700: '#4a4438',
          800: '#2e2a20',
          900: '#1a1814',
          DEFAULT: '#edeae3',
        },
        // Moss — deep surface alias
        moss: {
          50:  '#f0eeeb',
          100: '#d4cfc6',
          200: '#b5ae9e',
          300: '#8b8272',
          400: '#6b6558',
          500: '#4a4438',
          600: '#2e2a20',
          700: '#1a1814',
          800: '#111009',
          900: '#0a0906',
          DEFAULT: '#1a1814',
        },
        // Cognac → brand red
        cognac: {
          50:  '#fdf3f2',
          100: '#f9e0de',
          200: '#f2b9b5',
          300: '#e8857d',
          400: '#d4544a',
          500: '#c0392b',
          600: '#9e2d22',
          700: '#7a2219',
          800: '#561710',
          900: '#330e09',
          DEFAULT: '#c0392b',
        },
        // Semantic
        success: { DEFAULT: '#4a7a47' },
        warning: { DEFAULT: '#c9a84c' },
        error:   { DEFAULT: '#c0392b' },
      },

      // ── Typography ──────────────────────────────────────────────────────
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        body:    ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono:    ['"DM Mono"', '"Courier New"', 'monospace'],
      },
      fontSize: {
        xs:   ['11px', { lineHeight: '1.5', letterSpacing: '0.08em' }],
        sm:   ['13px', { lineHeight: '1.5' }],
        base: ['15px', { lineHeight: '1.6' }],
        lg:   ['20px', { lineHeight: '1.4' }],
        xl:   ['32px', { lineHeight: '1.2' }],
        '2xl':['52px', { lineHeight: '1.05' }],
        // Keep numeric sizes for compat
        '3xl':['39px', { lineHeight: '1.2' }],
        '4xl':['49px', { lineHeight: '1.1' }],
        '5xl':['61px', { lineHeight: '1.05' }],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight:   '-0.02em',
        normal:  '0',
        wide:    '0.06em',
        wider:   '0.08em',
        widest:  '0.12em',
      },

      // ── Spacing (4px base) ───────────────────────────────────────────────
      spacing: {
        '1':  '4px',
        '2':  '8px',
        '3':  '12px',
        '4':  '16px',
        '6':  '24px',
        '8':  '32px',
        '12': '48px',
        '16': '64px',
        // Semantic aliases
        xs:  '4px',
        sm:  '8px',
        md:  '16px',
        lg:  '24px',
        xl:  '48px',
        '2xl':'64px',
        '3xl':'96px',
      },

      // ── Borders — architectural, minimal ────────────────────────────────
      borderRadius: {
        none:    '0',
        sm:      '2px',
        DEFAULT: '4px',
        md:      '4px',
        lg:      '6px',
        xl:      '6px',
        '2xl':   '6px',
        '3xl':   '6px',
        full:    '9999px', // only for circular avatars/indicators
      },

      // ── Shadows ──────────────────────────────────────────────────────────
      boxShadow: {
        sm:           '0 1px 4px rgba(17,16,9,0.08), 0 1px 2px rgba(17,16,9,0.05)',
        DEFAULT:      '0 1px 4px rgba(17,16,9,0.08), 0 1px 2px rgba(17,16,9,0.05)',
        md:           '0 6px 28px rgba(17,16,9,0.12), 0 2px 8px rgba(17,16,9,0.07)',
        lg:           '0 12px 48px rgba(17,16,9,0.18), 0 4px 12px rgba(17,16,9,0.10)',
        xl:           '0 20px 60px rgba(17,16,9,0.20), 0 8px 20px rgba(17,16,9,0.12)',
        // Legacy compat
        nature:       '0 1px 4px rgba(17,16,9,0.08)',
        'nature-md':  '0 6px 28px rgba(17,16,9,0.12)',
        cognac:       '0 4px 16px rgba(192,57,43,0.20)',
        amber:        '0 4px 16px rgba(192,57,43,0.20)',
        inset:        'inset 0 1px 3px rgba(17,16,9,0.08)',
        none:         'none',
      },

      // ── Animation ────────────────────────────────────────────────────────
      transitionTimingFunction: {
        DEFAULT:  'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        out:      'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        spring:   'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        fast:    '200ms',
        DEFAULT: '200ms',
        slow:    '400ms',
        slower:  '400ms',
      },

      // ── Breakpoints ──────────────────────────────────────────────────────
      screens: {
        xs:   '480px',
        sm:   '640px',
        md:   '768px',
        lg:   '1024px',
        xl:   '1280px',
        '2xl':'1536px',
      },

      // ── Z-index ──────────────────────────────────────────────────────────
      zIndex: {
        hide:         '-1',
        base:         '0',
        dropdown:     '1000',
        sticky:       '1020',
        overlay:      '1030',
        modal:        '1040',
        popover:      '1050',
        tooltip:      '1060',
        notification: '1070',
      },
    },
  },
  plugins: [],
};

export default config;
