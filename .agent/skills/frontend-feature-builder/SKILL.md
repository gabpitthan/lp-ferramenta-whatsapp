---
name: Frontend Feature Builder
description: Builds conversion-critical landing page features with Conversion Rate Optimization built-in — hero sections, pricing tables, testimonials, CTAs, and interactive elements
---

# Frontend Feature Builder — Componentes de Conversão Enterprise

## Objetivo
Construir componentes de frontend altamente otimizados para conversão — cada feature tem um objetivo de negócio claro e é avaliada por seu impacto em conversão, não apenas pela qualidade técnica.

---

## Biblioteca de Componentes de Alta Conversão

### 1. Hero Section (Componente Mais Crítico)

**Variante A — Product-Led Hero**
```html
<section class="hero" id="hero" aria-labelledby="hero-headline">
  <!-- Eyebrow: badge de novidade ou social proof rápida -->
  <div class="hero__eyebrow" role="doc-subtitle">
    <span class="badge badge--new">🚀 Novo:</span>
    <span>Recurso X lançado — <a href="#feature">ver agora</a></span>
  </div>

  <!-- Headline: máxima clareza, máximo impacto -->
  <h1 class="hero__headline" id="hero-headline">
    <!-- SplitType target para animação progressiva -->
    Feche <span class="text-gradient">3x mais contratos</span><br>
    com automação real
  </h1>

  <!-- Subheadline: expandir benefício + credibilidade -->
  <p class="hero__sub">
    Plataforma de automação comercial usada por +8.000 empresas brasileiras.
    Configuração em 48h, sem precisar de TI.
  </p>

  <!-- CTAs: primary forte + secondary suave -->
  <div class="hero__actions">
    <a href="#signup" class="btn btn--primary btn--lg btn--cta" data-cta="hero-primary"
       id="cta-hero-primary">
      Começar grátis por 14 dias
    </a>
    <a href="#demo" class="btn btn--ghost btn--lg" data-cta="hero-secondary"
       id="cta-hero-secondary">
      <span class="icon-play"></span> Ver demonstração
    </a>
  </div>

  <!-- Micro-copy de remoção de fricção -->
  <p class="hero__microcopy">
    Sem cartão de crédito · Cancele quando quiser · Suporte 24h em português
  </p>

  <!-- Social proof imediata -->
  <div class="hero__proof">
    <div class="avatar-stack" aria-label="Usuários recentes">
      <!-- 4 avatars reais empilhados -->
    </div>
    <p><strong>+8.000 empresas</strong> confiam na plataforma · Avaliação <strong>4.9/5</strong></p>
  </div>
</section>
```

**JavaScript — Hero Animations**
```javascript
// Entrada escalonada dos elementos do hero
const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
const split = new SplitType('.hero__headline', { types: 'words,chars' });

heroTimeline
  .from('.hero__eyebrow', { y: 20, opacity: 0, duration: 0.5 })
  .from(split.words, { y: 60, opacity: 0, stagger: 0.08, duration: 0.8 }, '-=0.2')
  .from('.hero__sub', { y: 30, opacity: 0, duration: 0.6 }, '-=0.4')
  .from('.hero__actions', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
  .from('.hero__microcopy', { opacity: 0, duration: 0.4 }, '-=0.2')
  .from('.hero__proof', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3');
```

---

### 2. Tabela de Preços (Alta Impacto em Conversão)

```html
<section class="pricing" id="pricing" aria-labelledby="pricing-title">
  <h2 id="pricing-title">Escolha o plano ideal</h2>
  <p>Sem surpresas. Sem taxas escondidas.</p>

  <!-- Toggle mensal/anual com desconto -->
  <div class="pricing__toggle" role="group" aria-label="Período de cobrança">
    <button class="toggle-btn active" data-period="monthly">Mensal</button>
    <button class="toggle-btn" data-period="annual">
      Anual <span class="badge badge--discount">-20%</span>
    </button>
  </div>

  <div class="pricing__grid">
    <!-- Plano básico -->
    <article class="pricing-card" aria-label="Plano Starter">
      <header>
        <h3>Starter</h3>
        <div class="pricing-card__price">
          <span class="price__value">R$ 97</span>
          <span class="price__period">/mês</span>
        </div>
        <p>Para quem está começando</p>
      </header>
      <hr>
      <ul class="feature-list">
        <li><span class="icon-check" aria-hidden="true"></span> 1 usuário</li>
        <li><span class="icon-check" aria-hidden="true"></span> 500 contatos</li>
        <li><span class="icon-x text-muted" aria-hidden="true"></span>
            <span class="text-muted">Relatórios avançados</span></li>
      </ul>
      <a href="#signup" class="btn btn--outline btn--full" data-cta="pricing-starter"
         id="cta-pricing-starter">Escolher Starter</a>
    </article>

    <!-- Plano featured (RECOMENDADO) -->
    <article class="pricing-card pricing-card--featured" aria-label="Plano Pro — Mais popular">
      <div class="pricing-card__badge" aria-label="Mais popular">Mais popular</div>
      <header>
        <h3>Pro</h3>
        <div class="pricing-card__price">
          <span class="price__before" aria-label="De">R$ 297</span>
          <span class="price__value">R$ 197</span>
          <span class="price__period">/mês</span>
        </div>
        <p>Para equipes que querem crescer</p>
      </header>
      <hr>
      <!-- features list -->
      <a href="#signup" class="btn btn--primary btn--full btn--lg" data-cta="pricing-pro"
         id="cta-pricing-pro">Começar com Pro</a>
      <p class="pricing-card__guarantee">💳 14 dias grátis · Sem cartão agora</p>
    </article>

    <!-- Plano Enterprise -->
    <article class="pricing-card" aria-label="Plano Enterprise">
      <!-- ... -->
      <a href="#contact" class="btn btn--outline btn--full" data-cta="pricing-enterprise"
         id="cta-pricing-enterprise">Falar com vendas</a>
    </article>
  </div>

  <!-- Comparação completa (collapsible) -->
  <details class="pricing__comparison">
    <summary>Ver comparação detalhada de todos os planos</summary>
    <!-- Tabela comparativa completa -->
  </details>
</section>
```

