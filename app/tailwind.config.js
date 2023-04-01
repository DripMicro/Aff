const { fontFamily } = require("tailwindcss/defaultTheme");
const { colors: defaultColors } = require('tailwindcss/defaultTheme');

const colors = {
  ...defaultColors,
  ...{
    primary: "#2262C6",
    azure: "#1B48BB",
    white: "#fff",
    secondary: "#EFEEFF"
  },
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    colors: colors
  },
  // @ts-ignore
  plugins: [require("tailwindcss-animate")],
};
