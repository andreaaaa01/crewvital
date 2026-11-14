/* CrewVital - logica de la aplicacion (dominio publico, CC0). Sin servidor, sin cuentas. */
(function () {
  'use strict';

  var KEY = 'crewvital.v1';
  var TABS = ['dashboard', 'body', 'measure', 'routine', 'emergency', 'science'];

  var UI = {
    tagline: { es: 'Monitoreo de salud para tripulaciones espaciales', en: 'Health monitoring for space crews' },
    env: { es: 'Entorno de misión', en: 'Mission environment' },
    sos: { es: 'EMERGENCIA', en: 'EMERGENCY' },
    day: { es: 'Día de misión', en: 'Mission day' },
    tab_dashboard: { es: 'Panel', en: 'Dashboard' },
    tab_body: { es: 'Cuerpo', en: 'Body' },
    tab_measure: { es: 'Medir', en: 'Measure' },
    tab_routine: { es: 'Rutina y logros', en: 'Routine and rewards' },
    tab_emergency: { es: 'Modo emergencia', en: 'Emergency mode' },
    tab_science: { es: 'Ciencia y fuentes', en: 'Science and sources' },
    noData: { es: 'Sin datos todavía. Registra una medición en la pestaña Medir o carga datos de demostración en Rutina y logros.', en: 'No data yet. Log a measurement in the Measure tab or load demo data in Routine and rewards.' },
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
    day_: { es: 'Día', en: 'Day' },
    clickHint: { es: 'Toca una tarjeta para ver historial, gráfica y acciones.', en: 'Tap a card to see history, chart, and actions.' },
    notMeasured: { es: 'Sin medir', en: 'Not measured' },
    bodyHint: { es: 'Toca una parte del cuerpo para ver su función, los riesgos del espacio y su estado actual.', en: 'Tap a body part to see its function, space risks, and current status.' },
    fn: { es: 'Qué hace', en: 'What it does' },
    risk: { es: 'Riesgo en el espacio', en: 'Risk in space' },
    hazards: { es: 'Peligros asociados', en: 'Related hazards' },
    indicators: { es: 'Indicadores', en: 'Indicators' },
    measureNow: { es: 'Medir ahora', en: 'Measure now' },
    pickInd: { es: 'Elige qué medir', en: 'Choose what to measure' },
    why: { es: 'Por qué se mide', en: 'Why it is measured' },
    spaceEffect: { es: 'Cómo lo afecta el espacio', en: 'How space affects it' },
    howTo: { es: 'Cómo medir, paso a paso', en: 'How to measure, step by step' },
    simulate: { es: 'Simular sensor', en: 'Simulate sensor' },
    attach: { es: 'Adjuntar imagen (foto del equipo o ultrasonido)', en: 'Attach image (photo of device or ultrasound)' },
    attachNote: { es: 'La imagen queda como evidencia en el historial. Este prototipo no la analiza automáticamente.', en: 'The image is kept as evidence in the history. This prototype does not analyze it automatically.' },
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
    demoTools: { es: 'Herramientas de demostración', en: 'Demo tools' },
    nextDay: { es: 'Avanzar un día de misión', en: 'Advance one mission day' },
    loadDemo: { es: 'Cargar 14 días de datos simulados', en: 'Load 14 days of simulated data' },
    exportCsv: { es: 'Descargar historial (CSV)', en: 'Download history (CSV)' },
    reset: { es: 'Borrar todos los datos', en: 'Delete all data' },
    resetConfirm: { es: '¿Borrar todos los datos guardados en este navegador?', en: 'Delete all data saved in this browser?' },
    demoNote: { es: 'Los datos de demostración son simulados. Todo se guarda solo en este navegador; no hay cuentas ni servidor.', en: 'Demo data is simulated. Everything is stored only in this browser; there are no accounts or server.' },
    reminder: { es: 'Recordatorio de rutina', en: 'Routine reminder' },
    emIntro: { es: 'Elige la situación. Los pasos se adaptan al entorno de misión seleccionado.', en: 'Choose the situation. Steps adapt to the selected mission environment.' },
    yes: { es: 'Sí', en: 'Yes' },
    no: { es: 'No', en: 'No' },
    restart: { es: 'Reiniciar protocolo', en: 'Restart protocol' },
    logVitals: { es: 'Registrar signos vitales', en: 'Log vital signs' },
    emDisclaimer: { es: 'Protocolo educativo de demostración. En una misión real se sigue el protocolo médico oficial y las instrucciones del cirujano de vuelo.', en: 'Educational demonstration protocol. On a real mission, follow the official medical protocol and the flight surgeon\'s instructions.' },
    summaryTitle: { es: 'Resumen para enviar', en: 'Summary to send' },
    summaryHint: { es: 'Se arma con las últimas mediciones. Con retraso de comunicación, envía un mensaje completo para no depender de preguntas y respuestas.', en: 'Built from the latest measurements. With communication delay, send a complete message so you do not depend on back-and-forth.' },
    copy: { es: 'Copiar resumen', en: 'Copy summary' },
    copied: { es: 'Resumen copiado', en: 'Summary copied' },
    hazTitle: { es: 'Los 5 peligros del vuelo espacial y los indicadores que los vigilan', en: 'The 5 hazards of spaceflight and the indicators that watch them' },
    qTitle: { es: 'Las 5 preguntas del reto y dónde responde la app', en: 'The 5 challenge questions and where the app answers them' },
    thrTitle: { es: 'Umbrales usados (transparencia)', en: 'Thresholds used (transparency)' },
    thrNote: { es: 'Son valores de referencia generales para adultos con fines de demostración. Deben validarse con un cirujano de vuelo antes de cualquier uso real. La radiación usa el 50% y el 80% del límite de carrera de 600 mSv (NASA-STD-3001).', en: 'These are general adult reference values for demonstration. They must be validated by a flight surgeon before any real use. Radiation uses 50% and 80% of the 600 mSv career limit (NASA-STD-3001).' },
    srcTitle: { es: 'Fuentes', en: 'Sources' },
    dualTitle: { es: 'Impacto dual: espacio y Tierra', en: 'Dual impact: space and Earth' },
    dualText: { es: 'La misma lógica de autodiagnóstico asistido (medir, explicar, alertar, escalar) sirve en comunidades remotas con poco acceso a médicos. Cambia el entorno a "Tierra: comunidad remota" para ver cómo se adapta el contacto y la evacuación.', en: 'The same assisted self-diagnosis logic (measure, explain, alert, escalate) serves remote communities with limited access to doctors. Switch the environment to "Earth: remote community" to see how contact and evacuation adapt.' },
    dualBtn: { es: 'Ver en modo comunidad remota', en: 'View as remote community' },
    notProd: { es: 'Prototipo educativo. No es un dispositivo médico ni sustituye a un profesional de la salud. Datos de demostración simulados. Dominio público (CC0).', en: 'Educational prototype. Not a medical device and does not replace a health professional. Simulated demo data. Public domain (CC0).' },
    ind: { es: 'Indicador', en: 'Indicator' },
    crit: { es: 'Crítico', en: 'Critical' },
    caut: { es: 'Precaución', en: 'Caution' },
    where: { es: 'Dónde', en: 'Where' },
    answer: { es: 'Respuesta', en: 'Answer' }
  };

  var QUESTIONS = [
    { q: { es: '1. ¿Qué mediciones se pueden realizar en el espacio?', en: '1. What measurements can be taken in space?' },
      a: { es: '10 mediciones con equipos compactos: tensiómetro, pulsómetro, termómetro, oxímetro, glucómetro, dosímetro y registros de sueño, ánimo, ejercicio y nutrición.', en: '10 measurements with compact equipment: blood pressure cuff, pulse sensor, thermometer, oximeter, glucometer, dosimeter, plus sleep, mood, exercise, and nutrition logs.' }, tab: 'measure' },
    { q: { es: '2. ¿Por qué es necesario cada examen?', en: '2. Why is each exam necessary?' },
      a: { es: 'Cada medición explica en lenguaje simple por qué importa, pensado para tripulantes que no son médicos.', en: 'Each measurement explains in plain language why it matters, written for crew who are not doctors.' }, tab: 'measure' },
    { q: { es: '3. ¿Cómo afectan los peligros del vuelo espacial a estos indicadores?', en: '3. How do spaceflight hazards affect these indicators?' },
      a: { es: 'La figura humana conecta cada órgano con los peligros del HRP, y cada medición indica cómo la afecta el espacio.', en: 'The body figure connects each organ to the HRP hazards, and each measurement says how space affects it.' }, tab: 'body' },
    { q: { es: '4. ¿Cuándo merece atención un resultado?', en: '4. When does a result deserve attention?' },
      a: { es: 'Semáforo de tres niveles con umbrales visibles, alertas de patrón de 3 días y escalamiento según el entorno.', en: 'Three-level traffic light with visible thresholds, 3-day pattern alerts, and escalation based on the environment.' }, tab: 'dashboard' },
    { q: { es: '5. ¿Qué acciones pueden prevenir una condición crítica?', en: '5. What actions can prevent a critical condition?' },
      a: { es: 'Acciones preventivas por indicador y estado, rutina diaria con logros y protocolos de emergencia paso a paso.', en: 'Preventive actions per indicator and state, a daily routine with rewards, and step-by-step emergency protocols.' }, tab: 'emergency' }
  ];

  /* ---------- estado ---------- */
  function defaults() { return { lang: 'es', env: 'transit', day: 1, entries: [], seq: 0, tab: 'dashboard', sel: 'bp', region: null, em: { sc: null, node: null } }; }
  var state = load();
  var pendingImg = null;
  var lastResult = null;
  var toastTimer = null;

  function load() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY));
      if (s && s.entries) { return Object.assign(defaults(), s, { em: { sc: null, node: null } }); }
    } catch (e) { /* sin almacenamiento */ }
    return defaults();
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignorar */ } }

  /* ---------- utilidades ---------- */
  function T(o) { if (o == null) return ''; if (typeof o === 'string') return o; return o[state.lang] || o.es; }
  function u(k) { return T(UI[k]); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function $(id) { return document.getElementById(id); }
  function byId(id) { for (var i = 0; i < IND.length; i++) { if (IND[i].id === id) return IND[i]; } return null; }
  function dec(step) { var s = String(step); return s.indexOf('.') >= 0 ? s.split('.')[1].length : 0; }
  function fmt(f, v) { return Number(v).toFixed(dec(f.step)); }
  function roundTo(f, v) { v = Math.round(v / f.step) * f.step; return Number(v.toFixed(dec(f.step))); }
  function fill(txt) {
    var env = ENVS[state.env], S = T(env.escalate);
    if (state.lang === 'es') { var aS = /^el /.test(S) ? 'al ' + S.slice(3) : 'a ' + S; txt = txt.replace(/a \{S\}/g, aS); }
    return txt.replace(/\{S\}/g, S).replace(/\{NOTE\}/g, T(env.note));
  }
  function toast(msg) {
    var t = $('toast'); t.textContent = msg; t.className = 'show';
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.className = ''; }, 4200);
  }

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
  function badge(s) {
    if (s < 0) return '<span class="badge bn">' + esc(u('notMeasured')) + '</span>';
    return '<span class="badge b' + s + '">' + esc(STATES.label[state.lang][s]) + '</span>';
  }

  /* ---------- datos ---------- */
  function sortEntries() { state.entries.sort(function (a, b) { return a.day - b.day || a.seq - b.seq; }); }
  function latest(id) {
    for (var i = state.entries.length - 1; i >= 0; i--) { if (state.entries[i].ind === id) return state.entries[i]; }
    return null;
  }
  function hasEntry(id, day) {
    for (var i = 0; i < state.entries.length; i++) { if (state.entries[i].ind === id && state.entries[i].day === day) return true; }
    return false;
  }
  function addEntry(id, values, img) {
    var ind = byId(id);
    state.seq += 1;
    var e = { day: state.day, seq: state.seq, ind: id, values: values, state: entryState(ind, values) };
    if (img) e.img = img;
    state.entries.push(e); sortEntries(); save();
    return e;
  }
  function dailySeries(id, key) {
    var map = {};
    state.entries.forEach(function (e) { if (e.ind === id) map[e.day] = e.values[key]; });
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
  function overall() {
    var worst = -1;
    IND.forEach(function (i) { var l = latest(i.id); if (l) worst = Math.max(worst, l.state); });
    return worst;
  }
  function dayDone(d) { var n = 0; IND.forEach(function (i) { if (hasEntry(i.id, d)) n++; }); return n; }
  function pendingToday() { return IND.filter(function (i) { return !hasEntry(i.id, state.day); }); }
  function streakInfo() {
    var maxDay = state.day, cur = 0, best = 0, run = 0, completeDays = 0, d;
    for (d = 1; d <= maxDay; d++) {
      if (dayDone(d) === IND.length) { run++; completeDays++; best = Math.max(best, run); } else { run = 0; }
    }
    d = state.day; if (dayDone(d) < IND.length) d--;
    while (d >= 1 && dayDone(d) === IND.length) { cur++; d--; }
    return { cur: cur, best: best, complete: completeDays };
  }
  function trendAlerts() {
    var out = [];
    IND.forEach(function (ind) {
      var f = ind.fields[0];
      var ser = dailySeries(ind.id, ind.primary).slice(-3);
      if (ser.length === 3 && ser.every(function (p) { return classify(f, p.v) >= 1; })) { out.push(ind); }
    });
    return out;
  }

  /* ---------- simulacion ---------- */
  function gauss() { var a = 0, b = 0; while (!a) a = Math.random(); while (!b) b = Math.random(); return Math.sqrt(-2 * Math.log(a)) * Math.cos(2 * Math.PI * b); }
  function simValue(ind, f) {
    if (ind.id === 'radiation') { var l = latest('radiation'); var base = l ? l.values.radiation : 150; return roundTo(f, base + 0.6 + Math.random() * 0.8); }
    var m = f.sim[0], sd = f.sim[1];
    var v = m + gauss() * sd;
    if (Math.random() < 0.15) { v = m + (Math.random() < 0.5 ? -1 : 1) * sd * 3.5; }
    return roundTo(f, Math.min(f.max, Math.max(f.min, v)));
  }
  function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function loadDemo() {
    state.entries = []; state.seq = 0; state.env = 'transit';
    var rnd = mulberry(7);
    function n(a) { return (rnd() - 0.5) * 2 * a; }
    function r1(x) { return Math.round(x * 10) / 10; }
    for (var d = 1; d <= 14; d++) {
      state.day = d;
      var v = {
        bp: { sys: Math.round(117 + d * 1.35 + n(3)), dia: Math.round(75 + d * 0.75 + n(2)) },
        hr: { hr: Math.round(63 + d * 1.0 + n(3)) },
        temp: { temp: r1(36.6 + n(0.25)) },
        spo2: { spo2: d === 13 ? 94 : Math.round(98 + n(1)) },
        glucose: { glucose: Math.round(88 + d * 0.8 + n(5)) },
        sleep: { sleep: r1(7.9 - d * 0.14 + n(0.3)) },
        mood: { mood: Math.max(3, Math.min(5, Math.round(4.7 - d * 0.11 + n(0.4)))) },
        radiation: { radiation: r1(150 + d * 0.9) },
        exercise: { exercise: Math.max(0, Math.round((82 - d * 1.8 + n(8)) / 5) * 5) },
        nutrition: { nutrition: Math.max(0, Math.round((95 - d * 1.5 + n(4)) / 5) * 5) }
      };
      IND.forEach(function (ind) { addEntry(ind.id, v[ind.id]); });
    }
    state.day = 15; save();
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
    $('top').innerHTML =
      '<div class="brand"><b>CrewVital</b><span>' + esc(u('tagline')) + '</span></div>' +
      '<div class="dayinfo">' + esc(u('day')) + ' <b>' + state.day + '</b></div>' +
      '<label class="ctl">' + esc(u('env')) + '<select id="envSel" aria-label="' + esc(u('env')) + '">' + envOpts + '</select></label>' +
      '<div class="lang" role="group" aria-label="Idioma / Language"><button data-action="lang" data-v="es" aria-pressed="' + (state.lang === 'es') + '">ES</button><button data-action="lang" data-v="en" aria-pressed="' + (state.lang === 'en') + '">EN</button></div>' +
      '<button class="sos" data-action="sos">' + esc(u('sos')) + '</button>';
    document.documentElement.lang = state.lang;
  }
  function renderTabs() {
    $('tabs').innerHTML = TABS.map(function (t) {
      return '<button role="tab" data-action="tab" data-v="' + t + '" aria-selected="' + (state.tab === t) + '">' + esc(u('tab_' + t)) + '</button>';
    }).join('');
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
    var html = '<div class="banner ' + (w < 0 ? '' : 's' + w) + '">' + (w < 0 ? '' : badge(w)) + '<b>' + esc(msg) + '</b></div>';
    var alerts = trendAlerts();
    if (alerts.length) {
      html += '<h3>' + esc(u('trendAlerts')) + '</h3>' + alerts.map(function (i) { return '<div class="alert"><b>' + esc(T(i.name)) + '</b> ' + esc(u('trendText')) + '</div>'; }).join('');
    }
    html += '<div class="grid g-2" style="margin-bottom:.8rem">' + envContext() + '</div>';
    html += '<p class="small muted">' + esc(u('clickHint')) + '</p><div class="grid g-cards">';
    IND.forEach(function (ind) {
      var l = latest(ind.id), s = l ? l.state : -1;
      html += '<button class="card' + (s >= 0 ? ' s' + s : '') + '" data-action="open" data-v="' + ind.id + '">' +
        '<div class="card-h"><span class="name">' + esc(T(ind.name)) + '</span>' + badge(s) + '</div>' +
        '<div class="val">' + (l ? esc(valueText(l)) : '-') + '</div>' + (l ? chart(ind, ind.fields[0], false) : '') +
        '<div class="meta">' + (l ? esc(u('day_')) + ' ' + l.day : '') + '</div></button>';
    });
    $('main').innerHTML = html + '</div>';
  }
  function openDetail(id) {
    var ind = byId(id), l = latest(id), s = l ? l.state : -1;
    var h = '<h2>' + esc(T(ind.name)) + ' ' + badge(s) + '</h2>';
    if (l) { h += '<p class="stat">' + esc(valueText(l)) + '</p>'; }
    ind.fields.forEach(function (f) { h += '<p class="small muted">' + esc(T(f.label)) + '</p>' + chart(ind, f, true); });
    h += '<p class="small muted">' + esc(u('normalRange')) + ': ' + ind.fields.map(function (f) { return rangeText(f); }).join(' | ') + '</p>';
    if (l) {
      h += '<h3>' + esc(u('whatToDo')) + '</h3>' + actionsHtml(ind, s);
    }
    h += '<h3>' + esc(u('why')) + '</h3><p>' + esc(T(ind.why)) + '</p><h3>' + esc(u('spaceEffect')) + '</h3><p>' + esc(T(ind.space)) + '</p>';
    var rows = state.entries.filter(function (e) { return e.ind === id; }).slice(-8).reverse();
    if (rows.length) {
      h += '<h3>' + esc(u('history')) + '</h3><div class="scroll"><table><tr><th>' + esc(u('day_')) + '</th><th>' + esc(u('value')) + '</th><th>' + esc(u('status')) + '</th></tr>' +
        rows.map(function (e) { return '<tr><td>' + e.day + '</td><td>' + esc(valueText(e)) + (e.img ? '<br><img class="thumb" alt="" src="' + e.img + '">' : '') + '</td><td>' + badge(e.state) + '</td></tr>'; }).join('') + '</table></div>';
    }
    h += '<div class="row" style="margin-top:1rem"><button class="btn primary" data-action="measureInd" data-v="' + id + '">' + esc(u('measureNow')) + '</button><button class="btn" data-action="closeDlg">' + esc(u('close')) + '</button></div>';
    var dlg = $('dlg'); dlg.innerHTML = h;
    if (dlg.showModal) { dlg.showModal(); } else { dlg.setAttribute('open', ''); }
  }
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
    var list = T(ind.actions[s === 1 ? 'caution' : 'critical']);
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
            '<button class="btn sm" data-action="open" data-v="' + id + '">' + esc(u('indicators')) + '</button><button class="btn sm primary" data-action="measureInd" data-v="' + id + '">' + esc(u('measureNow')) + '</button></div>';
        }).join('') + '</div>';
    }
    $('main').innerHTML = '<div class="fig-wrap"><div>' + bodySvg() + '</div><div>' + panel + '</div></div>';
    Array.prototype.forEach.call(document.querySelectorAll('.hot'), function (g) {
      g.addEventListener('click', function (ev) { ev.stopPropagation(); onAction(g); });
    });
  }

  /* ---------- render: medir ---------- */
  function renderMeasure() {
    var ind = byId(state.sel) || IND[0];
    var h = '<h2>' + esc(u('pickInd')) + '</h2><div class="pick">' + IND.map(function (i) {
      return '<button data-action="sel" data-v="' + i.id + '" aria-pressed="' + (i.id === ind.id) + '" class="' + (hasEntry(i.id, state.day) ? 'done' : '') + '">' + esc(T(i.name)) + '</button>';
    }).join('') + '</div><div class="grid g-2"><div class="box">';
    h += '<h3>' + esc(u('howTo')) + '</h3><ol class="steps">' + T(ind.steps).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ol>';
    h += '<h3>' + esc(u('why')) + '</h3><p>' + esc(T(ind.why)) + '</p>';
    h += '<h3>' + esc(u('spaceEffect')) + '</h3><p>' + esc(T(ind.space)) + '</p>';
    h += '<div class="chips">' + ind.hazards.map(function (x) { return '<span class="chip on">' + esc(T(HAZARDS[x])) + '</span>'; }).join('') + '</div></div>';
    h += '<form class="box" id="mform" novalidate><h3>' + esc(T(ind.name)) + '</h3>';
    ind.fields.forEach(function (f) {
      if (ind.id === 'mood') {
        h += '<p class="small">' + esc(T(f.label)) + '</p><div class="moods" id="moods">' + [1, 2, 3, 4, 5].map(function (n) { return '<button type="button" data-action="mood" data-v="' + n + '" aria-pressed="false">' + n + '</button>'; }).join('') + '</div><input type="hidden" name="' + f.key + '" id="f_' + f.key + '">';
      } else {
        h += '<label class="f">' + esc(T(f.label)) + ' (' + esc(f.unit) + ')<input type="number" inputmode="decimal" name="' + f.key + '" id="f_' + f.key + '" min="' + f.min + '" max="' + f.max + '" step="' + f.step + '"></label>';
      }
    });
    h += '<div class="row" style="margin-bottom:.6rem"><button type="button" class="btn" data-action="simulate">' + esc(u('simulate')) + '</button></div>';
    h += '<label class="f">' + esc(u('attach')) + '<input type="file" id="img" accept="image/*" capture="environment"></label><div id="imgPrev"></div><p class="small muted">' + esc(u('attachNote')) + '</p>';
    h += '<p id="merr" class="small" style="color:var(--bad)" role="alert"></p><button type="submit" class="btn primary">' + esc(u('save')) + '</button></form></div>';
    if (lastResult && lastResult.ind === ind.id) { h += resultHtml(lastResult); }
    $('main').innerHTML = h;
  }
  function resultHtml(e) {
    var ind = byId(e.ind);
    var h = '<div class="result s' + e.state + '" id="result"><h2>' + esc(u('result')) + ': ' + esc(T(ind.name)) + ' ' + badge(e.state) + '</h2><p class="stat">' + esc(valueText(e)) + '</p>';
    h += '<h3>' + esc(u('whatToDo')) + '</h3>' + actionsHtml(ind, e.state);
    h += '<p class="small muted">+10 ' + esc(u('points')) + '</p><div class="row">';
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
    var e = addEntry(ind.id, values, pendingImg);
    pendingImg = null; lastResult = e;
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
  function renderRoutine() {
    var info = streakInfo(), pts = state.entries.length * 10 + info.complete * 30;
    var done = dayDone(state.day), pend = pendingToday();
    var ids = {};
    state.entries.forEach(function (e) { if (e.ind === 'radiation') ids[e.day] = 1; });
    var radDays = Object.keys(ids).length;
    var medals = [
      { k: 'm_first', on: state.entries.length >= 1 }, { k: 'm_3', on: info.best >= 3 }, { k: 'm_7', on: info.best >= 7 },
      { k: 'm_rad', on: radDays >= 7 }, { k: 'm_50', on: state.entries.length >= 50 }
    ];
    var h = '<div class="grid g-2"><div class="box"><h2>' + esc(u('routineTitle')) + '</h2>' +
      '<p>' + esc(u('day')) + ' <b>' + state.day + '</b>: ' + done + '/' + IND.length + ' - ' + pend.length + ' ' + esc(u('pendingN')) + '</p>' +
      '<div class="bar" aria-hidden="true"><i style="width:' + Math.round(done / IND.length * 100) + '%"></i></div>';
    [['am', 'morning'], ['pm', 'evening']].forEach(function (g) {
      h += '<h3 style="margin-top:.8rem">' + esc(u(g[1])) + '</h3>';
      IND.filter(function (i) { return i.when === g[0]; }).forEach(function (i) {
        var ok = hasEntry(i.id, state.day);
        h += '<div class="row" style="margin-bottom:.35rem"><span style="min-width:12rem">' + esc(T(i.name)) + '</span>' +
          (ok ? '<span class="badge b0">' + esc(u('done')) + '</span>' : '<span class="badge bn">' + esc(u('pending')) + '</span><button class="btn sm primary" data-action="measureInd" data-v="' + i.id + '">' + esc(u('measure')) + '</button>') + '</div>';
      });
    });
    h += '</div><div class="box"><div class="stats"><div><div class="stat">' + pts + '</div><div class="small muted">' + esc(u('pts')) + '</div></div><div><div class="stat">' + (Math.floor(pts / 200) + 1) + '</div><div class="small muted">' + esc(u('level')) + '</div></div><div><div class="stat">' + info.cur + '</div><div class="small muted">' + esc(u('streak')) + '</div></div></div>' +
      '<h3 style="margin-top:1rem">' + esc(u('medals')) + '</h3><div class="badges">' + medals.map(function (m) { return '<span class="medal' + (m.on ? ' on' : '') + '">' + esc(u(m.k)) + '</span>'; }).join('') + '</div></div></div>';
    h += '<div class="box" style="margin-top:.8rem"><h3>' + esc(u('demoTools')) + '</h3><div class="row"><button class="btn" data-action="nextDay">' + esc(u('nextDay')) + '</button><button class="btn primary" data-action="demo">' + esc(u('loadDemo')) + '</button><button class="btn" data-action="csv">' + esc(u('exportCsv')) + '</button><button class="btn danger" data-action="reset">' + esc(u('reset')) + '</button></div><p class="small muted" style="margin-top:.6rem">' + esc(u('demoNote')) + '</p></div>';
    $('main').innerHTML = h;
  }
  function exportCsv() {
    var rows = ['day,indicator,field,value,unit,status'];
    state.entries.forEach(function (e) {
      var ind = byId(e.ind);
      ind.fields.forEach(function (f) { rows.push([e.day, e.ind, f.key, e.values[f.key], f.unit, ['normal', 'caution', 'critical'][e.state]].join(',')); });
    });
    var blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'crewvital_historial.csv';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }

  /* ---------- render: emergencia ---------- */
  function summaryText() {
    var S = fill('{S}'), lines = [];
    lines.push((state.lang === 'es' ? 'MENSAJE PARA ' : 'MESSAGE FOR ') + S.toUpperCase());
    lines.push((state.lang === 'es' ? 'Entorno: ' : 'Environment: ') + T(ENVS[state.env].name) + ' | ' + u('day') + ' ' + state.day);
    lines.push(state.lang === 'es' ? 'Situación: (describir síntomas y hora de inicio)' : 'Situation: (describe symptoms and start time)');
    lines.push(state.lang === 'es' ? 'Últimos signos vitales:' : 'Latest vital signs:');
    IND.forEach(function (ind) {
      var l = latest(ind.id);
      if (l) { lines.push('- ' + T(ind.name) + ': ' + valueText(l) + ' [' + STATES.label[state.lang][l.state] + '] (' + u('day_') + ' ' + l.day + ')'); }
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
    if (sc) {
      var def = EMERGENCY[sc];
      if (sc === 'chest') {
        var node = def.nodes[state.em.node || def.start];
        if (node.q) {
          h += '<div class="em-box"><div class="em-q">' + esc(T(node.q)) + '</div><div class="row"><button class="btn primary" data-action="emAns" data-v="' + node.yes + '">' + esc(u('yes')) + '</button><button class="btn" data-action="emAns" data-v="' + node.no + '">' + esc(u('no')) + '</button></div></div>';
        } else {
          h += '<div class="em-box' + (node.level === 1 ? ' l1' : '') + '"><h3>' + esc(T(node.title)) + '</h3><ol class="steps">' + T(node.steps).map(function (x) { return '<li>' + esc(fill(x)) + '</li>'; }).join('') + '</ol></div>';
        }
        h += '<div class="row" style="margin-top:.6rem"><button class="btn" data-action="emSc" data-v="chest">' + esc(u('restart')) + '</button></div>';
      } else {
        h += '<div class="em-box' + (def.level === 1 ? ' l1' : '') + '"><h3>' + esc(T(def.title)) + '</h3><ol class="steps">' + T(def.steps).map(function (x) { return '<li>' + esc(fill(x)) + '</li>'; }).join('') + '</ol></div>';
      }
      h += '<div class="row" style="margin-top:.6rem"><button class="btn primary" data-action="measureInd" data-v="bp">' + esc(u('logVitals')) + '</button></div>';
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
    h += '<div class="box" style="margin-top:.8rem"><h2>' + esc(u('thrTitle')) + '</h2><p class="small muted">' + esc(u('thrNote')) + '</p><div class="scroll"><table><tr><th>' + esc(u('ind')) + '</th><th>' + esc(u('normalRange')) + '</th><th>' + esc(u('caut')) + '</th><th>' + esc(u('crit')) + '</th></tr>';
    IND.forEach(function (ind) {
      ind.fields.forEach(function (f) {
        var tp = thresholdParts(f);
        h += '<tr><td>' + esc(T(ind.name)) + (ind.fields.length > 1 ? ' (' + esc(f.key) + ')' : '') + '</td><td>' + esc(rangeText(f)) + '</td><td>' + esc(tp.caut || '-') + '</td><td>' + esc(tp.crit || '-') + '</td></tr>';
      });
    });    h += '</table></div></div>';
    h += '<div class="box" style="margin-top:.8rem"><h2>' + esc(u('srcTitle')) + '</h2><ul class="list">' + SOURCES.map(function (s) { return '<li><a href="' + s.u + '" target="_blank" rel="noopener">' + esc(s.t) + '</a></li>'; }).join('') + '</ul></div>';
    $('main').innerHTML = h;
  }

  /* ---------- render general ---------- */
  function render() {
    renderHeader(); renderTabs(); renderFooter();
    if (state.tab === 'dashboard') renderDashboard();
    else if (state.tab === 'body') renderBody();
    else if (state.tab === 'measure') renderMeasure();
    else if (state.tab === 'routine') renderRoutine();
    else if (state.tab === 'emergency') renderEmergency();
    else renderScience();
  }
  function go(tab) { state.tab = tab; save(); render(); window.scrollTo(0, 0); }

  /* ---------- eventos ---------- */
  function onAction(el) {
    var a = el.getAttribute('data-action'), v = el.getAttribute('data-v');
    switch (a) {
      case 'tab': $('dlg').close && $('dlg').open && $('dlg').close(); go(v); break;
      case 'lang': state.lang = v; save(); render(); break;
      case 'sos': if ($('dlg').open) { $('dlg').close(); } state.em = { sc: 'chest', node: null }; go('emergency'); break;
      case 'open': openDetail(v); break;
      case 'closeDlg': $('dlg').close(); break;
      case 'measureInd': if ($('dlg').open) { $('dlg').close(); } state.sel = v; lastResult = null; go('measure'); break;
      case 'sel': state.sel = v; lastResult = null; save(); renderMeasure(); break;
      case 'region': state.region = v; save(); renderBody(); break;
      case 'mood': document.getElementById('f_mood').value = v; Array.prototype.forEach.call(document.querySelectorAll('#moods button'), function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-v') === v)); }); break;
      case 'simulate':
        byId(state.sel).fields.forEach(function (f) {
          var val = simValue(byId(state.sel), f); $('f_' + f.key).value = val;
          if (state.sel === 'mood') { Array.prototype.forEach.call(document.querySelectorAll('#moods button'), function (b) { b.setAttribute('aria-pressed', String(Number(b.getAttribute('data-v')) === val)); }); }
        }); break;
      case 'nextDay': state.day += 1; save(); render(); toast(u('day') + ' ' + state.day); break;
      case 'demo': loadDemo(); lastResult = null; save(); render(); break;
      case 'csv': exportCsv(); break;
      case 'reset': if (window.confirm(u('resetConfirm'))) { var lang = state.lang; state = defaults(); state.lang = lang; lastResult = null; save(); render(); } break;
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
    if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.getAttribute && ev.target.getAttribute('data-action') === 'region') { ev.preventDefault(); onAction(ev.target); }
  });
  document.addEventListener('change', function (ev) {
    if (ev.target.id === 'envSel') { state.env = ev.target.value; save(); render(); }
    if (ev.target.id === 'img') { handleImage(ev.target.files && ev.target.files[0]); }
  });
  document.addEventListener('submit', function (ev) { if (ev.target.id === 'mform') { submitMeasure(ev); } });
  $('dlg').addEventListener('click', function (ev) { if (ev.target === $('dlg')) { $('dlg').close(); } });

  render();
  var p = pendingToday().length;
  if (state.entries.length && p > 0) { toast(u('reminder') + ': ' + p + ' ' + u('pendingN')); }
})();
