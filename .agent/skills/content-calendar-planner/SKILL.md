---
name: Content Calendar Planner
description: Plans and schedules Instagram carousel posting calendars for the Konnex brand. Distributes carousels across the week/month balancing TOFU/MOFU/BOFU funnel stages, topics, and engagement objectives.
---

# Content Calendar Planner

## Purpose
Create structured monthly/weekly Instagram content calendars using existing carousels from `carrosseis_data.js`. Balance funnel stages, topics, and engagement patterns to maximize organic reach and lead generation.

## Content Mix Strategy

### Weekly Posting Formula (3-4 posts/week recommended)

| Day | Post Type | Funnel Stage | Goal |
|-----|-----------|-------------|------|
| Mon | Educational | MOFU | Start week with value, save-worthy content |
| Wed | Problem-awareness | TOFU | Mid-week reach, identification hook |
| Fri | Conversion / CTA | BOFU | End week with direct offer intent |
| Sat (optional) | Repost/Inspiration | Any | Engagement, community |

### Monthly Balance
- **50% TOFU** — Reach and awareness, bring in new followers
- **30% MOFU** — Education and nurturing, build authority
- **20% BOFU** — Conversion, direct offer, remove objections

## Available Topics (from carrosseis_data.js)

### TOFU Topics (IDs 1-12)
1. Velocidade de Resposta
2. Caos no WhatsApp
3. Follow-Up Ausente
4. Leads Perdidos
5. Equipe Sobrecarregada
6. Organização
7. Atendimento Fora do Horário
8. Disparos em Massa
9. Qualificação Amadora
10. Número Pessoal
11. Sem Métricas
12. Retenção de Cliente

### MOFU Topics (IDs 13-22)
13. CRM na Prática
14. Chatbot com IA
15. Gestão de Atendimento
16. Automação de Follow-Up
17. Integração de Canais
18. Processos Comerciais
19. Agendamento Automático
20. Relatórios e Dados
21. Escala de Vendas
22. Treinamento de Equipe

### BOFU Topics (IDs 23-30)
23. Prova Social
24. Objeção de Preço
25. Proposta Comercial
26. Fechamento de Vendas
27. White-Label
28. ROI de Automação
29. API Oficial Meta
30. Experiência do Cliente

## Calendar Output Format

When generating a monthly calendar, output a markdown table:

```markdown
## Calendário de Conteúdo — [Mês] [Ano]

| Data | Dia | ID Carrossel | Tópico | Funil | Caption Hook |
|------|-----|-------------|--------|-------|-------------|
| 03/03 | Seg | #13 | CRM na Prática | MOFU | "Você tem CRM ou tem uma planilha com esperança?" |
| 05/03 | Qua | #2  | Caos no WhatsApp | TOFU | "4 números de celular. Nenhum histórico." |
| 07/03 | Sex | #28 | ROI de Automação | BOFU | "R$2.400/mês desperdiçado. Só no atendimento manual." |
```

## Posting Schedule Guidelines

### Best Times to Post (Brazil timezone)
- **Weekdays**: 08:00–10:00 or 18:00–21:00
- **Weekend**: 10:00–12:00

### Spacing Rules
- Minimum 1 day between posts
- Never post 2 consecutive BOFU carousels
- Alternate heavy-text and visual-heavy slides (MYTH slides are more visual)
- Use TOFU carousels after any gap or silence (re-introduce to new followers)

## Sequencing Rules

1. **Never repeat the same topic** in the same week
2. **BOFU always after TOFU/MOFU** — never open a cold week with BOFU
3. **Follow-Up topics pair well** — Leads Perdidos (TOFU) followed by Automação de Follow-Up (MOFU) the same week creates a natural story arc
4. **End of month push** — Final week can be heavier on BOFU (ROI, Objeção de Preço, CTA carousels)

## Generating a Calendar

When asked to generate a calendar, ask for or assume:
- Duration: 1 week / 2 weeks / 1 month
- Frequency: 3, 4, or 5 posts/week
- Any upcoming promotions or campaigns to align with

Then:
1. Select carousel IDs that haven't been recently posted (if history is available)
2. Apply the weekly formula and TOFU/MOFU/BOFU balance
3. Generate the markdown calendar table
4. For each post, include a suggested caption hook (first line only) from the carousel content
5. Flag any gaps where new content needs to be generated

## Content Performance Notes

When the user reports engagement metrics, record:
- Which carousel ID had best/worst performance
- Engagement type (saves = educational value, comments = provocative topic, shares = relatable pain)
- Use this to inform future calendar prioritization (high-save topics → more MOFU; high-comment topics → more TOFU pain points)
