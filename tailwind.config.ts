import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						maxWidth: 'var(--typingarea-max-width)',
						p: {
							marginTop: '0.5rem',
							marginBottom: '0.5rem',
							'&:first-child': {
								marginTop: 0,
							},
							'& + :where(ol, ul)': {
								marginTop: 0,
							},
						},
						h1: {
							fontWeight: 700,
							letterSpacing: '-0.04rem',
							'&:first-child': {
								marginTop: 0,
							},
						},
						h2: {
							fontWeight: 600,
							marginTop: '2rem',
							marginBottom: '1rem',
							'&:first-child': {
								marginTop: 0,
							},
						},
						'h3, h4': {
							fontWeight: 600,
							marginTop: '1rem',
							marginBottom: '0.5rem',
							'&:first-child': {
								marginTop: 0,
							},
						},
						h5: {
							fontWeight: 600,
							'&:first-child': {
								marginTop: 0,
							},
						},
						'ol, ul': {
							'& > li': {
								'& > :last-child': {
									marginBottom: 0,
								},
								'& > :first-child': {
									marginTop: 0,
									marginBottom: 0,
								},
							},
						},
						blockquote: {
							borderLeftWidth: '2px',
							borderColor: 'rgb(155 155 155)',
							paddingLeft: '1rem',
							margin: 0,
							paddingTop: '0.5rem',
							paddingBottom: '0.5rem',
							lineHeight: '1.5rem',
							'& p': {
								margin: 0,
								'&:after, &:before': {
									display: 'none',
								},
							},
						},
						table: {
							width: '100%',
							marginTop: '0.25rem',
							marginBottom: '0.25rem',
							borderSpacing: 0,
							borderCollapse: 'separate',
						},
						th: {
							borderWidth: '1px',
							borderBottomWidth: '1px',
							padding: '0.25rem 0.75rem',
							'&:first-child': {
								borderTopLeftRadius: '0.375rem',
							},
							'&:last-child': {
								borderTopRightRadius: '0.375rem',
							},
						},
						td: {
							borderBottomWidth: '1px',
							borderLeftWidth: '1px',
							padding: '0.25rem 0.75rem',
							'&:last-child': {
								borderRightWidth: '1px',
							},
						},
						'tbody tr:last-child td': {
							'&:first-child': {
								borderBottomLeftRadius: '0.375rem',
							},
							'&:last-child': {
								borderBottomRightRadius: '0.375rem',
							},
						},
						a: {
							fontWeight: 400,
							textDecoration: 'none',
						},
						pre: {
							marginTop: '0.5rem',
						},
					},
				},
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
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
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		}
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
