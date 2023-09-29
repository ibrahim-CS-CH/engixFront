/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      "real":["Raleway","sans-serif"],
      'custom': ["Poppins", "sans-serif"],
      "new":["Poppins"],
      "reNew":["Cookie", "cursive"],
      "italic": ["Italianno", "cursive"]

    },
    extend: {
      keyframes: {
        move: {
          '0%': { translate: 1850 },
          '100%': { translate: -1200 },
        }
      }
      
    },
  },
  plugins: [],
}
