/* =========================================================
   BACKUS · DPO DELIVERY HUB
   ---------------------------------------------------------
   👉 SOLO TIENES QUE EDITAR LA SECCIÓN "CONFIGURACIÓN".
      Pega el link de Power BI de cada dashboard en su campo
      url: '...'. Si lo dejas vacío, el módulo aparece como
      "Pendiente" y no intenta cargar nada.
   ========================================================= */

// =========================================================
// CONFIGURACIÓN · BLOQUES
// =========================================================
const BLOCKS = [
    { id: 'A', name: 'Operación diaria',    desc: 'El día del conductor: antes, durante y después de la ruta', freq: 'Diario',            color: 'var(--blk-a)' },
    { id: 'B', name: 'Calidad y cliente',   desc: 'Lo que recibe y percibe el cliente',                         freq: 'Diario / semanal',  color: 'var(--blk-b)' },
    { id: 'C', name: 'Equipo empoderado',   desc: 'Lo que ve y reporta el conductor',                           freq: 'Diario',            color: 'var(--blk-c)' },
    { id: 'D', name: 'Gestión mensual',     desc: 'Costos, productividad y comparación',                        freq: 'Mensual',           color: 'var(--blk-d)' }
];

// =========================================================
// CONFIGURACIÓN · DASHBOARDS  (pega aquí tus links)
// =========================================================
const DASHBOARDS = [
    {
        id: 'pre-ruta', block: 'A', icon: 'clock',
        title: 'Pre-Ruta', subtitle: 'Llegada → salida del DC',
        reqs: '1.1.1.x',
        url: '',   // ← link Power BI
        kpis: [
            ['Tiempo de salida pre-ruta (TML) vs meta, por etapa', '1.1.1.7'],
            ['PI de llegada a tiempo (biométrico)', '1.1.1.3'],
            ['PI de asistencia a la reunión matinal', '1.1.1.3'],
            ['Checklist de salida Vecfleet: tiempo y anomalías', '1.1.1.5'],
            ['Verificación de carga y % camiones precintados', '1.1.1.6']
        ],
        sources: 'Biométrico, garita, Vecfleet, TML',
        routine: 'Reunión matinal · cierre del día'
    },
    {
        id: 'en-ruta', block: 'A', icon: 'truck',
        title: 'En Ruta', subtitle: 'Torre de control · puerta a puerta',
        reqs: '1.1.2.x',
        url: '',   // ← link Power BI
        kpis: [
            ['TM puerta a puerta vs meta (filtro relevos)', '1.1.2.6'],
            ['Cumplimiento de secuencia (BEES)', '1.1.2.3'],
            ['Tiempo de conducción vs plan, desviación km y paradas no planificadas', '1.1.2.4'],
            ['Tiempo de servicio por POC', '1.1.2.5'],
            ['Horas 2T vs jornada legal y % ocupación', 'Handbook'],
            ['ETA y On Time', '1.4.2.4']
        ],
        sources: 'GPS / tracking, BEES, plan de ruteo',
        routine: 'Seguimiento en tiempo real'
    },
    {
        id: 'post-ruta', block: 'A', icon: 'return',
        title: 'Post-Ruta', subtitle: 'Retorno → check-out',
        reqs: '1.1.3.x',
        url: '',   // ← link Power BI
        kpis: [
            ['TL: entrada del camión → check-out vs meta', '1.1.3.4'],
            ['Desglose: liquidación, 5S, inspección de retorno, inventario', '1.1.3.3']
        ],
        sources: 'Garita, liquidación, biométrico',
        routine: 'Cierre del día'
    },
    {
        id: 'dqi', block: 'B', icon: 'box',
        title: 'Calidad de entrega (DQI)', subtitle: 'Roturas y producto',
        reqs: '1.1.4.x',
        url: '',   // ← link Power BI
        kpis: [
            ['Roturas por motivo, ruta y conductor', '1.1.4.2'],
            ['DQI vs meta y tendencia 3 meses', '1.1.4.3'],
            ['Mejora vs año anterior / cuartil de zona', '1.1.4.4']
        ],
        sources: 'Roadmap, reporte DQI',
        routine: 'Reunión matinal (día anterior) · semanal'
    },
    {
        id: 'nivel-servicio', block: 'B', icon: 'target',
        title: 'Nivel de servicio', subtitle: 'Rechazos · In Full · On Time · RTM',
        reqs: '1.4.3.x · 1.4.4.x',
        url: '',   // ← link Power BI
        kpis: [
            ['Rechazos por motivo, % modulados y resueltos por el conductor', '1.4.3.5'],
            ['KPI RTM 2T y problemas principales', '1.4.3.4'],
            ['In Full y sus causas', '1.4.3.6'],
            ['On Time: desviación por causa', '1.4.4.2'],
            ['Tendencia On Time', '1.4.4.5']
        ],
        sources: 'SAP / RTM, CORE, ruteo',
        routine: 'Semanal con el enrutador'
    },
    {
        id: 'cliente', block: 'B', icon: 'star',
        title: 'Experiencia del cliente', subtitle: 'Califica mi entrega · RMD · NPS',
        reqs: '1.4.1.x · 1.4.2.x · 1.5.1.x',
        url: '',   // ← link Power BI
        kpis: [
            ['Califica mi entrega y quejas (todas las fuentes, ≤3★)', '1.4.1.2'],
            ['Tiempo promedio de cierre de RMD', '1.4.1.5'],
            ['% comunicaciones enviadas por tipo (en ruta, no planificado, ETA)', '1.4.2.3'],
            ['Driver de entrega en NPS: pasivos y detractores', '1.5.1.3']
        ],
        sources: 'BEES, RMD, encuestas NPS',
        routine: 'Diario (comunicación) · semanal'
    },
    {
        id: 'workstation', block: 'C', icon: 'users',
        title: 'Workstation del conductor', subtitle: 'KPIs, incentivos y feedback',
        reqs: '1.2.x',
        url: '',   // ← link Power BI
        kpis: [
            ['KPIs del día del equipo', '1.2.1.1'],
            ['Vista individual en celular + avance Grand Prix', '1.2.1.4'],
            ['Feedback Roadmap: motivos y acciones abiertas/cerradas', '1.2.2.2'],
            ['Uso de 5 porqués por conductor', '1.2.2.4']
        ],
        sources: 'Grand Prix, Roadmap',
        routine: 'Reunión matinal · mensual (feedback)'
    },
    {
        id: 'finanzas', block: 'D', icon: 'coin',
        title: 'Finanzas y productividad', subtitle: 'VLC · presupuesto · Productividad Total',
        reqs: '1.3.x',
        url: '',   // ← link Power BI
        kpis: [
            ['VLC y VLC/HL: real vs presupuesto y vs LE', '1.3.1.1'],
            ['Top 3 causas desfavorables con plan de acción', '1.3.1.2'],
            ['Productividad Total (volumen / horas)', '1.3.1.4']
        ],
        sources: 'MALU, SCFD',
        routine: 'Mensual'
    },
    {
        id: 'benchmark', block: 'D', icon: 'bars',
        title: 'Benchmark SKPI', subtitle: 'Ranking conductores y clúster',
        reqs: '1.5.2.x',
        url: '',   // ← link Power BI
        kpis: [
            ['Ranking de conductores: mejores y peores (OWD)', '1.5.2.2'],
            ['Comparación con DC del clúster', '1.5.2.3'],
            ['Tendencia SKPI vs ejercicio de referencia', '1.5.2.4']
        ],
        sources: 'SKPI, reporte Huánuco',
        routine: 'Mensual / trimestral'
    }
];

