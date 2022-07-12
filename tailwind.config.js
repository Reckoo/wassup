/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [ './pages/**/*.{js,ts,jsx,tsx}',
  './Components/**/*.{js,ts,jsx,tsx}',
  './src/**/*.{js,ts,jsx,tsx}',
  './pages/**/*.js',
  './components/**/*.js'],
  theme: {
    extend: {},
  },
  plugins: [],
}

