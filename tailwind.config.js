import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
    // './node_modules/@nextui-org/theme/dist/components/(accordion|avatar|button|card|checkbox|chip|code|date-picker|dropdown|input|kbd|link|listbox|modal|navbar|pagination|popover|skeleton|snippet|toggle|tabs|divider|ripple|spinner|calendar|date-input|menu).js'
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '868px',
      'lg': '1124px',
      'xl': '1380px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        'sm': '640px',
        'md': '868px',
        'lg': '1124px',
        'xl': '1380px',
        '2xl': '1536px',
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        // mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
