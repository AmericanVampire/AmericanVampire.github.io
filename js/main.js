document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

(() => {
  const titles = new Map([
    ['/', 'Realm Guard'],
    ['/privacy/', 'Privacy Policy'],
    ['/servers/', 'Server Portal'],
    ['/servers/expendables-server/', 'Expendables Server'],
    ['/servers/expendables-server/skyblock/home/', 'Skyblock'],
    ['/servers/expendables-server/maze-runner/home/', 'Maze Runner'],
  ]);

  const path = window.location.pathname.endsWith('/')
    ? window.location.pathname
    : `${window.location.pathname}/`;
  const title = titles.get(path);
  if (title) document.title = title;
})();

document.querySelectorAll('[data-site-back]').forEach(button => {
  button.addEventListener('click', () => {
    if (document.referrer && document.referrer.includes(location.hostname)) {
      history.back();
      return;
    }

    window.location.href = button.getAttribute('data-fallback') || '/';
  });
});

document.querySelectorAll('.store-button').forEach(button => {
  button.addEventListener('pointerdown', () => {
    button.classList.add('is-pressed');
  });

  ['pointerup', 'pointercancel', 'pointerleave'].forEach(eventName => {
    button.addEventListener(eventName, () => {
      window.setTimeout(() => button.classList.remove('is-pressed'), 90);
    });
  });
});
