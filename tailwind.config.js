/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        ellipse: 'dotty steps(1,end) 1s infinite',
      },
      keyframes: {
        dotty: {
          '0%': { content: "''" },
          '25%': { content: "'.'" },
          '50%': { content: "'..'" },
          '75%': { content: "'...'" },
          '100%': { content: "''" },
        },
      },
      borderRadius: {
        sm: '5px',
      },
      width: {
        '40px': '40px',
      },
      fontFamily: {
        sans: ['Inter, sans-serif', { fontFeatureSettings: '"zero", "lnum", "pnum"' }],
      },
      colors: {
        'gray-primary': '#031016',
        'gray-secondary': '#0F1C22',
        'gray-tertiary': '#09161C',
        'green-primary': '#2E8C87',
      },
    },
    plugins: [],
  },
};
