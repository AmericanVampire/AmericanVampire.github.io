(() => {
  const search = document.querySelector('#mob-search');
  const cards = [...document.querySelectorAll('[data-mob-search]')];
  const results = document.querySelector('#mob-results');
  const status = document.querySelector('#mob-copy-status');
  let reset;
  search.addEventListener('input', () => {
    const words = search.value.trim().toLowerCase().split(/\s+/);
    let count = 0;
    cards.forEach(card => {
      card.hidden = !words.every(word => card.dataset.mobSearch.includes(word));
      if (!card.hidden) count++;
    });
    document.querySelectorAll('[data-mob-group]').forEach(group => {
      group.hidden = !group.querySelector('.mob-card:not([hidden])');
    });
    results.textContent = count === cards.length ? `Showing all ${count} entries.` : `Showing ${count} of ${cards.length} entries.`;
    document.querySelector('#mob-empty').hidden = count !== 0;
  });
  document.querySelector('.mob-reference').addEventListener('click', async event => {
    const button = event.target.closest('[data-mob-copy]');
    if (!button) return;
    try {
      await navigator.clipboard.writeText(button.dataset.mobCopy);
      clearTimeout(reset);
      document.querySelectorAll('[data-mob-copy]').forEach(item => { item.textContent = 'Copy ID'; });
      button.textContent = 'Copied';
      status.textContent = `Copied ${button.dataset.mobCopy}.`;
      reset = setTimeout(() => { button.textContent = 'Copy ID'; }, 2000);
    } catch {
      status.textContent = 'Unable to copy automatically. Select and copy the entity ID shown on the card.';
    }
  });
})();
