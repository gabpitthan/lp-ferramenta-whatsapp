'use strict';

const OS = (() => {

// ─── AGENTS ──────────────────────────────────────────────────────────────────
const AGENTS = {
  ceo: {
    id:'ceo', name:'CEO Agent', role:'Chief Executive Officer',
    color:'#F59E0B', bg:'rgba(245,158,11,.15)', icon:'👑', shortcode:'CEO',
    prompt:'You are the CEO Agent for Konnex, an AI-powered WhatsApp automation SaaS. Think strategically, make high-level business decisions, guide company vision. Communicate with confidence. Respond in the same language as the user.',
    caps:['Estratégia empresarial','Planejamento de OKRs','Decisões de produto','Vision & roadmap','Comunicação executiva'],
    quickPrompts:['Qual deve ser nossa prioridade este mês?','Crie um plano de OKRs para o trimestre','Analise nossa posição de mercado','Estratégia de expansão para novos mercados']
  },
  coo: {
    id:'coo', name:'COO Agent', role:'Chief Operating Officer',
    color:'#3B82F6', bg:'rgba(59,130,246,.15)', icon:'⚙️', shortcode:'COO',
    prompt:'You are the COO Agent for Konnex. Focus on operations, processes, execution. Optimize workflows, manage resources, ensure deliverables are met. Respond in the same language as the user.',
    caps:['Gestão de processos','Otimização operacional','Alocação de recursos','KPIs operacionais','Gestão de projetos'],
    quickPrompts:['Otimize nosso processo de onboarding','Crie um SOP para atendimento','Analise nossos KPIs operacionais','Planeje a sprint da semana']
  },
  content: {
    id:'content', name:'Content Director', role:'Diretor de Conteúdo',
    color:'#EC4899', bg:'rgba(236,72,153,.15)', icon:'🎬', shortcode:'CTD',
    prompt:'You are the Content Director for Konnex. Create compelling content strategies, write copy, generate social media posts, scripts, and marketing materials. Brand voice: modern, confident, results-driven. Respond in the same language as the user.',
    caps:['Estratégia de conteúdo','Copy para redes sociais','Scripts de vídeo','Blog posts','Campanhas de marketing'],
    quickPrompts:['Crie 5 posts para o Instagram sobre WhatsApp automation','Escreva um script de vídeo para o YouTube','Estratégia de conteúdo para o próximo mês','Crie uma copy para anúncio no Meta Ads']
  },
  sales: {
    id:'sales', name:'Sales Agent', role:'Agente de Vendas',
    color:'#FF6B35', bg:'rgba(255,107,53,.15)', icon:'💼', shortcode:'SAL',
    prompt:'You are the Sales Agent for Konnex. Help close deals, handle objections, create sales scripts, analyze calls, identify opportunities. Know the product deeply. Respond in the same language as the user.',
    caps:['Scripts de vendas','Análise de calls','Gestão de pipeline','Tratamento de objeções','Propostas comerciais'],
    quickPrompts:['Crie um script de vendas para WhatsApp','Como responder a objeção "é caro"?','Como aumentar nossa taxa de conversão?','Crie uma proposta comercial']
  },
  dev: {
    id:'dev', name:'Developer', role:'Desenvolvedor Senior',
    color:'#8B5CF6', bg:'rgba(139,92,246,.15)', icon:'💻', shortcode:'DEV',
    prompt:'You are the Developer Agent for Konnex. Write clean efficient code, debug issues, architect systems, build features. Specialize in web tech, APIs, automation. Respond in the same language as the user.',
    caps:['Desenvolvimento de features','Code review','Debugging','Arquitetura de sistemas','Integração de APIs'],
    quickPrompts:['Revise este código','Como implementar esta feature?','Debug este erro','Arquitete esta solução']
  },
  finance: {
    id:'finance', name:'Finance Agent', role:'Agente Financeiro',
    color:'#12C87A', bg:'rgba(18,200,122,.15)', icon:'📊', shortcode:'FIN',
    prompt:'You are the Finance Agent for Konnex. Manage financial planning, analyze revenue, track expenses, create projections, help make financially sound decisions. Respond in the same language as the user.',
    caps:['Projeções financeiras','Análise de receita','Gestão de custos','Unit economics','Relatórios financeiros'],
    quickPrompts:['Crie uma projeção de receita para 6 meses','Analise nossa estrutura de custos','Calcule o LTV e CAC','Planeje o orçamento do trimestre']
  },
  cs: {
    id:'cs', name:'Client Success', role:'Customer Success Manager',
    color:'#06B6D4', bg:'rgba(6,182,212,.15)', icon:'🤝', shortcode:'CS',
    prompt:'You are the Client Success Agent for Konnex. Ensure clients get maximum value, handle support escalations, create onboarding materials, analyze churn risks, improve NPS. Respond in the same language as the user.',
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
  settings: { apiKey: '', model: 'claude-sonnet-4-6', companyName: 'Konnex', companyDesc: '' },
  kbCategory: 'all', contentFilter: 'all', sidebarCollapsed: false,
};

const SAVE_KEYS = ['tasks','deliverables','content','kbDocs','competitors','salesCalls','automations','chatHistory','settings','sidebarCollapsed'];

function save() {
  try {
    const d = {};
    SAVE_KEYS.forEach(k => d[k] = S[k]);
    localStorage.setItem('konnex_os_v2', JSON.stringify(d));
  } catch(e) {}
}

function load() {
  try {
    const d = JSON.parse(localStorage.getItem('konnex_os_v2') || '{}');
    SAVE_KEYS.forEach(k => { if (d[k] !== undefined) S[k] = d[k]; });
  } catch(e) {}
  if (!S.automations.length) S.automations = defaultAutomations();
  if (!S.chatHistory) S.chatHistory = {};
}

function defaultAutomations() {
  return [
    { id:'a1', title:'Task → Em Andamento → Notifica Agente', desc:'Quando uma tarefa vai para Em Andamento, notifica o agente responsável', active: true },
    { id:'a2', title:'Deliverable gerado → Registra no Log', desc:'Quando um deliverable é criado, registra automaticamente na atividade', active: true },
    { id:'a3', title:'Daily standup automático', desc:'Gera relatório diário de tarefas ativas todo dia às 9h', active: false },
    { id:'a4', title:'Task concluída → Move para Done', desc:'Quando deliverable é aprovado, fecha a tarefa automaticamente', active: true },
  ];
}

// ─── UTILS ────────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2,9);
const esc = s => String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const $ = id => document.getElementById(id);
const now = () => new Date().toLocaleString('pt-BR',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});

function toast(msg, type='success') {
  let c = $('toastContainer');
  if (!c) { c = document.createElement('div'); c.id = 'toastContainer'; document.body.appendChild(c); }
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<i class="ph ph-${type==='success'?'check-circle':'warning-circle'}"></i><span>${esc(msg)}</span>`;
  c.appendChild(t);
  setTimeout(() => t.remove(), 3500);
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
  content:'Content Studio', deliverables:'Deliverables',
  sales:'Sales Intelligence', competitor:'Competitor Intel',
  knowledge:'Knowledge Base', automation:'Automações', settings:'Configurações'
};

function render() {
  const route = S.route;
  const main = $('mainContent');
  if (!main) return;

  document.querySelectorAll('.nav-item[data-route]').forEach(el => {
    const r = el.dataset.route;
    el.classList.toggle('active', r === route || route.startsWith(r+'/') && r !== 'overview' && r.includes('/'));
    if (r === route) el.classList.add('active');
    else if (!route.startsWith(r+'/')) el.classList.remove('active');
  });

  const parts = route.split('/');
  let title = TITLES[parts[0]] || 'Overview';
  if (parts[0]==='agents' && parts[1] && AGENTS[parts[1]]) title = AGENTS[parts[1]].name;
  $('topbarTitle').textContent = title;

  const inProg = S.tasks.filter(t=>t.status==='inprogress').length;
  const kb = $('kanbanBadge');
  if (kb) { kb.style.display = inProg ? '' : 'none'; kb.textContent = inProg; }

  const newD = S.deliverables.filter(d=>!d.seen).length;
  const db = $('deliverablesBadge');
  if (db) { db.style.display = newD ? '' : 'none'; db.textContent = newD; }

  const dot = $('apiDot'), lbl = $('apiLabel');
  if (dot && lbl) {
    dot.className = 'status-dot' + (S.settings.apiKey ? ' online' : '');
    lbl.textContent = S.settings.apiKey ? 'API conectada' : 'API desconectada';
  }

  const views = {
    overview: viewOverview, agents: viewAgents, kanban: viewKanban,
    content: viewContent, deliverables: viewDeliverables,
    sales: viewSales, competitor: viewCompetitor,
    knowledge: viewKnowledge, automation: viewAutomation, settings: viewSettings
  };

  if (parts[0]==='agents' && parts[1]) {
    main.innerHTML = viewAgentChat(parts[1]);
    initChat(parts[1]);
  } else if (views[parts[0]]) {
    main.innerHTML = views[parts[0]]();
    if (parts[0]==='kanban') initKanban();
  } else {
    main.innerHTML = viewOverview();
  }
}

// ─── OVERVIEW ─────────────────────────────────────────────────────────────────
function viewOverview() {
  const total = S.tasks.length;
  const done = S.tasks.filter(t=>t.status==='done').length;
  const inProg = S.tasks.filter(t=>t.status==='inprogress').length;
  const delivs = S.deliverables.length;

  const agCards = Object.values(AGENTS).map(ag => `
    <div class="agent-status-item" style="cursor:pointer" onclick="OS.navigate('agents/${ag.id}')">
      <div class="agent-status-avatar" style="background:${ag.bg};color:${ag.color}">${ag.icon}</div>
      <div class="agent-status-info">
        <div class="agent-status-name">${ag.name}</div>
        <div class="agent-status-state" style="color:${S.settings.apiKey?'var(--em-l)':'var(--g600)'}">
          ${S.settings.apiKey?'Online':'Aguardando API'}
        </div>
      </div>
    </div>`).join('');

  const recent = [...S.tasks].reverse().slice(0,6).map(t=>
    `<div class="activity-item">
      <i class="ph ph-check-square activity-icon"></i>
      <div class="activity-text">${esc(t.title)}</div>
      <div class="activity-time">${t.status}</div>
    </div>`
  ).join('') || `<div class="activity-item"><i class="ph ph-info activity-icon"></i><div class="activity-text">Nenhuma atividade ainda.</div></div>`;

  return `
    <div class="metrics-row">
      <div class="metric-card green"><div class="metric-label">Tarefas Totais</div><div class="metric-value">${total}</div><div class="metric-sub">${done} concluídas</div></div>
      <div class="metric-card blue"><div class="metric-label">Em Andamento</div><div class="metric-value">${inProg}</div><div class="metric-sub">tarefas ativas</div></div>
      <div class="metric-card orange"><div class="metric-label">Deliverables</div><div class="metric-value">${delivs}</div><div class="metric-sub">gerados pelos agentes</div></div>
      <div class="metric-card purple"><div class="metric-label">Agentes</div><div class="metric-value">${Object.keys(AGENTS).length}</div><div class="metric-sub">especializados</div></div>
    </div>
    <div class="overview-grid">
      <div class="card">
        <div class="section-header" style="margin-bottom:1rem"><div><h2>Agentes</h2></div></div>
        <div class="agents-status-grid">${agCards}</div>
      </div>
      <div class="card">
        <div class="section-header" style="margin-bottom:1rem"><div><h2>Atividade Recente</h2></div></div>
        <div class="activity-list">${recent}</div>
      </div>
    </div>`;
}

// ─── AGENTS LIST ──────────────────────────────────────────────────────────────
function viewAgents() {
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
function viewAgentChat(agId) {
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
    return `<div class="msg user">
      <div class="msg-avatar" style="background:rgba(10,135,84,.3);color:#12C87A">G</div>
      <div class="msg-content"><div class="msg-bubble">${esc(m.content)}</div></div>
    </div>`;
  }
  const escaped = esc(m.content);
  const safeContent = m.content.replace(/\\/g,'\\\\').replace(/`/g,'\\`').replace(/\$/g,'\\$');
  return `<div class="msg assistant">
    <div class="msg-avatar" style="background:${ag.bg};color:${ag.color}">${ag.icon}</div>
    <div class="msg-content">
      <div class="msg-bubble">${fmtMd(m.content)}</div>
      <div class="msg-actions">
        <button class="msg-action-btn" onclick="OS.saveAsDeliverable(\`${safeContent}\`,'${ag.id}')">
          <i class="ph ph-package"></i> Salvar deliverable
        </button>
        <button class="msg-action-btn" onclick="navigator.clipboard.writeText(\`${safeContent}\`);OS.toast('Copiado!')">
          <i class="ph ph-copy"></i> Copiar
        </button>
      </div>
    </div>
  </div>`;
}

function fmtMd(text) {
  return esc(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`\n]+)`/g, '<code style="background:rgba(255,255,255,.08);padding:1px 6px;border-radius:4px;font-family:JetBrains Mono,monospace;font-size:.82em">$1</code>')
    .replace(/\n/g, '<br>');
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
  if (msgs) {
    const empty = msgs.querySelector('.chat-empty');
    if (empty) empty.remove();
    msgs.insertAdjacentHTML('beforeend', renderMsg({role:'user',content:text}, ag));
    msgs.insertAdjacentHTML('beforeend', `
      <div class="msg assistant" id="typingMsg">
        <div class="msg-avatar" style="background:${ag.bg};color:${ag.color}">${ag.icon}</div>
        <div class="msg-content">
          <div class="typing-indicator">
            <div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>
          </div>
        </div>
      </div>`);
    scrollBottom();
  }

  const btn = $('chatSendBtn');
  if (btn) btn.disabled = true;

  let reply;
  if (S.settings.apiKey) {
    reply = await callClaude(agId);
  } else {
    await new Promise(r => setTimeout(r, 900));
    reply = `Configure sua API Key da Anthropic em **Configurações** para ativar respostas reais.\n\nVocê perguntou: "${text}"\n\nAssim que a API estiver conectada responderei como ${ag.name} com inteligência completa.`;
  }

  $('typingMsg')?.remove();
  S.chatHistory[agId].push({ role:'assistant', content:reply });
  save();

  if (msgs) {
    msgs.insertAdjacentHTML('beforeend', renderMsg({role:'assistant',content:reply}, ag));
    scrollBottom();
  }
  if (btn) btn.disabled = false;
}

async function callClaude(agId) {
  const ag = AGENTS[agId];
  const messages = (S.chatHistory[agId] || []).map(m => ({ role:m.role, content:m.content }));
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
        max_tokens: 1500,
        system: ag.prompt + (S.settings.companyDesc ? `\n\nContexto da empresa: ${S.settings.companyDesc}` : ''),
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
  if (input) { input.value = btn.textContent; sendMessage(agId); }
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

function viewKanban() {
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
      <div><h2>Kanban</h2><p>Arraste tarefas entre colunas</p></div>
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
    col.addEventListener('drop', e => {
      e.preventDefault(); col.classList.remove('drag-over');
      if (!dragging) return;
      const task = S.tasks.find(t => t.id === dragging);
      if (task) { task.status = col.dataset.col; save(); render(); toast('Tarefa movida'); }
    });
  });
}