---

### 3. Testimonials / Social Proof (Componente de Confiança)

```html
<section class="testimonials" id="testimonials">
  <!-- Métricas de impacto (números que impressionam) -->
  <div class="metrics-bar">
    <div class="metric">
      <span class="metric__value" data-counter="8000" data-suffix="+">0</span>
      <span class="metric__label">Empresas ativas</span>
    </div>
    <div class="metric">
      <span class="metric__value" data-counter="4.9">0</span>
      <span class="metric__label">Avaliação média</span>
    </div>
    <div class="metric">
      <span class="metric__value" data-counter="340" data-suffix="M">0</span>
      <span class="metric__label">Mensagens enviadas</span>
    </div>
  </div>

  <!-- Testimonials cards com dados específicos -->
  <div class="testimonials__grid">
    <blockquote class="testimonial-card">
      <div class="testimonial-card__rating" aria-label="5 estrelas">★★★★★</div>
      <p class="testimonial-card__quote">
        "Em 3 meses, aumentamos nossa taxa de resposta de 12% para 78%. 
        <strong>O ROI pagou a ferramenta em 3 semanas.</strong>"
      </p>
      <footer>
        <img src="/testimonials/maria-souza.jpg" alt="" width="48" height="48" loading="lazy">
        <div>
          <cite class="testimonial-card__name">Maria Souza</cite>
          <span class="testimonial-card__role">Head de CS, TechVendas</span>
        </div>
      </footer>
    </blockquote>
    <!-- Mais testimonials... -->
  </div>
</section>
```

**JavaScript — Counter Animation**
```javascript
// Counter animation ao entrar na viewport
const counters = document.querySelectorAll('[data-counter]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseFloat(el.dataset.counter);
      const suffix = el.dataset.suffix || '';
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = (target * eased).toFixed(target % 1 ? 1 : 0) + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));
```

---

### 4. FAQ Accordion (Redução de Objeções)

```html
<section class="faq" id="faq" aria-labelledby="faq-title">
  <h2 id="faq-title">Perguntas frequentes</h2>
  <div class="faq__list" role="list">
    <div class="faq__item" role="listitem">
      <h3>
        <button class="faq__trigger" aria-expanded="false"
                aria-controls="faq-1-answer" id="faq-1-trigger">
          Como funciona o período de teste?
          <span class="faq__icon" aria-hidden="true">+</span>
        </button>
      </h3>
      <div class="faq__answer" id="faq-1-answer" role="region"
           aria-labelledby="faq-1-trigger" hidden>
        <p>...</p>
      </div>
    </div>
  </div>

  <!-- CTA após FAQ -->
  <div class="faq__cta">
    <p>Ainda com dúvidas?</p>
    <a href="#chat" class="btn btn--ghost" data-cta="faq-contact" id="cta-faq-contact">
      Falar com nossa equipe
    </a>
  </div>
</section>
```

**JavaScript — Accordion Acessível**
```javascript
document.querySelectorAll('.faq__trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    const answerId = trigger.getAttribute('aria-controls');
    const answer = document.getElementById(answerId);

    trigger.setAttribute('aria-expanded', !expanded);
    answer.hidden = expanded;

    // Animate height
    if (!expanded) {
      answer.style.height = '0';
      answer.removeAttribute('hidden');
      gsap.to(answer, { height: 'auto', duration: 0.35, ease: 'power2.out' });
    } else {
      gsap.to(answer, {
        height: 0, duration: 0.3, ease: 'power2.in',
        onComplete: () => { answer.hidden = true; answer.style.height = ''; }
      });
    }
  });
});
```

---

## Avaliação de Componentes (Score 1-10)

| Dimensão | Critério de 10/10 |
|---|---|
| **Impacto em Conversão** | Componente tem CTA claro com tracking, reduz fricção |
| **Qualidade Técnica** | Semântico, acessível, performante |
| **Design Fidelidade** | Indistinguível de empresa enterprise |
| **Interatividade** | Animações suaves, estados de hover premium |
| **Acessibilidade** | WCAG 2.1 AA — teclado, aria, contraste |

### Critério de Aprovação
- Todos os CTAs com `data-cta` e `id` únicos para tracking
- Lighthouse Accessibility ≥ 95 no componente isolado
- Keyboard navigation 100% funcional
- Animação respeitando `prefers-reduced-motion`