// Rutinas que se muestran en la página de inicio
const ROUTINES = [
    { when: 'Reunión matinal',  icon: 'clock',    items: ['pre-ruta', 'workstation', 'dqi', 'nivel-servicio'] },
    { when: 'Durante el día',   icon: 'truck',    items: ['en-ruta', 'cliente'] },
    { when: 'Cierre del día',   icon: 'return',   items: ['post-ruta'] },
    { when: 'Semanal',          icon: 'calendar', items: ['nivel-servicio', 'cliente'] },
    { when: 'Mensual',          icon: 'calendar', items: ['finanzas', 'benchmark', 'workstation'] }
];

const REFRESH_TIME = 5 * 60 * 1000;   // auto-actualizar cada 5 min
const LOAD_TIMEOUT = 30 * 1000;       // error si tarda más de 30 s

// =========================================================
// ESTADO
// =========================================================
let current = null;           // índice del dashboard abierto (null = inicio)
let isZoomed = false;
let loadTimer = null, loadTimeout = null;
const $ = (id) => document.getElementById(id);
const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};
const blockOf = (d) => BLOCKS.find(b => b.id === d.block);
const hasUrl = (d) => !!(d.url && d.url.trim());
const icon = (name, cls = 'i') => `<svg class="${cls}"><use href="#i-${name}"/></svg>`;