// ─── CONTENT STUDIO ───────────────────────────────────────────────────────────
const CONTENT_TYPES = ['post','video','blog','email','ad'];
const CONTENT_COLORS = { post:'#EC4899', video:'#8B5CF6', blog:'#3B82F6', email:'#F59E0B', ad:'#FF6B35' };
const CONTENT_ICONS  = { post:'instagram-logo', video:'video-camera', blog:'article', email:'envelope', ad:'megaphone' };

function viewContent() {
  const tabs = ['all',...CONTENT_TYPES].map(f =>
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
    </div>`).join('') || `<div class="empty-state" style="grid-column:1/-1"><i class="ph ph-film-slate"></i><h3>Nenhum conteúdo ainda</h3><p>Peça ao Content Director para criar conteúdo</p></div>`;

  return `
    <div class="section-header">
      <div><h2>Content Studio</h2><p>Todo conteúdo gerado pelos agentes</p></div>
      <button class="btn btn-primary" onclick="OS.navigate('agents/content')"><i class="ph ph-robot"></i> Criar com IA</button>
    </div>
    <div class="content-toolbar"><div class="filter-tabs">${tabs}</div></div>
    <div class="content-grid">${cards}</div>`;
}

function setContentFilter(f) { S.contentFilter = f; render(); }

function viewContentItem(id) {
  const c = S.content.find(x => x.id===id);
  if (!c) return;
  $('delivModalTitle').textContent = c.title;
  $('delivModalBody').innerHTML = `
    <p style="font-size:.8rem;color:var(--g500);margin-bottom:1rem">${c.type} • ${c.date||''}</p>
    <div style="white-space:pre-wrap;font-size:.875rem;line-height:1.7;color:var(--g200)">${esc(c.body||'')}</div>
    <div style="margin-top:1.5rem;display:flex;gap:.5rem">
      <button class="btn btn-danger btn-sm" onclick="OS.deleteContent('${id}')"><i class="ph ph-trash"></i> Excluir</button>
    </div>`;
  openModal('delivModal');
}

function deleteContent(id) {
  S.content = S.content.filter(c => c.id!==id);
  save(); closeModal('delivModal'); render(); toast('Conteúdo excluído');
}

// ─── DELIVERABLES ─────────────────────────────────────────────────────────────
function viewDeliverables() {
  const cards = S.deliverables.map(d => {
    const ag = AGENTS[d.agent];
    return `
      <div class="deliv-card" onclick="OS.viewDeliverable('${d.id}')">
        <div class="deliv-card-top">
          <div class="deliv-card-icon" style="background:${ag?.bg||'var(--glass)'};color:${ag?.color||'var(--g400)'}">${ag?.icon||'📄'}</div>
          <div class="deliv-card-title">${esc(d.title)}</div>
        </div>
        <div class="deliv-card-preview">${esc((d.content||'').slice(0,120))}</div>
        <div class="deliv-card-footer"><span>${ag?.name||'Agente'}</span><span>${d.date||''}</span></div>
      </div>`;
  }).join('') || `<div class="empty-state" style="grid-column:1/-1"><i class="ph ph-package"></i><h3>Nenhum deliverable ainda</h3><p>Salve respostas dos agentes como deliverables</p></div>`;

  return `
    <div class="section-header"><div><h2>Deliverables</h2><p>Outputs salvos dos agentes</p></div></div>
    <div class="deliverables-grid">${cards}</div>`;
}

function viewDeliverable(id) {
  const d = S.deliverables.find(x => x.id===id);
  if (!d) return;
  d.seen = true; save();
  const safe = (d.content||'').replace(/\\/g,'\\\\').replace(/`/g,'\\`').replace(/\$/g,'\\$');
  $('delivModalTitle').textContent = d.title;
  $('delivModalBody').innerHTML = `
    <p style="font-size:.8rem;color:var(--g500);margin-bottom:1rem">${AGENTS[d.agent]?.name||d.agent} • ${d.date||''}</p>
    <div style="white-space:pre-wrap;font-size:.875rem;line-height:1.7;color:var(--g200)">${esc(d.content||'')}</div>
    <div style="margin-top:1.5rem;display:flex;gap:.5rem">
      <button class="btn btn-ghost btn-sm" onclick="navigator.clipboard.writeText(\`${safe}\`);OS.toast('Copiado!')"><i class="ph ph-copy"></i> Copiar</button>
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

// ─── SALES INTELLIGENCE ───────────────────────────────────────────────────────
function viewSales() {
  const OUTCOME_STYLE = {
    won:  { bg:'rgba(10,135,84,.2)',  color:'#12C87A', label:'Fechado' },
    lost: { bg:'rgba(239,68,68,.2)', color:'#EF4444', label:'Perdido' },
    followup: { bg:'rgba(245,158,11,.2)', color:'#F59E0B', label:'Follow-up' },
    pending: { bg:'rgba(90,110,138,.2)', color:'#8A9BB8', label:'Análise' },
  };

  const cards = S.salesCalls.map(c => {
    const s = OUTCOME_STYLE[c.outcome] || OUTCOME_STYLE.pending;
    return `
      <div class="intel-card" onclick="OS.viewSalesCall('${c.id}')">
        <div class="intel-card-header">
          <div><div class="intel-card-title">${esc(c.title)}</div><div class="intel-card-sub">${c.date||''}</div></div>
          <span class="intel-badge" style="background:${s.bg};color:${s.color}">${s.label}</span>
        </div>
        <div style="font-size:.775rem;color:var(--g500)">${esc((c.summary||'').slice(0,100))}</div>
      </div>`;
  }).join('') || `<div class="empty-state" style="grid-column:1/-1"><i class="ph ph-phone"></i><h3>Nenhuma call analisada</h3><p>Adicione transcrições para análise com IA</p></div>`;

  return `
    <div class="section-header">
      <div><h2>Sales Intelligence</h2><p>Análise de calls com IA</p></div>
      <button class="btn btn-primary" onclick="OS.openSalesModal()"><i class="ph ph-plus"></i> Analisar Call</button>
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
      <label class="form-label">Transcrição ou notas</label>
      <textarea class="form-textarea" id="salesTranscript" style="min-height:160px" placeholder="Cole a transcrição ou descreva o que aconteceu..."></textarea>
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
      <button class="btn btn-primary" onclick="OS.saveSalesCall()"><i class="ph ph-robot"></i> Salvar e Analisar</button>
    </div>`;
  openModal('salesModal');
}

async function saveSalesCall() {
  const title = $('salesTitle')?.value.trim();
  const transcript = $('salesTranscript')?.value.trim();
  const outcome = $('salesOutcome')?.value;
  if (!title||!transcript) { toast('Preencha título e transcrição','error'); return; }

  const call = { id:uid(), title, transcript, outcome, date:now(), summary:transcript.slice(0,100) };
  S.salesCalls.unshift(call);
  save(); closeModal('salesModal'); render();
  toast('Call salva — analisando...');

  if (S.settings.apiKey) {
    if (!S.chatHistory['sales']) S.chatHistory['sales'] = [];
    S.chatHistory['sales'].push({ role:'user', content:`Analise esta call: Título: ${title}\n\nTranscrição:\n${transcript}\n\nForneça: pontos positivos, objeções identificadas, próximos passos recomendados.` });
    const analysis = await callClaude('sales');
    S.chatHistory['sales'].push({ role:'assistant', content:analysis });
    const c = S.salesCalls.find(x=>x.id===call.id);
    if (c) { c.summary = analysis.slice(0,200); c.analysis = analysis; save(); }
  }
}

function viewSalesCall(id) {
  const c = S.salesCalls.find(x=>x.id===id);
  if (!c) return;
  $('delivModalTitle').textContent = c.title;
  $('delivModalBody').innerHTML = `
    <p style="font-size:.8rem;color:var(--g500);margin-bottom:1rem">${c.date||''} • ${c.outcome||''}</p>
    ${c.analysis
      ? `<div style="white-space:pre-wrap;font-size:.875rem;line-height:1.7;color:var(--g200)">${esc(c.analysis)}</div>`
      : `<p style="color:var(--g400);font-size:.875rem">${esc(c.transcript||'')}</p>`}
    <div style="margin-top:1.5rem">
      <button class="btn btn-danger btn-sm" onclick="OS.deleteSalesCall('${id}')"><i class="ph ph-trash"></i> Excluir</button>
    </div>`;
  openModal('delivModal');
}

function deleteSalesCall(id) {
  S.salesCalls = S.salesCalls.filter(c=>c.id!==id);
  save(); closeModal('delivModal'); render(); toast('Excluído');
}

// ─── COMPETITOR INTEL ─────────────────────────────────────────────────────────
function viewCompetitor() {
  const cards = S.competitors.map(c => `
    <div class="intel-card">
      <div class="intel-card-header">
        <div>
          <div class="intel-card-title">${esc(c.name)}</div>
          <div class="intel-card-sub">${esc(c.category||'')}</div>
        </div>
        <button class="btn btn-ghost btn-sm btn-icon" onclick="OS.deleteCompetitor('${c.id}')"><i class="ph ph-trash"></i></button>
      </div>
      <div style="font-size:.775rem;color:var(--g400);line-height:1.5;margin-top:.5rem">${esc(c.notes||'')}</div>
      <div class="intel-chips">${(c.tags||[]).map(t=>`<span class="intel-chip">${esc(t)}</span>`).join('')}</div>
    </div>`).join('') || `<div class="empty-state" style="grid-column:1/-1"><i class="ph ph-binoculars"></i><h3>Nenhum concorrente cadastrado</h3></div>`;

  return `
    <div class="section-header">
      <div><h2>Competitor Intel</h2><p>Monitore seus concorrentes</p></div>
      <button class="btn btn-primary" onclick="OS.openCompetitorModal()"><i class="ph ph-plus"></i> Adicionar</button>
    </div>
    <div class="intel-grid">${cards}</div>`;
}

function openCompetitorModal() {
  $('competitorModalBody').innerHTML = `
    <div class="form-group">
      <label class="form-label">Nome</label>
      <input class="form-input" id="compName" placeholder="Ex: Twilio, Zapi...">
    </div>
    <div class="form-group">
      <label class="form-label">Categoria</label>
      <input class="form-input" id="compCat" placeholder="Ex: WhatsApp API, CRM...">
    </div>
    <div class="form-group">
      <label class="form-label">Análise</label>
      <textarea class="form-textarea" id="compNotes" placeholder="Pontos fortes, fraquezas, diferenciais..."></textarea>
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
    notes: $('compNotes')?.value.trim(),
    tags: $('compTags')?.value.split(',').map(t=>t.trim()).filter(Boolean),
  });
  save(); closeModal('competitorModal'); render(); toast('Concorrente adicionado');
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
];

