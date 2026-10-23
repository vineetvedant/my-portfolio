const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');

// Recreate dist directory
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

function copyRecursive(src, dest) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const child of fs.readdirSync(src)) {
      copyRecursive(path.join(src, child), path.join(dest, child));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

const itemsToCopy = [
  'index.html',
  'styles.css',
  'script.js',
  '404.html',
  'robots.txt',
  'sitemap.xml',
  'github-data.json',
  'assets',
  'projects',
  '_headers',
  'mixkit-select-click-1109.wav',
  'mixkit-ending-wind-swoosh-1482.wav',
  'llms.txt',
  'llms-full.txt'
];

for (const item of itemsToCopy) {
  const srcPath = path.join(__dirname, item);
  const destPath = path.join(distDir, item);
  if (fs.existsSync(srcPath)) {
    copyRecursive(srcPath, destPath);
  }
}

console.log('Build completed: Static site successfully assembled into dist/');
