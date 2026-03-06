const postArea = document.getElementById('postCaptureArea');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const counter = document.getElementById('postCounter');
const typeTag = document.getElementById('postTypeTag');
const fontIncBtn = document.getElementById('fontIncBtn');
const fontDecBtn = document.getElementById('fontDecBtn');
const fontScaleLabel = document.getElementById('fontScaleLabel');

let currentIndex = 0;
let fontScale = 1.0;

function applyFontScale() {
    postArea.style.setProperty('--fs', fontScale);
    fontScaleLabel.innerText = Math.round(fontScale * 100) + '%';
}

if (fontIncBtn) fontIncBtn.addEventListener('click', () => {
    fontScale = Math.min(2.0, parseFloat((fontScale + 0.1).toFixed(1)));
    applyFontScale();
});
if (fontDecBtn) fontDecBtn.addEventListener('click', () => {
    fontScale = Math.max(0.5, parseFloat((fontScale - 0.1).toFixed(1)));
    applyFontScale();
});

let filteredPosts = [];

const filterAwareness = document.getElementById('filterAwareness');
const filterFormat = document.getElementById('filterFormat');
const filterTopic = document.getElementById('filterTopic');

function applyFilters() {
    if (!window.konnexPosts) return;

    const awareVal = filterAwareness.value;
    const formatVal = filterFormat.value;
    const topicVal = filterTopic.value;

    filteredPosts = window.konnexPosts.filter(p => {
        const matchAware = awareVal === 'ALL' || p.awareness === awareVal;
        const matchFormat = formatVal === 'ALL' || p.type === formatVal;
        const matchTopic = topicVal === 'ALL' || p.topic === topicVal;
        return matchAware && matchFormat && matchTopic;
    });

    currentIndex = 0;
    renderPost(currentIndex);
}

// Attach listeners
filterAwareness.addEventListener('change', applyFilters);
filterFormat.addEventListener('change', applyFilters);
filterTopic.addEventListener('change', applyFilters);

function renderPost(index) {
    if (filteredPosts.length === 0) {
        counter.innerText = '0 / 0';
        typeTag.innerText = 'SEM RESULTADOS';
        postArea.innerHTML = '<div style="color:white; display:flex; padding:50px; font-size:24px;">Nenhum post atende aos filtros selecionados.</div>';
        return;
    }

    const post = filteredPosts[index];
    counter.innerText = `${index + 1} / ${filteredPosts.length}`;
    typeTag.innerText = post.type;

    let html = '';

    // Base Background for most posts
    const backgroundHtml = `
        <div class="grid-bg"></div>
        <div class="orb orb-emerald"></div>
        <div class="orb orb-blue"></div>
        <div class="brand-logo-layer">
            <div class="brand-text">Konnex</div>
        </div>
    `;

    if (post.type === 'QUOTE') {
        html = `
            ${backgroundHtml}
            <div class="post-content-layer tpl-quote">
                <div class="quote-mark">"</div>
                <div class="title-xl">${post.quote}</div>
                <div class="author">${post.author}</div>
            </div>
        `;
    } else if (post.type === 'CHECKLIST') {
        let itemsHtml = '';
        post.items.forEach(item => {
            itemsHtml += `
                <div class="checklist-item">
                    <div class="check-icon">✓</div>
                    <div class="check-text">${item}</div>
                </div>
            `;
        });

        html = `
            ${backgroundHtml}
            <div class="post-content-layer tpl-checklist">
                <div class="post-badge">${post.tag || 'VANTAGENS KONNEX'}</div>
                <div class="title-xl">${post.title}</div>
                <div class="checklist-container">
                    ${itemsHtml}
                </div>
            </div>
        `;
    } else if (post.type === 'STAT') {
        html = `
            ${backgroundHtml}
            <div class="post-content-layer tpl-stat">
                <div class="post-badge">${post.tag || 'DADO DO MERCADO'}</div>
                <div class="stat-number">${post.stat}</div>
                <div class="stat-desc">${post.desc}</div>
                <div class="stat-sub">${post.sub}</div>
            </div>
        `;
    } else if (post.type === 'MYTH') {
        html = `
            <div class="post-content-layer tpl-myth">
                <div class="split-pane pane-left">
                    <div class="split-tag">Mito</div>
                    <div class="split-text">${post.myth}</div>
                </div>
                <!-- Hack to force dark pseudo background on the right side behind the layer -->
                <div class="split-pane pane-right">
                    <div class="grid-bg" style="z-index:-1"></div>
                    <div class="orb orb-emerald" style="top:50%; right:-100px; z-index:-1"></div>
                    <div class="split-tag">Verdade</div>
                    <div class="split-text">${post.truth}</div>
                </div>
            </div>
            <!-- Logo pinned to bottom-right for MYTH layout -->
            <div style="position:absolute; bottom:40px; right:60px; z-index:100; font-family:var(--font-heading); font-weight:800; font-size:26px; color:white; letter-spacing:-0.5px; opacity:0.8;">Konnex</div>
        `;
    } else if (post.type === 'FEATURE') {
        html = `
            ${backgroundHtml}
            <div class="post-content-layer tpl-feature">
                <div class="feature-pill">
                    <div class="feature-pill-dot"></div>
                    <div class="feature-pill-text">${post.feature}</div>
                </div>
                <div class="title-xl title-gradient">${post.title}</div>
                <div class="text-lg">${post.desc}</div>
            </div>
        `;
    }

    postArea.innerHTML = html;
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        renderPost(currentIndex);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < filteredPosts.length - 1) {
        currentIndex++;
        renderPost(currentIndex);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
});

// Download Logic
const downloadBtn = document.getElementById('downloadBtn');