function viewKnowledge() {
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
    </div>`).join('') || `<div class="empty-state"><i class="ph ph-book-open"></i><h3>Nenhum documento</h3></div>`;

  return `
    <div class="section-header">
      <div><h2>Knowledge Base</h2><p>Base de conhecimento da empresa</p></div>
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
      <input class="form-input" id="kbTitle" value="${esc(doc?.title||'')}" placeholder="Título">
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
  const title = $('kbTitle')?.value.trim();
  const content = $('kbContent')?.value.trim();
  if (!title) { toast('Título obrigatório','error'); return; }
  if (id) {
    const d = S.kbDocs.find(x=>x.id===id);
    if (d) Object.assign(d, { title, content, category:$('kbCat')?.value });
  } else {
    S.kbDocs.unshift({ id:uid(), title, content, category:$('kbCat')?.value, date:now() });
  }
  save(); closeModal('kbModal'); render(); toast('Documento salvo');
}

function deleteKbDoc(id) {
  S.kbDocs = S.kbDocs.filter(d=>d.id!==id);
  save(); closeModal('kbModal'); render(); toast('Excluído');
}

// ─── AUTOMATIONS ──────────────────────────────────────────────────────────────
function viewAutomation() {
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
    <div class="section-header"><div><h2>Automações</h2><p>Workflows automáticos</p></div></div>
    <div class="automation-grid">${cards}</div>`;
}

function toggleAutomation(id) {
  const a = S.automations.find(x=>x.id===id);
  if (a) { a.active = !a.active; save(); render(); toast(a.active?'Ativada':'Desativada'); }
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
function viewSettings() {
  const models = [
    { v:'claude-sonnet-4-6', l:'Claude Sonnet 4.6 (recomendado)' },
    { v:'claude-haiku-4-5-20251001', l:'Claude Haiku 4.5 (mais rápido)' },
    { v:'claude-opus-4-6', l:'Claude Opus 4.6 (mais poderoso)' },
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
            <span class="form-hint">Necessária para os agentes responderem com IA real.</span>
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
          <h3>Empresa</h3>
          <div class="form-group">
            <label class="form-label">Nome da empresa</label>
            <input class="form-input" id="settCompany" value="${esc(S.settings.companyName||'')}" placeholder="Konnex">
          </div>
          <div class="form-group">
            <label class="form-label">Descrição (contexto para os agentes)</label>
            <textarea class="form-textarea" id="settDesc" placeholder="Descreva produto, ICP, diferenciais...">${esc(S.settings.companyDesc||'')}</textarea>
          </div>
          <button class="btn btn-primary" onclick="OS.saveSettings()"><i class="ph ph-floppy-disk"></i> Salvar</button>
        </div>
      </div>
    </div>`;
}

