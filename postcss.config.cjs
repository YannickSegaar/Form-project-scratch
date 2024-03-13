require('ts-node').register();

const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssNesting = require('postcss-nesting');

const config = {
    plugins: [
        // Include postcss-nesting before Tailwind CSS for nesting support
        postcssNesting(),
        // Other plugins like autoprefixer can follow after
        autoprefixer(),
        tailwindcss('./tailwind.config.ts'),
    ],
};

module.exports = config;

// YRS: Hieronder staat de juiste code voor styling met postccs.config.cjs (voordat Skeleton custom theme wordt toegepast)
// const tailwindcss = require('tailwindcss');
// const autoprefixer = require('autoprefixer');
// const postcssNesting = require('postcss-nesting');

// const config = {
//     plugins: [
//         // Include postcss-nesting before Tailwind CSS for nesting support
//         postcssNesting(),
//         // Other plugins like autoprefixer can follow after
//         autoprefixer(),
//         tailwindcss(),
//     ],
// };

// module.exports = config;
