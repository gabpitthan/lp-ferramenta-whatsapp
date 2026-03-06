---
name: Optimization
description: Maximizes Core Web Vitals, CRO technical performance, and WCAG compliance — targeting Lighthouse ≥ 95 and sub-1.5s LCP on mobile
---

# Optimization — Performance e CRO Técnico Enterprise

## Objetivo
Maximizar performance técnica, acessibilidade e métricas de conversão. Target mínimo: Lighthouse ≥ 95 em todas as categorias, LCP < 1.5s em mobile 4G, CLS = 0, e WCAG 2.1 AA completo.

---

## Core Web Vitals — Targets e Diagnóstico

| Métrica | Good | Needs Improvement | Poor | Nosso Target |
|---|---|---|---|---|
| LCP | < 2.5s | 2.5-4s | > 4s | **< 1.5s** |
| INP | < 200ms | 200-500ms | > 500ms | **< 100ms** |
| CLS | < 0.1 | 0.1-0.25 | > 0.25 | **= 0** |
| FCP | < 1.8s | 1.8-3s | > 3s | **< 1.2s** |
| TTFB | < 800ms | 800ms-1.8s | > 1.8s | **< 400ms** |

### Diagnóstico por Métrica

**LCP Lento (> 2.5s)**:
- [ ] Imagem hero não tem `fetchpriority="high"` + `loading="eager"`
- [ ] Fonte não está com preload + font-display: swap
- [ ] TTFB alto (servidor lento) — verificar hosting
- [ ] CSS bloqueante acima do fold — extrair critical CSS
- [ ] Imagens não em WebP/AVIF
- Solução: preload LCP element, otimizar imagem, CDN, critical CSS inline

**Alto CLS (> 0.1)**:
- [ ] Imagens sem width/height definidos
- [ ] Fontes causando layout shift (FOIT/FOUT) — usar size-adjust
- [ ] Conteúdo inserido via JS acima do fold sem dimensões reservadas
- [ ] Ads/embeds sem container de tamanho fixo
- Solução: reservar espaço com aspect-ratio CSS, skeleton loaders

**Alto INP (> 200ms)**:
- [ ] Event listeners bloqueantes na main thread
- [ ] JavaScript pesado executando síncronamente no click/input
- [ ] Reflow/repaint excessivo em handlers
- Solução: defer JS não-crítico, usar requestIdleCallback, optimizar handlers

---

## Otimização de Assets

### Imagens (Maior Impacto)
```html
<!-- Hero image — carregar otimizado com prioridade máxima -->
<picture>
  <source srcset="hero-800.avif 800w, hero-1200.avif 1200w, hero-1600.avif 1600w"
          sizes="(max-width: 768px) 100vw, 50vw" type="image/avif">
  <source srcset="hero-800.webp 800w, hero-1200.webp 1200w, hero-1600.webp 1600w"
          sizes="(max-width: 768px) 100vw, 50vw" type="image/webp">
  <img src="hero-1200.jpg" alt="[descritivo específico]"
       width="1200" height="800"
       loading="eager" decoding="sync" fetchpriority="high">
</picture>

<!-- Imagens below-the-fold -->
<img loading="lazy" decoding="async" width="X" height="Y" ...>
```

**Compressão target:**
- AVIF: 70-80% qualidade → tipicamente 50-70% menor que JPEG
- WebP: 80% qualidade → 25-35% menor que JPEG
- JPEG (fallback): 85% qualidade, progressive
- SVG: SVGO para otimizar (remover metadata, simplificar paths)

### Fontes
```html
<!-- No <head>, antes de qualquer CSS -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Preload apenas as variantes críticas -->
<link rel="preload" href="/fonts/inter-variable.woff2" as="font"
      type="font/woff2" crossorigin>
```

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-variable.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap; /* Evita invisibilidade de texto */
  size-adjust: 100%; /* Previne CLS ao trocar de fonte */
}
```

**Estratégia de fonte ideal:**
- Preferir variable fonts (1 arquivo para todos os pesos)
- Self-host fontes críticas (evitar latência de DNS dos Google Fonts)
- Subset: carregar apenas Latin charset se público BR

### JavaScript
```html
<!-- Nunca bloquear parser com scripts no <head> sem defer/async -->
<!-- Scripts de terceiros: sempre defer ou async -->
<!-- Scripts críticos: módulos com type="module" (auto-defer) -->

<!-- Ordem de carregamento ideal: -->
<!-- 1. Critical inline JS (mínimo, < 1KB) -->
<script>/* critical above-fold logic only */</script>

<!-- 2. App principal -->
<script type="module" src="/js/main.js"></script>

<!-- 3. Bibliotecas de animação -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" defer></script>

<!-- 4. Analytics: após load -->
<script>
window.addEventListener('load', () => {
  // Carregar GTM/GA4 aqui
  setTimeout(() => { /* load analytics */ }, 1000);
});
</script>

