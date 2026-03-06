# Gotchas — Erros que Destroem Conversão em Landing Pages

> Verificar esta lista OBRIGATORIAMENTE antes de qualquer entrega.
> Baseado em dados de CXL Institute, Baymard, Nielsen Norman Group e análise competitiva.

---

## CTA e Copy

### GOT-001: CTA genérico
**Sintoma:** Botão com texto "Saiba mais", "Enviar", "Clique aqui", "Submit", "Cadastrar"
**Impacto:** -40% CTR vs CTA específico com verbo + benefício
**Fix:** `[Verbo forte] + [meu/minha] + [benefício específico]`
- ❌ "Saiba mais"
- ✅ "Começar meu teste grátis de 14 dias"
**Fonte:** ConversionXL studies, Unbounce benchmark 2023

---

### GOT-002: Headline descrevendo o produto, não o resultado
**Sintoma:** Headline é o nome do produto, tagline vaga, ou descrição de feature
**Impacto:** Bounce rate >70% (vs 35-40% com headline orientada a resultado)
**Fix:** `[Resultado específico] para [ICP] em [tempo/condição]`
- ❌ "Whazing — A plataforma de automação de WhatsApp"
- ✅ "Feche 3x mais contratos com automação de follow-up em WhatsApp"
**Fonte:** Heatmap studies — usuários decidem em 3s pela headline

---

### GOT-003: Subheadline repetindo a headline
**Sintoma:** Sub diz a mesma coisa com outras palavras sem adicionar prova ou contexto
**Impacto:** Perda de oportunidade de expandir o argumento e reduzir friction
**Fix:** Sub deve responder "como?" ou adicionar prova implícita (número, empresa, tempo)
- ❌ Sub: "Nossa plataforma ajuda você a automatizar seu WhatsApp de forma eficiente"
- ✅ Sub: "Usado por +8.000 empresas brasileiras. Configuração em 48h, sem precisar de TI."

---

### GOT-004: Benefícios listados como features técnicas
**Sintoma:** Lista de features sem tradução para benefício do cliente
**Impacto:** ICP não técnico não entende o valor — abandona a página
**Fix:** Sempre Feature → Benefício. "O que isso significa para você?"
- ❌ "API RESTful com 99.9% de uptime"
- ✅ "Integre com qualquer sistema sem depender de TI — disponível 99.9% do tempo"
**Fonte:** Princípio B2F (Benefits to Features), Copyhackers

---

### GOT-005: Micro-copy ausente abaixo do CTA
**Sintoma:** CTA principal sem linha de remoção de fricção abaixo
**Impacto:** +17% conversão adicionando "Sem cartão de crédito" abaixo do CTA
**Fix:** Sempre adicionar 1 linha de reassurance abaixo de cada CTA principal
- "Sem cartão de crédito · Cancele quando quiser · Suporte em português"
**Fonte:** Baymard Institute — form friction studies

---

## Design Visual

### GOT-006: Gradiente roxo-magenta genérico no hero
**Sintoma:** Background hero é gradiente roxo-rosa ou azul-roxo saturado sem propósito de marca
**Impacto:** Parece template gratuito do Webflow/WordPress — zero credibilidade enterprise
**Fix:** Usar uma das alternativas de hero background premium:
- Mesh gradient com cores de marca (não violeta genérico)
- Dark + noise/grain texture overlay
- Grid de linhas perspectivadas
- Blur orbs com cores calibradas à identidade
**Referência Anti:** Qualquer site criado com template "Saas Landing Page Free"

---

### GOT-007: Stock photo genérica no hero
**Sintoma:** Imagem de "pessoa sorrindo em laptop branco" ou "equipe feliz em escritório"
**Impacto:** -43% confiança vs produto real em uso (Nielsen Norman Eye-Tracking)
**Fix:** Usar screenshot real do produto EM USO, ou mockup do produto com dados reais
- Se não há produto pronto: usar composição abstrata premium (geometric, motion)
- NUNCA usar Unsplash landscape + overlay com texto

---

### GOT-008: Sombra cinza genérica em cards
**Sintoma:** `box-shadow: 0 2px 8px rgba(0,0,0,0.1)` aplicada igual em todos os cards
**Impacto:** Cards parecem "template" — não há sensação de profundidade ou marca
**Fix:** Sombras com cor (colored shadows) baseadas na cor primária de marca
```css
box-shadow: 0 20px 60px rgba([brand-rgb], 0.25), 0 4px 12px rgba(0,0,0,0.1);
```

---

### GOT-009: Hierarquia visual ausente — tudo competindo por atenção
**Sintoma:** Hero com 4+ elementos em tamanho/peso similar — headline, sub, badge, social proof, imagem, CTA duplo todos "importantes"
**Impacto:** Usuário não sabe onde olhar — paralisia de análise
**Fix:** 1 elemento dominante por seção. Hierarquia clara pelo tamanho:
- Headline: 56-72px e mais pesado
- Sub: 18-20px e mais claro
- CTA: cor mais saturada da página
- Resto: suporte, não destaque

