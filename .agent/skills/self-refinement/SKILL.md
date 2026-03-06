---
name: Self Refinement
description: Self-evaluates outputs against Fortune 500 landing page benchmarks with structured convergence loops and measurable quality gates
---

# Self Refinement — Loops de Converção Enterprise

## Objetivo
Avaliar outputs de landing page contra benchmarks de empresas enterprise (Stripe, Linear, Vercel, Notion) e iterar com critérios objetivos até atingir qualidade de publicação comercial. Zero output "bom o suficiente" — o padrão é "seria publicado por uma empresa listada em bolsa?"

---

## Pergunta de Ouro (Avaliar em Cada Iteração)
> **"Uma empresa listada na B3 ou NYSE publicaria exatamente isto sem modificações?"**

Se a resposta for não, ou nem certeza, iterar obrigatoriamente.

---

## Scorecard Enterprise (Avaliar Cada Dimensão 1-10)

| Dimensão | Peso | Critério de 10/10 |
|---|---|---|
| **Clareza da Proposta de Valor** | 25% | Qualquer pessoa entende o que é, para quem e por que em <5s |
| **Qualidade Visual** | 20% | Nível Stripe/Linear/Vercel — não confundível com template |
| **Copy de Conversão** | 20% | VOC, benefícios específicos, CTAs com verbo + benefício |
| **Prova Social** | 15% | Múltiplas camadas, específica, verificável |
| **Performance Técnica** | 10% | Core Web Vitals verde, Lighthouse ≥ 95 |
| **Acessibilidade** | 10% | WCAG 2.1 AA — zero erros no axe |

**Score composto = Σ (score × peso)**
**Target mínimo = 9.0/10 composto**

---

## Processo de Iteração

### Iteração 1 — Baseline
1. Produzir primeira versão completa
2. Aplicar scorecard acima a cada dimensão
3. Identificar a dimensão com score mais baixo
4. Documentar: [Dimensão] → [Score] → [Por que está abaixo] → [3 ações específicas]

### Iteração 2-N — Melhoria Focada
Para cada iteração:
1. Focar apenas na dimensão mais fraca
2. Implementar as 3 ações específicas identificadas
3. Re-avaliar APENAS a dimensão melhorada
4. Verificar se houve regressão em outras dimensões
5. Delta mínimo esperado: +0.5 por dimensão por iteração

### Critério de Convergência
- Score composto ≥ 9.0/10 → aprovado para publicação
- Nenhuma dimensão individual < 7/10
- Se após 5 iterações não convergiu → escalar com relatório detalhado

---

## Checklist de Qualidade Pré-Entrega

### Copy
- [ ] Headline: clara em <5s para um estranho?
- [ ] Benefícios antes de features em todas as seções?
- [ ] Nenhum CTA genérico (Enviar, Clique aqui, Saiba mais)?
- [ ] Micro-copy remove a principal objeção em cada CTA?
- [ ] Tom: confiante, não defensivo; especialista, não vendedor?

### Design
- [ ] Não confundível com template de mercado?
- [ ] Hierarquia visual clara em cada seção (1 elemento dominante)?
- [ ] Espaçamento consistente com design system?
- [ ] Animações suaves, 60fps, e sem distrair do conteúdo?
- [ ] Mobile: impecável em 375px?

### Técnico
- [ ] Lighthouse Performance ≥ 95 (mobile e desktop)?
- [ ] Lighthouse Accessibility ≥ 95?
- [ ] Todos os CTAs com data-cta e ID únicos?
- [ ] Imagens com alt, width, height, loading corretos?
- [ ] prefers-reduced-motion implementado em todas as animações?

### Conversão
- [ ] CTA acima do fold visível sem rolar?
- [ ] Prova social presente nos primeiros 2 blocos?
- [ ] Objeções principais respondidas no FAQ?
- [ ] Garantia ou trial sem risco visível próximo ao CTA de compra?
- [ ] Mobile: CTA acessível sem rolar até o fim?

---

## Delta Log (Documentar para Knowledge Base)

```
Iteração: 1 → 2
Dimensão melhorada: Copy de Conversão (6.5 → 8.0)
Ações tomadas:
  1. Reescreveu headline com resultado específico (+34%)
  2. Adicionou VOC na seção de problema
  3. CTAs mudadas de "Saiba mais" para "Começar grátis agora"
Regressões: Nenhuma
Score composto anterior: 7.8 → Score atual: 8.4
```

---

## Benchmarks de Comparação Final

Antes de aprovar, comparar com estas referências:

| Aspecto | Benchmark de Referência |
|---|---|
| Design visual | stripe.com, linear.app, raycast.com |
| Copy de hero | basecamp.com, intercom.com |
| Pricing section | monday.com, pipedrive.com |
| Social proof | hubspot.com, loom.com |
| Performance | PageSpeed Insights score ≥ 95 |
| Acessibilidade | WAVE + axe: zero erros |

"Se colocasse meu output ao lado da referência, qual empresa parece mais profissional?"
Se não for empate ou vantagem → iterar mais.
