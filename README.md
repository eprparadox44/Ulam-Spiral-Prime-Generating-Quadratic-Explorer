# Ulam Spiral & Prime-Generating Quadratic Explorer

[**한국어 README**](README.ko.md)

<img width="570" height="362" alt="Ulam spiral and prime-generating quadratic explorer" src="https://github.com/user-attachments/assets/c274ae9d-a1a8-4ea2-a2e1-8f1540010685" />

An interactive, **single-file standalone HTML** application for exploring primes and quadratic sequences over **1 ≤ N ≤ 10¹⁴ (100 trillion)**.

**Current release: v1.4.0 (October 30, 2026)** · [MIT License](LICENSE).

## Launch

- [**Open online (GitHub Pages)**](https://eprparadox44.github.io/Ulam-Spiral-Prime-Generating-Quadratic-Explorer/)
- [**Download standalone HTML**](Ulam%20Spiral%20%26%20Prime-Generating%20Quadratic%20Explorer.html)

Open the HTML file in a recent browser. No installation or separate build is required.

## Explore

- Five geometries: **Square Ulam**, **Hexagonal**, **Triangular**, **Sacks spiral**, and **Klauber Triangle**.
- Navigate and zoom to 100 trillion. Prime caches, optimized Web Workers, WASM sieves and exact primality checks support distant exploration.
- Select a point to discover quadratic sequences and compare finite-range prime counts and rates; save formulas in the browser's local storage.
- Search quadratic coefficients: **c = −70,000,000 to +70,000,000** in Square/Hex/Tri/Sacks; Klauber retains its specialized **up to ±10 billion** constant-term search.
- Seven minimap levels: **100M / 1B / 10B / 100B / 1T / 10T / 100T**. All five modes have formula-density overlays with a maximum-brightness threshold of approximately **20% estimated prime rate** and suppression of mathematically impossible arms.
- English/Korean UI, pointer and keyboard navigation.

## What's new in v1.4.0

- Raised navigation ceiling from **10¹² to 10¹⁴**.
- Significantly accelerated Square Ulam loading at distant sides and corners with full-range and hybrid WASM sieve paths, viewport cache improvements and throttled intermediate redraws.
- Improved selected-point responsiveness with prewarmed statistics workers and mathematically safe parity/symmetry optimizations; fixed modulo-2 counting for odd quadratic leading coefficients.
- Unified estimated-density minimap visualization across all five spiral modes.
- Expanded the non-Klauber constant-term search while preserving Klauber-specific functionality.

See [v1.4.0 release notes](RELEASE_NOTES_v1.4.0.md), [changelog](CHANGELOG.md) and [verification notes](RELEASE_QA_v1.4.0.md).

## Mathematical interpretation

Finite-range prime rates are **not evidence of infinitely many primes**. In large-range minimaps, brightness represents a **small-prime-conditioned local estimate**, not an exact census of every term. A separate conditional exact checked-term density path is retained in eligible smaller minimap ranges. Speed and memory requirements depend on CPU, browser and viewport.

Saved formulas are stored only in the current browser/profile. Verify a checkout with `python3 scripts/verify_release.py --require-node`.

© 2026 지너드, G.nerd (eprparadox44) · MIT.
