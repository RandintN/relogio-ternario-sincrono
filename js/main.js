// Copyright (c) 2025 Robson Cassiano
// Licensed under the MIT License. See the LICENSE file in the project root for details.

// --- LÓGICA DO RELÓGIO ---

// Seletores de elementos do DOM para fácil acesso
const standardTimeEl = document.getElementById('standard-time');
const ternaryTimeEl = document.getElementById('ternary-time');
const tracks = {
  hours: { marker: document.getElementById('hours-marker'), track: document.getElementById('hours-track'), connector: document.getElementById('hours-connector'), valueSpan: document.querySelector('#hours-marker span') },
  minutes: { marker: document.getElementById('minutes-marker'), track: document.getElementById('minutes-track'), connector: document.getElementById('minutes-connector'), valueSpan: document.querySelector('#minutes-marker span') },
  seconds: { marker: document.getElementById('seconds-marker'), track: document.getElementById('seconds-track'), connector: document.getElementById('seconds-connector'), valueSpan: document.querySelector('#seconds-marker span') },
  ms: { marker: document.getElementById('ms-marker'), track: document.getElementById('ms-track'), connector: document.getElementById('ms-connector') }
};
const explanationToggle = document.getElementById('toggle-explanation');
const explanationDiv = document.getElementById('full-explanation');
const langToggleBtn = document.getElementById('lang-toggle');

