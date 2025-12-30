### Project Development Guidelines — company_home

Last verified: 2025-12-19 09:49 (local)

This repository is a Gatsby v5 (React 18) website tailored for a Korean company site. The guidance below focuses on repo-specific build, content, testing, and troubleshooting details.

---

#### Build and Configuration

- Node.js: Use LTS Node 18.x or 20.x. Gatsby 5 requires modern Node features; older Node versions can fail during dependency install or build.
- Install dependencies:
  - `npm ci` on CI for reproducible installs, or `npm install` locally.
- Core scripts (see `package.json`):
  - `npm run develop` or `npm start` — start dev server on `http://localhost:8000`.
  - `npm run build` — production build into `public/`.
  - `npm run serve` — serve the built `public/` locally for verification.
  - `npm run clean` — clear Gatsby cache (use this when schema/content changes aren’t reflected).
- Gatsby configuration (`gatsby-config.js`):
  - Plugins in use:
    - `gatsby-plugin-image`, `gatsby-plugin-sharp`, `gatsby-transformer-sharp` for responsive images.
    - `gatsby-source-filesystem` for `src/images` and `src/content`.
    - `gatsby-transformer-remark` for Markdown content.
    - `gatsby-plugin-manifest` for PWA manifest; icon at `src/images/gatsby-icon.png`.
    - `gatsby-plugin-svgr` and `gatsby-plugin-react-svg` for SVG handling.
  - `siteMetadata` is set for title/description/author/url.
- Node build pipeline (`gatsby-node.js`):
  - All Markdown under `src/content` is transformed by Remark and pages are programmatically created.
  - Path strategy:
    - The top-level directory under `src/content` (e.g., `press`, `company`, etc.) becomes a base path segment.
    - The page slug is taken from frontmatter `slug`; if missing, it falls back to the file name.
    - Final path shape: `/${topLevelDir}/${slug}` (or `/${slug}` if no top-level dir).
  - Template used: `src/templates/markdown-page-temp.js` (ensure it exists for new content types).
- Static vs. sourced assets:
  - Files in `static/` are served verbatim under the site root at build time (`static/images/press/press_1.png` → `/images/press/press_1.png`). Prefer this for immutable assets referenced by Markdown or external links.
  - For build-time image processing (blur-up, responsive, GraphQL queries), put images in `src/images` and query via `gatsby-plugin-image`.

---

#### Content and Page Structure

- Primary UI is under `src/components` and `src/pages`.
  - Navigation components: `src/components/header.js` and `src/components/subpage-header.js` implement dropdowns for 회사소개/솔루션/홍보센터.
  - Page groups: `src/pages/company/*`, `src/pages/solutions/*`, `src/pages/projects/*`, and `src/pages/press/*`.
  - Reusable layout: `src/components/layout.js` wraps pages and likely injects header/footer.
- Markdown content lives in `src/content/**`. Typical file layout:
  - `src/content/press/news-*.md` with frontmatter including `slug`.
  - Ensure each Markdown has frontmatter `slug` (or accept filename fallback). Missing/duplicate slugs can create path conflicts.
- When adding a new content area:
  - Create directory `src/content/<section>/` and add Markdown files with frontmatter `slug`.
  - Update any templates under `src/templates/*` as needed, or expand `markdown-page-temp.js` to render section-specific layouts based on `context.id`.

---

#### Development Workflow

- Start the dev server:
  - `npm run develop`
  - GraphiQL is available at `http://localhost:8000/___graphql` for exploring the Gatsby data layer (Markdown, images, etc.).
- Common cache issues:
  - After adding new Markdown fields or changing filesystem paths, run `npm run clean && npm run develop`.
- CSS & styling:
  - CSS Modules are used (e.g., `header.module.css`, `index.module.css`). Import as `import * as styles from './file.module.css'` and reference `styles.className` in JSX.
  - Global CSS should be avoided unless explicitly needed; prefer modules for scoping.

---

