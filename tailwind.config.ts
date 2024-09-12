import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    fontSize: {
      xs: ['0.8rem', { lineHeight: '1.375' }],
      sm: ['0.9rem', { lineHeight: '1.375' }],
      base: ['1rem', { lineHeight: '1.375' }],
      lg: ['1.25rem', { lineHeight: '1.25' }],
      xl: ['1.563rem', { lineHeight: '1.15' }],
      '2xl': ['1.953rem', { lineHeight: '1.15' }],
      '3xl': ['2.441rem', { lineHeight: '1.125' }],
      '4xl': ['3.052rem', { lineHeight: '1.125' }],
      '5xl': ['3.815rem', { lineHeight: '1.125' }],
    },
    extend: {
      fontFamily: {
        poppins: 'var(--font-poppins)',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        storefront: {
          background: '#1F1F1F',
          text: '#F8F8FF',
          primary: {
            DEFAULT: '#4c4c4c',
            '50': '#f6f6f6',
            '100': '#e7e7e7',
            '200': '#d1d1d1',
            '300': '#b0b0b0',
            '400': '#888888',
            '500': '#6d6d6d',
            '600': '#5d5d5d',
            '700': '#4c4c4c',
            '800': '#454545',
            '900': '#3d3d3d',
            '950': '#262626',
          },
          secondary: '#353535',
          accent: {
            DEFAULT: '#e85c21',
            '50': '#fef5ee',
            '100': '#fce9d8',
            '200': '#f8cfb0',
            '300': '#f3ad7e',
            '400': '#ed814a',
            '500': '#e85c21',
            '600': '#da471c',
            '700': '#b53519',
            '800': '#902c1c',
            '900': '#74271a',
            '950': '#3f100b',
          },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        marquee: {
          to: {
            transform: 'translateX(-50%)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        marquee: 'marquee var(--duration, 30s) linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
