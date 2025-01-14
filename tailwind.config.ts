import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        // design colors

        // main colors
        beige500: '#98928B',
        beige100: '#F8F4F0',
        grey900: '#201F24',
        grey500: '#696868',
        grey300: '#B3B3B3',
        grey100: '#F2F3F7',

        // secondary colors
        green: '#277C78',
        yellow: '#F2CDAC',
        cyan: '#82C9D7',
        navy: '#626070',
        red: '#C94736',
        purple: '#826CB0',

        // accent colors
        purple2: '#AF81BA',
        turquoise: '#597C7C',
        brown: '#93674F',
        magenta: '#934F6F',
        blue: '#3F82B2',
        navyGrey: '#97A0AC',
        armyGreen: '#7F9161',
        gold: '#CAB361',
        orange: '#BE6C49',
      },
      borderRadius: {
        xl: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontSize: {
        'preset-1': [
          '32px',
          {
            lineHeight: '120%',
            letterSpacing: '0px',
            fontWeight: '700',
          },
        ],
        'preset-2': [
          '20px',
          {
            lineHeight: '120%',
            letterSpacing: '0px',
            fontWeight: '700',
          },
        ],
        'preset-3': [
          '16px',
          {
            lineHeight: '150%',
            letterSpacing: '0px',
            fontWeight: '700',
          },
        ],
        'preset-4': [
          '14px',
          {
            lineHeight: '150%',
            letterSpacing: '0px',
          },
        ],
        'preset-5': [
          '12px',
          {
            lineHeight: '150%',
            letterSpacing: '0px',
          },
        ],
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
