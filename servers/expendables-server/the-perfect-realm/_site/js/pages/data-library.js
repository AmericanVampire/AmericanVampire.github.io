/* The Perfect Realm — data-library page behavior */

const colors = [
      ["0","Black","#000000"],
      ["1","Dark Blue","#0000AA"],
      ["2","Dark Green","#00AA00"],
      ["3","Dark Aqua","#00AAAA"],
      ["4","Dark Red","#AA0000"],
      ["5","Dark Purple","#AA00AA"],
      ["6","Orange","#FFAA00"],
      ["7","Gray","#AAAAAA"],
      ["8","Dark Gray","#555555"],
      ["9","Blue","#5555FF"],
      ["a","Green","#55FF55"],
      ["b","Light Blue","#55FFFF"],
      ["c","Red","#FF5555"],
      ["d","Pink","#FF55FF"],
      ["e","Yellow","#FFFF55"],
      ["f","White","#FFFFFF"],
      ["g","Gold","#DDD605"],
      ["h","Warm Light Gray","#E3D4D1"],
      ["i","Cool Light Gray","#CECACA"],
      ["j","Dark Brown","#443A3B"],
      ["m","Dark Red","#971607"],
      ["n","Brown","#B4684D"],
      ["p","Gold","#DEB12D"],
      ["q","Dark Green","#47A036"],
      ["s","Aqua","#2CBAA8"],
      ["t","Dark Teal","#21497B"],
      ["u","Purple","#9A5CC6"]
    ];

    const grid = document.getElementById("colorGrid");
    const status = document.getElementById("copyStatus");
    const search = document.getElementById("search");

    function copyText(text) {
      navigator.clipboard.writeText(text).then(() => {
        status.textContent = `Copied: ${text}`;
        window.setTimeout(() => status.textContent = "", 1800);
      }).catch(() => {
        status.textContent = "Copy failed. Select and copy the text manually.";
      });
    }

    function renderColors(filter = "") {
      grid.innerHTML = "";
      const q = filter.trim().toLowerCase();

      colors
        .filter(([code, name]) => !q || code.includes(q) || name.toLowerCase().includes(q))
        .forEach(([code, name, hex]) => {
          const card = document.createElement("article");
          card.className = "code-card";
          card.innerHTML = `
            <div class="preview" style="color:${hex}">§${code} Sample Text</div>
            <div class="details">
              <div class="row"><span class="name">${name}</span><code>§${code}</code></div>
              <div class="row small"><span>Unicode escape</span><code>\\u00A7${code}</code></div>
              <div class="row small"><span>Preview hex</span><code>${hex}</code></div>
              <button type="button" data-copy="§${code}">Copy §${code}</button>
            </div>`;
          grid.appendChild(card);
        });

      grid.querySelectorAll("[data-copy]").forEach(btn => {
        btn.addEventListener("click", () => copyText(btn.dataset.copy));
      });
    }

    function parseMinecraft(text) {
      const map = Object.fromEntries(colors.map(([code,,hex]) => [code, hex]));
      const container = document.createElement("span");
      let style = { color: "#ffffff", bold: false, italic: false, obfuscated: false };
      let buffer = "";

      function flush() {
        if (!buffer) return;
        const span = document.createElement("span");
        span.textContent = buffer;
        span.style.color = style.color;
        span.style.fontWeight = style.bold ? "800" : "400";
        span.style.fontStyle = style.italic ? "italic" : "normal";
        if (style.obfuscated) span.className = "obfuscated";
        container.appendChild(span);
        buffer = "";
      }

      for (let i = 0; i < text.length; i++) {
        if (text[i] === "§" && i + 1 < text.length) {
          flush();
          const code = text[++i].toLowerCase();
          if (map[code]) {
            style.color = map[code];
          } else if (code === "l") {
            style.bold = true;
          } else if (code === "o") {
            style.italic = true;
          } else if (code === "k") {
            style.obfuscated = true;
          } else if (code === "r") {
            style = { color: "#ffffff", bold: false, italic: false, obfuscated: false };
          }
        } else {
          buffer += text[i];
        }
      }
      flush();
      return container;
    }

    const composerInput = document.getElementById("composerInput");
    const livePreview = document.getElementById("livePreview");

    function updatePreview() {
      livePreview.replaceChildren(parseMinecraft(composerInput.value));
    }

    search.addEventListener("input", () => renderColors(search.value));
    composerInput.addEventListener("input", updatePreview);
    document.getElementById("copySection").addEventListener("click", () => copyText("§"));
    document.getElementById("copyComposer").addEventListener("click", () => copyText(composerInput.value));

    document.querySelectorAll(".example [data-copy]").forEach(btn => {
      btn.addEventListener("click", () => copyText(btn.dataset.copy));
    });

    renderColors();
    updatePreview();

    function setReferencePage(pageName) {
      document.querySelectorAll(".reference-page").forEach(page => {
        page.hidden = page.id !== `page-${pageName}`;
      });
      document.querySelectorAll(".page-button").forEach(button => {
        button.classList.toggle("active", button.dataset.page === pageName);
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    document.querySelectorAll(".page-button").forEach(button => {
      button.addEventListener("click", () => setReferencePage(button.dataset.page));
    });
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





(function(){
  function norm(v){ return (v || "").toLowerCase().trim(); }

  function wireTabs(){
    const tabs = Array.from(document.querySelectorAll('[data-tab]'));
    const panels = Array.from(document.querySelectorAll('[data-panel]'));
    tabs.forEach(btn => {
      btn.addEventListener('click', function(){
        const key = this.getAttribute('data-tab');
        tabs.forEach(t => t.classList.toggle('active', t === this));
        panels.forEach(p => {
          const active = p.getAttribute('data-panel') === key;
          p.classList.toggle('active', active);
          p.hidden = !active;
          p.style.display = active ? '' : 'none';
        });
      });
    });
  }

  function wireEnchantSearch(){
    const panel = document.querySelector('[data-panel="enchantments"]');
    if(!panel) return;

    const input =
      panel.querySelector('input[type="search"]') ||
      panel.querySelector('input[placeholder*="Search" i]') ||
      document.querySelector('input[id*="enchant" i]') ||
      document.querySelector('input[placeholder*="enchant" i]');

    if(!input) return;

    const candidates = Array.from(panel.querySelectorAll(
      '.enchantment-card, .card, article, .reference-card, .entry'
    )).filter(el => el !== input && !el.contains(input));

    input.addEventListener('input', function(){
      const q = norm(this.value);
      candidates.forEach(card => {
        const hay = norm(card.textContent);
        card.style.display = !q || hay.includes(q) ? '' : 'none';
      });
    });
  }

  function removeCopyArtifacts(){
    const panel = document.querySelector('[data-panel="enchantments"]');
    if(!panel) return;
    panel.querySelectorAll('button,[data-copy],.copy-box,.command-box,pre').forEach(el => {
      if(/copy/i.test(el.textContent || '') || el.matches('[data-copy],.copy-box,.command-box,pre')) {
        el.remove();
      }
    });
  }

  function init(){
    wireTabs();
    removeCopyArtifacts();
    wireEnchantSearch();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();



(function () {
  function initEnchantments() {
    const input = document.getElementById('enchantmentSearch');
    const cards = Array.from(document.querySelectorAll('#enchantmentGrid .enchantment-card-clean'));
    const summary = document.getElementById('enchantmentSearchSummary');

    if (!input || !cards.length) return;

    function filterEnchantments() {
      const query = input.value.trim().toLowerCase();
      let matches = 0;

      cards.forEach(card => {
        const visible = !query || card.dataset.search.includes(query);
        card.hidden = !visible;
        if (visible) matches++;
      });

      if (summary) {
        summary.textContent = !query
          ? `Showing all ${cards.length} enchantments.`
          : matches
            ? `Showing ${matches} result${matches === 1 ? '' : 's'} for "${input.value.trim()}".`
            : `No enchantments found for "${input.value.trim()}".`;
      }
    }

    input.addEventListener('input', filterEnchantments);
    input.addEventListener('search', filterEnchantments);
    filterEnchantments();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnchantments);
  } else {
    initEnchantments();
  }
})();