function saveSettings() {
  S.settings.apiKey     = $('settApiKey')?.value.trim()  || S.settings.apiKey;
  S.settings.model      = $('settModel')?.value          || S.settings.model;
  S.settings.companyName= $('settCompany')?.value.trim() || S.settings.companyName;
  S.settings.companyDesc= $('settDesc')?.value.trim()    || '';
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
      <textarea class="form-textarea" id="taskDesc" style="min-height:72px" placeholder="Detalhes..."></textarea>
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
    desc:     $('taskDesc')?.value.trim(),
    agent:    $('taskAgent')?.value,
    priority: $('taskPriority')?.value||'medium',
    status:   $('taskStatus')?.value||'backlog',
    tags:     $('taskTags')?.value.split(',').map(t=>t.trim()).filter(Boolean),
  });
  save(); closeModal('taskModal'); render(); toast('Tarefa criada');
}

function openTaskDetail(id) {
  const t = S.tasks.find(x=>x.id===id);
  if (!t) return;
  const ag = AGENTS[t.agent];
  const stOpts = COLS.map(c=>`<option value="${c.id}" ${c.id===t.status?'selected':''}>${c.label}</option>`).join('');

  $('taskModalTitle').textContent = t.title;
  $('taskModalBody').innerHTML = `
    <p style="font-size:.8rem;color:var(--g500);margin-bottom:.75rem">${t.date||''}</p>
    ${t.desc ? `<p style="font-size:.875rem;color:var(--g300);margin-bottom:1rem;line-height:1.6">${esc(t.desc)}</p>` : ''}
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
      ${ag ? `<button class="btn btn-primary btn-sm" onclick="OS.closeModal('taskModal');OS.navigate('agents/${ag.id}')"><i class="ph ph-robot"></i> Abrir ${ag.name}</button>` : ''}
    </div>`;
  openModal('taskModal');
}

function updateTaskStatus(id, status) {
  const t = S.tasks.find(x=>x.id===id);
  if (t) { t.status = status; save(); }
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
  openTaskModal, saveTask, openTaskDetail, updateTaskStatus, deleteTask,
  openModal, closeModal,
  sendMessage, useQuickPrompt, clearChat, saveAsDeliverable,
  viewDeliverable, deleteDeliverable,
  viewContentItem, setContentFilter, deleteContent,
  openSalesModal, saveSalesCall, viewSalesCall, deleteSalesCall,
  openCompetitorModal, saveCompetitor, deleteCompetitor,
  setKbCategory, openKbModal, saveKbDoc, deleteKbDoc,
  toggleAutomation, saveSettings,
};
})();

document.addEventListener('DOMContentLoaded', () => OS.init());
