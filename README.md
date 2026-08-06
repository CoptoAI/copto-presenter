# Copto Presenter

[![Copto Presenter CI](https://github.com/CoptoAI/copto-presenter/actions/workflows/ci.yml/badge.svg)](https://github.com/CoptoAI/copto-presenter/actions/workflows/ci.yml)
[![GitHub Pages Deployment](https://img.shields.io/badge/Live--PWA-Copto%20Presenter-sky.svg)](https://coptoai.github.io/copto-presenter)
[![NPM Version](https://img.shields.io/npm/v/@copto/presenter.svg?color=amber)](https://www.npmjs.com/package/@copto/presenter)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

**Copto Presenter** is a free, open-source, 100% offline-capable Progressive Web Application (PWA) and Liturgical API Platform developed by **[CoptoAI](https://github.com/CoptoAI)** for Coptic Orthodox church services.

It features **Dual-Screen Projector Control** (Screen 1 Operator Control Panel + Screen 2 Fullscreen Projector View), dynamic Coptic Calendar calculations, Coptic Liturgical Season resolution, multilingual text alignment (Coptic, English, Arabic), and traditional Coptic web font rendering (*Avva Shenouda*).

---

## 🌟 Key Features

* **Dual-Screen Presenter Engine**: Split window control allowing the church operator to control slide navigation, preview upcoming prayers, and trigger slide transitions while streaming high-contrast full-screen slides to projectors.
* **100% Offline Resilience**: Powered by Workbox PWA service workers and IndexedDB storage; operates completely without internet connectivity.
* **Coptic Liturgical Calendar & Seasons**: Automatic calculation of Coptic dates, leap years, and liturgical seasons (Joyful, Fasting, Pascha, Pentecost).
* **Multilingual Rendering**: Parallel, side-by-side, or stacked view of Coptic, English, and Arabic texts.
* **Static REST API & NPM SDK**: Pre-rendered REST API endpoints and `@copto/presenter` npm package for third-party mobile apps and web developers.

---

## 🚀 Quickstart

### Running Locally

```bash
git clone https://github.com/CoptoAI/copto-presenter.git
cd copto-presenter
npm install --legacy-peer-deps
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Using as an NPM Library (`@copto/presenter`)

Install the package in any React, React Native, Vue, or Node.js project:

```bash
npm install @copto/presenter
```

```typescript
import { getCopticDate, resolveLiturgicalSeason, buildLiturgicalService } from '@copto/presenter';

// Calculate Coptic Date
const copticDate = getCopticDate(new Date());
console.log(`${copticDate.copticDay} ${copticDate.copticMonthName} ${copticDate.copticYear}`);

// Resolve Liturgical Season
const season = resolveLiturgicalSeason(new Date());
console.log(`Liturgical Season: ${season.seasonName} (${season.rite})`);

// Build Liturgical Service
const service = buildLiturgicalService('LITURGY_OF_THE_WORD');
```

---

## 🌐 Public Liturgical REST API Endpoints

Copto Presenter exposes free, globally cached static REST API endpoints hosted on GitHub Pages:

* **Today's Coptic Date & Season**: `https://coptoai.github.io/copto-presenter/api/v1/calendar/today.json`
* **Service Catalog**: `https://coptoai.github.io/copto-presenter/api/v1/services/list.json`
* **Liturgy of the Word**: `https://coptoai.github.io/copto-presenter/api/v1/services/LITURGY_OF_THE_WORD.json`

Open API Specification is available in [docs/openapi.yaml](docs/openapi.yaml).

---

## 🤝 Contributing

Please read [CONTRIBUTING.md](.github/CONTRIBUTING.md) before submitting pull requests.

## 📄 License

Licensed under the [MIT License](LICENSE). Developed with ❤️ by **CoptoAI**.
