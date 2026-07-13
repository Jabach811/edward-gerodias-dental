document.documentElement.classList.add('js');

const toggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const toggleLabel = toggle?.querySelector('.sr-only');

const setMenuState = (open) => {
  if (!toggle || !nav) return;
  toggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
  if (toggleLabel) toggleLabel.textContent = open ? 'Close navigation' : 'Open navigation';
};

const closeMenu = () => setMenuState(false);

toggle?.addEventListener('click', () => {
  setMenuState(toggle.getAttribute('aria-expanded') !== 'true');
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    toggle.focus();
  }
});

const escape = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[character]));

const serviceDescriptions = {
  'New-patient exams': 'A clear first visit, careful evaluation, cleaning, and appropriate imaging.',
  'Cleanings and preventive care': 'Consistent care and practical guidance for long-term oral health.',
  'Fillings': 'Thoughtful restorative care with comfort and communication in the room.',
  'Crowns': 'Careful restoration planning designed around function, fit, and appearance.',
  'Orthodontics': 'Smile-alignment care listed through the practice’s public scheduler.'
};

const renderServices = (services) => services.map((service, index) => `
  <article class="care-card">
    <span>${String(index + 1).padStart(2, '0')}</span>
    <h3>${escape(service.name)}</h3>
    <p>${escape(serviceDescriptions[service.name] || 'Call the office to ask how this care fits your needs.')}</p>
  </article>
`).join('');

fetch('data/practice.json')
  .then((response) => {
    if (!response.ok) throw new Error(`Practice data returned ${response.status}`);
    return response.json();
  })
  .then((practice) => {
    const services = document.querySelector('[data-services]');
    if (services && Array.isArray(practice.services)) {
      services.innerHTML = renderServices(practice.services);
    }
  })
  .catch((error) => console.info('Using embedded practice content.', error.message));

const revealItems = document.querySelectorAll('[data-reveal]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }), {threshold: .15});

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
