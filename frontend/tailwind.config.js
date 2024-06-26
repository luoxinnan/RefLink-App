/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  plugins: [require("daisyui"), require("tailwindcss-animated")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "corporate", "lofi"],
  },
}