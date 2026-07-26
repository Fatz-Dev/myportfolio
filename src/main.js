import './index.css';
import { PROJECTS, EXPERIENCES, CERTIFICATES } from './data.js';
import Lenis from 'lenis';


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

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrubbingTitles();
  initSmoothScroll();
  initFilters();
  renderProjects('All');
  renderExperience();
  renderCertificates();
  initScrollReveal();
  initKeyboardNavigation();
  initCustomCursor();
  initScrollProgress();
  initBackToTop();
  initParallax();
  initActiveNav();
  initModal();
  initDarkMode();
  initContactForm();
  initSkillCloud();
  initTypingAnimation();
});

// Contact Form
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    
    btn.textContent = 'Sending...';
    btn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      successMsg.classList.remove('hidden');
      form.reset();
      btn.textContent = originalText;
      btn.disabled = false;
      
      setTimeout(() => {
        successMsg.classList.add('hidden');
      }, 5000);
    }, 1500);
  });
}

// Active Navigation (Scroll Spy)
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
      if (href === `#${current}`) {
        link.classList.add('text-terra', 'font-bold');
        link.classList.remove('text-ink/70');
      } else {
        link.classList.remove('text-terra', 'font-bold');
        link.classList.add('text-ink/70');
      }
    });

    mobileNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
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
}

// Dark Mode
function initDarkMode() {
  const toggle = document.getElementById('dark-mode-toggle');
  const mobileToggle = document.getElementById('dark-mode-toggle-mobile');
  
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark-theme');
  }
  
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark-theme');
    if (document.documentElement.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  };

  if (toggle) toggle.addEventListener('click', toggleTheme);
  if (mobileToggle) mobileToggle.addEventListener('click', toggleTheme);
}

// Project Modal
function initModal() {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const closeBtn = document.getElementById('modal-close');
  
  if (!modal) return;
  
  let currentProjectIndex = -1;
  
  const closeModal = () => {
    modal.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
    currentProjectIndex = -1;
  };
  
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  document.addEventListener('keydown', (e) => {
    if (currentProjectIndex !== -1) {
      if (e.key === 'ArrowLeft') {
        const newIndex = (currentProjectIndex - 1 + PROJECTS.length) % PROJECTS.length;
        window.openProjectModal(PROJECTS[newIndex].title);
      } else if (e.key === 'ArrowRight') {
        const newIndex = (currentProjectIndex + 1) % PROJECTS.length;
        window.openProjectModal(PROJECTS[newIndex].title);
      } else if (e.key === 'Escape') {
        closeModal();
      }
    }
  });
  
  window.openProjectModal = (title) => {
    const index = PROJECTS.findIndex(p => p.title === title);
    if (index === -1) return;
    currentProjectIndex = index;
    const project = PROJECTS[index];
    
    modalContent.innerHTML = `
      <div class="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
        <span class="text-sm font-mono italic text-sage mb-2">${project.category}</span>
        <h2 class="font-mono text-4xl font-bold mb-4 text-ink">${project.title}</h2>
        <p class="text-lg text-ink/80 mb-8 leading-relaxed">${project.description} This project highlights the dedication to thoughtful design, robust execution, and seamless user experiences.</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          ${project.techStack.map(tech => `
            <div class="flex flex-col p-3 border-drawn-alt bg-ink/5 hover:bg-ink/10 transition-colors cursor-none group/tech">
              <span class="font-mono font-bold text-ink group-hover/tech:text-terra transition-colors">${tech.name}</span>
              <span class="text-sm text-ink/70">${tech.role || 'Core Technology'}</span>
            </div>
          `).join('')}
        </div>
        
        <div class="flex flex-wrap gap-4 mt-auto">
            <a href="${project.link}" target="_blank" class="inline-flex items-center justify-center gap-2 bg-ink text-sand px-6 py-2 border-drawn hover:bg-terra hover:border-terra transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0_0_rgba(234,88,12,0.5)] cursor-none">
                Live Demo
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
            <a href="#" target="_blank" class="inline-flex items-center justify-center gap-2 bg-transparent text-ink border border-ink/20 px-6 py-2 border-drawn-alt hover:bg-ink/5 transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0_0_rgba(15,23,42,0.15)] cursor-none">
                GitHub
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.09c3.1-.3 6.3-1.5 6.3-7.2a5.8 5.8 0 0 0-1.6-4.1 5.7 5.7 0 0 0-.1-4s-1.3-.4-4 2a13.3 13.3 0 0 0-7 0c-2.7-2.4-4-2-4-2a5.7 5.7 0 0 0-.1 4 5.8 5.8 0 0 0-1.6 4.1c0 5.7 3.2 6.9 6.3 7.2a4.8 4.8 0 0 0-1 3.09V22"></path></svg>
            </a>
        </div>
      </div>
      <div class="w-full md:w-1/2 p-6 flex flex-col justify-center">
        <div class="w-full aspect-[4/3] organic-blob border-drawn overflow-hidden bg-sand relative shadow-sm group-hover:scale-[1.02] transition-transform duration-500">
            <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover sepia-[0.2] hover:sepia-0 hover:scale-105 transition-all duration-700" />
        </div>
      </div>
    `;
    
    modal.classList.remove('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'hidden';
    
    if (window.updateCursorInteractives) window.updateCursorInteractives();
  };
}

// Back to Top functionality
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight / 2) {
      btn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      btn.classList.add('opacity-100', 'translate-y-0');
    } else {
      btn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      btn.classList.remove('opacity-100', 'translate-y-0');
    }
  }, { passive: true });
  
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Keyboard Navigation
function initKeyboardNavigation() {
  const sections = Array.from(document.querySelectorAll('section[id]'));
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      if (document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        return;
      }
      
      e.preventDefault();
      
      const scrollY = window.scrollY + 100;
      let currentIndex = 0;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollY >= sections[i].offsetTop) {
          currentIndex = i;
          break;
        }
      }
      
      let targetIndex = currentIndex;
      
      if (e.key === 'ArrowDown') {
        targetIndex = Math.min(currentIndex + 1, sections.length - 1);
      } else if (e.key === 'ArrowUp') {
        targetIndex = Math.max(currentIndex - 1, 0);
      }
      
      if (sections[targetIndex]) {
        sections[targetIndex].scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}

