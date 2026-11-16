/* =========================================================
   BACKUS · DPO DELIVERY HUB
   ---------------------------------------------------------
   👉 SOLO TIENES QUE EDITAR LA SECCIÓN "CONFIGURACIÓN".
      Cada módulo tiene una lista "reports". Para agregar un
      reporte de Power BI copia una línea así:
        { id: 'mi-reporte', title: 'Nombre', url: 'https://app.powerbi.com/view?r=...' },
      Si un módulo no tiene reportes ( reports: [] ), aparece
      como "Pendiente" y muestra lo que debería tener.
   ========================================================= */

// =========================================================
// CONFIGURACIÓN · BLOQUES
// =========================================================
const BLOCKS = [
    { id: 'A', name: 'Operación diaria',  desc: 'El día del conductor: antes, durante y después de la ruta', freq: 'Diario',           color: 'var(--blk-a)' },
    { id: 'B', name: 'Calidad y cliente', desc: 'Lo que recibe y percibe el cliente',                         freq: 'Diario / semanal', color: 'var(--blk-b)' },
    { id: 'C', name: 'Equipo empoderado', desc: 'Lo que ve y reporta el conductor',                           freq: 'Diario',           color: 'var(--blk-c)' },
    { id: 'D', name: 'Gestión mensual',   desc: 'Comparación con otros DC y entre conductores',                        freq: 'Mensual',          color: 'var(--blk-d)' }
];

// =========================================================
// CONFIGURACIÓN · MÓDULOS Y REPORTES DE POWER BI
// =========================================================
const PBI = 'https://app.powerbi.com/view?r=';

