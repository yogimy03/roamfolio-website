/* RoamFolio — main.js */

// Nav scroll glass effect
const nav = document.querySelector('.site-nav');
if (nav) {
  const handleNav = () => nav.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', handleNav, { passive: true });
  handleNav();
}

// Mobile menu
const menuToggle = document.getElementById('navToggle');
const navMenu    = document.getElementById('navLinks');
if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open);
  });
  navMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', false);
    })
  );
}

// Hero load-in (fire after first paint)
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('revealed'));
  });
});

// Hero background parallax
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        heroBg.style.transform = `translateY(${window.scrollY * 0.32}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// Animated number counter
function animateCount(el) {
  if (!el.dataset.count) return;
  const target   = parseInt(el.dataset.count, 10);
  const suffix   = el.dataset.suffix || '';
  if (target === 0) return; // already showing 0
  const duration = 1300;
  const startTs  = performance.now();

  function step(now) {
    const t = Math.min((now - startTs) / duration, 1);
    // ease-out cubic
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// Scroll reveal + counter trigger (single observer)
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in-view');
    // Kick off any counters inside this element
    e.target.querySelectorAll('[data-count]').forEach(animateCount);
    revealObs.unobserve(e.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

document.querySelectorAll('[data-scroll-reveal]').forEach(el => revealObs.observe(el));

// Route line draw — clip-path reveal when the grid enters view
const modeGrid = document.querySelector('.modes-grid');
if (modeGrid) {
  const lineObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const cards = e.target.querySelectorAll('.mode-card');
      cards.forEach((card, i) => {
        setTimeout(() => card.classList.add('routes-visible'), i * 75);
      });
      lineObs.unobserve(e.target);
    });
  }, { threshold: 0.12 });
  lineObs.observe(modeGrid);
}

// Hero cursor spotlight
const heroEl = document.querySelector('.hero');
if (heroEl && window.matchMedia('(hover: hover)').matches) {
  heroEl.addEventListener('mousemove', e => {
    const r = heroEl.getBoundingClientRect();
    heroEl.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100) + '%');
    heroEl.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%');
  }, { passive: true });
}

// Card cursor spotlight glow (tracks mouse within each card)
function addSpotlight(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--x', ((e.clientX - r.left) / r.width  * 100) + '%');
      el.style.setProperty('--y', ((e.clientY - r.top)  / r.height * 100) + '%');
    }, { passive: true });
  });
}
addSpotlight('.feat-card');
addSpotlight('.mode-card');
addSpotlight('.step-card');

// 3D card tilt on hover (desktop only)
function addTilt(selector, strength) {
  if (!window.matchMedia('(hover: hover)').matches) return;
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.transition = 'transform 0.12s ease, box-shadow 0.25s var(--ease)';
    });
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      el.style.transform =
        `perspective(900px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) translateZ(8px)`;
    }, { passive: true });
    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 0.55s var(--ease), box-shadow 0.25s var(--ease)';
      el.style.transform = '';
    });
  });
}
addTilt('.feat-card',  7);
addTilt('.mode-card',  6);
addTilt('.step-card',  5);

// Highlight active nav link while scrolling
const scrollSections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
if (navAnchors.length) {
  const activeObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === '#' + id
            ? 'rgba(255,255,255,0.95)'
            : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -48% 0px' });
  scrollSections.forEach(s => activeObs.observe(s));
}
