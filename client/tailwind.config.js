module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'roboto': 'Roboto',
        'mont':'Montserrat',
        'lato': 'Lato'
      },
      screens: {
        'mobile' : {'max': '639px'}
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
