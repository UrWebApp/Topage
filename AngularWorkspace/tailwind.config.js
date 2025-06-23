/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    enabled: true,
    content: [
      "./projects/ssg-site/src/**/*.{html,ts}",
      "./projects/ssg-site/src/**/*.scss"],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // 讓 Tailwind 能夠識別我們的 CSS 變數
        'bg-default': 'var(--bg-default)',
        'bg-subtle': 'var(--bg-subtle)',
        'bg-card': 'var(--bg-card)',
        'border-default': 'var(--border-default)',
        'text-main': 'var(--text-main)',
        'text-muted': 'var(--text-muted)',
        'brand-primary': 'var(--brand-primary)',
        'brand-primary-hover': 'var(--brand-primary-hover)',
      },
      fontFamily: {
        // 保持你優雅的字體選擇
        'serif': ['Newsreader', 'serif'],
        'sans': ['"Noto Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