// --- I18N (Português/Inglês) ---
const translations = {
  pt: {
    title: 'Relógio Ternário Síncrono',
    subtitle: 'Uma representação visual do tempo em ternário balanceado',
    how_to_html: '<strong>Como ler:</strong> a metade ascendente da curva (esquerda) mostra o tempo <strong>decorrido</strong> (valores +). A metade descendente (direita) mostra o tempo <strong>restante</strong> (valores -). O pico é o ponto médio, e o vale é o início/fim do ciclo.',
    standard_heading: 'Horário Padrão',
    ternary_heading: 'Valores Ternários',
    label_hours: 'Horas',
    label_minutes: 'Minutos',
    label_seconds: 'Segundos',
    label_ms: 'Miliseg.',
    noon: 'Meio-dia',
    btn_explain_show: 'Entenda o Conceito',
    btn_explain_hide: 'Ocultar Explicação',
    full_explanation_html: '<h3>A Filosofia do Relógio Síncrono</h3>\
<p>Um dia não é apenas uma contagem linear de 0 a 24. Ele possui um fluxo natural, um ritmo: o tempo "cresce" da meia-noite até seu pico ao meio-dia, e então "diminui", retornando ao ponto inicial. É como a maré que sobe e desce, ou o ato de inspirar e expirar.</p>\
<p>Este relógio visualiza esse ciclo usando o <strong>sistema ternário balanceado</strong>.</p>\
<ul>\
  <li><strong>Valores Positivos (+):</strong> Representam o tempo que <strong>já passou</strong> desde o início do ciclo (meia-noite, minuto :00). É a fase de "inspiração" do tempo, e a curva sobe.</li>\
  <li><strong>Valores Negativos (-):</strong> Representam o tempo que <strong>falta</strong> para o ciclo terminar. É a fase de "expiração", e a curva desce.</li>\
  <li><strong>Zero (0):</strong> É o ponto de transição, o início e o fim de cada ciclo.</li>\
</ul>\
<p><strong>Exemplo Prático:</strong> 21:00 (9 da noite) é interpretado como "faltam 3 horas para a meia-noite", sendo representado como <strong>-3h</strong>. Da mesma forma, 45 segundos é visto como "faltam 15 segundos para o próximo minuto", tornando-se <strong>-15s</strong>. Em contrapartida, 10:00 da manhã é simplesmente <strong>+10h</strong>.</p>\
<p>O nome <strong>Síncrono</strong> (Seno + Cronômetro) vem das curvas senoidais, que são a representação matemática perfeita desse fluxo e refluxo, tornando a experiência de ver o tempo passar mais intuitiva e orgânica.</p>',
    switch_to_en_aria: 'Mudar idioma para inglês',
    switch_to_pt_aria: 'Mudar idioma para português',
    switch_button_label_current: 'EN'
  },
  en: {
    title: 'Synchronous Ternary Clock',
    subtitle: 'A visual representation of time in balanced ternary',
    how_to_html: '<strong>How to read:</strong> the rising half of the curve (left) shows the time <strong>elapsed</strong> (positive values). The falling half (right) shows the time <strong>remaining</strong> (negative values). The peak is the midpoint, and the trough is the start/end of the cycle.',
    standard_heading: 'Standard Time',
    ternary_heading: 'Ternary Values',
    label_hours: 'Hours',
    label_minutes: 'Minutes',
    label_seconds: 'Seconds',
    label_ms: 'Millisec.',
    noon: 'Noon',
    btn_explain_show: 'Understand the Concept',
    btn_explain_hide: 'Hide Explanation',
    full_explanation_html: '<h3>The Philosophy of the Synchronous Clock</h3>\
<p>A day is not just a linear count from 0 to 24. It has a natural flow, a rhythm: time "grows" from midnight to its peak at noon, then "shrinks", returning to the starting point. It is like the tide rising and falling, or the act of inhaling and exhaling.</p>\
<p>This clock visualizes that cycle using the <strong>balanced ternary system</strong>.</p>\
<ul>\
  <li><strong>Positive values (+):</strong> Represent the time that has <strong>already passed</strong> since the start of the cycle (midnight, minute :00). It is the time’s "inhalation" phase, and the curve rises.</li>\
  <li><strong>Negative values (-):</strong> Represent the time <strong>remaining</strong> until the cycle ends. It is the "exhalation" phase, and the curve falls.</li>\
  <li><strong>Zero (0):</strong> The transition point, the start and end of each cycle.</li>\
</ul>\
<p><strong>Practical example:</strong> 21:00 (9 pm) is interpreted as "3 hours left until midnight", represented as <strong>-3h</strong>. Likewise, 45 seconds is seen as "15 seconds left until the next minute", becoming <strong>-15s</strong>. Conversely, 10:00 am is simply <strong>+10h</strong>.</p>\
<p>The name <strong>Synchronous</strong> (Sine + Chronometer) comes from the sine curves, which are the perfect mathematical representation of this ebb and flow, making the experience of seeing time pass more intuitive and organic.</p>',
    switch_to_en_aria: 'Switch language to English',
    switch_button_label_current: 'PT'
  }
};

function getInitialLang() {
  const saved = localStorage.getItem('lang');
  if (saved) return saved;
  const htmlLang = (document.documentElement.lang || '').toLowerCase();
  if (htmlLang.startsWith('pt')) return 'pt';
  if (htmlLang.startsWith('en')) return 'en';
  return 'pt';
}

let currentLang = getInitialLang();

function t(key) {
  return translations[currentLang][key] || key;
}

