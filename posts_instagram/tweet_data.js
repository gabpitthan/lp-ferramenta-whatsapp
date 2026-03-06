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
                author: 'Automação na Prática',
                handle: '@konnex_oficial',
                avatar: 'https://picsum.photos/seed/konnex/100/100', // Substituir futuramente pela logo real da Konnex
                text: 'A verdade que ninguém te conta sobre automação de processos:\n\nNão é sobre substituir pessoas. É sobre parar de tratar pessoas como robôs. 🤖❌',
                time: '10:42 AM · 12 Out 2024',
                metrics: { retweets: '1.2k', quotes: '145', likes: '4.8k' }
            },
            {
                type: 'TWEET',
                author: 'Automação na Prática',
                handle: '@konnex_oficial',
                avatar: 'https://picsum.photos/seed/konnex/100/100',
                text: 'Você contrata um talento incrível de vendas e suporte...\n\nE coloca ele pra ficar copiando e colando dados de planilha o dia inteiro.\n\nIsso não é gestão, é desperdício de potencial cerebral. 🧠💸',
                time: '10:44 AM · 12 Out 2024',
                metrics: { retweets: '890', quotes: '62', likes: '2.1k' }
            },
            {
                type: 'TWEET',
                author: 'Automação na Prática',
                handle: '@konnex_oficial',
                avatar: 'https://picsum.photos/seed/konnex/100/100',
                text: 'O cenário ideal:\n\nSistemas conversam entre si. \nTarefas repetitivas rodam em background através do n8n.\nE sua equipe focada em relacionamento, estratégia e em FECHAR NEGÓCIOS.\n\nAí sim a escala acontece. 📈🚀',
                time: '10:48 AM · 12 Out 2024',
                metrics: { retweets: '2.4k', quotes: '312', likes: '8.9k' }
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
                author: 'Konnex',
                handle: '@konnex_oficial',
                avatar: 'https://picsum.photos/seed/konnex/100/100',
                text: '"Nós ainda não temos orçamento para platarformas de automação."\n\nMas tem orçamento para pagar salário de alguém fazer o trabalho de um robô de R$100/mês? 🤔',
                time: '08:15 AM · 05 Set 2024',
                metrics: { retweets: '5k', quotes: '890', likes: '18k' }
            },
            {
                type: 'TWEET',
                author: 'Konnex',
                handle: '@konnex_oficial',
                avatar: 'https://picsum.photos/seed/konnex/100/100',
                text: 'Calcule rápido:\n2 horas/dia perdidas em tarefas manuais = 10 horas/semana.\nSão 40 horas no mês. \nUma semana inteira de trabalho jogada no lixo CADA MÊS por colaborador. 🗑️⌚',
                time: '08:16 AM · 05 Set 2024',
                metrics: { retweets: '1.8k', quotes: '120', likes: '6.2k' }
            },
            {
                type: 'TWEET',
                author: 'Konnex',
                handle: '@konnex_oficial',
                avatar: 'https://picsum.photos/seed/konnex/100/100',
                text: 'E não é só o tempo... é o erro humano.\n\nUm lead esquecido. Um follow-up que não foi enviado. Uma planilha desatualizada.\n\nVocê está perdendo vendas todo dia por falta de processos.\nA Konnex resolve isso. Link na bio para consultoria.',
                time: '08:20 AM · 05 Set 2024',
                metrics: { retweets: '3.1k', quotes: '415', likes: '12.5k' }
            }
        ]
    }
];

if (typeof window !== 'undefined') {
    window.tweetCarrosseis = tweetCarrosseis;
}
