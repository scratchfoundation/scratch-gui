# AGENTS.md — scratch-gui

Guidelines for AI coding agents working on the scratch-gui repository.

## Project Overview

scratch-gui is a set of **React 16** components that form the interface for creating and running **Scratch 3.0** projects. It uses **Redux** for state management, **Webpack** for bundling, and **CSS Modules** (with PostCSS) for styling.

> **Note:** This repository has been migrated to the [`scratch-editor`](https://github.com/scratchfoundation/scratch-editor) mono-repo. New issues and PRs should be opened there.

## Environment Setup

- **Node.js:** v20 (see `.nvmrc`)
- **Package manager:** npm (use `npm install` to set up, `npm ci` for clean installs in CI)

```bash
npm install
npm start          # Dev server at http://localhost:8601/
```

## Project Structure

```
src/
  components/      # Presentational (stateless) React components — one folder per component
  containers/      # Stateful React components (class-based, connected to Redux)
  reducers/        # Redux reducers — one file per slice
  lib/             # Utilities, HOCs, helpers, and libraries
  css/             # Shared CSS variables (colors, units, typography, z-index)
  playground/      # Dev/debug entry points (gui, player, blocks-only, etc.)
  examples/        # Example extension code
test/
  unit/            # Unit tests (mirrors src/ structure: components/, containers/, reducers/)
  integration/     # Integration tests (headless browser via Selenium/Chromedriver)
  smoke/           # Smoke tests
  __mocks__/       # Jest mocks for files, styles, and editor messages
  helpers/         # Test setup (Enzyme configuration)
  fixtures/        # Test fixture data
static/            # Static assets served alongside the build
docs/              # Documentation assets (diagrams)
scripts/           # Build/publish helper scripts
```

## Architecture & Patterns

### Component Model

- **Presentational components** live in `src/components/<name>/` with a `.jsx` file + a co-located `.css` file. They are stateless functional components that receive data and callbacks via props.
- **Container components** live in `src/containers/` as class-based React components connected to Redux via `react-redux`'s `connect()`.
- Components use `PropTypes` for prop validation. Always define `.propTypes` and `.defaultProps` as static properties after the component declaration.
- Use `lodash.bindall` in container constructors to bind methods.

### Higher-Order Components (HOCs)

The project heavily uses HOCs (located in `src/lib/`) to compose behavior. HOC files use the naming convention `*-hoc.jsx`. They are composed using Redux's `compose()` utility.

### State Management

- Redux store structure: all GUI state lives under `state.scratchGui.*` (see `src/reducers/gui.js` for the full combined reducer).
- Each reducer file exports a default reducer function AND named exports for initial state (e.g., `alertsInitialState`).
- The project state machine in `src/reducers/project-state.js` is critical — see `docs/project_state_diagram.svg` for the full state diagram.

### Internationalization (i18n)

- Uses `react-intl` v2 for translations.
- All user-facing text must use `<FormattedMessage>` or `intl.formatMessage()` — **no string literals in JSX** (enforced by `react/jsx-no-literals` ESLint rule).
- Translation message IDs follow the pattern `gui.<component>.<messageName>`.

## Coding Conventions

### JavaScript / JSX

- **ES6 modules** only in `src/` — `import/export` syntax, no CommonJS (`require`/`module.exports` is forbidden in `src/` via ESLint `import/no-commonjs`).
- CommonJS is allowed in config files at the project root (`webpack.config.js`, `.eslintrc.js`, `commitlint.config.js`, etc.).
- **Indentation:** 4 spaces (see `.editorconfig`).
- **Line endings:** LF.
- **Trailing whitespace:** trimmed.
- **Final newline:** always insert.
- ESLint extends `scratch`, `scratch/es6`, and `scratch/react` configs (see `src/.eslintrc.js`).
- No Node.js built-in modules in `src/` (enforced by `import/no-nodejs-modules`).
- No mutable exports (enforced by `import/no-mutable-exports`).

### CSS

- **CSS Modules** with PostCSS — styles are imported as objects (e.g., `import styles from './button.css'`).
- Class names use `kebab-case` in CSS files (e.g., `.outlined-button`), which map to `camelCase` in JS (e.g., `styles.outlinedButton`).
- Shared design tokens live in `src/css/`:
  - `colors.css` — color palette using `$variable` syntax (PostCSS simple vars)
  - `units.css` — spacing and sizing units
  - `typography.css` — font definitions
  - `z-index.css` — z-index layers
- Import shared variables with `@import "../../css/colors.css"` (or the appropriate relative path).
- Support RTL layouts: use `[dir="ltr"]` and `[dir="rtl"]` selectors where directional styles are needed.
- Use `classnames` library for conditional class composition.

### File Naming

- Components: `kebab-case` folder with matching `.jsx` and `.css` files (e.g., `src/components/action-menu/action-menu.jsx`).
- Containers: single `kebab-case.jsx` file (e.g., `src/containers/costume-tab.jsx`).
- Reducers: `kebab-case.js` files (e.g., `src/reducers/project-state.js`).
- HOCs: `kebab-case-hoc.jsx` (e.g., `src/lib/font-loader-hoc.jsx`).
- Tests: `<name>.test.jsx` or `<name>.test.js`, mirroring the `src/` directory structure under `test/unit/`.

## Linting

```bash
npm run test:lint        # ESLint for .js and .jsx files
```

ESLint configuration:
- Root: `.eslintrc.js` — extends `scratch`, `scratch/node`, `scratch/es6`
- Source: `src/.eslintrc.js` — extends `scratch`, `scratch/es6`, `scratch/react`, `plugin:import/errors`
- Tests: `test/.eslintrc.js` — extends `scratch/react`, `scratch/es6`, `plugin:jest/recommended`

Ignored paths (`.eslintignore`): `node_modules/`, `build/`, `dist/`, `test/`, `src/examples/`.

Always run lint before committing. Fix all ESLint errors — do not add `eslint-disable` comments unless absolutely necessary and document why.

## Testing

### Unit Tests

```bash
npm run test:unit                           # Run all unit tests
npm run test:unit -- --watch                # Watch mode
npx jest --runInBand test/unit/components/button.test.jsx   # Single file
```

- Framework: **Jest** (v21) with **Enzyme** (v3, using `enzyme-adapter-react-16`).
- Snapshot testing with `react-test-renderer`.
- Tests mirror `src/` structure: `test/unit/components/`, `test/unit/containers/`, `test/unit/reducers/`.
- Mocks are in `test/__mocks__/` (file assets, CSS modules, editor messages).
- **Do not modify existing tests** to make them pass — fix the source code instead.

### Integration Tests

```bash
npm run build                 # Build first (required)
npm run test:integration      # Run all integration tests
```

- Uses **Selenium WebDriver** with headless Chrome/Chromium.
- Set `USE_HEADLESS=no` to watch the browser during test execution.

### Full Test Suite

```bash
npm test    # Runs: lint -> unit tests -> build -> integration tests
```

## Build

```bash
npm run build          # Build playground in build/ (and dist/ in production mode)
npm run clean          # Remove build/ and dist/
npm run watch          # Webpack watch mode
```

- `build/` — playground/debug builds (entry points: gui, player, blocks-only, compatibility-testing).
- `dist/` — library build for consumption by other packages. Only built in production mode or with `BUILD_MODE=dist`.
- Dev server runs on port **8601** by default (configurable via `PORT` env var).

## Commits

- **Conventional Commits** format is required (enforced by `commitlint` with `@commitlint/config-conventional`).
- Husky git hook runs `commitlint` on the `commit-msg` hook.
- Common prefixes: `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`, `test:`, `perf:`, `ci:`.
- Example: `fix: prevent crash when loading empty project`
- Messages starting with `chore(release):` are ignored by commitlint (used for automated releases).
- Commitizen is configured with `cz-conventional-changelog` for interactive commit creation.

## CI/CD

GitHub Actions workflow (`.github/workflows/ci-cd.yml`):

1. **Lint** — `npm run test:lint`
2. **Unit Tests** — `npm run test:unit` with coverage and JUnit reporter
3. **Build** — `npm run build` (production mode, `NODE_OPTIONS=--max-old-space-size=4000`)
4. **Integration Tests** — `npm run test:integration` with JUnit reporter
5. **Semantic Release** — automated versioning and npm publishing
6. **Deploy** — playground deployed to GitHub Pages (on `develop`/`master`/`main` branches)

A separate workflow (`.github/workflows/commitlint.yml`) lints commit messages on pull requests.

## Branching & Pull Requests

- Follow **GitHub Flow**: branch from `develop`, create a PR back to `develop`.
- Main branches: `master`, `develop`, `hotfix/*`.
- Semantic release is configured for `develop` (default channel), `hotfix/*`, and `beta` branches.
- PR template is at `.github/PULL_REQUEST_TEMPLATE.md` — fill in: Resolves, Proposed Changes, Reason, Test Coverage, and Browser Coverage sections.
- Keep changes minimal and focused — avoid radical refactors without coordination.

## Key Dependencies

| Package | Purpose |
|---|---|
| `react` / `react-dom` (^16) | UI framework (peer dependency) |
| `redux` / `react-redux` | State management |
| `react-intl` (^2) | Internationalization |
| `scratch-vm` | Scratch virtual machine |
| `scratch-blocks` | Block editor (Blockly fork) |
| `scratch-paint` | Costume/sprite paint editor |
| `scratch-render` | WebGL-based stage renderer |
| `scratch-storage` | Asset storage layer |
| `scratch-l10n` | Localization data |
| `classnames` | Conditional CSS class composition |
| `prop-types` | Runtime prop type checking |
| `immutable` (^3) | Immutable data structures (used in monitors) |

## Browser Support

See `.browserslistrc`:
- Chrome >= 63
- Edge >= 15
- Firefox >= 57
- Safari >= 11
- Android >= 63
- iOS >= 11

## Common Pitfalls

- Always use `<FormattedMessage>` or `intl.formatMessage()` for any text visible to users — raw string literals in JSX will cause lint errors.
- CSS class names in `.css` files use `kebab-case` but are accessed in JS as `camelCase` due to CSS Modules.
- The project uses React 16 — do not use hooks or any React 17+ features.
- Do not import Node.js built-in modules in source code under `src/`.
- Integration tests require a full build (`npm run build`) before they can run.
- The `dist/` build is skipped in development unless `BUILD_MODE=dist` or `NODE_ENV=production` is set.
