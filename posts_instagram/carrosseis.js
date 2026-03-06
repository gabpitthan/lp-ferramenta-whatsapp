const postArea = document.getElementById('postCaptureArea');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slideCounter = document.getElementById('slideCounter');
const typeTag = document.getElementById('carouselTypeTag');
const selector = document.getElementById('carouselSelector');
const fontIncBtn = document.getElementById('fontIncBtn');
const fontDecBtn = document.getElementById('fontDecBtn');
const fontScaleLabel = document.getElementById('fontScaleLabel');
const categoryBar = document.getElementById('categoryBar');

let filteredCarousels = [];
let currentIndexInFilter = 0;
let currentSlideIndex = 0;
let fontScale = 1.0;
let activeCategoryId = null;

// ========================
// CATEGORY REGISTRY
// ========================
// Each entry defines a category. To add a new category, add a new object here
// and load its data via a <script> tag before carrosseis.js in carrosseis.html.
//
// Fields:
//  id       – unique string identifier
//  label    – display name shown on the category button
//  icon     – emoji icon for the button
//  color    – CSS accent color (used for the active state border/glow)
//  getData  – function that returns the array of carousels for this category
//
const CATEGORY_REGISTRY = [
    {
        id: 'tweet-style',
        label: 'Estilo Tweet (X)',
        icon: '💬',
        color: '#1DA1F2',
        getData: () => window.tweetCarrosseis || [],
    },
    {
        id: 'konnex-funil',
        label: 'Konnex – Funil Completo',
        icon: '⚡',
        color: '#10B981',
        getData: () => window.konnexCarrosseis || (typeof carrosseisData !== 'undefined' ? carrosseisData : []),
    },
    // Add new categories here, for example:
    // {
    //   id: 'clinicas',
    //   label: 'Clínicas',
    //   icon: '🏥',
    //   color: '#3B82F6',
    //   getData: () => window.clinicasCarrosseis || [],
    // },
];

// ========================
// FONT SCALE
// ========================
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

// ========================
// CATEGORY BAR RENDERING
// ========================
function renderCategoryBar() {
    if (!categoryBar) return;

    // Remember current selection
    const currentVal = categoryBar.value;
    categoryBar.innerHTML = '';

    CATEGORY_REGISTRY.forEach(cat => {
        const data = cat.getData();
        const count = Array.isArray(data) ? data.length : 0;
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = `${cat.icon} ${cat.label} (${count})`;
        categoryBar.appendChild(option);
    });

    // Restore or keep active selection
    if (activeCategoryId) {
        categoryBar.value = activeCategoryId;
    } else if (currentVal) {
        categoryBar.value = currentVal;
    }
}

// ========================
// LOAD A CATEGORY
// ========================
function loadCategory(catId) {
    const cat = CATEGORY_REGISTRY.find(c => c.id === catId);
    if (!cat) return;

    activeCategoryId = catId;
    filteredCarousels = cat.getData() || [];
    currentIndexInFilter = 0;
    currentSlideIndex = 0;

    categoryBar.value = catId;
    populateSelector();
}

function populateSelector() {
    selector.innerHTML = '';

    if (filteredCarousels.length === 0) {
        selector.innerHTML = '<option value="">Nenhum encontrado</option>';
        currentIndexInFilter = 0;
        currentSlideIndex = 0;
        renderSlide();
        return;
    }

    filteredCarousels.forEach((carousel, idx) => {
        const option = document.createElement('option');
        option.value = idx;
        option.innerText = `${idx + 1}/${filteredCarousels.length} — ${carousel.title}`;
        selector.appendChild(option);
    });

    currentIndexInFilter = 0;
    currentSlideIndex = 0;
    renderSlide();
}

// ========================
// INIT
// ========================
function init() {
    // Build the category dropdown
    renderCategoryBar();

    // Listen for category changes
    categoryBar.addEventListener('change', (e) => {
        loadCategory(e.target.value);
    });

    // Auto-select the first category that has data
    const firstWithData = CATEGORY_REGISTRY.find(cat => {
        const d = cat.getData();
        return Array.isArray(d) && d.length > 0;
    });
    if (firstWithData) {
        loadCategory(firstWithData.id);
    }

    selector.addEventListener('change', (e) => {
        currentIndexInFilter = parseInt(e.target.value);
        currentSlideIndex = 0; // reset to first slide
        renderSlide();
    });
}

