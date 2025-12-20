/** @type {import('tailwindcss').Config} */
export default {
  important: true, // Adds !important to all classes
  content: [
    "./src/**/*.{html,ts}",
    "./assets/scss/**/*.scss",
  ],  
  theme: {
    screens: {
      xxl: { max: "1399px" },
      xl: { max: "1199px" },
      lg: { max: "991px" },
      md: { max: "767px" },
      sm: { max: "575px" },
    },
    extend: {},
  },
  plugins: [],
};
