/* The Perfect Realm — leaderboards page behavior */


(function(){
  const API_URL = "https://script.google.com/macros/s/AKfycbycK2SfejA-6QMBJkBj4eEL-IylN5PB0oQjaXRPviUTqi_Scyb5nUowahyR_q7y2S1l/exec";
  const root = document.getElementById('leaderboard-data');
  if(!root) return;

  const definitions = [
    ['wealthiest', 'Wealthiest Player'],
    ['highestRank', 'Highest Rank'],
    ['mostTimePlayed', 'Most Time Played']
  ];

  function makeColumn(title, rows){
    const column = document.createElement('section');
    column.className = 'leaderboard-column';

    const heading = document.createElement('h3');
    heading.textContent = title;
    column.appendChild(heading);

    const list = document.createElement('ol');
    list.className = 'leaderboard-list';

    const clean = Array.isArray(rows) ? rows.slice(0,5) : [];
    if(!clean.length){
      const empty = document.createElement('li');
      empty.className = 'live-status';
      empty.textContent = 'No standings yet.';
      list.appendChild(empty);
    } else {
      clean.forEach((entry,index) => {
        const row = document.createElement('li');
        row.className = 'leaderboard-row';

        const rank = document.createElement('span');
        rank.className = 'leaderboard-rank';
        const rankValue = Number(entry && entry.rank);
        rank.textContent = (rankValue > 0 ? rankValue : index + 1) + '.';

        const player = document.createElement('span');
        player.className = 'leaderboard-player';
        player.textContent = String((entry && entry.player) || '');

        const value = document.createElement('span');
        value.className = 'leaderboard-value';
        value.textContent = String((entry && entry.value) || '');

        row.append(rank, player, value);
        list.appendChild(row);
      });
    }

    column.appendChild(list);
    return column;
  }

  function render(data){
    const boards = data && data.leaderboards ? data.leaderboards : {};
    root.innerHTML = '';

    const grid = document.createElement('div');
    grid.className = 'leaderboard-grid';
    definitions.forEach(([key,title]) => grid.appendChild(makeColumn(title, boards[key])));
    root.appendChild(grid);
  }

  root.innerHTML = '<p class="live-status">Loading Realm standings…</p>';

  fetch(API_URL + '?_=' + Date.now(), {cache:'no-store'})
    .then(r => {
      if(!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(data => {
      if(!data || data.success !== true) throw new Error('Invalid data response');
      render(data);
    })
    .catch(err => {
      console.error('Leaderboard data failed to load:', err);
      root.innerHTML = '<div class="leaderboard-error">Leaderboard data is temporarily unavailable.</div>';
    });
})();
