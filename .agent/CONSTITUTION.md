# Landing Page Constitution

> **Versão:** 1.0.0 | **Criado:** 2026-02-24
> Todo agente, skill e workflow DEVE respeitar estes princípios. Violações são bloqueadas por gates.

---

## Core Principles

### I. Briefing First (NON-NEGOTIABLE — BLOCK)

Nenhuma landing page é gerada sem briefing estratégico completo.

**Regras:**
- MUST: Antes de qualquer copy, design ou código — completar `lp-briefing/SKILL.md`
- MUST: ICP definido com dores específicas (não genéricas)
- MUST: Proposta de valor única redigida em ≤10 palavras
- MUST: Top 3 objeções identificadas
- MUST NOT: Escrever headline antes de conhecer o ICP

**Gate:** BLOCK se qualquer seção do briefing estiver vazia

---

### II. No Generic Output (NON-NEGOTIABLE — BLOCK)

Todo output deve ser indistinguível de empresa listada em bolsa (B3/NYSE).

**Proibições absolutas:**
- MUST NOT: Gradiente roxo-magenta ou azul-roxo genérico sem propósito estratégico
- MUST NOT: Stock photos de "pessoa sorrindo com laptop em fundo branco"
- MUST NOT: Ilustrações isométricas do Undraw/Storyset sem customização de marca
- MUST NOT: Headline com "solução inovadora", "líder de mercado", "melhor do Brasil" sem prova verificável
- MUST NOT: CTA genérico: "Saiba mais", "Clique aqui", "Enviar", "Submit"
- MUST NOT: Depoimento sem foto real + nome completo + cargo + empresa + resultado mensurável
- MUST NOT: Hero background plano ou gradiente dois-tons saturado sem diferenciação

**Benchmarks de referência (output deve ser comparável):**
- Design: Stripe, Linear, Vercel, Raycast
- Copy: Basecamp, Intercom, Drift
- Performance: Lighthouse ≥ 95

**Gate:** BLOCK se qualquer proibição acima for violada

---

### III. Quality Gate (MUST — BLOCK se crítico)

Todo output passa pelo scorecard antes de ser entregue.

**Scorecard (score 1-10 por dimensão):**

| Dimensão | Peso | Gate |
|---|---|---|
| Clareza da Proposta de Valor | 25% | < 7 = BLOCK |
| Qualidade Visual | 20% | < 7 = BLOCK |
| Copy de Conversão | 20% | < 7 = BLOCK |
| Prova Social | 15% | < 6 = WARN |
| Performance Técnica | 10% | < 8 = WARN |
| Acessibilidade | 10% | < 8 = BLOCK |

**Regras:**
- MUST: Score composto ≥ 9.0/10 para aprovação final
- MUST: Nenhuma dimensão com gate BLOCK abaixo do threshold
- MUST: Mínimo 3 iterações de self-refinement antes de entrega
- MUST NOT: Entregar com qualquer dimensão em BLOCK

**Gate:** BLOCK na entrega se score composto < 8.5/10

---

### IV. Specificity Rule (MUST — WARN se violada)

Todo claim deve ser rastreável a uma prova real.

**Regras:**
- MUST: Números com fonte ("34% de aumento — baseado em estudo XYZ ou caso real")
- MUST: Depoimentos com identidade verificável
- MUST: Features listadas devem existir no produto real
- MUST NOT: "Milhares de clientes" sem número específico
- MUST NOT: "O mais rápido" sem benchmark de comparação
- SHOULD: Cada benefício rastreia para uma feature real

**Gate:** WARN se claim sem prova; BLOCK se claim comprovadamente falso

---

### V. VOC Required (MUST — WARN)

Copy sem pesquisa de linguagem do cliente é copy genérico.

**Regras:**
- MUST: Mínimo 2 fontes de VOC consultadas antes de escrever copy
  - Reviews de concorrentes (G2, Capterra, Google Reviews)
  - Entrevistas/transcrições/grupos do nicho
- MUST: Pelo menos 3 frases reais do cliente incorporadas ou parafraseadas no copy
- SHOULD: Headline derivada de linguagem real do cliente, não jargão corporativo

**Gate:** WARN se VOC não documentado

---

### VI. Mobile First (MUST — BLOCK se crítico)

Mobile não é afterthought — é prioridade.

**Regras:**
- MUST: Toda LP testada em viewport 375px antes de qualquer entrega
- MUST: CTA primário visível sem rolar no mobile (ou sticky bar)
- MUST: Touch targets ≥ 48x48px
- MUST: LCP mobile < 2.5s
- MUST NOT: Entregar LP onde CTA principal não é acessível no mobile sem scroll

**Gate:** BLOCK se CTA não acessível no mobile; WARN se LCP > 2.5s

---

### VII. Workflow Chain (MUST)

Toda LP segue o workflow encadeado de 6 fases. Fase N só começa após Fase N-1 aprovada.

```
Fase 1 — Briefing:   lp-briefing (ICP, VOC, proposta de valor)
Fase 2 — Research:   research-inspiration (benchmarks, DNA extraction)
Fase 3 — Copy:       conversion-copywriting (headlines, CTAs, body)
Fase 4 — Design:     creative-design → ui-ux-design (variantes A/B)
Fase 5 — Code:       coding → frontend-feature-builder (HTML/CSS/JS)
Fase 6 — Audit:      cro-audit → optimization → self-refinement
```

**Gate:** WARN se fase pulada; documentar justificativa

---

## Severity Levels

| Severidade | Comportamento | Uso |
|---|---|---|
| **BLOCK** | Impede entrega — requer correção | NON-NEGOTIABLE e MUST críticos |
| **WARN** | Permite continuar com alerta | MUST não-críticos e SHOULD |
| **INFO** | Apenas registra | Recomendações |

---

## Gotchas Reference

Consultar `.agent/gotchas.md` antes de qualquer output.
Gotchas são erros documentados que destroem conversão — verificação obrigatória.

---

*Landing Page Constitution v1.0.0*
*Briefing First | No Generic Output | Quality Always*
