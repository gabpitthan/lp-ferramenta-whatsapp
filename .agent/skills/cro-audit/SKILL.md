---
name: CRO Audit
description: Professional conversion rate optimization audit — identifies friction, missed opportunities, and gives prioritized fixes with expected conversion lift
---

# CRO Audit — Auditoria de Otimização de Conversão

## Objetivo
Auditar landing pages de forma profissional como uma consultoria CRO enterprise faria (estilo CXL Institute, ConversionXL). Identificar pontos de fricção, oportunidades perdidas e entregar um plano de ação priorizado com impacto esperado em cada item.

---

## Framework de Auditoria (8 Dimensões)

### Dimensão 1 — First Impression (Primeiros 3 Segundos)
**Perguntas de auditoria:**
- Um visitante novo consegue responder em 3s: O que é? Para quem? Por que me importar?
- O visual é profissional e inspira confiança imediata?
- Há algo que distrai antes do usuário entender a proposta de valor?
- A hierarquia visual leva o olho para a headline → CTA em sequência natural?

**Critérios de aprovação:**
- [ ] Proposta de valor clara em <3 segundos (teste com usuários reais de 5 segundos)
- [ ] Design nível empresa estabelecida — não confundível com template
- [ ] Sem pop-ups, modais ou distrações nos primeiros 30 segundos
- [ ] Logo reconhecível e posicionado no canto superior esquerdo

---

### Dimensão 2 — Above the Fold
**Perguntas:**
- O CTA principal está visível sem rolar? Em desktop E mobile?
- A headline comunica o maior benefício (não o nome do produto)?
- Há prova social visível acima do fold (logos, números, stars)?
- O visual de hero representa o produto EM USO (não ilustração vaga)?

**Red flags críticos:**
- CTA acima do fold com cor que não contrasta com o fundo
- Headline descrevendo o produto em vez de o resultado para o cliente
- Hero image genérica (tipo "pessoas sorrindo em laptop branco")
- Nenhuma indicação de credibilidade acima do fold

---

### Dimensão 3 — Copy e Messaging
**Pontos de auditoria:**
- Headlines orientadas a benefício (não feature)?
- Linguagem do cliente (VOC) ou jargão corporativo?
- Cada seção tem um único trabalho a fazer?
- Copy passa no teste de "e daí?" (cada claim justificado com prova)?

**Scoring de copy:**
```
Para cada seção, verificar:
□ Headline — orienta benefício?
□ Body — linguagem do cliente?
□ CTA — específica com verbo + benefício?
□ Micro-copy — remove objeção?
Score: X/4 por seção
```

---

### Dimensão 4 — Prova Social
**Hierarquia de prova social (1=mais fraco, 5=mais forte):**
1. Número genérico sem contexto ("Mais de 1000 clientes")
2. Logo wall sem contexto adicional
3. Depoimento sem foto/cargo/empresa real
4. Depoimento completo com resultado
5. Case study com métricas verificáveis + logo de empresa conhecida

**Checklist:**
- [ ] Depoimentos têm foto real, nome completo, cargo, empresa?
- [ ] Depoimentos incluem resultado específico e mensurável?
- [ ] Logos de clientes são reconhecíveis para o ICP?
- [ ] Avaliações externas linkam para fonte verificável (G2, Capterra)?
- [ ] NPS score ou avaliação média com número de avaliações visível?

---

### Dimensão 5 — Friction Points (Pontos de Fricção)
**Checklist de fricção:**
- [ ] Formulários pedem mais que 5 campos? (cada campo extra → -11% conversão)
- [ ] Formulário exige informação antes de mostrar valor?
- [ ] CAPTCHA visível? (→ -15% conversão média)
- [ ] Muitas opções de navegação distraem do CTA principal?
- [ ] Pop-up aparece antes do usuário ver a proposta de valor?
- [ ] Preços escondidos ou pouco claros?
- [ ] CTAs com texto genérico (Enviar, Clique aqui)?
- [ ] Ausência de garantia ou trial sem risco?
- [ ] Múltiplos CTAs competindo pelo clique na mesma área?

