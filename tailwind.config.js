/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        primary: '#63CB72',
        secondary:'#B1DA7B',
        text: '#FFFFFF',
        background:'#2A2A2A',

      }
    },
  },
  plugins: [],
}