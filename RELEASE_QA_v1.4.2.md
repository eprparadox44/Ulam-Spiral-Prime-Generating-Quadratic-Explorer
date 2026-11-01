# v1.4.2 Release Verification / 검증 기록

**Date:** 2026-11-01 · **Baseline:** OPT25 100T · **Not included:** experimental 1Q/1000T, OPT26, OPT27

## Distribution integrity

- Three current HTML entry points must contain identical UTF-8 bytes: `index.html`, `Ulam Spiral & Prime-Generating Quadratic Explorer.html`, `Ulam Spiral & Prime-Generating Quadratic Explorer v1.4.2.html`.
- Expected SHA-256 for each: `a1f1c10ff10e4e85c29af1c33ce9513a8909e876ddf69170e8bd9eaae3b0204d`.
- Expected Git blob SHA-1 for each: `212b0a76a0027e60f35bf87b337ccc6561f33232`.
- Page title: `Ulam Spiral · v1.4.2 (100T)`; application-version metadata: `1.4.2`.
- Check with `python3 scripts/verify_release.py --require-node`; `node tests/worker_pool_race.js` should also pass.

## Previous experimental verification (not exhaustive mathematical proof)

- v1.4.1 mathematical hotfix: short-range quadratic formulas with precision-sensitive intermediate values compared with exact integer arithmetic.
- OPT17/18: Square zoom and camera caching comparisons for selected viewports.
- OPT19/20: prime-point position and count comparisons in Hexagonal, Triangular and Klauber Triangle modes, including independent short-sample checks.
- OPT23: representative selected-point statistics comparisons using the legacy and optimized modular-root WASM kernels.
- OPT25: user reported substantially faster first-mode transitions; representative Chromium snapshots were matched against the previous baseline.

## Boundaries

- Performance comparisons are environment-sensitive and do not guarantee a universal speedup.
- The OPT24 replacement WASM, OPT26 scheduler and OPT27 tile scheduler were *not* promoted.
- GitHub Actions verifies packaging, JavaScript syntax and a Worker readiness regression test; it does not prove all mathematical cases.

## 한국어 안내

OPT25를 v1.4.2 정식 기준본으로 이름을 정리했다. 최대 범위는 100조이며 1000조 확장 실험판은 포함하지 않았다. HTML 세 진입점의 해시가 같아야 하고, 검증 스크립트 및 Worker 회귀 테스트를 통과해야 한다. 개별 실험의 비교 결과는 특정 입력·환경에서의 검증으로, 모든 경우에 대한 수학적 증명을 뜻하지 않는다.
