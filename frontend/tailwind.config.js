/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'paper': '#f6f3ee',        // fondo
        'stone': '#e9e3d9',        // fondo alterno
        'ink': '#1d1d1b',          // texto
        'ink-soft': '#6b675f',
        'pine': '#2f4a3a',         // acento principal
        'pine-dark': '#223a2c',
        'clay': '#c0603a',         // acento secundario (ofertas)
      },
      fontFamily: {
        'display': ['"Bodoni Moda"', 'Georgia', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
