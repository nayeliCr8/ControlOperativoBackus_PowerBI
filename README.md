# Backus · DPO Delivery Hub

Centro de control con los 9 dashboards del pilar Delivery (DPO 2026), organizados en 4 bloques.

## Cómo poner tus links de Power BI
1. Abre `js/main.js`.
2. En la lista `DASHBOARDS`, busca el módulo y pega el link en `url: ''`.
   - Funciona con links "Publicar en web" (`app.powerbi.com/view?r=...`) y con links de "Insertar" (`reportEmbed?...`).
   - Si al link le falta `navContentPaneEnabled=false`, se agrega solo (oculta la barra de páginas de Power BI).
3. Guarda y recarga la página. El punto del módulo se pone verde y el contador "Links configurados" sube.

## Módulos
| Bloque | Módulo | id | Requisitos |
|---|---|---|---|
| A · Operación diaria | Pre-Ruta | pre-ruta | 1.1.1.x |
| A · Operación diaria | En Ruta | en-ruta | 1.1.2.x |
| A · Operación diaria | Post-Ruta | post-ruta | 1.1.3.x |
| B · Calidad y cliente | Calidad de entrega (DQI) | dqi | 1.1.4.x |
| B · Calidad y cliente | Nivel de servicio | nivel-servicio | 1.4.3.x · 1.4.4.x |
| B · Calidad y cliente | Experiencia del cliente | cliente | 1.4.1.x · 1.4.2.x · 1.5.1.x |
| C · Equipo empoderado | Workstation del conductor | workstation | 1.2.x |
| D · Gestión mensual | Finanzas y productividad | finanzas | 1.3.x |
| D · Gestión mensual | Benchmark SKPI | benchmark | 1.5.2.x |

Puedes abrir un módulo directo con `index.html#en-ruta`, `index.html#dqi`, etc.

## Atajos
- `M` (o ☰) ocultar / mostrar el panel por completo
- `F` (o el botón ⛶) Power BI a pantalla completa: solo el reporte, con una barrita flotante para pasar al anterior/siguiente o salir (`Esc`)
- · `T` tema claro / oscuro · `H` inicio
- `←` `→` módulo anterior / siguiente · `/` buscar
- `I` panel de KPIs · `Z` zoom · `F5` recarga forzada

El tema y el estado del panel se recuerdan en el navegador. Se auto-actualiza cada 5 minutos (`REFRESH_TIME`).
