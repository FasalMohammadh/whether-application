/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        mont: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'bg-start': '#2a32b2',
        'bg-end': '#1b5ec2',
        'card-blue': '#0d2756',
      },
    },
  },
  plugins: [],
};