#### Testing

Current state:
- No Jest or React Testing Library is configured. The default `npm test` script intentionally exits with an error to prompt adding tests.

Quick ad-hoc test (Node assert) — used here to demonstrate the process without adding dependencies:
- Example file: `.junie/demo_test.js` using Node’s built-in `assert/strict`.
- How to run:
  - `node .junie/demo_test.js`
- Result verified: On 2025-12-19, this demo test ran successfully and printed: "Demo test passed: basic arithmetic and Array.map behavior are correct." The demo file has been removed after verification to avoid repository noise.

Recommended project test setup (future work):
- Unit/Component tests:
  - Add dev deps: `npm i -D jest @testing-library/react @testing-library/jest-dom babel-jest @babel/preset-env @babel/preset-react identity-obj-proxy`
  - Create `jest.config.js` with transform for JS/JSX and CSS module mocking via `identity-obj-proxy`.
  - Add `setupTests.js` to register `@testing-library/jest-dom`.
  - Update `package.json` scripts: `"test": "jest --watchAll=false", "test:watch": "jest"`.
  - For Gatsby v5, mock `gatsby` module globals if needed (e.g., `__PATH_PREFIX__`).
- Integration/content tests:
  - For Markdown-derived pages, validate page creation via querying the built GraphQL schema in a `gatsby build` step on CI.
  - Optionally add Playwright for end-to-end validation of generated routes (e.g., `/press/<slug>` loads and renders expected headings/images).

Minimal content test pattern (without Jest), if needed quickly:
- Write a Node script that loads Markdown from `src/content`, parses frontmatter (using `gray-matter` if added), and asserts `slug` uniqueness. This guards against duplicate routes. Run it on CI pre-build.

---

#### Code Style and Conventions

- Formatting: Prettier is configured; run `npm run format` to apply formatting to `**/*.{js,jsx,ts,tsx,json,md,css}`.
- React patterns:
  - Functional components with hooks; avoid legacy lifecycles.
  - Keep dropdown/menu UI state locally (see `header.js` pattern with `useState`).
- Routing & Links:
  - Use `gatsby-link` (i.e., `Link` component) for internal navigation to leverage prefetching and avoid full reloads.
- Images:
  - Prefer `StaticImage`/`GatsbyImage` for performance-critical images in components.
  - Use `static/` for files referenced from Markdown or where build-time image processing is unnecessary.

---

#### Troubleshooting (Repo-Specific)

- Build fails on Markdown page creation:
  - Check that `src/templates/markdown-page-temp.js` exists and supports the queried fields.
  - Ensure each Markdown has `frontmatter.slug` or a valid fallback filename; avoid spaces or non-URL-safe characters.
- Changes not appearing:
  - Run `npm run clean` then restart `npm run develop`.
- Image issues:
  - If using `GatsbyImage`, ensure the image is under `src/images` and that GraphQL queries request `childImageSharp` fields.
  - For hotlinking static images (e.g., press images), ensure paths match under `/images/...` as emitted from `static/`.
- SVGs:
  - For inline React components from SVG, import via `svgr` and verify plugin order. For file-url usage, use regular imports.
- SSR/CSR mismatches:
  - Guard browser-only code with `typeof window !== 'undefined'`.
- Port conflicts:
  - Dev server default is 8000; override with `GATSBY_PORT=xxxx gatsby develop` if needed.

---

#### CI/CD Hints

- Use `npm ci` and cache `~/.npm` and `.cache/`/`public/` cautiously (cache invalidation can cause stale pages).
- Run a content validation script (slug uniqueness) before `gatsby build` to fail fast on routing collisions.

---

#### One-Time Demo Test (Executed and Cleaned Up)

- Created `.junie/demo_test.js` with Node’s `assert` to demonstrate running a simple test without adding dependencies.
- Executed successfully via `node .junie/demo_test.js`.
- File removed after verification; keep the approach documented here for quick checks without adding a full test stack.
