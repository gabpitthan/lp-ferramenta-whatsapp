---
name: Carousel Content Generator
description: Generates new Instagram carousel content following the canonical Konnex framework structure (COVER → MYTH → CONTENT → CHECKLIST → DETAIL → CTA), with persuasive copy, correct slide types, and proper data structure to append to carrosseis_data.js.
---

# Carousel Content Generator

## Purpose
Generate new carrossel frameworks that follow the **Konnex canonical V2 structure** used in `posts_instagram/generate_1k_carrosseis.js`. This skill ensures every new batch of carrosséis is structurally consistent, brand-aligned, and ready to be inserted into `carrosseis_data.js`.

## Canonical Carousel Structure

Every carrossel must follow this 6-slide sequence:

| # | Slide Type  | Purpose                                  | Required Fields                                          |
|---|-------------|------------------------------------------|----------------------------------------------------------|
| 1 | `COVER`     | Título impactante, gancho principal      | `title`, `imageUrl`                                     |
| 2 | `MYTH`      | Mito vs. Realidade (2 colunas)           | `myth` (erro comum), `truth` (realidade), `imageUrl`    |
| 3 | `CONTENT`   | A revelação / insight central            | `subtitle` (ex: "⚠️ A REALIDADE"), `text`, `imageUrl`   |
| 4 | `CHECKLIST` | Método em 4 passos acionáveis            | `title`, `items` (array com 4 strings), `imageUrl`      |
| 5 | `DETAIL`    | Dois blocos de detalhe + regra de ouro   | `badge1`, `text1`, `badge2`, `text2`, `rule`, `imageUrl`|
| 6 | `CTA`       | Chamada para ação e link na bio          | `heading`, `text`, `imageUrl`                           |

## Framework Data Object

Each carousel must define a `framework` object with these fields:

```javascript
{
    id: [NEXT_AVAILABLE_ID],     // Integer - check carrosseis_data.js for last ID
    topic: "Nome do Tópico",     // Short topic name, used for filtering
    funnel: "TOFU",              // TOFU | MOFU | BOFU
    title: "Título do carrossel que gera curiosidade e dor",
    myth: {
        left: "O erro comum que todos cometem",
        right: "A realidade baseada em dados ou lógica clara"
    },
    insight: "O texto revelador que muda a perspectiva do leitor (2-3 frases)",
    steps: [
        "Passo 1 acionável e específico",
        "Passo 2 com contexto de implementação",
        "Passo 3 relacionado ao Konnex/automação",
        "Passo 4 de mensuração ou resultado"
    ],
    detail1: { badge: "RÓTULO EM MAIÚSCULAS", text: "Texto explicativo rico (2-3 frases)" },
    detail2: { badge: "RÓTULO EM MAIÚSCULAS", text: "Texto sobre como o Konnex resolve" },
    rule: "A regra de ouro – frase curta, impactante, memorável",
    cta: "Chamada para ação clara com menção ao link na bio"
}
```

## Brand Voice Guidelines (Konnex)

- **Tom**: Direto, consultivo, sem rodeios. Fala com o dono/gestor de PME.
- **Linguagem**: Português BR, coloquial sem ser informal demais.
- **Nunca genericizar**: Cada framework deve falar de uma dor específica do mercado.
- **Data e números**: Mencionar números reais aumenta credibilidade (ex: "21x", "65%", "R$2.400/mês").
- **Produto**: Konnex é uma plataforma de automação de WhatsApp + CRM multicanal.

## Funnel Guidance

| Funil | Consciência do Lead     | Objetivo do Carrossel                          | Tom                     |
|-------|-------------------------|------------------------------------------------|-------------------------|
| TOFU  | Não sabe que tem problema | Revelar o problema, gerar identificação       | Provocativo, revelador  |
| MOFU  | Sabe que tem problema   | Educar sobre a solução, mostrar como fazer     | Educativo, consultivo   |
| BOFU  | Considera comprar       | Remover objeções, gerar urgência/prova social  | Convincente, específico |

## Image URL Pattern

```javascript
function img(carouselId, slideIdx) {
    const seeds = ['aurora','nebula','prism','circuit','vertex','cosmos','matrix','forge','signal','horizon','apex','quantum'];
    const seed = seeds[(carouselId * 7 + slideIdx * 3) % seeds.length];
    return `https://picsum.photos/seed/${seed}${carouselId}${slideIdx}/1080/1350`;
}
```

Use this function to generate `imageUrl` for each slide. The `fallbackUrl` can be omitted.

## Caption Generation

After creating a framework, also generate a caption using this structure:

```
📌 [Título sem parênteses]

[Texto do insight principal]

💡 [CTA text do slide 6]

👉 [Escolha um CTA da lista abaixo]

.
.
.
[Hashtags relevantes ao tópico]
```

CTA pool:
- "Arraste os slides para ver como sair dessa. O link está na bio."
- "Se você reconheceu isso, salva o carrossel e compartilha com quem precisa."
- "Quer resolver isso de vez? O link está na bio com a solução."
- "Comenta aqui se isso é uma realidade na sua empresa."
- "Manda esse carrossel pro seu sócio. Urgente."
- "Seguindo para não perder mais conteúdo assim toda semana."

## Output Format

When asked to generate new carrossels, output:

1. **Framework object(s)** — JavaScript object literal ready to be appended to the `frameworks` array in `generate_1k_carrosseis.js`
2. **Instagram caption** — for each carousel, in the format above
3. **Category suggestion** — If the carousel belongs to a new category (e.g., Clínicas, Jurídico), also suggest the CATEGORY_REGISTRY entry

## Quality Checklist

Before finalizing any carousel, verify:
- [ ] `id` is unique and sequential (check `carrosseis_data.js` for the last ID)
- [ ] Myth left/right are genuinely contrasting and non-trivial
- [ ] Insight is a 2-3 sentence paragraph with surprising or counter-intuitive information
- [ ] Steps are 4 items, all actionable and specific (not vague)
- [ ] `detail2` mentions Konnex explicitly
- [ ] Rule of gold is short, impactful, Tweet-friendly
- [ ] CTA ends with "link na bio" or "link da bio"
- [ ] All fields are in Portuguese BR
