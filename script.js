const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
  mobileMenu.hidden = open;
  document.body.classList.toggle('menu-open', !open);
});

mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  mobileMenu.hidden = true;
  document.body.classList.remove('menu-open');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const vertebraeGroup = document.querySelector('.vertebrae');
for (let i = 0; i < 15; i += 1) {
  const y = 48 + i * 35;
  const x = 149 + Math.sin(i * 0.82) * 22;
  const width = 40 - Math.abs(7 - i) * 0.7;
  const vertebra = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  vertebra.setAttribute('x', x - width / 2);
  vertebra.setAttribute('y', y);
  vertebra.setAttribute('width', width);
  vertebra.setAttribute('height', 16);
  vertebra.setAttribute('rx', 8);
  vertebra.setAttribute('transform', `rotate(${Math.sin(i) * 7} ${x} ${y + 8})`);
  vertebra.style.setProperty('--delay', `${i * 0.09}s`);
  vertebraeGroup.appendChild(vertebra);
}

document.getElementById('year').textContent = new Date().getFullYear();
