
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
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
			padding: '1rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'playfair': ['Playfair Display', 'serif'],
				'inter': ['Inter', 'sans-serif'],
				'mystical': ['Playfair Display', 'serif'],
				'whimsical': ['Inter', 'sans-serif'],
			},
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
				mystical: {
					purple: '#475569',
					'purple-light': '#64748b',
					gold: '#F59E0B',
					'gold-light': '#FCD34D',
					spark: '#FBBF24',
				}
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
				'sparkle': {
					'0%, 100%': { 
						opacity: '0.4',
						transform: 'scale(0.8) rotate(0deg)'
					},
					'50%': { 
						opacity: '1',
						transform: 'scale(1.3) rotate(180deg)'
					}
				},
				'float': {
					'0%, 100%': { 
						transform: 'translateY(0px) rotate(0deg)'
					},
					'33%': { 
						transform: 'translateY(-10px) rotate(1deg)'
					},
					'66%': { 
						transform: 'translateY(-5px) rotate(-1deg)'
					}
				},
				'glow-pulse': {
					'0%, 100%': { 
						boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)'
					},
					'50%': { 
						boxShadow: '0 0 40px rgba(245, 158, 11, 0.7)'
					}
				},
				// Sassy Cat Animations
				'sassy-entrance': {
					'0%': { opacity: '0', transform: 'scale(0.9) rotate(-5deg)' },
					'50%': { transform: 'scale(1.05) rotate(2deg)' },
					'100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' }
				},
				'sassy-thinking': {
					'0%, 100%': { transform: 'rotate(0deg)' },
					'25%': { transform: 'rotate(-2deg) scale(1.02)' },
					'75%': { transform: 'rotate(2deg) scale(1.02)' }
				},
				'sassy-responding': {
					'0%': { opacity: '0', transform: 'translateX(-10px)' },
					'100%': { opacity: '1', transform: 'translateX(0px)' }
				},
				'sassy-float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(-1deg)' },
					'50%': { transform: 'translateY(-8px) rotate(1deg)' }
				},
				'sassy-wiggle': {
					'0%, 100%': { transform: 'rotate(0deg)' },
					'25%': { transform: 'rotate(1deg)' },
					'75%': { transform: 'rotate(-1deg)' }
				},
				'sassy-bounce': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.1)' }
				},
				// Wise Owl Animations
				'wise-entrance': {
					'0%': { opacity: '0', transform: 'translateY(20px) scale(0.8)' },
					'100%': { opacity: '1', transform: 'translateY(0px) scale(1)' }
				},
				'wise-thinking': {
					'0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
					'50%': { opacity: '1', transform: 'scale(1.05)' }
				},
				'wise-responding': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'wise-float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-12px)' }
				},
				'wise-glow': {
					'0%, 100%': { boxShadow: '0 0 10px rgba(245, 158, 11, 0.3)' },
					'50%': { boxShadow: '0 0 25px rgba(245, 158, 11, 0.6)' }
				},
				'wise-pulse': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.08)' }
				},
				// Lazy Panda Animations
				'lazy-entrance': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0px)' }
				},
				'lazy-thinking': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.02)' }
				},
				'lazy-responding': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'lazy-float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-6px)' }
				},
				'lazy-sway': {
					'0%, 100%': { transform: 'rotate(0deg)' },
					'50%': { transform: 'rotate(2deg)' }
				},
				'lazy-drift': {
					'0%, 100%': { transform: 'translateX(0px)' },
					'50%': { transform: 'translateX(3px)' }
				},
				// Anxious Bunny Animations
				'anxious-entrance': {
					'0%': { opacity: '0', transform: 'translateX(-20px) scale(0.9)' },
					'50%': { transform: 'translateX(5px) scale(1.05)' },
					'100%': { opacity: '1', transform: 'translateX(0px) scale(1)' }
				},
				'anxious-thinking': {
					'0%, 100%': { transform: 'translateX(0px)' },
					'25%': { transform: 'translateX(-2px)' },
					'75%': { transform: 'translateX(2px)' }
				},
				'anxious-responding': {
					'0%': { opacity: '0', transform: 'scale(0.8)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'anxious-float': {
					'0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
					'25%': { transform: 'translateY(-5px) translateX(-2px)' },
					'75%': { transform: 'translateY(-3px) translateX(2px)' }
				},
				'anxious-jitter': {
					'0%, 100%': { transform: 'translateX(0px)' },
					'10%': { transform: 'translateX(-1px)' },
					'20%': { transform: 'translateX(1px)' },
					'30%': { transform: 'translateX(-1px)' },
					'40%': { transform: 'translateX(1px)' }
				},
				'anxious-shake': {
					'0%, 100%': { transform: 'scale(1) rotate(0deg)' },
					'25%': { transform: 'scale(1.05) rotate(1deg)' },
					'75%': { transform: 'scale(1.05) rotate(-1deg)' }
				},
				// Quirky Duck Animations
				'quirky-entrance': {
					'0%': { opacity: '0', transform: 'rotate(-10deg) scale(0.8)' },
					'50%': { transform: 'rotate(5deg) scale(1.1)' },
					'100%': { opacity: '1', transform: 'rotate(0deg) scale(1)' }
				},
				'quirky-thinking': {
					'0%, 100%': { transform: 'rotate(0deg)' },
					'33%': { transform: 'rotate(3deg)' },
					'66%': { transform: 'rotate(-3deg)' }
				},
				'quirky-responding': {
					'0%': { opacity: '0', transform: 'rotate(-5deg)' },
					'100%': { opacity: '1', transform: 'rotate(0deg)' }
				},
				'quirky-float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'33%': { transform: 'translateY(-8px) rotate(2deg)' },
					'66%': { transform: 'translateY(-4px) rotate(-2deg)' }
				},
				'quirky-spin': {
					'0%, 100%': { transform: 'rotate(0deg)' },
					'50%': { transform: 'rotate(180deg)' }
				},
				'quirky-wobble': {
					'0%, 100%': { transform: 'rotate(0deg) scale(1)' },
					'25%': { transform: 'rotate(3deg) scale(1.05)' },
					'75%': { transform: 'rotate(-3deg) scale(1.05)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'sparkle': 'sparkle 3s ease-in-out infinite',
				//'float': 'float 6s ease-in-out infinite',
				//'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				// Sassy Cat Animations
				'sassy-entrance': 'sassy-entrance 0.6s ease-out',
				'sassy-thinking': 'sassy-thinking 2s ease-in-out infinite',
				'sassy-responding': 'sassy-responding 0.4s ease-out',
				//'sassy-float': 'sassy-float 4s ease-in-out infinite',
				'sassy-wiggle': 'sassy-wiggle 0.5s ease-in-out',
				'sassy-bounce': 'sassy-bounce 0.3s ease-in-out',
				// Wise Owl Animations
				'wise-entrance': 'wise-entrance 0.8s ease-out',
				'wise-thinking': 'wise-thinking 3s ease-in-out infinite',
				'wise-responding': 'wise-responding 0.5s ease-out',
				'wise-float': 'wise-float 8s ease-in-out infinite',
				'wise-glow': 'wise-glow 2s ease-in-out infinite',
				'wise-pulse': 'wise-pulse 0.4s ease-in-out',
				// Lazy Panda Animations
				'lazy-entrance': 'lazy-entrance 1s ease-out',
				'lazy-thinking': 'lazy-thinking 4s ease-in-out infinite',
				'lazy-responding': 'lazy-responding 0.6s ease-out',
				'lazy-float': 'lazy-float 10s ease-in-out infinite',
				'lazy-sway': 'lazy-sway 3s ease-in-out infinite',
				'lazy-drift': 'lazy-drift 0.6s ease-in-out',
				// Anxious Bunny Animations
				'anxious-entrance': 'anxious-entrance 0.4s ease-out',
				'anxious-thinking': 'anxious-thinking 0.8s ease-in-out infinite',
				'anxious-responding': 'anxious-responding 0.3s ease-out',
				'anxious-float': 'anxious-float 2s ease-in-out infinite',
				'anxious-jitter': 'anxious-jitter 0.5s ease-in-out infinite',
				'anxious-shake': 'anxious-shake 0.2s ease-in-out',
				// Quirky Duck Animations
				'quirky-entrance': 'quirky-entrance 0.7s ease-out',
				'quirky-thinking': 'quirky-thinking 1.5s ease-in-out infinite',
				'quirky-responding': 'quirky-responding 0.4s ease-out',
				'quirky-float': 'quirky-float 5s ease-in-out infinite',
				'quirky-spin': 'quirky-spin 0.6s ease-in-out',
				'quirky-wobble': 'quirky-wobble 0.4s ease-in-out',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
