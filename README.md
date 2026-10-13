# Ulam Spiral & Prime-Generating Quadratic Explorer

[한국어 README](README.ko.md)
<img width="1141" height="724" alt="image" src="https://github.com/user-attachments/assets/c274ae9d-a1a8-4ea2-a2e1-8f1540010685" />

A standalone HTML web application for exploring the **Ulam spiral from 1 to 1 trillion (10¹²)** and discovering quadratic polynomials that generate unusually many prime numbers.

## Getting Started

- **Online:** Once GitHub Pages is enabled, the application can be launched directly in a browser through `index.html`.
- **Standalone:** Download [`Ulam Spiral & Prime-Generating Quadratic Explorer.html`](Ulam%20Spiral%20%26%20Prime-Generating%20Quadratic%20Explorer.html) and open it in a browser.
- No installation or separate backend server is required.

## Features

- **Explore up to 1 trillion:** Only the prime data needed for the current viewport and nearby regions is computed. Previously calculated data can be reused from the cache. The application does not generate all primes up to 1 trillion in advance.
- **Ulam spiral visualization:** Jump to specific integers, pan and zoom, select points, and visualize prime numbers.
- **Prime-generating quadratic analysis:** Express lattice lines passing through a selected point as quadratic polynomials and analyze their prime ratios. Supports basic directions as well as various integer and rational slopes.
- **Quadratic polynomial search:** Search coefficient candidates `a`, `b`, and `c`, prefilter them using small primes, and verify the prime ratios of the most promising candidates. **A single search can cover at most 7,000,000 values of c.**
- **Saved sequences:** Store favorite sequences in the browser's local storage and retrieve them later.
- **Minimap and bilingual interface:** Mobile-aware UI, adjustable minimap ranges, and English/Korean language switching.

## How Computation Scales to 1 Trillion

The application does not calculate and store the primality of every integer up to 1 trillion. Instead, it **computes only the prime data required for the currently visible region**, taking advantage of the geometric properties of the Ulam spiral, where numbers along its branches correspond to short consecutive integer intervals.

At distant corners, two different branch regions are processed using a shared Web Worker budget, and the computed results are stored in caches. The application uses WebAssembly and Web Workers, with JavaScript fallback implementations for supported processing paths.

To reduce unnecessary full-frame rendering during computation, intermediate corner updates are limited to approximately **160 ms intervals**, while the final result is scheduled for rendering immediately upon completion.

## How to Use

1. Open the standalone HTML file or launch the application through GitHub Pages.
2. Enter a positive integer up to 1 trillion in the **Go** field, or navigate by panning the view.
3. Click a point to analyze quadratic polynomials passing through it.
4. Use **Search** to discover new sequences and **Saved** to store them.

The first visit to a region may require additional computation. Cached data from previous visits may be retained or evicted depending on available memory.

The minimap's continuous prime-density background is an **approximate visualization**, not an exhaustive calculation of actual primes.

## Repository Structure

| File | Description |
|---|---|
| `index.html` | Main GitHub Pages entry point; complete standalone application |
| `Ulam Spiral & Prime-Generating Quadratic Explorer.html` | Standalone distribution with the official filename |
| `README.md` | English introduction |
| `README.ko.md` | Korean introduction |
| `CHANGELOG.md` | Record of major changes |
| `scripts/verify_release.py` | Verifies that both HTML files are identical and checks the release structure |

## Development History

**100 million → 400 million → 900 million → … → 4.9 billion → 10 billion → 1 trillion.**

Initially, the goal was to increase the range that could be processed by a complete prime sieve. The algorithms and caching architecture have since evolved to compute only the necessary regions of the Ulam spiral.

## System Requirements and Limitations

Recent Chromium-based browsers, Firefox, and other browsers supporting WebAssembly and Web Workers are recommended.

Performance depends on the CPU, available memory, browser, and viewport size.

Saved sequences are stored locally in each browser and are not automatically synchronized across devices.

## License

This project is distributed under the **MIT License**.

Copyright (c) 2026 지너드, G.nerd (eprparadox44)

Anyone may use, modify, and redistribute the software, including for commercial purposes. However, the original copyright notice and MIT License notice must be preserved when redistributing the software.

See the [LICENSE](LICENSE) file for details.
