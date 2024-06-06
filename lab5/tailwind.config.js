/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-dark": "#50614a",
        "primary-light": "#c4e641",
        neutral: "#e6e9d8",
        hover: "#668000",
        white: "#ffffff",
      },
      borderRadius: {
        large: "64px",
        medium: "32px",
        small: "16px",
      },
      fontSize: {
        "title-large": "72px",
        "title-medium": "32px",
        "copy-large": "18px",
        "copy-small": "16px",
      },
      fontFamily: {
        title: ["Italiana", "sans-serif"],
        body: ["Roboto Flex", "sans-serif"],
      },
      transitionProperty: {
        default: "all",
      },
      transitionDuration: {
        default: "300ms",
      },
      transitionTimingFunction: {
        default: "ease-in-out",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
