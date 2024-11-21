/** @type {import('tailwindcss').Config} */
module.exports = {
  /* couldn't make tailwind work and the issue was b/c the content path was 
  wrong, I originally had it as ./vekt/client/component, can just be ./client*/
  content: ['./client/**/*.{js,jsx,html}'],
  theme: {
    extend: {
      colors: {
        'custom-tan': '#dad7cd',
        'pastel-green': '#a3b18a',
        'forest-green':'#588157',
        'darker-green':'#3a5a40',
        'darkest-green':'#344e41',
      },
    },
  },
  plugins: [],
}

