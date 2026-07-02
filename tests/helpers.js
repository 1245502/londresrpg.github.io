const fs = require('fs');
const path = require('path');

/**
 * Loads the HTML file and returns a parsed document via jsdom.
 */
function loadHTML() {
  const htmlPath = path.resolve(__dirname, '..', 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf-8');
  document.documentElement.innerHTML = '';
  document.write(html);
  document.close();
  return document;
}

/**
 * Loads and returns the raw CSS content.
 */
function loadCSS() {
  const cssPath = path.resolve(__dirname, '..', 'style.css');
  return fs.readFileSync(cssPath, 'utf-8');
}

/**
 * Checks if a file exists relative to the project root.
 */
function fileExists(relativePath) {
  const fullPath = path.resolve(__dirname, '..', relativePath);
  return fs.existsSync(fullPath);
}

module.exports = { loadHTML, loadCSS, fileExists };
