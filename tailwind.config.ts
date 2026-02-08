import type { Config } from "tailwindcss";

export default {
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Adious AI Custom Colors
				navy: {
					DEFAULT: '#252F5B',
					50: '#E6E8F0',
					100: '#CCD1E1',
					200: '#99A3C3',
					300: '#6675A5',
					400: '#334787',
					500: '#252F5B',
					600: '#1E2549',
					700: '#171C37',
					800: '#101225',
					900: '#090913'
				},
				gold: {
					DEFAULT: '#F9B015',
					50: '#FEF7E6',
					100: '#FDEFCD',
					200: '#FBDF9B',
					300: '#F9CF69',
					400: '#F7BF37',
					500: '#F9B015',
					600: '#C78D11',
					700: '#956A0D',
					800: '#634708',
					900: '#312304'
				},
				cloud: {
					DEFAULT: '#F1F4F4',
					50: '#FFFFFF',
					100: '#FDFDFD',
					200: '#F9FAFA',
					300: '#F5F7F7',
					400: '#F1F4F4',
					500: '#E4E9E9',
					600: '#D7DEDE',
					700: '#CAD3D3',
					800: '#BDC8C8',
					900: '#B0BDBD'
				}
			},
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
				'outfit': ['Outfit', 'sans-serif'],
				'sans': ['Inter', 'sans-serif'],
			},
			fontSize: {
				'h1': ['3rem', { lineHeight: '1.2', fontWeight: '700' }], // 48px
				'h2': ['2.25rem', { lineHeight: '1.3', fontWeight: '700' }], // 36px
				'h3': ['1.75rem', { lineHeight: '1.4', fontWeight: '600' }], // 28px
				'body': ['1rem', { lineHeight: '1.5', fontWeight: '400' }], // 16px
				'caption': ['0.875rem', { lineHeight: '1.4', fontWeight: '400' }], // 14px
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					from: {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;