const colors = require('tailwindcss/colors')
module.exports = {
    mode: 'jit',
    purge: [
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.vue',
        './resources/**/*.jsx',
        './resources/**/*.tsx',
        './storage/framework/views/*.php',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                yellow: colors.yellow,
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
