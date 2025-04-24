/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'red': {
          400: '#F87171',
          900: '#7C2D12',
          800: '#991B1B',
        },
      },
      backgroundImage: {
        'tribal-pattern': "url('path-to-pattern.png')",
      },
    },
  },
  plugins: [],
};