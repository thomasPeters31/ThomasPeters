// Fade-in on scroll using Intersection Observer
document.addEventListener("DOMContentLoaded", () => {
  const fadeEls = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2, // Element becomes visible when 20% of it is on screen
    }
  );

  fadeEls.forEach(el => observer.observe(el));
});

// Optional: Smooth scroll for nav links (older browsers fallback)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80, // adjust for sticky header
        behavior: "smooth"
      });
    }
  });
});
