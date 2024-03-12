// YRS: Dit is een nieuwe file aangemaakt nadat Skeleton docs stappen zijn gevolgd:

import { join } from 'path';
import { myCustomTheme } from './my-custom-theme'; // YRS: Import custom theme (theme.ts
import type { Config } from 'tailwindcss';

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';

const config = {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],
	theme: {
		extend: {},
	},
	plugins: [
		skeleton({
			themes: {
				custom: [
					myCustomTheme
				]
			}
		})
	]
} satisfies Config;

export default config;
						

// YRS: Hieronder stond de basis code die nadat Skeleton packages waren geinstalleerd zijn gevormd (toen heette deze file nog tailwind.config.cjs)

// /** @type {import('tailwindcss').Config}*/
// /** @type {import('tailwindcss').Config}*/
// const config = {
// 	content: ['./src/**/*.{html,js,svelte,ts}'],

// 	theme: {
// 		extend: {}
// 	},

// 	plugins: []
// };

// module.exports = config;
