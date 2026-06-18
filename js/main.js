// Jagdamb Sourcing Solutions — shared site behavior

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile nav toggle ----
  const hamburger = document.querySelector('.hamburger');
  const navList = document.querySelector('nav.main-nav ul');
  if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
      navList.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', navList.classList.contains('open'));
    });
    navList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navList.classList.remove('open')));
  }

  // ---- Scroll reveal ----
  const animated = document.querySelectorAll('[data-animate]');
  if ('IntersectionObserver' in window && animated.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    animated.forEach(el => io.observe(el));
  } else {
    animated.forEach(el => el.classList.add('in-view'));
  }

  // ---- Animated counters ----
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCount(e.target);
          cio.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(el => cio.observe(el));
  } else {
    counters.forEach(animateCount);
  }
  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ---- FAQ accordion ----
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.closest('.faq-list')?.querySelectorAll('.faq-item').forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // ---- Generic form -> Formspree (AJAX) + success message ----
  document.querySelectorAll('form[data-formspree]').forEach(form => {
    const successEl = form.parentElement.querySelector('.form-success') || form.querySelector('.form-success');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) { submitBtn.textContent = 'Sending…'; submitBtn.disabled = true; }
      try {
        const formData = new FormData(form);
        const res = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          form.reset();
          if (successEl) successEl.classList.add('show');
          else alert('Thank you. Your request has been submitted.');
        } else {
          alert('Something went wrong sending your form. Please try the WhatsApp button below instead.');
        }
      } catch (err) {
        alert('Could not send right now — please use the WhatsApp button below, or email us directly.');
      } finally {
        if (submitBtn) { submitBtn.textContent = originalText; submitBtn.disabled = false; }
      }
    });
  });

  // ---- Year in footer ----
  document.querySelectorAll('.cur-year').forEach(el => el.textContent = new Date().getFullYear());

});

// ---- WhatsApp helper: build a prefilled chat link ----
function waLink(message) {
  const phone = '919999999999'; // TODO: replace with real WhatsApp Business number (country code + number, no +)
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
