/* The Perfect Realm — shared site behavior */

document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

(() => {
  const titles = new Map([
    ['/servers/expendables-server/the-perfect-realm/home/', 'The Perfect Realm'],
    ['/servers/expendables-server/the-perfect-realm/realm/', 'Server Information'],
    ['/servers/expendables-server/the-perfect-realm/server-rules/', 'Server Rules'],
    ['/servers/expendables-server/the-perfect-realm/castle-marketplace/', 'Castle Marketplace'],
    ['/servers/expendables-server/the-perfect-realm/castle-games/', 'Castle Games'],
    ['/servers/expendables-server/the-perfect-realm/quest-master/', 'Quest Master'],
    ['/servers/expendables-server/the-perfect-realm/realm-members/', 'Realm Members'],
    ['/servers/expendables-server/the-perfect-realm/leaderboards/', 'Leaderboards'],
    ['/servers/expendables-server/the-perfect-realm/data-library/', 'Minecraft Data Library'],
  ]);

  const path = window.location.pathname.endsWith('/')
    ? window.location.pathname
    : `${window.location.pathname}/`;
  const title = titles.get(path);
  if (title) document.title = title;
})();

(function setupBackToTop() {
  const button = document.createElement('button');
  button.className = 'site-back-to-top';
  button.type = 'button';
  button.setAttribute('aria-label', 'Back to top');
  button.setAttribute('title', 'Back to top');
  button.textContent = '↑';

  // Authoritative Data Library styling applied directly to the element.
  // This prevents page-specific button rules from changing its appearance.
  const buttonStyles = {
    position: 'fixed',
    right: '28px',
    bottom: '28px',
    zIndex: '99999',
    width: '46px',
    height: '46px',
    display: 'grid',
    placeItems: 'center',
    padding: '0',
    margin: '0',
    border: '1px solid #29405a',
    borderRadius: '50%',
    background: '#132236',
    color: '#f6f8fb',
    fontFamily: '"Segoe UI Symbol", "Segoe UI", Arial, sans-serif',
    fontSize: '1.35rem',
    fontWeight: '400',
    lineHeight: '1',
    boxShadow: '0 2px 8px rgba(0,0,0,.10)',
    cursor: 'pointer'
  };
  for (const [property, value] of Object.entries(buttonStyles)) {
    button.style.setProperty(property.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`), value, 'important');
  }

  button.addEventListener('mouseenter', () => {
    button.style.setProperty('background', '#182b42', 'important');
    button.style.setProperty('border-color', '#e7c56d', 'important');
  });
  button.addEventListener('mouseleave', () => {
    button.style.setProperty('background', '#132236', 'important');
    button.style.setProperty('border-color', '#29405a', 'important');
  });

  document.body.appendChild(button);

  const getRevealPoint = () => {
    const headingSection = document.querySelector('.page-hero, .hero');
    if (!headingSection) return window.innerHeight;
    return headingSection.getBoundingClientRect().bottom + window.scrollY;
  };

  const updateVisibility = () => {
    button.classList.toggle('is-visible', window.scrollY >= getRevealPoint());
  };

  button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', updateVisibility, { passive: true });
  window.addEventListener('resize', updateVisibility);
  updateVisibility();
})();





/* Google Sites + GitHub Pages hybrid navigation */
document.addEventListener('DOMContentLoaded', () => {
  const routes = {"home": "/servers/expendables-server/the-perfect-realm/home/", "realm": "/servers/expendables-server/the-perfect-realm/realm/", "server-rules": "/servers/expendables-server/the-perfect-realm/server-rules/", "castle-marketplace": "/servers/expendables-server/the-perfect-realm/castle-marketplace/", "castle-games": "/servers/expendables-server/the-perfect-realm/castle-games/", "realm-members": "/servers/expendables-server/the-perfect-realm/realm-members/", "leaderboards": "/servers/expendables-server/the-perfect-realm/leaderboards/", "quest-master": "/servers/expendables-server/the-perfect-realm/quest-master/", "data-library": "/servers/expendables-server/the-perfect-realm/data-library/"};

  document.querySelectorAll('[data-site-path]').forEach(el => {
    const key = el.getAttribute('data-site-path');
    if (!routes[key]) return;
    el.setAttribute('href', routes[key]);
    el.removeAttribute('target');
  });

  document.querySelectorAll('[data-site-back]').forEach(button => {
    button.addEventListener('click', () => {
      if (document.referrer && (document.referrer.includes(location.hostname) || document.referrer.includes('realmguard.net'))) {
        try { history.back(); return; } catch (e) {}
      }
      window.location.href = button.getAttribute('data-fallback') || routes.realm;
    });
  });
});
