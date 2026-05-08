/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'luxury-black': '#0a0a0a',
        'luxury-dark': '#1a1a1a',
        'luxury-gray': '#2a2a2a',
        'neon-cyan': '#00f0ff',
        'neon-pink': '#ff006e',
        'neon-purple': '#b537f2',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 240, 255, 0.5)',
        'neon-pink': '0 0 20px rgba(255, 0, 110, 0.5)',
        'luxury': '0 8px 32px rgba(0, 0, 0, 0.8)',
      },
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
        'gradient-neon': 'linear-gradient(135deg, #00f0ff 0%, #b537f2 100%)',
      },
    },
  },
  plugins: [],
}
