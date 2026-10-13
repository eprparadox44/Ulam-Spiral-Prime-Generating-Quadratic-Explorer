# Ulam Spiral & Prime-Generating Quadratic Explorer

[한국어 README](README.ko.md)

Explore the **Ulam spiral** and discover **prime-generating quadratic polynomials** within the range **1 to 1,000,000,000,000 (10¹²)**.

This is a self-contained browser application designed to keep exploration responsive without sieving the entire trillion-integer range.

## Try It

- **GitHub Pages:** [Launch the Ulam Spiral & Prime-Generating Quadratic Explorer](https://eprparadox44.github.io/Ulam-Spiral-Prime-Generating-Quadratic-Explorer/) directly in your browser.
- **Offline / Local:** Download and open [**`Ulam Spiral & Prime-Generating Quadratic Explorer.html`**](Ulam%20Spiral%20%26%20Prime-Generating%20Quadratic%20Explorer.html) in a modern desktop or mobile browser.
- The app starts at Ulam number **1**. You can jump to a number, pan and zoom, inspect prime points, and explore polynomial patterns.

> No server, package installation, build tool, external JavaScript library, or remote prime database is required for the supplied HTML file. A modern browser with JavaScript, WebAssembly, and Web Workers is recommended.

## Features

- **1T Range:** Navigate the integer range 1–10¹². Only the visible region and nearby data are processed; the app does **not** precompute every prime below 10¹².
- **Ulam Spiral:** Pan, zoom, jump to an integer, inspect numbers, and highlight prime points.
- **Quadratic Explorer:** Analyze quadratic patterns through a selected point, including recommended and additional lattice slopes.
- **Sequence Search:** Search polynomial parameters with small-prime prefiltering and exact sieve-backed verification of selected candidates. A **single c-search covers at most 7,000,000 values**.
- **Saved Sequences:** Save and restore favorite quadratic polynomials using browser-local storage.
- **Minimap and Bilingual UI:** English/Korean language
