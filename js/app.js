// THEME TOGGLE
const html = document.documentElement;
const btn = document.getElementById('themeBtn');
const saved = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', saved);
btn.addEventListener('click', () => {
  const t = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
});

// MOBILE MENU
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
menuBtn.addEventListener('click', () => mobileNav.classList.toggle('open'));
function closeMobile(){ mobileNav.classList.remove('open'); }

// DROPDOWN TOGGLE - Desktop
function toggleDropdown(btn){
  const dropdown = btn.closest('.nav-dropdown');
  dropdown.classList.toggle('open');
}
// Close dropdown on link selection
function closeDropdown(el){
  const dropdown = el.closest('.nav-dropdown');
  if(dropdown) dropdown.classList.remove('open');
}
// Close desktop dropdown when clicking outside
document.addEventListener('click', (e) => {
  if(!e.target.closest('.nav-dropdown')){
    document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
  }
});

// DROPDOWN TOGGLE - Mobile
function toggleMobileDropdown(btn){
  const dropdown = btn.closest('.mobile-dropdown');
  dropdown.classList.toggle('open');
}

// ACTIVE NAV
function setActive(el){
  document.querySelectorAll('nav a, .nav-dropdown-menu a').forEach(a => a.classList.remove('active'));
  el.classList.add('active');
  // Close mobile nav on link click
  if(el.closest('.mobile-nav')) closeMobile();
}

// SCROLL PROGRESS + BACK TO TOP
const progress = document.getElementById('progressBar');
const backTop  = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  const s = document.documentElement;
  const pct = s.scrollTop / (s.scrollHeight - s.clientHeight);
  progress.style.transform = `scaleX(${pct})`;
  backTop.classList.toggle('show', s.scrollTop > 400);

  // Update active nav based on scroll
  const sections = ['home','php','entornos','bases-datos','sesiones','archivos','seguridad','regex','errores','poo-avanzada','apis-json','composer','diagramas','recursos'];
  let current = 'home';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && s.scrollTop >= el.offsetTop - 100) current = id;
  });
  document.querySelectorAll('nav a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});
