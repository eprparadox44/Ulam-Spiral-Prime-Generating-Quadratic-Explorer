# Changelog

## 2026-10-13 — GitHub publication package (1T)

- Prepared a self-contained HTML release with a `index.html` entry point for GitHub Pages.
- Preserved the official standalone filename `Ulam Spiral & Prime-Generating Quadratic Explorer.html`.
- Retained the shared-worker corner scheduler and ~160 ms intermediate redraw throttle; the final completion redraw remains immediate.
- Retained startup at Ulam number 1, up-to-10¹² navigation, prime caches, quadratic exploration/search, saved sequences, minimap and bilingual UI.
- Retained the latest small placeholder font-size and horizontal-padding adjustment for the jump range.
- Removed no application features. No profiling UI is included in the distributed HTML.

### Validation boundaries

Previous user-run browser benchmarks verified meaningful corner improvements, matching tested prime-classification digests and no cached-frame rendering regression when frame phase was controlled. They do **not** constitute a proof of correctness for all values or devices. This package also checks static HTML and JavaScript syntax, but its publication on GitHub Pages must still be tested after upload.

## Historical milestones (overview)

- 10⁸ → 4×10⁸ → 9×10⁸ → … → 4.9×10⁹: progressive early limits.
- 10¹⁰: whole-range prime sieve optimization.
- 10¹²: view-local, geometry-aware and cached exploration.
