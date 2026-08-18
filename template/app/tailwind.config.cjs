/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          darkPrimary: "#0B5FA5",
          darkSecondary: "#2E3138",
          darkAccent: "#FF6B35",
          darkAlert: "#E63946",
          lightPrimary: "#1D3557",
          lightSecondary: "#F4A261",
          lightAccent: "#E63946",
          lightAlert: "#E07A5F",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "0.75rem",
      },
    },
  },
  plugins: [],
};
