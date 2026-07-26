const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

const mobileMenuOrig = `function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  function openMenu() {
    mobileMenu.classList.remove('pointer-events-none', 'opacity-0');
  }

  function closeMenu() {
    mobileMenu.classList.add('pointer-events-none', 'opacity-0');
  }

  if(toggleBtn && closeBtn) {
      toggleBtn.addEventListener('click', openMenu);
      closeBtn.addEventListener('click', closeMenu);
      mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
  }
}`;

const mobileMenuNew = `function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuBg = document.getElementById('mobile-menu-bg');
  const mobileMenuContent = document.getElementById('mobile-menu-content');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  function openMenu() {
    mobileMenu.classList.remove('pointer-events-none');
    
    // Animate the background
    mobileMenuBg.classList.remove('translate-y-full', 'rounded-t-[100%]');
    mobileMenuBg.classList.add('translate-y-0', 'rounded-t-none');
    
    // Fade in content
    mobileMenuContent.classList.remove('opacity-0');
    closeBtn.classList.remove('opacity-0');
  }

  function closeMenu() {
    mobileMenuBg.classList.add('translate-y-full', 'rounded-t-[100%]');
    mobileMenuBg.classList.remove('translate-y-0', 'rounded-t-none');
    
    mobileMenuContent.classList.add('opacity-0');
    closeBtn.classList.add('opacity-0');
    
    setTimeout(() => {
        mobileMenu.classList.add('pointer-events-none');
    }, 700);
  }

  if(toggleBtn && closeBtn) {
      toggleBtn.addEventListener('click', openMenu);
      closeBtn.addEventListener('click', closeMenu);
      mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
  }
}`;

js = js.replace(mobileMenuOrig, mobileMenuNew);

const scrubbingLogic = `
function initScrubbingTitles() {
  const titles = document.querySelectorAll('.section-title');
  if (!titles.length) return;
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    titles.forEach(title => {
      const rect = title.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      
      // Calculate how far the title is from the center of the viewport
      const distance = center - (windowHeight / 2);
      const normalizedDistance = distance / (windowHeight / 2); // -1 to 1 when in view
      
      // Only animate if somewhat close to viewport
      if (normalizedDistance > -1.5 && normalizedDistance < 1.5) {
        // Shift and rotate slightly based on scroll distance
        const rotation = normalizedDistance * 4; // Max 4 degrees
        const shiftX = normalizedDistance * 20; // Max 20px
        
        title.style.transform = \`translate3d(\${shiftX}px, 0, 0) rotate(\${rotation}deg)\`;
        title.style.transition = 'transform 0.1s ease-out';
      }
    });
  }, { passive: true });
}
`;

js += scrubbingLogic;
js = js.replace('initMobileMenu();', 'initMobileMenu();\n  initScrubbingTitles();');

fs.writeFileSync('src/main.js', js);
