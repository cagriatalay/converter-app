/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
			fontFamily: {
          'manrope': ['"Inter"', '"sans-serif"'],
      },
		},
    screens: {
      '2xl': {'max': '1535px'},
      'xl': {'max': '1279px'},
      'lg': {'max': '1023px'},
      'md': {'max': '767px'},
      'sm': {'max': '630px'},
      'xs': {'max': '400px'},
      'xxs': {'max': '300px'},
      'sm_h': {'raw': '(max-height: 720px)'},
      'xs_h': {'raw': '(max-height: 500px)'}
    },
	},
  plugins: [],
}
