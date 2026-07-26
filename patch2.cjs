const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

const loaderLogic = `
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('opacity-0', '-translate-y-4');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 700);
    }, 500); // Small delay to let animations start
  }
});

`;

js = js.replace("document.addEventListener('DOMContentLoaded', () => {", loaderLogic + "document.addEventListener('DOMContentLoaded', () => {");
fs.writeFileSync('src/main.js', js);
