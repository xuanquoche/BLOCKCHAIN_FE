import type { Config } from 'tailwindcss';

const config = {
    content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            backgroundImage: {
                'water-mark': "url('/water-mark.svg')"
            },
            fontFamily: {
                roboto: ['Roboto', 'Arial', 'sans-serif']
            },
            height: { headerHeight: 'var(--header-height)' },
            margin: { headerHeight: 'var(--header-height)' },
            colors: {
                
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'fade-in': {
                    from: { opacity: '0' },
                    to: { opacity: '1' }
                },
                progress: {
                    '0%': { transform: ' translateX(0) scaleX(0)' },
                    '40%': { transform: 'translateX(0) scaleX(0.4)' },
                    '100%': { transform: 'translateX(100%) scaleX(0.5)' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fade-in 0.25s ease-out',
                progress: 'progress 1s infinite linear'
            },
            spacing: {
                header: 'var(--header-height)'
            },
            transformOrigin: {
                'left-right': '0% 50%'
            },
            screens: {
                '1576': '1576px',
                '1901': '1901px',
                '2228': '2228px',
                '1400': '1400px',
                '528': '528px'
            }
        }
    },
    plugins: [require('tailwindcss-animate')]
} satisfies Config;

export default config;