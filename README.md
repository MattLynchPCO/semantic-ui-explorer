# semantic-ui-explorer

A simple React application for exploring the accessibility of UI controls in [Semantic UI for React](https://react.semantic-ui.com/).

## Purpose

This project lets you render Semantic UI components and inspect how they work from an accessibility perspective — using browser devtools, screen readers, or automated accessibility testing tools.

The initial focus is on the **Dropdown** component.

## Getting Started

### GitHub Codespaces (recommended)

Click **Code → Codespaces → Create codespace** on the repository page. The
devcontainer will automatically install dependencies. Once the codespace is
ready, run:

```bash
npm run dev
```

The Codespaces port-forwarding proxy will detect port 5173 and open a browser
tab pointing at the forwarded URL so you can interact with the app straight away.

### Local development

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/)
- [Semantic UI React](https://react.semantic-ui.com/) (`semantic-ui-react`)
- [Semantic UI CSS](https://semantic-ui.com/) (`semantic-ui-css`)

## Exploring Accessibility

Open the running app and use the following tools to inspect the Dropdown component:

- **Browser DevTools** → Accessibility panel (Chrome/Edge) or Accessibility Inspector (Firefox)
- **Screen reader** (e.g. NVDA, VoiceOver, JAWS) to test keyboard navigation and announcements
- **axe DevTools** browser extension for automated accessibility checks

Key attributes to look at on the Dropdown:

| Attribute | Expected value |
|---|---|
| `role` | `listbox` or `combobox` |
| `aria-expanded` | `true` when open, `false` when closed |
| `aria-haspopup` | `listbox` |
| `aria-labelledby` / `aria-label` | references the visible label |

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run build:pages` | Production build with GitHub Pages base path |
| `npm run deploy` | Build and publish `dist` to `gh-pages` branch |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Publishing to GitHub Pages

You now have two ways to publish this app so anyone can access it:

### Option 1: Manual deploy from GitHub Actions (recommended)

This repo includes a manual workflow at `.github/workflows/deploy-pages.yml`.

1. Push your latest changes to `main`.
2. In GitHub, open **Actions**.
3. Select **Deploy GitHub Pages**.
4. Click **Run workflow**.

The site is deployed only when you trigger it, so you get an on-demand publish flow.

### Option 2: Manual deploy from your machine

Run:

```bash
npm run deploy
```

That command builds with the correct base path and pushes `dist` to a `gh-pages`
branch using the `gh-pages` package.

### GitHub repo settings (one-time)

In **Settings → Pages**:

- Set **Source** to **GitHub Actions** (for Option 1), or
- Set **Source** to **Deploy from a branch** and pick `gh-pages` (for Option 2).

Your public URL will be:

`https://MattLynchPCO.github.io/semantic-ui-explorer/`
