'use strict';
const fs = require('fs');

// =============================================================================
// KONNEX – GERADOR DE CARROSSÉIS (Estrutura Canônica V2)
// Tipos de slide válidos: COVER | MYTH | CONTENT | CHECKLIST | CTA
// =============================================================================

const frameworks = [
    // ─── TOFU ────────────────────────────────────────────────────────────────
    {
        id: 1, topic: "Velocidade de Resposta", funnel: "TOFU",
        title: "Por que você perde 7 em cada 10 leads no WhatsApp (sem perceber)",
        myth: { left: "Respondo quando der. O cliente espera se quiser comprar.", right: "Estudos mostram que responder em menos de 5 min aumenta 21x a chance de fechar." },
        insight: "O cliente que mandou 'Oi' agora está sendo respondido pela concorrência. Enquanto você digita, ele já está num grupo de WhatsApp com o número do rival.",
        steps: ["Defina um bot de primeiro contato que responde em 0 segundos, 24h/dia", "Colete nome, dor e urgência nos primeiros 3 (três) turnos automáticos", "Encaminhe para o vendedor certo com o contexto já preenchido no CRM", "Meça o tempo médio de resposta humana toda semana e corrija o gargalo"],
        detail1: { badge: "A REGRA DOS 5 MINUTOS", text: "Cada minuto de atraso na resposta reduz em 10 vezes a probabilidade de qualificar aquele lead. Se você demorar 1 hora, é o mesmo que não ter respondido nunca." },
        detail2: { badge: "COMO IMPLEMENTAR", text: "Um bot simples no Konnex responde instantaneamente, classifica o lead por urgência e aciona o vendedor certo. Você para de perder dinheiro enquanto está ocupado." },
        rule: "Seu concorrente não é mais rápido que você. Ele é mais automático.",
        cta: "Automatize. Centralize. Escale. Link na bio."
    },
    {
        id: 2, topic: "Caos no WhatsApp", funnel: "TOFU",
        title: "O erro silencioso que faz sua equipe trabalhar 3x mais sem vender mais",
        myth: { left: "Cada vendedor cuida do próprio WhatsApp. Todo mundo sabe o que fazer.", right: "Sem um painel centralizado, conversas somem, leads ficam sem resposta e ninguém sabe o que o outro prometeu." },
        insight: "Quando não existe controle central, cada número de celular é um buraco negro de informação. O vendedor que saiu levou os clientes com ele.",
        steps: ["Centralize todos os canais (WhatsApp, Instagram, Telegram) em um único painel", "Atribua tickets automaticamente por departamento e especialidade", "Registre o histórico completo de cada conversa no CRM", "Acesse relatórios de tempo de resposta e satisfação em tempo real"],
        detail1: { badge: "O PROBLEMA REAL", text: "Com 4 atendentes em aparelhos separados, uma empresa típica perde 30% das conversas e repete o mesmo processo manual centenas de vezes por semana." },
        detail2: { badge: "A SOLUÇÃO", text: "Com a caixa de entrada unificada do Konnex, toda a equipe atende pelo mesmo número, com histórico, tags e filas organizadas. Zero conversa perdida." },
        rule: "Organização não é luxo. É o que separa quem escala de quem fica apagando incêndio.",
        cta: "Acesse o link na bio e descubra como centralizar toda a sua operação."
    },
    {
        id: 3, topic: "Follow-Up Ausente", funnel: "TOFU",
        title: "O dinheiro que fica na mesa porque você esqueceu de dar um 'Oi'",
        myth: { left: "Se o cliente quer, ele volta. Não quero parecer chato.", right: "80% das vendas acontecem entre o 5º e o 12º contato. A maioria desiste no segundo." },
        insight: "Não é insistência. É matemática. O cliente não voltou não porque não quer comprar – voltou porque você não criou uma razão nova para ele voltar.",
        steps: ["Mapeie todos os leads que não responderam nos últimos 30 dias", "Crie uma sequência de 3 mensagens espaçadas (dia 3, dia 7, dia 15)", "Cada mensagem entrega um novo ângulo de valor, não repete a proposta anterior", "Automatize o disparo pelo Konnex com critérios de parada se o cliente responder"],
        detail1: { badge: "A SEQUÊNCIA CERTA", text: "Dia 3: dica gratuita relacionada à dor dele. Dia 7: case de resultado do seu segmento. Dia 15: oferta com prazo. Três toques, três valores diferentes." },
        detail2: { badge: "O GATILHO PSICOLÓGICO", text: "Cada mensagem nova é uma nova razão para o cliente agir. O primeiro 'Oi' é curiosidade. O terceiro é convicção. Automatize para não depender de memória." },
        rule: "Quem não faz follow-up não tem uma empresa. Tem um hobby caro.",
        cta: "Acesse o link na bio e monte sua sequência de follow-up automatizada hoje."
    },
    {
        id: 4, topic: "Leads Perdidos", funnel: "TOFU",
        title: "Você está pagando caro por tráfego e jogando fora 70% dos leads",
        myth: { left: "O problema é a campanha. Preciso trocar o criativo.", right: "Na maioria dos casos, o anúncio funciona. O que quebra é o que acontece depois do clique." },
        insight: "O lead saiu do Instagram, entrou no WhatsApp, não recebeu resposta rápida e foi embora. O investimento no tráfego foi pelo ralo, não pelo criativo ruim.",
        steps: ["Instale um bot de triagem que responde instantaneamente ao primeiro contato", "Faça perguntas curtas para coletar urgência e orçamento logo de início", "Crie uma segmentação automática: quente, morno, frio – e trate cada grupo diferente", "Meça a taxa de conversão por etapa do funil, não só o faturamento final"],
        detail1: { badge: "O FUNIL INVISÍVEL", text: "Clique no anúncio → WhatsApp → sem resposta = lead morto. Clique → resposta em 5s → qualificação automática = lead ativo. A diferença é só velocidade e processo." },
        detail2: { badge: "COMO CALCULAR O CUSTO", text: "Se seu CPA é R$50 e você converte apenas 3 em cada 10 leads que chegam, cada venda custa R$167. Com triagem e follow-up, converter 6 em 10 custa R$83. Metade." },
        rule: "Não existe orçamento de tráfego pequeno. Existe processo de conversão quebrado.",
        cta: "Quer um cálculo personalizado para o seu funil? Acesse o link na bio."
    },
    {
        id: 5, topic: "Equipe Sobrecarregada", funnel: "TOFU",
        title: "Sua equipe está trabalhando em modo apagar incêndio. E vai sair.",
        myth: { left: "Minha equipe é dedicada. Eles aguentam o volume.", right: "Equipe sobrecarregada erra, não prospecta e pede demissão. Rotatividade alta destrói o crescimento." },
        insight: "O problema não é volume. É processo. Quando cada pergunta exige uma resposta manual, a equipe vira máquina de digitação, não de vendas.",
        steps: ["Liste as 10 perguntas mais repetidas da sua operação esta semana", "Crie respostas rápidas prontas no Konnex (atalhos de 2 letras para parágrafos completos)", "Delegue o pré-atendimento para bots: horário, endereço, preço inicial, disponibilidade", "Reserve o humano para o que só humano faz: empatia, negociação e fechamento"],
        detail1: { badge: "O CÁLCULO DO DESPERDÍCIO", text: "Se cada atendente responde 50 perguntas repetidas por dia, e cada resposta leva 2 minutos, são 100 minutos desperdiçados. Por atendente. Por dia. Automação devolve esse tempo." },
        detail2: { badge: "O QUE AUTOMATIZAR PRIMEIRO", text: "Saudação + coleta de nome → Confirmação de horário e agendamento → Envio de catálogo/cardápio → Registro de pedido básico. Tudo isso sem digitar nada." },
        rule: "Humano é caro e especial. Use-o apenas onde o robô não consegue chegar.",
        cta: "Comece a automatizar hoje. O link está na bio."
    },
    {
        id: 6, topic: "Organização", funnel: "TOFU",
        title: "Seu WhatsApp virou uma gaveta bagunçada de oportunidades perdidas",
        myth: { left: "Eu lembro dos clientes importantes. Não preciso de sistema.", right: "Memória falha. O cliente que você 'vai ligar amanhã' já foi comprar do concorrente hoje." },
        insight: "O vendedor que não usa CRM não tem funil de vendas. Tem uma lista de conversas que ele espera que se resolvam sozinhas.",
        steps: ["Abra o painel do Konnex e crie estágios simples: Contato Novo, Proposta Enviada, Aguardando, Fechado", "Mova cada conversa de estágio conforme a interação avança", "Configure alertas para leads parados há mais de 48 horas em qualquer estágio", "Revise o funil toda segunda-feira em 15 minutos para priorizar a semana"],
        detail1: { badge: "KANBAN PARA VENDAS", text: "O Kanban visual do Konnex mostra em qual estágio está cada cliente, quem está parado há mais tempo e quem está prestes a fechar. Tudo em uma tela." },
        detail2: { badge: "O RITUAL SEMANAL", text: "15 minutos toda segunda: Quem ficou parado? Quem merece follow-up? Quem foi esquecido? Esse ritual sozinho pode aumentar sua conversão em 30% no primeiro mês." },
        rule: "CRM não é burocracia. É dinheiro que você ainda não recebeu, mas já conquistou.",
        cta: "Veja o CRM e o Kanban do Konnex funcionando. Link na bio."
    },
    {
        id: 7, topic: "Atendimento Fora do Horário", funnel: "TOFU",
        title: "Você está dormindo. Seu concorrente está fechando as vendas de madrugada.",
        myth: { left: "Cliente que manda mensagem de madrugada não é sério.", right: "40% das mensagens chegam fora do horário comercial. Esse é o lead que não tem tempo de ligar de dia." },
        insight: "O cliente executivo, a mãe que pesquisa tarde da noite, o empreendedor que trabalha nos fins de semana. Todos eles estão mandando 'Oi' enquanto você dorme.",
        steps: ["Configure uma saudação automática fora do horário com horário de retorno claro", "Instale uma captura de dados mínima: nome, problema, urgência – automaticamente", "Agende uma mensagem de retorno para o próximo horário útil da manhã", "Priorize no painel os leads noturnos: eles costumam ser mais decididos"],
        detail1: { badge: "O PERFIL DO LEAD NOTURNO", text: "Pesquisas indicam que leads que entram em contato fora do horário têm 40% mais intenção de compra. Eles já pesquisaram. Estão prontos. Só precisam de atenção." },
        detail2: { badge: "COMO CONFIGURAR EM 10 MIN", text: "Konnex: Menu → Bots → Horário Fora de Expediente → Adicionar Fluxo. Configure a mensagem, colete os dados e o lead entra organizado na fila da manhã." },
        rule: "Não trabalhar à noite é legítimo. Deixar o lead sem resposta à noite é suicídio comercial.",
        cta: "Configure seu fluxo de atendimento noturno agora. Link na bio."
    },
    {
        id: 8, topic: "Disparos em Massa", funnel: "TOFU",
        title: "Manda mensagem pra lista toda e espera. Assim você só vai irritar seus contatos.",
        myth: { left: "Disparo em massa é spam. Só serve para ofender a lista.", right: "Disparo segmentado e personalizado tem taxa de abertura de 90%+ no WhatsApp. O problema não é canal, é execução." },
        insight: "Não existe ferramenta ruim de comunicação. Existe mensagem genérica enviada para a pessoa errada no momento errado.",
        steps: ["Segmente sua lista por: cliente ativo/inativo, produto comprado, região, faixademPreço", "Crie mensagens que falam diretamente à realidade de cada segmento", "Use variáveis dinâmicas: {nome}, {último_produto}, {data_última_compra}", "Meça abertura, resposta e conversão para ajustar continuamente"],
        detail1: { badge: "SEGMENTAÇÃO MÍNIMA VIÁVEL", text: "Divida sua lista em 3 grupos: Compraram nos últimos 30 dias / 31–90 dias / mais de 90 dias. Encaminhe mensagens completamente diferentes para cada grupo. Os resultados vão te surpreender." },
        detail2: { badge: "A VARIÁVEL QUE MUDA TUDO", text: "Só escrever '{nome},' no início da mensagem aumenta a taxa de resposta em média 27%. Personalização não é difícil. É configuração de 5 minutos no Konnex." },
        rule: "A lista não está cansada de você. Está cansada de mensagens que não são para ela.",
        cta: "Acesse o link na bio e comece a segmentar seus disparos hoje."
    },
    {
        id: 9, topic: "Qualificação Amadora", funnel: "TOFU",
        title: "Você está desperdiçando horas com leads que nunca vão comprar",
        myth: { left: "Todo lead merece atenção igual. Nunca se sabe quem vai fechar.", right: "Leads sem qualificação consomem 80% do tempo e geram 20% da receita. Você precisa separar o ouro da areia." },
        insight: "Tratar especulador como cliente VIP não é gentileza. É falta de processo. E custa caro em tempo, energia e oportunidade de atender quem realmente quer comprar.",
        steps: ["Defina os 3 critérios de um lead qualificado para o seu negócio (ex: prazo, verba, decisão)", "Configure perguntas de triagem automáticas no primeiro contato", "Crie uma tag 'Qualificado' no CRM e acione alertas para o vendedor humano apenas para esse grupo", "Leads frios recebem nurturing automático, não atenção manual imediata"],
        detail1: { badge: "O FRAMEWORK BANT", text: "Budget (verba), Authority (é quem decide?), Need (tem a necessidade?), Timeline (qual o prazo?). Quatro perguntas simples num bot que pré-qualifica e poupa horas do seu time." },
        detail2: { badge: "O QUE FAZER COM LEADS FRIOS", text: "Não abandone e não dedique tempo manual. Coloque em uma sequência de nutrição automática de 30 dias. Quando ele amadurecer, seu bot vai saber e acionar o vendedor." },
        rule: "Um vendedor que tenta fechar todo lead é um vendedor que não fecha nenhum.",
        cta: "Implemente a triagem automática no seu funil. Acesse o link na bio."
    },
    {
        id: 10, topic: "Número Pessoal", funnel: "TOFU",
        title: "Usar WhatsApp pessoal para o negócio é um risco que você ainda não calculou",
        myth: { left: "Uso meu próprio número há anos. Nunca tive problema.", right: "Quando o funcionário que usa o celular pessoal sai, ele leva todos os contatos com ele. E o WhatsApp pessoal pode ser banido a qualquer momento." },
        insight: "O WhatsApp pessoal não garante backup de conversas, não tem múltiplos atendentes, não tem relatórios e viola os termos de serviço para uso comercial em escala.",
        steps: ["Migre para um número empresarial dedicado exclusivo para o negócio", "Conecte ao Konnex via WhatsApp Business API para estabilidade total", "Configure múltiplos agentes atendendo pelo mesmo número", "Mantenha o histórico sempre na nuvem, independente de qual celular use"],
        detail1: { badge: "O RISCO REAL", text: "Empresas que operam via número pessoal perdem toda a base de contatos quando um colaborador sai. Isso acontece mais do que você imagina. E a recuperação é quase impossível." },
        detail2: { badge: "API OFICIAL WHATSAPP", text: "Com a API Oficial Meta, seu número é verificado, tem suporte direto, suporta milhares de conversas simultâneas e não corre risco de banimento. Konnex configura isso para você." },
        rule: "Seu WhatsApp é o ativo mais valioso do negócio. Proteja-o como protege seu CNPJ.",
        cta: "Migre para a API Oficial sem complication. Saiba como no link da bio."
    },
    {
        id: 11, topic: "Sem Métricas", funnel: "TOFU",
        title: "'Achei que foi um mês fraco.' A frase que mata negócios devagar.",
        myth: { left: "Eu sinto o ritmo do negócio. Não preciso de relatório para saber se foi bom.", right: "Intuição sem dado é sorte disfarçada de estratégia. Quem não mede não consegue melhorar." },
        insight: "Olhar o extrato bancário no dia 30 é como dirigir olhando pelo retrovisor. Você precisa de indicadores em tempo real para ajustar o curso antes de bater.",
        steps: ["Defina 3 métricas semanais: novos contatos, propostas enviadas, fechamentos", "Revise esses números toda segunda-feira em 15 minutos", "Identifique em qual etapa o número mais cai e foque os esforços só aí", "Compare semana a semana, não só mês a mês – problemas aparecem antes"],
        detail1: { badge: "AS 3 MÉTRICAS ESSENCIAIS", text: "1. Leads Novos (topo do funil) — 2. Taxa de Proposta (meio do funil) — 3. Taxa de Fechamento (fundo do funil). Cada uma aponta um problema diferente." },
        detail2: { badge: "O DASHBOARD DO KONNEX", text: "Tempo médio de resposta, volume de conversas por atendente, taxa de satisfação e funil de conversão. Tudo atualizado em tempo real, sem planilha, sem digitação manual." },
        rule: "O que não é medido não é gerenciado. O que não é gerenciado vai na direção do caos.",
        cta: "Ative seu dashboard de métricas em tempo real. Acesse o link na bio."
    },
    {
        id: 12, topic: "Retenção de Cliente", funnel: "TOFU",
        title: "Você gasta 5x mais pra atrair um cliente novo do que para manter quem já comprou",
        myth: { left: "Meu foco precisa ser em novos clientes. Os antigos já conhecem a marca.", right: "Clientes fiéis compram com mais frequência, gastam mais por compra e indicam gratuitamente. São o ativo mais barato da operação." },
        insight: "A lista de clientes inativos é o ouro enterrado na empresa. Cada CPF que comprou e não voltou é uma venda que já foi conquistada e foi perdida por indiferença.",
        steps: ["Identifique clientes que compraram há mais de 60 dias e não voltaram", "Crie uma campanha de reativação com ângulo diferente da última abordagem", "Ofereça valor primeiro: insight, novidade ou dica antes de qualquer oferta", "Configure um fluxo de pós-venda automático: dia 7, dia 30, dia 90 após a compra"],
        detail1: { badge: "A MATEMÁTICA DA RETENÇÃO", text: "Aumentar a retenção em 5% pode elevar o lucro entre 25% e 95%, segundo estudos de Harvard. Nenhuma campanha de tráfego bate esse retorno." },
        detail2: { badge: "O FLUXO DE PÓS-VENDA", text: "Dia 7: 'Tudo certo com o pedido?' → Dia 30: Dica de uso → Dia 90: Oferta exclusiva de fidelidade. Três mensagens automáticas que constroem relacionamento sem esforço manual." },
        rule: "O melhor cliente que você vai conquistar amanhã é o cliente que você já tem hoje.",
        cta: "Reative sua base de clientes com automação. Veja como no link da bio."
    },

    // ─── MOFU ────────────────────────────────────────────────────────────────
    {
        id: 13, topic: "CRM na Prática", funnel: "MOFU",
        title: "Como usar um CRM sem travar a operação (e sem planilha)",
        myth: { left: "CRM é coisa de empresa grande. Complicado demais para o meu negócio.", right: "CRM é qualquer sistema que evita que informação sobre o cliente se perca. Pode ser simples e poderoso ao mesmo tempo." },
        insight: "O CRM não é para o gerente. É para o vendedor não ligar pela décima vez perguntando a mesma coisa para o mesmo cliente.",
        steps: ["Crie 5 stage simples: Novo Lead, Contato Feito, Proposta, Negociação, Fechado", "Registre automaticamente todo contato via WhatsApp no perfil do cliente", "Adicione tags por produto de interesse, temperatura e segmento", "Use filtros para encontrar em segundos qualquer cliente com qualquer critério"],
        detail1: { badge: "O QUE REGISTRAR", text: "Nome, canal de origem, data do primeiro contato, produto de interesse, objeções levantadas, próximo passo acordado. 6 campos que transformam um contato em oportunidade gerenciada." },
        detail2: { badge: "INTEGRAÇÃO AUTOMÁTICA", text: "No Konnex, cada nova conversa gera automaticamente um card no CRM. O vendedor não precisa preencher nada manualmente. O sistema já registra canal, horário e histórico completo." },
        rule: "CRM não é onde você guarda cliente. É onde você guarda dinheiro que ainda não entrou.",
        cta: "Teste o CRM do Konnex gratuitamente. Acesse o link na bio."
    },
    {
        id: 14, topic: "Chatbot com IA", funnel: "MOFU",
        title: "O chatbot que vende não é o que responde tudo. É o que faz as perguntas certas.",
        myth: { left: "Chatbot parece robótico e os clientes odeiam. Prefiro atendimento humano.", right: "Um chatbot bem construído resolve 60–70% das dúvidas sem precisar de humano, com satisfação igual ou maior." },
        insight: "O problema não é o chatbot. É o chatbot genérico com 40 opções de menu que não leva a lugar nenhum. Bot bem feito é conversa, não formulário.",
        steps: ["Defina o objetivo principal do bot: qualificar, agendar ou vender direto", "Escreva o fluxo como uma conversa, não como uma lista de opções", "Inclua etapas de empatia: reconheça a dor antes de oferecer a solução", "Programe uma saída humana fácil: 'Quer falar com um especialista?' em qualquer ponto"],
        detail1: { badge: "O FLUXO MÍNIMO VIÁVEL", text: "Saudação → Pergunta sobre a dor → Captura de dados → Apresentação resumida da solução → Próximo passo (agendamento ou proposta). 5 etapas, 3 minutos de configuração no Konnex." },
        detail2: { badge: "IA NO WHATSAPP", text: "Com ChatGPT ou Groq integrado ao Konnex, o bot entende linguagem natural, responde sem ser rígido e escala para humano apenas quando detecta intenção de compra ou pedido específico." },
        rule: "Bot ruim é aquele sem personalidade e sem objetivo. Bot bom é aquele com roteiro e propósito.",
        cta: "Monte seu bot de qualificação em minutos. Acesse o link na bio."
    },
    {
        id: 15, topic: "Gestão de Atendimento", funnel: "MOFU",
        title: "Como atender 10x mais sem contratar 10x mais gente",
        myth: { left: "Para crescer o atendimento, preciso contratar mais atendentes.", right: "Automação inteligente pode multiplicar a capacidade da equipe existente por 5 sem adicionar headcount." },
        insight: "A capacidade não cresce contratando mais pessoas para fazer as mesmas coisas ineficientes. Cresce eliminando ineficiências e deixando as pessoas focadas no que só elas podem fazer.",
        steps: ["Mapeie o tempo gasto em cada tipo de atendimento (triagem, FAQ, proposta, suporte)", "Automatize tudo que se repete mais de 10 vezes por semana sem variação", "Crie SLA: tempo máximo para cada tipo de ticket com alerta automático de atraso", "Monitore produtividade por atendente e identifique gargalos semanalmente"],
        detail1: { badge: "O QUE CADA PERFIL FAZ", text: "Bot: horário, endereço, preços, agendamento básico. Atendente júnior: dúvidas específicas, problemas simples. Especialista/Vendedor: proposta, negociação, fechamento." },
        detail2: { badge: "TRANSFERÊNCIA INTELIGENTE", text: "O Konnex transfere automaticamente conversas para o departamento certo com base em palavras-chave ou resposta do cliente. Zero transferência manual. Zero cliente explicando a mesma coisa duas vezes." },
        rule: "Escala não vem de trabalhar mais. Vem de tornar cada hora de trabalho mais produtiva.",
        cta: "Multiplique a capacidade da sua equipe com automação. Veja no link da bio."
    },
    {
        id: 16, topic: "Automação de Follow-Up", funnel: "MOFU",
        title: "Sequência de follow-up que não parece spam (e que realmente converte)",
        myth: { left: "Follow-up é inconveniente. O cliente decide quando quer voltar.", right: "Follow-up bem feito é serviço, não pressão. O cliente agradece quando a mensagem é relevante e no momento certo." },
        insight: "A diferença entre follow-up chato e follow-up que converte é uma só: o primeiro pede, o segundo entrega valor antes de pedir.",
        steps: ["Espere 48 horas após o primeiro contato sem resposta antes de reativar", "Mensagem 1: entregue uma dica ou insight do segmento do cliente – sem pedir nada", "Mensagem 2 (5 dias): compartilhe um caso de resultado de um cliente parecido com ele", "Mensagem 3 (10 dias): faça a oferta com prazo real. Se não reagir, entre em modo passivo"],
        detail1: { badge: "O PRINCÍPIO DA RECIPROCIDADE", text: "Quando você entrega valor antes de pedir, o cérebro cria uma obrigação sutil de retribuição. Isso não é manipulação – é o que separa uma marca de interesse de uma marca de custo." },
        detail2: { badge: "AUTOMAÇÃO NO KONNEX", text: "Configure a sequência uma vez. O sistema acompanha cada lead individualmente, envia no momento certo, para automaticamente quando o cliente responde e registra tudo no CRM." },
        rule: "Três mensagens de valor valem mais do que trinta pedidos de resposta.",
        cta: "Automatize seu follow-up em 3 etapas. Comece pelo link na bio."
    },
    {
        id: 17, topic: "Integração de Canais", funnel: "MOFU",
        title: "Seus clientes estão em 4 canais diferentes. Você está num só.",
        myth: { left: "Whatsapp é suficiente. É onde todo mundo está.", right: "O cliente começa no Instagram, pesquisa no Google, manda mensagem no WhatsApp e finaliza pelo e-mail. Quem não está em todos perde parte da jornada." },
        insight: "Não existe o canal certo. Existe o canal onde o cliente está no momento que ele decide. E você precisa estar lá, pronto, em segundos.",
        steps: ["Mapeie de onde vêm os seus leads hoje (Instagram, anúncio, indicação, Google)", "Integre cada canal de origem ao mesmo painel de atendimento", "Mantenha o histórico unificado: o cliente não repete o problema em cada canal", "Meça qual canal gera leads mais qualificados e aloque esforço proporcionalmente"],
        detail1: { badge: "MULTICANAL NA PRÁTICA", text: "WhatsApp + Instagram + Telegram + Facebook Messenger + WebChat – todos na mesma tela do Konnex, com histórico compartilhado e o mesmo agente atendendo sem mudar de aba." },
        detail2: { badge: "A VANTAGEM COMPETITIVA", text: "Quando seu concorrente só está no WhatsApp e você está nos 5 canais com resposta em 5 segundos, você aparece maior, mas não é maior. É mais organizado." },
        rule: "O cliente não escolhe o canal que você prefere. Ele escolhe o canal que ele usa.",
        cta: "Integre todos os seus canais em um único painel. Acesse o link na bio."
    },
    {
        id: 18, topic: "Processos Comerciais", funnel: "MOFU",
        title: "Playbook de vendas: o documento que impede sua empresa de depender de uma só pessoa",
        myth: { left: "Vendas é talento. Não dá para documentar o que cada um faz naturalmente.", right: "Os melhores vendedores do mundo seguem um roteiro. Improvisar dentro de um processo é muito diferente de improvisar sem nenhum." },
        insight: "Quando a empresa toda só funciona porque um vendedor específico é talentoso, esse vendedor se torna o gargalo e o risco do negócio ao mesmo tempo.",
        steps: ["Entreviste seu melhor vendedor e mapeie o que ele faz em cada etapa da venda", "Documente o roteiro de abordagem inicial, as perguntas de qualificação e as respostas para objeções", "Crie um repositório de respostas rápidas no Konnex acessível para toda a equipe", "Teste o playbook com o vendedor menos experiente e ajuste onde ele travar"],
        detail1: { badge: "O QUE DEVE CONTER UM PLAYBOOK", text: "Abordagem de abertura → Perguntas de qualificação → Apresentação de solução → Respostas para as 5 principais objeções → Técnicas de fechamento → Scripts de follow-up." },
        detail2: { badge: "RESPOSTAS RÁPIDAS NO KONNEX", text: "Monte uma biblioteca de respostas para as situações mais comuns. Qualquer vendedor digita '/objeçaopreco' e recebe o argumento completo para usar na conversa. Venda democratizada." },
        rule: "Empresa que depende de talento individual não é empresa. É prestação de serviço pessoal.",
        cta: "Monte seu playbook de vendas integrado ao Konnex. Saiba mais no link da bio."
    },
    {
        id: 19, topic: "Agendamento Automático", funnel: "MOFU",
        title: "Confirmar consulta por WhatsApp manualmente é o maior desperdício de hora da sua equipe",
        myth: { left: "Confirmação precisa de toque humano. Clientes ficam mais seguros falando com pessoa real.", right: "Uma confirmação automática personalizada tem taxa de resposta igual ou maior que a manual. E ocorre na hora certa, sem depender de agenda humana." },
        insight: "O cliente não quer falar com pessoa para confirmar presença. Ele quer um 'bip' de lembrete no horário certo. Você está entregando uma ligação quando ele queria um torpedo.",
        steps: ["Configure lembrete automático 24h antes do agendamento via WhatsApp", "Inclua botão de confirmação rápida: 'Confirmar ✅' ou 'Reagendar 🔄'", "Quando cliente reagendar, capture nova data automaticamente e atualize no sistema", "Avise a equipe apenas em exceções: cancelamentos ou reagendamentos de último hora"],
        detail1: { badge: "O IMPACTO NOS NO-SHOWS", text: "Clínicas que implementam confirmação automática 24h antes reduzem no-shows em até 65%. O cliente não faltou por má vontade – ele simplesmente esqueceu." },
        detail2: { badge: "ALÉM DO LEMBRETE", text: "Dia antes: lembrete + confirmação. 2h antes: endereço + link de localização. Pós-atendimento: pesquisa de satisfação + próxima etapa. Tudo automático. Tudo personalizado com o nome dele." },
        rule: "Lembrete manual é você pagando um profissional pra fazer o que o robô faz de graça.",
        cta: "Reduza seus no-shows automaticamente. Configure agora pelo link da bio."
    },
    {
        id: 20, topic: "Relatórios e Dados", funnel: "MOFU",
        title: "3 relatórios que todo gestor de atendimento precisa ver toda semana",
        myth: { left: "Relatório é coisa do final do mês. No dia a dia não tem tempo.", right: "Sem dados semanais, você só descobre os problemas quando já causaram prejuízo. Dado tardio é dado inútil." },
        insight: "Um gestor que olha relatório só no dia 30 está gerenciando pelo retrovisor. Os problemas já aconteceram. O dado semanal permite intervir antes que virem crise.",
        steps: ["Abra o painel de relatórios do Konnex toda segunda-feira pela manhã", "Relatório 1: Tempo médio de primeira resposta por atendente esta semana", "Relatório 2: Leads que ficaram mais de 48h sem movimento no funil", "Relatório 3: Taxa de conversão de proposta para fechamento"],
        detail1: { badge: "INDICADOR DE ALERTA", text: "Se o tempo médio de resposta subiu mais de 20% em relação à semana anterior, algo mudou: novo volume, atendente ausente ou processo quebrado. Você precisa saber antes do cliente reclamar." },
        detail2: { badge: "AUTOMAÇÃO DO RELATÓRIO", text: "No Konnex, configure o relatório semanal automático para chegar no seu WhatsApp toda segunda às 8h. Sem precisar abrir painel, sem precisar lembrar. Decisão por dados no bolso." },
        rule: "Dado semanal é prevenção. Dado mensal é diagnóstico post-mortem.",
        cta: "Ative seus relatórios automáticos de atendimento. Acesse o link na bio."
    },
    {
        id: 21, topic: "Escala de Vendas", funnel: "MOFU",
        title: "Como dobrar as vendas sem dobrar a equipe (o caminho não é mais gente)",
        myth: { left: "Só vou crescer quando contratar mais vendedores.", right: "Dobrar a eficiência de cada vendedor atual gera mais resultado do que dobrar o time com a mesma ineficiência." },
        insight: "Contratar mais vendedores sem corrigir o processo é como comprar mais baldes para encher um barril furado. O problema não é tamanho da equipe. É o funil vazando.",
        steps: ["Calcule a taxa de conversão atual em cada etapa do funil (não só a taxa final)", "Identifique a etapa com maior queda e foque os esforços ali por 30 dias", "Automatize as tarefas que consomem tempo sem gerar receita direta", "Aumente o ticket médio de cada fechamento antes de aumentar o volume de leads"],
        detail1: { badge: "AS 3 ALAVANCAS REAIS", text: "1. Mais leads → mais tráfego (mais caro). 2. Melhor conversão → processo e qualificação. 3. Maior ticket → upsell e cross-sell. A alavanca 2 e 3 custam próximo de zero." },
        detail2: { badge: "O PAPEL DA AUTOMAÇÃO", text: "Com Konnex automatizando triagem, follow-up e relatório, cada vendedor consegue gerenciar 3x mais leads com a mesma qualidade de atendimento. Isso é escala real." },
        rule: "Antes de adicionar força bruta, conserte o processo. A eficiência escala. O esforço não.",
        cta: "Escale suas vendas sem escalar o time. Veja como no link da bio."
    },
    {
        id: 22, topic: "Treinamento de Equipe", funnel: "MOFU",
        title: "Novo funcionário em 3 dias: o sistema de onboarding que não depende do dono",
        myth: { left: "Cada novo contratado precisa de semanas de acompanhamento presencial meu.", right: "Com um processo documentado e ferramentas certas, qualquer pessoa pode estar produzindo em 3 dias." },
        insight: "Quando o dono é o treinador de todo novo funcionário, o crescimento da empresa fica limitado à disponibilidade pessoal do dono. Isso não é escala. É prisão com salário.",
        steps: ["Grave vídeos de tela mostrando o fluxo do Konnex para cada função (atendente, vendedor)", "Crie um documento único com scripts de abordagem e respostas para objeções", "Monte um checklist de onboarding de 3 dias com tarefas progressivas e verificáveis", "Atribua um 'buddy' veterano para acompanhar o novo por 1 semana, não o dono"],
        detail1: { badge: "O MATERIAL MÍNIMO", text: "Dia 1: Acesso ao sistema + vídeo de 20min de overview. Dia 2: Primeiros atendimentos supervisionados online. Dia 3: Primeiro atendimento solo com supervisor revisando depois." },
        detail2: { badge: "RECURSOS RÁPIDOS NO KONNEX", text: "Monte a biblioteca de respostas rápidas antes do primeiro dia do novo. Ele vai digitar '/dúvidapreço' e receber o texto pronto. Menos memorização, mais confiança, menos erro." },
        rule: "Empresa que treina pelo exemplo do dono trava no tamanho do dono.",
        cta: "Implante seu processo de onboarding com o Konnex. Link na bio."
    },

    // ─── BOFU ─────────────────────────────────────────────────────────────────
    {
        id: 23, topic: "Prova Social", funnel: "BOFU",
        title: "Por que seu cliente precisa ver outros comprando antes de comprar",
        myth: { left: "Meu serviço fala por si mesmo. Resultado é a melhor propaganda.", right: "Resultado invisível não convence ninguém. Prova social visível e específica acelera decisões de compra." },
        insight: "O cliente sabe que você vai dizer que é bom. Mas quando ele vê outra empresa do setor dele dizendo que obteve resultado real, o ceticismo cai e a confiança sobe.",
        steps: ["Colete 3 depoimentos específicos de clientes com número real de resultado", "Crie um story fixo no Instagram com antes e depois de um cliente do seu nicho", "No WhatsApp, tenha pronto um PDF de 1 página com 3 casos reais para enviar no momento certo", "Peça permissão para usar o nome e logo do cliente – torna a prova 10x mais crível"],
        detail1: { badge: "O DEPOIMENTO QUE CONVENCE", text: "'A Konnex me ajudou muito!' não convence. 'Com a Konnex, zeramos as mensagens não respondidas em 2 semanas e a taxa de fechamento subiu 31% no trimestre' – isso fecha venda." },
        detail2: { badge: "ONDE USAR A PROVA SOCIAL", text: "No bot de qualificação: envie automaticamente o caso do cliente mais parecido com o lead. Na proposta: inclua o case do segmento dele. No follow-up: use como gatilho de retomada." },
        rule: "Você não precisa convencer o cliente de que é bom. Precisa deixar outro cliente fazer isso por você.",
        cta: "Use prova social no seu funil automatizado. Veja como no link da bio."
    },
    {
        id: 24, topic: "Objeção de Preço", funnel: "BOFU",
        title: "O cliente disse que está caro. O que ele realmente quis dizer.",
        myth: { left: "Quando dizem que está caro, é porque está caro. Preciso dar desconto.", right: "Na maioria das vezes 'está caro' significa 'não entendi o valor' ou 'não confio o suficiente ainda'." },
        insight: "'Está caro' é a objeção mais comum e a mais mal respondida. Quem parte direto para o desconto destrói a margem e sinaliza que o preço original era inflado.",
        steps: ["Responda com 'Em comparação com o quê?' – para entender a referência real do cliente", "Recalcule o custo da inação: 'Quanto custa para você não resolver isso este mês?'", "Mostre o custo por dia ou por lead perdido – torna o investimento pequeno em proporção", "Ofereça acessibilidade, não desconto: parcelamento, entrada reduzida, plano inicial"],
        detail1: { badge: "A PERGUNTA MÁGICA", text: "'Se o preço não fosse uma barreira, essa solução faria sentido para você?' Se ele disser sim, o problema é financeiro, não de valor. Aí você negocia condições, não preço." },
        detail2: { badge: "O CÁLCULO DO CUSTO DE NÃO FAZER", text: "Se cada lead perdido vale R$500 e você perde 10 por semana, são R$20.000/mês evaporando. O Konnex custa R$X. A conta fecha em menos de 1 semana de operação normal." },
        rule: "Desconto fácil destrói margem. Valor demonstrado convence sem perder um centavo.",
        cta: "Supere objeções com processos automatizados. Acesse o link na bio."
    },
    {
        id: 25, topic: "Proposta Comercial", funnel: "BOFU",
        title: "Por que sua proposta chega na inbox e não é aberta (e como mudar isso)",
        myth: { left: "Mando a proposta por e-mail com PDF detalhado. Profissional e completo.", right: "Um PDF de 15 páginas enviado sem contexto prévio é o caminho mais certo para seu lead nunca mais responder." },
        insight: "A proposta não é o início da negociação. É o resultado de uma conversa bem conduzida. Enviada prematuramente, ela mata o relacionamento antes de criá-lo.",
        steps: ["Nunca envie proposta antes de um diagnóstico da dor do cliente (mínimo 3 perguntas)", "Apresente a proposta por voz ou vídeo curto ANTES de enviar o documento", "O PDF deve ter no máximo 3 páginas: problema, solução, investimento", "Defina já na ligação qual será o próximo passo após a proposta (data de retorno)"],
        detail1: { badge: "O FORMATO CERTO POR CANAL", text: "Para tickets menores: proposta direto no WhatsApp via mensagem estruturada. Para tickets médios: áudio de 3 minutos + PDF de 1 página. Para tickets altos: apresentação ao vivo antes de qualquer documento." },
        detail2: { badge: "O ERRO DO PDF DE 15 PÁGINAS", text: "Cada página extra é um segundo extra de leitura que o cliente não tem. Quanto mais longa a proposta, menor o compromisso de lê-la. Clareza vende. Comprimento afasta." },
        rule: "Proposta enviada por e-mail sem conversa prévia não é proposta. É orçamento perdido.",
        cta: "Envie propostas de alta conversão pelo Konnex. Teste no link da bio."
    },
    {
        id: 26, topic: "Fechamento de Vendas", funnel: "BOFU",
        title: "O fechamento que não parece fechamento (e que funciona melhor)",
        myth: { left: "Fechamento é pressão. 'Vai fechar ou não?' é o jeito de descobrir.", right: "Fechamento é clareza. O cliente decide quando entende exatamente o que acontece se ele disser sim e o que ele perde se não disser." },
        insight: "Vendedor que teme pedir decisão vende pouco. Vendedor que pede decisão sem preparação perde o cliente. O equilíbrio está em criar compromisso progressivo antes do sim final.",
        steps: ["Use microcompromissos: 'Faz sentido até aqui?' à medida que apresenta", "No final: 'Com base no que conversamos, quando você gostaria de começar?'", "Se hesitar, use o anchoring: presente o próximo passo como natural, não como pressão", "Tenha sempre um próximo passo concreto: data, reunião, acesso ou proposta assinada"],
        detail1: { badge: "A TÉCNICA DA CADEIRA", text: "Antes de pedir o sim, pergunte: 'Se você avançasse com isso, como seu negócio estaria em 90 dias?' Deixe ele visualizar o futuro com a solução. Venda o resultado, não o produto." },
        detail2: { badge: "O QUE FAZER COM O SILÊNCIO", text: "Depois de apresentar o investimento, fique em silêncio. Quem falar primeiro perde a alavancagem. O desconforto do silêncio é o momento mais importante da negociação." },
        rule: "Fechamento não é um momento. É um processo que começa na primeira pergunta.",
        cta: "Feche mais vendas com o processo certo. Veja o Konnex no link da bio."
    },
    {
        id: 27, topic: "White-Label", funnel: "BOFU",
        title: "Como criar uma nova fonte de receita recorrente sem desenvolver nenhum software",
        myth: { left: "Preciso de um produto próprio para montar uma empresa de tecnologia.", right: "White-label permite que você venda um produto estabelecido com sua marca, seus preços e sua margem. Sem código. Sem suporte de infra." },
        insight: "A maioria das agências de marketing digital poderiam faturar 3x mais repassando uma plataforma de automação própria para os seus clientes locais. Elas não fazem por desconhecimento.",
        steps: ["Identifique 5 clientes seus que hoje usam WhatsApp de forma manual e caótica", "Apresente o Konnex como 'sua plataforma de atendimento' com sua marca e domínio", "Defina seu preço de repasse: a margem usual é de 50% a 200% sobre o custo", "Ofereça o setup e treinamento como serviço adicional de implantação"],
        detail1: { badge: "A MATEMÁTICA DO WHITE-LABEL", text: "10 clientes × R$350/mês cada = R$3.500/mês de receita recorrente. Com 30 clientes = R$10.500/mês. Sem funcionário a mais, sem suporte de infra, sem desenvolvimento." },
        detail2: { badge: "O QUE O KONNEX OFERECE", text: "Plataforma completa com o seu domínio, seu logo, suas cores. Seus clientes veem o 'SUA EMPRESA Pro' – nunca o nome Konnex. Suporte técnico fica conosco. Relação fica com você." },
        rule: "Agência que não tem produto recorrente depende de novo projeto para sempre. Produto recorrente é liberdade.",
        cta: "Monte sua operação white-label agora. Entenda o modelo no link da bio."
    },
    {
        id: 28, topic: "ROI de Automação", funnel: "BOFU",
        title: "Como calcular em 5 minutos se automação de WhatsApp vale para o seu negócio",
        myth: { left: "Automação é cara e demora meses para dar retorno.", right: "Para a maioria dos negócios de pequeno e médio porte, o retorno vem no primeiro ou segundo mês de operação." },
        insight: "Toda decisão de investimento que não tem um cálculo de ROI estimado é uma aposta. E apostador raramente é empresário bem-sucedido.",
        steps: ["Calcule quantas horas por semana sua equipe gasta em atendimento manual repetitivo", "Multiplique pelo custo hora dessa equipe (salário + encargos / horas úteis mensais)", "Estime quantos leads você perde por mês por demora de resposta ou falta de follow-up", "Compare o custo mensal da plataforma com esses dois números somados"],
        detail1: { badge: "EXEMPLO REAL", text: "Equipe de 2 atendentes × 3h/dia de tarefas automatizáveis × R$20/hora = R$2.400/mês desperdiçados em processos manuais. Konnex: R$200/mês. ROI: 12x no custo de eficiência apenas." },
        detail2: { badge: "O CUSTO INVISÍVEL", text: "Além do custo da equipe, existe o custo dos leads perdidos. Se você perde 10 leads/semana × R$300 de ticket médio = R$12.000/mês de oportunidade não realizada. A automação captura parte disso." },
        rule: "O custo de não automatizar é sempre maior do que o custo de automatizar. A diferença é que um você vê na conta e o outro você nunca vai contabilizar.",
        cta: "Calcule seu ROI e comece agora. Acesse o link na bio."
    },
    {
        id: 29, topic: "API Oficial Meta", funnel: "BOFU",
        title: "A diferença entre WhatsApp Plus e API Oficial pode estar custando sua operação",
        myth: { left: "O WhatsApp Plus funciona igual e custa menos. Por que mudar?", right: "WhatsApp Plus viola os termos de serviço e pode ser banido a qualquer momento. Uma operação inteira parar por conta de bloqueio inesperado é um risco real." },
        insight: "Empresas que operam em escala não podem depender de uma solução que dorme em cima de um acordo que o WhatsApp pode encerrar sem aviso. Risco operacional não é estratégia.",
        steps: ["Avalie quantas conversas simultâneas sua operação atual suporta (com WhatsApp Plus, o limite é baixo)", "Calcule o impacto financeiro de 24h de plataforma parada por banimento", "Solicite uma análise do plano de migração para API Oficial via Konnex", "A migração mantém o número, o histórico e o contato com todos os clientes existentes"],
        detail1: { badge: "O QUE MUDA COM A API OFICIAL", text: "Estabilidade operacional → Número verificado pela Meta → Sem risco de banimento → Suporte direto → Milhares de conversas simultâneas → CRM integrado nativo → Compliance total." },
        detail2: { badge: "SOBRE A MIGRAÇÃO", text: "A migração de WhatsApp Plus para API Oficial pelo Konnex é feita em 24–48h, sem interrupção de atendimento, mantendo o mesmo número de telefone e todo o histórico acessível." },
        rule: "Operar com risco de banimento é como ter a empresa inteira dependendo de um fio que o WhatsApp pode cortar amanhã.",
        cta: "Migre para a API Oficial antes que seja tarde. Link na bio."
    },
    {
        id: 30, topic: "Experiência do Cliente", funnel: "BOFU",
        title: "O cliente não te recomenda pelo produto. Ele te recomenda pela experiência.",
        myth: { left: "Se o produto for bom, o cliente vai indicar naturalmente.", right: "Clientes recomendam experiências inesquecíveis, não apenas produtos competentes. A experiência é o que diferencia em mercados saturados." },
        insight: "Num mercado onde todos os produtos competem por preço, a experiência vira o único diferencial que não pode ser copiado diretamente. É a personalidade da sua empresa.",
        steps: ["Mapeie todos os pontos de contato do cliente com seu negócio (do primeiro anúncio ao pós-venda)", "Identifique quais pontos geram atrito (demora, repetição, confusão, frieza)", "Automatize os pontos de atrito mantendo o tom humano nas mensagens", "Surpreenda em momentos inesperados: parabéns no aniversário, dica relevante no mês seguinte à compra"],
        detail1: { badge: "OS MOMENTOS QUE FICAM", text: "O cliente esquece o preço. Ele lembra da mensagem que chegou no domingo avisando que o pedido saiu. Lembra do áudio do vendedor após a entrega perguntando se estava tudo certo. Esses momentos constroem brand equity real." },
        detail2: { badge: "AUTOMAÇÃO COM ALMA", text: "Konnex permite mensagens automáticas com variáveis dinâmicas que parecem escritas à mão. Aniversário com nome, pós-compra com produto certo, reativação no aniversário de 1 ano do cliente. Escala sem perder humanidade." },
        rule: "Experiência não é o que você entrega. É o que o cliente sente que recebeu.",
        cta: "Crie experiências inesquecíveis para seus clientes. Comece pelo link na bio."
    }
];