function initCustomCursor() {
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
    t.style.backgroundColor = `rgba(192, 108, 82, ${0.4 - (i * 0.05)})`;
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

function initScrollProgress() {
  const progress = document.getElementById('scroll-progress');
  if (!progress) return;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;
    progress.style.width = Math.max(0, Math.min(100, scrollPercent * 100)) + '%';
  }, { passive: true });
}

// Mobile Menu
function initMobileMenu() {
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
}

// Smooth Scroll Navigation
function initSmoothScroll() {
  const lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 0.8,
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if(targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        lenis.scrollTo(targetElement);
      }
    });
  });
}

function createProjectCard(project, index) {
  const isEven = index % 2 === 0;
  // Alternate rotation and shapes
  const rotation = isEven ? 'rotate-1' : '-rotate-1';
  const borderClass = isEven ? 'border-drawn' : 'border-drawn-alt';
  
  return `
    <div class="project-card flex flex-col reveal ${isEven ? 'md:mt-12' : ''}">
      <a href="#" data-title="${project.title}" class="project-modal-trigger group block relative mb-6">
        <div class="absolute inset-0 bg-ocher/20 transform translate-x-3 translate-y-3 ${borderClass} transition-transform group-hover:translate-x-4 group-hover:translate-y-4"></div>
        <div class="aspect-[4/3] w-full overflow-hidden bg-sand relative z-10 ${borderClass} transform ${rotation} transition-transform group-hover:rotate-0 bg-white p-2">
            <div class="w-full h-full" data-parallax="0.08">
                <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover sepia-[0.4] contrast-125 group-hover:sepia-0 group-hover:scale-[1.25] transition-all duration-700 organic-blob scale-[1.15]"/>
            </div>
        </div>
      </a>
      <div class="px-2">
          <span class="text-sm font-mono italic text-sage mb-2 block">${project.category}</span>
          <h3 class="font-mono text-3xl font-bold mb-3 text-ink">${project.title}</h3>
          <p class="text-ink/80 mb-4 leading-relaxed">${project.description}</p>
          <div class="flex flex-wrap gap-2">
            ${project.techStack.map(tech => `
              <span class="tech-tag relative bg-ink/5 px-3 py-1 text-sm ${borderClass} group cursor-none">
                ${tech.name}
                <span class="tech-tooltip border-drawn bg-sand text-ink">${tech.role}</span>
              </span>
            `).join('')}
          </div>
      </div>
    </div>
  `;
}

