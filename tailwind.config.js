/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#50A",
        "grey-header": "#9AB",
        "grey-body": "#678",
        "grey-line": "#456",
      },
      screens: {
        xs: "360px",
      },
    },
  },
  plugins: [],
};