const MODULES = [
    // ---------------- A · OPERACIÓN DIARIA ----------------
    {
        id: 'pre-ruta', block: 'A', icon: 'clock',
        title: 'Pre-Ruta', subtitle: 'Llegada → salida del DC', reqs: '1.1.1.x',
        reports: [
            { id: 'tml-asistencia',     title: 'TML, asistencia y tiempo interno', url: PBI + 'eyJrIjoiZDgzMDBiYmItZDk0ZC00YzBjLTkzNTctZmE0MDFkOTQyY2IzIiwidCI6Ijk4MjAxZmVmLWQ5ZjYtNGU2OC04NGY1LWMyNzA1MDc0ZTM0MiIsImMiOjR9' },
            { id: 'verificacion-carga', title: 'Verificación de carga', url: PBI + 'eyJrIjoiODVhNzdlNmUtM2UxNS00YTc1LWI0NmItYjc2Y2U3YzVmNmYxIiwidCI6Ijk4MjAxZmVmLWQ5ZjYtNGU2OC04NGY1LWMyNzA1MDc0ZTM0MiIsImMiOjR9' }
        ],
        kpis: [
            ['Tiempo de salida pre-ruta (TML) vs meta, por etapa', '1.1.1.7'],
            ['PI de llegada a tiempo (biométrico)', '1.1.1.3'],
            ['PI de asistencia a la reunión matinal', '1.1.1.3'],
            ['Checklist de salida Vecfleet: tiempo y anomalías', '1.1.1.5'],
            ['Verificación de carga y % camiones precintados', '1.1.1.6']
        ],
        sources: 'Biométrico, garita, Vecfleet, TML', routine: 'Reunión matinal · cierre del día'
    },
    {
        id: 'en-ruta', block: 'A', icon: 'truck',
        title: 'En Ruta', subtitle: 'Torre de control · puerta a puerta', reqs: '1.1.2.x',
        reports: [
            { id: 'eta-secuencia',     title: 'ETA, secuencia y tiempo de servicio', url: PBI + 'eyJrIjoiYmQ3NDkyMzUtNjcyNS00ZjU0LTgzOWMtNzkzNmQ1N2UxN2QzIiwidCI6Ijk4MjAxZmVmLWQ5ZjYtNGU2OC04NGY1LWMyNzA1MDc0ZTM0MiIsImMiOjR9' },
            { id: 'adherencia-km-hr',  title: 'Adherencia KM y HR',                  url: PBI + 'eyJrIjoiYzZhMDE4YTMtN2FhNS00ZTFkLWE5M2MtMDMyM2I3NTdkY2U4IiwidCI6Ijk4MjAxZmVmLWQ5ZjYtNGU2OC04NGY1LWMyNzA1MDc0ZTM0MiIsImMiOjR9' },
            { id: 'tiempo-mercado',    title: 'Tiempo de mercado, PNP y tiempos',    url: PBI + 'eyJrIjoiNzkxYTZhZmMtMjA2Zi00Njc0LTljYjctMmYzODY0MGI3OGRkIiwidCI6Ijk4MjAxZmVmLWQ5ZjYtNGU2OC04NGY1LWMyNzA1MDc0ZTM0MiIsImMiOjR9' }
        ],
        kpis: [
            ['TM puerta a puerta vs meta (filtro relevos)', '1.1.2.6'],
            ['Cumplimiento de secuencia (BEES)', '1.1.2.3'],
            ['Tiempo de conducción vs plan, desviación km y paradas no planificadas', '1.1.2.4'],
            ['Tiempo de servicio por POC', '1.1.2.5'],
            ['Horas 2T vs jornada legal y % ocupación', 'Handbook'],
            ['ETA y On Time', '1.4.2.4']
        ],
        sources: 'GPS / tracking, BEES, plan de ruteo', routine: 'Seguimiento en tiempo real'
    },
    {
        id: 'post-ruta', block: 'A', icon: 'return',
        title: 'Post-Ruta', subtitle: 'Retorno → check-out', reqs: '1.1.3.x',
        reports: [
            // mismo reporte que Pre-Ruta (TML, asistencia y tiempo interno)
            { id: 'tiempo-interno', title: 'Tiempo interno', url: PBI + 'eyJrIjoiZDgzMDBiYmItZDk0ZC00YzBjLTkzNTctZmE0MDFkOTQyY2IzIiwidCI6Ijk4MjAxZmVmLWQ5ZjYtNGU2OC04NGY1LWMyNzA1MDc0ZTM0MiIsImMiOjR9' }
        ],
        kpis: [
            ['TL: entrada del camión → check-out vs meta', '1.1.3.4'],
            ['Desglose: liquidación, 5S, inspección de retorno, inventario', '1.1.3.3']
        ],
        sources: 'Garita, liquidación, biométrico', routine: 'Cierre del día'
    },

    // ---------------- B · CALIDAD Y CLIENTE ----------------
    {
        id: 'calidad', block: 'B', icon: 'box',
        title: 'Calidad de entrega', subtitle: 'DQI · roturas y faltantes', reqs: '1.1.4.x',
        reports: [
            { id: 'dqi',               title: 'DQI',                 url: PBI + 'eyJrIjoiOWI3YWM4ZTUtZTgxNi00YjQ4LTlkYWQtMzRlNjQ0MjMwZDdjIiwidCI6Ijk4MjAxZmVmLWQ5ZjYtNGU2OC04NGY1LWMyNzA1MDc0ZTM0MiIsImMiOjR9' },
            { id: 'roturas-faltantes', title: 'Roturas y faltantes', url: PBI + 'eyJrIjoiNzg3Njg1ZjMtN2M0OS00M2YwLThkNTktYmQxMmJmMWIxN2Q2IiwidCI6Ijk4MjAxZmVmLWQ5ZjYtNGU2OC04NGY1LWMyNzA1MDc0ZTM0MiIsImMiOjR9' }
        ],
        kpis: [
            ['Roturas por motivo, ruta y conductor', '1.1.4.2'],
            ['DQI vs meta y tendencia 3 meses', '1.1.4.3'],
            ['Mejora vs año anterior / cuartil de zona', '1.1.4.4']
        ],
        sources: 'Roadmap, reporte DQI', routine: 'Reunión matinal (día anterior) · semanal'
    },
    {
        id: 'nivel-servicio', block: 'B', icon: 'target',
        title: 'Nivel de servicio', subtitle: 'Rechazos · OTIF · T2 RTM', reqs: '1.4.2.x · 1.4.3.x · 1.4.4.x',
        reports: [
            { id: 'rechazos',        title: 'Rechazos',        url: PBI + 'eyJrIjoiZTRjYTgxNmEtZWI0OC00NzJmLTk5YjgtN2U3ZTRjM2NmZDI0IiwidCI6Ijk4MjAxZmVmLWQ5ZjYtNGU2OC04NGY1LWMyNzA1MDc0ZTM0MiIsImMiOjR9' },
            { id: 'rechazos-diario', title: 'Rechazos diario', url: PBI + 'eyJrIjoiMjM5ZjhkOWYtZDU5Ni00ZTQ2LTgyYTctMGVkMjBiNzkxNjVlIiwidCI6Ijk4MjAxZmVmLWQ5ZjYtNGU2OC04NGY1LWMyNzA1MDc0ZTM0MiIsImMiOjR9' },
            // Reportes del área de trabajo (piden iniciar sesión con la cuenta corporativa).
            // "url" = versión para insertar en la página · "open" = link original de Power BI
            { id: 'otif', title: 'OTIF · In Full On Time',
              url:  'https://app.powerbi.com/reportEmbed?reportId=f846f19a-e9ca-4545-bf9f-4539b50a90ac&groupId=a96bc930-831f-4176-8d43-26b4909b6c93&pageName=06bf4fddbb0d1c918492&autoAuth=true',
              open: 'https://app.powerbi.com/groups/a96bc930-831f-4176-8d43-26b4909b6c93/reports/f846f19a-e9ca-4545-bf9f-4539b50a90ac/06bf4fddbb0d1c918492?language=es-419&experience=power-bi' },
            { id: 't2-rtm', title: 'T2 RTM',
              url:  'https://app.powerbi.com/reportEmbed?reportId=2d823f45-d224-4a4a-afcd-71a29e25885b&pageName=bc0d1c4b0c414b04fbb6&autoAuth=true',
              open: 'https://app.powerbi.com/groups/me/reports/2d823f45-d224-4a4a-afcd-71a29e25885b/bc0d1c4b0c414b04fbb6?experience=power-bi' }
        ],
        kpis: [
            ['OTIF: In Full y On Time con sus causas', '1.4.3.6 · 1.4.4.2'],
            ['% comunicaciones enviadas al cliente (en ruta, no planificado, ETA)', '1.4.2.3'],
            ['Rechazos por motivo, % modulados y resueltos por el conductor', '1.4.3.5'],
            ['KPI RTM 2T y problemas principales', '1.4.3.4'],
            ['In Full y sus causas', '1.4.3.6'],
            ['On Time: desviación por causa', '1.4.4.2'],
            ['Tendencia On Time', '1.4.4.5']
        ],
        sources: 'SAP / RTM, CORE, ruteo, mensajería', routine: 'Semanal con el enrutador'
    },
    {
        id: 'cliente', block: 'B', icon: 'star',
        title: 'Experiencia del cliente', subtitle: 'NPS · RMD · reclamos · comunicación', reqs: '1.4.1.x · 1.4.2.x · 1.5.1.x',
        reports: [
            { id: 'nps-rmd',              title: 'NPS, RMD y reclamos',          url: PBI + 'eyJrIjoiZTM3ZWQ2N2UtOWNkZi00ZTE2LWI0ZWMtNzM4NjgwY2ZiMjFhIiwidCI6Ijk4MjAxZmVmLWQ5ZjYtNGU2OC04NGY1LWMyNzA1MDc0ZTM0MiIsImMiOjR9' },
            { id: 'comunicacion-cliente', title: 'Comunicación con el cliente', url: PBI + 'eyJrIjoiZGJhNmEwZjMtNGM4OC00ZDFmLTkzYTYtZWNkOTM3ZDdlZmNjIiwidCI6IjZjNjJhOGE3LTIxNzktNDk0MS04NGFhLTdjOWJmYjNkZmVmNiIsImMiOjR9&pageName=ead499058ce02e90ea44' },
            { id: 'notificacion-pdv',     title: 'Notificación PDV',             url: PBI + 'eyJrIjoiOTcwMmRiZDUtNGVlYi00MTY4LWI5NzUtMWVkMjdmOGI1M2NiIiwidCI6Ijk4MjAxZmVmLWQ5ZjYtNGU2OC04NGY1LWMyNzA1MDc0ZTM0MiIsImMiOjR9' }
        ],
        kpis: [
            ['Califica mi entrega y quejas (todas las fuentes, ≤3★)', '1.4.1.2'],
            ['Tiempo promedio de cierre de RMD', '1.4.1.5'],
            ['% comunicaciones enviadas por tipo (en ruta, no planificado, ETA)', '1.4.2.3'],
            ['Driver de entrega en NPS: pasivos y detractores', '1.5.1.3']
        ],
        sources: 'BEES, RMD, encuestas NPS', routine: 'Diario (comunicación) · semanal'
    },

    // ---------------- C · EQUIPO EMPODERADO ----------------
    {
        id: 'equipo', block: 'C', icon: 'users',
        title: 'Equipo del conductor', subtitle: 'Workstation · feedback · 5 porqués', reqs: '1.2.x',
        reports: [
            { id: 'workstation',      title: 'Workstation',       url: PBI + 'eyJrIjoiOGUwNDM0MTEtMjExOC00YmY5LWE3ZDUtNDk2MjIzZWI0MGY1IiwidCI6IjZjNjJhOGE3LTIxNzktNDk0MS04NGFhLTdjOWJmYjNkZmVmNiIsImMiOjR9' },
            { id: 'retroalimentacion', title: 'Retroalimentación', url: PBI + 'eyJrIjoiYTlmZTY4MTMtMGE1ZS00YTEyLWIzMzktMjA1MjM2NDZiZjBmIiwidCI6Ijk4MjAxZmVmLWQ5ZjYtNGU2OC04NGY1LWMyNzA1MDc0ZTM0MiIsImMiOjR9' },
            { id: 'cinco-porques',    title: '5 porqués',         url: PBI + 'eyJrIjoiODJlYWQ3MzAtZmUzYi00NmYxLWI1NDQtM2Q0MjYxMDk2NmVhIiwidCI6Ijk4MjAxZmVmLWQ5ZjYtNGU2OC04NGY1LWMyNzA1MDc0ZTM0MiIsImMiOjR9' }
        ],
        kpis: [
            ['KPIs del día del equipo', '1.2.1.1'],
            ['Vista individual en celular + avance Grand Prix', '1.2.1.4'],
            ['Feedback Roadmap: motivos y acciones abiertas/cerradas', '1.2.2.2'],
            ['Uso de 5 porqués por conductor', '1.2.2.4']
        ],
        sources: 'Grand Prix, Roadmap', routine: 'Reunión matinal · mensual (feedback)'
    },

    // ---------------- D · GESTIÓN MENSUAL ----------------
    {
        id: 'benchmark', block: 'D', icon: 'bars',
        title: 'Benchmark SKPI', subtitle: 'Benchmark interno · ranking y clúster', reqs: '1.5.2.x',
        reports: [
            { id: 'benchmark-interno', title: 'Benchmark interno', url: PBI + 'eyJrIjoiMWRmMDdjNzUtMGE1MC00MGNlLTgyNzctOWFmODc5Y2UyMGY3IiwidCI6Ijk4MjAxZmVmLWQ5ZjYtNGU2OC04NGY1LWMyNzA1MDc0ZTM0MiIsImMiOjR9' }
        ],
        kpis: [
            ['Ranking de conductores: mejores y peores (OWD)', '1.5.2.2'],
            ['Comparación con DC del clúster', '1.5.2.3'],
            ['Tendencia SKPI vs ejercicio de referencia', '1.5.2.4']
        ],
        sources: 'SKPI, reporte Huánuco', routine: 'Mensual / trimestral'
    }
];

