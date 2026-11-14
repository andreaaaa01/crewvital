/* CrewVital - logica de la aplicacion (dominio publico, CC0).
   Sin servidor ni cuentas: todo se guarda en este navegador. Registro 100% manual. */
(function () {
  'use strict';

  var KEY = 'crewvital.v2';
  var TABS = ['dashboard', 'body', 'measure', 'routine', 'crew', 'emergency', 'science'];
  var BASE_MIN = 7; /* dias previos necesarios para activar la linea base personal */

  var UI = {
    tagline: { es: 'Monitoreo de salud para tripulaciones espaciales', en: 'Health monitoring for space crews' },
    env: { es: 'Entorno de misión', en: 'Mission environment' },
    who: { es: 'Tripulante', en: 'Crew member' },
    sos: { es: 'EMERGENCIA', en: 'EMERGENCY' },
    day: { es: 'Día de misión', en: 'Mission day' },
    tab_dashboard: { es: 'Panel', en: 'Dashboard' },
    tab_body: { es: 'Cuerpo', en: 'Body' },
    tab_measure: { es: 'Medir', en: 'Measure' },
    tab_routine: { es: 'Rutina y logros', en: 'Routine and rewards' },
    tab_crew: { es: 'Tripulación', en: 'Crew' },
    tab_emergency: { es: 'Modo emergencia', en: 'Emergency mode' },
    tab_science: { es: 'Ciencia y fuentes', en: 'Science and sources' },
    noData: { es: 'Sin datos todavía. Registra tu primera medición en la pestaña Medir.', en: 'No data yet. Log your first measurement in the Measure tab.' },
    allOk: { es: 'Todo en rango. Sigue con la rutina.', en: 'Everything is in range. Keep up the routine.' },
    someCaution: { es: 'Hay indicadores en precaución. Revisa las acciones recomendadas.', en: 'Some indicators are in caution. Review the recommended actions.' },
    someCritical: { es: 'Hay indicadores CRÍTICOS. Actúa y contacta de inmediato.', en: 'There are CRITICAL indicators. Act and make contact now.' },
    context: { es: 'Contexto del entorno', en: 'Environment context' },
    gravity: { es: 'Gravedad', en: 'Gravity' },
    delay: { es: 'Comunicación con apoyo', en: 'Communication with support' },
    evac: { es: 'Evacuación médica', en: 'Medical evacuation' },
    hazardsOn: { es: 'Peligros más relevantes aquí', en: 'Most relevant hazards here' },
    trendAlerts: { es: 'Alertas de patrón', en: 'Pattern alerts' },
    trendText: { es: 'lleva 3 días seguidos fuera de rango. Un patrón así merece atención aunque ningún valor sea crítico.', en: 'has been out of range 3 days in a row. A pattern like this deserves attention even if no value is critical.' },
    baseAlerts: { es: 'Cambios respecto de tu línea base', en: 'Changes from your baseline' },
    baseText: { es: 'se aleja de tu promedio personal', en: 'is away from your personal average' },
    baseline: { es: 'Línea base personal', en: 'Personal baseline' },
    basePending: { es: 'se activa con 7 días previos de registros. Llevas', en: 'activates with 7 previous days of logs. You have' },
    days: { es: 'días', en: 'days' },
    day_: { es: 'Día', en: 'Day' },
    clickHint: { es: 'Toca una tarjeta para ver historial, gráfica y acciones.', en: 'Tap a card to see history, chart, and actions.' },
    notMeasured: { es: 'Sin medir', en: 'Not measured' },
    bodyHint: { es: 'Toca una parte del cuerpo o un botón de la lista para ver su función, los riesgos del espacio y su estado actual.', en: 'Tap a body part or a button in the list to see its function, space risks, and current status.' },
    fn: { es: 'Qué hace', en: 'What it does' },
    risk: { es: 'Riesgo en el espacio', en: 'Risk in space' },
    hazards: { es: 'Peligros asociados', en: 'Related hazards' },
    indicators: { es: 'Indicadores', en: 'Indicators' },
    detail: { es: 'Detalle', en: 'Detail' },
    measureNow: { es: 'Medir ahora', en: 'Measure now' },
    pickInd: { es: 'Elige qué medir', en: 'Choose what to measure' },
    why: { es: 'Por qué se mide', en: 'Why it is measured' },
    spaceEffect: { es: 'Cómo lo afecta el espacio', en: 'How space affects it' },
    howTo: { es: 'Cómo medir, paso a paso', en: 'How to measure, step by step' },
    manualNote: { es: 'Registro manual: mide con el equipo de la misión y escribe aquí el valor que muestra.', en: 'Manual entry: measure with the mission equipment and type the value it shows.' },
    attach: { es: 'Adjuntar imagen (foto del equipo o ultrasonido), opcional', en: 'Attach image (photo of device or ultrasound), optional' },
    attachNote: { es: 'La imagen queda como evidencia en el historial. La app no la analiza.', en: 'The image is kept as evidence in the history. The app does not analyze it.' },
    save: { es: 'Guardar medición', en: 'Save measurement' },
    invalid: { es: 'Revisa el valor: debe estar entre', en: 'Check the value: it must be between' },
    result: { es: 'Resultado', en: 'Result' },
    whatToDo: { es: 'Qué hacer ahora', en: 'What to do now' },
    contact: { es: 'Contacto', en: 'Contact' },
    caution1: { es: 'Registra y repite la medición. Contacta a {S} en la próxima comunicación programada.', en: 'Log and repeat the measurement. Contact {S} at the next scheduled communication.' },
    critical1: { es: 'Contacta de inmediato a {S}.', en: 'Contact {S} immediately.' },
    points: { es: 'puntos', en: 'points' },
    openEm: { es: 'Abrir Modo Emergencia', en: 'Open Emergency Mode' },
    nextPending: { es: 'Siguiente medición pendiente', en: 'Next pending measurement' },
    close: { es: 'Cerrar', en: 'Close' },
    history: { es: 'Historial reciente', en: 'Recent history' },
    when: { es: 'Fecha y hora', en: 'Date and time' },
    value: { es: 'Valor', en: 'Value' },
    status: { es: 'Estado', en: 'Status' },
    normalRange: { es: 'Rango normal', en: 'Normal range' },
    routineTitle: { es: 'Rutina de hoy', en: 'Today\'s routine' },
    morning: { es: 'Mañana', en: 'Morning' },
    evening: { es: 'Noche', en: 'Evening' },
    pendingN: { es: 'mediciones pendientes hoy', en: 'measurements pending today' },
    done: { es: 'Hecho', en: 'Done' },
    pending: { es: 'Pendiente', en: 'Pending' },
    measure: { es: 'Medir', en: 'Measure' },
    pts: { es: 'Puntos', en: 'Points' },
    level: { es: 'Nivel', en: 'Level' },
    streak: { es: 'Racha (días completos)', en: 'Streak (complete days)' },
    medals: { es: 'Logros', en: 'Achievements' },
    m_first: { es: 'Primera medición', en: 'First measurement' },
    m_3: { es: 'Racha de 3 días', en: '3-day streak' },
    m_7: { es: 'Semana completa', en: 'Full week' },
    m_rad: { es: 'Guardián de la radiación (7 registros)', en: 'Radiation guardian (7 logs)' },
    m_50: { es: '50 mediciones', en: '50 measurements' },
    ptsNote: { es: 'Cada indicador suma 10 puntos una vez por día; un día completo suma 30 más.', en: 'Each indicator gives 10 points once per day; a complete day gives 30 more.' },
    dataTools: { es: 'Misión y datos', en: 'Mission and data' },
    missionStart: { es: 'Fecha de inicio de la misión', en: 'Mission start date' },
    startInvalid: { es: 'La fecha de inicio no puede ser posterior a hoy ni al primer registro.', en: 'The start date cannot be after today or after the first log.' },
    exportCsv: { es: 'Descargar historial (CSV)', en: 'Download history (CSV)' },
    reset: { es: 'Borrar todos los datos', en: 'Delete all data' },
    resetConfirm: { es: '¿Borrar todos los datos guardados en este navegador?', en: 'Delete all data saved in this browser?' },
    dataNote: { es: 'Todo se guarda solo en este navegador; no hay cuentas ni servidor. El día de misión se calcula con la fecha real.', en: 'Everything is stored only in this browser; there are no accounts or server. Mission day is computed from the real date.' },
    saveFail: { es: 'No se pudo guardar: el almacenamiento del navegador está lleno o bloqueado. Descarga el CSV y libera espacio.', en: 'Could not save: browser storage is full or blocked. Download the CSV and free up space.' },
    imgDropped: { es: 'Medición guardada sin la imagen: no queda espacio para fotos.', en: 'Measurement saved without the image: no space left for photos.' },
    reminder: { es: 'Recordatorio de rutina', en: 'Routine reminder' },
    crewTitle: { es: 'Estado de la tripulación', en: 'Crew status' },
    crewHint: { es: 'Vista del oficial médico: última medición de cada tripulante, ordenada por severidad. Toca "Abrir panel" para ver su detalle.', en: 'Medical officer view: each crew member\'s latest measurement, sorted by severity. Tap "Open dashboard" to see their details.' },
    lastData: { es: 'Último dato', en: 'Latest data' },
    view: { es: 'Ver', en: 'View' },
    active: { es: 'Activo', en: 'Active' },
    crewManage: { es: 'Gestionar tripulación', en: 'Manage crew' },
    crewName: { es: 'Nombre o alias', en: 'Name or alias' },
    addCrew: { es: 'Agregar tripulante', en: 'Add crew member' },
    remove: { es: 'Quitar', en: 'Remove' },
    removeConfirm: { es: '¿Quitar a este tripulante y borrar sus registros?', en: 'Remove this crew member and delete their logs?' },
    crewDefault: { es: 'Tripulante', en: 'Crew member' },
    crewNoData: { es: 'Sin mediciones todavía.', en: 'No measurements yet.' },
    allInRange: { es: 'Todos los indicadores medidos están en rango.', en: 'All measured indicators are in range.' },
    outOfRange: { es: 'Fuera de rango', en: 'Out of range' },
    todayRoutine: { es: 'Rutina de hoy', en: 'Today\'s routine' },
    openPanel: { es: 'Abrir panel', en: 'Open dashboard' },
    crewMatrix: { es: 'Ver todos los indicadores (tabla)', en: 'See all indicators (table)' },
    crewRenameHint: { es: 'Edita un nombre y sal del campo para guardarlo.', en: 'Edit a name and leave the field to save it.' },
    crewAdded: { es: 'Tripulante agregado', en: 'Crew member added' },
    ago: { es: 'hace', en: 'ago' },
    now: { es: 'ahora', en: 'just now' },
    emIntro: { es: 'Elige la situación. Los pasos se adaptan al entorno de misión seleccionado.', en: 'Choose the situation. Steps adapt to the selected mission environment.' },
    yes: { es: 'Sí', en: 'Yes' },
    no: { es: 'No', en: 'No' },
    restart: { es: 'Reiniciar protocolo', en: 'Restart protocol' },
    logVitals: { es: 'Registrar signos vitales', en: 'Log vital signs' },
    emDisclaimer: { es: 'Protocolo educativo, fuente clínica por confirmar. En una misión real se sigue el protocolo médico oficial y las instrucciones del cirujano de vuelo.', en: 'Educational protocol, clinical source to be confirmed. On a real mission, follow the official medical protocol and the flight surgeon\'s instructions.' },
    summaryTitle: { es: 'Resumen para enviar', en: 'Summary to send' },
    summaryHint: { es: 'Se arma con las últimas mediciones. Con retraso de comunicación, envía un mensaje completo para no depender de preguntas y respuestas.', en: 'Built from the latest measurements. With communication delay, send a complete message so you do not depend on back-and-forth.' },
    copy: { es: 'Copiar resumen', en: 'Copy summary' },
    copied: { es: 'Resumen copiado', en: 'Summary copied' },
    hazTitle: { es: 'Los 5 peligros del vuelo espacial y los indicadores que los vigilan', en: 'The 5 hazards of spaceflight and the indicators that watch them' },
    qTitle: { es: 'Las 5 preguntas del reto y dónde responde la app', en: 'The 5 challenge questions and where the app answers them' },
    thrTitle: { es: 'Umbrales usados (transparencia)', en: 'Thresholds used (transparency)' },
    thrNote: { es: 'Son valores de referencia generales para adultos. Deben validarse con un cirujano de vuelo antes de cualquier uso real. La radiación usa el 50% y el 80% del límite de carrera de 600 mSv (NASA-STD-3001).', en: 'These are general adult reference values. They must be validated by a flight surgeon before any real use. Radiation uses 50% and 80% of the 600 mSv career limit (NASA-STD-3001).' },
    src: { es: 'Fuente', en: 'Source' },
    srcPending: { es: 'Por confirmar', en: 'To be confirmed' },
    srcTitle: { es: 'Fuentes', en: 'Sources' },
    dualTitle: { es: 'Impacto dual: espacio y Tierra', en: 'Dual impact: space and Earth' },
    dualText: { es: 'La misma lógica de autodiagnóstico asistido (medir, explicar, alertar, escalar) sirve en comunidades remotas con poco acceso a médicos. Cambia el entorno a "Tierra: comunidad remota" para ver cómo se adapta el contacto y la evacuación.', en: 'The same assisted self-diagnosis logic (measure, explain, alert, escalate) serves remote communities with limited access to doctors. Switch the environment to "Earth: remote community" to see how contact and evacuation adapt.' },
    dualBtn: { es: 'Ver en modo comunidad remota', en: 'View as remote community' },
    notProd: { es: 'Prototipo educativo. No es un dispositivo médico ni sustituye a un profesional de la salud. Dominio público (CC0).', en: 'Educational prototype. Not a medical device and does not replace a health professional. Public domain (CC0).' },
    ind: { es: 'Indicador', en: 'Indicator' },
    crit: { es: 'Crítico', en: 'Critical' },
    caut: { es: 'Precaución', en: 'Caution' },
    where: { es: 'Dónde', en: 'Where' }
  };

  var QUESTIONS = [
    { q: { es: '1. ¿Qué mediciones se pueden realizar en el espacio?', en: '1. What measurements can be taken in space?' },
      a: { es: '10 mediciones con equipos compactos: tensiómetro, pulsómetro, termómetro, oxímetro, glucómetro, dosímetro y registros de sueño, ánimo, ejercicio y nutrición.', en: '10 measurements with compact equipment: blood pressure cuff, pulse sensor, thermometer, oximeter, glucometer, dosimeter, plus sleep, mood, exercise, and nutrition logs.' }, tab: 'measure' },
    { q: { es: '2. ¿Por qué es necesario cada examen?', en: '2. Why is each exam necessary?' },
      a: { es: 'Cada medición explica en lenguaje simple por qué importa, pensado para tripulantes que no son médicos.', en: 'Each measurement explains in plain language why it matters, written for crew who are not doctors.' }, tab: 'measure' },
    { q: { es: '3. ¿Cómo afectan los peligros del vuelo espacial a estos indicadores?', en: '3. How do spaceflight hazards affect these indicators?' },
      a: { es: 'La figura humana conecta cada órgano con los peligros del HRP, y cada medición indica cómo la afecta el espacio.', en: 'The body figure connects each organ to the HRP hazards, and each measurement says how space affects it.' }, tab: 'body' },
    { q: { es: '4. ¿Cuándo merece atención un resultado?', en: '4. When does a result deserve attention?' },
      a: { es: 'Semáforo de tres niveles con umbrales visibles, alertas de patrón de 3 días seguidos, comparación con la línea base personal y escalamiento según el entorno.', en: 'Three-level traffic light with visible thresholds, 3-consecutive-day pattern alerts, comparison with the personal baseline, and escalation based on the environment.' }, tab: 'dashboard' },
    { q: { es: '5. ¿Qué acciones pueden prevenir una condición crítica?', en: '5. What actions can prevent a critical condition?' },
      a: { es: 'Acciones preventivas por indicador y estado, rutina diaria con logros y protocolos de emergencia paso a paso.', en: 'Preventive actions per indicator and state, a daily routine with rewards, and step-by-step emergency protocols.' }, tab: 'emergency' }
  ];

  /* ---------- utilidades basicas ---------- */
  function $(id) { return document.getElementById(id); }
  function byId(id) { for (var i = 0; i < IND.length; i++) { if (IND[i].id === id) return IND[i]; } return null; }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function isoDate(d) { return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }
  function midnight(ts) { var d = new Date(ts); return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime(); }

  /* ---------- estado ---------- */
  function defaults() {
    return { lang: 'es', env: 'transit', missionStart: isoDate(new Date()), entries: [], seq: 0, tab: 'dashboard', sel: 'bp', region: null,
      crew: [{ id: 'c1', name: 'Tripulante 1' }], cseq: 1, who: 'c1', em: { sc: null, node: null } };
  }
  var state = load();
  var pendingImg = null;
  var lastResult = null;
  var toastTimer = null;

  function validEntry(e, crewIds) {
    if (!e || typeof e.ts !== 'number' || !isFinite(e.ts) || crewIds.indexOf(e.who) < 0 || !e.values) return false;
    var ind = byId(e.ind);
    if (!ind) return false;
    return ind.fields.every(function (f) { return typeof e.values[f.key] === 'number' && isFinite(e.values[f.key]); });
  }
  function load() {
    var d = defaults(), s = null;
    try { s = JSON.parse(localStorage.getItem(KEY)); } catch (e) { s = null; }
    if (!s || typeof s !== 'object') return d;
    if (s.lang === 'es' || s.lang === 'en') d.lang = s.lang;
    if (typeof s.env === 'string' && ENVS.hasOwnProperty(s.env)) d.env = s.env;
    if (TABS.indexOf(s.tab) >= 0) d.tab = s.tab;
    if (byId(s.sel)) d.sel = s.sel;
    if (typeof s.region === 'string' && REGIONS.hasOwnProperty(s.region)) d.region = s.region;
    if (/^\d{4}-\d{2}-\d{2}$/.test(s.missionStart || '')) d.missionStart = s.missionStart;
    if (Array.isArray(s.crew)) {
      var crew = s.crew.filter(function (c) { return c && typeof c.id === 'string' && typeof c.name === 'string' && c.name; });
      if (crew.length) d.crew = crew;
    }
    var ids = d.crew.map(function (c) { return c.id; });
    d.who = ids.indexOf(s.who) >= 0 ? s.who : ids[0];
    d.cseq = typeof s.cseq === 'number' ? s.cseq : d.crew.length;
    d.seq = typeof s.seq === 'number' ? s.seq : 0;
    if (Array.isArray(s.entries)) d.entries = s.entries.filter(function (e) { return validEntry(e, ids); });
    return d;
  }
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(state)); return true; } catch (e) { return false; } }
  function save() { var ok = persist(); if (!ok) { toast(u('saveFail')); } return ok; }

  /* ---------- utilidades ---------- */
  function T(o) { if (o == null) return ''; if (typeof o === 'string') return o; return o[state.lang] || o.es; }
  function u(k) { return T(UI[k]); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function dec(step) { var s = String(step); return s.indexOf('.') >= 0 ? s.split('.')[1].length : 0; }
  function fmt(f, v) { return Number(v).toFixed(dec(f.step)); }
  function fill(txt) {
    var env = ENVS[state.env], S = T(env.escalate);
    if (state.lang === 'es') { var aS = /^el /.test(S) ? 'al ' + S.slice(3) : 'a ' + S; txt = txt.replace(/a \{S\}/g, aS); }
    return txt.replace(/\{S\}/g, S).replace(/\{NOTE\}/g, T(env.note));
  }
  function toast(msg) {
    var t = $('toast'); if (!t) return;
    t.textContent = msg; t.className = 'show';
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.className = ''; }, 5000);
  }
  function ago(ts) {
    var m = Math.max(0, Math.round((Date.now() - ts) / 60000)), txt;
    if (m < 1) return u('now');
    if (m < 60) txt = m + ' min'; else if (m < 1440) txt = Math.round(m / 60) + ' h'; else txt = Math.round(m / 1440) + ' d';
    return state.lang === 'es' ? u('ago') + ' ' + txt : txt + ' ' + u('ago');
  }
  function dateTime(ts) { var d = new Date(ts); return isoDate(d) + ' ' + pad2(d.getHours()) + ':' + pad2(d.getMinutes()); }
  function crewName(id) { for (var i = 0; i < state.crew.length; i++) { if (state.crew[i].id === id) return state.crew[i].name; } return ''; }

  /* ---------- tiempo de mision (fecha real) ---------- */
  function startMs() { var p = state.missionStart.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]).getTime(); }
  function dayOf(ts) { return Math.round((midnight(ts) - startMs()) / 86400000) + 1; }
  function today() { return dayOf(Date.now()); }

  /* ---------- clasificacion ---------- */
  function classify(f, v) {
    if (v < f.critMin || v > f.critMax) return 2;
    if (v < f.normalMin || v > f.normalMax) return 1;
    return 0;
  }
  function entryState(ind, values) {
    var s = 0;
    ind.fields.forEach(function (f) { s = Math.max(s, classify(f, values[f.key])); });
    return s;
  }
  function badge(s, txt) {
    if (s < 0) return '<span class="badge bn">' + esc(txt || u('notMeasured')) + '</span>';
    return '<span class="badge b' + s + '">' + esc(txt || STATES.label[state.lang][s]) + '</span>';
  }

  /* ---------- datos ---------- */
  function refresh() {
    state.entries.forEach(function (e) { e.day = dayOf(e.ts); e.state = entryState(byId(e.ind), e.values); });
    state.entries.sort(function (a, b) { return a.ts - b.ts || a.seq - b.seq; });
  }
  function entriesOf(who) { who = who || state.who; return state.entries.filter(function (e) { return e.who === who; }); }
  function latest(id, who) {
    who = who || state.who;
    for (var i = state.entries.length - 1; i >= 0; i--) { var e = state.entries[i]; if (e.ind === id && e.who === who) return e; }
    return null;
  }
  function hasEntry(id, day, who) {
    who = who || state.who;
    return state.entries.some(function (e) { return e.ind === id && e.day === day && e.who === who; });
  }
  function addEntry(id, values, img) {
    var ind = byId(id);
    state.seq += 1;
    var ts = Date.now();
    var e = { seq: state.seq, who: state.who, ts: ts, day: dayOf(ts), ind: id, values: values, state: entryState(ind, values), source: 'manual' };
    if (img) e.img = img;
    state.entries.push(e); refresh();
    if (!persist()) {
      if (e.img) { delete e.img; if (persist()) { toast(u('imgDropped')); return e; } }
      toast(u('saveFail'));
    }
    return e;
  }
  /* ultimo valor de cada dia para un campo, del tripulante activo */
  function dailySeries(id, key) {
    var map = {};
    entriesOf().forEach(function (e) { if (e.ind === id) map[e.day] = e.values[key]; });
    return Object.keys(map).map(Number).sort(function (a, b) { return a - b; }).map(function (d) { return { d: d, v: map[d] }; });
  }
  function valueText(e) {
    var ind = byId(e.ind);
    var nums = ind.fields.map(function (f) { return fmt(f, e.values[f.key]); }).join('/');
    return nums + ' ' + ind.fields[0].unit;
  }
  function regionState(r) {
    var worst = -1;
    REGIONS[r].inds.forEach(function (id) { var l = latest(id); if (l) worst = Math.max(worst, l.state); });
    return worst;
  }
  function overall(who) {
    var worst = -1;
    IND.forEach(function (i) { var l = latest(i.id, who); if (l) worst = Math.max(worst, l.state); });
    return worst;
  }
  function dayDone(d) { var n = 0; IND.forEach(function (i) { if (hasEntry(i.id, d)) n++; }); return n; }
  function pendingToday() { var t = today(); return IND.filter(function (i) { return !hasEntry(i.id, t); }); }
  function streakInfo() {
    var maxDay = today(), cur = 0, best = 0, run = 0, completeDays = 0, d;
    for (d = 1; d <= maxDay; d++) {
      if (dayDone(d) === IND.length) { run++; completeDays++; best = Math.max(best, run); } else { run = 0; }
    }
    d = maxDay; if (dayDone(d) < IND.length) d--;
    while (d >= 1 && dayDone(d) === IND.length) { cur++; d--; }
    return { cur: cur, best: best, complete: completeDays };
  }
  /* 3 dias de calendario consecutivos fuera de rango, considerando todos los campos */
  function trendAlerts() {
    var out = [];
    IND.forEach(function (ind) {
      var map = {};
      entriesOf().forEach(function (e) { if (e.ind === ind.id) map[e.day] = e.state; });
      var days = Object.keys(map).map(Number).sort(function (a, b) { return a - b; }).slice(-3);
      if (days.length === 3 && days[2] - days[0] === 2 && days.every(function (d) { return map[d] >= 1; })) { out.push(ind); }
    });
    return out;
  }
  /* linea base personal: promedio y desviacion de los dias previos al ultimo registro */
  function baseline(ind, f) {
    if (ind.cumulative) return null;
    var ser = dailySeries(ind.id, f.key);
    if (!ser.length) return null;
    var last = ser[ser.length - 1].v, prev = ser.slice(0, -1).map(function (p) { return p.v; });
    var b = { n: prev.length, ready: prev.length >= BASE_MIN, last: last, out: false };
    if (!b.ready) return b;
    var mean = prev.reduce(function (a, x) { return a + x; }, 0) / prev.length;
    var varc = prev.reduce(function (a, x) { return a + (x - mean) * (x - mean); }, 0) / (prev.length - 1);
    b.mean = mean; b.sd = Math.max(Math.sqrt(varc), f.step);
    b.out = Math.abs(last - mean) > 2 * b.sd;
    return b;
  }
  function baseAlerts() {
    var out = [];
    IND.forEach(function (ind) {
      ind.fields.forEach(function (f) { var b = baseline(ind, f); if (b && b.ready && b.out) out.push({ ind: ind, f: f, b: b }); });
    });
    return out;
  }
  function baseText(f, b) { return b.mean.toFixed(Math.max(1, dec(f.step))) + ' ± ' + b.sd.toFixed(Math.max(1, dec(f.step))) + ' ' + f.unit + ' (n=' + b.n + ')'; }
  function pointsInfo() {
    var seen = {}, n = 0;
    entriesOf().forEach(function (e) { var k = e.ind + '|' + e.day; if (!seen[k]) { seen[k] = 1; n++; } });
    return n;
  }

  /* ---------- graficas ---------- */
  function chart(ind, f, big) {
    var pts = dailySeries(ind.id, f.key).slice(-14);
    if (!pts.length) return '';
    var W = big ? 560 : 160, H = big ? 210 : 44;
    var pad = big ? { l: 44, r: 12, t: 12, b: 26 } : { l: 3, r: 3, t: 4, b: 4 };
    var data = pts.map(function (p) { return p.v; });
    var dMin = Math.min.apply(null, data), dMax = Math.max.apply(null, data);
    var bandTop = f.open ? Math.max(dMax, f.normalMin * 1.15) : f.normalMax;
    var lo = Math.min(dMin, f.normalMin), hi = Math.max(dMax, bandTop);
    if (hi === lo) { hi = lo + 1; }
    var span = hi - lo; lo -= span * 0.08; hi += span * 0.08;
    var d0 = pts[0].d, d1 = pts[pts.length - 1].d;
    function X(d) { return pad.l + (d1 === d0 ? (W - pad.l - pad.r) / 2 : (d - d0) / (d1 - d0) * (W - pad.l - pad.r)); }
    function Y(v) { return pad.t + (hi - v) / (hi - lo) * (H - pad.t - pad.b); }
    var yb1 = Y(Math.min(bandTop, hi)), yb2 = Y(Math.max(f.normalMin, lo));
    var s = '<svg class="' + (big ? 'big' : 'spark') + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(T(ind.name)) + '" preserveAspectRatio="xMidYMid meet">';
    s += '<rect x="' + pad.l + '" y="' + yb1 + '" width="' + (W - pad.l - pad.r) + '" height="' + Math.max(1, yb2 - yb1) + '" fill="rgba(47,191,113,.16)"/>';
    var line = pts.map(function (p) { return X(p.d).toFixed(1) + ',' + Y(p.v).toFixed(1); }).join(' ');
    s += '<polyline points="' + line + '" fill="none" stroke="#8fb4ff" stroke-width="' + (big ? 2.2 : 1.6) + '"/>';
    pts.forEach(function (p) {
      s += '<circle cx="' + X(p.d).toFixed(1) + '" cy="' + Y(p.v).toFixed(1) + '" r="' + (big ? 4.5 : 2.6) + '" fill="' + STATES.color[classify(f, p.v)] + '" stroke="#0b1220" stroke-width="1"/>';
    });
    if (big) {
      s += '<text x="4" y="' + (yb1 + 4) + '" fill="#9db0d3" font-size="11">' + fmt(f, Math.min(bandTop, hi)) + '</text>';
      s += '<text x="4" y="' + (yb2 + 4) + '" fill="#9db0d3" font-size="11">' + fmt(f, Math.max(f.normalMin, lo)) + '</text>';
      s += '<text x="' + pad.l + '" y="' + (H - 6) + '" fill="#9db0d3" font-size="11">' + esc(u('day_')) + ' ' + d0 + '</text>';
      s += '<text x="' + (W - pad.r) + '" y="' + (H - 6) + '" text-anchor="end" fill="#9db0d3" font-size="11">' + esc(u('day_')) + ' ' + d1 + '</text>';
    }
    return s + '</svg>';
  }

  /* ---------- render: encabezado y pestanas ---------- */
  function renderHeader() {
    var envOpts = Object.keys(ENVS).map(function (k) { return '<option value="' + k + '"' + (k === state.env ? ' selected' : '') + '>' + esc(T(ENVS[k].name)) + '</option>'; }).join('');
    var crewOpts = state.crew.map(function (c) { return '<option value="' + esc(c.id) + '"' + (c.id === state.who ? ' selected' : '') + '>' + esc(c.name) + '</option>'; }).join('');
    $('top').innerHTML =
      '<div class="brand"><b>CrewVital</b><span>' + esc(u('tagline')) + '</span></div>' +
      '<div class="dayinfo">' + esc(u('day')) + ' <b>' + today() + '</b></div>' +
      '<label class="ctl">' + esc(u('who')) + '<select id="whoSel">' + crewOpts + '</select></label>' +
      '<label class="ctl">' + esc(u('env')) + '<select id="envSel">' + envOpts + '</select></label>' +
      '<div class="lang" role="group" aria-label="Idioma / Language"><button data-action="lang" data-v="es" aria-pressed="' + (state.lang === 'es') + '">ES</button><button data-action="lang" data-v="en" aria-pressed="' + (state.lang === 'en') + '">EN</button></div>' +
      '<button class="sos" data-action="sos">' + esc(u('sos')) + '</button>';
    document.documentElement.lang = state.lang;
    syncTop();
  }
  function syncTop() { var h = $('top').offsetHeight; if (h) { document.documentElement.style.setProperty('--top-h', h + 'px'); } }
  function renderTabs() {
    $('tabs').innerHTML = TABS.map(function (t) {
      return '<button role="tab" id="tab_' + t + '" aria-controls="main" data-action="tab" data-v="' + t + '" aria-selected="' + (state.tab === t) + '">' + esc(u('tab_' + t)) + '</button>';
    }).join('');
    $('main').setAttribute('aria-labelledby', 'tab_' + state.tab);
  }
  function renderFooter() { $('foot').innerHTML = '<p>' + esc(u('notProd')) + '</p>'; }

  /* ---------- render: panel ---------- */
  function envContext() {
    var env = ENVS[state.env];
    var chips = Object.keys(HAZARDS).map(function (h) { return '<span class="chip' + (env.hazards.indexOf(h) >= 0 ? ' on' : '') + '">' + esc(T(HAZARDS[h])) + '</span>'; }).join('');
    return '<div class="box"><h3>' + esc(u('context')) + ': ' + esc(T(env.name)) + '</h3>' +
      '<dl class="kv"><dt>' + esc(u('gravity')) + '</dt><dd>' + esc(T(env.gravity)) + '</dd><dt>' + esc(u('delay')) + '</dt><dd>' + esc(T(env.delay)) + '</dd><dt>' + esc(u('evac')) + '</dt><dd>' + esc(T(env.evac)) + '</dd></dl>' +
      '<p class="small muted" style="margin-top:.6rem">' + esc(u('hazardsOn')) + '</p><div class="chips">' + chips + '</div></div>';
  }
  function renderDashboard() {
    var w = overall();
    var msg = w < 0 ? u('noData') : (w === 0 ? u('allOk') : (w === 1 ? u('someCaution') : u('someCritical')));
    var html = '<div class="banner ' + (w < 0 ? '' : 's' + w) + '">' + (w < 0 ? '' : badge(w)) + '<b>' + esc(crewName(state.who)) + ': ' + esc(msg) + '</b></div>';
    var alerts = trendAlerts();
    if (alerts.length) {
      html += '<h3>' + esc(u('trendAlerts')) + '</h3>' + alerts.map(function (i) { return '<div class="alert"><b>' + esc(T(i.name)) + '</b> ' + esc(u('trendText')) + '</div>'; }).join('');
    }
    var bas = baseAlerts();
    if (bas.length) {
      html += '<h3>' + esc(u('baseAlerts')) + '</h3>' + bas.map(function (a) {
        return '<div class="alert"><b>' + esc(T(a.ind.name)) + (a.ind.fields.length > 1 ? ' (' + esc(T(a.f.label)) + ')' : '') + ':</b> ' + esc(fmt(a.f, a.b.last) + ' ' + a.f.unit) + ' ' + esc(u('baseText')) + ' ' + esc(baseText(a.f, a.b)) + '</div>';
      }).join('');
    }
    html += '<div class="grid g-2" style="margin-bottom:.8rem">' + envContext() + '</div>';
    html += '<p class="small muted">' + esc(u('clickHint')) + '</p><div class="grid g-cards">';
    IND.forEach(function (ind) {
      var l = latest(ind.id), s = l ? l.state : -1;
      html += '<button class="card' + (s >= 0 ? ' s' + s : '') + '" data-action="open" data-v="' + ind.id + '">' +
        '<div class="card-h"><span class="name">' + esc(T(ind.name)) + '</span>' + badge(s) + '</div>' +
        '<div class="val">' + (l ? esc(valueText(l)) : '-') + '</div>' + (l ? chart(ind, ind.fields[0], false) : '') +
        '<div class="meta">' + (l ? esc(u('day_') + ' ' + l.day + ' · ' + ago(l.ts)) : '') + '</div></button>';
    });
    $('main').innerHTML = html + '</div>';
  }
  function srcHtml(ind) {
    if (ind.src && ind.src.u) return '<a href="' + esc(ind.src.u) + '" target="_blank" rel="noopener">' + esc(ind.src.t) + '</a>';
    return esc(u('srcPending'));
  }
  function openDetail(id) {
    var ind = byId(id), l = latest(id), s = l ? l.state : -1;
    var h = '<h2>' + esc(T(ind.name)) + ' ' + badge(s) + '</h2>';
    if (l) { h += '<p class="stat">' + esc(valueText(l)) + '</p><p class="small muted">' + esc(dateTime(l.ts) + ' · ' + ago(l.ts)) + '</p>'; }
    ind.fields.forEach(function (f) {
      h += '<p class="small muted">' + esc(T(f.label)) + '</p>' + chart(ind, f, true);
      var b = baseline(ind, f);
      if (b) { h += '<p class="small"><b>' + esc(u('baseline')) + ':</b> ' + esc(b.ready ? baseText(f, b) : u('basePending') + ' ' + b.n + ' ' + u('days') + '.') + '</p>'; }
    });
    h += '<p class="small muted">' + esc(u('normalRange')) + ': ' + esc(ind.fields.map(function (f) { return rangeText(f); }).join(' | ')) + ' · ' + esc(u('src')) + ': ' + srcHtml(ind) + '</p>';
    if (l) { h += '<h3>' + esc(u('whatToDo')) + '</h3>' + actionsHtml(ind, s); }
    h += '<h3>' + esc(u('why')) + '</h3><p>' + esc(T(ind.why)) + '</p><h3>' + esc(u('spaceEffect')) + '</h3><p>' + esc(T(ind.space)) + '</p>';
    var rows = entriesOf().filter(function (e) { return e.ind === id; }).slice(-8).reverse();
    if (rows.length) {
      h += '<h3>' + esc(u('history')) + '</h3><div class="scroll"><table><tr><th>' + esc(u('day_')) + '</th><th>' + esc(u('when')) + '</th><th>' + esc(u('value')) + '</th><th>' + esc(u('status')) + '</th></tr>' +
        rows.map(function (e) { return '<tr><td>' + e.day + '</td><td>' + esc(dateTime(e.ts)) + '</td><td>' + esc(valueText(e)) + (e.img && /^data:image\//.test(e.img) ? '<br><img class="thumb" alt="" src="' + esc(e.img) + '">' : '') + '</td><td>' + badge(e.state) + '</td></tr>'; }).join('') + '</table></div>';
    }
    h += '<div class="row" style="margin-top:1rem"><button class="btn primary" data-action="measureInd" data-v="' + id + '">' + esc(u('measureNow')) + '</button><button class="btn" data-action="closeDlg">' + esc(u('close')) + '</button></div>';
    var dlg = $('dlg'); dlg.innerHTML = h;
    if (dlg.showModal) { dlg.showModal(); } else { dlg.setAttribute('open', ''); }
  }
  function closeDlg() { var d = $('dlg'); if (d.open) { if (d.close) { d.close(); } else { d.removeAttribute('open'); } } }
  function rangeText(f) {
    if (f.open) { return fmt(f, f.normalMin) + '+ ' + f.unit; }
    return fmt(f, f.normalMin) + ' - ' + fmt(f, f.normalMax) + ' ' + f.unit;
  }
  function thresholdParts(f) {
    var caut = [], crit = [];
    var lowStart = f.critMin >= f.min ? f.critMin : f.min;
    if (f.normalMin > lowStart) {
      var lowEnd = Number((f.normalMin - f.step).toFixed(dec(f.step)));
      caut.push(lowStart === lowEnd ? fmt(f, lowStart) : fmt(f, lowStart) + ' - ' + fmt(f, lowEnd));
    }
    if (!f.open && f.normalMax < f.max) {
      var hs = Number((f.normalMax + f.step).toFixed(dec(f.step)));
      caut.push(fmt(f, hs) + ' - ' + fmt(f, f.critMax < f.max ? f.critMax : f.max));
    }
    if (f.critMin >= f.min) { crit.push('< ' + fmt(f, f.critMin)); }
    if (f.critMax < f.max) { crit.push('> ' + fmt(f, f.critMax)); }
    return { caut: caut.join(' / '), crit: crit.join(' / ') };
  }
  function actionsHtml(ind, s) {
    if (s === 0) { return '<p>' + esc(T(ind.actions.normal)) + '</p>'; }
    var list = T(ind.actions[s === 1 ? 'caution' : 'critical'] || ind.actions.caution);
    var contact = s === 1 ? u('caution1') : u('critical1');
    return '<ul class="list">' + list.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ul><p><b>' + esc(u('contact')) + ':</b> ' + esc(fill(contact)) + (s === 2 ? ' ' + esc(T(ENVS[state.env].note)) : '') + '</p>';
  }

  /* ---------- render: cuerpo ---------- */
  function bodySvg() {
    function hot(r, shapes) {
      var s = regionState(r), c = s < 0 ? '#4b5b7d' : STATES.color[s];
      return '<g class="hot' + (state.region === r ? ' sel' : '') + '" data-action="region" data-v="' + r + '" role="button" tabindex="0" aria-label="' + esc(T(REGIONS[r].name)) + '" style="--c:' + c + '">' + shapes + '</g>';
    }
    var sil = '<g class="sil"><circle cx="110" cy="42" r="27"/><rect x="99" y="64" width="22" height="16" rx="6"/><rect x="62" y="76" width="96" height="130" rx="28"/><rect x="32" y="84" width="26" height="122" rx="13"/><rect x="162" y="84" width="26" height="122" rx="13"/><rect x="70" y="200" width="36" height="196" rx="17"/><rect x="114" y="200" width="36" height="196" rx="17"/></g>';
    var s = '<svg class="fig" viewBox="0 0 220 410" role="group" aria-label="' + esc(u('tab_body')) + '">' + sil;
    s += hot('head', '<circle cx="110" cy="42" r="18"/>');
    s += hot('lungs', '<ellipse cx="86" cy="118" rx="16" ry="25"/><ellipse cx="134" cy="118" rx="16" ry="25"/>');
    s += hot('heart', '<circle cx="110" cy="128" r="12"/>');
    s += hot('abdomen', '<rect x="80" y="160" width="60" height="40" rx="15"/>');
    s += hot('bones', '<rect x="74" y="236" width="28" height="150" rx="13"/><rect x="118" y="236" width="28" height="150" rx="13"/>');
    s += hot('body', '<rect x="36" y="92" width="18" height="106" rx="9"/><rect x="166" y="92" width="18" height="106" rx="9"/>');
    return s + '</svg>';
  }
  function renderBody() {
    var r = state.region, panel;
    if (!r) { panel = '<div class="box"><p>' + esc(u('bodyHint')) + '</p></div>'; }
    else {
      var R = REGIONS[r];
      panel = '<div class="box"><h2>' + esc(T(R.name)) + ' ' + badge(regionState(r)) + '</h2>' +
        '<h3>' + esc(u('fn')) + '</h3><p>' + esc(T(R.fn)) + '</p>' +
        '<h3>' + esc(u('risk')) + '</h3><p>' + esc(T(R.risk)) + '</p>' +
        '<h3>' + esc(u('hazards')) + '</h3><div class="chips">' + R.hazards.map(function (h) { return '<span class="chip on">' + esc(T(HAZARDS[h])) + '</span>'; }).join('') + '</div>' +
        '<h3>' + esc(u('indicators')) + '</h3>' +
        R.inds.map(function (id) {
          var ind = byId(id), l = latest(id);
          return '<div class="row" style="margin-bottom:.5rem"><span style="min-width:11rem"><b>' + esc(T(ind.name)) + '</b></span>' + (l ? '<span>' + esc(valueText(l)) + '</span>' : '') + badge(l ? l.state : -1) +
            '<button class="btn sm" data-action="open" data-v="' + id + '">' + esc(u('detail')) + '</button><button class="btn sm primary" data-action="measureInd" data-v="' + id + '">' + esc(u('measureNow')) + '</button></div>';
        }).join('') + '</div>';
    }
    var legend = '<div class="legend">' + Object.keys(REGIONS).map(function (k) {
      return '<button class="btn sm" data-action="region" data-v="' + k + '" aria-pressed="' + (state.region === k) + '">' + esc(T(REGIONS[k].name)) + ' ' + badge(regionState(k)) + '</button>';
    }).join('') + '</div>';
    $('main').innerHTML = '<div class="fig-wrap"><div>' + bodySvg() + legend + '</div><div>' + panel + '</div></div>';
  }

  /* ---------- render: medir ---------- */
  function renderMeasure() {
    var ind = byId(state.sel) || IND[0], t = today();
    var h = '<h2>' + esc(u('pickInd')) + ' · ' + esc(crewName(state.who)) + '</h2><div class="pick">' + IND.map(function (i) {
      return '<button data-action="sel" data-v="' + i.id + '" aria-pressed="' + (i.id === ind.id) + '" class="' + (hasEntry(i.id, t) ? 'done' : '') + '">' + esc(T(i.name)) + '</button>';
    }).join('') + '</div><div class="grid g-2"><div class="box">';
    h += '<h3>' + esc(u('howTo')) + '</h3><ol class="steps">' + T(ind.steps).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ol>';
    h += '<h3>' + esc(u('why')) + '</h3><p>' + esc(T(ind.why)) + '</p>';
    h += '<h3>' + esc(u('spaceEffect')) + '</h3><p>' + esc(T(ind.space)) + '</p>';
    h += '<div class="chips">' + ind.hazards.map(function (x) { return '<span class="chip on">' + esc(T(HAZARDS[x])) + '</span>'; }).join('') + '</div></div>';
    h += '<form class="box" id="mform" novalidate><h3>' + esc(T(ind.name)) + '</h3><p class="small muted">' + esc(u('manualNote')) + '</p>';
    ind.fields.forEach(function (f) {
      if (ind.id === 'mood') {
        h += '<p class="small">' + esc(T(f.label)) + '</p><div class="moods" id="moods">' + [1, 2, 3, 4, 5].map(function (n) { return '<button type="button" data-action="mood" data-v="' + n + '" aria-pressed="false">' + n + '</button>'; }).join('') + '</div><input type="hidden" name="' + f.key + '" id="f_' + f.key + '">';
      } else {
        h += '<label class="f">' + esc(T(f.label)) + ' (' + esc(f.unit) + ')<input type="number" inputmode="decimal" name="' + f.key + '" id="f_' + f.key + '" min="' + f.min + '" max="' + f.max + '" step="' + f.step + '"></label>';
      }
    });
    h += '<label class="f">' + esc(u('attach')) + '<input type="file" id="img" accept="image/*"></label><div id="imgPrev"></div><p class="small muted">' + esc(u('attachNote')) + '</p>';
    h += '<p id="merr" class="small" style="color:var(--bad)" role="alert"></p><button type="submit" class="btn primary">' + esc(u('save')) + '</button></form></div>';
    if (lastResult && lastResult.e.ind === ind.id) { h += resultHtml(lastResult); }
    $('main').innerHTML = h;
  }
  function resultHtml(res) {
    var e = res.e, ind = byId(e.ind);
    var h = '<div class="result s' + e.state + '" id="result"><h2>' + esc(u('result')) + ': ' + esc(T(ind.name)) + ' ' + badge(e.state) + '</h2><p class="stat">' + esc(valueText(e)) + '</p>';
    h += '<h3>' + esc(u('whatToDo')) + '</h3>' + actionsHtml(ind, e.state);
    if (res.first) { h += '<p class="small muted">+10 ' + esc(u('points')) + '</p>'; }
    h += '<div class="row">';
    if (e.state === 2) { h += '<button class="btn danger" data-action="sos">' + esc(u('openEm')) + '</button>'; }
    var next = pendingToday()[0];
    if (next) { h += '<button class="btn primary" data-action="measureInd" data-v="' + next.id + '">' + esc(u('nextPending')) + ': ' + esc(T(next.name)) + '</button>'; }
    h += '<button class="btn" data-action="tab" data-v="dashboard">' + esc(u('tab_dashboard')) + '</button></div></div>';
    return h;
  }
  function submitMeasure(ev) {
    ev.preventDefault();
    var ind = byId(state.sel), values = {}, err = '';
    ind.fields.forEach(function (f) {
      var raw = $('f_' + f.key).value;
      var v = parseFloat(String(raw).replace(',', '.'));
      if (raw === '' || isNaN(v) || v < f.min || v > f.max) { err = u('invalid') + ' ' + f.min + ' - ' + f.max + ' (' + T(f.label) + ')'; } else { values[f.key] = v; }
    });
    if (err) { $('merr').textContent = err; return; }
    var first = !hasEntry(ind.id, today());
    var e = addEntry(ind.id, values, pendingImg);
    pendingImg = null; lastResult = { e: e, first: first };
    renderHeader(); renderMeasure();
    var r = $('result'); if (r && r.scrollIntoView) { r.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    if (e.state === 2) { toast(STATES.label[state.lang][2] + ': ' + T(ind.name)); }
  }
  function handleImage(file) {
    if (!file) { pendingImg = null; $('imgPrev').innerHTML = ''; return; }
    var reader = new FileReader();
    reader.onload = function () {
      var im = new Image();
      im.onload = function () {
        var max = 220, k = Math.min(1, max / Math.max(im.width, im.height));
        var c = document.createElement('canvas'); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
        c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
        pendingImg = c.toDataURL('image/jpeg', 0.6);
        $('imgPrev').innerHTML = '<img class="thumb" alt="" src="' + pendingImg + '">';
      };
      im.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  /* ---------- render: rutina ---------- */
  function minStartDate() {
    var lim = midnight(Date.now());
    state.entries.forEach(function (e) { lim = Math.min(lim, midnight(e.ts)); });
    return isoDate(new Date(lim));
  }
  function renderRoutine() {
    var t = today(), info = streakInfo(), pts = pointsInfo() * 10 + info.complete * 30;
    var done = dayDone(t), pend = pendingToday(), mine = entriesOf();
    var ids = {};
    mine.forEach(function (e) { if (e.ind === 'radiation') ids[e.day] = 1; });
    var radDays = Object.keys(ids).length;
    var medals = [
      { k: 'm_first', on: mine.length >= 1 }, { k: 'm_3', on: info.best >= 3 }, { k: 'm_7', on: info.best >= 7 },
      { k: 'm_rad', on: radDays >= 7 }, { k: 'm_50', on: pointsInfo() >= 50 }
    ];
    var h = '<div class="grid g-2"><div class="box"><h2>' + esc(u('routineTitle')) + ' · ' + esc(crewName(state.who)) + '</h2>' +
      '<p>' + esc(u('day')) + ' <b>' + t + '</b>: ' + done + '/' + IND.length + ' - ' + pend.length + ' ' + esc(u('pendingN')) + '</p>' +
      '<div class="bar" aria-hidden="true"><i style="width:' + Math.round(done / IND.length * 100) + '%"></i></div>';
    [['am', 'morning'], ['pm', 'evening']].forEach(function (g) {
      h += '<h3 style="margin-top:.8rem">' + esc(u(g[1])) + '</h3>';
      IND.filter(function (i) { return i.when === g[0]; }).forEach(function (i) {
        var ok = hasEntry(i.id, t);
        h += '<div class="row" style="margin-bottom:.35rem"><span style="min-width:12rem">' + esc(T(i.name)) + '</span>' +
          (ok ? '<span class="badge b0">' + esc(u('done')) + '</span>' : '<span class="badge bn">' + esc(u('pending')) + '</span><button class="btn sm primary" data-action="measureInd" data-v="' + i.id + '">' + esc(u('measure')) + '</button>') + '</div>';
      });
    });
    h += '</div><div class="box"><div class="stats"><div><div class="stat">' + pts + '</div><div class="small muted">' + esc(u('pts')) + '</div></div><div><div class="stat">' + (Math.floor(pts / 200) + 1) + '</div><div class="small muted">' + esc(u('level')) + '</div></div><div><div class="stat">' + info.cur + '</div><div class="small muted">' + esc(u('streak')) + '</div></div></div>' +
      '<p class="small muted" style="margin-top:.6rem">' + esc(u('ptsNote')) + '</p>' +
      '<h3 style="margin-top:1rem">' + esc(u('medals')) + '</h3><div class="badges">' + medals.map(function (m) { return '<span class="medal' + (m.on ? ' on' : '') + '">' + esc(u(m.k)) + '</span>'; }).join('') + '</div></div></div>';
    h += '<div class="box" style="margin-top:.8rem"><h3>' + esc(u('dataTools')) + '</h3>' +
      '<label class="f">' + esc(u('missionStart')) + '<input type="date" id="startDate" value="' + esc(state.missionStart) + '" max="' + minStartDate() + '"></label>' +
      '<div class="row"><button class="btn" data-action="csv">' + esc(u('exportCsv')) + '</button><button class="btn danger" data-action="reset">' + esc(u('reset')) + '</button></div><p class="small muted" style="margin-top:.6rem">' + esc(u('dataNote')) + '</p></div>';
    $('main').innerHTML = h;
  }
  function csvCell(s) { return '"' + String(s).replace(/"/g, '""') + '"'; }
  function exportCsv() {
    var rows = ['timestamp,mission_day,crew,indicator,field,value,unit,status,source'];
    state.entries.forEach(function (e) {
      var ind = byId(e.ind);
      ind.fields.forEach(function (f) { rows.push([new Date(e.ts).toISOString(), e.day, csvCell(crewName(e.who)), e.ind, f.key, e.values[f.key], csvCell(f.unit), ['normal', 'caution', 'critical'][e.state], e.source || 'manual'].join(',')); });
    });
    var blob = new Blob(['﻿' + rows.join('\n')], { type: 'text/csv;charset=utf-8' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'crewvital_historial.csv';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }

  /* ---------- render: tripulacion (vista del oficial medico) ---------- */
  function crewRows() {
    var t = today();
    return state.crew.map(function (c, idx) {
      var last = 0, flags = [], done = 0;
      state.entries.forEach(function (e) { if (e.who === c.id) last = Math.max(last, e.ts); });
      IND.forEach(function (i) {
        var l = latest(i.id, c.id);
        if (l && l.state > 0) flags.push({ ind: i, e: l });
        if (hasEntry(i.id, t, c.id)) done++;
      });
      flags.sort(function (a, b) { return b.e.state - a.e.state; });
      return { c: c, idx: idx, w: overall(c.id), last: last, flags: flags, done: done };
    }).sort(function (a, b) { return b.w - a.w || (a.w < 0 ? a.idx - b.idx : a.last - b.last) || a.idx - b.idx; });
  }
  function crewCard(r) {
    var on = r.c.id === state.who, pct = Math.round(100 * r.done / IND.length);
    var h = '<article class="crew-card' + (r.w < 0 ? '' : ' s' + r.w) + (on ? ' on' : '') + '" aria-label="' + esc(r.c.name) + '">' +
      '<div class="card-h"><b class="crew-name">' + esc(r.c.name) + '</b>' + badge(r.w) + '</div>' +
      '<div class="meta">' + esc(u('lastData')) + ': ' + (r.last ? esc(ago(r.last)) : '-') + '</div>';
    if (r.w < 0) h += '<p class="small muted">' + esc(u('crewNoData')) + '</p>';
    else if (!r.flags.length) h += '<p class="small crew-ok">' + esc(u('allInRange')) + '</p>';
    else h += '<div class="small muted">' + esc(u('outOfRange')) + ':</div><ul class="crew-flags">' + r.flags.map(function (f) {
      return '<li>' + badge(f.e.state, T(f.ind.name) + ': ' + valueText(f.e)) + '</li>';
    }).join('') + '</ul>';
    h += '<div class="crew-prog"><div class="row small" style="justify-content:space-between"><span>' + esc(u('todayRoutine')) + '</span><span>' + r.done + '/' + IND.length + '</span></div>' +
      '<div class="bar" role="progressbar" aria-label="' + esc(u('todayRoutine')) + '" aria-valuemin="0" aria-valuemax="' + IND.length + '" aria-valuenow="' + r.done + '"><i style="width:' + pct + '%"></i></div></div>';
    h += '<div class="row crew-act">' + (on ? '<span class="chip on">' + esc(u('active')) + '</span><button class="btn sm" data-action="tab" data-v="dashboard">' + esc(u('openPanel')) + '</button>'
      : '<button class="btn sm primary" data-action="viewCrew" data-v="' + esc(r.c.id) + '" aria-label="' + esc(u('openPanel') + ': ' + r.c.name) + '">' + esc(u('openPanel')) + '</button>') +
      '<button class="btn sm" data-action="crewMeasure" data-v="' + esc(r.c.id) + '">' + esc(u('tab_measure')) + '</button></div>';
    return h + '</article>';
  }
  function renderCrew() {
    var rows = crewRows(), n = { '-1': 0, 0: 0, 1: 0, 2: 0 };
    rows.forEach(function (r) { n[r.w]++; });
    var h = '<h2>' + esc(u('crewTitle')) + '</h2><p class="small muted">' + esc(u('crewHint')) + '</p>';
    h += '<div class="crew-sum" role="list">' + [2, 1, 0, -1].map(function (s) {
      return '<div class="crew-stat' + (s < 0 ? '' : ' s' + s) + (n[s] ? '' : ' zero') + '" role="listitem"><span class="stat">' + n[s] + '</span>' + badge(s) + '</div>';
    }).join('') + '</div>';
    h += '<div class="grid crew-grid">' + rows.map(crewCard).join('') + '</div>';
    h += '<details class="box crew-matrix"><summary>' + esc(u('crewMatrix')) + '</summary><div class="scroll"><table><caption class="sr">' + esc(u('crewMatrix')) + '</caption><tr><th scope="col">' + esc(u('who')) + '</th><th scope="col">' + esc(u('status')) + '</th>' +
      IND.map(function (i) { return '<th scope="col">' + esc(T(i.name)) + '</th>'; }).join('') + '</tr>';
    rows.forEach(function (r) {
      h += '<tr><th scope="row">' + esc(r.c.name) + '</th><td>' + badge(r.w) + '</td>';
      IND.forEach(function (i) {
        var l = latest(i.id, r.c.id);
        h += '<td>' + (l ? badge(l.state, valueText(l)) : '<span class="muted">-</span>') + '</td>';
      });
      h += '</tr>';
    });
    h += '</table></div></details>';
    h += '<div class="box" style="margin-top:.8rem"><h3>' + esc(u('crewManage')) + '</h3><p class="small muted">' + esc(u('crewRenameHint')) + '</p><div class="crew-list">';
    state.crew.forEach(function (c) {
      h += '<div class="row"><input class="txt" type="text" maxlength="30" data-crew="' + esc(c.id) + '" value="' + esc(c.name) + '" aria-label="' + esc(u('crewName')) + '">' +
        (state.crew.length > 1 ? '<button class="btn sm danger" data-action="delCrew" data-v="' + esc(c.id) + '" aria-label="' + esc(u('remove') + ': ' + c.name) + '">' + esc(u('remove')) + '</button>' : '') + '</div>';
    });
    h += '</div><form id="crewForm" class="row" style="margin-top:.8rem"><input class="txt" id="newCrew" type="text" maxlength="30" placeholder="' + esc(u('crewName')) + '" aria-label="' + esc(u('crewName')) + '">' +
      '<button class="btn primary" type="submit">' + esc(u('addCrew')) + '</button></form></div>';
    $('main').innerHTML = h;
  }
  function addCrew(name) {
    state.cseq += 1;
    state.crew.push({ id: 'c' + state.cseq, name: name || (u('crewDefault') + ' ' + state.cseq) });
    var ok = save(); render();
    if (ok) { toast(u('crewAdded') + ': ' + state.crew[state.crew.length - 1].name); }
  }

  /* ---------- render: emergencia ---------- */
  function summaryText() {
    var S = fill('{S}'), lines = [];
    lines.push((state.lang === 'es' ? 'MENSAJE PARA ' : 'MESSAGE FOR ') + S.toUpperCase());
    lines.push((state.lang === 'es' ? 'Tripulante: ' : 'Crew member: ') + crewName(state.who));
    lines.push((state.lang === 'es' ? 'Entorno: ' : 'Environment: ') + T(ENVS[state.env].name) + ' | ' + u('day') + ' ' + today() + ' | ' + dateTime(Date.now()));
    lines.push(state.lang === 'es' ? 'Situación: (describir síntomas y hora de inicio)' : 'Situation: (describe symptoms and start time)');
    lines.push(state.lang === 'es' ? 'Últimos signos vitales:' : 'Latest vital signs:');
    IND.forEach(function (ind) {
      var l = latest(ind.id);
      if (l) { lines.push('- ' + T(ind.name) + ': ' + valueText(l) + ' [' + STATES.label[state.lang][l.state] + '] (' + dateTime(l.ts) + ')'); }
    });
    lines.push(state.lang === 'es' ? 'Acciones tomadas: (completar)' : 'Actions taken: (fill in)');
    lines.push(state.lang === 'es' ? 'Ayuda solicitada: (completar)' : 'Help requested: (fill in)');
    return lines.join('\n');
  }
  function renderEmergency() {
    var h = '<h2>' + esc(u('tab_emergency')) + '</h2><p class="muted">' + esc(u('emIntro')) + '</p><div class="pick">';
    Object.keys(EMERGENCY).forEach(function (k) {
      h += '<button data-action="emSc" data-v="' + k + '" aria-pressed="' + (state.em.sc === k) + '">' + esc(T(EMERGENCY[k].title)) + '</button>';
    });
    h += '</div>';
    var sc = state.em.sc;
    if (sc && EMERGENCY[sc]) {
      var def = EMERGENCY[sc];
      if (def.nodes) {
        var node = def.nodes[state.em.node || def.start];
        if (node.q) {
          h += '<div class="em-box"><div class="em-q">' + esc(T(node.q)) + '</div><div class="row"><button class="btn primary" data-action="emAns" data-v="' + node.yes + '">' + esc(u('yes')) + '</button><button class="btn" data-action="emAns" data-v="' + node.no + '">' + esc(u('no')) + '</button></div></div>';
        } else {
          h += '<div class="em-box' + (node.level === 1 ? ' l1' : '') + '"><h3>' + esc(T(node.title)) + '</h3><ol class="steps">' + T(node.steps).map(function (x) { return '<li>' + esc(fill(x)) + '</li>'; }).join('') + '</ol></div>';
        }
        h += '<div class="row" style="margin-top:.6rem"><button class="btn" data-action="emSc" data-v="' + sc + '">' + esc(u('restart')) + '</button></div>';
      } else {
        h += '<div class="em-box' + (def.level === 1 ? ' l1' : '') + '"><h3>' + esc(T(def.title)) + '</h3><ol class="steps">' + T(def.steps).map(function (x) { return '<li>' + esc(fill(x)) + '</li>'; }).join('') + '</ol></div>';
      }
      h += '<div class="row" style="margin-top:.6rem"><button class="btn primary" data-action="measureInd" data-v="' + (sc === 'mental' ? 'mood' : 'bp') + '">' + esc(u('logVitals')) + '</button></div>';
    }
    h += '<div class="box" style="margin-top:1rem"><h3>' + esc(u('summaryTitle')) + '</h3><p class="small muted">' + esc(u('summaryHint')) + '</p><p class="small"><b>' + esc(u('delay')) + ':</b> ' + esc(T(ENVS[state.env].delay)) + '</p><textarea class="summary" id="sum" readonly>' + esc(summaryText()) + '</textarea><div class="row" style="margin-top:.5rem"><button class="btn" data-action="copy">' + esc(u('copy')) + '</button></div></div>';
    h += '<p class="small muted" style="margin-top:.8rem">' + esc(u('emDisclaimer')) + '</p>';
    $('main').innerHTML = h;
  }

  /* ---------- render: ciencia ---------- */
  function renderScience() {
    var h = '<div class="box"><h2>' + esc(u('hazTitle')) + '</h2><div class="scroll"><table><tr><th>' + esc(u('hazards')) + '</th><th>' + esc(u('risk')) + '</th><th>' + esc(u('indicators')) + '</th></tr>';
    Object.keys(HAZARDS).forEach(function (hz) {
      var inds = IND.filter(function (i) { return i.hazards.indexOf(hz) >= 0; }).map(function (i) { return T(i.name); }).join(', ');
      h += '<tr><td><b>' + esc(T(HAZARDS[hz])) + '</b></td><td>' + esc(T(HAZARD_INFO[hz])) + '</td><td>' + esc(inds) + '</td></tr>';
    });
    h += '</table></div></div>';
    h += '<div class="box" style="margin-top:.8rem"><h2>' + esc(u('qTitle')) + '</h2>' + QUESTIONS.map(function (q) {
      return '<p><b>' + esc(T(q.q)) + '</b><br>' + esc(T(q.a)) + ' <button class="btn sm" data-action="tab" data-v="' + q.tab + '">' + esc(u('where')) + ': ' + esc(u('tab_' + q.tab)) + '</button></p>';
    }).join('') + '</div>';
    h += '<div class="box" style="margin-top:.8rem"><h2>' + esc(u('dualTitle')) + '</h2><p>' + esc(u('dualText')) + '</p><button class="btn primary" data-action="earth">' + esc(u('dualBtn')) + '</button></div>';
    h += '<div class="box" style="margin-top:.8rem"><h2>' + esc(u('thrTitle')) + '</h2><p class="small muted">' + esc(u('thrNote')) + '</p><div class="scroll"><table><tr><th>' + esc(u('ind')) + '</th><th>' + esc(u('normalRange')) + '</th><th>' + esc(u('caut')) + '</th><th>' + esc(u('crit')) + '</th><th>' + esc(u('src')) + '</th></tr>';
    IND.forEach(function (ind) {
      ind.fields.forEach(function (f) {
        var tp = thresholdParts(f);
        h += '<tr><td>' + esc(T(ind.name)) + (ind.fields.length > 1 ? ' (' + esc(f.key) + ')' : '') + '</td><td>' + esc(rangeText(f)) + '</td><td>' + esc(tp.caut || '-') + '</td><td>' + esc(tp.crit || '-') + '</td><td>' + srcHtml(ind) + '</td></tr>';
      });
    });
    h += '</table></div></div>';
    h += '<div class="box" style="margin-top:.8rem"><h2>' + esc(u('srcTitle')) + '</h2><ul class="list">' + SOURCES.map(function (s) { return '<li><a href="' + esc(s.u) + '" target="_blank" rel="noopener">' + esc(s.t) + '</a></li>'; }).join('') + '</ul></div>';
    $('main').innerHTML = h;
  }

  /* ---------- render general ---------- */
  function render() {
    refresh();
    renderHeader(); renderTabs(); renderFooter();
    if (state.tab === 'dashboard') renderDashboard();
    else if (state.tab === 'body') renderBody();
    else if (state.tab === 'measure') renderMeasure();
    else if (state.tab === 'routine') renderRoutine();
    else if (state.tab === 'crew') renderCrew();
    else if (state.tab === 'emergency') renderEmergency();
    else renderScience();
  }
  function go(tab) { state.tab = tab; save(); render(); window.scrollTo(0, 0); }

  /* ---------- eventos ---------- */
  function onAction(el) {
    var a = el.getAttribute('data-action'), v = el.getAttribute('data-v');
    switch (a) {
      case 'tab': closeDlg(); go(v); break;
      case 'lang': state.lang = v; save(); render(); break;
      case 'sos': closeDlg(); state.em = { sc: null, node: null }; go('emergency'); break;
      case 'open': openDetail(v); break;
      case 'closeDlg': closeDlg(); break;
      case 'measureInd': closeDlg(); state.sel = v; lastResult = null; go('measure'); break;
      case 'sel': state.sel = v; lastResult = null; save(); renderMeasure(); break;
      case 'region': state.region = v; save(); renderBody(); break;
      case 'mood': $('f_mood').value = v; Array.prototype.forEach.call(document.querySelectorAll('#moods button'), function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-v') === v)); }); break;
      case 'csv': exportCsv(); break;
      case 'reset': if (window.confirm(u('resetConfirm'))) { var lang = state.lang; state = defaults(); state.lang = lang; lastResult = null; save(); render(); } break;
      case 'viewCrew': state.who = v; lastResult = null; go('dashboard'); break;
      case 'crewMeasure': state.who = v; lastResult = null; go('measure'); break;
      case 'delCrew':
        if (state.crew.length > 1 && window.confirm(u('removeConfirm'))) {
          state.crew = state.crew.filter(function (c) { return c.id !== v; });
          state.entries = state.entries.filter(function (e) { return e.who !== v; });
          if (state.who === v) { state.who = state.crew[0].id; }
          lastResult = null; save(); render();
        } break;
      case 'emSc': state.em = { sc: v, node: null }; renderEmergency(); break;
      case 'emAns': state.em.node = v; renderEmergency(); break;
      case 'copy': (function () { var t = $('sum'); t.select(); var done = function () { toast(u('copied')); }; if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(t.value).then(done, function () { document.execCommand('copy'); done(); }); } else { document.execCommand('copy'); done(); } })(); break;
      case 'earth': state.env = 'earth'; save(); go('dashboard'); break;
      default: break;
    }
  }
  document.addEventListener('click', function (ev) {
    var el = ev.target.closest ? ev.target.closest('[data-action]') : null;
    if (el) { onAction(el); }
  });
  document.addEventListener('keydown', function (ev) {
    var t = ev.target;
    if ((ev.key === 'Enter' || ev.key === ' ') && t.getAttribute && t.getAttribute('data-action') === 'region' && t.tagName.toLowerCase() === 'g') { ev.preventDefault(); onAction(t); }
  });
  document.addEventListener('change', function (ev) {
    var t = ev.target;
    if (t.id === 'envSel') { state.env = t.value; save(); render(); }
    else if (t.id === 'whoSel') { state.who = t.value; lastResult = null; save(); render(); }
    else if (t.id === 'img') { handleImage(t.files && t.files[0]); }
    else if (t.id === 'startDate') {
      if (/^\d{4}-\d{2}-\d{2}$/.test(t.value) && t.value <= minStartDate()) { state.missionStart = t.value; save(); render(); }
      else { toast(u('startInvalid')); t.value = state.missionStart; }
    }
    else if (t.getAttribute && t.getAttribute('data-crew')) {
      var id = t.getAttribute('data-crew'), name = t.value.trim();
      state.crew.forEach(function (c) { if (c.id === id && name) { c.name = name; } });
      save(); render();
    }
  });
  document.addEventListener('submit', function (ev) {
    if (ev.target.id === 'mform') { submitMeasure(ev); }
    else if (ev.target.id === 'crewForm') { ev.preventDefault(); addCrew($('newCrew').value.trim()); var n = $('newCrew'); if (n) { n.focus(); } }
  });
  $('dlg').addEventListener('click', function (ev) { if (ev.target === $('dlg')) { closeDlg(); } });
  window.addEventListener('resize', syncTop);

  render();
  var p = pendingToday().length;
  if (entriesOf().length && p > 0) { toast(u('reminder') + ': ' + p + ' ' + u('pendingN')); }

  /* ---------- uso sin conexion ---------- */
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () { /* sin soporte */ }); });
  }
})();
