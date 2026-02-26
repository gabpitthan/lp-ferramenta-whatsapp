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
// Usa GSAP ScrollTrigger para animar todos os elementos no scroll (subindo sem blur)
window.addEventListener('load', function initScrollTriggerReveal() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  // Lista de seletores para animar
  const revealSelectors = [
    '.section-header',
    '.bento-card',
    '.case-card',
    '.pricing-card',
    '.faq-item',
    '.meta-api-content',
    '.meta-api-visual-col',
    '.problem-content',
    '.problem-visual',
    '.cta-final-box',
    '.testimonial-card',
    '.ticker-card'
  ];

  // Identifica todos os elementos na página
  const elements = document.querySelectorAll(revealSelectors.join(','));
  const viewportH = window.innerHeight;

  elements.forEach((el) => {
    // Apenas anima se o elemento estiver abaixo da primeira tela inicial
    const rect = el.getBoundingClientRect();
    if (rect.top > viewportH * 0.8) {
      // Estado inicial (invisível e movido para baixo - mais sutil)
      gsap.set(el, { opacity: 0, y: 40 });

      // Animação no scroll (mais suave e longa)
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 95%", // Inicia mais cedo e subtilmente
          toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 0.85, // Mais devagar
        ease: "power3.out", // Curva mais elegante // ou "expo.out" para um freio mais longo
        clearProps: "all" // Remove os estilos inline no final da animação para não quebrar outros CSS
      });
    }
  });

  // ─── CONTACT FORM HANDLER & PHONE MASK ─────────────────────────
  (function initContactForm() {
    const phoneInput = document.getElementById('whatsapp-input');
    const errorMsg = document.getElementById('whatsapp-error');
    const form = document.getElementById('pricing-form');
    const btnSubmit = document.getElementById('btn-submit-pricing');

    if (phoneInput) {
      // Real-time masking: (XX) XXXXX-XXXX or (XX) XXXX-XXXX
      phoneInput.addEventListener('input', function (e) {
        // Remove all non-digits
        let val = e.target.value.replace(/\D/g, '');

        // Limit to 11 digits (DDD + 9 digits)
        val = val.substring(0, 11);

        // Apply mask
        let formatted = '';
        if (val.length > 0) {
          formatted = '(' + val.substring(0, 2);
          if (val.length > 2) {
            formatted += ') ' + val.substring(2, 7);
            if (val.length > 7) {
              formatted += '-' + val.substring(7, 11);
            }
          }
        }

        e.target.value = formatted;

        // Clear error on input
        if (errorMsg) errorMsg.style.display = 'none';
        phoneInput.style.borderColor = 'rgba(255,255,255,0.2)';
      });

      phoneInput.addEventListener('focus', function () {
        phoneInput.style.borderColor = 'var(--emerald)';
      });

      phoneInput.addEventListener('blur', function (e) {
        const valRaw = e.target.value.replace(/\D/g, '');
        if (valRaw.length === 0) {
          phoneInput.style.borderColor = 'rgba(255,255,255,0.2)';
          if (errorMsg) errorMsg.style.display = 'none';
        } else if (valRaw.length < 11) {
          phoneInput.style.borderColor = '#f87171';
          if (errorMsg) {
            errorMsg.style.display = 'block';
            errorMsg.innerText = 'Número incompleto (Ex: 11 99999-9999)';
          }
        } else {
          phoneInput.style.borderColor = 'rgba(255,255,255,0.2)';
        }
      });
    }

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = form.querySelector('[name="name"]')?.value.trim() || '';
        const phoneInput = document.getElementById('whatsapp-input');
        const phoneRaw = phoneInput ? phoneInput.value.replace(/\D/g, '') : '';

        // Validation: phone must have precisely 11 digits (DDD + 9 digits)
        if (phoneRaw.length < 11) {
          if (errorMsg) {
            errorMsg.style.display = 'block';
            errorMsg.innerText = phoneRaw.length === 0 ? 'Campo obrigatório' : 'Número incompleto (Ex: 11 99999-9999)';
          }
          if (phoneInput) {
            phoneInput.style.borderColor = '#f87171'; // Red border
            phoneInput.focus();
          }
          return; // Stop submission
        }

        // Valid: Proceed to Webhook and WhatsApp
        const formData = {
          name: name,
          phoneRaw: phoneRaw,
          phoneFormatted: phoneInput.value
        };

        const originalBtnText = btnSubmit ? btnSubmit.innerHTML : 'Solicitar Agora';
        if (btnSubmit) {
          btnSubmit.innerHTML = 'Aguarde...';
          btnSubmit.style.opacity = '0.7';
          btnSubmit.style.pointerEvents = 'none';
        }

        const msg = encodeURIComponent(
          `Olá! Me chamo ${name} e gostaria de receber uma avaliação gratuita da Implementação Black do Konnex.`
        );
        // Aqui você define o número final de destino
        const waUrl = `https://wa.me/5500000000000?text=${msg}`;

        // Send webhook (fire and proceed)
        fetch('https://typebot-n8n.fvycv4.easypanel.host/webhook-test/6b799fed-45c5-4316-998f-f30611e33835', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
          .then(res => {
            if (!res.ok) throw new Error('Falha no servidor');
            if (btnSubmit) {
              btnSubmit.innerHTML = '<i class="ph-fill ph-check-circle"></i> Solicitado com sucesso!';
              btnSubmit.style.backgroundColor = '#10b981'; // Emerald Green
              btnSubmit.style.opacity = '1';
              btnSubmit.style.pointerEvents = 'none'; // Keep disabled after success
            }
          })
          .catch(err => {
            console.error('Erro no webhook:', err);
            if (btnSubmit) {
              btnSubmit.innerHTML = '<i class="ph-fill ph-warning-circle"></i> Erro ao enviar. Tente novamente.';
              btnSubmit.style.backgroundColor = '#f87171'; // Red
              btnSubmit.style.opacity = '1';
              btnSubmit.style.pointerEvents = 'auto'; // Re-enable to retry

              // Revert visual after 3 seconds
              setTimeout(() => {
                btnSubmit.innerHTML = originalBtnText;
                btnSubmit.style.backgroundColor = 'var(--emerald)';
              }, 3000);
            }
          })
          .finally(() => {
            // REDIRECIONAMENTO WHATSAPP DESATIVADO TEMPORARIAMENTE
            // Para reativar, basta remover as duas barras "//" da linha abaixo
            // window.open(waUrl, '_blank', 'noopener');
          });
      });
    }
  })();
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

// ─── MOBILE STICKY — HIDE WHEN PRICING IS VISIBLE OR AT TOP ──────
(function initMobileSticky() {
  const sticky = document.querySelector('.mobile-sticky');
  const pricing = document.getElementById('pricing');
  const footer = document.querySelector('.footer');
  if (!sticky) return;

  const targets = [pricing, footer].filter(Boolean);
  const visibleTargets = new Set();

  const updateSticky = () => {
    if (window.scrollY > 400 && visibleTargets.size === 0) {
      sticky.classList.add('is-visible');
    } else {
      sticky.classList.remove('is-visible');
    }
  };

  if (targets.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          visibleTargets.add(e.target);
        } else {
          visibleTargets.delete(e.target);
        }
      });
      updateSticky();
    }, { threshold: 0 });
    targets.forEach(t => observer.observe(t));
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateSticky();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  updateSticky();
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
