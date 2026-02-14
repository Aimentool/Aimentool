/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				// Pontos színek a logó alapján
				primary: '#66E6C1',     // Ragyogó menta
				secondary: '#124E58',   // Mély teal/cián
				dark: '#050B10',        // Sötét űr-fekete
				light: '#FFFFFF',       // Hófehér
				muted: '#81A1A6',       // Kékes-szürke szöveg
			},
		},
	},
	plugins: [],
}