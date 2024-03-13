// YRS: Dit is een nieuwe file aangemaakt nadat Skeleton docs stappen zijn gevolgd:

import { join } from 'path';
import type { Config } from 'tailwindcss';
import { myCustomTheme } from './my-custom-theme'

import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';

const config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {}
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				custom: [myCustomTheme],
				preset: [{ name: 'skeleton', enhancements: true }]
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
