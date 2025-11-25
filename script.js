// Fade-in on scroll
const faders = document.querySelectorAll('.fade-in');

const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };

const appearOnScroll = new IntersectionObserver(function(entries, observer){
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// Mobile nav toggle
const menuBtn = document.querySelector('.menu-toggle');
const nav = document.getElementById('site-nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('nav-open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });
}
