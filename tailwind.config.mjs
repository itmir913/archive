import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'PretendardVariable',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
        mono: ['"Fira Code"', 'Consolas', 'Monaco', 'PretendardVariable', 'monospace'],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            '--tw-prose-body': theme('colors.gray[900]'),
            '--tw-prose-headings': theme('colors.gray[900]'),
            '--tw-prose-links': theme('colors.blue[600]'),
            '--tw-prose-bold': theme('colors.gray[900]'),
            '--tw-prose-code': theme('colors.gray[900]'),
            '--tw-prose-pre-bg': theme('colors.gray[100]'),
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            code: {
              fontFamily: '"Fira Code", Consolas, Monaco, monospace',
              fontWeight: '400',
              fontSize: '0.875em',
              backgroundColor: theme('colors.gray[100]'),
              borderRadius: '3px',
              padding: '0.15em 0.35em',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              fontWeight: 'inherit',
              fontSize: 'inherit',
              borderRadius: '0',
            },
            pre: {
              borderRadius: '6px',
              border: `1px solid ${theme('colors.gray[200]')}`,
              fontSize: '0.875rem',
              lineHeight: '1.6',
            },
            img: {
              borderRadius: '6px',
              border: `1px solid ${theme('colors.gray[200]')}`,
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
            },
            h2: {
              borderBottom: `1px solid ${theme('colors.gray[200]')}`,
              paddingBottom: '0.4rem',
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.gray[200]'),
            '--tw-prose-headings': theme('colors.gray[100]'),
            '--tw-prose-links': theme('colors.blue[400]'),
            '--tw-prose-bold': theme('colors.gray[100]'),
            '--tw-prose-code': theme('colors.gray[100]'),
            '--tw-prose-pre-bg': theme('colors.gray[900]'),
            code: {
              backgroundColor: theme('colors.gray[800]'),
            },
            pre: {
              borderColor: theme('colors.gray[700]'),
            },
            img: {
              borderColor: theme('colors.gray[700]'),
            },
            h2: {
              borderBottomColor: theme('colors.gray[700]'),
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