// Agrega navContentPaneEnabled=false para ocultar la barra de páginas de Power BI
function buildUrl(url, bust) {
    if (!url) return '';
    let u = url.trim();
    if (!/navContentPaneEnabled=/i.test(u)) u += (u.includes('?') ? '&' : '?') + 'navContentPaneEnabled=false';
    if (bust) u += '&_t=' + Date.now();
    return u;
}

// =========================================================
// SIDEBAR
// =========================================================
function renderSidebar(filter = '') {
    const q = filter.trim().toLowerCase();
    const match = (d) => !q || [d.title, d.subtitle, d.reqs, ...d.kpis.map(k => k[0])].join(' ').toLowerCase().includes(q);
    const closed = JSON.parse(store.get('dpo-closed-groups') || '[]');

    let html = `
        <button class="nav-home ${current === null ? 'active' : ''}" data-tip="Inicio" onclick="goHome()">
            <span class="nav-ico">${icon('home')}</span>
            <span class="nav-label"><b>Inicio</b><small>Centro de control</small></span>
        </button>`;

    let any = false;
    BLOCKS.forEach(b => {
        const items = DASHBOARDS.map((d, i) => ({ d, i })).filter(x => x.d.block === b.id && match(x.d));
        if (!items.length) return;
        any = true;
        const isClosed = !q && closed.includes(b.id);
        html += `
        <div class="nav-group ${isClosed ? 'closed' : ''}" data-block="${b.id}" style="--c:${b.color}">
            <button class="group-head" data-tip="${b.id} · ${b.name}" onclick="toggleGroup('${b.id}')">
                <span class="group-tag">${b.id}</span>
                <span class="group-name">${b.name}</span>
                ${icon('chevron-down')}
            </button>
            <div class="group-items" style="max-height:${items.length * 60}px">
                ${items.map(({ d, i }) => `
                <button class="nav-item ${current === i ? 'active' : ''}" data-tip="${d.title}" onclick="openDashboard(${i})">
                    <span class="nav-ico">${icon(d.icon)}</span>
                    <span class="nav-label"><b>${d.title}</b><small>${d.subtitle}</small></span>
                    <span class="link-dot ${hasUrl(d) ? 'on' : ''}" title="${hasUrl(d) ? 'Link configurado' : 'Link pendiente'}"></span>
                </button>`).join('')}
            </div>
        </div>`;
    });
    if (!any) html += `<div class="sb-empty">Sin resultados para "${filter}"</div>`;
    $('sbNav').innerHTML = html;
}

function toggleGroup(id) {
    let closed = JSON.parse(store.get('dpo-closed-groups') || '[]');
    closed = closed.includes(id) ? closed.filter(x => x !== id) : [...closed, id];
    store.set('dpo-closed-groups', JSON.stringify(closed));
    document.querySelector(`.nav-group[data-block="${id}"]`).classList.toggle('closed');
}

const isMobile = () => window.matchMedia('(max-width: 760px)').matches;

function toggleSidebar() {
    const root = document.documentElement;
    if (isMobile()) {
        root.classList.toggle('sb-open');
    } else {
        root.classList.toggle('sb-collapsed');
        store.set('dpo-sidebar', root.classList.contains('sb-collapsed') ? 'collapsed' : 'open');
    }
}
function closeMobileSidebar() { document.documentElement.classList.remove('sb-open'); }

// Tooltip para el modo colapsado
function setupTooltips() {
    const tip = document.createElement('div');
    tip.className = 'sb-tip';
    document.body.appendChild(tip);
    $('sbNav').addEventListener('mouseover', (e) => {
        const el = e.target.closest('[data-tip]');
        if (!el || !document.documentElement.classList.contains('sb-collapsed') || isMobile()) return;
        const r = el.getBoundingClientRect();
        tip.textContent = el.dataset.tip;
        tip.style.left = (r.right + 12) + 'px';
        tip.style.top = (r.top + r.height / 2 - 15) + 'px';
        tip.classList.add('show');
    });
    $('sbNav').addEventListener('mouseout', () => tip.classList.remove('show'));
}

