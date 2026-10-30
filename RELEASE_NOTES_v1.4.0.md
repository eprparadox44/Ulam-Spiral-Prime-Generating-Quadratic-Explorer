# v1.4.0 — 100-trillion Ulam & Quadratic Explorer

**Date:** 2026-10-30 · **Stable release baseline:** OPT16

## Key changes

- Extended navigation and prime visualization from **10¹² to 10¹⁴** with all five spiral geometries retained.
- Extended seven-stage minimap zoom up to **100T**.
- Added **all-mode prime-density overlays** for active formula trajectories. Mathematically inadmissible parity branches are suppressed. Admissible branches have density-conditioned opacity, fully bright at an estimated **20%** or higher. The large-range estimate is **not** the same as independently confirmed prime counts.
- Expanded constant-term search to **±70 million** for Square, Hexagonal, Triangular and Sacks. Klauber retains its specialized extended search up to **±10 billion**.
- Accelerated distant Square side/corner loading with full-range WASM and a hybrid small-prime/Miller–Rabin path.
- Reduced extra redraws during progressive screen loading and improved viewport cache access.
- Warmed selected-point statistics Workers and retained progressive candidate display.
- Corrected modulo-2 odd-leading-coefficient prime-statistics logic; added valid parity-class and symmetry-based computation reductions.

## Accuracy, compatibility and limitations

The development OPT8–OPT16 series used Node/V8 benchmarks, Chromium pixel comparisons, comparison to independent primality computations (including 51 sampled polynomial/range cases after the modulo-2 fix), and selected-point output checks. These are development test samples, **not a formal proof of every computation**. Full regression and user-device smoke tests should continue after publication.

Self-contained HTML; MIT-licensed. Historic published files and notes stay available.
