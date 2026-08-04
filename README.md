# slidev-theme-luebeck

Beamer **Luebeck**-style theme for [Slidev](https://sli.dev). Dual header bars (section / subsection), three-band footer, and CMU Bright KaTeX.

## Install

### From npm (after publishing)

```bash
npm install slidev-theme-luebeck
```

```yaml
---
theme: slidev-theme-luebeck
title: Full Title
author: Full Name
title_short: Short Title # optional, footer
institute_short: ORG # optional, footer
date: August 2026
---
```

### From a cloned repo

```bash
git clone https://github.com/briangodwinlim/slidev-theme-luebeck.git
cd slidev-theme-luebeck
npm install
```

In your presentation project, point `theme` at the clone path, or `npm link` this directory.

### Local development (this repo)

```yaml
---
theme: ./
---
```

Run the bundled demo deck:

```bash
npm install
npm run dev
```

## Sections

Set on the first slide of each section (and optionally update `subsection` per slide):

```yaml
---
section: Methodology
subsection: Data Collection
---
```

## Layouts

| Layout | Description |
|--------|-------------|
| `cover` | Title slide with blue band |
| `default` | Content slide with full-width blue `# Title` bar |
| `notitle` | Content without styled title bar |
| `bibliography` | References slide with Beamer-style list |

## Citations & bibliography

This theme ships BibTeX support via [`@jxpeng98/markdown-it-citation`](https://www.npmjs.com/package/@jxpeng98/markdown-it-citation) (citation-js + CSL). No extra setup is required beyond placing a `.bib` file next to your deck.

**Default style:** APA author–year (`citationStyle: apa`). For IEEE-style numbered cites, add `citationStyle: ieee` and `showNum: true`.

### 1. Configure in deck frontmatter

```yaml
---
theme: slidev-theme-luebeck
bibliography: references.bib   # default: references.bib
citationStyle: apa               # default: apa (author–year)
---
```

`bibFile` / `bibStyle` are accepted as aliases for `bibliography` / `citationStyle`.

### 2. Inline citations

| Syntax | Result |
|--------|--------|
| `@citekey` | Parenthetical, e.g. (Knuth, 1984) with APA |
| `!@citekey` | Narrative, e.g. Knuth (1984) |
| `[@citekey]` | Pandoc-style (normalized to `@citekey`) |
| `\cite{key}` | LaTeX-style (normalized to `@key`) |
| `\citet{key}` | LaTeX narrative (normalized to `!@key`) |

Example:

```markdown
Typesetting with @knuth1984 and document systems @lamport1994.
Narrative cite: !@turing1936.
```

### 3. Bibliography slide

Add a final slide with the `bibliography` layout. The theme auto-injects `[[bibliography]]` when the slide body is empty:

```markdown
---
layout: bibliography
section: References
subsection: Bibliography
---
```

You can also place the marker manually:

```markdown
# References

[[bibliography]]
```

Only entries cited in the deck (or listed under `citations:` / `references:` / `bib:` in frontmatter) appear in the list.

### 4. Citation styles

Set `citationStyle` (or `bibStyle`) to any [CSL template](https://github.com/citation-style-language/styles) supported by citation-js, for example:

| `citationStyle` | Beamer analogue |
|-----------------|-----------------|
| `apa` | Author–year (natbib `authoryear`) — **default** |
| `harvard1` | Author–year (Harvard) |
| `ieee` | Numeric / IEEE |
| `vancouver` | Numeric / Vancouver |
| `mla` | Humanities |
| `chicago-author-date` | Chicago author–date |

For fully numeric inline citations and numbered bibliography entries, use e.g. `citationStyle: ieee` with `showNum: true`.

## Components

```html
<BeamerBlock title="Definition">...</BeamerBlock>
<BeamerBlock title="Warning" type="alert">...</BeamerBlock>
<BeamerBlock title="Example" type="example">...</BeamerBlock>
```

## Frontmatter

| Field | Scope | Description |
|-------|-------|-------------|
| `title_short` | deck | Short title in footer (falls back to `title`) |
| `institute_short` | deck | Short institute in footer |
| `institute` | deck | Full institute on cover slide |
| `date_short` | deck | Short date in footer (falls back to `date`) |
| `section` | slide | Section label (left header bar) |
| `subsection` | slide | Subsection label (right header bar) |
| `bibliography` / `bibFile` | deck | Path to BibTeX file (default `references.bib`) |
| `citationStyle` / `bibStyle` | deck | CSL citation style (default `apa`) |
| `showNum` | deck | Numbered bibliography entries (default `false`; set `true` with `ieee`/`vancouver`) |
| `bibTitle` | deck | Optional bibliography heading (layout `# Title` is preferred) |

## Project structure

```
components/          LuebeckHeader, LuebeckFooter, BeamerBlock, slidev.d.ts
layouts/             cover, default, notitle, bibliography
setup/
  citations.ts       Shared citation config & collection helpers
  transformers.ts      LaTeX/Pandoc cite syntax + bibliography injection
  vite-plugins.ts      Deck-level citation config (global __luebeckConfig)
  katex.ts             KaTeX renderer options
styles/
  index.ts             Theme style entry (tokens, fonts, layouts)
  tokens.css           Design tokens (colors, spacing)
  fonts.css            Google Fonts (Lato, Roboto Slab)
  layouts.css          Layout typography, blocks, bibliography styling
  katex.css            CMU Bright KaTeX font overrides
vite.config.ts         markdown-it-citation plugin (auto-loaded by Slidev)
global-bottom.vue      Loads katex.css after Slidev's KaTeX CSS
references.bib         Sample bibliography for demo deck (git only)
slides.md              Demo / preview deck (git only)
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Preview demo deck |
| `npm run build` | Build static site from demo deck |
| `npm run export` | Export demo deck to PDF |
| `npm run screenshot` | Export demo deck to PNG (`slides-export/`, gitignored) |

## KaTeX

Math uses **CMU Bright** (sans-serif) for `KaTeX_Main`, `KaTeX_Math`, and `KaTeX_SansSerif` via jsDelivr (`computer-modern@0.1.3`). Specialized KaTeX fonts (Size1–4, Caligraphic, AMS, Fraktur, Script, Typewriter) load from `katex@0.17.0` because they use custom PUA glyph encodings that CMU Bright cannot replace.

Overrides in `styles/katex.css` are imported from `global-bottom.vue` so they apply **after** Slidev's default KaTeX serif CSS.

**CDN note:** Preview and export require network access on first load to fetch fonts from jsDelivr unless you vendor them locally.

## Publishing

1. Verify the demo deck builds: `npm run build`.
2. Log in to npm: `npm login`.
3. Publish: `npm publish --access public` (first publish of a scoped package; unscoped names like `slidev-theme-luebeck` are public by default).

The `files` field in `package.json` lists what ships on npm. Demo files (`slides.md`, `references.bib`) stay in git but are excluded via `.npmignore`.

## License

MIT — see [LICENSE](./LICENSE).
