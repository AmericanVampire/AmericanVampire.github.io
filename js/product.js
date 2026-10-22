(() => {
  const links = [...document.querySelectorAll('.explore-nav a')];
  const views = [...document.querySelectorAll('.product-view')];
  const menu = document.querySelector('.mobile-sections');
  const mobile = window.matchMedia('(max-width: 800px)');
  const aliases = { features: 'monitoring', management: 'administration', subscriptions: 'get-realm-guard', availability: 'get-realm-guard' };

  function showView(scroll = false) {
    const hash = location.hash.slice(1);
    const id = aliases[hash] || hash;
    const view = views.find(item => item.id === id) || views[0];
    views.forEach(item => {
      item.classList.toggle('is-current', item === view);
      item.hidden = item !== view;
    });
    links.forEach(link => {
      if (link.hash === `#${view.id}`) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    document.querySelector('#current-section').textContent = links.find(link => link.hash === `#${view.id}`).textContent;
    document.title = view.id === 'home' ? 'Realm Guard' : view.id === 'overview' ? 'Overview' : view.querySelector('h1').textContent;
    menu.open = !mobile.matches;
    if (scroll) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      const heading = view.id === 'home' ? document.querySelector('#product-content') : view.querySelector('h1');
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
  }
  window.addEventListener('hashchange', () => showView(true));
  mobile.addEventListener('change', () => { menu.open = !mobile.matches; });
  document.querySelectorAll('.explore-nav a, .home-destinations a').forEach(link => link.addEventListener('click', () => {
    if (link.hash === location.hash || (!location.hash && link.hash === '#home')) showView(true);
  }));
  showView();

  document.querySelectorAll('[data-gallery]').forEach(gallery => {
    const tabs = [...gallery.querySelectorAll('[role="tab"]')];
    function select(tab) {
      tabs.forEach(item => {
        const active = item === tab;
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
        document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
      });
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next === undefined) return;
        event.preventDefault();
        select(tabs[next]);
        tabs[next].focus();
      });
    });
  });

  const dialog = document.querySelector('.screenshot-dialog');
  const fullImage = dialog.querySelector('img');
  document.querySelectorAll('[data-lightbox]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      fullImage.src = link.href;
      fullImage.alt = link.querySelector('img').alt;
      dialog.querySelector('[data-caption]').textContent = link.closest('figure').querySelector('figcaption').textContent;
      dialog.querySelector('[data-original]').href = link.href;
      dialog.showModal();
      document.body.style.overflowY = 'hidden';
    });
  });
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { document.body.style.overflowY = ''; });

  document.querySelectorAll('.store-button').forEach(button => {
    button.addEventListener('pointerdown', () => button.classList.add('is-pressed'));
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(name => button.addEventListener(name, () => {
      window.setTimeout(() => button.classList.remove('is-pressed'), 90);
    }));
  });
})();
