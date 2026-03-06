# Mapeamento de Nichos: Apresentações de Alta Conversão (Konnex)

A estrutura da Call V4 Neural é universal, mas o **Problema Estrutural (Slide 2 e 3)** e a **Consequência Financeira (Slide 4)** precisam bater na ferida exata de cada mercado. 

Listamos abaixo os principais nichos escaláveis do mercado, com suas dores principais. Cada um terá sua própria página HTML (`apresentacao-nicho.html`).

## 1. Clínicas de Saúde & Estética (Médicos, Odonto, Biomédicas)
*   **Dor Oculta:** O lead chega do Instagram, mas a recepcionista só visualiza horas depois. Além disso, a clínica sofre com **"No-Show"** (faltas não confirmadas).
*   **A "Consequência Financeira":** O custo da hora vaga do médico. O paciente que pergunta preço, é deixado no vácuo e marca no concorrente.
*   **Termos a usar:** Paciente, Agenda Ociosa, Tempo de Resposta da Recepção, Confirmação de Consulta.
*   **Proposta de Arquitetura:** Triagem automática, encantamento primário, confirmação de agenda proativa.

## 2. Escritórios Jurídicos & Advogados
*   **Dor Oculta:** Alto volume de dúvidas repetitivas ou leads desqualificados (que não podem pagar ou querem consultoria grátis) travando a equipe/sócios.
*   **A "Consequência Financeira":** O advogado sênior perdendo tempo respondendo status de processo ou o prazo estourando por falta de centralização.
*   **Termos a usar:** Triagem de Casos, Cliente, Honorários perdidos, Retorno processual.
*   **Proposta de Arquitetura:** Triagem inicial automática (bot colhendo documentação), IA tirando dúvidas triviais de andamento de processo.

## 3. Instituições de Ensino (Escolas, Faculdades, Cursos, Infoprodutos)
*   **Dor Oculta:** Em época de matrícula ou lançamento, o WhatsApp trava. Pais/Alunos fazendo a mesma pergunta sobre boleto, grade ou horário.
*   **A "Consequência Financeira":** Evasão (aluno desistindo porque não teve suporte rápido) e matrículas perdidas para a concorrência na alta temporada.
*   **Termos a usar:** Aluno, Matrícula, Equipe Comercial Administrativa, Evasão.
*   **Proposta de Arquitetura:** Esteira de matrícula ágil, envio e cobrança de boletos automatizados, suporte estudantil reativo em Dúvidas Frequentes.

## 4. Imobiliárias & Corretores de Imóveis
*   **Dor Oculta:** O corretor recebe o lead do lançamento, demora para responder porque está na rua. Quando responde, o cliente já comprou ou esfriou.
*   **A "Consequência Financeira":** CWA altíssimo. Dinheiro de tráfego jogado no lixo porque não tem "Follow-Up" estruturado. O corretor atende por esforço.
*   **Termos a usar:** Lead, Plantão de Vendas, Corretor, VGV (Valor Geral de Vendas), Lançamento, Follow-up.
*   **Proposta de Arquitetura:** Cadência de atendimento imediata (Lead entrou -> Mensagem enviada). O corretor já recebe mastigado o potencial de compra.

## 5. Serviços B2B & Consultorias (Contabilidade, Agências, Seguradoras)
*   **Dor Oculta:** Atendimento descentralizado. O cliente B2B quer status rápido, o contador/agência demora para gerar o relatório ou guias.
*   **A "Consequência Financeira":** "Churn" (cancelamento de contrato). O cliente sente que  a empresa é bagunçada ou lenta e troca de fornecedor.
*   **Termos a usar:** Empresa, Contrato de Recorrência (Fee), Ticket Médio Alto, Retenção (Churn).
*   **Proposta de Arquitetura:** Geração rápida de chamados, integração via N8N com ERP para enviar boletos, tickets separados por departamentos (Financeiro/Suporte/Vendas).

## 6. E-commerce & Varejo
*   **Dor Oculta:** Abandonos de carrinho e clientes ansiosos querendo saber "cadê meu pedido?".
*   **A "Consequência Financeira":** Custo de aquisição pago (CAC) que não reverte. Vendas perdidas nos 5 minutos de incerteza do frete.
*   **Termos a usar:** Ticket Médio, Abandono de Carrinho, SAC, Rastreamento Ativo.
*   **Proposta de Arquitetura:** Envio automático de rastreio de pedidos, disparo de recuperação de carrinho no tempo exato, IA atuando como vendedor(a) pessoal.

## 7. Delivery & Restaurantes Grandes
*   **Dor Oculta:** Sexta-feira à noite o WhatsApp explode de pedidos iguais ("tem cupom?" "cadê meu pedido?"). O atendente se perde e erra o pedido.
*   **A "Consequência Financeira":** Perda bruta de ticket médio, reputação manchada, garçom fazendo o papel de SAC.
*   **Termos a usar:** Fluxo de pico, Cardápio, Experiência do Cliente.
*   **Proposta de Arquitetura:** Pedido centralizado e finalizado na plataforma, envio de status de cozinha para o cliente sem sujar a recepção.

## 8. Infoprodutores & Lançadores (Cursos Digitais, Pílulas, Mentorias)
*   **Dor Oculta:** O lead entrou no grupo de lançamento ou no funil de e-mail, mas engaja baixo. A conversão de boletos gerados e Pix não pagos esmaga a margem de lucro.
*   **A "Consequência Financeira":** O CPL (Custo por Lead) engole o lucro porque a equipe não consegue dar atenção 1:1 no dia da venda. O expert gasta tudo no tráfego e perde na conversão de checkout.
*   **Termos a usar:** Recuperação de Carrinho, CPL, Tráfego Pago, Pix Gerado, Taxa de Abertura, Mentoria, Escala.
*   **Proposta de Arquitetura:** Funil de recuperação e lembrete ultra-rápido via WhatsApp (API Oficial). Esteira de onboarding pré e pós-venda.

### Como a IA irá gerar esses arquivos em lote:
Para cada segmento, iremos clonar o arquivo original `apresentacao.html`.
A alteração real será em:
1. **O Título do Slide 2** (Fuga da dor local).
2. **Os itens de custo no Slide 3 e 4** (Modificaremos a classe `pres-split` e `pres-list` para usar os jargões da área).
3. **O Roteiro Visível (Tecla 'N')**: Essa será a parte mais extensa. O objeto JS `scriptNotes` terá suas frases reescritas com linguagem hiper focada para aquele nicho (Ex: "Quantas matrículas sua escola perdeu..." ao invés de "Quantas vendas...").

---
**Status Atual:** Documento de planejamento finalizado.
Pronto para começar a criação das variantes, aguardando aprovação para gerar o código HTML em lote das novas páginas dentro de `/apresentacao/nichos/`.
