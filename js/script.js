document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.menu');

  if (navToggle && menu) {
    navToggle.addEventListener('click', function () {
      const isOpen = menu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      alert('Thank you for your message. Ecommerce Hub will contact you soon.');
      contactForm.reset();
    });
  }
});
