/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'], // <-- MINDEN fájlt figyeljen
	theme: {
		extend: {
			// ITT KÖTJÜK ÖSSZE A JSON-T A TAILWINDDEL
			colors: {
				primary: 'var(--primary)',      // Mostantól használhatod: bg-primary
				secondary: 'var(--secondary)',  // bg-secondary
				bg: 'var(--bg)',                // bg-bg
				text: 'var(--text)',            // text-text
			},
			fontFamily: {
				heading: ['var(--font-heading)', 'sans-serif'], // font-heading
				body: ['var(--font-body)', 'sans-serif'],       // font-body
			}
		},
	},
	plugins: [],
}