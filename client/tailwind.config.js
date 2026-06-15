/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        amber: {
          accent: '#D89B3F',
          light: '#E8B86D',
          dark: '#B8801F',
        },
        charcoal: {
          DEFAULT: '#2B2D3A',
          light: '#3A3D4E',
          dark: '#1E2030',
        },
        offwhite: '#F4F4F2',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
