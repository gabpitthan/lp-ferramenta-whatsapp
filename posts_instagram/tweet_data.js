// tweet_data.js
// Banco de dados para carrosséis no estilo "Tweet/Threads" (Falso Print)

const tweetCarrosseis = [
    {
        topic: 'Mentalidade e Rotina',
        funnelStage: 'TOFU',
        title: 'Como sair da estagnação',
        slides: [
            {
                type: 'TWEET',
                author: 'Gabriel Varella Pitthan',
                handle: '@ogabrielvarella',
                avatar: 'avatar-gabriel.svg',
                text: 'A verdade que ninguém te conta sobre automação de processos:\n\nNão é sobre substituir pessoas. É sobre parar de tratar pessoas como robôs. 🤖❌'
            },
            {
                type: 'TWEET',
                author: 'Gabriel Varella Pitthan',
                handle: '@ogabrielvarella',
                avatar: 'avatar-gabriel.svg',
                text: 'Você contrata um talento incrível de vendas e suporte...\n\nE coloca ele pra ficar copiando e colando dados de planilha o dia inteiro.\n\nIsso não é gestão, é desperdício de potencial cerebral. 🧠💸'
            },
            {
                type: 'TWEET',
                author: 'Gabriel Varella Pitthan',
                handle: '@ogabrielvarella',
                avatar: 'avatar-gabriel.svg',
                text: 'O cenário ideal:\n\nSistemas conversam entre si. \nTarefas repetitivas rodam em background através do n8n.\nE sua equipe focada em relacionamento, estratégia e em FECHAR NEGÓCIOS.\n\nAí sim a escala acontece. 📈🚀'
            }
        ]
    },
    {
        topic: 'Custo de Oportunidade',
        funnelStage: 'MOFU',
        title: 'O preço do trabalho manual',
        slides: [
            {
                type: 'TWEET',
                author: 'Gabriel Varella Pitthan',
                handle: '@ogabrielvarella',
                avatar: 'avatar-gabriel.svg',
                text: '"Nós ainda não temos orçamento para platarformas de automação."\n\nMas tem orçamento para pagar salário de alguém fazer o trabalho de um robô de R$100/mês? 🤔'
            },
            {
                type: 'TWEET',
                author: 'Gabriel Varella Pitthan',
                handle: '@ogabrielvarella',
                avatar: 'avatar-gabriel.svg',
                text: 'Calcule rápido:\n2 horas/dia perdidas em tarefas manuais = 10 horas/semana.\nSão 40 horas no mês. \nUma semana inteira de trabalho jogada no lixo CADA MÊS por colaborador. 🗑️⌚'
            },
            {
                type: 'TWEET',
                author: 'Gabriel Varella Pitthan',
                handle: '@ogabrielvarella',
                avatar: 'avatar-gabriel.svg',
                text: 'E não é só o tempo... é o erro humano.\n\nUm lead esquecido. Um follow-up que não foi enviado. Uma planilha desatualizada.\n\nVocê está perdendo vendas todo dia por falta de processos.\nA Konnex resolve isso. Link na bio para consultoria.'
            }
        ]
    }
];

if (typeof window !== 'undefined') {
    window.tweetCarrosseis = tweetCarrosseis;
}
