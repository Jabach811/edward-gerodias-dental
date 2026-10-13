const copy = {
  en: {h: 'Book a visit', p: 'Call the office, or send a request online and the team will follow up.', b: 'Request an appointment', d: 'Directions'},
  es: {h: 'Haga una cita', p: 'Nuestro equipo habla español. Llámenos o pida su cita en línea.', b: 'Pedir una cita', d: 'Cómo llegar'},
  tl: {h: 'Magpa-schedule', p: 'Nagsasalita po ng Tagalog si Dr. Gerodias. Tumawag po kayo o mag-request online.', b: 'Mag-request ng appointment', d: 'Direksyon'}
};

const card = document.querySelector('[data-langcard]');

const setLang = (lang) => {
  card.querySelectorAll('[data-t]').forEach((el) => { el.textContent = copy[lang][el.dataset.t]; });
  card.querySelectorAll('.switch button').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.l === lang)));
  card.lang = lang;
};

card.querySelectorAll('.switch button').forEach((button) => button.addEventListener('click', () => setLang(button.dataset.l)));