// Rutinas que se muestran en la página de inicio (ids de módulo o de reporte)
const ROUTINES = [
    { when: 'Reunión matinal', icon: 'clock',    items: ['tml-asistencia', 'workstation', 'dqi', 'rechazos-diario'] },
    { when: 'Durante el día',  icon: 'truck',    items: ['eta-secuencia', 'tiempo-mercado', 'notificacion-pdv', 'comunicacion-cliente'] },
    { when: 'Cierre del día',  icon: 'return',   items: ['tiempo-interno', 'verificacion-carga'] },
    { when: 'Semanal',         icon: 'calendar', items: ['otif', 't2-rtm', 'rechazos', 'adherencia-km-hr', 'roturas-faltantes', 'nps-rmd'] },
    { when: 'Mensual',         icon: 'calendar', items: ['retroalimentacion', 'cinco-porques', 'benchmark-interno'] }
];

const REFRESH_TIME = 5 * 60 * 1000;   // auto-actualizar cada 5 min
const LOAD_TIMEOUT = 30 * 1000;       // error si tarda más de 30 s

// =========================================================
// ESTADO
// =========================================================
// Cada "vista" es un reporte (o un módulo sin reportes = pendiente)
const VIEWS = [];
MODULES.forEach((m, mi) => {
    if (m.reports.length) m.reports.forEach((r, ri) => VIEWS.push({ key: r.id, m, mi, r, ri }));
    else VIEWS.push({ key: m.id, m, mi, r: null, ri: -1 });
});

