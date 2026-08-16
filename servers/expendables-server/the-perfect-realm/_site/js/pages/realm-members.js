/* The Perfect Realm — realm-members page behavior */


(function(){
  const API_URL = "https://script.google.com/macros/s/AKfycbycK2SfejA-6QMBJkBj4eEL-IylN5PB0oQjaXRPviUTqi_Scyb5nUowahyR_q7y2S1l/exec";
  const root = document.getElementById('realm-members-list');
  if(!root) return;

  function render(members){
    root.innerHTML = '';
    const clean = Array.isArray(members)
      ? members.map(v => String(v || '').trim()).filter(Boolean)
      : [];

    if(!clean.length){
      const empty = document.createElement('div');
      empty.className = 'member-empty';
      empty.textContent = 'No Realm members are currently listed.';
      root.appendChild(empty);
      return;
    }

    const status = document.createElement('p');
    status.className = 'live-status';
    status.textContent = clean.length + (clean.length === 1 ? ' Realm member' : ' Realm members');
    root.appendChild(status);

    const grid = document.createElement('div');
    grid.className = 'member-directory';
    clean.forEach(name => {
      const item = document.createElement('div');
      item.className = 'member-entry';
      item.textContent = name;
      grid.appendChild(item);
    });
    root.appendChild(grid);
  }

  root.innerHTML = '<p class="live-status">Loading Realm members…</p>';

  fetch(API_URL + '?_=' + Date.now(), {cache:'no-store'})
    .then(r => {
      if(!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(data => {
      if(!data || data.success !== true) throw new Error('Invalid data response');
      render(data.members);
    })
    .catch(err => {
      console.error('Realm member data failed to load:', err);
      root.innerHTML = '<div class="member-error">Realm member data is temporarily unavailable.</div>';
    });
})();
