/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    fontFamily: {
      sans: [
        "Inter var, sans-serif",
        {
          fontFeatureSettings: '"zero", "lnum" on, "pnum" on',
        },
      ],
    },
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
    },
  },
  plugins: [],
};
