---
name: UI/UX Design
description: Focuses on conversion psychology, Nielsen heuristics, CXL research, Baymard Institute patterns, and persona-driven journey optimization
---

# UI/UX Design — Psicologia de Conversão Aplicada

## Objetivo
Projetar experiências de usuário que maximizam conversão aplicando psicologia comportamental, princípios de design centrado em evidências (CXL Institute, Baymard Institute, Nielsen Norman Group), e testes com personas simuladas de alta fidelidade.

---

## Framework de UX para Conversão

### Princípios Psicológicos de Persuasão (Cialdini + Comportamento Digital)
1. **Reciprocidade**: oferecer valor real antes de pedir (free tool, guide, trial)
2. **Comprometimento/Consistência**: micro-sim antes do macro-sim (opt-in progressivo)
3. **Prova Social**: mostrar o que outros iguais ao visitante fazem
4. **Autoridade**: credenciais, prêmios, menções na mídia, parceiros conhecidos
5. **Escassez/Urgência**: limitar vagas ou tempo — NUNCA fake urgency (mata confiança)
6. **Afeição**: tom humano, rostos reais, storytelling autêntico
7. **Unidade**: "nós", comunidade, pertencimento ao grupo de sucesso

### Vieses Cognitivos Aplicáveis
- **Efeito de âncora**: mostrar preço mais alto primeiro como referência
- **Efeito de enquadramento**: "Economize R$500" > "Custa R$99/mês"
- **FOMO**: contador de usuários ativos, "X empresas se juntaram esta semana"
- **Lei de Hick**: reduzir opções em momentos de decisão
- **Efeito Von Restorff**: elemento destacado visualmente é mais lembrado
- **Fluência cognitiva**: design simples = mais confiável, mais fácil de comprar

---

## Heurísticas Nielsen — Aplicação para Landing Pages

| # | Heurística | Aplicação Específica em LP |
|---|---|---|
| 1 | Visibilidade do Status | Loading states, form feedback imediato, progress indicators |
| 2 | Match sistema-mundo real | Linguagem do usuário, não jargão técnico; ícones reconhecíveis |
| 3 | Controle e liberdade | Cancelar sem fricção, "Voltar" sempre disponível |
| 4 | Consistência e padrões | Design system aplicado 100% — botões, cores, tipografia |
| 5 | Prevenção de erros | Formulários com máscaras, validação em tempo real |
| 6 | Reconhecimento > Memória | CTAs visíveis sem scroll, navbar sticky, breadcrumbs se necessário |
| 7 | Flexibilidade e eficiência | Atalhos de teclado em formulários, autofill support |
| 8 | Design estético e minimalista | Cada elemento justificado — remover o que não converte |
| 9 | Ajuda para recuperar erros | Error messages claras com instrução de correção |
| 10 | Ajuda e documentação | FAQ inline, chat, tooltips contextuais |

---

## Pesquisa Baymard Institute — Padrões de Formulário e Checkout

Para formulários de lead/cadastro:
- **Máximo 3-5 campos** — cada campo adicional reduz conversão ~11%
- Email antes de nome (menor fricção cognitiva)
- Placeholder como hint, label sempre visível
- Botão submit: texto de ação específico + indicador de segurança abaixo
- Progress indicator para fluxos multi-etapa
- Não usar CAPTCHA visível (reduz conversão ~15%) — usar hCaptcha/Turnstile invisible
- Campos opcionais: marcar como "(opcional)" — não obrigar
- Autocomplete attributes: `name`, `email`, `tel`, `organization`
- Mobile: tipo de input correto (`type="email"`, `inputmode="numeric"`)

---

## Personas de Alta Fidelidade

### Persona 1 — "O Decisor" (B2B)
```
Nome: Ricardo Mendes, 38 anos
Cargo: Head de Marketing / Gerente Comercial
Empresa: PME com 50-200 funcionários
Tech savviness: Intermediário
Dores: ROI difícil de medir, time sobrecarregado, concorrência crescente
Motivações: Resultados mensuráveis, facilidade de implementação, suporte confiável
Objeções: "Já tentei ferramentas assim antes", "Meu time não vai usar", "Custo alto"
Como decide: Pesquisa comparativa, lê reviews, pede demo, precisa de ROI claro
Tempo médio de decisão: 2-6 semanas
```

