const search = document.querySelector('[data-search]');
const status = document.querySelector('[data-search-status]');
const sections = [...document.querySelectorAll('[data-searchable]')];
const navLinks = [...document.querySelectorAll('.sidebar nav a')];

const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

search?.addEventListener('input', () => {
  const query = normalize(search.value);
  let matches = 0;
  sections.forEach((section) => {
    const visible = !query || normalize(section.textContent ?? '').includes(query);
    section.classList.toggle('is-hidden', !visible);
    section.classList.toggle('search-hit', Boolean(query && visible));
    if (visible && query) matches += 1;
  });
  if (status) status.textContent = query ? `${matches} ${matches === 1 ? 'sección encontrada' : 'secciones encontradas'}` : '';
});

document.querySelector('[data-print]')?.addEventListener('click', () => window.print());

const observer = new IntersectionObserver((entries) => {
  const current = entries.filter((entry) => entry.isIntersecting).at(-1);
  if (!current?.target.id) return;
  navLinks.forEach((link) => link.classList.toggle('is-active', link.hash === `#${current.target.id}`));
}, { rootMargin: '-20% 0px -70%' });

sections.forEach((section) => {
  if (section.id) observer.observe(section);
});