function applyTranslations() {
  // Atualiza atributo lang do HTML
  document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';

  // Títulos e cabeçalhos
  const titleEl = document.getElementById('title');
  if (titleEl) titleEl.textContent = t('title');
  document.title = t('title');
  const subtitleEl = document.getElementById('subtitle');
  if (subtitleEl) subtitleEl.textContent = t('subtitle');

  // Explicação curta
  const explanationShort = document.getElementById('explanation');
  if (explanationShort) explanationShort.innerHTML = t('how_to_html');

  // Cabeçalhos do visor
  const standardHeading = document.getElementById('standard-heading');
  if (standardHeading) standardHeading.textContent = t('standard_heading');
  const ternaryHeading = document.getElementById('ternary-heading');
  if (ternaryHeading) ternaryHeading.textContent = t('ternary_heading');

  // Rótulos das trilhas
  const hLabel = document.getElementById('hours-label');
  if (hLabel) hLabel.textContent = t('label_hours');
  const mLabel = document.getElementById('minutes-label');
  if (mLabel) mLabel.textContent = t('label_minutes');
  const sLabel = document.getElementById('seconds-label');
  if (sLabel) sLabel.textContent = t('label_seconds');
  const msLabel = document.getElementById('ms-label');
  if (msLabel) msLabel.textContent = t('label_ms');

  const noonEl = document.getElementById('mid-noon');
  if (noonEl) noonEl.textContent = t('noon');

  // Conteúdo de explicação completo (HTML)
  if (explanationDiv) explanationDiv.innerHTML = t('full_explanation_html');

  // Botão de explicação (depende do estado visível)
  const isVisible = explanationDiv && explanationDiv.classList.contains('visible');
  if (explanationToggle) explanationToggle.textContent = isVisible ? t('btn_explain_hide') : t('btn_explain_show');

  // Botão de idioma: mostra o código do outro idioma (ação)
  if (langToggleBtn) {
    langToggleBtn.textContent = translations[currentLang].switch_button_label_current;
    const aria = currentLang === 'pt' ? translations.pt.switch_to_en_aria : translations.en.switch_to_pt_aria;
    langToggleBtn.setAttribute('aria-label', aria);
  }
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', currentLang);
  applyTranslations();
}

if (langToggleBtn) {
  langToggleBtn.addEventListener('click', () => {
    setLang(currentLang === 'pt' ? 'en' : 'pt');
  });
}

/**
 * Gera uma curva SVG (cosseno negativo) para se ajustar a um container.
 * @param {string} containerId - O ID do elemento div que conterá o SVG.
 * @param {number} amplitude - A altura da onda.
 */
function createWaveSVG(containerId, amplitude) {
  const container = document.getElementById(containerId);
  if (!container) return; // Adiciona verificação
  const width = container.clientWidth;
  const height = amplitude;
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

  const path = document.createElementNS(svgNS, "path");
  // Curva de Bézier cúbica para simular uma onda que começa em baixo, sobe e desce
  const pathD = `M 0 ${height/2} C ${width * 0.25} 0, ${width * 0.75} 0, ${width} ${height/2}`;
  path.setAttribute('d', pathD);
  svg.appendChild(path);
  container.innerHTML = ''; // Limpa o container antes de adicionar o novo SVG
  container.appendChild(svg);
}

// Gera as ondas SVG com amplitudes diferentes para distinção visual
function setupWaves() {
  createWaveSVG('hours-curve', 60);
  createWaveSVG('minutes-curve', 50);
  createWaveSVG('seconds-curve', 40);
  createWaveSVG('ms-curve', 30);
}

// --- Funções de Conversão para Ternário Balanceado ---

function getTernaryHours(h) {
  if (h === 0) return 0;
  return h <= 12 ? h : h - 24; // De 1 a 12 é positivo, de 13 a 23 é negativo (-11 a -1)
}

function getTernarySixty(val) {
  if (val === 0) return 0;
  return val <= 30 ? val : val - 60; // De 1 a 30 é positivo, de 31 a 59 é negativo (-29 a -1)
}

function getTernaryMillis(ms) {
  if (ms === 0) return 0;
  return ms <= 500 ? ms : ms - 1000; // De 1 a 500 é positivo, de 501 a 999 é negativo (-499 a -1)
}

// Formata o número para exibir o sinal '+' para valores positivos
function formatTernaryValue(val) {
  return val > 0 ? `+${val}` : val;
}

/**
 * Função principal que é chamada a cada frame para atualizar o relógio.
 */
