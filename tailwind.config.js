/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        purchase: "1fr 3fr 1fr 1fr",
      },
    },
  },
  plugins: [],
};
