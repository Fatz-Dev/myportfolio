const fs = require('fs');

// 1. Update index.html for custom-cursor text container
let html = fs.readFileSync('index.html', 'utf8');
const oldCursorHtml = `<div id="custom-cursor" class="hidden md:block"></div>`;
const newCursorHtml = `<div id="custom-cursor" class="hidden md:flex items-center justify-center text-center">
        <span id="custom-cursor-text" class="text-[10px] font-mono font-bold tracking-wider text-terra uppercase select-none opacity-0 transition-opacity duration-200 pointer-events-none"></span>
    </div>`;

html = html.replace(oldCursorHtml, newCursorHtml);
fs.writeFileSync('index.html', html);

// 2. Update src/index.css for custom-cursor styling
let css = fs.readFileSync('src/index.css', 'utf8');
const oldCursorCss = `#custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 28px;
  height: 28px;
  border: 2px solid var(--color-ink);
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, border-radius 0.3s ease;
  animation: doodle-morph 4s linear infinite;
}

#custom-cursor.hover {
  width: 54px;
  height: 54px;
  background-color: rgba(192, 108, 82, 0.15); /* terra */
  border-color: var(--color-terra);
}`;

const newCursorCss = `#custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 28px;
  height: 28px;
  border: 2px solid var(--color-ink);
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, border-radius 0.3s ease;
  animation: doodle-morph 4s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;
}

#custom-cursor.hover {
  width: 54px;
  height: 54px;
  background-color: rgba(192, 108, 82, 0.15); /* terra */
  border-color: var(--color-terra);
}

#custom-cursor.has-text {
  width: 68px;
  height: 68px;
  background-color: rgba(192, 108, 82, 0.2);
  border-color: var(--color-terra);
  box-shadow: 0 4px 20px rgba(192, 108, 82, 0.15);
}

#custom-cursor.has-text #custom-cursor-text {
  opacity: 1;
}`;

css = css.replace(oldCursorCss, newCursorCss);
fs.writeFileSync('src/index.css', css);

// 3. Update src/main.js
let js = fs.readFileSync('src/main.js', 'utf8');

// Update initCustomCursor
const oldInitCursor = js.substring(js.indexOf('function initCustomCursor() {'), js.indexOf('function initScrollProgress() {'));

const newInitCursor = `function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const cursorText = document.getElementById('custom-cursor-text');
  if (!cursor) return;
  
  document.body.style.cursor = 'none';
  
  let mouseX = -100;
  let mouseY = -100;
  
  const trails = [];
  const numTrails = 6;
  
  for (let i = 0; i < numTrails; i++) {
    const t = document.createElement('div');
    t.className = 'fixed pointer-events-none z-[110] transition-none rounded-full';
    const size = 10 - i;
    t.style.width = size + 'px';
    t.style.height = size + 'px';
    t.style.backgroundColor = \`rgba(192, 108, 82, \${0.4 - (i * 0.05)})\`;
    document.body.appendChild(t);
    trails.push({ el: t, x: mouseX, y: mouseY, size });
  }

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });
  
  function updateTrails() {
    let prevX = mouseX;
    let prevY = mouseY;

    trails.forEach((trail) => {
      trail.x += (prevX - trail.x) * 0.35;
      trail.y += (prevY - trail.y) * 0.35;
      
      trail.el.style.left = (trail.x - trail.size / 2) + 'px';
      trail.el.style.top = (trail.y - trail.size / 2) + 'px';
      
      prevX = trail.x;
      prevY = trail.y;
    });

    requestAnimationFrame(updateTrails);
  }
  updateTrails();

  function getCursorText(target) {
    if (!target) return null;
    const explicit = target.closest('[data-cursor]');
    if (explicit && explicit.dataset.cursor) return explicit.dataset.cursor;
    
    if (target.closest('#skill-cloud')) return 'Drag';
    if (target.closest('.project-card, .project-modal-trigger, #projects-container > div')) return 'View';
    if (target.closest('#certificates-grid a')) return 'Open';
    if (target.closest('#experience-container > div')) return 'Read';
    if (target.closest('button, .filter-btn, .nav-link, #back-to-top')) return 'Click';
    if (target.closest('input, textarea')) return 'Type';
    if (target.closest('a')) return 'Visit';
    return null;
  }

  document.addEventListener('mouseover', (e) => {
    const text = getCursorText(e.target);
    if (text) {
      cursor.classList.add('hover');
      if (cursorText) {
        cursorText.textContent = text;
        cursor.classList.add('has-text');
      }
    } else {
      cursor.classList.remove('hover', 'has-text');
      if (cursorText) cursorText.textContent = '';
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget) {
      cursor.classList.remove('hover', 'has-text');
      if (cursorText) cursorText.textContent = '';
    }
  });
}

`;

