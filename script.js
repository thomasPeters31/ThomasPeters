/**
 * script.js
 * Handles scroll-triggered fade-in animations for cards and sections.
 * Applied globally across all pages via the .fade-in class.
 */

// Collect every element that should animate in on scroll
const faders = document.querySelectorAll('.fade-in');

// Trigger when 20% of the element is visible; add a bottom margin so
// elements animate before they fully reach the edge of the viewport
const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

// Add .visible once the element enters the viewport, then stop observing it
const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));
