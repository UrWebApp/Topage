/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    enabled: true,
    content: [
      "./projects/ssg-site/src/**/*.{html,ts}",
      "./projects/ssg-site/src/**/*.scss"],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  plugins: [],
}

