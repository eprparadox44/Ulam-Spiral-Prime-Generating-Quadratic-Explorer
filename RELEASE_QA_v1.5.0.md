# v1.5.0 — 1P Release Verification

- Standalone official HTML derived byte-for-byte from the final OPT36 / pre-release v1.5.7 candidate except release metadata.
- Supports 1 ≤ N ≤ 10^15 (1P), five geometries, ±220M general c-search and ±280M Klauber search, and 1.15px/cell minimum zoom.
- Regression checks documented before the public promotion included 1P quadratic-statistics parity checks and Chromium mode-by-mode comparison.
- Desktop A/B benchmark compared pre-release v1.5.1 with the final OPT36 candidate: five repeated crossover runs, 95 benchmark comparison items, all matching in recorded result checks; the selected-point suite improved by roughly 24.6% in total, and high-density remote redraw times remained near-identical. The absolute timings are workload/device dependent.
- Maintainer build: run `python3 scripts/verify_release.py --require-node` and `node tests/worker_pool_race.js`, `node tests/klauber_eighth_slope.js`, `node tests/hex_minimap_edge.js`, `node tests/hex_wasm_100t.js`, `node tests/saved_jump_regression.js index.html`.

This report describes test coverage; it does not claim exhaustive verification of all 1P integer inputs.