function updateLinkCounter() {
    const n = DASHBOARDS.filter(hasUrl).length;
    $('linksCount').textContent = `${n}/${DASHBOARDS.length}`;
    $('linksBar').style.width = (n / DASHBOARDS.length * 100) + '%';
    $('heroLinks').textContent = n;
}

// =========================================================
// INICIO
// =========================================================
function renderHome() {
    $('homeBlocks').innerHTML = BLOCKS.map(b => {
        const items = DASHBOARDS.map((d, i) => ({ d, i })).filter(x => x.d.block === b.id);
        return `
        <section class="block" style="--c:${b.color}">
            <div class="block-head">
                <span class="block-tag">${b.id}</span>
                <div><h2>${b.name}</h2><p>${b.desc}</p></div>
                <span class="freq">${icon('calendar')}${b.freq}</span>
            </div>
            <div class="cards">
                ${items.map(({ d, i }) => `
                <button class="card" onclick="openDashboard(${i})">
                    <div class="card-top">
                        <span class="card-ico">${icon(d.icon)}</span>
                        <div><h3>${d.title}</h3><small>${d.subtitle}</small></div>
                        <span class="card-status ${hasUrl(d) ? 'on' : ''}">${hasUrl(d) ? 'Activo' : 'Pendiente'}</span>
                    </div>
                    <ul>${d.kpis.slice(0, 3).map(k => `<li>${k[0]}</li>`).join('')}</ul>
                    <div class="card-foot">
                        <code>Req. ${d.reqs}</code>
                        <span>Abrir ${icon('chevron')}</span>
                    </div>
                </button>`).join('')}
            </div>
        </section>`;
    }).join('');

    $('routineGrid').innerHTML = ROUTINES.map(r => `
        <div class="r-card">
            <div class="r-when">${icon(r.icon)}${r.when}</div>
            <div class="r-chips">
                ${r.items.map(id => {
                    const i = DASHBOARDS.findIndex(d => d.id === id);
                    return `<button class="chip" onclick="openDashboard(${i})">${DASHBOARDS[i].title}</button>`;
                }).join('')}
            </div>
        </div>`).join('');

    document.querySelectorAll('[data-go]').forEach(el => {
        el.onclick = () => openDashboard(DASHBOARDS.findIndex(d => d.id === el.dataset.go));
    });
}

function goHome() {
    if (isMaxed()) toggleFullscreen();
    current = null;
    stopLoading();
    $('dashboardFrame').src = 'about:blank';
    $('dashView').classList.add('hidden');
    $('homeView').classList.remove('hidden');
    $('crumbBlock').textContent = 'Inicio';
    $('crumbTitle').textContent = 'Centro de control';
    renderSidebar($('sbSearch').value);
    closeMobileSidebar();
    history.replaceState(null, '', location.pathname);
}

// =========================================================
// DASHBOARD
// =========================================================
function showState(name) {
    ['emptyState', 'errorState', 'loadingState'].forEach(s => $(s).classList.toggle('show', s === name));
}
function setStatus(kind, text) {
    $('statusDot').className = 'dot ' + kind;
    $('statusText').className = 'status-text ' + kind;
    $('statusText').textContent = text;
}
function stopLoading() {
    clearInterval(loadTimer);
    clearTimeout(loadTimeout);
}

function openDashboard(index, opts = {}) {
    if (index < 0 || index >= DASHBOARDS.length) return;
    if (index === current && !opts.force) { closeMobileSidebar(); return; }
    current = index;
    const d = DASHBOARDS[index];
    const b = blockOf(d);

    $('homeView').classList.add('hidden');
    $('dashView').classList.remove('hidden');
    $('dashCard').style.setProperty('--c', b.color);
    $('crumbBlock').textContent = `${b.id} · ${b.name}`;
    $('crumbTitle').textContent = d.title;
    $('fsTitle').textContent = d.title;
    $('dashTitle').textContent = d.title;
    $('dashReqs').textContent = 'Req. ' + d.reqs;

    // Panel de KPIs
    $('infoKpis').innerHTML = d.kpis.map(k => `<li>${k[0]}<code>${k[1]}</code></li>`).join('');
    $('infoSources').textContent = d.sources;
    $('infoRoutine').textContent = d.routine;

    renderSidebar($('sbSearch').value);
    closeMobileSidebar();
    resetZoom();
    history.replaceState(null, '', '#' + d.id);

    const linked = hasUrl(d);
    ['btnOpen', 'btnCopy', 'btnRefresh', 'btnZoom'].forEach(id => $(id).disabled = !linked);

    if (!linked) {
        stopLoading();
        $('dashboardFrame').src = 'about:blank';
        $('emptyId').textContent = `'${d.id}'`;
        $('emptyKpis').innerHTML = d.kpis.map(k => `<li>${k[0]}</li>`).join('');
        showState('emptyState');
        setStatus('pending', 'Link pendiente');
        $('lastUpdate').textContent = '';
        return;
    }
    loadFrame(buildUrl(d.url), 'Cargando…');
}

