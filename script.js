const navItems = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view');
const breadcrumb = document.getElementById('breadcrumb');
const viewTitle = document.getElementById('viewTitle');

const titles = {
  dashboard: 'My Portfolio',
  skills: 'Skills',
  experience: 'Experience',
  education: 'Education',
  projects: 'Projects',
  certifications: 'Certifications',
  contact: 'Contact'
};

function showView(name) {
  views.forEach(v => v.classList.toggle('active', v.id === 'view-' + name));
  navItems.forEach(n => n.classList.toggle('active', n.dataset.view === name));
  viewTitle.textContent = titles[name] || 'My Portfolio';
  breadcrumb.textContent = 'Portfolio / ' + (titles[name] || 'Dashboard');
  closeSidebar();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

navItems.forEach(item => {
  item.addEventListener('click', () => showView(item.dataset.view));
});

document.querySelectorAll('[data-goto]').forEach(el => {
  el.addEventListener('click', () => showView(el.dataset.goto));
});

if (location.hash) {
  const initial = location.hash.replace('#', '');
  if (titles[initial]) showView(initial);
}

const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const hamburger = document.getElementById('hamburger');
const sidebarClose = document.getElementById('sidebarClose');

function openSidebar() {
  sidebar.classList.add('open');
  sidebarOverlay.classList.add('open');
}

function closeSidebar() {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('open');
}

hamburger.addEventListener('click', openSidebar);
sidebarClose.addEventListener('click', closeSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

function applyTheme(isDark) {
  document.body.classList.toggle('dark', isDark);
  themeIcon.className = isDark ? 'ti ti-sun' : 'ti ti-moon';
}

const savedTheme = localStorage.getItem('portfolio-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme ? savedTheme === 'dark' : prefersDark);

themeToggle.addEventListener('click', () => {
  const isDark = !document.body.classList.contains('dark');
  applyTheme(isDark);
  localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
});

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    formStatus.textContent = 'Sending...';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        formStatus.textContent = "Message sent — I'll get back to you soon.";
        contactForm.reset();
      } else {
        formStatus.textContent = 'Something went wrong. Please email me directly instead.';
      }
    } catch (err) {
      formStatus.textContent = 'Something went wrong. Please email me directly instead.';
    } finally {
      submitBtn.disabled = false;
    }
  });
}