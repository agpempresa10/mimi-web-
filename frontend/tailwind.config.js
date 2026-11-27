/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'paper': '#fdf7f5',        // fondo (blanco rosado)
        'stone': '#f6e6e6',        // fondo alterno (rosa empolvado)
        'ink': '#3a2a2e',          // texto
        'ink-soft': '#7a6468',
        'pine': '#c2577a',         // acento principal (rosa MiMi)
        'pine-dark': '#a1405f',
        'clay': '#d9466a',         // ofertas
        'sage': '#8f9c7f',         // verde suave (flores)
      },
      fontFamily: {
        'display': ['"Playfair Display"', 'Georgia', 'serif'],
        'script': ['"Dancing Script"', 'cursive'],
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
