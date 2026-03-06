---
name: Git Commit Formatter
description: Formats commits with improvement notes and quality deltas
---

# Instruções

## Objetivo
Formats commits with improvement notes and quality deltas.

## Passos
1. Analise o contexto e requisitos do task
2. Execute a função primária com foco em qualidade
3. Aplique avaliação multi-camada
4. Iterar se score médio < 9/10 (max 5 iterações)
5. Salve resultados na knowledge base

## Avaliação Multi-Camada
| Dimensão | Score 1-10 | Critérios |
|----------|-----------|-----------|
| Criatividade | | Elementos únicos e surpreendentes? |
| Usabilidade | | Intuitivo, acessível, WCAG compliant? |
| Originalidade | | Diferente de soluções genéricas? |
| Qualidade | | Robusto, performante, bem testado? |

## Auto-Melhoria
- Se score médio < 9/10: identificar dimensão mais fraca e focar melhoria
- Delta mínimo por iteração: 10%
- Max 5 iterações antes de escalar
- Knowledge base: salvar (input → output → scores → melhorias) para aprendizado

## Prompt Claude (Boost Criativo)
```
Analise este output de [Git Commit Formatter] para o projeto Whazing. Score 1-10 em criatividade, usabilidade, originalidade. Sugira 3 melhorias listando impacto esperado no score.
```

## Métricas de Saída
- scores: {criatividade, usabilidade, originalidade, qualidade}
- iterations_count, convergence_achieved (bool), delta_log
