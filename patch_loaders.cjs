const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

const renderExpOrig = `function renderExperience() {
  const container = document.getElementById('experience-container');
  if (!container) return;
  
  let html = '';
  EXPERIENCES.forEach((exp, index) => {`;

const renderExpNew = `function renderExperience() {
  const container = document.getElementById('experience-container');
  if (!container) return;
  
  // Simulate data fetching to show skeleton
  setTimeout(() => {
    let html = '';
    EXPERIENCES.forEach((exp, index) => {`;

const renderExpOrigEnd = `  container.innerHTML = html;
}`;

const renderExpNewEnd = `    container.innerHTML = html;
  }, 1500);
}`;

js = js.replace(renderExpOrig, renderExpNew);
js = js.replace(renderExpOrigEnd, renderExpNewEnd);

const renderCertOrig = `function renderCertificates() {
  const container = document.getElementById('certificates-grid');
  if (!container) return;
  
  let html = '';
  CERTIFICATES.forEach((cert, index) => {`;

const renderCertNew = `function renderCertificates() {
  const container = document.getElementById('certificates-grid');
  if (!container) return;
  
  // Simulate data fetching to show skeleton
  setTimeout(() => {
    let html = '';
    CERTIFICATES.forEach((cert, index) => {`;

const renderCertOrigEnd = `  container.innerHTML = html;
}`;

const renderCertNewEnd = `    container.innerHTML = html;
  }, 1500);
}`;

js = js.replace(renderCertOrig, renderCertNew);
js = js.replace(renderCertOrigEnd, renderCertNewEnd);

fs.writeFileSync('src/main.js', js);
