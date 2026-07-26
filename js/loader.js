// SECTION LOADER - Carga secciones HTML dinámicamente
const SECTIONS_MAP = {
  'home':             'sections/00-home.html',
  'php':              'sections/01-php-intro.html',
  'php-conceptos':    'sections/02-php-conceptos.html',
  'php-vars':         'sections/03-php-variables.html',
  'php-ops':          'sections/04-php-operadores.html',
  'php-condicionales':'sections/05-php-condicionales.html',
  'php-loops':        'sections/06-php-bucles.html',
  'php-anidados':     'sections/07-php-anidados.html',
  'php-funciones':    'sections/08-php-funciones.html',
  'php-arrays':       'sections/09-php-arrays.html',
  'php-strings':      'sections/10-php-strings.html',
  'php-forms':        'sections/11-php-formularios.html',
  'php-poo-fundamentos':'sections/12-php-poo-fund.html',
  'php-poo':          'sections/13-php-poo-avanz.html',
  'entornos':         'sections/14-entornos.html',
  'entornos-xampp':   'sections/14-entornos.html',
  'entornos-laragon': 'sections/14-entornos.html',
  'bases-datos':      'sections/16-bases-datos.html',
  'sesiones':         'sections/17-sesiones-cookies.html',
  'archivos':         'sections/18-archivos.html',
  'seguridad':        'sections/19-seguridad.html',
  'regex':            'sections/20-regex.html',
  'errores':          'sections/21-errores.html',
  'poo-avanzada':     'sections/22-poo-avanzada.html',
  'apis-json':        'sections/23-apis-json.html',
  'composer':         'sections/24-composer.html',
  'diagramas':        'sections/25-diagramas-patrones.html'
};

const SECTION_ORDER = [
  'home',
  'php','php-conceptos','php-vars','php-ops','php-condicionales',
  'php-loops','php-anidados','php-funciones','php-arrays','php-strings',
  'php-forms','php-poo-fundamentos','php-poo',
  'entornos','entornos-xampp','entornos-laragon','bases-datos','sesiones','archivos',
  'seguridad','regex','errores','poo-avanzada','apis-json',
  'composer','diagramas'
];

let currentSectionIndex = 0;

async function loadSection(sectionId) {
  const file = SECTIONS_MAP[sectionId];
  if (!file) return;

  const app = document.getElementById('app');
  try {
    const resp = await fetch(file);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const html = await resp.text();
    app.innerHTML = html;
    currentSectionIndex = SECTION_ORDER.indexOf(sectionId);

    // Activate correct tab for entornos section
    if(sectionId === 'entornos-laragon'){
      const laragonBtn = document.querySelector('[onclick*="tab-laragon"]');
      if(laragonBtn) laragonBtn.click();
    }

    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Re-init quiz if present
    if (document.getElementById('quiz-container') && typeof renderQuiz === 'function') {
      renderQuiz();
    }
  } catch (err) {
    console.error('Error loading section:', file, err);
    app.innerHTML = `<div class="section"><div class="section-header"><h2 class="section-title">Sección no encontrada</h2><p class="section-subtitle">Error al cargar: ${file}</p></div></div>`;
  }
}

// Load initial section based on hash or default to home
function initLoader() {
  const hash = window.location.hash.replace('#', '') || 'home';
  const sectionId = SECTIONS_MAP[hash] ? hash : 'home';
  loadSection(sectionId);
}

// Listen for hash changes
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash && SECTIONS_MAP[hash]) {
    loadSection(hash);
  }
});

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initLoader);
