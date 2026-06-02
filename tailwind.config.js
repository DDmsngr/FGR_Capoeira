/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brazil: {
          green: '#009C3B',
          yellow: '#FFDF00',
          blue: '#002776',
          'green-dark': '#006400',
          gold: '#FFD700',
          dark: '#0f0f0f',
        },
        fgr: {
          primary: '#009C3B',
          secondary: '#FFDF00',
          accent: '#FFD700',
          dark: '#0f0f0f',
          light: '#f8f9fa',
        }
      },
      fontFamily: {
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'swing': 'swing 2s ease-in-out infinite',
        'blob-1': 'blob-drift-1 18s ease-in-out infinite',
        'blob-2': 'blob-drift-2 24s ease-in-out infinite',
        'blob-3': 'blob-drift-3 30s ease-in-out infinite',
        'gradient-border': 'gradient-shift 4s ease infinite',
        'glow': 'glow-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        swing: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