js = js.replace(oldInitCursor, newInitCursor);

// Update renderExperience & renderCertificates stagger delays
const oldRenderExp = `EXPERIENCES.forEach((exp, index) => {
    html += \`
      <div class="relative pl-6 md:pl-10 reveal border-l-2 border-ink/20 border-dashed">`;

const newRenderExp = `EXPERIENCES.forEach((exp, index) => {
    html += \`
      <div class="relative pl-6 md:pl-10 reveal border-l-2 border-ink/20 border-dashed transition-all duration-700" style="transition-delay: \${index * 150}ms">`;

js = js.replace(oldRenderExp, newRenderExp);

const oldRenderCert = `CERTIFICATES.forEach((cert, index) => {
    html += \`
      <a href="\${cert.link}" target="_blank" class="block group reveal" style="transition-delay: \${index * 100}ms">`;

const newRenderCert = `CERTIFICATES.forEach((cert, index) => {
    html += \`
      <a href="\${cert.link}" target="_blank" class="block group reveal transition-all duration-700" style="transition-delay: \${index * 150}ms">`;

js = js.replace(oldRenderCert, newRenderCert);

// Update getScrollObserver for robust stagger
const oldObserver = js.substring(js.indexOf('function getScrollObserver() {'), js.indexOf('function initScrollReveal() {'));
const newObserver = `function getScrollObserver() {
  if (!scrollObserver) {
    scrollObserver = new IntersectionObserver((entries) => {
      const intersecting = entries.filter(e => e.isIntersecting);
      
      intersecting.sort((a, b) => {
        return a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left;
      });

      intersecting.forEach((entry, idx) => {
        if (!entry.target.classList.contains('active')) {
          if (!entry.target.style.transitionDelay) {
            entry.target.style.transitionDelay = \`\${idx * 150}ms\`;
          }
          entry.target.classList.add('active');
        }
        scrollObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });
  }
  return scrollObserver;
}

`;

js = js.replace(oldObserver, newObserver);

fs.writeFileSync('src/main.js', js);

// 4. Update documentation
let md = fs.readFileSync('web-convert-to-data-dinamis.md', 'utf8');
const newNote2 = `
**Custom Cursor Text & Staggered Scroll Animations:**
Cursor kustom dilengkapi dengan pembaca status kontekstual (\`getCursorText\`) yang menampilkan teks interaktif seperti 'View', 'Drag', 'Open', 'Read', 'Click', dan 'Type'. Animasi entri pada komponen 'Experience' dan 'Certificates' menggunakan delay stagger terstruktur (\`transition-delay: \${index * 150}ms\`) dan kelas \`.reveal\` agar bertahap muncul saat di-scroll.
`;
md += newNote2;
fs.writeFileSync('web-convert-to-data-dinamis.md', md);

let tasklist = fs.readFileSync('tasklist.md', 'utf8');
const oldTaskListEnd = `- [ ] 4.3 Ensure client-side interactive utilities like the Hero Typing Animation (\`#typing-role\`) and Scroll-Spy navigation highlighting (\`initActiveNav\`) remain initialized in \`main.js\`.`;
const newTaskListEnd = `- [ ] 4.3 Ensure client-side interactive utilities like the Hero Typing Animation (\`#typing-role\`), Scroll-Spy navigation highlighting (\`initActiveNav\`), Custom Cursor text feedback, and Staggered Scroll Animations (\`.reveal\`) remain initialized in \`main.js\`.`;

tasklist = tasklist.replace(oldTaskListEnd, newTaskListEnd);
fs.writeFileSync('tasklist.md', tasklist);

console.log("Applied cursor text and staggered reveal changes successfully!");