if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        downloadBtn.innerText = "Gerando...";
        downloadBtn.style.opacity = "0.7";

        htmlToImage.toPng(document.getElementById('postCaptureArea'), {
            pixelRatio: 1,
            width: 1080,
            height: 1350,
            style: { transform: 'none', boxShadow: 'none' }
        })
            .then(function (dataUrl) {
                const link = document.createElement("a");
                link.download = `konnex-post-${filteredPosts[currentIndex].id}.png`;
                link.href = dataUrl;
                link.click();

                // Revert button state
                downloadBtn.innerText = "Baixar Imagem";
                downloadBtn.style.opacity = "1";
            })
            .catch(function (error) {
                console.error("Erro ao gerar imagem", error);
                downloadBtn.innerText = "Erro!";
                setTimeout(() => { downloadBtn.innerText = "Baixar Imagem"; downloadBtn.style.opacity = "1"; }, 2000);
            });
    });
}

// Init
window.addEventListener('DOMContentLoaded', () => {
    applyFilters();
});

// ========================
// CAPTION GENERATION MODULE
// ========================

const captionTextarea = document.getElementById('captionTextarea');
const copyBtn = document.getElementById('copyBtn');

const hashtagsByTopic = {
    'VENDAS PERDIDAS': '#vendas #comercial #whatsapp #atendimento #automacaocomercial #crm #faturamento #negócios #empreendedorismo #gestaocomercial',
    'CAOS NO WHATSAPP': '#whatsapp #whatsappbusiness #atendimento #automacao #gestao #organizacao #digital #negócios #empreendedor #comunicacaodigital',
    'ATENDIMENTO LENTO': '#atendimento #customerexperience #cx #experienciadocliente #automacao #qualidade #negócios #empreendedorismo #whatsapp #clientes',
    'FINAIS DE SEMANA': '#vendas #atendimento #automacao #negócios #whatsapp #empreendedor #escalabilidade #digital #faturamento #gestao',
    'EQUIPE SOBRECARREGADA': '#gestao #equipes #lideranca #automacao #produtividade #negócios #empreendedorismo #rh #processos #eficiencia',
    'RESPOSTAS MANUAIS': '#automacao #whatsapp #produtividade #processos #negócios #empreendedor #digital #gestao #eficiencia #escalabilidade',
    'CLIENTES IGNORADOS': '#atendimento #cx #clientes #whatsapp #negócios #retenção #fidelização #automacao #gestao #empreendedorismo',
    'DEFAULT': '#automacao #whatsapp #negócios #gestao #empreendedorismo #atendimento #vendas #digital #crescimento #escalabilidade',
};

const ctaPool = [
    '👉 Quer resolver isso de vez? O link está na bio.',
    '👉 Chega de perder venda por processo. Clique no link da bio.',
    '👉 Salva esse post e repassa pra quem precisa ouvir isso.',
    '👉 Comenta aqui embaixo se você já passou por isso.',
    '👉 Manda esse post para o seu sócio. Urgente.',
    '👉 Seguindo para não perder o próximo. Vem conteúdo importante por aí.',
    '👉 O link na bio tem a solução que você está procurando.',
    '👉 Quer que eu explique como resolver isso? Comenta "QUERO" aqui embaixo.',
];

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateCaption(post) {
    if (!post) return '';

    let opener = '';
    if (post.type === 'QUOTE') opener = `"${post.quote}"\n— ${post.author}\n\n📌 Parece simples, mas poucos negócios levam isso a sério. Se você reconheceu algo aqui, é hora de agir.`;
    else if (post.type === 'STAT') opener = `📊 ${post.stat} — ${post.desc}\n\n${post.sub}\n\nO dado não mente. A pergunta é: o que você vai fazer com essa informação?`;
    else if (post.type === 'CHECKLIST') opener = `✅ ${post.title}\n\n${(post.items || []).map(i => `• ${i}`).join('\n')}\n\nSe você marcou mais de 2 itens acima, você sabe o que precisa mudar.`;
    else if (post.type === 'MYTH') opener = `🚫 Mito: "${post.myth}"\n✅ Verdade: "${post.truth}"\n\nEssa confusão custa caro para muitos negócios. Compartilha para quem precisa ver.`;
    else if (post.type === 'FEATURE') opener = `⚡ ${post.title}\n\n${post.desc}\n\nIsso é o que separa negócios que escalam dos que travam.`;
    else opener = `💡 Reflexão do dia para quem está tentando crescer sem enlouquecer.`;

    const topic = (post.topic || 'DEFAULT').toUpperCase();
    const hashtags = hashtagsByTopic[topic] || hashtagsByTopic['DEFAULT'];
    const cta = pickRandom(ctaPool);

    return `${opener}\n\n${cta}\n\n.\n.\n.\n${hashtags}`;
}

function updateCaption() {
    if (!filteredPosts.length || !captionTextarea) return;
    const post = filteredPosts[currentIndex];
    captionTextarea.value = generateCaption(post);
}

// Hook into renderPost to auto-update caption
const _originalRenderPost = renderPost;
window.renderPost = function (index) {
    _originalRenderPost(index);
    updateCaption();
};
// Also re-wire the original so references work
const _rp = renderPost;

// Copy button
if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        if (!captionTextarea.value) return;
        navigator.clipboard.writeText(captionTextarea.value).then(() => {
            copyBtn.innerText = '✅ Copiado!';
            copyBtn.classList.add('copied');
            setTimeout(() => {
                copyBtn.innerHTML = '📋 Copiar Legenda';
                copyBtn.classList.remove('copied');
            }, 2000);
        });
    });
}

