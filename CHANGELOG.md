# Changelog

## 2026-11-02 — v1.4.3 (100T optimized release; FP10 promotion)

- Promoted the v1.4.2.10 (FP10) experimental implementation to the public v1.4.3 release with **version labels only** changed in the application HTML; calculation and recommendation logic is unchanged.
- Improved Square first-draw responsiveness and preserved prior optimized Hexagonal, Triangular, Sacks and Klauber rendering/Worker paths.
- Added geometry-verified Triangular/Klauber quadratic recommendations and faster geometric candidate construction.
- Kept the revised visibility bonus that accounts for lattice geometry and parity. Selected-point recommendation signatures can legitimately differ from v1.4.2; the independent prime-statistics counting core remains unchanged.
- Compared three versions across three user-supplied load-condition CSV files (1,188 benchmark rows; no recorded timeouts/errors). Performance varies by workload; not every category improves versus v1.4.2.
- Preserved all prior versioned HTML releases; updated GitHub Pages and the canonical standalone entry point to v1.4.3.

## 2026-11-01 — v1.4.2 (100T performance & accuracy)

- Promoted the OPT25-tested 100T HTML baseline to a clean v1.4.2 release, without experimental OPT/1Q naming in the page title.
- Fixed unsafe intermediate Number arithmetic in short selected-point quadratic statistics and parameter bounds.
- Added Square viewport and zoom render caching while retaining the original appearance.
- Improved incremental prime-point display and exact WASM primality paths for Hexagonal, Triangular and Klauber Triangle modes.
- Added proactive Worker initialization to reduce the first mode-switch delay; improved selected-point statistics with reusable modular-root preparations.
- Preserved 100T limit, five spiral modes, minimaps, search and saved formulas; the experimental 1Q version was not shipped.

## 2026-10-30 — v1.4.0 (100T stable release)

- Promoted OPT16 to the official v1.4.0 standalone HTML (100 trillion).
- Accelerated distant Square sides and corners with full-range/hybrid WASM, cache and redraw improvements.
- Improved selected-point prime-statistics accuracy and speed using modulo-2 parity fixes and symmetry/odd-class reductions.
- Enabled density-conditioned formula overlays in all five minimaps; expanded non-Klauber c search to ±70 million.
- Retained older public HTML distributions and their release notes.


## 2026-10-28 — v1.3.0 (first v1.3 GitHub publication)

- Klauber Triangle mode: geometry-aware quadratic exploration, long-line filter, large constant-term search.
- Conditional complete checked-term minimap density at 100M and 1B for predicted prime-sparse sequences.
- Merged the local v1.3.1–v1.3.5 reliability fixes into this first public v1.3 release: mode-aware saved sequences, natural-index equivalence, point-formula deduplication, saved-stat consistency and migration, keyboard shortcuts, unused-code removal and memory telemetry.
- Added the mathematical, storage and Worker regression suite to GitHub Actions.
- Preserved the one-file downloadable application, 10¹² navigation and the existing public v1.2.26 archive.

## Historical GitHub publication

## 2026-10-26 — v1.3.0 (first GitHub update since v1.2.26)

### Major changes

- Added **Klauber Triangle** spiral geometry, selected-point quadratic discovery, natural-index sequence presentation, and geometry-aware polynomial search.
- Improved **visibility of prime-sparse quadratic sequences**: conditional, Worker-based **exact term census** for selected formula overlays on the **100M / 1B minimap**; nonqualifying or excessive cases use the original sequence line.

### Minimap and reliability refinements

- Added 100M zoom level; `+` now zooms in and `−` zooms out.
- Eligibility for exact minimap density uses prime-frequency heuristics and the geometric path, not a measured proof of a ≤10-prime count.
- Removed natural-index sign-canonicalization inconsistencies in Klauber-derived recommendations and aligned sequence highlighting/statistics with valid terms.
- Preserved 1T numeric limit, saved formulas, existing spiral modes and the core sieve/search architecture.

### Packaging

- Versioned three identical HTML entry points as v1.3.0.
- Updated English/Korean documentation and SHA-256 manifest.
- Computational application logic unchanged from the user-accepted v1.2.53 BETA baseline.

## 2026-10-13 — GitHub publication package (1T)

- Prepared a self-contained HTML release with a `index.html` entry point for GitHub Pages.
- Preserved the official standalone filename `Ulam Spiral & Prime-Generating Quadratic Explorer.html`.
- Retained the shared-worker corner scheduler and ~160 ms intermediate redraw throttle; the final completion redraw remains immediate.
- Startup at Ulam number 1, up-to-10¹² navigation, prime caches, quadratic exploration/search, saved sequences, minimap and bilingual UI.

## Historical milestones

- 10⁸ → 4×10⁸ → 9×10⁸ → … → 4.9×10⁹: progressive early limits.
- 10¹⁰: whole-range prime sieve optimization.
- 10¹²: view-local, geometry-aware and cached exploration.
