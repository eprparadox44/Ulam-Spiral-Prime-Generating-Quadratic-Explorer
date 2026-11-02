# v1.4.4 QA / 검증 기록

**Date:** 2026-11-02

- Built on the verified v1.4.3 source, preserving the five modes and 100T numeric bound.
- Klauber c-search validation now rejects |c|>90,000,000; other modes still use ±70,000,000.
- Klauber visible-line slope filter extends from |d|≤2 to |d|≤8. A real 50,000-row contiguous line is still required.
- The affine c-interval union function was compared against independent row-length witnesses in **960,060 exhaustive small-domain cases**, with zero mismatches.
- a=1, b=−7, c=89,999,969 has a 2-row physical intersection at the 100T edge, so it is intentionally filtered out by the 50k threshold.
- The ±90M ceiling is a practical UI scope for the a=1 1/8-slope visible geometry, not a theorem for arbitrary transformed a,b families.
- Three distribution files must match exactly: `index.html`, `Ulam Spiral & Prime-Generating Quadratic Explorer.html`, and `Ulam Spiral & Prime-Generating Quadratic Explorer v1.4.4.html`.
- SHA-256: `5a63c55c713dc83450577980f91991ececeb4be075acb353b1d1f186d4f368e0`; Git blob SHA-1: `6e589b6f4a86435e54e55abc2a2bbdc7acf7d65b`.
- Validate via `python3 scripts/verify_release.py --require-node` and `node tests/klauber_eighth_slope.js`. This is not an exhaustive proof of all prime-statistics outputs.
