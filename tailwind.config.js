/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode via adding 'dark' class to <html> or <body>
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // adjust to your source files location
    "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

