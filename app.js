/* ===== KONNEX — APP.JS v2.0 =====
   Fixes: CSS-class-based reveal (no inline opacity:0),
          mobile menu, header scroll, FAQ accordion, smooth scroll
   ============================================== */
'use strict';

// ─── FAQ ACCORDION ───────────────────────────────────────────────
(function initFAQ() {
  const triggers = document.querySelectorAll('.faq-trigger');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      const answerId = trigger.getAttribute('aria-controls');
      const answer = document.getElementById(answerId);

      // Close all others first
      triggers.forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        const a = document.getElementById(t.getAttribute('aria-controls'));
        if (a) a.hidden = true;
      });

      // Toggle current
      trigger.setAttribute('aria-expanded', String(!expanded));
      if (answer) answer.hidden = expanded;
    });

    // Keyboard support
    trigger.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger.click(); }
    });
  });
})();

// ─── MOBILE MENU ──────────────────────────────────────────────────
(function initMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const menu = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  const open = () => {
    menu.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fechar menu');
    document.body.style.overflow = 'hidden';
    menu.style.display = 'flex';
  };
  const close = () => {
    menu.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    document.body.style.overflow = '';
    menu.style.display = '';
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    isOpen ? close() : open();
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  // Close on Escape
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();

// ─── HEADER SCROLL BEHAVIOR ───────────────────────────────────────
(function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 40);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ─── SCROLL REVEAL — BELOW-FOLD ONLY ─────────────────────────────
// IMPORTANT: Only elements BELOW the initial viewport get opacity:0.
// Elements already visible on load are NEVER hidden.
// This prevents blank sections on load and screenshot tools.
(function initReveal() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const revealSelectors = [
    '.integration-item',
    '.problem-content',
    '.problem-visual',
    '.bento-card',
    '.case-card',
    '.pricing-card',
    '.faq-item',
    '.cta-final-box',
    '.section-header',
  ];

  const els = document.querySelectorAll(revealSelectors.join(','));
  if (!els.length) return;

  const viewportH = window.innerHeight;

  // Only hide elements that are genuinely below the fold on first load
  const toReveal = [];
  els.forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    const isInView = rect.top < viewportH && rect.bottom > 0;
    if (!isInView) {
      // Below fold — safe to animate in
      el.style.transitionDelay = ((i % 5) * 70) + 'ms';
      el.classList.add('reveal-ready');
      toReveal.push(el);
    }
    // Elements in view on load: skip — they stay visible
  });

  if (!toReveal.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.01,
    rootMargin: '0px 0px 60px 0px',
  });

  toReveal.forEach(el => observer.observe(el));

  // Safety fallback: if observer never fires (e.g. headless browser), reveal everything after 2s
  setTimeout(() => {
    toReveal.forEach(el => {
      if (!el.classList.contains('reveal-in')) {
        el.classList.add('reveal-in');
      }
    });
  }, 2000);
})();


// ─── CONTACT FORM HANDLER ─────────────────────────
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contact-name')?.value.trim() || '';
  const phone = document.getElementById('contact-whatsapp')?.value.trim() || '';
  const msg = encodeURIComponent(
    `Olá! Me chamo ${name} e gostaria de receber uma avaliação gratuita do Konnex. Meu WhatsApp: ${phone}`
  );
  window.open(`https://wa.me/5500000000000?text=${msg}`, '_blank', 'noopener');
}

// ─── TESTIMONIAL CAROUSEL ─────────────────────────
(function initCarousel() {
  const track = document.getElementById('testimonialTrack');
  if (!track) return;

  const slides = track.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('#testimonialDots .testimonial-dot');
  const prev = document.getElementById('testimonialPrev');
  const next = document.getElementById('testimonialNext');
  let current = 0;
  let timer = null;

  function goTo(idx) {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    dots[current].setAttribute('aria-selected', 'false');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
    dots[current].setAttribute('aria-selected', 'true');
  }

  function startAuto() { timer = setInterval(() => goTo(current + 1), 5000); }
  function stopAuto() { clearInterval(timer); }

  prev?.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  next?.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });
  dots.forEach(dot => dot.addEventListener('click', () => {
    stopAuto();
    goTo(+dot.dataset.index);
    startAuto();
  }));

  const carousel = document.getElementById('testimonialCarousel');
  carousel?.addEventListener('mouseenter', stopAuto);
  carousel?.addEventListener('mouseleave', startAuto);

  startAuto();
})();

// ─── GSAP HERO (optional, doesn't block content if CDN fails) ─────
window.addEventListener('load', function initHeroGSAP() {
  if (typeof gsap === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const tl = gsap.timeline({ delay: 0.15 });
  tl.from('.hero-badge', { opacity: 0, y: 18, duration: 0.6, ease: 'power3.out' })
    .from('.hero-headline', { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out' }, '-=0.3')
    .from('.hero-sub', { opacity: 0, y: 16, duration: 0.6, ease: 'power3.out' }, '-=0.3')
    .from('.hero-actions', { opacity: 0, y: 16, duration: 0.5, ease: 'power3.out' }, '-=0.25')
    .from('.hero-microcopy', { opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
    .from('.hero-proof', { opacity: 0, y: 8, duration: 0.5, ease: 'power2.out' }, '-=0.2')
    .from('.dashboard-mockup', { opacity: 0, y: 32, scale: 0.97, duration: 0.9, ease: 'power3.out' }, 0.25)
    .from('.float-metric', { opacity: 0, y: 16, duration: 0.6, stagger: 0.18, ease: 'power3.out' }, 0.65);
});

// ─── MOBILE STICKY — HIDE WHEN PRICING IS VISIBLE ────────────────
(function initMobileSticky() {
  const sticky = document.querySelector('.mobile-sticky');
  const pricing = document.getElementById('pricing');
  const footer = document.querySelector('.footer');
  if (!sticky) return;

  const targets = [pricing, footer].filter(Boolean);
  if (!targets.length) return;

  const observer = new IntersectionObserver(entries => {
    const anyVisible = entries.some(e => e.isIntersecting);
    sticky.style.display = anyVisible ? 'none' : '';
  }, { threshold: 0.1 });

  targets.forEach(t => observer.observe(t));
})();

// ─── CTA TRACKING (stub — replace with real analytics) ────────────
document.querySelectorAll('[data-cta]').forEach(el => {
  el.addEventListener('click', () => {
    const cta = el.getAttribute('data-cta');
    console.debug('[Konnex] CTA click:', cta);
    // Replace: gtag('event', 'cta_click', { cta_location: cta });
  });
});

// ─── SMOOTH ANCHOR SCROLL (with header offset) ───────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const headerHeight = document.getElementById('header')?.offsetHeight ?? 72;
    const offset = headerHeight + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
