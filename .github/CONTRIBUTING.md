# Contributing to Copto Presenter

Thank you for your interest in contributing to **Copto Presenter** under the **CoptoAI** organization! We welcome contributions from developers, translators, and theologians to help build the ultimate Coptic Orthodox presentation platform and API.

## Ways to Contribute

1. **Liturgical Content**: Submit missing Coptic, English, or Arabic texts for prayers, hymns, and readings in `docs/`.
2. **Feature Development**: Improve the PWA web app, dual-screen presenter controls, or API endpoints.
3. **Bug Reports & Corrections**: Report typos, liturgical formatting errors, or UI bugs via GitHub Issues.

## Development Setup

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/CoptoAI/copto-presenter.git
   cd copto-presenter
   ```
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Start the local dev server:
   ```bash
   npm run dev
   ```
4. Run tests and type checks:
   ```bash
   npx vitest run
   npx tsc --noEmit
   ```

## Pull Request Guidelines

- Ensure all Vitest unit tests pass (`npx vitest run`).
- Verify TypeScript compilation has 0 errors (`npx tsc --noEmit`).
- Ensure all submitted liturgical JSON files conform to standard schema keys (`coptic`, `english`, `arabic`).
