/**
 * script.js
 * Shared behaviour across all pages: mobile nav toggle, scroll fade-ins,
 * footer year, and lightweight email de-obfuscation.
 */

// ---------------------------------------------------------------------------
// Mobile nav toggle
// ---------------------------------------------------------------------------
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------------------------------------------------------------------------
// Scroll-triggered fade-ins (skipped entirely for reduced-motion users)
// ---------------------------------------------------------------------------
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const faders = document.querySelectorAll('.fade-in');

if (prefersReducedMotion) {
  faders.forEach((el) => el.classList.add('visible'));
} else {
  const appearOnScroll = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  faders.forEach((el) => {
    const rect = el.getBoundingClientRect();
    // Already in the viewport on load — make visible immediately so there's no flash
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
    } else {
      appearOnScroll.observe(el);
    }
  });
}

// ---------------------------------------------------------------------------
// Footer year
// ---------------------------------------------------------------------------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------------------------------------------------------------------------
// Email de-obfuscation
// Built at runtime from reversed parts so plain-text scrapers don't pick up
// the address straight from the HTML source.
// ---------------------------------------------------------------------------
document.querySelectorAll('[data-email-user]').forEach((el) => {
  const user = el.getAttribute('data-email-user').split('').reverse().join('');
  const domain = el.getAttribute('data-email-domain').split('').reverse().join('');
  const address = `${user}@${domain}`;
  if (el.tagName === 'A') {
    el.href = `mailto:${address}`;
  }
  el.textContent = address;
});