function loadFrame(src, label) {
    if (!navigator.onLine) { showError('No hay conexión a internet. Verifica tu red.'); return; }
    const frame = $('dashboardFrame');
    stopLoading();
    showState('loadingState');
    setStatus('loading', label);

    let s = 0;
    $('loadingTime').textContent = '0s';
    $('loadingTime').style.color = '';
    loadTimer = setInterval(() => {
        s++;
        $('loadingTime').textContent = s + 's';
        if (s > 10) $('loadingTime').style.color = 'var(--warn)';
        if (s > 20) $('loadingTime').style.color = 'var(--err)';
    }, 1000);

    frame.onload = () => {
        if (frame.src === 'about:blank') return;
        stopLoading();
        showState(null);
        setStatus('success', 'Conectado');
        updateLastUpdate();
    };
    loadTimeout = setTimeout(() => {
        stopLoading();
        showError('El dashboard está tardando demasiado en cargar.');
    }, LOAD_TIMEOUT);

    frame.src = 'about:blank';
    setTimeout(() => { frame.src = src; }, 150);
}

function showError(msg) {
    stopLoading();
    $('errorMessage').textContent = msg || 'No se pudo cargar el dashboard.';
    showState('errorState');
    setStatus('error', 'Error');
}

function refreshCurrent(bust = false) {
    if (current === null || !hasUrl(DASHBOARDS[current])) return;
    loadFrame(buildUrl(DASHBOARDS[current].url, bust), bust ? 'Recargando…' : 'Actualizando…');
}

function openInNewTab() {
    if (current === null || !hasUrl(DASHBOARDS[current])) return;
    window.open(buildUrl(DASHBOARDS[current].url), '_blank', 'noopener');
}

function copyLink() {
    if (current === null || !hasUrl(DASHBOARDS[current])) return;
    const url = buildUrl(DASHBOARDS[current].url);
    const done = () => toast('Link copiado');
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(done).catch(() => fallbackCopy(url, done));
    else fallbackCopy(url, done);
}
function fallbackCopy(text, cb) {
    const t = document.createElement('textarea');
    t.value = text; document.body.appendChild(t); t.select();
    try { document.execCommand('copy'); cb(); } catch (e) {}
    t.remove();
}

function toggleZoom() {
    if (current === null) return;
    isZoomed = !isZoomed;
    const f = $('dashboardFrame');
    f.style.transformOrigin = 'top left';
    f.style.transform = isZoomed ? 'scale(1.1)' : 'none';
    f.style.width = isZoomed ? 'calc(100% / 1.1)' : '100%';
    f.style.height = isZoomed ? 'calc(100% / 1.1)' : '100%';
    $('btnZoom').classList.toggle('on', isZoomed);
}
function resetZoom() { if (isZoomed) toggleZoom(); }

// Power BI a pantalla completa: solo el reporte, sin panel ni barras
function isMaxed() {
    return document.fullscreenElement === $('frameArea') || $('frameArea').classList.contains('maxed');
}
function toggleFullscreen() {
    if (current === null) return;
    const area = $('frameArea');
    if (isMaxed()) {
        if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
        area.classList.remove('maxed');
        return;
    }
    $('fsTitle').textContent = DASHBOARDS[current].title;
    if (area.requestFullscreen) {
        area.requestFullscreen().catch(() => area.classList.add('maxed'));   // respaldo
    } else {
        area.classList.add('maxed');
    }
}

function toggleInfo() {
    if (current === null) return;
    $('infoPanel').classList.toggle('open');
    $('btnInfo').classList.toggle('on', $('infoPanel').classList.contains('open'));
}

