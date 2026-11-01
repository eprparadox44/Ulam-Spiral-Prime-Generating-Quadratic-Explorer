# v1.4.3 Release Verification / 검증 기록

**Date / 검증일:** 2026-11-02  
**Source:** FP10 experiment on branch `experiments/v142-first-draw-progress`  
**Source Git blob:** `ef6055754d951341a09a39d32f0a298cb8fc8232`

## Release identity and integrity

- Release version: **v1.4.3**, 100T.
- Application content derived from FP10 with exactly four release-label replacements: header, application-version metadata, initial `<title>`, and runtime `document.title` string. No candidate-ranking, primality, Worker or rendering logic was altered for this release.
- Three current HTML entry points must be byte-for-byte identical: `index.html`, `Ulam Spiral & Prime-Generating Quadratic Explorer.html`, and `Ulam Spiral & Prime-Generating Quadratic Explorer v1.4.3.html`.
- SHA-256 (all three): `4aedea3e29e813b8b37ab32c7836886b22181b39ead151e848a9a1c9d5f1cb9e`.
- Git blob SHA-1 (all three): `41e7f425eb716546c2174f39d1ae994f53b938b7`.
- Old versioned HTML files remain unchanged.

## Validation evidence

- User-supplied v1.4.0 / v1.4.2 / FP10 three-way benchmarks: 1,188 rows across three load conditions; no recorded errors or timeouts. Measured performance varies by workload.
- The Square selected-point formula signature differs between v1.4.2 and FP10 at seven of eight tested unique coordinates; this is compatible with the intentionally revised visibility bonus, not on its own evidence of incorrect primality results.
- Candidate-level independent offline comparison on eight Square points: restoring only the previous visibility-bonus formula to FP10 recovered the v1.4.2 candidate membership, order and scores at every tested point. This is not a full end-to-end recount of all candidate prime statistics.
- Core `formulaStatsCore`, `formulaParamRange`, `preparePointCandidates` and `finishPointCandidateSet` implementations were the same in v1.4.2 and the FP10 test source; the bonus function changed by design.
- Automated packaging checks are defined in `scripts/verify_release.py`, and the GitHub Actions workflow checks JavaScript syntax plus Worker-pool regression. Passing these checks is not mathematical proof for all inputs.

## Limits / 한계

This is an optimized-release promotion, not an exhaustive independent formal verification of every 100T input, visual state, or result. The revised recommendation scoring remains intentional. / 사각 추천 수식 서명 변경은 가산점 기준 변경에 따른 것으로, 전 구간 수학적 정확성을 증명한 것은 아님.