// ========================
// RENDER SLIDE
// ========================
function renderSlide() {
    if (filteredCarousels.length === 0) {
        slideCounter.innerText = '0 / 0';
        typeTag.innerText = 'SEM RESULTADOS';
        postArea.innerHTML = '<div style="color:white; display:flex; padding:50px; font-size:24px;">Nenhum carrossel nesta categoria.</div>';
        return;
    }

    const carousel = filteredCarousels[currentIndexInFilter];
    const slide = carousel.slides[currentSlideIndex];

    slideCounter.innerText = `Slide ${currentSlideIndex + 1} / ${carousel.slides.length}`;
    typeTag.innerText = slide.type;

    let html = '';

    // Standard aesthetic bases
    const logoLayer = `
        <div class="brand-logo-layer">
            <div class="brand-text">Konnex</div>
        </div>
    `;

    const bgLayer = `
        <div class="grid-bg"></div>
        <div class="orb orb-emerald"></div>
        <div class="orb orb-blue"></div>
    `;

    const instructionsHintHtml = `
        <div style="position: absolute; bottom: 50px; right: 80px; font-family:var(--font-heading); color: var(--clr-gray-400); font-weight: 700; font-size: 20px; z-index: 50; display:flex; align-items:center; gap: 8px;">
            Arraste para o lado <i class="ph-bold ph-arrow-right"></i>
        </div>
    `;

    // Slide indicator balls
    let dotsHtml = '<div style="position:absolute; top: 60px; right: 80px; display:flex; gap:8px; z-index:50;">';
    for (let i = 0; i < carousel.slides.length; i++) {
        const isActive = i === currentSlideIndex;
        const color = isActive ? 'var(--clr-emerald-light)' : 'rgba(255,255,255,0.2)';
        const width = isActive ? '30px' : '10px';
        dotsHtml += `<div style="width: ${width}; height: 10px; background: ${color}; border-radius: 5px; transition: 0.3s;"></div>`;
    }
    dotsHtml += '</div>';

    // Picsum Photos supports CORS natively, no need for a proxy wrapper anymore.
    const imageLayer = slide.imageUrl ? `
        <img src="${slide.imageUrl}" onerror="this.onerror=null;this.src='${slide.fallbackUrl || ''}';" class="carousel-image-bg" crossorigin="anonymous">
        <div class="carousel-image-fade"></div>
    ` : '';

    // Different layout for slide types
    if (slide.type === 'TWEET') {
        html = `
            ${currentSlideIndex < carousel.slides.length - 1 ? instructionsHintHtml : ''}
            ${dotsHtml}
            <div class="post-content-layer tpl-tweet">
                <div class="tweet-card">
                    <div class="tweet-header">
                        <img src="${slide.avatar || 'avatar-gabriel.svg'}" class="tweet-avatar" alt="Avatar">
                        <div class="tweet-author-info">
                            <div class="tweet-author">${slide.author || 'Gabriel Varella Pitthan'} <span class="verified-badge">✓</span></div>
                            <div class="tweet-handle">${slide.handle || '@ogabrielvarella'}</div>
                        </div>
                    </div>
                    <div class="tweet-body">
                        ${slide.text.replace(/\n/g, '<br>')}
                    </div>
                </div>
            </div>
        `;
    } else if (slide.type === 'COVER') {
        html = `
            ${bgLayer}
            ${imageLayer}
            ${logoLayer}
            ${instructionsHintHtml}
            <div class="post-content-layer tpl-feature" style="padding-top: 150px;">
                <div class="feature-pill">
                    <div class="feature-pill-dot"></div>
                    <div class="feature-pill-text">ESTRATÉGIA</div>
                </div>
                <div class="title-xl title-gradient" style="font-size: calc(60px * var(--fs, 1)); text-align: left; max-width: 90%; margin: 0 auto; line-height: 1.1;">${slide.title}</div>
            </div>
        `;
    } else if (slide.type === 'CONTENT') {
        html = `
            ${bgLayer}
            ${imageLayer}
            ${logoLayer}
            ${currentSlideIndex < carousel.slides.length - 1 ? instructionsHintHtml : ''}
            ${dotsHtml}
            <div class="post-content-layer">
                <div class="post-badge">${slide.subtitle}</div>
                <div class="text-lg" style="font-weight: 600; font-size: calc(36px * var(--fs, 1)); color: var(--clr-white); line-height: 1.5;">${slide.text}</div>
            </div>
        `;
    } else if (slide.type === 'STAT_SLIDE') {
        html = `
            ${bgLayer}
            ${imageLayer}
            ${logoLayer}
            ${currentSlideIndex < carousel.slides.length - 1 ? instructionsHintHtml : ''}
            ${dotsHtml}
            <div class="post-content-layer tpl-stat" style="padding-left: 100px;">
                <div class="post-badge">DADO REVELADOR</div>
                <div class="stat-number" style="font-size: calc(150px * var(--fs, 1)); margin-bottom: 20px;">${slide.stat}</div>
                <div class="text-lg" style="color: var(--clr-gray-300); font-size: calc(32px * var(--fs, 1));">${slide.text}</div>
            </div>
        `;
    } else if (slide.type === 'CTA') {
        html = `
            ${bgLayer}
            ${imageLayer}
            <div class="orb orb-orange" style="width:800px; height:800px; background:var(--clr-orange); opacity:0.1; filter:blur(150px); position:absolute; top:-300px; left:-300px; z-index:2;"></div>
            ${logoLayer}
            ${dotsHtml}
            <div class="post-content-layer tpl-feature" style="justify-content: center; padding-top:80px;">
                <div class="icon-box icon-green" style="margin: 0 auto 30px auto; width: 100px; height: 100px; border-radius: 30px; font-size: calc(52px * var(--fs, 1));">🚀</div>
                <div class="title-xl" style="font-size: calc(42px * var(--fs, 1)); max-width:85%; margin:0 auto 20px auto; line-height:1.2;">${slide.heading || 'Pronto para Escalar?'}</div>
                <div class="text-lg" style="color: var(--clr-gray-300); max-width: 80%; margin: 0 auto 40px auto; font-size: calc(24px * var(--fs, 1));">${slide.text}</div>
                <div style="font-family: var(--font-heading); font-size: calc(26px * var(--fs, 1)); font-weight: 800; background: white; color: var(--clr-navy); padding: 18px 44px; border-radius: 100px; display: inline-block;">LINK NA BIO</div>
            </div>
        `;
    } else if (slide.type === 'DETAIL') {
        html = `
            ${bgLayer}
            ${imageLayer}
            ${logoLayer}
            ${dotsHtml}
            <div class="post-content-layer" style="padding: 60px 80px; display:flex; flex-direction:column; gap:36px; justify-content:center;">
                <div>
                    <div class="post-badge" style="margin-bottom:14px;">${slide.badge1}</div>
                    <div style="font-size: calc(28px * var(--fs, 1)); color: var(--clr-white); line-height:1.5; font-weight:500;">${slide.text1}</div>
                </div>
                <div style="width:100%; height:2px; background: linear-gradient(90deg, var(--clr-emerald-light), transparent);"></div>
                <div>
                    <div class="post-badge" style="margin-bottom:14px;">${slide.badge2}</div>
                    <div style="font-size: calc(28px * var(--fs, 1)); color: var(--clr-white); line-height:1.5; font-weight:500;">${slide.text2}</div>
                </div>
            </div>
        `;
    } else if (slide.type === 'DETAIL_RULE') {
        // Same as DETAIL but adds the golden rule at the bottom
        html = `
            ${bgLayer}
            ${imageLayer}
            ${logoLayer}
            ${dotsHtml}
            <div class="post-content-layer" style="padding: 60px 80px; display:flex; flex-direction:column; gap:28px; justify-content:center;">
                <div>
                    <div class="post-badge" style="margin-bottom:14px;">${slide.badge1}</div>
                    <div style="font-size: calc(26px * var(--fs, 1)); color: var(--clr-white); line-height:1.5;">${slide.text1}</div>
                </div>
                <div style="width:100%; height:2px; background: linear-gradient(90deg, var(--clr-emerald-light), transparent);"></div>
                <div style="background: rgba(16,185,129,0.1); border-left: 4px solid var(--clr-emerald-light); padding: 20px 24px; border-radius: 0 12px 12px 0;">
                    <div style="font-size: calc(20px * var(--fs, 1)); font-weight:800; color: var(--clr-emerald-light); font-family:var(--font-heading); text-transform:uppercase; letter-spacing:1px; margin-bottom:10px;">🏆 Regra de Ouro</div>
                    <div style="font-size: calc(24px * var(--fs, 1)); color: var(--clr-white); line-height:1.4; font-style: italic;">${slide.rule}</div>
                </div>
            </div>
        `;
    } else if (slide.type === 'MYTH') {
        html = `
            ${imageLayer}
            ${dotsHtml}
            <div class="post-content-layer tpl-myth">
                <div class="split-pane pane-left">
                    <div class="split-tag" style="font-size: calc(20px * var(--fs, 1));">COMO FAZEM</div>
                    <div class="split-text" style="font-size: calc(32px * var(--fs, 1));">${slide.myth}</div>
                </div>
                <div class="split-pane pane-right">
                    <div class="grid-bg" style="z-index:-1"></div>
                    <div class="orb orb-emerald" style="top:50%; right:-100px; z-index:-1"></div>
                    <div class="split-tag" style="font-size: calc(20px * var(--fs, 1));">A EXCELÊNCIA</div>
                    <div class="split-text" style="font-size: calc(32px * var(--fs, 1));">${slide.truth}</div>
                </div>
            </div>
            <!-- Logo pinned to bottom-right for MYTH layout -->
            <div style="position:absolute; bottom:40px; right:60px; z-index:100; font-family:var(--font-heading); font-weight:800; font-size:26px; color:white; letter-spacing:-0.5px; opacity:0.8;">Konnex</div>
        `;
    } else if (slide.type === 'CHECKLIST') {
        let itemsHtml = '';
        (slide.items || []).forEach(item => {
            itemsHtml += `
                <div class="checklist-item" style="font-size: calc(28px * var(--fs, 1)); padding: 25px;">
                    <div class="check-icon">✓</div>
                    <div class="check-text">${item}</div>
                </div>
            `;
        });
        html = `
            ${bgLayer}
            ${imageLayer}
            ${logoLayer}
            ${dotsHtml}
            <div class="post-content-layer tpl-checklist">
                <div class="post-badge">O PASSO A PASSO</div>
                <div class="title-xl" style="font-size: calc(50px * var(--fs, 1)); margin-bottom: 20px;">${slide.title}</div>
                ${slide.text ? `<div class="text-lg" style="font-weight: 500; font-size: calc(30px * var(--fs, 1)); color: var(--clr-gray-300); margin-bottom: 30px; line-height: 1.4;">${slide.text}</div>` : ''}
                <div class="checklist-container">
                    ${itemsHtml}
                </div>
            </div>
        `;
    } else if (slide.type === 'QUOTE') {
        html = `
            ${bgLayer}
            ${imageLayer}
            ${logoLayer}
            ${dotsHtml}
            <div class="post-content-layer tpl-quote" style="padding: 100px 50px;">
                <div class="quote-mark" style="font-size: calc(150px * var(--fs, 1)); top: -40px;">"</div>
                <div class="title-xl" style="font-size: calc(50px * var(--fs, 1)); font-style: italic; line-height: 1.4;">${slide.quote}</div>
                <div class="author" style="font-size: calc(30px * var(--fs, 1)); margin-top: 50px;">${slide.author}</div>
            </div>
        `;
    }

    postArea.innerHTML = html;
}

