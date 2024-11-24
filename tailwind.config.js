/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        1440: "1440px",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
