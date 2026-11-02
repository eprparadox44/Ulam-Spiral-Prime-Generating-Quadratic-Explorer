# Changelog

## 2026-11-03 — v1.4.7 (Restore saved-formula direct jump)

- Fixed the **Jump to this sequence** button failing silently for formulas saved directly from the c-search results because these entries intentionally have null source coordinates.
- For source-free saved formulas, select an actual polynomial term within 2..MAX_N near the current camera, using cheap integer arithmetic and no synchronous primality scan.
- Preserve exact source-backed jumps; stale/out-of-range origins receive a safe fallback. A formula with no valid in-range term shows an explicit message and does not alter the existing selection.
- Verified all five geometries by clicking the saved-sequence UI in Chromium, plus source-backed and out-of-range unit tests. All prior 100T Hex WASM improvements remain unchanged.

## 2026-11-02 — v1.4.6 (100T Hexagonal WASM acceleration)

- Replaced the original 80,000-prime-capacity Hex WASM with a new deterministic 100T-capable WASM engine, using only the first 54 small trial primes and exact 64-bit modular Miller–Rabin. Legacy exact JS computation remains a runtime fallback.
- Added a 100T edge-case bitmap preflight on Worker initialization, plus regression tests for 30,000 modular multiplications, 1,200 primality classifications and 27 Hex grid bitmaps.
- Independent Chromium A/B experiment: complete interior Hex sieve 105.6–200.8 ms (JS) versus 40.5–40.6 ms (WASM), same 3 Workers and identical output bits; sparse outer edge showed a smaller improvement.
- No changes to other lattice modes, point analysis, c-search, Path2D drawing or minimap geometry. WASM adds about 4 MiB linear memory per active Hex Worker.

## 2026-11-02 — v1.4.5 (Hexagonal minimap boundary fix)

- Fixed blank or off-map zoomed Hexagonal minimap near 100T outer rings. The old minimap center was clamped to Square-mode bounds (about ±5M), but Hex reaches ±5.77M; zoomed Hex minimaps now follow the camera even at the edge.
- Added targeted regression coverage for the reported n=99,999,076,320,761, all six zoomed levels, and full-world Hex overview.

## 2026-11-02 — v1.4.4 (Klauber 1/8 search / c ≤ 90M)

- Reduced the Klauber constant-term search bound from ±10 billion to ±90 million.
- Extended optional geometric filtering to visible slopes |m|≥1/8, keeping the existing 50,000-row minimum; added relevant b=−7 and b=9 presets.
- Generalized the constant-time interval-union calculation for |d|=2..8; matched independent row witnesses across 960,060 small-domain exhaustive tests.
- Only exact physical 50,000-row segments pass the checked filter; shorter valid global polynomial candidates remain searchable with the filter unchecked.
- Previous versions and the v1.4.3 GitHub Release are not overwritten.

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