---

### GOT-010: Fontes padrão do sistema sem personalidade
**Sintoma:** Usar apenas `-apple-system, sans-serif` ou Arial/Helvetica
**Impacto:** Percepção de produto inacabado ou genérico
**Fix:** Usar combinação de fontes premium com Google Fonts ou variable font auto-hospedada
- Clash Display / Fraunces / Cabinet Grotesk (display)
- Inter / Plus Jakarta Sans / Satoshi (body)

---

## Prova Social

### GOT-011: Depoimento sem identidade verificável
**Sintoma:** "Ótimo produto! Recomendo! — J.S."
**Impacto:** 71% dos usuários ignoram depoimentos sem foto/cargo/empresa (Spiegel Research)
**Fix:** Foto real + Nome completo + Cargo + Empresa + Resultado mensurável
- ✅ "Reduzimos o churn em 34% no primeiro trimestre. — Maria Souza, Head de CS, TechVendas"

---

### GOT-012: Logo wall com logos de empresas desconhecidas para o ICP
**Sintoma:** Logos de empresas que o visitante nunca ouviu falar
**Impacto:** Zero efeito de halo de credibilidade
**Fix:** Usar logos de marcas reconhecíveis pelo ICP específico
- Se não há logos famosos: usar métricas reais ("8.000+ empresas") em vez de logo wall vazio

---

### GOT-013: Número de usuários/clientes sem contexto
**Sintoma:** "+1000 clientes" sem especificidade
**Impacto:** Parece inventado — não gera confiança
**Fix:** Adicionar contexto: "+1.000 pequenas empresas brasileiras no setor de [nicho]"
- Ou: detalhar o que os clientes alcançaram: "8.000 empresas que fecham negócios mais rápido"

---

## Fricção e UX

### GOT-014: Formulário pedindo mais de 5 campos na primeira conversão
**Sintoma:** Form de lead com nome + sobrenome + email + telefone + empresa + cargo + CNPJ
**Impacto:** Cada campo extra reduz conversão ~11% (Baymard Institute)
**Fix:** Minimalismo progressivo — pedir apenas email na primeira conversão, coletar o resto depois
- Máximo 3 campos para lead: nome + email + [1 campo qualificador]

---

### GOT-015: CAPTCHA visível
**Sintoma:** Google reCAPTCHA v2 visível ("Não sou um robô" checkbox)
**Impacto:** -15% conversão média (Moz estudos)
**Fix:** Usar hCaptcha invisible ou Cloudflare Turnstile invisible
- Proteção de bot sem fricção para o usuário

---

### GOT-016: Preço sem ancoragem
**Sintoma:** Mostrar apenas o plano mais barato ou único plano
**Impacto:** Sem referência, qualquer preço parece caro
**Fix:** Mostrar plano mais caro primeiro (ancoragem) + comparar com alternativa cara
- "Menos que 1 funcionário CLT por mês" / "Economize R$XX vs [alternativa]"

---

### GOT-017: Mobile sem CTA acessível sem rolar
**Sintoma:** Hero mobile exige scroll de 2+ screens para chegar ao CTA
**Impacto:** >50% dos visitantes mobile não chegam ao CTA (Hotjar data)
**Fix:** CTA visível above-the-fold no mobile, ou sticky bottom bar
```html
<div class="mobile-sticky-cta" aria-hidden="false">
  <a href="#signup" class="btn btn--primary">Começar grátis</a>
</div>
```

---

## Técnico

### GOT-018: Animações sem prefers-reduced-motion
**Sintoma:** Animações GSAP/CSS sem fallback para users com vestibular disorders
**Impacto:** WCAG 2.3.3 falha — acessibilidade comprometida + potencial crise para usuários
**Fix:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; }
}
```

---

### GOT-019: Imagens sem dimensões explícitas (CLS)
**Sintoma:** `<img src="...">` sem `width` e `height` no HTML
**Impacto:** CLS (Cumulative Layout Shift) — penaliza Core Web Vitals e UX
**Fix:** SEMPRE declarar width e height no img element, mesmo que redimensionado por CSS
```html
<img src="hero.webp" alt="..." width="1200" height="800" loading="lazy">
```

---

### GOT-020: Hero image sem fetchpriority
**Sintoma:** Imagem hero com `loading="lazy"` ou sem `fetchpriority="high"`
**Impacto:** LCP alto (>2.5s) — penaliza SEO e UX
**Fix:**
```html
<img src="hero.webp" alt="..." width="1200" height="800"
     loading="eager" fetchpriority="high">
```

---

## Como Usar Este Arquivo

1. **Antes de qualquer output**: ler os GOTs relevantes para a fase (copy, design, código)
2. **Ao finalizar**: rodar checklist rápido dos 20 GOTs acima
3. **Ao encontrar novo erro recorrente**: adicionar novo GOT no final com sintoma + impacto + fix
4. **Knowledge base**: GOTs com fix aplicado são candidatos a padrões positivos a adotar

---

*Última atualização: 2026-02-24*
*Total: 20 gotchas documentados*
