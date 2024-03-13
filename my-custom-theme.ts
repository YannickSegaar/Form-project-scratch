
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
    name: 'my-custom-theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `system-ui`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "9999px",
		"--theme-rounded-container": "12px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "255 255 255",
		"--on-secondary": "0 0 0",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "255 255 255",
		"--on-error": "255 255 255",
		"--on-surface": "0 0 0",
		// =~= Theme Colors  =~=
		// primary | #015257 
		"--color-primary-50": "217 229 230", // #d9e5e6
		"--color-primary-100": "204 220 221", // #ccdcdd
		"--color-primary-200": "192 212 213", // #c0d4d5
		"--color-primary-300": "153 186 188", // #99babc
		"--color-primary-400": "77 134 137", // #4d8689
		"--color-primary-500": "1 82 87", // #015257
		"--color-primary-600": "1 74 78", // #014a4e
		"--color-primary-700": "1 62 65", // #013e41
		"--color-primary-800": "1 49 52", // #013134
		"--color-primary-900": "0 40 43", // #00282b
		// secondary | #75c8d8 
		"--color-secondary-50": "234 247 249", // #eaf7f9
		"--color-secondary-100": "227 244 247", // #e3f4f7
		"--color-secondary-200": "221 241 245", // #ddf1f5
		"--color-secondary-300": "200 233 239", // #c8e9ef
		"--color-secondary-400": "158 217 228", // #9ed9e4
		"--color-secondary-500": "117 200 216", // #75c8d8
		"--color-secondary-600": "105 180 194", // #69b4c2
		"--color-secondary-700": "88 150 162", // #5896a2
		"--color-secondary-800": "70 120 130", // #467882
		"--color-secondary-900": "57 98 106", // #39626a
		// tertiary | #fff59d 
		"--color-tertiary-50": "255 254 240", // #fffef0
		"--color-tertiary-100": "255 253 235", // #fffdeb
		"--color-tertiary-200": "255 253 231", // #fffde7
		"--color-tertiary-300": "255 251 216", // #fffbd8
		"--color-tertiary-400": "255 248 186", // #fff8ba
		"--color-tertiary-500": "255 245 157", // #fff59d
		"--color-tertiary-600": "230 221 141", // #e6dd8d
		"--color-tertiary-700": "191 184 118", // #bfb876
		"--color-tertiary-800": "153 147 94", // #99935e
		"--color-tertiary-900": "125 120 77", // #7d784d
		// success | #52b788 
		"--color-success-50": "229 244 237", // #e5f4ed
		"--color-success-100": "220 241 231", // #dcf1e7
		"--color-success-200": "212 237 225", // #d4ede1
		"--color-success-300": "186 226 207", // #bae2cf
		"--color-success-400": "134 205 172", // #86cdac
		"--color-success-500": "82 183 136", // #52b788
		"--color-success-600": "74 165 122", // #4aa57a
		"--color-success-700": "62 137 102", // #3e8966
		"--color-success-800": "49 110 82", // #316e52
		"--color-success-900": "40 90 67", // #285a43
		// warning | #d62828 
		"--color-warning-50": "249 223 223", // #f9dfdf
		"--color-warning-100": "247 212 212", // #f7d4d4
		"--color-warning-200": "245 201 201", // #f5c9c9
		"--color-warning-300": "239 169 169", // #efa9a9
		"--color-warning-400": "226 105 105", // #e26969
		"--color-warning-500": "214 40 40", // #d62828
		"--color-warning-600": "193 36 36", // #c12424
		"--color-warning-700": "161 30 30", // #a11e1e
		"--color-warning-800": "128 24 24", // #801818
		"--color-warning-900": "105 20 20", // #691414
		// error | #d62828 
		"--color-error-50": "249 223 223", // #f9dfdf
		"--color-error-100": "247 212 212", // #f7d4d4
		"--color-error-200": "245 201 201", // #f5c9c9
		"--color-error-300": "239 169 169", // #efa9a9
		"--color-error-400": "226 105 105", // #e26969
		"--color-error-500": "214 40 40", // #d62828
		"--color-error-600": "193 36 36", // #c12424
		"--color-error-700": "161 30 30", // #a11e1e
		"--color-error-800": "128 24 24", // #801818
		"--color-error-900": "105 20 20", // #691414
		// surface | #e9ecef 
		"--color-surface-50": "252 252 253", // #fcfcfd
		"--color-surface-100": "251 251 252", // #fbfbfc
		"--color-surface-200": "250 250 251", // #fafafb
		"--color-surface-300": "246 247 249", // #f6f7f9
		"--color-surface-400": "240 242 244", // #f0f2f4
		"--color-surface-500": "233 236 239", // #e9ecef
		"--color-surface-600": "210 212 215", // #d2d4d7
		"--color-surface-700": "175 177 179", // #afb1b3
		"--color-surface-800": "140 142 143", // #8c8e8f
		"--color-surface-900": "114 116 117", // #727475
		
	}
}