module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mobile' : {'max': '639px'}
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
