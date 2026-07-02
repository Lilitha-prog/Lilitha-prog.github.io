// Theme handling — manual toggle, persisted, animated circular reveal
(function () {
  const html = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const iconEl = btn.querySelector('i');

  function setIcon(isDark) {
    iconEl.className = isDark ? 'ti ti-sun' : 'ti ti-moon';
  }

  const saved = localStorage.getItem('theme');
  const startDark = saved === 'dark';
  html.setAttribute('data-theme', startDark ? 'dark' : 'light');
  setIcon(startDark);

  btn.addEventListener('click', () => {
    const goingDark = html.getAttribute('data-theme') !== 'dark';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      html.setAttribute('data-theme', goingDark ? 'dark' : 'light');
      setIcon(goingDark);
      localStorage.setItem('theme', goingDark ? 'dark' : 'light');
      return;
    }

    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const veil = document.createElement('div');
    veil.className = 'theme-veil' + (goingDark ? '' : ' light-veil');
    veil.style.left = cx + 'px';
    veil.style.top = cy + 'px';
    document.body.appendChild(veil);
    requestAnimationFrame(() => veil.classList.add('animating'));

    setTimeout(() => {
      html.setAttribute('data-theme', goingDark ? 'dark' : 'light');
      setIcon(goingDark);
      localStorage.setItem('theme', goingDark ? 'dark' : 'light');
    }, 260);

    veil.addEventListener('animationend', () => veil.remove());
  });
})();

// Contact form submission (Formspree) with inline status message
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        status.textContent = "Message sent — I'll get back to you soon.";
        form.reset();
      } else {
        status.textContent = 'Something went wrong. Please email me directly instead.';
      }
    } catch (err) {
      status.textContent = 'Something went wrong. Please email me directly instead.';
    }
  });
})();