prevBtn.addEventListener('click', () => {
    if (filteredCarousels.length === 0) return;
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        renderSlide();
    } else if (currentIndexInFilter > 0) {
        // Go to previous carousel if at the start of current one
        currentIndexInFilter--;
        selector.value = currentIndexInFilter;
        currentSlideIndex = filteredCarousels[currentIndexInFilter].slides.length - 1;
        renderSlide();
    }
});

nextBtn.addEventListener('click', () => {
    if (filteredCarousels.length === 0) return;
    const carousel = filteredCarousels[currentIndexInFilter];

    if (currentSlideIndex < carousel.slides.length - 1) {
        currentSlideIndex++;
        renderSlide();
    } else if (currentIndexInFilter < filteredCarousels.length - 1) {
        // Move to the next carousel automatically
        currentIndexInFilter++;
        selector.value = currentIndexInFilter;
        currentSlideIndex = 0;
        renderSlide();
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
        if (filteredCarousels.length === 0) return;

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

                // Format name: konnex-carrossel-{ID}-slide-{index}.png
                const cId = filteredCarousels[currentIndexInFilter].id;
                const sIdx = currentSlideIndex + 1;
                link.download = `konnex-carrossel-${cId}-slide-${sIdx}.png`;

                link.href = dataUrl;
                link.click();

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
window.addEventListener('DOMContentLoaded', init);

// ========================
// CAPTION GENERATION MODULE
// ========================

const captionTextarea = document.getElementById('captionTextarea');
const copyBtn = document.getElementById('copyBtn');

const hashtagByCarouselTopic = {
    'Vendas Perdidas': '#vendas #comercial #whatsapp #atendimento #automacaocomercial #crm #faturamento #negócios #empreendedorismo #gestaocomercial',
    'Caos no WhatsApp': '#whatsapp #whatsappbusiness #atendimento #automacao #gestao #organizacao #digital #negócios #empreendedor #comunicacaodigital',
    'Atendimento Lento': '#atendimento #customerexperience #cx #experienciadocliente #automacao #qualidade #negócios #empreendedorismo #whatsapp #clientes',
    'Falta de Follow-Up': '#followup #vendas #crm #automacao #negócios #comercial #gestao #produtividade #faturamento #digital',
    'Equipe Sobrecarregada': '#gestao #equipes #lideranca #automacao #produtividade #negócios #empreendedorismo #rh #processos #eficiencia',
    'Respostas Repetitivas': '#automacao #whatsapp #produtividade #processos #negócios #empreendedor #digital #gestao #eficiencia #escalabilidade',
    'Leads Ignorados': '#leads #conversao #trafegoago #marketing #automacao #negócios #gestao #vendas #digital #empreendedorismo',
    'Sem Organização': '#organizacao #gestao #processos #digital #automacao #negócios #crm #produtividade #empreendedor #lideranca',
    'Escala Impossível': '#escala #crescimento #automacao #negócios #gestao #empreendedorismo #digital #processos #eficiencia #vendas',
    'Disparos em Massa': '#marketingdigital #whatsapp #email #automacao #disparos #digital #gestao #negócios #empreendedorismo #crm',
    'Qualificação de Leads': '#leads #funil #crm #vendas #automacao #comercial #negócios #empreendedorismo #conversao #marketing',
    'Gestão de Equipe': '#gestao #lideranca #equipes #rh #automacao #produtividade #negócios #empreendedorismo #processos #digital',
    'DEFAULT': '#automacao #whatsapp #negócios #gestao #empreendedorismo #atendimento #vendas #digital #crescimento #escalabilidade',
};

const carouselCtaPool = [
    '👉 Arraste os slides para ver como sair dessa. O link está na bio.',
    '👉 Se você reconheceu isso, salva o carrossel e compartilha com quem precisa.',
    '👉 Quer resolver isso de vez? O link está na bio com a solução.',
    '👉 Comenta aqui se isso é uma realidade na sua empresa.',
    '👉 Manda esse carrossel pro seu sócio. Urgente.',
    '👉 Seguindo para não perder mais conteúdo assim toda semana.',
    '👉 Quer saber como implementar isso? Comenta "QUERO" aqui embaixo.',
];

function pickRandC(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function generateCarouselCaption(carousel) {
    if (!carousel) return '';

    // Get the problem slide content for the opener
    const problemSlide = carousel.slides.find(s => s.subtitle === 'O PROBLEMA');
    const ctaSlide = carousel.slides.find(s => s.type === 'CTA');

    const opener = problemSlide
        ? `📌 ${carousel.title.replace(/\(.*?\)/g, '').trim()}\n\n${problemSlide.text}`
        : `📌 ${carousel.title.replace(/\(.*?\)/g, '').trim()}`;

    const closing = ctaSlide ? `\n\n💡 ${ctaSlide.text}` : '';
    const hashtags = hashtagByCarouselTopic[carousel.topicFilter] || hashtagByCarouselTopic['DEFAULT'];
    const cta = pickRandC(carouselCtaPool);

    return `${opener}${closing}\n\n${cta}\n\n.\n.\n.\n${hashtags}`;
}

function updateCarouselCaption() {
    if (!filteredCarousels.length || !captionTextarea) return;
    const carousel = filteredCarousels[currentIndexInFilter];
    captionTextarea.value = generateCarouselCaption(carousel);
}

// Patch renderSlide to auto-update caption
const _origRenderSlide = renderSlide;
window.renderSlide = function () {
    _origRenderSlide();
    updateCarouselCaption();
};

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
