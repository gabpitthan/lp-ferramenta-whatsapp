# Konnex - Design System & Brand Guidelines (Apresentação Estratégica)

Este documento contém as diretrizes visuais e o Design System aplicado na página inicial (Landing Page) da Konnex. **O objetivo principal deste documento é servir como base e contexto ("prompt") para IAs gerarem uma apresentação estratégica (slides/pitch deck) seguindo rigorosamente a mesma identidade visual, tons, tipografia e sensação estética.**

---

## 1. Identidade e "Mood" (Sensação Visual)
- **Estética Geral:** Moderna, tecnológica, "Premium/Enterprise", minimalista e limpa.
- **Vibe:** Futuro seguro, alta performance, inteligência guiando resultados.
- **Elementos Visuais Chaves:**
  - Uso de **Glassmorphism** (Efeito de vidro fosco, fundos translúcidos com desfoque).
  - **Orbs de Luz (Aurora):** Círculos desfocados (`blur`) no fundo para criar profundidade e ambientação tecnológica.
  - **Bordas finas e sutis:** Uso intenso de bordas translúcidas (`rgba(255, 255, 255, 0.10)`) em fundos escuros, ou cinzas muito claros (`#EDF1F7`) em fundos brancos.
  - **Arredondamento:** Elementos amigáveis porém profissionais, usando cantos arredondados (`20px` para cards, `100px` ou formato "pílula" para botões e tags).
  - **Sombras Sofisticadas:** Sombras longas, suaves e coloridas em botões de destaque (glow esmeralda).

---

## 2. Paleta de Cores (Tokens)

As cores são divididas entre tons gélidos de tecnologia (Navy/Blue) e a cor vibrante de conversão/positividade (Emerald).

### Cor Principal (Marca / Destaque / Conversão)
- **Emerald (Padrão):** `#0A8754`
- **Emerald Light (Brilho/Gradiente):** `#12C87A`
- **Emerald Dark:** `#065C3A`
- **Emerald Glow (Sombras):** `rgba(10, 135, 84, 0.20)`

### Cores de Fundo e Texto (Dark Mode / High Contrast)
- **Navy (Fundo Escuro Principal):** `#0B1628`
- **Navy Mid (Cards Escuros):** `#122040`
- **Blue Light (Apoio):** `#1E3A5F`

### Acento Secundário (Atenção/Notificação)
- **Orange / Laranja:** `#FF6B35`

### Escala de Cinza e Luzes
- **White (Fundo Claro Principal):** `#FFFFFF`
- **Gray 50 (Fundo OFF-White/Sessões):** `#F7F9FC`
- **Gray 100 (Bordas claras):** `#EDF1F7`
- **Gray 200 (Linhas/Divisórias):** `#D8E0EC`
- **Gray 300:** `#B8C8D8`
- **Gray 400 (Textos de apoio muito sutis):** `#8A9BB8`
- **Gray 600 (Textos descritivos claros):** `#4A5E78`
- **Gray 700:** `#2E3F55`
- **Gray 800 (Texto Escuro Principal):** `#1A2638`

---

## 3. Tipografia

- **Títulos e Cabeçalhos (High Impact):**
  - **Fonte:** `Syne` (uma fonte geométrica, exótica e robusta).
  - **Peso:** `800` (ExtraBold).
  - **Uso na Apresentação:** Títulos de slides principais, grandes números de estatísticas (métricas de destaque) e frases de impacto curto. Tracking de letras ligeiramente negativo (`-0.025em`) para parecer conectado e arrojado.

- **Corpo de Texto e Leitura Básica:**
  - **Fonte:** `Inter` (ou fontes padrão de sistema como `-apple-system, sans-serif`).
  - **Uso:** Parágrafos descritivos, subtítulos, legendas. Letra altamente letrável e neutra para contrastar com os títulos expressivos.
  - **Altura de Linha (Line-height):** Alta, cerca de `1.65` para melhorar o "respiro" entre as linhas.

- **Código ou Labels Técnicos:**
  - **Fonte:** `JetBrains Mono` ou `Menlo`.