function updateClock() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();
  const ms = now.getMilliseconds();

  // --- Lógica de Cálculo dos valores ternários ---
  const ternaryH = getTernaryHours(h);
  const ternaryM = getTernarySixty(m);
  const ternaryS = getTernarySixty(s);

  // --- Atualização dos Visores Digitais ---
  standardTimeEl.textContent =
    `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;

  ternaryTimeEl.innerHTML =
    `<span class="unit-label">H:</span><span class="ternary-value">${formatTernaryValue(ternaryH)}</span> <span class="standard-equivalent">(${String(h).padStart(2,'0')}h)</span> ` +
    `<span class="unit-label">M:</span><span class="ternary-value">${formatTernaryValue(ternaryM)}</span> <span class="standard-equivalent">(${String(m).padStart(2,'0')}m)</span> ` +
    `<span class="unit-label">S:</span><span class="ternary-value">${formatTernaryValue(ternaryS)}</span> <span class="standard-equivalent">(${String(s).padStart(2,'0')}s)</span>`;

  // --- Atualização do texto dentro dos marcadores ---
  if (tracks.hours.valueSpan) tracks.hours.valueSpan.textContent = formatTernaryValue(ternaryH);
  if (tracks.minutes.valueSpan) tracks.minutes.valueSpan.textContent = formatTernaryValue(ternaryM);
  if (tracks.seconds.valueSpan) tracks.seconds.valueSpan.textContent = formatTernaryValue(ternaryS);


  // --- Atualização da Posição dos Marcadores Visuais ---
  // Calcula o progresso fracionário (de 0.0 a 1.0) de cada unidade de tempo
  const hProgress = (h * 3600 + m * 60 + s + ms / 1000) / (24 * 3600);
  const mProgress = (m * 60 + s + ms / 1000) / 3600;
  const sProgress = (s * 1000 + ms) / 60000;
  const msProgress = ms / 1000;

  const progressValues = {
    hours: hProgress,
    minutes: mProgress,
    seconds: sProgress,
    ms: msProgress
  };

  // Itera sobre cada unidade de tempo para posicionar o marcador
  for (const unit in tracks) {
    const trackEl = tracks[unit].track;
    const markerEl = tracks[unit].marker;
    const connectorEl = tracks[unit].connector;
    if (!trackEl || !markerEl || !connectorEl) continue; // Pula se algum elemento não existir

    const trackWidth = trackEl.clientWidth;
    const curveContainer = trackEl.querySelector('.curve');
    if (!curveContainer) continue;
    const trackHeight = curveContainer.clientHeight;

    const progress = progressValues[unit];

    // Calcula a posição X (horizontal) linearmente com base no progresso
    const posX = progress * trackWidth;

    // Calcula a posição Y (vertical) usando uma função cosseno para seguir a onda
    const posY = (1 - Math.cos(progress * 2 * Math.PI)) / 2 * trackHeight;

    markerEl.style.left = `${posX}px`;
    markerEl.style.top = `${posY}px`;

    // --- LÓGICA PARA A LINHA CONECTORA ---
    connectorEl.style.left = `${posX}px`;
    const midPoint = trackHeight / 2;
    if (posY > midPoint) { // Marcador na metade inferior
      connectorEl.style.top = `${midPoint}px`;
      connectorEl.style.height = `${posY - midPoint}px`;
    } else { // Marcador na metade superior
      connectorEl.style.top = `${posY}px`;
      connectorEl.style.height = `${midPoint - posY}px`;
    }
  }

  // Solicita ao navegador para chamar esta função novamente no próximo frame
  requestAnimationFrame(updateClock);
}

// --- LÓGICA DO BOTÃO DE EXPLICAÇÃO ---
explanationToggle.addEventListener('click', () => {
  explanationDiv.classList.toggle('visible');
  const isVisible = explanationDiv.classList.contains('visible');
  explanationToggle.textContent = isVisible ? t('btn_explain_hide') : t('btn_explain_show');
});

// Inicia o relógio e configura as ondas quando a página carregar
window.onload = () => {
  setupWaves();
  updateClock();
  applyTranslations();
};

// Refaz as ondas se a janela for redimensionada para manter a proporção
window.onresize = setupWaves;
