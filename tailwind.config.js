module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'reguler': ['Menlo', 'Monaco, Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono',
        'Bitstream Vera Sans Mono', 'Courier New', 'monospace']
    },
    extend: {
      backgroundImage: theme => ({})
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
