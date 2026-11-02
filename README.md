# Ulam Spiral & Prime-Generating Quadratic Explorer

[**한국어 README**](README.ko.md)

<img width="570" height="362" alt="Ulam spiral and prime-generating quadratic explorer" src="https://github.com/user-attachments/assets/c274ae9d-a1a8-4ea2-a2e1-8f1540010685" />

An interactive, **single-file standalone HTML** application for exploring primes and quadratic sequences over **1 ≤ N ≤ 10¹⁴ (100 trillion)**.

**Current release: v1.4.7 (November 3, 2026)** · [MIT License](LICENSE).

## Launch

- [**Open online (GitHub Pages)**](https://eprparadox44.github.io/Ulam-Spiral-Prime-Generating-Quadratic-Explorer/)
- [**Download standalone HTML**](Ulam%20Spiral%20%26%20Prime-Generating%20Quadratic%20Explorer.html)

Open the HTML file in a recent browser. No installation or separate build is required.

## Explore

- Five geometries: **Square Ulam**, **Hexagonal**, **Triangular**, **Sacks spiral**, and **Klauber Triangle**.
- Navigate and zoom to 100 trillion. Prime caches, optimized Web Workers, WASM sieves and exact primality checks support distant exploration.
- Select a point to discover quadratic sequences and compare finite-range prime counts and rates; save formulas in the browser's local storage.
- Search quadratic coefficients: **c = −70,000,000 to +70,000,000** in Square/Hex/Tri/Sacks; Klauber uses a specialized **±90 million** constant-term search with an optional geometric line filter.
- Seven minimap levels: **100M / 1B / 10B / 100B / 1T / 10T / 100T**. All five modes have formula-density overlays with a maximum-brightness threshold of approximately **20% estimated prime rate** and suppression of mathematically impossible arms.
- English/Korean UI, pointer and keyboard navigation.

## What's new in v1.4.7

- Fixed **Jump to this sequence** for saved c-search formulas that have no originating point: the button now finds a genuine in-range polynomial value near the camera and navigates immediately.
- Saved formulas with a valid original source point still jump to that original point. Stale/out-of-range source points fall back to the same in-range term locator.
- No synchronous full-point analysis or primality scan was added. Verified by clicking the button in Chromium across all five geometries.

### Previous v1.4.6 changes

- Replaced the slow exact JavaScript fallback for 100-trillion Hexagonal visible-cell sieving with a newly compiled deterministic WASM prime engine (2.7 KB compressed binary, embedded in the single-file HTML). Original JS remains the fallback if WASM cannot initialize or passes neither bitmap check.
- Browser A/B (same viewport, three Workers, two regions): an interior Hex sieve finished in 40.5–40.6 ms versus 105.6–200.8 ms in v1.4.5; the thin extreme-edge region was about 20–21 ms versus 21–23 ms. Bitmaps matched exactly. Results are machine/load-specific, not guaranteed speedups.

### Previous v1.4.5 changes

- Fixed zoomed Hexagonal minimap losing the current view and highlighted prime sequence near the outer 100T rings. The zoomed map now tracks the camera instead of clamping to Square-mode coordinates.

### Previous v1.4.4 changes

- Lowered Klauber c-search bounds from ±10 billion to **±90 million**.
- Expanded the visible-line geometric filter from |slope|≥1/2 to **|slope|≥1/8**, retaining its 50,000-row continuity condition.
- Added a=1, b=−7 and b=9 to the Klauber c-search presets for 1/8-slope families.
- Updated exact interval-union prefiltering for the additional directions; custom input ranges are kept when switching modes.
- The selected-point quadratic G(n)=n²−7n+89,999,969 pictured near the outer edge spans only two physical Klauber rows, so it does not pass the unchanged 50,000-row filter; the filter can be switched off when exploring such candidates.

### Previous v1.4.3 changes

- Promoted the v1.4.2.10 (FP10) optimized implementation as the official **v1.4.3**, preserving its calculation and recommendation logic.
- Improved first-draw responsiveness across Square, Triangular, Sacks and Klauber geometries with optimized rendering/viewport paths and geometry candidate generation.
- Added geometry-verified candidate recommendations for Triangular and Klauber selected points, including faster Klauber line construction.
- Updated the selected-point *visibility bonus* to account for geometric spacing and parity; recommendation lists may intentionally differ from v1.4.2. This is not, by itself, an error in prime counts.
- Preserved the 100T navigation ceiling, five geometries, exact prime-statistics calculation path, saved formulas and bilingual interface.

### Previous v1.4.2 changes

- Fixed precision-sensitive selected-point polynomial statistics and parameter ranges by using exact integer arithmetic where needed.
- Accelerated Square Ulam redraws and zooming with reusable viewport rendering paths.
- Improved progressive prime rendering in Hexagonal, Triangular and Klauber Triangle modes.
- Added optimized exact WASM primality checks and prewarmed lattice Workers for faster first navigation to Triangular and Klauber modes.
- Accelerated selected-point quadratic statistics by reusing prime-specific modular-root preparations; the established exact calculation fallback remains available.
- Retained the five modes, 100T limit, saved formulas, minimaps and bilingual interface; no 1Q/1000T experimental expansion is included.

### Previous v1.4.0 changes

- Raised navigation ceiling from **10¹² to 10¹⁴**.
- Significantly accelerated Square Ulam loading at distant sides and corners with full-range and hybrid WASM sieve paths, viewport cache improvements and throttled intermediate redraws.
- Improved selected-point responsiveness with prewarmed statistics workers and mathematically safe parity/symmetry optimizations; fixed modulo-2 counting for odd quadratic leading coefficients.
- Unified estimated-density minimap visualization across all five spiral modes.
- Expanded the non-Klauber constant-term search while preserving Klauber-specific functionality.

See [v1.4.7 release notes](RELEASE_NOTES_v1.4.7.md), [changelog](CHANGELOG.md) and [verification notes](RELEASE_QA_v1.4.7.md).

## Mathematical interpretation

Finite-range prime rates are **not evidence of infinitely many primes**. In large-range minimaps, brightness represents a **small-prime-conditioned local estimate**, not an exact census of every term. A separate conditional exact checked-term density path is retained in eligible smaller minimap ranges. Speed and memory requirements depend on CPU, browser and viewport.

Saved formulas are stored only in the current browser/profile. Verify a checkout with `python3 scripts/verify_release.py --require-node`.

© 2026 지너드, G.nerd (eprparadox44) · MIT.