---

### Dimensão 6 — Confiança e Credibilidade
**Elementos de trust:**
- [ ] HTTPS com certificado válido
- [ ] Endereço físico / CNPJ visível no footer (mercado BR)
- [ ] Política de privacidade linkada (LGPD compliance)
- [ ] Links para redes sociais com presença ativa
- [ ] Menções na imprensa ("Como visto na...")
- [ ] Prêmios / certificações relevantes
- [ ] Fotos reais da equipe (humaniza a empresa)
- [ ] Tempo de empresa / ano de fundação (longevidade = confiança)

---

### Dimensão 7 — Mobile Experience
**Auditoria mobile (375px) obrigatória:**
- [ ] CTA visível sem rolar (ou sticky bottom bar)
- [ ] Hero legível sem zoom (16px body mínimo)
- [ ] Tap targets ≥ 48x48px
- [ ] Formulários com teclado correto (type="email", inputmode="numeric")
- [ ] Imagens não distorcem layouts
- [ ] Menus mobile funcionais e acessíveis
- [ ] Load time mobile <3s em 4G (PageSpeed ≥ 90)

---

### Dimensão 8 — Análise de Jornada e Funil
**Mapeamento:**
1. Visitor → Scroll (onde para de rolar?)
2. Scroll → Click CTA (que CTA performa melhor?)
3. Click → Form Fill (qual campo causa abandono?)
4. Form Fill → Confirmation (mensagem de confirmação é clara?)

**Ferramentas de diagnóstico:**
- Hotjar / Microsoft Clarity: heatmaps + session recordings
- GA4: scroll depth, click events, funnel exploration
- Lighthouse: performance, accessibility, SEO
- axe DevTools: acessibilidade detalhada
- WAVE: validação WCAG

---

## Relatório de Auditoria (Template de Entrega)

```markdown
# CRO Audit Report — [Nome do Site/Projeto]
Data: [data] | Auditado por: [agente]

## Executive Summary
- Score geral de conversão: X/100
- Principal problema identificado: [1 linha]
- Oportunidade de maior impacto: [1 linha]
- Lift estimado com todas as correções: +X%

## Dimensões Auditadas

### Dimensão 1 — First Impression: [Score]/10
**Status:** ✅ Aprovado / ⚠️ Melhorar / ❌ Crítico
**Problemas:**
1. [Problema específico] → Impacto: Alto/Médio/Baixo
**Correção:** [Ação específica com exemplo]

[Repetir para todas as dimensões]

## Plano de Ação Priorizado

| Prioridade | Item | Esforço | Impacto Esperado |
|---|---|---|---|
| 🔴 Crítico | [item] | Baixo/Médio/Alto | +X% conversão |
| 🟡 Alto | [item] | Baixo/Médio/Alto | +X% conversão |
| 🟢 Médio | [item] | Baixo/Médio/Alto | +X% conversão |

## Quick Wins (Implementar em <24h)
1. [Mudança de 1 linha com alto impacto]
2. [Mudança de copy no CTA]
3. [Adicionar elemento de trust simples]
```

---

## Avaliação Final (Score por Dimensão)

| Dimensão | Score 1-10 | Status |
|---|---|---|
| First Impression | | |
| Above the Fold | | |
| Copy e Messaging | | |
| Prova Social | | |
| Friction Points | | |
| Confiança/Trust | | |
| Mobile Experience | | |
| Funil/Jornada | | |
| **TOTAL MÉDIO** | | |

### Critério de Conversão Enterprise
- Score geral ≥ 85/100 (8.5/10 médio)
- Nenhuma dimensão Crítica (❌)
- Mobile experience sempre ≥ 8/10
- Zero friction points não-endereçados no plano de ação
