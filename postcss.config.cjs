const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssNesting = require('postcss-nesting');

const config = {
	plugins: [// Include postcss-nesting before Tailwind CSS for nesting support
    postcssNesting, // Other plugins like autoprefixer can follow after
    tailwindcss(), //Some plugins, like tailwindcss/nesting, need to run before Tailwind, tailwindcss(), //But others, like autoprefixer, need to run after, autoprefixer, autoprefixer]
};

module.exports = config;
