# Backus · DPO Delivery Hub

Centro de control con los 9 dashboards del pilar Delivery (DPO 2026), organizados en 4 bloques.

## Cómo agregar o cambiar reportes de Power BI
1. Abre `js/main.js` (en GitHub: clic en el lápiz ✏️).
2. Busca el módulo en `MODULES` y, dentro de `reports`, agrega o edita una línea:
   ```js
   { id: 'mi-reporte', title: 'Nombre que se verá', url: PBI + 'eyJrIjoi...' },
   ```
   `PBI` ya contiene `https://app.powerbi.com/view?r=`, así que solo pegas lo que va después de `r=`.
   También puedes pegar el link completo en `url: 'https://...'`.
3. Si un módulo tiene `reports: []`, aparece como "Pendiente".

## Organización actual
| Bloque | Módulo | Reportes |
|---|---|---|
| A · Operación diaria | Pre-Ruta | TML, asistencia y TI · Verificación de carga |
| A · Operación diaria | En Ruta | ETA, secuencia y tiempo de servicio · Adherencia KM y HR · Tiempo de mercado, PNP y tiempos |
| A · Operación diaria | Post-Ruta | *Pendiente* |
| B · Calidad y cliente | Calidad de entrega | DQI · Roturas y faltantes |
| B · Calidad y cliente | Nivel de servicio | *Pendiente* |
| B · Calidad y cliente | Experiencia del cliente | NPS, RMD y reclamos · Notificación PDV |
| C · Equipo empoderado | Equipo del conductor | Workstation · Retroalimentación · 5 porqués |
| D · Gestión mensual | Finanzas y productividad | *Pendiente* |
| D · Gestión mensual | Benchmark SKPI | *Pendiente* |

Puedes abrir un reporte directo con `index.html#dqi`, `index.html#workstation`, etc.

## Atajos
- `M` (o ☰) ocultar / mostrar el panel por completo
- `F` (o el botón ⛶) Power BI a pantalla completa: solo el reporte, con una barrita flotante para pasar al anterior/siguiente o salir (`Esc`)
- · `T` tema claro / oscuro · `H` inicio
- `←` `→` módulo anterior / siguiente · `/` buscar
- `I` panel de KPIs · `Z` zoom · `F5` recarga forzada

El tema y el estado del panel se recuerdan en el navegador. Se auto-actualiza cada 5 minutos (`REFRESH_TIME`).
