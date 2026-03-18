# semantic-ui-explorer

A simple React application for exploring the accessibility of UI controls in [Semantic UI for React](https://react.semantic-ui.com/).

## Purpose

This project lets you render Semantic UI components and inspect how they work from an accessibility perspective — using browser devtools, screen readers, or automated accessibility testing tools.

The initial focus is on the **Dropdown** component.

## Getting Started

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
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
