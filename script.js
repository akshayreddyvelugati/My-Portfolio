'use strict';
const menuButton = document.getElementById('menu-toggle');
const menu = document.getElementById('nav-links');
const navLinks = Array.from(menu.querySelectorAll('a'));

function closeMenu() {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}

menuButton.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

navLinks.forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});
document.addEventListener('click', event => {
  if (!menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  revealElements.forEach(element => revealObserver.observe(element));
} else {
  revealElements.forEach(element => element.classList.add('visible'));
}

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
      }
    });
  }, { rootMargin: '-30% 0px -55% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
}

document.getElementById('year').textContent = new Date().getFullYear();

// Subtle hero pointer glow (desktop only; reduced-motion and touch respected).
const hero = document.querySelector('.hero');
if (hero && window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) {
  let pending = false;
  hero.addEventListener('pointermove', event => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      const bounds = hero.getBoundingClientRect();
      hero.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
      hero.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
      pending = false;
    });
  }, { passive: true });
}
