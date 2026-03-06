---
name: Caption Optimizer
description: Generates and optimizes Instagram captions and hashtag sets for Konnex carousel posts. Uses topic-specific hashtag banks, CTA variations, and engagement hooks to maximize reach and conversion.
---

# Caption Optimizer

## Purpose
Generate, refine, and optimize Instagram captions for the Konnex carousel posts. Captions should hook attention in the first line, provide standalone value, include a strong CTA, and end with a strategic hashtag block.

## Caption Architecture

### Anatomy of a High-Converting Caption

```
[HOOK LINE] — Makes the reader stop scrolling
             ↓
[PROBLEM/VALUE BODY] — 2-4 sentences expanding on the carousel topic
             ↓
[INSIGHT/QUOTE] — Optional memorable line from the carousel content
             ↓
[SOFT CTA] — Directs to carousel interaction or link
             ↓
[LINE BREAKS — spacers]
.
.
.
[HASHTAGS] — 8-12 relevant hashtags
```

### Hook Templates (first line variants)

- `📌 [Título direto do carrossel]`
- `⚠️ [Dado surpreendente ou erro comum]`
- `🔴 [Pergunta que gera dor/identificação]`
- `💡 [Insight contra-intuitivo]`
- `📊 [Estatística impactante]`

## Existing Hashtag Bank

The project uses topic-specific hashtags. Current mapping from `carrosseis.js`:

| Topic                  | Hashtag Set |
|------------------------|-------------|
| Vendas Perdidas        | `#vendas #comercial #whatsapp #atendimento #automacaocomercial #crm #faturamento #negócios #empreendedorismo #gestaocomercial` |
| Caos no WhatsApp       | `#whatsapp #whatsappbusiness #atendimento #automacao #gestao #organizacao #digital #negócios #empreendedor #comunicacaodigital` |
| Atendimento Lento      | `#atendimento #customerexperience #cx #experienciadocliente #automacao #qualidade #negócios #empreendedorismo #whatsapp #clientes` |
| Falta de Follow-Up     | `#followup #vendas #crm #automacao #negócios #comercial #gestao #produtividade #faturamento #digital` |
| Equipe Sobrecarregada  | `#gestao #equipes #lideranca #automacao #produtividade #negócios #empreendedorismo #rh #processos #eficiencia` |
| Respostas Repetitivas  | `#automacao #whatsapp #produtividade #processos #negócios #empreendedor #digital #gestao #eficiencia #escalabilidade` |
| Leads Ignorados        | `#leads #conversao #trafegoago #marketing #automacao #negócios #gestao #vendas #digital #empreendedorismo` |
| Sem Organização        | `#organizacao #gestao #processos #digital #automacao #negócios #crm #produtividade #empreendedor #lideranca` |
| Escala Impossível      | `#escala #crescimento #automacao #negócios #gestao #empreendedorismo #digital #processos #eficiencia #vendas` |
| Disparos em Massa      | `#marketingdigital #whatsapp #email #automacao #disparos #digital #gestao #negócios #empreendedorismo #crm` |
| Qualificação de Leads  | `#leads #funil #crm #vendas #automacao #comercial #negócios #empreendedorismo #conversao #marketing` |
| Gestão de Equipe       | `#gestao #lideranca #equipes #rh #automacao #produtividade #negócios #empreendedorismo #processos #digital` |
| DEFAULT                | `#automacao #whatsapp #negócios #gestao #empreendedorismo #atendimento #vendas #digital #crescimento #escalabilidade` |

## CTA Variations Pool

Rotate through these to avoid repetition:

- `👉 Arraste os slides para ver como sair dessa. O link está na bio.`
- `👉 Se você reconheceu isso, salva o carrossel e compartilha com quem precisa.`
- `👉 Quer resolver isso de vez? O link está na bio com a solução.`
- `👉 Comenta aqui se isso é uma realidade na sua empresa.`
- `👉 Manda esse carrossel pro seu sócio. Urgente.`
- `👉 Seguindo para não perder mais conteúdo assim toda semana.`
- `👉 Quer saber como implementar isso? Comenta "QUERO" aqui embaixo.`

## Caption Templates by Funnel Stage

### TOFU — Top of Funnel (Consciousness)
```
📌 [Título]

[Descreva o problema de forma que o leitor se identifique imediatamente.]
[Uma frase sobre o custo oculto de ignorar esse problema.]

💡 [A regra de ouro do carrossel]

👉 [CTA do pool]

.
.
.
[hashtags específicos do tópico]
```

### MOFU — Middle of Funnel (Education)
```
📌 [Título]

[Explique a solução de forma técnica mas acessível.]
[Mencione o método ou framework do carrossel.]

💡 [Insight do detail slide]

👉 [CTA do pool]

.
.
.
[hashtags específicos do tópico]
```

### BOFU — Bottom of Funnel (Conversion)
```
📌 [Título]

[Dados concretos ou caso de uso específico.]
[Custo de NÃO agir.]

💡 [Prova ou resultado numérico]

👉 [CTA direto para o link da bio]

.
.
.
[hashtags com intenção de compra]
```

## Adding New Hashtags

When generating captions for new topics not in the existing bank, create a new hashtag set following these rules:

1. **8-12 hashtags** — no more, no less
2. **Mix of sizes**: 2 broad (#vendas), 4 mid-size (#automacaowhatsapp), 2 niche (#konnex #atendimentoautomatizado)
3. **All lowercase**, no spaces in hashtags
4. **No accents** in hashtags for maximum compatibility
5. **Portuguese BR** first, add English only if the topic is global

When adding new hashtags, also add the new mapping entry to the `hashtagByCarouselTopic` object in `carrosseis.js`.

## Quality Checklist

Before finalizing any caption:
- [ ] First line works as a standalone hook (would stop the scroll)
- [ ] Body is 2-4 sentences max, high information density
- [ ] CTA varies from the previous post (don't repeat the same CTA twice in a row)
- [ ] Hashtag set matches the topic (use DEFAULT only if no specific set exists)
- [ ] Caption does not sound like an ad — it sounds like valuable content
- [ ] Total caption length: 200-600 characters (excluding hashtags)
- [ ] Spacers (`.`) properly separate hashtag block from caption body
