const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  prefix: '',
  purge: {
    content: ['./src/**/*.{html,ts}'],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['BasisGrotesque', ...defaultTheme.fontFamily.sans],
        dutti: ['FontDutti'],
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
