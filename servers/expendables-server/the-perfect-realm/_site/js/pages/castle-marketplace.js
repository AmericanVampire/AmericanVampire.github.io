/* The Perfect Realm — castle-marketplace page behavior */


const search = document.getElementById('search');
const filter = document.getElementById('filter');
const cards = [...document.querySelectorAll('.shop-card')];
const empty = document.getElementById('empty');
const categoryButtons = [...document.querySelectorAll('.category-filter')];
const expandAll = document.getElementById('expandAll');
const collapseAll = document.getElementById('collapseAll');
let activeCategory = 'all';

const categoryMap = {
  'stone hall butcher': ['food', 'Food & Farming'],
  'fish market': ['food', 'Food & Farming'],
  'hunger bar grill': ['food', 'Food & Farming'],
  'flower shop': ['food', 'Food & Farming'],
  'farmer': ['food', 'Food & Farming'],
  'rancher': ['food', 'Food & Farming'],
  'carpenter': ['materials', 'Materials'],
  'mason': ['materials', 'Materials'],
  'enchanting supplies': ['materials', 'Materials'],
  'legendary items shop': ['equipment', 'Equipment & Magic'],
  'epic tools shop': ['equipment', 'Equipment & Magic'],
  'outfitter': ['equipment', 'Equipment & Magic'],
  'vip shop': ['equipment', 'Equipment & Magic'],
  'enchanted library': ['equipment', 'Equipment & Magic'],
  'nether merchant': ['dimensions', 'Dimension Merchants'],
  'end merchant': ['dimensions', 'Dimension Merchants'],
  'overworld merchant': ['dimensions', 'Dimension Merchants'],
  'experience store': ['specialty', 'Specialty & Services'],
  "american vampire's shop": ['specialty', 'Specialty & Services'],
  'castle games': ['specialty', 'Specialty & Services'],
  'quest master': ['specialty', 'Specialty & Services'],
  'monster shop': ['specialty', 'Specialty & Services'],
  'trial chamber shop': ['specialty', 'Specialty & Services'],
  'mystery loot shop': ['specialty', 'Specialty & Services']
};

function setExpanded(card, expanded) {
  card.classList.toggle('expanded', expanded);
  const heading = card.querySelector('.shop-heading');
  heading.setAttribute('aria-expanded', String(expanded));
}

cards.forEach(card => {
  const shopKey = card.dataset.shop;
  const [category] = categoryMap[shopKey] || ['specialty', 'Specialty & Services'];
  card.dataset.category = category;

  const heading = card.querySelector('.shop-heading');
  const title = heading.querySelector('h2');
  const rows = [...card.querySelectorAll('tbody tr')];
  const itemNames = rows.map(row => row.children[1]?.textContent.trim()).filter(Boolean);
  const uniqueNames = [...new Set(itemNames)];
  const overview = uniqueNames.length
    ? uniqueNames.slice(0, 4).join(' · ') + (uniqueNames.length > 4 ? ' · More' : '')
    : 'Coming soon';

  heading.innerHTML = '';
  heading.setAttribute('role', 'button');
  heading.setAttribute('tabindex', '0');
  heading.setAttribute('aria-expanded', 'false');
  heading.innerHTML = `
    <div class="shop-heading-main">
      <div class="shop-heading-top">
        <h2>${title.textContent}</h2>
      </div>
      <div class="shop-overview">${overview}</div>
    </div>
    <div class="shop-heading-side">
      <span class="shop-chevron" aria-hidden="true"></span>
    </div>`;

  heading.addEventListener('click', () => setExpanded(card, !card.classList.contains('expanded')));
  heading.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setExpanded(card, !card.classList.contains('expanded'));
    }
  });
});

function applyFilters() {
  const term = search.value.trim().toLowerCase();
  const type = filter.value;
  const detailFilterActive = Boolean(term) || type !== 'all';
  let visibleCards = 0;

  cards.forEach(card => {
    let visibleRows = 0;
    const shopMatch = card.dataset.shop.includes(term);
    const categoryMatch = activeCategory === 'all' || card.dataset.category === activeCategory;

    card.querySelectorAll('tbody tr').forEach(row => {
      const rowText = row.textContent.toLowerCase();
      const termMatch = !term || shopMatch || rowText.includes(term);
      const typeMatch = type === 'all' || row.dataset.type === type;
      const show = categoryMatch && termMatch && typeMatch;
      row.style.display = show ? '' : 'none';
      if (show) visibleRows++;
    });

    const isEmptyShop = card.querySelectorAll('tbody tr').length === 0;
    const showEmptyShop = isEmptyShop && categoryMatch && !term && type === 'all';
    const showCard = categoryMatch && (visibleRows > 0 || showEmptyShop);
    card.hidden = !showCard;
    if (showCard) {
      visibleCards++;
      if (detailFilterActive && !isEmptyShop) setExpanded(card, true);
    }
  });

  empty.style.display = visibleCards ? 'none' : 'block';
}

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    activeCategory = button.dataset.category;
    categoryButtons.forEach(item => item.classList.toggle('active', item === button));
    applyFilters();
  });
});

expandAll.addEventListener('click', () => cards.filter(card => !card.hidden).forEach(card => setExpanded(card, true)));
collapseAll.addEventListener('click', () => cards.forEach(card => setExpanded(card, false)));
search.addEventListener('input', applyFilters);
filter.addEventListener('change', applyFilters);
applyFilters();