function renderProjects(filter = 'All') {
  const container = document.getElementById('projects-container');
  if (!container) return;
  
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);
  
  container.style.opacity = '0';
  
  setTimeout(() => {
    container.innerHTML = filtered.map((project, index) => createProjectCard(project, index)).join('');
    
    container.querySelectorAll('.project-modal-trigger').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.openProjectModal) {
            window.openProjectModal(trigger.dataset.title);
        }
      });
    });
    
    // Re-initialize hover effects and observer for new elements
    if (window.updateCursorInteractives) {
      window.updateCursorInteractives();
    }
    
    // Quick re-trigger for scroll reveal for new items
    const newReveals = container.querySelectorAll('.reveal');
    const observer = getScrollObserver();
    
    newReveals.forEach(reveal => {
      reveal.classList.remove('active');
      reveal.style.transitionDelay = '';
      observer.observe(reveal);
    });
    
    container.style.opacity = '1';
  }, 300);
}

function initFilters() {
  const filterContainer = document.getElementById('project-filters');
  if (!filterContainer) return;
  
  const categories = ['All', ...new Set(PROJECTS.map(p => p.category))];
  
  let html = '';
  categories.forEach((cat) => {
    const isActive = cat === 'All';
    const activeClasses = isActive ? 'bg-sage/20 border-drawn' : 'border-drawn-alt hover:bg-sage/10';
    html += `<button class="filter-btn ${activeClasses} px-4 py-2 transition-colors text-ink cursor-none" data-filter="${cat}">${cat}</button>`;
  });
  
  filterContainer.innerHTML = html;
  
  const buttons = filterContainer.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
        b.classList.remove('bg-sage/20', 'border-drawn');
        b.classList.add('border-drawn-alt', 'hover:bg-sage/10');
      });
      btn.classList.add('bg-sage/20', 'border-drawn');
      btn.classList.remove('border-drawn-alt', 'hover:bg-sage/10');
      
      const category = btn.dataset.filter;
      renderProjects(category);
    });
  });
}

function renderExperience() {
  const container = document.getElementById('experience-container');
  if (!container) return;
  
  // Simulate data fetching to show skeleton
  setTimeout(() => {
    let html = '';
    EXPERIENCES.forEach((exp, index) => {
    html += `
      <div class="relative pl-6 md:pl-10 reveal border-l-2 border-ink/20 border-dashed transition-all duration-700" style="transition-delay: ${index * 150}ms">
        <div class="absolute left-[-11px] top-1 w-5 h-5 bg-sand border-drawn border-ink rounded-full"></div>
        <div class="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-2">
            <h3 class="font-mono text-2xl font-bold text-ink">${exp.role}</h3>
            <span class="text-terra font-mono italic">${exp.company}</span>
            <span class="text-sm text-ink/60 ml-auto md:ml-0">${exp.period}</span>
        </div>
        <p class="text-ink/80 leading-relaxed max-w-2xl">${exp.description}</p>
      </div>
    `;
  });

    container.innerHTML = html;
    initScrollReveal();
  }, 1500);
}

// Animations & Interactions
function initParallax() {
  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    parallaxElements.forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0;
      const rect = el.parentElement.getBoundingClientRect(); // Use parent to avoid shifting the measurement
      const elCenter = rect.top + rect.height / 2;
      
      // Distance from center of screen
      const offset = (elCenter - windowHeight / 2) * speed;
      
      el.style.transform = `translateY(${offset}px)`;
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
  
  // Initial call
  window.requestAnimationFrame(updateParallax);
}

let scrollObserver;

