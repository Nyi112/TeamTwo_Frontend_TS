/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
  content: [
    "./index.html", // include your main HTML entry
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
