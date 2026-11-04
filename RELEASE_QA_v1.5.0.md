# v1.5.0 — Release verification

This document records technical checks for the first public release after v1.4.7.

- The five spiral views, quadratic prime statistics, and expanded constant-term search support the range up to 10^15 (1P).
- c search supports ±220M in Square, Hexagonal, Triangular and Sacks, and ±280M in Klauber.
- In pre-publication tests, large-number sequence statistics were compared against earlier implementations; checked results matched.
- Five repeated desktop benchmark runs compared earlier and final implementations. Point-analysis work was faster in the final implementation, while high-density distant redraws remained at approximately the same speed. These timings describe that test machine, not a guaranteed speedup.
- GitHub Actions release verification and regression tests passed on the published commit.

For maintainers:
```bash
python3 scripts/verify_release.py --require-node
node tests/worker_pool_race.js
node tests/klauber_eighth_slope.js
node tests/hex_minimap_edge.js
node tests/hex_wasm_100t.js
node tests/saved_jump_regression.js index.html
```

The tests are not an exhaustive proof covering every number in the range.
