# Ulam Spiral & Prime-Generating Quadratic Explorer

[한국어 README](README.ko.md) · [Publication guide (한국어)](PUBLISHING.ko.md)

Explore the **Ulam spiral** and discover **prime-generating quadratic polynomials** within the range **1 to 1,000,000,000,000 (10¹²)**. This is a self-contained browser application, designed to keep exploration responsive without sieving the entire trillion-integer range.

## Try it

- **GitHub Pages:** once Pages is enabled, the app opens directly at your site's root URL (`index.html`).
- **Offline / local:** download and open **[`Ulam Spiral & Prime-Generating Quadratic Explorer.html`](Ulam%20Spiral%20%26%20Prime-Generating%20Quadratic%20Explorer.html)** in a modern desktop or mobile browser.
- The app starts at Ulam number **1**. You can jump to a number, pan/zoom, inspect prime points and explore polynomial patterns.

> No server, package installation, build tool, external JavaScript library or remote prime database is required for the supplied HTML file. Browser support for JavaScript, WebAssembly and Web Workers is recommended.

## Features

- **1T range:** Navigate the integer range 1–10¹². Only the visible region and nearby data are processed; the app does **not** precompute every prime below 10¹².
- **Ulam spiral:** Pan, zoom, jump to an integer, inspect numbers and highlight prime points.
- **Quadratic explorer:** Analyze quadratic patterns through a selected point, including recommended and additional slopes.
- **Sequence search:** Search polynomial parameters with small-prime prefiltering and exact sieve-backed verification of selected candidates; a **single c-search covers at most 7,000,000 values**.
- **Saved sequences:** Save and restore favorite quadratics in browser-local storage.
- **Minimap and bilingual UI:** English/Korean toggle, mobile-aware controls and several minimap ranges.
- **Responsive computation:** Specialized branch/corner cache paths, parallel workers, embedded WebAssembly kernels (with JavaScript fallback where implemented), and throttling of intermediate corner previews to avoid redundant full-frame redraws.

## How the 1T range works

Instead of building one giant sieve for all integers up to 10¹², the app uses **view-local prime caches** and adapts its sieve work to the Ulam spiral geometry. For distant views, many rows or columns map to short consecutive number sequences. Along a corner, two mathematical branches can be processed with a shared worker budget. The completed results are cached and reused for revisits.

WebAssembly handles supported hot paths, while Web Workers allow prime computations and quadratic statistics to run outside the main UI thread. Intermediate redraws during corner calculation are rate-limited (~160 ms), with a final render requested immediately on completion.

## Usage tips

1. Open the page (or the standalone HTML file).
2. Use **Go / 이동** to jump to an integer within 1–10¹², and use zoom or drag to explore.
3. Click a point to inspect the associated quadratic sequences.
4. Use **Search / 탐색** to look for interesting coefficients, and **Saved / 저장** to preserve favorites.

The first visit to a region may require local computation. Subsequent visits can reuse cached prime data, subject to memory limits. The minimap background's smooth prime-density layer is an **estimate**, not a pixel-by-pixel prime census.

## File layout

| File | Purpose |
| --- | --- |
| [`index.html`](index.html) | GitHub Pages entry point; full standalone application |
| [`Ulam Spiral & Prime-Generating Quadratic Explorer.html`](Ulam%20Spiral%20%26%20Prime-Generating%20Quadratic%20Explorer.html) | Identical, official standalone download filename |
| [`README.ko.md`](README.ko.md) | Detailed Korean introduction |
| [`PUBLISHING.ko.md`](PUBLISHING.ko.md) | How to publish with GitHub Pages |
| [`CHANGELOG.md`](CHANGELOG.md) | Release notes |
| [`scripts/verify_release.py`](scripts/verify_release.py) | Ensures both HTML copies match and validates release structure |

**Important:** `index.html` and the officially named HTML are byte-for-byte identical for this release. When updating the app, replace **both** with the same content, or run the verification script to detect drift.

## Browser support and scope

- This release is intended for recent Chromium-based browsers, Firefox and other modern browsers with WebAssembly and Web Workers. Performance depends on browser, CPU, memory and viewport.
- The upper supported bound is **10¹²**, not 10¹⁴ or 10¹⁸.
- Timings measured in a browser are not guarantees for all hardware, screen presentations or GPU pipelines.
- Saved sequences use the user's local browser storage and do not automatically sync between devices.

## Project history

The exploration range grew from **100 million → 400 million → 900 million → … → 4.9 billion → 10 billion → 1 trillion**. Replacing whole-range precomputation with selective sieving and geometry-aware processing made the largest jump practical.

## License

Licensed under the MIT License.

Copyright (c) 2026 지너드, G.nerd (eprparadox44)

See [LICENSE](LICENSE) for details.
