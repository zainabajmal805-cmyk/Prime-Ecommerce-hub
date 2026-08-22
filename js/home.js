// ============================================
// HOME.JS — Animations & Interactions
// ============================================

// ========================
// ANIMATED COUNTER
// ========================
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    // Format with commas if large number
    el.textContent = target >= 1000
      ? current.toLocaleString('en-PK')
      : current;

    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target >= 1000 ? target.toLocaleString('en-PK') : target;
  }
  requestAnimationFrame(update);
}

// Intersection Observer — start counter when visible
const counters = document.querySelectorAll('.ph-counter');
if (counters.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// Big counter (revenue)
const bigCounter = document.querySelector('.ph-counter-big');
if (bigCounter) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        const target = parseInt(entry.target.dataset.target, 10);
        const duration = 2500;
        const start = performance.now();
        function update(now) {
          const p = Math.min((now - start) / duration, 1);
          const e = 1 - Math.pow(1 - p, 3);
          entry.target.textContent = Math.floor(e * target).toLocaleString('en-PK');
          if (p < 1) requestAnimationFrame(update);
          else entry.target.textContent = target.toLocaleString('en-PK');
        }
        requestAnimationFrame(update);
      }
    });
  }, { threshold: 0.3 });
  obs.observe(bigCounter);
}

// ========================
// SCROLL — NAV shadow
// ========================
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.style.boxShadow = '0 4px 24px rgba(0,0,0,0.18)';
    } else {
      nav.style.boxShadow = 'none';
    }
  }, { passive: true });
}

// ========================
// SCROLL REVEAL
// ========================
const revealEls = document.querySelectorAll(
  '.ph-service-card, .ph-process-card, .ph-plat-card, .ph-why-item, .ph-testi-card, .ph-stat-box'
);

if (revealEls.length) {
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, (entry.target.dataset.delay || 0));
        revObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    el.dataset.delay = (i % 4) * 80;
    revObs.observe(el);
  });
}