<!-- 5. Chat/pixels: após interação ou 5s -->
```

### CSS
```html
<!-- Critical CSS: inline no <head> (todo estilo above-the-fold) -->
<style>
/* Reset mínimo + hero + navbar = critical path */
/* Máximo 15KB inline -->
</style>

<!-- Resto do CSS: preload com onload trick -->
<link rel="preload" href="/css/main.css" as="style"
      onload="this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/css/main.css"></noscript>
```

---

## SEO Técnico para Landing Pages

### Estrutura de Tags Obrigatória
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Title: keyword + benefit, 50-60 chars -->
  <title>[Keyword Principal] — [Benefício Central] | [Marca]</title>

  <!-- Meta description com CTA, 150-160 chars -->
  <meta name="description" content="[Dor] → [Solução] → [Resultado]. [Prova social]. [CTA]. Experimente grátis.">

  <!-- Open Graph (critical para social sharing) -->
  <meta property="og:title" content="[Same as title]">
  <meta property="og:description" content="[Same as description]">
  <meta property="og:image" content="https://[domínio]/og-image.png"> <!-- 1200x630px -->
  <meta property="og:url" content="https://[domínio]/[página]">
  <meta property="og:type" content="website">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="[title]">
  <meta name="twitter:description" content="[description]">
  <meta name="twitter:image" content="[og:image]">

  <!-- Canonical -->
  <link rel="canonical" href="https://[domínio]/[página]">
</head>
```

### Schema.org (Structured Data)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "[Nome da Empresa]",
      "url": "https://[domínio]",
      "logo": "https://[domínio]/logo.png",
      "sameAs": ["[LinkedIn]", "[Instagram]", "[Twitter]"]
    },
    {
      "@type": "SoftwareApplication",
      "name": "[Produto]",
      "applicationCategory": "BusinessApplication",
      "offers": { "@type": "Offer", "price": "[preço]", "priceCurrency": "BRL" },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8", "reviewCount": "127"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "[Pergunta]",
          "acceptedAnswer": { "@type": "Answer", "text": "[Resposta]" }
        }
      ]
    }
  ]
}
</script>
```

---

## WCAG 2.1 AA — Checklist de Auditoria

### Percepção
- [ ] Contraste texto normal: ≥ 4.5:1
- [ ] Contraste texto grande (≥ 18pt): ≥ 3:1
- [ ] Contraste UI components (bordas de input, ícones): ≥ 3:1
- [ ] Informação não transmitida APENAS por cor
- [ ] Imagens com alt text descritivo (não "imagem", não vazios em elementos informativos)
- [ ] Imagens decorativas: alt="" e aria-hidden="true"
- [ ] Vídeos: legendas e transcrição disponível
- [ ] Áudio: não reprodução automática; controle de volume

### Operabilidade
- [ ] Todo conteúdo acessível via teclado (Tab, Shift+Tab, Enter, Space, Arrow keys)
- [ ] Nenhuma armadilha de teclado (usuário pode sair de qualquer componente)
- [ ] Focus indicator visível (outline mínimo 3px, contraste 3:1 com fundo)
- [ ] Skip link no topo (#main-content)
- [ ] Modais com focus trap e Escape para fechar
- [ ] Sem timing obrigatório (ou option to extend)
- [ ] Nada que pisca > 3 vezes por segundo
- [ ] Scroll up: link "Voltar ao topo" em páginas longas

### Compreensibilidade
- [ ] `lang` no `<html>` (`lang="pt-BR"`)
- [ ] Formulários: labels visíveis (não apenas placeholder)
- [ ] Error messages: identificam o campo + descrevem o erro + sugerem correção
- [ ] Validação: em tempo real com feedback imediato
- [ ] Autocomplete attributes em campos de dados pessoais

### Robustez
- [ ] HTML válido (W3C validator)
- [ ] ARIA roles corretos (não inventar roles, usar padrões estabelecidos)
- [ ] `aria-expanded`, `aria-controls`, `aria-haspopup` em componentes interativos
- [ ] Componentes customizados seguem APG (ARIA Authoring Practices Guide)

---

## CRO Técnico

### Tracking de Eventos (Obrigatório)
```javascript
// Todos os CTAs com ID único e tracking
document.querySelectorAll('[data-cta]').forEach(el => {
  el.addEventListener('click', () => {
    gtag('event', 'cta_click', {
      cta_location: el.dataset.cta,
      cta_text: el.textContent.trim()
    });
  });
});

// Scroll depth tracking
const scrollMilestones = [25, 50, 75, 90, 100];
// ... IntersectionObserver por seção

// Form engagement
// Form abandonment (beforeunload se formulário iniciado)
// Time on page
// Rage clicks (Microsoft Clarity detecta automaticamente)
```

### A/B Test Setup
- Definir hipótese clara antes de testar
- Variável única por teste (não mudar headline E CTA ao mesmo tempo)
- Mínimo estatístico: 95% confidence, 1000 visitas por variante
- Duração mínima: 2 semanas (capturar variação semanal)
- Ferramentas: Google Optimize (gratuito), VWO, Convert

---

## Avaliação (Score 1-10)

| Dimensão | Target de 10/10 |
|---|---|
| **Core Web Vitals** | Todos no verde (LCP<1.5s, INP<100ms, CLS=0) |
| **Lighthouse Performance** | ≥ 95 |
| **Lighthouse Accessibility** | ≥ 95 (zero erros axe) |
| **Lighthouse SEO** | ≥ 90 |
| **WCAG 2.1 AA** | 100% compliance |
| **CRO Setup** | Todos eventos, heatmap, A/B configurados |

### Critério de Aprovação
- Nenhum Core Web Vital em vermelho
- Lighthouse Performance ≥ 95 (mobile E desktop)
- Zero erros de acessibilidade no axe DevTools
- Todos os CTAs trackados com IDs únicos
