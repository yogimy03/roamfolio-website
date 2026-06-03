# RoamFolio — Website

Marketing and legal website for **RoamFolio**, a personal travel diary app for iPhone. Draws every trip on an interactive map — flights arc across oceans, road trips trace real streets, hikes follow GPX tracks, cruises flow as wave-like paths.

Live at → **[roamfolio.life](https://roamfolio.life)**

---

## Pages

| File | URL | Purpose |
|------|-----|---------|
| `index.html` | `/` | Landing page — features, transport modes, coming soon |
| `privacy.html` | `/privacy.html` | Privacy Policy (required for App Store submission) |
| `terms.html` | `/terms.html` | Terms of Service |

---

## Stack

Pure HTML + CSS + vanilla JS. No frameworks, no build step, no dependencies beyond Google Fonts. Drop the files anywhere and it works.

```
RoamFolio-Website/
├── index.html
├── privacy.html
├── terms.html
├── assets/
│   └── logo-icon.svg     ← App icon / favicon (SVG)
├── css/
│   └── styles.css
└── js/
    └── main.js
```

---

## Deploying (GitHub Pages)

This site is hosted on GitHub Pages with the custom domain `roamfolio.life`.

DNS records on GoDaddy point to GitHub Pages:

```
A  @  185.199.108.153
A  @  185.199.109.153
A  @  185.199.110.153
A  @  185.199.111.153
CNAME  www  <github-username>.github.io
```

To update the site: push to `main` — GitHub Pages deploys automatically within ~30 seconds.

---

## App

RoamFolio is an iOS app built with SwiftUI + SwiftData. App coming soon to the App Store.

- All data stays on-device
- No accounts, no ads, no tracking
- iOS 26+ · iPhone only

---

## License

Website content and design © 2026 RoamFolio. All rights reserved.

The logo and brand assets in this repository are proprietary and may not be reproduced or used without permission.
