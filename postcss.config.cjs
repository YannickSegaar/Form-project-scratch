const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssNesting = require('postcss-nesting');

const config = {
    plugins: [
        // Include postcss-nesting before Tailwind CSS for nesting support
        postcssNesting(),
        // Other plugins like autoprefixer can follow after
        autoprefixer(),
        tailwindcss(),
    ],
};

module.exports = config;
