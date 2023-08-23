/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1660px'
      },
      
      animation: {
        fade: 'fadeout .5s ease-in-out',
        in: 'translateIn .5s ease-in-out',
      },
      keyframes: theme => ({
        fadeout: {
          '0%': {opacity: .0},
          '50%': {opacity: .5},
          '100%': {opacity: 1},
        },

        translateIn: {
          '0%': { width : 'fit', transform: 'translateY(-100%)'},
          '100%': { width : 'fit', transform: 'translateY(0%)'},
        }
      })
    },
  },
  plugins: [],
}
