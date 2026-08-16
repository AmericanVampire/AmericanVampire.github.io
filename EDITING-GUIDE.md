# The Perfect Realm — Google Sites + GitHub Pages Hybrid

This package is built specifically for the setup you chose:

- `www.realmguard.net` stays on Google Sites
- GitHub Pages hosts the editable HTML/CSS/JS
- Each Google Sites page uses **Embed by URL** and points to the matching GitHub Pages page
- Navigation inside the embedded content sends the browser to the matching `realmguard.net` page

## GitHub Pages URLs to embed in Google Sites

- Home → `https://AmericanVampire.github.io/`
- Realm → `https://AmericanVampire.github.io/realm/`
- Server Rules → `https://AmericanVampire.github.io/server-rules/`
- Castle Marketplace → `https://AmericanVampire.github.io/castle-marketplace/`
- Castle Games → `https://AmericanVampire.github.io/castle-games/`
- Realm Members → `https://AmericanVampire.github.io/realm-members/`
- Leaderboards → `https://AmericanVampire.github.io/leaderboards/`
- Quest Master → `https://AmericanVampire.github.io/quest-master/`
- Data Library → `https://AmericanVampire.github.io/data-library/`

## Public Google Sites/custom-domain URLs

Navigation inside the GitHub pages points to:

- `https://www.realmguard.net/`
- `https://www.realmguard.net/realm`
- `https://www.realmguard.net/server-rules`
- `https://www.realmguard.net/castle-marketplace`
- `https://www.realmguard.net/castle-games`
- `https://www.realmguard.net/realm-members`
- `https://www.realmguard.net/leaderboards`
- `https://www.realmguard.net/quest-master`
- `https://www.realmguard.net/data-library`

This means refresh stays on the current Google Sites page.

## Editing files

- `index.html` — Home
- `realm/index.html` — Realm
- `server-rules/index.html` — Server Rules
- `castle-marketplace/index.html` — Castle Marketplace
- `castle-games/index.html` — Castle Games
- `realm-members/index.html` — Realm Members
- `leaderboards/index.html` — Leaderboards
- `quest-master/index.html` — Quest Master
- `data-library/index.html` — Data Library
- `css/site.css` — shared styling
- `css/pages/*.css` — page-specific styling
- `js/site.js` — shared navigation/back-to-top behavior
- `js/pages/*.js` — page-specific behavior
- `assets/images/` — site images

## Uploading to GitHub

Upload the **contents of this folder** to the root of your `AmericanVampire.github.io` repository.
Do not upload the outer folder as a nested folder.

## Important Google Sites step

Create one Google Sites page for each route listed above and use **Embed → By URL** with the matching GitHub Pages URL.