function getScrollObserver() {
  if (!scrollObserver) {
    scrollObserver = new IntersectionObserver((entries) => {
      const intersecting = entries.filter(e => e.isIntersecting);
      
      intersecting.sort((a, b) => {
        return a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left;
      });

      intersecting.forEach((entry, idx) => {
        if (!entry.target.classList.contains('active')) {
          if (!entry.target.style.transitionDelay) {
            entry.target.style.transitionDelay = `${idx * 150}ms`;
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

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = getScrollObserver();
  reveals.forEach(reveal => observer.observe(reveal));
}

// Skill Cloud
function initSkillCloud() {
  const container = document.getElementById('skill-cloud');
  if (!container) return;

  const skills = [
    { name: 'JavaScript', level: 'Core Language', desc: 'Expert proficiency in vanilla & modern ES6+' },
    { name: 'TypeScript', level: 'Type Safety', desc: 'Strict typing for enterprise-scale architecture' },
    { name: 'React', level: 'Frontend UI', desc: 'Component-driven reactive interfaces' },
    { name: 'Next.js', level: 'Fullstack Framework', desc: 'SSR, SSG, and API routing' },
    { name: 'Node.js', level: 'Backend Runtime', desc: 'High-performance asynchronous services' },
    { name: 'Python', level: 'Data & Scripting', desc: 'Data processing and automation tools' },
    { name: 'PostgreSQL', level: 'Database', desc: 'Relational data modeling and complex queries' },
    { name: 'Redis', level: 'Caching', desc: 'In-memory state and high-speed telemetry' },
    { name: 'Docker', level: 'DevOps', desc: 'Containerization and isolated deployments' },
    { name: 'AWS', level: 'Cloud Infra', desc: 'Scalable cloud computing architectures' },
    { name: 'Tailwind CSS', level: 'Styling', desc: 'Utility-first rapid UI development' },
    { name: 'GraphQL', level: 'API Layer', desc: 'Precise and efficient data fetching' },
    { name: 'WebSockets', level: 'Real-time', desc: 'Bi-directional low-latency communication' },
    { name: 'Figma', level: 'Design', desc: 'UI/UX prototyping and wireframing' },
    { name: 'System Design', level: 'Architecture', desc: 'Designing resilient distributed systems' }
  ];

  const skillIcons = {
    'JavaScript': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
    'TypeScript': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
    'React': `<svg viewBox="-11.5 -10.23 23 20.46" class="w-4 h-4"><circle cx="0" cy="0" r="2.05" fill="currentColor"/><g stroke="currentColor" stroke-width="1.5" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>`,
    'Next.js': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><polygon points="12 2 22 22 2 22"/></svg>`,
    'Node.js': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>`,
    'Python': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="m12 2-8 4v8l8 4 8-4V6l-8-4Z"/><path d="m12 22 8-4v-8l-8 4-8-4v8l8 4Z"/><path d="m20 10-8-4-8 4"/><path d="m12 14-8-4"/></svg>`,
    'PostgreSQL': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>`,
    'Redis': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>`,
    'Docker': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
    'AWS': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
    'Tailwind CSS': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
    'GraphQL': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
    'WebSockets': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
    'Figma': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/></svg>`,
    'System Design': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`
  };

  const tags = [];
  const containerRect = container.getBoundingClientRect();
  const width = container.clientWidth || 800;
  const height = container.clientHeight || 400;

  // Mouse interaction & Drag to rotate
  let mouseX = -1000;
  let mouseY = -1000;
  let lastMouseX = -1000;
  let lastMouseY = -1000;
  let isDragging = false;
  let angularVelocity = 0;

  container.addEventListener('mousedown', () => {
    isDragging = true;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    lastMouseX = -1000;
    lastMouseY = -1000;
  });

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    
    if (isDragging && lastMouseX !== -1000) {
      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      
      const vx = mouseX - cx;
      const vy = mouseY - cy;
      
      const torque = (vx * dy - vy * dx) / 5000;
      angularVelocity += torque;
    }
    
    if (isDragging) {
      lastMouseX = mouseX;
      lastMouseY = mouseY;
    }
  });

  container.addEventListener('mouseleave', () => {
    mouseX = -1000;
    mouseY = -1000;
    isDragging = false;
    lastMouseX = -1000;
    lastMouseY = -1000;
  });

  // Initialize tags
  skills.forEach(skill => {
    const el = document.createElement('div');
    el.className = 'absolute top-0 left-0 group cursor-none select-none';
    el.innerHTML = `
      <div class="flex items-center gap-2 font-mono text-sm md:text-base px-4 py-2 bg-sand border-drawn text-ink shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1 group-hover:z-50 relative bg-sand/90 backdrop-blur-sm">
        ${skillIcons[skill.name] || ''}
        <span>${skill.name}</span>
        
        <!-- Hover Detail Popup -->
        <div class="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 z-[60]">
            <div class="bg-ink text-sand p-3 border-drawn text-xs text-center shadow-lg relative">
                <div class="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-ink transform rotate-45"></div>
                <span class="block font-bold text-terra mb-1">${skill.level}</span>
                <span class="opacity-80">${skill.desc}</span>
            </div>
        </div>
      </div>
    `;
    container.appendChild(el);

    // Random initial position
    const x = Math.random() * (width - 100) + 50;
    const y = Math.random() * (height - 50) + 25;
    
    // Random velocity
    const vx = (Math.random() - 0.5) * 1.5;
    const vy = (Math.random() - 0.5) * 1.5;

    tags.push({ el, x, y, vx, vy, width: 0, height: 0 });
  });

  // We need to wait for DOM to render to get element sizes
  setTimeout(() => {
    tags.forEach(tag => {
      tag.width = tag.el.offsetWidth;
      tag.height = tag.el.offsetHeight;
    });
    
    requestAnimationFrame(update);
  }, 100);

  function update() {
    const w = container.clientWidth;
    const h = container.clientHeight;

    angularVelocity *= 0.95; // Dampening
    const cx = w / 2;
    const cy = h / 2;

    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      
      // Apply rotation force
      if (Math.abs(angularVelocity) > 0.0001) {
        const rx = tag.x - cx;
        const ry = tag.y - cy;
        tag.vx += -ry * angularVelocity * 0.1;
        tag.vy += rx * angularVelocity * 0.1;
      }

      // Update position
      tag.x += tag.vx;
      tag.y += tag.vy;

      // Friction
      tag.vx *= 0.99;
      tag.vy *= 0.99;

      // Base minimum drift speed
      const speed = Math.sqrt(tag.vx * tag.vx + tag.vy * tag.vy);
      if (speed < 0.2) {
        tag.vx += (Math.random() - 0.5) * 0.1;
        tag.vy += (Math.random() - 0.5) * 0.1;
      }

      // Boundary collision
      if (tag.x < tag.width / 2) {
        tag.x = tag.width / 2;
        tag.vx *= -1;
      } else if (tag.x > w - tag.width / 2) {
        tag.x = w - tag.width / 2;
        tag.vx *= -1;
      }

      if (tag.y < tag.height / 2) {
        tag.y = tag.height / 2;
        tag.vy *= -1;
      } else if (tag.y > h - tag.height / 2) {
        tag.y = h - tag.height / 2;
        tag.vy *= -1;
      }

      // Mouse repulsion
      const dx = tag.x - mouseX;
      const dy = tag.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        const force = (150 - dist) / 150;
        tag.vx += (dx / dist) * force * 1.5;
        tag.vy += (dy / dist) * force * 1.5;
      }

      // Tag to tag repulsion
      for (let j = i + 1; j < tags.length; j++) {
        const other = tags[j];
        const tdx = tag.x - other.x;
        const tdy = tag.y - other.y;
        const tdist = Math.sqrt(tdx * tdx + tdy * tdy);
        
        // Approximate bounding radius
        const minDistance = (tag.width + other.width) / 2.5; 

        if (tdist < minDistance && tdist > 0) {
          const tforce = (minDistance - tdist) / minDistance;
          const fx = (tdx / tdist) * tforce * 0.5;
          const fy = (tdy / tdist) * tforce * 0.5;
          
          tag.vx += fx;
          tag.vy += fy;
          other.vx -= fx;
          other.vy -= fy;
        }
      }

      // Apply transform
      tag.el.style.transform = `translate(${tag.x - tag.width / 2}px, ${tag.y - tag.height / 2}px)`;
    }

    requestAnimationFrame(update);
  }
}

function renderCertificates() {
  const container = document.getElementById('certificates-grid');
  if (!container) return;
  
  // Simulate data fetching to show skeleton
  setTimeout(() => {
    let html = '';
    CERTIFICATES.forEach((cert, index) => {
    html += `
      <a href="${cert.link}" target="_blank" class="block group reveal transition-all duration-700" style="transition-delay: ${index * 150}ms">
        <div class="border-drawn bg-ink/5 p-6 h-full flex flex-col hover:bg-ink/10 transition-colors cursor-none relative overflow-hidden">
            <div class="w-full h-40 mb-6 organic-blob overflow-hidden bg-sand border-drawn-alt">
                <img src="${cert.image}" alt="${cert.title}" class="w-full h-full object-cover sepia-[0.3] group-hover:sepia-0 group-hover:scale-105 transition-all duration-700" />
            </div>
            <span class="font-mono text-sm text-sage mb-2">${cert.date}</span>
            <h3 class="font-mono text-xl font-bold mb-2 text-ink group-hover:text-terra transition-colors">${cert.title}</h3>
            <p class="text-ink/70 mt-auto">${cert.issuer}</p>
        </div>
      </a>
    `;
  });
  
    container.innerHTML = html;
    initScrollReveal();
  }, 1500);
}

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
        
        title.style.transform = `translate3d(${shiftX}px, 0, 0) rotate(${rotation}deg)`;
        title.style.transition = 'transform 0.1s ease-out';
      }
    });
  }, { passive: true });
}
