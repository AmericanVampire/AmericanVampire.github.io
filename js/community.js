(() => {
  const menu = document.querySelector('.mobile-sections');
  const mobile = window.matchMedia('(max-width: 800px)');
  const nav = document.querySelector('.explore-nav');
  const summary = document.querySelector('#current-section');
  const referencePages = [...document.querySelectorAll('.reference-page')];
  const policyPages = [...document.querySelectorAll('.policy-view')];
  document.querySelectorAll('.site-back-to-top').forEach((button, index) => {
    if (index > 0) button.remove();
  });

  function refresh() {
    if (referencePages.length) {
      const name = location.hash === '#enchantments' ? 'enchantments' : 'formatting';
      referencePages.forEach(page => { page.hidden = page.id !== `page-${name}`; });
      nav.querySelectorAll('[data-reference]').forEach(link => {
        if (link.dataset.reference === name) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
      const heading = document.querySelector('.page-hero h1');
      heading.textContent = name === 'enchantments' ? 'Enchantments' : 'Minecraft Data Library';
      document.title = heading.textContent;
    }
    if (policyPages.length) {
      const selected = policyPages.find(page => `#${page.id}` === location.hash) || policyPages[0];
      policyPages.forEach(page => { page.hidden = page !== selected; });
      nav.querySelectorAll('a').forEach(link => {
        if (link.hash === `#${selected.id}`) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
    }
    summary.textContent = nav.querySelector('[aria-current]')?.textContent || document.title;
    menu.open = !mobile.matches;
  }
  refresh();
  mobile.addEventListener('change', () => { menu.open = !mobile.matches; });
  window.addEventListener('hashchange', () => {
    refresh();
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) menu.open = !mobile.matches;
  });
})();
