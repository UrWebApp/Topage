/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ // 注意：新版 Tailwind 建議用 content 取代 purge
    "./projects/ssg-site/src/**/*.{html,ts}",
    "./projects/ssg-site/src/**/*.scss"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 原有的變數
        'bg-default': 'var(--bg-default)',
        'bg-subtle': 'var(--bg-subtle)',
        'bg-card': 'var(--bg-card)',
        'border-default': 'var(--border-default)',
        'text-main': 'var(--text-main)',
        'text-muted': 'var(--text-muted)',
        'brand-primary': 'var(--brand-primary)',
        'brand-primary-hover': 'var(--brand-primary-hover)',

        // ✅ [新增] 這裡補上你在 HTML 中用到的北歐配色
        'nordic-dark': '#1a1a1a',      // 深色背景 (用於作品集區塊)
        'nordic-gray': '#f4f4f0',      // 淺米色/燕麥色
        'nordic-accent': '#5d7052',    // 鼠尾草綠 (用於 Selected Works 小標)
      },
      fontFamily: {
        'serif': ['Newsreader', 'serif'],
        'sans': ['"Noto Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // 確保之後文章排版會用到
  ],
}