// =============================================================================
// ENGINE DE CONSTRUÇÃO DOS CARROSSÉIS
// Estrutura: 6 slides densos com imagem em todos
// 1 COVER → 2 MYTH → 3 CONTENT (insight) → 4 CHECKLIST → 5 DETAIL (combinado) → 6 CTA
// =============================================================================

// Picsum seeds consistentes por ID+slide (CORS-free, sem API key)
function img(carouselId, slideIdx) {
    const seeds = [
        'aurora', 'nebula', 'prism', 'circuit', 'vertex', 'cosmos',
        'matrix', 'forge', 'signal', 'horizon', 'apex', 'quantum'
    ];
    const seed = seeds[(carouselId * 7 + slideIdx * 3) % seeds.length];
    return `https://picsum.photos/seed/${seed}${carouselId}${slideIdx}/1080/1350`;
}

function buildCarousel(fw) {
    const c = fw.id;
    return {
        id: fw.id,
        title: fw.title,
        topic: fw.topic,
        topicFilter: fw.topic,
        awarenessFilter: fw.funnel,
        slides: [
            // ── Slide 1: COVER ─────────────────────────────────────
            {
                type: 'COVER',
                title: fw.title,
                imageUrl: img(c, 1)
            },
            // ── Slide 2: MYTH (2 colunas) ──────────────────────────
            {
                type: 'MYTH',
                myth: fw.myth.left,
                truth: fw.myth.right,
                imageUrl: img(c, 2)
            },
            // ── Slide 3: INSIGHT (a revelação) ─────────────────────
            {
                type: 'CONTENT',
                subtitle: '⚠️ A REALIDADE',
                text: fw.insight,
                imageUrl: img(c, 3)
            },
            // ── Slide 4: CHECKLIST (método em 4 passos) ────────────
            {
                type: 'CHECKLIST',
                title: 'O Método: 4 Passos',
                items: fw.steps,
                imageUrl: img(c, 4)
            },
            // ── Slide 5: DETAIL (combina detail1 + detail2 + rule) ─
            {
                type: 'DETAIL',
                badge1: fw.detail1.badge,
                text1: fw.detail1.text,
                badge2: fw.detail2.badge,
                text2: fw.detail2.text,
                rule: fw.rule,
                imageUrl: img(c, 5)
            },
            // ── Slide 6: CTA ────────────────────────────────────────
            {
                type: 'CTA',
                heading: 'Pronto para escalar?',
                text: fw.cta,
                imageUrl: img(c, 6)
            }
        ]
    };
}

function main() {
    let existing = [];
    try {
        const raw = fs.readFileSync('carrosseis_data.js', 'utf8');
        const j = raw.indexOf('[');
        const k = raw.lastIndexOf(']');
        if (j !== -1 && k !== -1) existing = JSON.parse(raw.substring(j, k + 1));
    } catch (_) { }

    const existingIds = new Set(existing.map(c => c.id));
    const novos = frameworks.filter(fw => !existingIds.has(fw.id)).map(fw => buildCarousel(fw));

    if (novos.length === 0) {
        console.log('Nenhum carrossel novo para gerar. Todos já existem.');
        return;
    }

    const todos = [...existing, ...novos];
    fs.writeFileSync('carrosseis_data.js', 'const carrosseisData = ' + JSON.stringify(todos, null, 2) + ';', 'utf8');
    console.log('✅ ' + novos.length + ' novos carrosséis gerados. Total: ' + todos.length);
}

main();
