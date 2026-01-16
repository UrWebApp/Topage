import { copyFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const distDir = 'dist/ssg-site/browser';
const indexCsr = join(distDir, 'index.csr.html');
const notFound = join(distDir, '404.html');
const indexRoot = join(distDir, 'index.html');

console.log('Running post-build script for GitHub Pages...');

try {
  // 1. Copy index.csr.html to 404.html
  copyFileSync(indexCsr, notFound);
  console.log('✅ Copied index.csr.html to 404.html');

  // 2. Create root index.html with language detection
  const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Redirecting...</title>
  <script>
    (function() {
      var lang = navigator.language || navigator.userLanguage;
      var target = '/en/'; // Default to English

      if (lang.match(/^zh/i)) { // Matches zh-CN, zh-TW, zh-HK, etc.
        target = '/zh-tw/';
      } else if (lang.match(/^ja/i)) {
        target = '/jp/';
      }
      
      // Preserve query params and hash
      window.location.href = target + window.location.search + window.location.hash;
    })();
  </script>
  <noscript>
    <meta http-equiv="refresh" content="0;url=/en/">
  </noscript>
</head>
<body>
  <p>Redirecting based on your browser language...</p>
  <ul>
    <li><a href="/en/">English</a></li>
    <li><a href="/zh-tw/">繁體中文</a></li>
    <li><a href="/jp/">日本語</a></li>
  </ul>
</body>
</html>`;
  
  writeFileSync(indexRoot, redirectHtml);
  console.log('✅ Created root index.html with redirect to /zh-tw/');

} catch (err) {
  console.error('❌ Error in post-build script:', err);
  process.exit(1);
}
