'use strict';

const OS = (() => {

// ─── AGENTS ──────────────────────────────────────────────────────────────────
const AGENTS = {
  ceo: {
    id:'ceo', name:'CEO Agent', role:'Chief Executive Officer',
    color:'#F59E0B', bg:'rgba(245,158,11,.15)', icon:'👑', shortcode:'CEO',
    prompt:`You are the CEO Agent for Konnex, an AI-powered WhatsApp automation SaaS for Brazilian entrepreneurs. Think strategically, make high-level business decisions, guide company vision. Be direct, confident, results-oriented. Always respond in the same language the user writes in.`,
    caps:['Estratégia empresarial','Planejamento de OKRs','Decisões de produto','Vision & roadmap','Comunicação executiva'],
    quickPrompts:['Qual deve ser nossa prioridade este mês?','Crie um plano de OKRs para o trimestre','Analise nossa posição de mercado','Estratégia de expansão para novos mercados']
  },
  coo: {
    id:'coo', name:'COO Agent', role:'Chief Operating Officer',
    color:'#3B82F6', bg:'rgba(59,130,246,.15)', icon:'⚙️', shortcode:'COO',
    prompt:`You are the COO Agent for Konnex. Focus on operations, processes, execution efficiency. Optimize workflows, manage resources, ensure deliverables are met on time. Respond in the same language as the user.`,
    caps:['Gestão de processos','Otimização operacional','Alocação de recursos','KPIs operacionais','Gestão de projetos'],
    quickPrompts:['Otimize nosso processo de onboarding','Crie um SOP para atendimento','Analise nossos KPIs operacionais','Planeje a sprint da semana']
  },
  content: {
    id:'content', name:'Content Director', role:'Diretor de Conteúdo',
    color:'#EC4899', bg:'rgba(236,72,153,.15)', icon:'🎬', shortcode:'CTD',
    prompt:`You are the Content Director for Konnex. Create compelling content strategies, write copy, generate social media posts, scripts, and marketing materials. Brand voice: modern, confident, results-driven, speaks to Brazilian entrepreneurs. Respond in the same language as the user.`,
    caps:['Estratégia de conteúdo','Copy para redes sociais','Scripts de vídeo','Blog posts','Campanhas de marketing'],
    quickPrompts:['Crie 5 posts para o Instagram sobre WhatsApp automation','Escreva um script de vídeo para o YouTube','Estratégia de conteúdo para o próximo mês','Crie uma copy para anúncio no Meta Ads']
  },
  sales: {
    id:'sales', name:'Sales Agent', role:'Agente de Vendas',
    color:'#FF6B35', bg:'rgba(255,107,53,.15)', icon:'💼', shortcode:'SAL',
    prompt:`You are the Sales Agent for Konnex. Help close deals, handle objections, create sales scripts, analyze calls, identify opportunities. You know the product deeply and the ICP. Extract objections, winning phrases, and closing mistakes from call transcripts. Respond in the same language as the user.`,
    caps:['Scripts de vendas','Análise de calls','Gestão de pipeline','Tratamento de objeções','Propostas comerciais'],
    quickPrompts:['Crie um script de vendas para WhatsApp','Como responder "é muito caro"?','Como aumentar nossa taxa de conversão?','Crie uma proposta comercial']
  },
  dev: {
    id:'dev', name:'Developer', role:'Desenvolvedor Senior',
    color:'#8B5CF6', bg:'rgba(139,92,246,.15)', icon:'💻', shortcode:'DEV',
    prompt:`You are the Developer Agent for Konnex. Write clean efficient code, debug issues, architect systems, build features. Specialize in web technologies, APIs, and automation. Respond in the same language as the user.`,
    caps:['Desenvolvimento de features','Code review','Debugging','Arquitetura de sistemas','Integração de APIs'],
    quickPrompts:['Revise este código','Como implementar esta feature?','Debug este erro','Arquitete esta solução']
  },
  finance: {
    id:'finance', name:'Finance Agent', role:'Agente Financeiro',
    color:'#12C87A', bg:'rgba(18,200,122,.15)', icon:'📊', shortcode:'FIN',
    prompt:`You are the Finance Agent for Konnex. Manage financial planning, analyze revenue, track expenses, create projections, help make financially sound decisions. Respond in the same language as the user.`,
    caps:['Projeções financeiras','Análise de receita','Gestão de custos','Unit economics','Relatórios financeiros'],
    quickPrompts:['Crie uma projeção de receita para 6 meses','Analise nossa estrutura de custos','Calcule o LTV e CAC','Planeje o orçamento do trimestre']
  },
  cs: {
    id:'cs', name:'Client Success', role:'Customer Success Manager',
    color:'#06B6D4', bg:'rgba(6,182,212,.15)', icon:'🤝', shortcode:'CS',
    prompt:`You are the Client Success Agent for Konnex. Ensure clients get maximum value, handle support escalations, create onboarding materials, analyze churn risks, improve NPS. Respond in the same language as the user.`,
    caps:['Onboarding de clientes','Gestão de churn','Suporte escalado','NPS e satisfação','Playbooks de sucesso'],
    quickPrompts:['Crie um playbook de onboarding','Analise risco de churn deste cliente','Como melhorar nosso NPS?','Crie um email de check-in para clientes']
  }
};

// ─── STATE ────────────────────────────────────────────────────────────────────
const S = {
  route: 'overview',
  tasks: [], deliverables: [], content: [], kbDocs: [],
  competitors: [], salesCalls: [], automations: [],
  chatHistory: {},
  settings: { apiKey: '', model: 'claude-sonnet-4-6', companyName: 'Konnex', companyDesc: '', userName: 'Usuário' },
  kbCategory: 'all', contentFilter: 'all', sidebarCollapsed: false,
};

const SAVE_KEYS = ['tasks','deliverables','content','kbDocs','competitors','salesCalls','automations','chatHistory','settings','sidebarCollapsed'];

function save() {
  try {
    const d = {};
    SAVE_KEYS.forEach(k => d[k] = S[k]);
    localStorage.setItem('konnex_os_v3', JSON.stringify(d));
  } catch(e) {}
}

function load() {
  try {
    const d = JSON.parse(localStorage.getItem('konnex_os_v3') || localStorage.getItem('konnex_os_v2') || '{}');
    SAVE_KEYS.forEach(k => { if (d[k] !== undefined) S[k] = d[k]; });
  } catch(e) {}
  if (!S.automations || !S.automations.length) S.automations = defaultAutomations();
  if (!S.chatHistory) S.chatHistory = {};
  if (!S.content) S.content = [];
}

function defaultAutomations() {
  return [
    { id:'a1', title:'Task → Em Andamento → Agente executa automaticamente', desc:'Quando uma tarefa com Prompt IA vai para Em Andamento, o agente executa o prompt e gera um deliverable', active: true },
    { id:'a2', title:'Deliverable gerado → Notificação no painel', desc:'Quando um deliverable é criado, aparece o badge no menu lateral', active: true },
    { id:'a3', title:'Daily Content Engine', desc:'Gera 3 scripts de Instagram, 1 script de YouTube, 5 ideias e 3 hooks virais por execução', active: true },
    { id:'a4', title:'Sales Call → Análise automática com IA', desc:'Ao salvar uma call, o Sales Agent analisa automaticamente e extrai objeccoes, frases e erros', active: true },
    { id:'a5', title:'Knowledge Base → Injetado nos agentes', desc:'Os documentos da Knowledge Base são incluídos no contexto de todos os agentes', active: true },
  ];
}

// ─── UTILS ────────────────────────────────────────────────────────────────────
const uid  = () => Math.random().toString(36).slice(2,9);
const esc  = s => String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const $    = id => document.getElementById(id);
const now  = () => new Date().toLocaleString('pt-BR',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});
const safe = s => String(s||'').replace(/\\/g,'\\\\').replace(/`/g,'\\`').replace(/\$/g,'\\$');

function toast(msg, type='success') {
  let c = $('toastContainer');
  if (!c) { c = document.createElement('div'); c.id = 'toastContainer'; document.body.appendChild(c); }
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<i class="ph ph-${type==='success'?'check-circle':'warning-circle'}"></i><span>${esc(msg)}</span>`;
  c.appendChild(t);
  setTimeout(() => t.remove(), 3500);
}

// KB context for agents
function getKbContext() {
  if (!S.kbDocs.length) return '';
  const docs = S.kbDocs.slice(0,8).map(d => `### ${d.title}\n${d.content}`).join('\n\n');
  return `\n\n---\nKNOWLEDGE BASE (consulte antes de responder):\n${docs}`;
}

// ─── ROUTER ───────────────────────────────────────────────────────────────────
function navigate(route) {
  S.route = route;
  location.hash = route;
  render();
}

// ─── RENDER ───────────────────────────────────────────────────────────────────
const TITLES = {
  overview:'Overview', agents:'Agentes', kanban:'Kanban',
  content:'Content Studio', deliverables:'Deliverables', tools:'Ferramentas',
  sales:'Sales Intelligence', competitor:'Competitor Intel',
  knowledge:'Knowledge Base', automation:'Automações', settings:'Configurações'
};

function render() {
  const route = S.route;
  const main  = $('mainContent');
  if (!main) return;

  document.querySelectorAll('.nav-item[data-route]').forEach(el => {
    el.classList.toggle('active', el.dataset.route === route);
  });

  const parts = route.split('/');
  let title = TITLES[parts[0]] || 'Overview';
  if (parts[0]==='agents' && AGENTS[parts[1]]) title = AGENTS[parts[1]].name;
  $('topbarTitle').textContent = title;

  // badges
  const inProg = S.tasks.filter(t=>t.status==='inprogress').length;
  const kb = $('kanbanBadge');
  if (kb) { kb.style.display = inProg ? '' : 'none'; kb.textContent = inProg; }
  const newD = S.deliverables.filter(d=>!d.seen).length;
  const db = $('deliverablesBadge');
  if (db) { db.style.display = newD ? '' : 'none'; db.textContent = newD; }

  // api dot
  const dot = $('apiDot'), lbl = $('apiLabel');
  if (dot) { dot.className = 'status-dot' + (S.settings.apiKey ? ' online' : ''); }
  if (lbl) { lbl.textContent = S.settings.apiKey ? 'API conectada' : 'API desconectada'; }

  const views = {
    overview, agents, kanban, content, deliverables, tools,
    sales, competitor, knowledge, automation, settings
  };

  if (parts[0]==='agents' && parts[1]) {
    main.innerHTML = agentChat(parts[1]);
    initChat(parts[1]);
  } else if (views[parts[0]]) {
    main.innerHTML = views[parts[0]]();
    if (parts[0]==='kanban') initKanban();
  } else {
    main.innerHTML = overview();
  }
}

// ─── OVERVIEW ─────────────────────────────────────────────────────────────────
function overview() {
  const total  = S.tasks.length;
  const done   = S.tasks.filter(t=>t.status==='done').length;
  const inProg = S.tasks.filter(t=>t.status==='inprogress').length;
  const delivs = S.deliverables.length;
  const contentToday = S.content.filter(c => c.date && c.date.includes(new Date().toLocaleDateString('pt-BR',{day:'2-digit',month:'short'}))).length;

  const setupBanner = !S.settings.apiKey ? `
    <div class="setup-banner">
      <div class="setup-banner-icon">🔑</div>
      <div class="setup-banner-text">
        <h3>Configure sua API Key para ativar os agentes</h3>
        <p>Todos os 7 agentes, Content Engine, Sales Intelligence e Competitor Intel precisam da sua Anthropic API Key. É rápido — leva menos de 1 minuto.</p>
      </div>
      <div class="setup-banner-actions">
        <button class="btn btn-primary" onclick="OS.navigate('settings')"><i class="ph ph-key"></i> Configurar agora</button>
      </div>
    </div>` : '';

  const quickActions = `
    <div class="quick-actions">
      <button class="quick-action-btn" onclick="OS.openTaskModal()"><i class="ph ph-plus"></i> Nova tarefa</button>
      <button class="quick-action-btn" onclick="OS.navigate('agents/ceo')"><i class="ph ph-crown"></i> Falar com CEO</button>
      <button class="quick-action-btn" onclick="OS.navigate('agents/content')"><i class="ph ph-film-slate"></i> Content Director</button>
      <button class="quick-action-btn" onclick="OS.openContentGen()"><i class="ph ph-sparkle"></i> Gerar conteúdo</button>
      <button class="quick-action-btn" onclick="OS.navigate('kanban')"><i class="ph ph-kanban"></i> Ver kanban</button>
    </div>`;

  const agCards = Object.values(AGENTS).map(ag => `
    <div class="agent-status-item" style="cursor:pointer" onclick="OS.navigate('agents/${ag.id}')">
      <div class="agent-status-avatar" style="background:${ag.bg};color:${ag.color}">${ag.icon}</div>
      <div class="agent-status-info">
        <div class="agent-status-name">${ag.name}</div>
        <div class="agent-status-state" style="color:${S.settings.apiKey?'var(--em-l)':'var(--g600)'}">
          ${S.settings.apiKey ? '● Online' : '○ Aguardando API'}
        </div>
      </div>
    </div>`).join('');

  const recentDelivs = [...S.deliverables].slice(0,4).map(d => {
    const ag = AGENTS[d.agent];
    return `<div class="activity-item" style="cursor:pointer" onclick="OS.viewDeliverable('${d.id}')">
      <span style="font-size:1.1rem">${ag?.icon||'📄'}</span>
      <div class="activity-text">${esc(d.title)}</div>
      <div class="activity-time">${d.date||''}</div>
    </div>`;
  }).join('') || `<div class="activity-item"><i class="ph ph-info activity-icon"></i><div class="activity-text">Nenhum deliverable ainda.</div></div>`;

  const recentTasks = [...S.tasks].filter(t=>t.status!=='done').reverse().slice(0,5).map(t => `
    <div class="activity-item" style="cursor:pointer" onclick="OS.openTaskDetail('${t.id}')">
      <i class="ph ph-check-square activity-icon"></i>
      <div class="activity-text">${esc(t.title)}</div>
      <div class="activity-time" style="color:${t.status==='inprogress'?'var(--em-l)':'var(--g500)'}">${t.status==='inprogress'?'Em andamento':t.status==='review'?'Review':t.status}</div>
    </div>`
  ).join('') || `<div class="activity-item"><i class="ph ph-info activity-icon"></i><div class="activity-text">Sem tarefas ativas.</div></div>`;

  return `
    ${setupBanner}
    ${quickActions}
    <div class="metrics-row">
      <div class="metric-card green"><div class="metric-label">Tarefas Totais</div><div class="metric-value">${total}</div><div class="metric-sub">${done} concluídas</div></div>
      <div class="metric-card blue"><div class="metric-label">Em Andamento</div><div class="metric-value">${inProg}</div><div class="metric-sub">tarefas ativas</div></div>
      <div class="metric-card orange"><div class="metric-label">Deliverables</div><div class="metric-value">${delivs}</div><div class="metric-sub">outputs gerados</div></div>
      <div class="metric-card purple"><div class="metric-label">Conteúdo Hoje</div><div class="metric-value">${contentToday}</div><div class="metric-sub">peças criadas</div></div>
    </div>
    <div class="overview-grid">
      <div class="card">
        <div class="section-header" style="margin-bottom:1rem">
          <div><h2>Agentes</h2><p>Clique para conversar</p></div>
          <button class="btn btn-ghost btn-sm" onclick="OS.navigate('agents')">Ver todos</button>
        </div>
        <div class="agents-status-grid">${agCards}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:1.25rem">
        <div class="card">
          <div class="section-header" style="margin-bottom:.75rem"><div><h2>Tarefas Ativas</h2></div><button class="btn btn-ghost btn-sm" onclick="OS.navigate('kanban')">Kanban</button></div>
          <div class="activity-list">${recentTasks}</div>
        </div>
        <div class="card">
          <div class="section-header" style="margin-bottom:.75rem"><div><h2>Deliverables Recentes</h2></div><button class="btn btn-ghost btn-sm" onclick="OS.navigate('deliverables')">Ver todos</button></div>
          <div class="activity-list">${recentDelivs}</div>
        </div>
      </div>
    </div>`;
}

// ─── AGENTS LIST ──────────────────────────────────────────────────────────────
function agents() {
  const cards = Object.values(AGENTS).map(ag => `
    <div class="agent-card" onclick="OS.navigate('agents/${ag.id}')">
      <div class="agent-card-glow" style="background:${ag.color}"></div>
      <div class="agent-card-avatar" style="background:${ag.bg};color:${ag.color};font-size:1.6rem">${ag.icon}</div>
      <div class="agent-card-name">${ag.name}</div>
      <div class="agent-card-role">${ag.role}</div>
      <div class="agent-card-tags">${ag.caps.slice(0,3).map(c=>`<span class="tag tag-gray">${esc(c)}</span>`).join('')}</div>
      <div class="agent-card-footer">
        <span class="agent-card-stat">${(S.chatHistory[ag.id]||[]).length} msgs</span>
        <button class="btn btn-primary btn-sm">Conversar</button>
      </div>
    </div>`).join('');

  return `
    <div class="section-header"><div><h2>Todos os Agentes</h2><p>Selecione um agente para iniciar uma conversa</p></div></div>
    <div class="agents-grid">${cards}</div>`;
}

// ─── AGENT CHAT ───────────────────────────────────────────────────────────────
function agentChat(agId) {
  const ag = AGENTS[agId];
  if (!ag) return `<div class="empty-state"><i class="ph ph-robot"></i><h3>Agente não encontrado</h3></div>`;

  const history = S.chatHistory[agId] || [];
  const msgs = history.map(m => renderMsg(m, ag)).join('') ||
    `<div class="chat-empty"><i class="ph ph-chat-dots"></i><p>Inicie uma conversa com ${ag.name}</p></div>`;

  const qps = ag.quickPrompts.map(p =>
    `<button class="quick-prompt-btn" onclick="OS.useQuickPrompt('${agId}',this)">${esc(p)}</button>`
  ).join('');

  return `
    <div class="chat-layout">
      <div class="chat-info-panel">
        <div class="chat-agent-header">
          <div class="chat-agent-avatar" style="background:${ag.bg};color:${ag.color};font-size:2rem">${ag.icon}</div>
          <div class="chat-agent-name">${ag.name}</div>
          <div class="chat-agent-role">${ag.role}</div>
        </div>
        <div class="chat-info-section">
          <h4>Capacidades</h4>
          <ul class="chat-caps-list">${ag.caps.map(c=>`<li>${esc(c)}</li>`).join('')}</ul>
        </div>
        <div class="chat-info-section">
          <h4>Prompts Rápidos</h4>
          <div class="quick-prompts">${qps}</div>
        </div>
        ${S.kbDocs.length ? `<div class="chat-info-section"><h4>Knowledge Base</h4><div style="font-size:.75rem;color:var(--em-l)"><i class="ph ph-check-circle"></i> ${S.kbDocs.length} docs injetados no contexto</div></div>` : ''}
      </div>
      <div class="chat-main">
        <div class="chat-messages" id="chatMessages">${msgs}</div>
        <div class="chat-input-area">
          <div class="chat-input-row">
            <textarea id="chatInput" placeholder="Mensagem para ${ag.name}..." rows="1"></textarea>
            <button class="chat-send-btn" id="chatSendBtn" onclick="OS.sendMessage('${agId}')">
              <i class="ph ph-paper-plane-tilt"></i>
            </button>
          </div>
          <div class="chat-input-meta">
            <span>Enter para enviar • Shift+Enter para nova linha</span>
            <button class="chat-clear-btn" onclick="OS.clearChat('${agId}')">Limpar conversa</button>
          </div>
        </div>
      </div>
    </div>`;
}

function renderMsg(m, ag) {
  if (m.role === 'user') {
    const initial = (S.settings.userName||'U')[0].toUpperCase();
    return `<div class="msg user">
      <div class="msg-avatar" style="background:linear-gradient(135deg,rgba(10,135,84,.5),rgba(18,200,122,.3));color:#12C87A">${initial}</div>
      <div class="msg-content"><div class="msg-bubble">${esc(m.content)}</div></div>
    </div>`;
  }
  const sc = safe(m.content);
  return `<div class="msg assistant">
    <div class="msg-avatar" style="background:${ag.bg};color:${ag.color}">${ag.icon}</div>
    <div class="msg-content">
      <div class="msg-bubble">${fmtMd(m.content)}</div>
      <div class="msg-actions">
        <button class="msg-action-btn" onclick="OS.saveAsDeliverable(\`${sc}\`,'${ag.id}')">
          <i class="ph ph-package"></i> Salvar deliverable
        </button>
        <button class="msg-action-btn" onclick="navigator.clipboard.writeText(\`${sc}\`);OS.toast('Copiado!')">
          <i class="ph ph-copy"></i> Copiar
        </button>
      </div>
    </div>
  </div>`;
}

function fmtMd(raw) {
  // 1. extract fenced code blocks before escaping
  const blocks = [];
  let s = raw.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
    blocks.push(`<pre class="md-pre"><code>${esc(code.replace(/\n$/,''))}</code></pre>`);
    return `\x00B${blocks.length-1}\x00`;
  });
  // 2. escape
  s = esc(s);
  // 3. markdown rules (order matters)
  s = s
    .replace(/^### (.*?)$/gm, '<h4 class="md-h4">$1</h4>')
    .replace(/^## (.*?)$/gm,  '<h3 class="md-h3">$1</h3>')
    .replace(/^# (.*?)$/gm,   '<h2 class="md-h2">$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g,     '<em>$1</em>')
    .replace(/`([^`\n]+)`/g,  '<code class="md-code">$1</code>')
    .replace(/^&gt; (.*?)$/gm,'<blockquote class="md-bq">$1</blockquote>')
    .replace(/^---+$/gm,      '<hr class="md-hr">')
    .replace(/^[-*•] (.*?)$/gm,'<li>$1</li>')
    .replace(/^\d+\. (.*?)$/gm,'<li>$1</li>');
  // 4. wrap consecutive <li>
  s = s.replace(/(<li>.*?<\/li>[\n\r]?)+/g, m => `<ul class="md-ul">${m}</ul>`);
  // 5. newlines
  s = s.replace(/\n\n+/g, '<br><br>').replace(/\n/g, '<br>');
  // 6. restore code blocks
  blocks.forEach((b, i) => { s = s.replace(`\x00B${i}\x00`, b); });
  return s;
}

function initChat(agId) {
  const input = $('chatInput');
  if (!input) return;
  input.addEventListener('keydown', e => {
    if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(agId); }
  });
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 140) + 'px';
  });
  scrollBottom();
}

function scrollBottom() {
  const c = $('chatMessages');
  if (c) setTimeout(() => c.scrollTop = c.scrollHeight, 50);
}

async function sendMessage(agId) {
  const input = $('chatInput');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  const ag = AGENTS[agId];
  if (!S.chatHistory[agId]) S.chatHistory[agId] = [];
  S.chatHistory[agId].push({ role:'user', content:text });
  input.value = ''; input.style.height = 'auto';

  const msgs = $('chatMessages');
  msgs?.querySelector('.chat-empty')?.remove();
  if (msgs) msgs.insertAdjacentHTML('beforeend', renderMsg({role:'user',content:text}, ag));

  const btn = $('chatSendBtn');
  if (btn) btn.disabled = true;

  let reply;
  if (S.settings.apiKey) {
    const sid = 'sm' + uid();
    const userInitial = (S.settings.userName||'U')[0].toUpperCase();
    msgs?.insertAdjacentHTML('beforeend', `
      <div class="msg assistant" id="${sid}">
        <div class="msg-avatar" style="background:${ag.bg};color:${ag.color}">${ag.icon}</div>
        <div class="msg-content"><div class="msg-bubble" id="${sid}b"><span class="stream-cursor"></span></div></div>
      </div>`);
    scrollBottom();
    reply = await callClaudeStream(agId, null, txt => {
      const b = $(sid+'b');
      if (b) { b.innerHTML = fmtMd(txt) + '<span class="stream-cursor"></span>'; scrollBottom(); }
    });
    $(sid)?.remove();
  } else {
    msgs?.insertAdjacentHTML('beforeend', `
      <div class="msg assistant" id="typingMsg">
        <div class="msg-avatar" style="background:${ag.bg};color:${ag.color}">${ag.icon}</div>
        <div class="msg-content"><div class="typing-indicator">
          <div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>
        </div></div>
      </div>`);
    scrollBottom();
    await new Promise(r => setTimeout(r, 800));
    reply = `⚠️ **API Key não configurada**\n\nVá em **Configurações** e insira sua API Key da Anthropic para ativar todos os agentes com IA.\n\nVocê perguntou: "${text}"`;
    $('typingMsg')?.remove();
  }

  S.chatHistory[agId].push({ role:'assistant', content:reply });
  save();
  msgs?.insertAdjacentHTML('beforeend', renderMsg({role:'assistant',content:reply}, ag));
  scrollBottom();
  if (btn) btn.disabled = false;
}

async function callClaudeStream(agId, overrideMessages, onChunk) {
  const ag = AGENTS[agId];
  const messages = overrideMessages || (S.chatHistory[agId]||[]).map(m=>({role:m.role,content:m.content}));
  const systemPrompt = ag.prompt + getKbContext() +
    (S.settings.companyDesc ? `\n\nContexto da empresa: ${S.settings.companyDesc}` : '');
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method:'POST',
      headers:{
        'x-api-key': S.settings.apiKey,
        'anthropic-version':'2023-06-01',
        'content-type':'application/json',
        'anthropic-dangerous-direct-browser-calls':'true'
      },
      body: JSON.stringify({
        model: S.settings.model||'claude-sonnet-4-6',
        max_tokens: 2048,
        stream: true,
        system: systemPrompt,
        messages
      })
    });
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let full = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      for (const line of dec.decode(value).split('\n')) {
        if (!line.startsWith('data: ')) continue;
        const d = line.slice(6);
        if (d === '[DONE]') continue;
        try {
          const j = JSON.parse(d);
          if (j.type==='content_block_delta' && j.delta?.type==='text_delta') {
            full += j.delta.text;
            onChunk(full);
          }
        } catch(e) {}
      }
    }
    return full || 'Sem resposta.';
  } catch(e) {
    return `Erro ao conectar: ${e.message}`;
  }
}

async function callClaude(agId, overrideMessages) {
  const ag = AGENTS[agId];
  const messages = overrideMessages || (S.chatHistory[agId] || []).map(m => ({ role:m.role, content:m.content }));
  const systemPrompt = ag.prompt + getKbContext() +
    (S.settings.companyDesc ? `\n\nContexto da empresa: ${S.settings.companyDesc}` : '');
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': S.settings.apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
        'anthropic-dangerous-direct-browser-calls': 'true'
      },
      body: JSON.stringify({
        model: S.settings.model || 'claude-sonnet-4-6',
        max_tokens: 2000,
        system: systemPrompt,
        messages
      })
    });
    const data = await res.json();
    if (data.error) return `Erro da API: ${data.error.message}`;
    return data.content?.[0]?.text || 'Sem resposta.';
  } catch(e) {
    return `Erro ao conectar: ${e.message}`;
  }
}

function useQuickPrompt(agId, btn) {
  const input = $('chatInput');
  if (input) { input.value = btn.textContent.trim(); sendMessage(agId); }
}

function clearChat(agId) {
  if (!confirm('Limpar histórico desta conversa?')) return;
  S.chatHistory[agId] = [];
  save(); render();
}

// ─── KANBAN ───────────────────────────────────────────────────────────────────
const COLS = [
  { id:'backlog',    label:'Backlog',           cls:'col-backlog' },
  { id:'inprogress', label:'Em Andamento',      cls:'col-inprogress' },
  { id:'review',     label:'Aguardando Review', cls:'col-review' },
  { id:'blocked',    label:'Bloqueado',         cls:'col-blocked' },
  { id:'done',       label:'Concluído',         cls:'col-done' },
];

function kanban() {
  const cols = COLS.map(col => {
    const tasks = S.tasks.filter(t => t.status === col.id);
    return `
      <div class="kanban-col ${col.cls}" data-col="${col.id}">
        <div class="kanban-col-header">
          <div class="kanban-col-title"><div class="col-indicator"></div>${esc(col.label)}</div>
          <span class="col-count">${tasks.length}</span>
        </div>
        <div class="kanban-cards" id="cards-${col.id}">
          ${tasks.map(t => taskCard(t)).join('')}
        </div>
        <button class="kanban-add-btn" onclick="OS.openTaskModal('${col.id}')">
          <i class="ph ph-plus"></i> Adicionar
        </button>
      </div>`;
  }).join('');

  return `
    <div class="section-header">
      <div><h2>Kanban</h2><p>Arraste tarefas entre colunas. Tarefas com Prompt IA executam automaticamente ao mover para Em Andamento.</p></div>
      <button class="btn btn-primary" onclick="OS.openTaskModal()"><i class="ph ph-plus"></i> Nova Tarefa</button>
    </div>
    <div class="kanban-wrapper"><div class="kanban-board">${cols}</div></div>`;
}

function taskCard(t) {
  const ag = AGENTS[t.agent];
  return `
    <div class="task-card" draggable="true" data-id="${t.id}" onclick="OS.openTaskDetail('${t.id}')">
      <div class="task-card-header">
        <div class="task-card-title">${esc(t.title)}</div>
        <span class="task-priority p-${t.priority||'medium'}">${t.priority||'medium'}</span>
      </div>
      ${t.desc ? `<div class="task-card-desc">${esc(t.desc)}</div>` : ''}
      ${t.aiPrompt ? `<div style="display:flex;align-items:center;gap:.3rem;font-size:.7rem;color:var(--em-l);margin-bottom:.4rem"><i class="ph ph-robot"></i> Com Prompt IA</div>` : ''}
      <div class="task-card-footer">
        <div class="task-tags">${(t.tags||[]).map(tg=>`<span class="task-tag">${esc(tg)}</span>`).join('')}</div>
        ${ag ? `<div class="task-agent-badge" style="background:${ag.bg};color:${ag.color}" title="${ag.name}">${ag.icon}</div>` : ''}
      </div>
    </div>`;
}

function initKanban() {
  let dragging = null;
  document.querySelectorAll('.task-card').forEach(card => {
    card.addEventListener('dragstart', () => {
      dragging = card.dataset.id;
      setTimeout(() => card.classList.add('dragging'), 0);
    });
    card.addEventListener('dragend', () => { card.classList.remove('dragging'); dragging = null; });
  });
  document.querySelectorAll('.kanban-col').forEach(col => {
    col.addEventListener('dragover', e => { e.preventDefault(); col.classList.add('drag-over'); });
    col.addEventListener('dragleave', () => col.classList.remove('drag-over'));
    col.addEventListener('drop', async e => {
      e.preventDefault(); col.classList.remove('drag-over');
      if (!dragging) return;
      const newStatus = col.dataset.col;
      const task = S.tasks.find(t => t.id === dragging);
      if (!task || task.status === newStatus) return;
      task.status = newStatus;
      save(); render(); toast('Tarefa movida');
      // auto-execute when moved to inprogress
      if (newStatus === 'inprogress' && task.aiPrompt && task.agent && S.settings.apiKey) {
        await autoExecuteTask(task);
      }
    });
  });
}

async function autoExecuteTask(task) {
  const ag = AGENTS[task.agent];
  if (!ag) return;
  toast(`${ag.name} executando tarefa...`);
  const msgs = [{ role:'user', content: task.aiPrompt }];
  const reply = await callClaude(task.agent, msgs);
  const delivId = uid();
  S.deliverables.unshift({
    id: delivId, title: `[Auto] ${task.title}`,
    content: reply, agent: task.agent,
    date: now(), seen: false, linkedTask: task.id, tags: task.tags || []
  });
  task.linkedDeliverable = delivId;
  task.status = 'review';
  save();
  toast(`Deliverable gerado por ${ag.name}!`);
  if (S.route === 'kanban') render();
}

// ─── CONTENT STUDIO ───────────────────────────────────────────────────────────
const CONTENT_COLORS = { post:'#EC4899', video:'#8B5CF6', blog:'#3B82F6', email:'#F59E0B', ad:'#FF6B35', hook:'#06B6D4', ideia:'#12C87A' };
const CONTENT_ICONS  = { post:'instagram-logo', video:'video-camera', blog:'article', email:'envelope', ad:'megaphone', hook:'fish-simple', ideia:'lightbulb' };

function content() {
  const types = ['all','post','video','blog','email','ad','hook','ideia'];
  const tabs = types.map(f =>
    `<button class="filter-tab ${S.contentFilter===f?'active':''}" onclick="OS.setContentFilter('${f}')">${f==='all'?'Todos':f[0].toUpperCase()+f.slice(1)}</button>`
  ).join('');

  const items = S.content.filter(c => S.contentFilter==='all' || c.type===S.contentFilter);
  const cards = items.map(c => `
    <div class="content-card" onclick="OS.viewContentItem('${c.id}')">
      <div class="content-card-type" style="color:${CONTENT_COLORS[c.type]||'var(--g400)'}">
        <i class="ph ph-${CONTENT_ICONS[c.type]||'file-text'}"></i>${c.type||'geral'}
      </div>
      <div class="content-card-title">${esc(c.title)}</div>
      <div class="content-card-preview">${esc((c.body||'').slice(0,150))}</div>
      <div class="content-card-meta">
        <span>${AGENTS[c.agent]?.name||'Manual'}</span>
        <span>${c.date||''}</span>
      </div>
    </div>`).join('') || `<div class="empty-state" style="grid-column:1/-1"><i class="ph ph-film-slate"></i><h3>Nenhum conteúdo ainda</h3><p>Clique em "Gerar Conteúdo Diário" ou converse com o Content Director</p></div>`;

  return `
    <div class="section-header">
      <div><h2>Content Studio</h2><p>${S.content.length} peças geradas</p></div>
      <div style="display:flex;gap:.5rem">
        <button class="btn btn-ghost" onclick="OS.navigate('agents/content')"><i class="ph ph-robot"></i> Content Director</button>
        <button class="btn btn-primary" onclick="OS.openContentGen()"><i class="ph ph-sparkle"></i> Gerar Conteúdo Diário</button>
      </div>
    </div>
    <div class="content-toolbar"><div class="filter-tabs">${tabs}</div></div>
    <div class="content-grid">${cards}</div>`;
}

function setContentFilter(f) { S.contentFilter = f; render(); }

function openContentGen() {
  $('contentGenModalBody').innerHTML = `
    <p style="font-size:.875rem;color:var(--g400);margin-bottom:1.25rem;line-height:1.6">
      O Content Director vai gerar automaticamente:<br>
      <strong style="color:var(--w)">3 scripts de Instagram • 1 script de YouTube • 5 ideias de conteúdo • 3 hooks virais</strong>
    </p>
    <div class="form-group">
      <label class="form-label">Nicho / Tema do dia (opcional)</label>
      <input class="form-input" id="cgTopic" placeholder="Ex: automação de WhatsApp para pequenas empresas">
    </div>
    <div class="form-group">
      <label class="form-label">Tom desejado</label>
      <select class="form-select" id="cgTone">
        <option value="educativo">Educativo</option>
        <option value="provocativo">Provocativo / Polêmico</option>
        <option value="inspiracional">Inspiracional</option>
        <option value="direto">Direto / Vendas</option>
      </select>
    </div>
    <div style="margin-top:1.25rem;display:flex;gap:.5rem;justify-content:flex-end">
      <button class="btn btn-ghost" onclick="OS.closeModal('contentGenModal')">Cancelar</button>
      <button class="btn btn-primary" id="cgBtn" onclick="OS.runContentGen()">
        <i class="ph ph-sparkle"></i> Gerar tudo com IA
      </button>
    </div>`;
  openModal('contentGenModal');
}

async function runContentGen() {
  if (!S.settings.apiKey) { toast('Configure a API Key em Configurações','error'); return; }
  const btn = $('cgBtn');
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="ph ph-circle-notch ph-spin"></i> Gerando...'; }

  const topic = $('cgTopic')?.value.trim() || 'automação de WhatsApp para empreendedores brasileiros';
  const tone  = $('cgTone')?.value || 'educativo';

  const prompt = `Você é o Content Director da Konnex. Gere o seguinte conteúdo sobre "${topic}" com tom ${tone}:

1. SCRIPTS INSTAGRAM (3 scripts completos para Reels/Carrossel)
2. SCRIPT YOUTUBE (1 script completo com abertura, desenvolvimento e CTA)
3. IDEIAS DE CONTEÚDO (5 ideias únicas e específicas)
4. HOOKS VIRAIS (3 hooks para abrir vídeos/posts)

Separe claramente cada seção com "===SECAO===" e o tipo: INSTAGRAM_1, INSTAGRAM_2, INSTAGRAM_3, YOUTUBE, IDEIA_1, IDEIA_2, IDEIA_3, IDEIA_4, IDEIA_5, HOOK_1, HOOK_2, HOOK_3.
Escreva em português brasileiro. Seja específico, criativo e focado em conversão.`;

  const reply = await callClaude('content', [{ role:'user', content:prompt }]);

  // parse and save each piece
  const sections = reply.split(/===([A-Z_0-9]+)===/);
  const typeMap = {
    INSTAGRAM_1:'post', INSTAGRAM_2:'post', INSTAGRAM_3:'post',
    YOUTUBE:'video',
    IDEIA_1:'ideia', IDEIA_2:'ideia', IDEIA_3:'ideia', IDEIA_4:'ideia', IDEIA_5:'ideia',
    HOOK_1:'hook', HOOK_2:'hook', HOOK_3:'hook'
  };
  const labelMap = {
    INSTAGRAM_1:'Script Instagram #1', INSTAGRAM_2:'Script Instagram #2', INSTAGRAM_3:'Script Instagram #3',
    YOUTUBE:'Script YouTube',
    IDEIA_1:'Ideia #1', IDEIA_2:'Ideia #2', IDEIA_3:'Ideia #3', IDEIA_4:'Ideia #4', IDEIA_5:'Ideia #5',
    HOOK_1:'Hook Viral #1', HOOK_2:'Hook Viral #2', HOOK_3:'Hook Viral #3'
  };

  let count = 0;
  for (let i = 1; i < sections.length; i += 2) {
    const key  = sections[i]?.trim();
    const body = sections[i+1]?.trim();
    if (!key || !body) continue;
    S.content.unshift({
      id: uid(),
      type: typeMap[key] || 'post',
      title: `${labelMap[key]||key} — ${topic.slice(0,40)}`,
      body,
      agent: 'content',
      date: now(),
      topic, tone
    });
    count++;
  }

  if (!count) {
    // fallback: save whole reply
    S.content.unshift({ id:uid(), type:'post', title:`Conteúdo Diário — ${topic.slice(0,40)}`, body:reply, agent:'content', date:now() });
    count = 1;
  }

  save();
  closeModal('contentGenModal');
  S.contentFilter = 'all';
  render();
  toast(`${count} peças de conteúdo geradas!`);
}

function viewContentItem(id) {
  const c = S.content.find(x => x.id===id);
  if (!c) return;
  const sc = safe(c.body||'');
  $('delivModalTitle').textContent = c.title;
  $('delivModalBody').innerHTML = `
    <p style="font-size:.8rem;color:var(--g500);margin-bottom:1rem">${c.type} • ${c.date||''}</p>
    <div style="white-space:pre-wrap;font-size:.875rem;line-height:1.7;color:var(--g200)">${esc(c.body||'')}</div>
    <div style="margin-top:1.5rem;display:flex;gap:.5rem">
      <button class="btn btn-ghost btn-sm" onclick="navigator.clipboard.writeText(\`${sc}\`);OS.toast('Copiado!')"><i class="ph ph-copy"></i> Copiar</button>
      <button class="btn btn-danger btn-sm" onclick="OS.deleteContent('${id}')"><i class="ph ph-trash"></i> Excluir</button>
    </div>`;
  openModal('delivModal');
}

function deleteContent(id) {
  S.content = S.content.filter(c => c.id!==id);
  save(); closeModal('delivModal'); render(); toast('Excluído');
}

// ─── DELIVERABLES ─────────────────────────────────────────────────────────────
function deliverables() {
  const cards = S.deliverables.map(d => {
    const ag = AGENTS[d.agent];
    return `
      <div class="deliv-card" onclick="OS.viewDeliverable('${d.id}')">
        <div class="deliv-card-top">
          <div class="deliv-card-icon" style="background:${ag?.bg||'var(--glass)'};color:${ag?.color||'var(--g400)'}">${ag?.icon||'📄'}</div>
          <div class="deliv-card-title">${esc(d.title)}</div>
        </div>
        <div class="deliv-card-preview">${esc((d.content||'').slice(0,120))}</div>
        <div class="deliv-card-footer">
          <span>${ag?.name||'Agente'}</span>
          <span>${d.date||''}</span>
        </div>
      </div>`;
  }).join('') || `<div class="empty-state" style="grid-column:1/-1"><i class="ph ph-package"></i><h3>Nenhum deliverable ainda</h3><p>Salve respostas dos agentes ou mova tarefas com Prompt IA para Em Andamento</p></div>`;

  return `
    <div class="section-header"><div><h2>Deliverables</h2><p>${S.deliverables.length} outputs gerados</p></div></div>
    <div class="deliverables-grid">${cards}</div>`;
}

function viewDeliverable(id) {
  const d = S.deliverables.find(x => x.id===id);
  if (!d) return;
  d.seen = true; save();
  const sc = safe(d.content||'');
  const linked = d.linkedTask ? S.tasks.find(t=>t.id===d.linkedTask) : null;
  $('delivModalTitle').textContent = d.title;
  $('delivModalBody').innerHTML = `
    <p style="font-size:.8rem;color:var(--g500);margin-bottom:${linked?'.5rem':'1rem'}">${AGENTS[d.agent]?.name||d.agent} • ${d.date||''}</p>
    ${linked ? `<div style="font-size:.75rem;margin-bottom:1rem;padding:.4rem .75rem;background:var(--navy-b);border-radius:var(--r-sm);color:var(--em-l)"><i class="ph ph-kanban"></i> Tarefa: ${esc(linked.title)}</div>` : ''}
    ${(d.tags||[]).length ? `<div style="display:flex;gap:.3rem;flex-wrap:wrap;margin-bottom:1rem">${d.tags.map(t=>`<span class="tag tag-gray">${esc(t)}</span>`).join('')}</div>` : ''}
    <div style="white-space:pre-wrap;font-size:.875rem;line-height:1.7;color:var(--g200)">${esc(d.content||'')}</div>
    <div style="margin-top:1.5rem;display:flex;gap:.5rem">
      <button class="btn btn-ghost btn-sm" onclick="navigator.clipboard.writeText(\`${sc}\`);OS.toast('Copiado!')"><i class="ph ph-copy"></i> Copiar</button>
      <button class="btn btn-danger btn-sm" onclick="OS.deleteDeliverable('${id}')"><i class="ph ph-trash"></i> Excluir</button>
    </div>`;
  openModal('delivModal');
  const db = $('deliverablesBadge');
  const newD = S.deliverables.filter(x=>!x.seen).length;
  if (db) { db.style.display = newD ? '' : 'none'; db.textContent = newD; }
}

function deleteDeliverable(id) {
  S.deliverables = S.deliverables.filter(d => d.id!==id);
  save(); closeModal('delivModal'); render(); toast('Excluído');
}

function saveAsDeliverable(content, agentId) {
  const preview = content.slice(0,60).replace(/\n/g,' ');
  S.deliverables.unshift({ id:uid(), title:preview||'Deliverable', content, agent:agentId, date:now(), seen:false });
  save();
  const db = $('deliverablesBadge');
  const newD = S.deliverables.filter(x=>!x.seen).length;
  if (db) { db.style.display = newD ? '' : 'none'; db.textContent = newD; }
  toast('Salvo como deliverable');
}

// ─── TOOLS ────────────────────────────────────────────────────────────────────
function tools() {
  const toolsList = [
    { name:'Carrosseis Instagram', desc:'Gere carrosseis visuais com estilo X/Twitter para o Instagram', icon:'images', color:'#EC4899', bg:'rgba(236,72,153,.15)', href:'../posts_instagram/carrosseis.html' },
    { name:'Posts Instagram', desc:'Criador de posts e scripts para o Instagram', icon:'image-square', color:'#F59E0B', bg:'rgba(245,158,11,.15)', href:'../posts_instagram/posts.html' },
    { name:'Apresentação', desc:'Apresentação interativa do Konnex para clientes e investidores', icon:'presentation-chart', color:'#3B82F6', bg:'rgba(59,130,246,.15)', href:'../apresentacao/apresentacao.html' },
    { name:'Documentação', desc:'Portal de documentação da plataforma Konnex', icon:'book-open', color:'#12C87A', bg:'rgba(18,200,122,.15)', href:'../docs/' },
    { name:'Landing Page', desc:'Página principal do Konnex', icon:'globe', color:'#8B5CF6', bg:'rgba(139,92,246,.15)', href:'../' },
  ];

  const cards = toolsList.map(t => `
    <a href="${t.href}" target="_blank" class="agent-card" style="text-decoration:none">
      <div class="agent-card-glow" style="background:${t.color}"></div>
      <div class="agent-card-avatar" style="background:${t.bg};color:${t.color}">
        <i class="ph ph-${t.icon}" style="font-size:1.6rem"></i>
      </div>
      <div class="agent-card-name">${t.name}</div>
      <div class="agent-card-role">${t.desc}</div>
      <div class="agent-card-footer" style="margin-top:auto">
        <span></span>
        <button class="btn btn-primary btn-sm"><i class="ph ph-arrow-square-out"></i> Abrir</button>
      </div>
    </a>`).join('');

  return `
    <div class="section-header"><div><h2>Ferramentas</h2><p>Todas as ferramentas do ecossistema Konnex</p></div></div>
    <div class="agents-grid">${cards}</div>`;
}

// ─── SALES INTELLIGENCE ───────────────────────────────────────────────────────
function sales() {
  const OUTCOME_STYLE = {
    won:      { bg:'rgba(10,135,84,.2)',   color:'#12C87A', label:'Fechado' },
    lost:     { bg:'rgba(239,68,68,.2)',   color:'#EF4444', label:'Perdido' },
    followup: { bg:'rgba(245,158,11,.2)',  color:'#F59E0B', label:'Follow-up' },
    pending:  { bg:'rgba(90,110,138,.2)', color:'#8A9BB8', label:'Em análise' },
  };

  const cards = S.salesCalls.map(c => {
    const s = OUTCOME_STYLE[c.outcome] || OUTCOME_STYLE.pending;
    return `
      <div class="intel-card" onclick="OS.viewSalesCall('${c.id}')">
        <div class="intel-card-header">
          <div><div class="intel-card-title">${esc(c.title)}</div><div class="intel-card-sub">${c.date||''}</div></div>
          <span class="intel-badge" style="background:${s.bg};color:${s.color}">${s.label}</span>
        </div>
        <div style="font-size:.775rem;color:var(--g500);margin-top:.5rem">${esc((c.summary||'').slice(0,120))}</div>
      </div>`;
  }).join('') || `<div class="empty-state" style="grid-column:1/-1"><i class="ph ph-phone"></i><h3>Nenhuma call analisada</h3><p>Adicione transcrições para análise automática com IA</p></div>`;

  const won  = S.salesCalls.filter(c=>c.outcome==='won').length;
  const lost = S.salesCalls.filter(c=>c.outcome==='lost').length;
  const rate = S.salesCalls.length ? Math.round((won/S.salesCalls.length)*100) : 0;

  return `
    <div class="section-header">
      <div><h2>Sales Intelligence</h2><p>Análise de calls com IA</p></div>
      <div style="display:flex;gap:.5rem">
        <button class="btn btn-ghost" onclick="OS.generateSalesReport()"><i class="ph ph-chart-bar"></i> Relatório Diário</button>
        <button class="btn btn-primary" onclick="OS.openSalesModal()"><i class="ph ph-plus"></i> Analisar Call</button>
      </div>
    </div>
    <div class="metrics-row" style="margin-bottom:1.5rem">
      <div class="metric-card green"><div class="metric-label">Calls Analisadas</div><div class="metric-value">${S.salesCalls.length}</div></div>
      <div class="metric-card blue"><div class="metric-label">Fechados</div><div class="metric-value">${won}</div></div>
      <div class="metric-card orange"><div class="metric-label">Perdidos</div><div class="metric-value">${lost}</div></div>
      <div class="metric-card purple"><div class="metric-label">Taxa de Conversão</div><div class="metric-value">${rate}%</div></div>
    </div>
    <div class="intel-grid">${cards}</div>`;
}

function openSalesModal() {
  $('salesModalBody').innerHTML = `
    <div class="form-group">
      <label class="form-label">Título da Call</label>
      <input class="form-input" id="salesTitle" placeholder="Ex: Call com cliente X — 06/03">
    </div>
    <div class="form-group">
      <label class="form-label">Transcrição ou notas da call</label>
      <textarea class="form-textarea" id="salesTranscript" style="min-height:160px" placeholder="Cole a transcrição completa ou descreva o que aconteceu..."></textarea>
    </div>
    <div class="form-group">
      <label class="form-label">Resultado</label>
      <select class="form-select" id="salesOutcome">
        <option value="pending">Em análise</option>
        <option value="won">Fechado</option>
        <option value="lost">Perdido</option>
        <option value="followup">Follow-up</option>
      </select>
    </div>
    <div style="margin-top:1rem;display:flex;gap:.5rem;justify-content:flex-end">
      <button class="btn btn-ghost" onclick="OS.closeModal('salesModal')">Cancelar</button>
      <button class="btn btn-primary" onclick="OS.saveSalesCall()"><i class="ph ph-robot"></i> Salvar e Analisar com IA</button>
    </div>`;
  openModal('salesModal');
}

async function saveSalesCall() {
  const title      = $('salesTitle')?.value.trim();
  const transcript = $('salesTranscript')?.value.trim();
  const outcome    = $('salesOutcome')?.value;
  if (!title||!transcript) { toast('Preencha título e transcrição','error'); return; }

  const call = { id:uid(), title, transcript, outcome, date:now(), summary:'Analisando...' };
  S.salesCalls.unshift(call);
  save(); closeModal('salesModal'); render();
  toast('Call salva — analisando com IA...');

  if (S.settings.apiKey) {
    const prompt = `Analise esta call de vendas e produza um relatório estruturado com:

**RESUMO EXECUTIVO**
(2-3 frases)

**OBJECCOES IDENTIFICADAS**
(liste cada objecão levantada pelo prospect)

**FRASES VENCEDORAS**
(momentos em que o vendedor foi eficaz)

**ERROS DE FECHAMENTO**
(oportunidades perdidas ou erros cometidos)

**PRÓXIMOS PASSOS RECOMENDADOS**
(acoes concretas)

**SCORE DA CALL** (0-10)

---
Título: ${title}
Resultado: ${outcome}

TRANSCRIÇÃO:
${transcript}`;

    const analysis = await callClaude('sales', [{ role:'user', content:prompt }]);
    const c = S.salesCalls.find(x=>x.id===call.id);
    if (c) { c.summary = analysis.slice(0,200); c.analysis = analysis; save(); }
    toast('Análise concluída!');
  }
}

function viewSalesCall(id) {
  const c = S.salesCalls.find(x=>x.id===id);
  if (!c) return;
  const sc = safe(c.analysis||c.transcript||'');
  $('delivModalTitle').textContent = c.title;
  $('delivModalBody').innerHTML = `
    <p style="font-size:.8rem;color:var(--g500);margin-bottom:1rem">${c.date||''} • ${c.outcome||''}</p>
    ${c.analysis
      ? `<div style="white-space:pre-wrap;font-size:.875rem;line-height:1.7;color:var(--g200)">${fmtMd(c.analysis)}</div>`
      : `<p style="color:var(--g400);font-size:.875rem">${esc(c.transcript||'')}</p>`}
    <div style="margin-top:1.5rem;display:flex;gap:.5rem">
      <button class="btn btn-ghost btn-sm" onclick="navigator.clipboard.writeText(\`${sc}\`);OS.toast('Copiado!')"><i class="ph ph-copy"></i> Copiar</button>
      <button class="btn btn-danger btn-sm" onclick="OS.deleteSalesCall('${id}')"><i class="ph ph-trash"></i> Excluir</button>
    </div>`;
  openModal('delivModal');
}

async function generateSalesReport() {
  if (!S.settings.apiKey) { toast('Configure a API Key em Configurações','error'); return; }
  if (!S.salesCalls.length) { toast('Nenhuma call para analisar','error'); return; }
  toast('Gerando relatório diário...');
  const summary = S.salesCalls.slice(0,10).map(c => `- ${c.title} (${c.outcome}): ${c.summary||c.transcript?.slice(0,100)}`).join('\n');
  const prompt = `Com base nestas calls de vendas recentes, gere um Relatório Diário de Vendas completo com: performance geral, padrões de objeções, taxa de conversão, top 3 melhorias imediatas, e previsão para os próximos 7 dias.\n\nCALLS:\n${summary}`;
  const report = await callClaude('sales', [{ role:'user', content:prompt }]);
  S.deliverables.unshift({ id:uid(), title:`Relatório Diário de Vendas — ${now()}`, content:report, agent:'sales', date:now(), seen:false });
  save(); navigate('deliverables'); toast('Relatório gerado!');
}

function deleteSalesCall(id) {
  S.salesCalls = S.salesCalls.filter(c=>c.id!==id);
  save(); closeModal('delivModal'); render(); toast('Excluído');
}

// ─── COMPETITOR INTEL ─────────────────────────────────────────────────────────
function competitor() {
  const cards = S.competitors.map(c => `
    <div class="intel-card">
      <div class="intel-card-header">
        <div>
          <div class="intel-card-title">${esc(c.name)}</div>
          <div class="intel-card-sub">${esc(c.category||'')}</div>
        </div>
        <div style="display:flex;gap:.35rem">
          ${S.settings.apiKey ? `<button class="btn btn-ghost btn-sm btn-icon" onclick="OS.analyzeCompetitor('${c.id}')" title="Analisar com IA"><i class="ph ph-robot"></i></button>` : ''}
          <button class="btn btn-ghost btn-sm btn-icon" onclick="OS.deleteCompetitor('${c.id}')"><i class="ph ph-trash"></i></button>
        </div>
      </div>
      <div style="font-size:.775rem;color:var(--g400);line-height:1.5;margin-top:.5rem">${fmtMd(c.notes||'')}</div>
      <div class="intel-chips">${(c.tags||[]).map(t=>`<span class="intel-chip">${esc(t)}</span>`).join('')}</div>
    </div>`).join('') || `<div class="empty-state" style="grid-column:1/-1"><i class="ph ph-binoculars"></i><h3>Nenhum concorrente cadastrado</h3><p>Adicione concorrentes e analise com IA</p></div>`;

  return `
    <div class="section-header">
      <div><h2>Competitor Intel</h2><p>Monitore e analise seus concorrentes com IA</p></div>
      <div style="display:flex;gap:.5rem">
        ${S.settings.apiKey && S.competitors.length ? `<button class="btn btn-ghost" onclick="OS.analyzeAllCompetitors()"><i class="ph ph-robot"></i> Análise Geral</button>` : ''}
        <button class="btn btn-primary" onclick="OS.openCompetitorModal()"><i class="ph ph-plus"></i> Adicionar</button>
      </div>
    </div>
    <div class="intel-grid">${cards}</div>`;
}

function openCompetitorModal() {
  $('competitorModalBody').innerHTML = `
    <div class="form-group">
      <label class="form-label">Nome do concorrente</label>
      <input class="form-input" id="compName" placeholder="Ex: Twilio, Zapi, ChatPro...">
    </div>
    <div class="form-group">
      <label class="form-label">Categoria</label>
      <input class="form-input" id="compCat" placeholder="Ex: WhatsApp API, CRM...">
    </div>
    <div class="form-group">
      <label class="form-label">Conteúdo / Landing page / Hooks (cole aqui para análise IA)</label>
      <textarea class="form-textarea" id="compNotes" placeholder="Cole qualquer conteúdo do concorrente aqui — copy do site, scripts de ads, captions virais..."></textarea>
    </div>
    <div class="form-group">
      <label class="form-label">Tags (vírgula)</label>
      <input class="form-input" id="compTags" placeholder="API, barato, enterprise">
    </div>
    <div style="margin-top:1rem;display:flex;gap:.5rem;justify-content:flex-end">
      <button class="btn btn-ghost" onclick="OS.closeModal('competitorModal')">Cancelar</button>
      <button class="btn btn-primary" onclick="OS.saveCompetitor()">Salvar</button>
    </div>`;
  openModal('competitorModal');
}

function saveCompetitor() {
  const name = $('compName')?.value.trim();
  if (!name) { toast('Nome obrigatório','error'); return; }
  S.competitors.unshift({
    id:uid(), name, date:now(),
    category: $('compCat')?.value.trim(),
    notes:    $('compNotes')?.value.trim(),
    tags:     $('compTags')?.value.split(',').map(t=>t.trim()).filter(Boolean),
  });
  save(); closeModal('competitorModal');
  if (S.settings.apiKey && S.competitors[0].notes) {
    analyzeCompetitor(S.competitors[0].id);
  }
  render(); toast('Concorrente adicionado');
}

async function analyzeCompetitor(id) {
  const c = S.competitors.find(x=>x.id===id);
  if (!c) return;
  toast(`Analisando ${c.name} com IA...`);
  const prompt = `Analise este concorrente e forneça insights estratégicos:

**CONCORRENTE:** ${c.name} (${c.category||'sem categoria'})

**CONTEÚDO/MATERIAL:**
${c.notes||'Sem material fornecido'}

Gere:
1. **Pontos fortes** identificados
2. **Pontos fracos** e vulnerabilidades
3. **Hooks e padrões virais** que eles usam
4. **Como se diferenciar** do Konnex
5. **Oportunidades** que eles não estão explorando
6. **Score de ameaça** (1-10) com justificativa`;

  const analysis = await callClaude('ceo', [{ role:'user', content:prompt }]);
  c.analysis = analysis;
  c.notes = analysis;
  save(); render(); toast(`Análise de ${c.name} concluída!`);
}

async function analyzeAllCompetitors() {
  if (!S.competitors.length) return;
  toast('Gerando análise geral de mercado...');
  const list = S.competitors.map(c=>`- ${c.name} (${c.category||''})`).join('\n');
  const prompt = `Com base nesta lista de concorrentes do Konnex (WhatsApp automation SaaS), gere uma análise de mercado completa:

CONCORRENTES:
${list}

Forneça:
1. **Mapa competitivo** do mercado
2. **Posicionamento ideal** do Konnex
3. **Principais ameaças** a mitigar
4. **Blue ocean** — oportunidades não exploradas
5. **Estratégia de diferenciação** recomendada`;

  const analysis = await callClaude('ceo', [{ role:'user', content:prompt }]);
  S.deliverables.unshift({ id:uid(), title:`Análise de Mercado — ${now()}`, content:analysis, agent:'ceo', date:now(), seen:false });
  save(); navigate('deliverables'); toast('Análise de mercado gerada!');
}

function deleteCompetitor(id) {
  S.competitors = S.competitors.filter(c=>c.id!==id);
  save(); render(); toast('Removido');
}

// ─── KNOWLEDGE BASE ───────────────────────────────────────────────────────────
const KB_CATS = [
  { id:'all',        label:'Todos',      icon:'books' },
  { id:'produto',    label:'Produto',    icon:'cube' },
  { id:'vendas',     label:'Vendas',     icon:'handshake' },
  { id:'marketing',  label:'Marketing',  icon:'megaphone' },
  { id:'operacoes',  label:'Operações',  icon:'gear' },
  { id:'financeiro', label:'Financeiro', icon:'chart-line' },
  { id:'sop',        label:'SOPs',       icon:'list-checks' },
  { id:'scripts',    label:'Scripts',    icon:'scroll' },
];

function knowledge() {
  const cats = KB_CATS.map(c => {
    const count = S.kbDocs.filter(d => c.id==='all' || d.category===c.id).length;
    return `<button class="kb-cat-btn ${S.kbCategory===c.id?'active':''}" onclick="OS.setKbCategory('${c.id}')">
      <i class="ph ph-${c.icon}"></i>${c.label}<span class="kb-cat-count">${count}</span>
    </button>`;
  }).join('');

  const docs = S.kbDocs.filter(d => S.kbCategory==='all' || d.category===S.kbCategory);
  const items = docs.map(d => `
    <div class="kb-item" onclick="OS.openKbModal('${d.id}')">
      <i class="ph ph-file-text" style="color:var(--em-l);flex-shrink:0;margin-top:2px"></i>
      <div style="flex:1;min-width:0">
        <div class="kb-item-title">${esc(d.title)}</div>
        <div class="kb-item-preview">${esc((d.content||'').slice(0,80))}</div>
        <div class="kb-item-meta">${d.category||'Geral'} • ${d.date||''}</div>
      </div>
    </div>`).join('') || `<div class="empty-state"><i class="ph ph-book-open"></i><h3>Nenhum documento</h3><p>Adicione SOPs, playbooks e scripts — os agentes consultam automaticamente</p></div>`;

  return `
    <div class="section-header">
      <div><h2>Knowledge Base</h2><p>${S.kbDocs.length} documentos — injetados automaticamente nos agentes</p></div>
      <button class="btn btn-primary" onclick="OS.openKbModal()"><i class="ph ph-plus"></i> Novo Documento</button>
    </div>
    <div class="kb-layout">
      <div class="kb-sidebar">${cats}</div>
      <div class="kb-main"><div class="kb-list">${items}</div></div>
    </div>`;
}

function setKbCategory(c) { S.kbCategory = c; render(); }

function openKbModal(id) {
  const doc = id ? S.kbDocs.find(d=>d.id===id) : null;
  $('kbModalTitle').textContent = doc ? 'Editar Documento' : 'Novo Documento';
  $('kbModalBody').innerHTML = `
    <div class="form-group">
      <label class="form-label">Título</label>
      <input class="form-input" id="kbTitle" value="${esc(doc?.title||'')}" placeholder="Título do documento">
    </div>
    <div class="form-group">
      <label class="form-label">Categoria</label>
      <select class="form-select" id="kbCat">
        ${KB_CATS.filter(c=>c.id!=='all').map(c=>`<option value="${c.id}" ${doc?.category===c.id?'selected':''}>${c.label}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Conteúdo</label>
      <textarea class="form-textarea" id="kbContent" style="min-height:200px">${esc(doc?.content||'')}</textarea>
    </div>
    <div style="margin-top:1rem;display:flex;gap:.5rem;justify-content:flex-end">
      <button class="btn btn-ghost" onclick="OS.closeModal('kbModal')">Cancelar</button>
      ${doc ? `<button class="btn btn-danger btn-sm" onclick="OS.deleteKbDoc('${doc.id}')"><i class="ph ph-trash"></i></button>` : ''}
      <button class="btn btn-primary" onclick="OS.saveKbDoc('${doc?.id||''}')">Salvar</button>
    </div>`;
  openModal('kbModal');
}

function saveKbDoc(id) {
  const title   = $('kbTitle')?.value.trim();
  const content = $('kbContent')?.value.trim();
  if (!title) { toast('Título obrigatório','error'); return; }
  if (id) {
    const d = S.kbDocs.find(x=>x.id===id);
    if (d) Object.assign(d, { title, content, category:$('kbCat')?.value });
  } else {
    S.kbDocs.unshift({ id:uid(), title, content, category:$('kbCat')?.value, date:now() });
  }
  save(); closeModal('kbModal'); render(); toast('Documento salvo — disponível para todos os agentes');
}

function deleteKbDoc(id) {
  S.kbDocs = S.kbDocs.filter(d=>d.id!==id);
  save(); closeModal('kbModal'); render(); toast('Excluído');
}

// ─── AUTOMATIONS ──────────────────────────────────────────────────────────────
function automation() {
  const cards = S.automations.map(a => `
    <div class="auto-card">
      <div class="auto-card-header">
        <div class="auto-icon"><i class="ph ph-lightning"></i></div>
        <div><div class="auto-title">${esc(a.title)}</div><div class="auto-desc">${esc(a.desc)}</div></div>
      </div>
      <div class="auto-footer">
        <div class="auto-status ${a.active?'running':''}">
          <span class="status-dot ${a.active?'online':''}"></span>${a.active?'Ativo':'Inativo'}
        </div>
        <button class="btn btn-ghost btn-sm" onclick="OS.toggleAutomation('${a.id}')">${a.active?'Desativar':'Ativar'}</button>
      </div>
    </div>`).join('');

  return `
    <div class="section-header"><div><h2>Automações</h2><p>Workflows automáticos do sistema</p></div></div>
    <div class="automation-grid">${cards}</div>`;
}

function toggleAutomation(id) {
  const a = S.automations.find(x=>x.id===id);
  if (a) { a.active = !a.active; save(); render(); toast(a.active?'Ativada':'Desativada'); }
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
function settings() {
  const models = [
    { v:'claude-sonnet-4-6',          l:'Claude Sonnet 4.6 (recomendado)' },
    { v:'claude-haiku-4-5-20251001',  l:'Claude Haiku 4.5 (mais rápido)' },
    { v:'claude-opus-4-6',            l:'Claude Opus 4.6 (mais poderoso)' },
  ];
  return `
    <div class="section-header"><div><h2>Configurações</h2></div></div>
    <div class="settings-layout">
      <div class="settings-nav">
        <div class="settings-nav-item active"><i class="ph ph-key"></i>API</div>
        <div class="settings-nav-item"><i class="ph ph-buildings"></i>Empresa</div>
      </div>
      <div class="settings-section">
        <div class="settings-card">
          <h3>Anthropic API</h3>
          <div class="form-group">
            <label class="form-label">API Key</label>
            <input class="form-input" id="settApiKey" type="password" value="${esc(S.settings.apiKey||'')}" placeholder="sk-ant-...">
            <span class="form-hint">Necessária para ativar todos os agentes com IA real. Os 7 agentes, Content Engine, Sales Analysis e Competitor Intel dependem desta key.</span>
          </div>
          <div class="form-group">
            <label class="form-label">Modelo</label>
            <select class="form-select" id="settModel">
              ${models.map(m=>`<option value="${m.v}" ${S.settings.model===m.v?'selected':''}>${m.l}</option>`).join('')}
            </select>
          </div>
          <button class="btn btn-primary" onclick="OS.saveSettings()"><i class="ph ph-floppy-disk"></i> Salvar</button>
        </div>
        <div class="settings-card">
          <h3>Perfil & Empresa</h3>
          <div class="form-group">
            <label class="form-label">Seu nome</label>
            <input class="form-input" id="settUserName" value="${esc(S.settings.userName||'')}" placeholder="Seu nome">
            <span class="form-hint">Aparece nos chats com os agentes.</span>
          </div>
          <div class="form-group">
            <label class="form-label">Nome da empresa</label>
            <input class="form-input" id="settCompany" value="${esc(S.settings.companyName||'')}" placeholder="Konnex">
          </div>
          <div class="form-group">
            <label class="form-label">Contexto para os agentes</label>
            <textarea class="form-textarea" id="settDesc" placeholder="Descreva produto, ICP, diferenciais, tom de voz...">${esc(S.settings.companyDesc||'')}</textarea>
            <span class="form-hint">Este contexto é injetado em todos os agentes, tornando as respostas mais específicas para o seu negócio.</span>
          </div>
          <button class="btn btn-primary" onclick="OS.saveSettings()"><i class="ph ph-floppy-disk"></i> Salvar</button>
        </div>
      </div>
    </div>`;
}

function saveSettings() {
  S.settings.apiKey      = $('settApiKey')?.value.trim()    || S.settings.apiKey;
  S.settings.model       = $('settModel')?.value            || S.settings.model;
  S.settings.userName    = $('settUserName')?.value.trim()  || S.settings.userName;
  S.settings.companyName = $('settCompany')?.value.trim()   || S.settings.companyName;
  S.settings.companyDesc = $('settDesc')?.value.trim()      || '';
  save(); render(); toast('Configurações salvas');
}

// ─── TASK MODAL ───────────────────────────────────────────────────────────────
function openTaskModal(defaultStatus) {
  $('taskModalTitle').textContent = 'Nova Tarefa';
  const agOpts = Object.values(AGENTS).map(ag=>`<option value="${ag.id}">${ag.name}</option>`).join('');
  const stOpts = COLS.map(c=>`<option value="${c.id}" ${c.id===(defaultStatus||'backlog')?'selected':''}>${c.label}</option>`).join('');

  $('taskModalBody').innerHTML = `
    <div class="form-group">
      <label class="form-label">Título</label>
      <input class="form-input" id="taskTitle" placeholder="Descreva a tarefa">
    </div>
    <div class="form-group">
      <label class="form-label">Descrição</label>
      <textarea class="form-textarea" id="taskDesc" style="min-height:60px" placeholder="Detalhes..."></textarea>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Agente</label>
        <select class="form-select" id="taskAgent"><option value="">Sem agente</option>${agOpts}</select>
      </div>
      <div class="form-group">
        <label class="form-label">Prioridade</label>
        <select class="form-select" id="taskPriority">
          <option value="low">Low</option>
          <option value="medium" selected>Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-select" id="taskStatus">${stOpts}</select>
      </div>
      <div class="form-group">
        <label class="form-label">Tags (vírgula)</label>
        <input class="form-input" id="taskTags" placeholder="design, backend...">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Prompt IA <span style="color:var(--em-l);font-size:.75rem">— o agente executa automaticamente ao mover para Em Andamento</span></label>
      <textarea class="form-textarea" id="taskAiPrompt" style="min-height:72px" placeholder="Ex: Crie um script de Instagram sobre automação de WhatsApp para pequenas empresas. Tom educativo, 3 slides."></textarea>
    </div>
    <div class="form-group">
      <label class="form-label">Comentários</label>
      <textarea class="form-textarea" id="taskComments" style="min-height:48px" placeholder="Notas internas..."></textarea>
    </div>
    <div style="margin-top:1rem;display:flex;gap:.5rem;justify-content:flex-end">
      <button class="btn btn-ghost" onclick="OS.closeModal('taskModal')">Cancelar</button>
      <button class="btn btn-primary" onclick="OS.saveTask()">Criar Tarefa</button>
    </div>`;
  openModal('taskModal');
}

function saveTask() {
  const title = $('taskTitle')?.value.trim();
  if (!title) { toast('Título obrigatório','error'); return; }
  S.tasks.push({
    id:uid(), title, date:now(),
    desc:      $('taskDesc')?.value.trim(),
    agent:     $('taskAgent')?.value,
    priority:  $('taskPriority')?.value||'medium',
    status:    $('taskStatus')?.value||'backlog',
    tags:      $('taskTags')?.value.split(',').map(t=>t.trim()).filter(Boolean),
    aiPrompt:  $('taskAiPrompt')?.value.trim(),
    comments:  $('taskComments')?.value.trim(),
  });
  save(); closeModal('taskModal'); render(); toast('Tarefa criada');
}

function openTaskDetail(id) {
  const t = S.tasks.find(x=>x.id===id);
  if (!t) return;
  const ag = AGENTS[t.agent];
  const stOpts = COLS.map(c=>`<option value="${c.id}" ${c.id===t.status?'selected':''}>${c.label}</option>`).join('');
  const linked = t.linkedDeliverable ? S.deliverables.find(d=>d.id===t.linkedDeliverable) : null;

  $('taskModalTitle').textContent = t.title;
  $('taskModalBody').innerHTML = `
    <p style="font-size:.8rem;color:var(--g500);margin-bottom:.75rem">${t.date||''} • <span class="task-priority p-${t.priority}">${t.priority}</span></p>
    ${t.desc ? `<p style="font-size:.875rem;color:var(--g300);margin-bottom:1rem;line-height:1.6">${esc(t.desc)}</p>` : ''}
    ${t.comments ? `<div style="padding:.6rem .75rem;background:var(--navy-b);border-radius:var(--r-md);font-size:.8rem;color:var(--g400);margin-bottom:1rem"><i class="ph ph-chat-dots"></i> ${esc(t.comments)}</div>` : ''}
    ${t.aiPrompt ? `<div style="padding:.6rem .75rem;background:rgba(10,135,84,.08);border:1px solid rgba(10,135,84,.2);border-radius:var(--r-md);font-size:.8rem;color:var(--em-l);margin-bottom:1rem"><i class="ph ph-robot"></i> <strong>Prompt IA:</strong> ${esc(t.aiPrompt)}</div>` : ''}
    ${linked ? `<div style="padding:.6rem .75rem;background:var(--navy-b);border-radius:var(--r-md);font-size:.8rem;color:var(--g400);margin-bottom:1rem;cursor:pointer" onclick="OS.closeModal('taskModal');OS.viewDeliverable('${linked.id}')"><i class="ph ph-package"></i> Deliverable vinculado: ${esc(linked.title)}</div>` : ''}
    <div class="form-row" style="margin-bottom:.875rem">
      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-select" id="tdStatus" onchange="OS.updateTaskStatus('${t.id}',this.value)">${stOpts}</select>
      </div>
      <div class="form-group">
        <label class="form-label">Agente</label>
        <div style="display:flex;align-items:center;gap:.5rem;padding:.55rem .75rem;background:var(--navy-s);border:1px solid var(--border2);border-radius:var(--r-md);font-size:.85rem">
          ${ag ? `${ag.icon} ${ag.name}` : 'Sem agente'}
        </div>
      </div>
    </div>
    <div style="display:flex;gap:.5rem;justify-content:space-between;margin-top:1.5rem">
      <button class="btn btn-danger btn-sm" onclick="OS.deleteTask('${t.id}')"><i class="ph ph-trash"></i> Excluir</button>
      <div style="display:flex;gap:.5rem">
        ${t.aiPrompt && ag && S.settings.apiKey ? `<button class="btn btn-ghost btn-sm" onclick="OS.closeModal('taskModal');OS.forceExecuteTask('${t.id}')"><i class="ph ph-robot"></i> Executar agora</button>` : ''}
        ${ag ? `<button class="btn btn-primary btn-sm" onclick="OS.closeModal('taskModal');OS.navigate('agents/${ag.id}')"><i class="ph ph-chat"></i> ${ag.name}</button>` : ''}
      </div>
    </div>`;
  openModal('taskModal');
}

async function updateTaskStatus(id, status) {
  const t = S.tasks.find(x=>x.id===id);
  if (!t) return;
  t.status = status; save();
  if (status === 'inprogress' && t.aiPrompt && t.agent && S.settings.apiKey) {
    closeModal('taskModal');
    await autoExecuteTask(t);
  }
}

async function forceExecuteTask(id) {
  const t = S.tasks.find(x=>x.id===id);
  if (t) await autoExecuteTask(t);
}

function deleteTask(id) {
  S.tasks = S.tasks.filter(t=>t.id!==id);
  save(); closeModal('taskModal'); render(); toast('Tarefa excluída');
}

// ─── MODALS ───────────────────────────────────────────────────────────────────
function openModal(id) {
  $('modalBackdrop').classList.add('open');
  $(id)?.classList.add('open');
}

function closeModal(id) {
  $(id)?.classList.remove('open');
  if (!document.querySelector('.modal.open')) $('modalBackdrop').classList.remove('open');
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
function init() {
  load();
  S.route = location.hash.slice(1) || 'overview';

  window.addEventListener('hashchange', () => { S.route = location.hash.slice(1) || 'overview'; render(); });

  $('modalBackdrop')?.addEventListener('click', () => {
    document.querySelectorAll('.modal.open').forEach(m => m.classList.remove('open'));
    $('modalBackdrop').classList.remove('open');
  });

  $('sidebarToggle')?.addEventListener('click', () => {
    S.sidebarCollapsed = !S.sidebarCollapsed;
    document.getElementById('app').classList.toggle('sidebar-collapsed', S.sidebarCollapsed);
    save();
  });

  if (S.sidebarCollapsed) document.getElementById('app')?.classList.add('sidebar-collapsed');

  document.querySelectorAll('.nav-item[data-route]').forEach(el => {
    el.addEventListener('click', e => { e.preventDefault(); navigate(el.dataset.route); });
  });

  render();
}

// ─── PUBLIC ───────────────────────────────────────────────────────────────────
return {
  navigate, render, toast,
  openTaskModal, saveTask, openTaskDetail, updateTaskStatus, deleteTask, forceExecuteTask,
  openModal, closeModal,
  sendMessage, useQuickPrompt, clearChat, saveAsDeliverable,
  viewDeliverable, deleteDeliverable,
  viewContentItem, setContentFilter, deleteContent, openContentGen, runContentGen,
  openSalesModal, saveSalesCall, viewSalesCall, deleteSalesCall, generateSalesReport,
  openCompetitorModal, saveCompetitor, deleteCompetitor, analyzeCompetitor, analyzeAllCompetitors,
  setKbCategory, openKbModal, saveKbDoc, deleteKbDoc,
  toggleAutomation, saveSettings,
};
})();

document.addEventListener('DOMContentLoaded', () => OS.init());
