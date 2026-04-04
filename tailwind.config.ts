import type { Config } from 'tailwindcss';

// ─── AI Compass Design Tokens ─────────────────────────────────────────────────
// Generated from brand color #B8742E (cognac), classic style
// Adapted with editorial/architectural palette

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── Colors ──────────────────────────────────────────────────────────────
      colors: {
        // Cognac — primary brand accent (leather chairs, arched window frames)
        cognac: {
          50:  '#faf4ec',
          100: '#f2e3cc',
          200: '#e5c799',
          300: '#d4a366',
          400: '#c4873f',
          500: '#B8742E',   // ← brand primary
          600: '#935c22',
          700: '#6e4418',
          800: '#492d0e',
          900: '#241506',
          DEFAULT: '#B8742E',
        },
        // Stone — warm concrete/limestone backgrounds
        stone: {
          50:  '#faf9f7',
          100: '#f5f2ed',
          200: '#EDE8E0',   // ← page background
          300: '#E0D9CF',
          400: '#D6CFCA',   // ← border / divider
          500: '#BDB5AC',
          600: '#9E9590',
          700: '#7A716B',
          800: '#564E48',
          900: '#332C28',
          DEFAULT: '#EDE8E0',
        },
        // Ink — warm near-black for text
        ink: {
          50:  '#f5f2ef',
          100: '#e8e1d9',
          200: '#cfc3b8',
          300: '#b3a295',
          400: '#8c7b6e',   // ← muted/secondary text
          500: '#6b5c50',
          600: '#4A433D',   // ← charcoal / body text
          700: '#362f2a',
          800: '#2A2520',   // ← near-black / heading text
          900: '#1a1714',
          DEFAULT: '#2A2520',
        },
        // Moss — deep forest green (nature contrast, not SaaS mint)
        moss: {
          50:  '#eef3f0',
          100: '#cce0d4',
          200: '#99c1a9',
          300: '#66a27e',
          400: '#3d7d59',
          500: '#265c3f',
          600: '#1F3528',   // ← primary moss
          700: '#162718',
          800: '#0e1a10',
          900: '#070d08',
          DEFAULT: '#1F3528',
        },
        // Semantic (kept from generator, warm-tinted)
        success: { DEFAULT: '#2d6a4f', light: '#40916c', dark: '#1b4332', contrast: '#ffffff' },
        warning: { DEFAULT: '#e9a24b', light: '#f4c07a', dark: '#c17d2a', contrast: '#1a1714' },
        error:   { DEFAULT: '#c1440e', light: '#e06030', dark: '#8c3008', contrast: '#ffffff' },
      },

      // ── Typography ───────────────────────────────────────────────────────────
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:    ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono:    ['"Courier New"', 'Courier', 'monospace'],
      },
      fontSize: {
        xs:   ['10px', { lineHeight: '1.5' }],
        sm:   ['13px', { lineHeight: '1.5' }],
        base: ['16px', { lineHeight: '1.6' }],
        lg:   ['20px', { lineHeight: '1.5' }],
        xl:   ['25px', { lineHeight: '1.4' }],
        '2xl':['31px', { lineHeight: '1.3' }],
        '3xl':['39px', { lineHeight: '1.2' }],
        '4xl':['49px', { lineHeight: '1.1' }],
        '5xl':['61px', { lineHeight: '1.05' }],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight:   '-0.025em',
        normal:  '0',
        wide:    '0.05em',
        wider:   '0.1em',
        widest:  '0.25em',
      },

      // ── Spacing (8pt grid) ───────────────────────────────────────────────────
      spacing: {
        // Semantic aliases over the 8pt grid
        'xs':  '4px',
        'sm':  '8px',
        'md':  '16px',
        'lg':  '24px',
        'xl':  '40px',
        '2xl': '72px',
        '3xl': '128px',
      },

      // ── Borders ──────────────────────────────────────────────────────────────
      borderRadius: {
        none:    '0',
        sm:      '2px',
        DEFAULT: '4px',
        md:      '4px',   // classic: sharp-edged, architectural
        lg:      '6px',
        xl:      '8px',
        full:    '9999px',
      },

      // ── Shadows (warm-tinted, subtle) ────────────────────────────────────────
      boxShadow: {
        sm:      '0 1px 2px rgba(42, 37, 32, 0.08)',
        DEFAULT: '0 2px 4px rgba(42, 37, 32, 0.10)',
        md:      '0 4px 12px rgba(42, 37, 32, 0.10)',
        lg:      '0 8px 24px rgba(42, 37, 32, 0.12)',
        xl:      '0 16px 48px rgba(42, 37, 32, 0.14)',
        cognac:  '0 4px 20px rgba(184, 116, 46, 0.25)',
        inset:   'inset 0 1px 3px rgba(42, 37, 32, 0.08)',
      },

      // ── Animation ────────────────────────────────────────────────────────────
      transitionDuration: {
        fast:    '150ms',
        DEFAULT: '250ms',
        slow:    '350ms',
        slower:  '500ms',
      },
      transitionTimingFunction: {
        DEFAULT:  'ease',
        in:       'ease-in',
        out:      'ease-out',
        'in-out': 'ease-in-out',
        spring:   'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      animation: {
        'fade-in':   'fadeIn 0.5s ease-out forwards',
        'slide-up':  'slideUp 0.4s ease-out forwards',
        'scale-in':  'scaleIn 0.3s ease-out forwards',
        'float':     'float 8s ease-in-out infinite',
        'pulse-soft':'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:   { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        scaleIn:   { '0%': { opacity: '0', transform: 'scale(0.97)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        float:     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        pulseSoft: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.65' } },
      },

      // ── Breakpoints ──────────────────────────────────────────────────────────
      screens: {
        xs:  '480px',
        sm:  '640px',
        md:  '768px',
        lg:  '1024px',
        xl:  '1280px',
        '2xl':'1536px',
      },

      // ── Z-index ──────────────────────────────────────────────────────────────
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
