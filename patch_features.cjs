const fs = require('fs');

// 1. Update index.html for typing role
let html = fs.readFileSync('index.html', 'utf8');
const oldHeroText = `I'm FatzDev, a software engineer specialized in building scalable architectures and functional user interfaces.`;
const newHeroText = `I'm FatzDev, a <span id="typing-role" class="text-terra font-mono font-bold border-r-2 border-terra pr-1">Software Engineer</span> specialized in building scalable architectures and functional user interfaces.`;

html = html.replace(oldHeroText, newHeroText);
fs.writeFileSync('index.html', html);

// 2. Update src/main.js for typing animation and scroll-spy
let js = fs.readFileSync('src/main.js', 'utf8');

// Add initTypingAnimation call to DOMContentLoaded listener
const oldListener = `  initModal();
  initDarkMode();
  initContactForm();
  initSkillCloud();
});`;

const newListener = `  initModal();
  initDarkMode();
  initContactForm();
  initSkillCloud();
  initTypingAnimation();
});`;

js = js.replace(oldListener, newListener);

// Update initActiveNav implementation
const oldActiveNav = `// Active Navigation
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('text-terra');
      if (current && link.getAttribute('href').includes(current)) {
        link.classList.add('text-terra');
      }
    });
  }, { passive: true });
}`;

const newActiveNav = `// Active Navigation (Scroll Spy)
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.nav-link-mobile');
  
  function updateActive() {
    let current = '';
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    if (!current && window.scrollY < 300) {
      current = 'profile';
    }
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === \`#\${current}\`) {
        link.classList.add('text-terra', 'font-bold');
        link.classList.remove('text-ink/70');
      } else {
        link.classList.remove('text-terra', 'font-bold');
        link.classList.add('text-ink/70');
      }
    });

    mobileNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === \`#\${current}\`) {
        link.classList.add('text-terra', 'font-bold');
      } else {
        link.classList.remove('text-terra', 'font-bold');
      }
    });
  }
  
  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
}

// Typing Animation
function initTypingAnimation() {
  const roleElement = document.getElementById('typing-role');
  if (!roleElement) return;
  
  const roles = ['Software Engineer', 'System Architect', 'UI/UX Enthusiast'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      roleElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      roleElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
  }
  
  type();
}`;

js = js.replace(oldActiveNav, newActiveNav);
fs.writeFileSync('src/main.js', js);

// 3. Update tasklist.md and web-convert-to-data-dinamis.md
let md = fs.readFileSync('web-convert-to-data-dinamis.md', 'utf8');
const newDocNote = `
**Hero Typing Animation & Scroll-Spy:**
Fitur animasi ketik nama peran di bagian Hero (\`initTypingAnimation\`) dan scroll-spy untuk active navigation link (\`initActiveNav\`) berjalan sepenuhnya di *client-side* JavaScript. Saat konversi ke Blade, elemen \`#typing-role\` dan link navigasi (\`.nav-link\`) tetap dipertahankan pada \`index.blade.php\`.
`;
md += newDocNote;
fs.writeFileSync('web-convert-to-data-dinamis.md', md);

let tasklist = fs.readFileSync('tasklist.md', 'utf8');
const oldTaskEnd = `- [ ] 4.2 Retain the hand-drawn grid background pattern on the mobile menu overlay in the Blade template (\`#mobile-menu-bg\`).`;
const newTaskEnd = `- [ ] 4.2 Retain the hand-drawn grid background pattern on the mobile menu overlay in the Blade template (\`#mobile-menu-bg\`).
- [ ] 4.3 Ensure client-side interactive utilities like the Hero Typing Animation (\`#typing-role\`) and Scroll-Spy navigation highlighting (\`initActiveNav\`) remain initialized in \`main.js\`.`;

tasklist = tasklist.replace(oldTaskEnd, newTaskEnd);
fs.writeFileSync('tasklist.md', tasklist);

console.log("Patched features successfully!");