### Persona 2 — "O Empreendedor" (SMB)
```
Nome: Camila Souza, 31 anos
Cargo: Fundadora / CEO pequena empresa
Empresa: 1-15 funcionários, e-commerce ou serviço local
Tech savviness: Básico-intermediário
Dores: Falta de tempo, custo alto de alternativas, complexidade técnica
Motivações: Crescer vendas, automatizar, economizar tempo
Objeções: "É muito difícil de configurar", "Não tenho tempo para aprender", "Será que funciona para mim?"
Como decide: Indica de amigo, vê conteúdo, quer experimentar sem risco
```

### Persona 3 — "O Avaliador Técnico" (Enterprise)
```
Nome: Bruno Lima, 34 anos
Cargo: Tech Lead / CTO
Empresa: 200+ funcionários
Tech savviness: Avançado
Dores: Segurança, integração com stack existente, vendor lock-in, SLA
Motivações: Robustez, APIs bem documentadas, suporte enterprise, compliance
Objeções: "Tem API bem documentada?", "Como funciona o SLA?", "LGPD compliance?"
Como decide: Analisa docs técnicos, testa API, consulta segurança
```

---

## Jornada do Usuário por Seção

Mapear estado emocional do visitante em cada bloco:

| Seção | Estado Emocional | Objetivo de UX | Gatilho Psicológico |
|---|---|---|---|
| Hero | Neutro/Cético | Capturar atenção em 3s | Clareza + Promessa |
| Problema | "Isso soa familiar" | Validar dor real | Empatia + reconhecimento |
| Solução | "Pode funcionar…" | Gerar esperança | Benefício concreto |
| Como Funciona | "Parece simples" | Reduzir fricção percebida | Facilidade + clareza |
| Social Proof | "Outros usam…" | Construir confiança | Prova Social |
| Preço | "Vale a pena?" | Justificar investimento | Âncora + valor |
| FAQ | "Tenho uma dúvida" | Eliminar objeções | Reciprocidade + autoridade |
| CTA Final | Pronto para decidir | Converter com urgência real | Escassez + comprometimento |

---

## Eye Tracking e Hierarquia Visual

### Padrões de Leitura (F-Pattern e Z-Pattern)
- **F-Pattern**: texto denso — leitura horizontal inicial, depois vertical à esquerda
  - Colocar pontos-chave na primeira linha e primeiras palavras de parágrafos
- **Z-Pattern**: páginas limpas — olho percorre Z do canto superior esquerdo ao inferior direito
  - Logo top-left → Nav top-right → Conteúdo central → CTA bottom-right

### Hierarquia Visual por Peso
1. Contraste de tamanho (headings dominam)
2. Contraste de cor (CTA deve ser o elemento mais saturado/contrastante)
3. Espaço negativo (isolamento cria importância)
4. Movimento (animações direcionam atenção — usar com parcimônia)

### Regra de 3 Segundos (Teste de Clareza)
Alguém novo ao produto, em 3 segundos, deve conseguir responder:
- O que esse produto faz?
- Para quem é?
- Por que devo me importar?

Se não consegue → redesenhar o hero.

---

## Teste de Usabilidade Simulado

Para cada persona, percorrer o seguinte script mental:

**Chegada (0-3s)**: A proposta de valor é clara? O visual é profissional?
**Exploração (3-30s)**: Encontra facilmente o que precisa? Hierarquia guia o olho?
**Interesse (30s-2min)**: Os benefícios são convincentes? A prova social é crível?
**Decisão (2-5min)**: O CTA é claro? Há fricção no formulário? As objeções foram respondidas?
**Conversão**: O formulário é simples? O que acontece depois de submeter?

Documentar fricções encontradas e propor soluções específicas.

---

## Avaliação (Score 1-10)

| Dimensão | Critério de 10/10 |
|---|---|
| **Clareza imediata** | Proposta de valor clara em <3s para qualquer persona |
| **Redução de Fricção** | Zero obstáculo desnecessário entre visitante e conversão |
| **Psicologia de Persuasão** | Múltiplos gatilhos aplicados corretamente sem manipulação |
| **Jornada de Persona** | Cada persona encontra o que precisa sem esforço |
| **Micro-copy e Labels** | Textos de suporte removem dúvida, não criam nova |
| **Acessibilidade Cognitiva** | Legível, escaneable, burden cognitivo mínimo |

### Critério de Aprovação
- Score ≥ 9/10 em todas as dimensões
- Teste de 3 segundos aprovado por todas as personas
- Zero fricções não-resolvidas na jornada de conversão
