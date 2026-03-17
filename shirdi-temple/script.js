// =============================================
// SHIRDI SAI BABA TEMPLE – script.js
// =============================================

'use strict';

// ---- Navbar Scroll Effect & Active Link ----
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateNavbar() {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

function updateActiveLink() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.section === current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', () => {
  updateNavbar();
  updateActiveLink();
  handleScrollReveal();
  handleScrollTop();
});

// ---- Mobile Hamburger Menu ----
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinksMenu.classList.toggle('open');
  // Animate hamburger bars
  const bars = hamburger.querySelectorAll('span');
  if (navLinksMenu.classList.contains('open')) {
    bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    bars[1].style.opacity = '0';
    bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    bars[0].style.transform = '';
    bars[1].style.opacity = '';
    bars[2].style.transform = '';
  }
});

// Close menu when nav link clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinksMenu.classList.remove('open');
    const bars = hamburger.querySelectorAll('span');
    bars[0].style.transform = '';
    bars[1].style.opacity = '';
    bars[2].style.transform = '';
  });
});

// ---- Scroll Reveal (Fade-Up) ----
const fadeElements = document.querySelectorAll('.fade-up');

function handleScrollReveal() {
  const windowHeight = window.innerHeight;
  fadeElements.forEach((el, index) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 80) {
      // Stagger child elements by 100ms each
      setTimeout(() => {
        el.classList.add('visible');
      }, (index % 6) * 80);
    }
  });
}

// Run once on load
handleScrollReveal();

// ---- Scroll-to-Top Button ----
const scrollTopBtn = document.getElementById('scrollTop');

function handleScrollTop() {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
}

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---- Background Music Toggle ----
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const musicIcon = document.getElementById('musicIcon');

let isMusicPlaying = false;

// NOTE: To enable music, add a file at 'music/om.mp3'
// The toggle will show a visual cue even if no audio file present

musicToggle.addEventListener('click', () => {
  if (!bgMusic.src || bgMusic.src === window.location.href) {
    // No music file set – just show toggle feedback
    isMusicPlaying = !isMusicPlaying;
    updateMusicUI();
    return;
  }
  if (isMusicPlaying) {
    bgMusic.pause();
    isMusicPlaying = false;
  } else {
    bgMusic.play().catch(e => console.log('Music autoplay blocked:', e));
    isMusicPlaying = true;
  }
  updateMusicUI();
});

function updateMusicUI() {
  if (isMusicPlaying) {
    musicIcon.classList.remove('fa-music');
    musicIcon.classList.add('fa-pause');
    musicToggle.classList.add('playing');
    musicToggle.title = 'Pause music';
  } else {
    musicIcon.classList.remove('fa-pause');
    musicIcon.classList.add('fa-music');
    musicToggle.classList.remove('playing');
    musicToggle.title = 'Play spiritual music';
  }
}

// ---- Smooth Scroll for all anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const navH = navbar.offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

// ---- Hero Parallax ----
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  if (heroBg) {
    const scrolled = window.scrollY;
    heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.3}px)`;
  }
}, { passive: true });

// ---- Gallery Item Click (Lightbox) ----
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const lightbox = createLightbox(img.src, img.alt);
    document.body.appendChild(lightbox);
    requestAnimationFrame(() => lightbox.classList.add('active'));
  });
});

function createLightbox(src, alt) {
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = `
    <div class="lightbox-backdrop"></div>
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Close"><i class="fas fa-times"></i></button>
      <img src="${src}" alt="${alt}" />
      <p>${alt}</p>
    </div>
  `;
  lb.querySelector('.lightbox-backdrop').addEventListener('click', () => closeLightbox(lb));
  lb.querySelector('.lightbox-close').addEventListener('click', () => closeLightbox(lb));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(lb); }, { once: true });

  // Inject styles once
  if (!document.getElementById('lightbox-styles')) {
    const style = document.createElement('style');
    style.id = 'lightbox-styles';
    style.textContent = `
      .lightbox { position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; }
      .lightbox.active { opacity: 1; }
      .lightbox-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.88); backdrop-filter: blur(6px); cursor: pointer; }
      .lightbox-content { position: relative; z-index: 1; text-align: center; max-width: 90vw; max-height: 90vh; transform: scale(0.9); transition: transform 0.3s ease; }
      .lightbox.active .lightbox-content { transform: scale(1); }
      .lightbox-content img { max-width: 100%; max-height: 80vh; border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 3px #d4a017; object-fit: contain; }
      .lightbox-content p { color: #f0c040; font-size: 0.9rem; margin-top: 12px; font-style: italic; }
      .lightbox-close { position: absolute; top: -16px; right: -16px; width: 40px; height: 40px; border-radius: 50%; background: #d4a017; color: #1a0f00; border: none; cursor: pointer; font-size: 1rem; display: flex; align-items: center; justify-content: center; transition: 0.3s; z-index: 2; }
      .lightbox-close:hover { background: #f0c040; transform: scale(1.1); }
    `;
    document.head.appendChild(style);
  }
  return lb;
}

function closeLightbox(lb) {
  lb.classList.remove('active');
  setTimeout(() => lb.remove(), 300);
}

// ---- Stats Counter Animation ----
const statNumbers = document.querySelectorAll('.stat-card h4');
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;
  const statsSection = document.querySelector('.about-stats');
  if (!statsSection) return;
  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 50) {
    statsAnimated = true;
    statNumbers.forEach(el => {
      const text = el.textContent;
      const num = parseFloat(text.replace(/[^0-9.]/g, ''));
      const suffix = text.replace(/[0-9.,]/g, '');
      if (!isNaN(num) && num > 1) {
        let start = 0;
        const duration = 1800;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * num);
          el.textContent = current + suffix;
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    });
  }
}

window.addEventListener('scroll', animateStats, { passive: true });
animateStats();

// ---- Init ----
updateNavbar();
updateActiveLink();