---

## 4. UI Elements & Componentes para a Apresentação

Se a apresentação for usar elementos gráficos como botões, badges ou caixas, siga isso:

### 4.1. Cards e Caixas de Texto (Estilo "Bento Grid")
A Landing Page usa massivamente a estrutura de "Bento Grid" (malha amendoada com blocos preenchendo a tela).
- **Cards Claros:**
  - Fundo: Branco (`#FFFFFF`).
  - Borda: Fina e cinza claro (`1px solid #EDF1F7`).
  - Canto arredondado: `20px`.
  - Sombra: Muito sutil (`0 2px 12px rgba(0, 0, 0, 0.04)`).
- **Cards Escuros (Destaque/Dark):**
  - Fundo: Navy (`#0B1628`) ou Navy Mid (`#122040`).
  - Borda: `rgba(255, 255, 255, 0.06)`.
- **Cards "Glass"/Featured:**
  - Ideal para enfatizar uma solução de topo. Usa desfoque de fundo (blur de 16px) e uma borda translúcida.

### 4.2. Botões ("Call to Actions")
- **Primário (Estilo Principal):** Formato pílula (100px radius). Fundo usando degradê linear `linear-gradient(135deg, #0A8754, #12C87A)`. É vibrante e tem sombra verde brilhante (glow).
- **Outline/Secundário:** Fundo transparente, texto e borda finas esmeralda (`#0A8754`). Pílula.
- **Ghost (Em fundos escuros):** Fundo translúcido branco (`rgba(255, 255, 255, 0.08)`) com borda suave (`rgba(255, 255, 255, 0.2)`). Letra branca.

### 4.3. Badges, Tags ou "Pills" (Rotuladores)
Muito usado para micro-textos, categorias ou etiquetas.
- **Visual:** Fonte minúscula, `700` (Bold), MAIÚSCULAS, espaçamento entre letras de `3px`.
- **Estilo de Cor:** Texto Esmeralda, fundo verde hiper-translúcido (`rgba(10, 135, 84, 0.07)`), borda Esmeralda translúcida.

---

## 5. Efeitos Visuais Especializados para Slides

**Como replicar o fundo clássico ("Hero Section") da Konnex em um slide de capa ou encerramento:**
1. Fundo liso Dark Navy (`#0B1628`).
2. Uma malha/grid ("Grid Layer") finíssima desenhada no fundo (linhas muito ofuscadas usando transparência de 2%).
3. Bolhas gigantes ("Orbs") totalmente desfocadas (Blur 80-100px).
   - Uma bola verde na diagonal superior direita.
   - Uma bola azul clara ou azul profundo na diagonal inferior esquerda.
   - Uma bolinha sutil laranja espalhada.
4. Texto do Título principal com um gradiente metálico ou verde-claro. (`linear-gradient(135deg, #12C87A, #4ADE80)`).

## 6. Iconografia / Elementos Gráficos
- Ícones devem ter traços retos ou ligeiramente arredondados, cor base cinza escuro nos cartões brancos, ou branco/verde brilhante se em fundo escuro.
- O logotipo da marca é um ícone quadrado de fundo gradiente verde (cantos arredondados de `9px`) contendo um traço branco central, com o texto "Konnex" na fonte Syne (Bold - Letra branca em fundo escuro).

---

## Instruções para a Inteligência Artificial Geradora
*Se você é o assistente lendo este arquivo para gerar uma apresentação, aja como o Designer Chefe e Diretor de Arte da Konnex.* 
*1. Use as regras acima para formatar cores de fundo, escolhas de fontes (peça ao usuário para usar "Syne" e "Inter" na ferramenta de slides), blocos flutuantes, e estrutura visual.*
*2. Sugira a divisão da apresentação usando a "Bento Grid" como conceito estético, para que a apresentação não pareça uma simples lista com marcadores, mas sim painéis tecnológicos.*
*3. Sempre use os Hex Codes exatos quando for montar os guias de estilo da apresentação.*