let current = null;           // índice en VIEWS (null = inicio)
let isZoomed = false;
let loadTimer = null, loadTimeout = null;
const $ = (id) => document.getElementById(id);
const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};
const blockOf = (m) => BLOCKS.find(b => b.id === m.block);
const viewUrl = (i) => (i !== null && VIEWS[i] && VIEWS[i].r && VIEWS[i].r.url) ? VIEWS[i].r.url.trim() : '';
const viewOpenUrl = (i) => (VIEWS[i] && VIEWS[i].r && VIEWS[i].r.open) ? VIEWS[i].r.open : buildUrl(viewUrl(i));
const viewTitle = (i) => VIEWS[i].r ? VIEWS[i].r.title : VIEWS[i].m.title;
const firstViewOf = (moduleId) => VIEWS.findIndex(v => v.m.id === moduleId);
const viewByKey = (key) => { const i = VIEWS.findIndex(v => v.key === key); return i >= 0 ? i : firstViewOf(key); };
const icon = (name, cls = 'i') => `<svg class="${cls}"><use href="#i-${name}"/></svg>`;

// Convierte el link al formato que se puede mostrar dentro de la página:
//  · Links "Publicar en web" (view?r=...)  → se usan tal cual
//  · Links de área de trabajo (groups/.../reports/...) → reportEmbed (pide inicio de sesión corporativo)
// y agrega navContentPaneEnabled=false para ocultar la barra de páginas.
function toEmbed(url) {
    const m = url.match(/app\.powerbi\.com\/groups\/([^/]+)\/reports\/([0-9a-f-]{36})(?:\/([^/?#]+))?/i);
    if (!m) return url;
    const [, group, report, page] = m;
    let u = 'https://app.powerbi.com/reportEmbed?reportId=' + report + '&autoAuth=true';
    if (group && group.toLowerCase() !== 'me') u += '&groupId=' + group;
    if (page && !/^reportsection$/i.test(page)) u += '&pageName=' + page;
    return u;
}
function buildUrl(url, bust) {
    if (!url) return '';
    let u = toEmbed(url.trim());
    if (!/navContentPaneEnabled=/i.test(u)) u += (u.includes('?') ? '&' : '?') + 'navContentPaneEnabled=false';
    if (bust) u += '&_t=' + Date.now();
    return u;
}

// =========================================================
// SIDEBAR
// =========================================================
function renderSidebar(filter = '') {
    const q = filter.trim().toLowerCase();
    const modMatch = (m) => [m.title, m.subtitle, m.reqs, ...m.kpis.map(k => k[0]), ...m.reports.map(r => r.title)].join(' ').toLowerCase().includes(q);
    const closed = JSON.parse(store.get('dpo-closed-groups') || '[]');
    const curModule = current !== null ? VIEWS[current].m.id : null;

    let html = `
        <button class="nav-home ${current === null ? 'active' : ''}" data-tip="Inicio" onclick="goHome()">
            <span class="nav-ico">${icon('home')}</span>
            <span class="nav-label"><b>Inicio</b><small>Centro de control</small></span>
        </button>`;

    let any = false;
    BLOCKS.forEach(b => {
        const mods = MODULES.filter(m => m.block === b.id && (!q || modMatch(m)));
        if (!mods.length) return;
        any = true;
        const isClosed = !q && closed.includes(b.id);
        html += `
        <div class="nav-group ${isClosed ? 'closed' : ''}" data-block="${b.id}" style="--c:${b.color}">
            <button class="group-head" onclick="toggleGroup('${b.id}')">
                <span class="group-tag">${b.id}</span>
                <span class="group-name">${b.name}</span>
                ${icon('chevron-down')}
            </button>
            <div class="group-items">
                ${mods.map(m => {
                    const pending = !m.reports.length;
                    const vi = firstViewOf(m.id);
                    return `
                    <div class="nav-module ${curModule === m.id ? 'open' : ''}">
                        <button class="nav-item ${pending && current === vi ? 'active' : ''}" onclick="openView(${vi})">
                            <span class="nav-ico">${icon(m.icon)}</span>
                            <span class="nav-label"><b>${m.title}</b><small>${pending ? 'Pendiente' : m.reports.length + (m.reports.length === 1 ? ' reporte' : ' reportes')}</small></span>
                            <span class="link-dot ${pending ? '' : 'on'}"></span>
                        </button>
                        ${pending ? '' : `
                        <div class="nav-reports">
                            ${m.reports.map(r => {
                                const i = VIEWS.findIndex(v => v.key === r.id);
                                return `<button class="nav-report ${current === i ? 'active' : ''}" onclick="openView(${i})">${r.title}</button>`;
                            }).join('')}
                        </div>`}
                    </div>`;
                }).join('')}
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

function updateLinkCounter() {
    const withReports = MODULES.filter(m => m.reports.length).length;
    const reports = MODULES.reduce((n, m) => n + m.reports.filter(r => r.url).length, 0);
    $('linksCount').textContent = `${withReports}/${MODULES.length}`;
    $('linksBar').style.width = (withReports / MODULES.length * 100) + '%';
    $('heroLinks').textContent = reports;
    $('heroModules').textContent = MODULES.length;
}

// =========================================================
// INICIO
// =========================================================
function renderHome() {
    $('homeBlocks').innerHTML = BLOCKS.map(b => {
        const mods = MODULES.filter(m => m.block === b.id);
        return `
        <section class="block" style="--c:${b.color}">
            <div class="block-head">
                <span class="block-tag">${b.id}</span>
                <div><h2>${b.name}</h2><p>${b.desc}</p></div>
                <span class="freq">${icon('calendar')}${b.freq}</span>
            </div>
            <div class="cards">
                ${mods.map(m => {
                    const pending = !m.reports.length;
                    return `
                <div class="card" role="button" tabindex="0" onclick="openView(${firstViewOf(m.id)})">
                    <div class="card-top">
                        <span class="card-ico">${icon(m.icon)}</span>
                        <div><h3>${m.title}</h3><small>${m.subtitle}</small></div>
                        <span class="card-status ${pending ? '' : 'on'}">${pending ? 'Pendiente' : m.reports.length + (m.reports.length === 1 ? ' reporte' : ' reportes')}</span>
                    </div>
                    ${pending
                        ? `<ul>${m.kpis.slice(0, 3).map(k => `<li>${k[0]}</li>`).join('')}</ul>`
                        : `<div class="card-reports">${m.reports.map(r =>
                            `<button class="card-report" onclick="event.stopPropagation(); openView(${VIEWS.findIndex(v => v.key === r.id)})">
                                ${icon('bars', 'i i-sm')}<span>${r.title}</span>${icon('chevron', 'i i-sm')}
                             </button>`).join('')}</div>`}
                    <div class="card-foot">
                        <code>Req. ${m.reqs}</code>
                        <span>${pending ? 'Ver detalle' : 'Abrir'} ${icon('chevron')}</span>
                    </div>
                </div>`;
                }).join('')}
            </div>
        </section>`;
    }).join('');

    $('routineGrid').innerHTML = ROUTINES.map(r => `
        <div class="r-card">
            <div class="r-when">${icon(r.icon)}${r.when}</div>
            <div class="r-chips">
                ${r.items.map(key => {
                    const i = viewByKey(key);
                    if (i < 0) return '';
                    return `<button class="chip ${VIEWS[i].r ? '' : 'chip-pending'}" onclick="openView(${i})">${viewTitle(i)}</button>`;
                }).join('')}
            </div>
        </div>`).join('');

    document.querySelectorAll('[data-go]').forEach(el => {
        el.onclick = () => openView(firstViewOf(el.dataset.go));
    });
    document.querySelectorAll('.card[role="button"]').forEach(el => {
        el.addEventListener('keydown', (e) => { if (e.key === 'Enter') el.click(); });
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

function renderTabs() {
    const v = VIEWS[current];
    const reps = v.m.reports;
    $('dashTabs').classList.toggle('hidden', reps.length < 2);
    $('dashTabs').innerHTML = reps.map(r => {
        const i = VIEWS.findIndex(x => x.key === r.id);
        return `<button class="dash-tab ${i === current ? 'active' : ''}" onclick="openView(${i})">${r.title}</button>`;
    }).join('');
}

function openView(index, opts = {}) {
    if (index === null || index < 0 || index >= VIEWS.length) return;
    if (index === current && !opts.force) { closeMobileSidebar(); return; }
    current = index;
    const v = VIEWS[index], m = v.m, b = blockOf(m);

    $('homeView').classList.add('hidden');
    $('dashView').classList.remove('hidden');
    $('dashCard').style.setProperty('--c', b.color);
    $('crumbBlock').textContent = `${b.id} · ${b.name} · ${m.title}`;
    $('crumbTitle').textContent = viewTitle(index);
    $('fsTitle').textContent = viewTitle(index);
    $('dashTitle').textContent = v.r ? `${m.title} · ${v.r.title}` : m.title;
    $('dashReqs').textContent = 'Req. ' + m.reqs;

    $('infoKpis').innerHTML = m.kpis.map(k => `<li>${k[0]}<code>${k[1]}</code></li>`).join('');
    $('infoSources').textContent = m.sources;
    $('infoRoutine').textContent = m.routine;

    renderTabs();
    renderSidebar($('sbSearch').value);
    closeMobileSidebar();
    resetZoom();
    history.replaceState(null, '', '#' + v.key);

    const url = viewUrl(index);
    ['btnOpen', 'btnCopy', 'btnRefresh', 'btnZoom'].forEach(id => $(id).disabled = !url);

    if (!url) {
        stopLoading();
        $('dashboardFrame').src = 'about:blank';
        $('emptyId').textContent = `'${m.id}'`;
        $('emptyKpis').innerHTML = m.kpis.map(k => `<li>${k[0]}</li>`).join('');
        showState('emptyState');
        setStatus('pending', 'Sin reporte');
        $('lastUpdate').textContent = '';
        return;
    }
    loadFrame(buildUrl(url), 'Cargando…');
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
    if (!viewUrl(current)) return;
    loadFrame(buildUrl(viewUrl(current), bust), bust ? 'Recargando…' : 'Actualizando…');
}

function openInNewTab() {
    if (!viewUrl(current)) return;
    window.open(viewUrl(current), '_blank', 'noopener');
}

function copyLink() {
    if (!viewUrl(current)) return;
    const url = viewUrl(current);
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
    $('fsTitle').textContent = viewTitle(current);
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
    $('fsPrev').onclick = () => { openView((current - 1 + VIEWS.length) % VIEWS.length); $('fsTitle').textContent = viewTitle(current); };
    $('fsNext').onclick = () => { openView((current + 1) % VIEWS.length); $('fsTitle').textContent = viewTitle(current); };
    $('infoClose').onclick = toggleInfo;
    $('sbSearch').addEventListener('input', (e) => renderSidebar(e.target.value));

    // Abrir el módulo indicado en la URL (#pre-ruta, #en-ruta, …)
    const fromHash = location.hash ? viewByKey(location.hash.slice(1)) : -1;
    if (fromHash >= 0) openView(fromHash);

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
        else if (e.key === 'ArrowRight') openView(current === null ? 0 : (current + 1) % VIEWS.length);
        else if (e.key === 'ArrowLeft') openView(current === null ? VIEWS.length - 1 : (current - 1 + VIEWS.length) % VIEWS.length);
    });

    console.log('🍺 Backus DPO Delivery Hub · ' + VIEWS.filter((v, i) => viewUrl(i)).length + ' reportes de Power BI');
});

// Exponer para los onclick del HTML
Object.assign(window, { openView, goHome, toggleGroup });