function updateLastUpdate() {
    $('lastUpdate').textContent = 'Actualizado ' + new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
}

// =========================================================
// TEMA CLARO / OSCURO
// =========================================================
function toggleTheme() {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    store.set('dpo-theme', next);
}

// =========================================================
// UTILIDADES
// =========================================================
let toastT;
function toast(msg) {
    const t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove('show'), 2000);
}

function updateClock() {
    $('clock').textContent = new Date().toLocaleString('es-PE', {
        weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
    });
}

function setNet(online) {
    $('netStatus').classList.toggle('off', !online);
    $('netStatus').lastChild.textContent = online ? 'Conectado' : 'Sin conexión';
}

// =========================================================
// INICIO
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
    renderSidebar();
    renderHome();
    updateLinkCounter();
    setupTooltips();
    updateClock();
    setNet(navigator.onLine);

    $('sbToggle').onclick = toggleSidebar;
    $('sbBackdrop').onclick = closeMobileSidebar;
    $('themeToggle').onclick = toggleTheme;
    $('btnOpen').onclick = openInNewTab;
    $('errOpen').onclick = openInNewTab;
    $('btnCopy').onclick = copyLink;
    $('btnRefresh').onclick = () => refreshCurrent();
    $('errRetry').onclick = () => refreshCurrent(true);
    $('btnZoom').onclick = toggleZoom;
    $('btnFull').onclick = toggleFullscreen;
    $('btnInfo').onclick = toggleInfo;
    $('fsExit').onclick = toggleFullscreen;
    $('fsPrev').onclick = () => { openDashboard((current - 1 + DASHBOARDS.length) % DASHBOARDS.length); $('fsTitle').textContent = DASHBOARDS[current].title; };
    $('fsNext').onclick = () => { openDashboard((current + 1) % DASHBOARDS.length); $('fsTitle').textContent = DASHBOARDS[current].title; };
    $('infoClose').onclick = toggleInfo;
    $('sbSearch').addEventListener('input', (e) => renderSidebar(e.target.value));

    // Abrir el módulo indicado en la URL (#pre-ruta, #en-ruta, …)
    const fromHash = DASHBOARDS.findIndex(d => '#' + d.id === location.hash);
    if (fromHash >= 0) openDashboard(fromHash);

    setInterval(updateClock, 15000);
    setInterval(() => refreshCurrent(), REFRESH_TIME);

    window.addEventListener('online', () => { setNet(true); refreshCurrent(); });
    window.addEventListener('offline', () => { setNet(false); if (current !== null) showError('Sin conexión a internet. Reconecta para continuar.'); });

    document.addEventListener('keydown', (e) => {
        if (e.target.matches('input, textarea')) {
            if (e.key === 'Escape') e.target.blur();
            return;
        }
        const k = e.key.toLowerCase();
        if (e.ctrlKey && k === 'r') { e.preventDefault(); refreshCurrent(); return; }
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        if (k === 'm') toggleSidebar();
        else if (k === 't') toggleTheme();
        else if (e.key === 'Escape' && $('frameArea').classList.contains('maxed')) $('frameArea').classList.remove('maxed');
        else if (k === 'h' || e.key === 'Escape') { if (document.documentElement.classList.contains('sb-open')) closeMobileSidebar(); else if (k === 'h') goHome(); }
        else if (k === 'f') toggleFullscreen();
        else if (k === 'z') toggleZoom();
        else if (k === 'i') toggleInfo();
        else if (k === '/') { e.preventDefault(); if (document.documentElement.classList.contains('sb-collapsed')) toggleSidebar(); $('sbSearch').focus(); }
        else if (e.key === 'F11') { e.preventDefault(); toggleFullscreen(); }
        else if (e.key === 'F5') { e.preventDefault(); refreshCurrent(true); }
        else if (e.key === 'ArrowRight') openDashboard(current === null ? 0 : (current + 1) % DASHBOARDS.length);
        else if (e.key === 'ArrowLeft') openDashboard(current === null ? DASHBOARDS.length - 1 : (current - 1 + DASHBOARDS.length) % DASHBOARDS.length);
    });

    console.log('🍺 Backus DPO Delivery Hub · ' + DASHBOARDS.filter(hasUrl).length + '/' + DASHBOARDS.length + ' links configurados');
});

// Exponer para los onclick del HTML
Object.assign(window, { openDashboard, goHome, toggleGroup });
