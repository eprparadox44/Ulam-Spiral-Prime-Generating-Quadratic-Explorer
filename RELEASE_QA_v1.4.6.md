# v1.4.6 QA / performance evidence

- Source baseline: v1.4.5 Git blob 305f1a43bf8e6a6b6bf5315a7ee85b1bd088d3c9.
- Experimental branch: perf/hex-wasm-100t-v146, isolated benchmark with identical in-IIFE adapters on both variants; adapters were removed from all release HTML distributions.
- 100T browser bitmap identity on two views: interior FNV32 69f62622 (3320 bitmap bytes), outer edge FNV32 e5386f1f (3320 bytes).
- 100T interior Chromium A/B: baseline 105.6 and 200.8 ms vs candidate 40.6 and 40.5 ms. Relative 2.6× and 4.96×, respectively.
- 100T outer edge Chromium A/B: baseline 22.8 and 21.3 ms vs candidate 20.5 and 20.3 ms.
- Baseline logs showed 0 WASM workers; candidate logs showed 3 active WASM workers.
- The standalone 100T module was checked against 50,000 independent BigInt modular multiplications, 2,000 primality values and 28 bitmaps locally, and an additional JS-worker bitmap check was included at low and high N on every worker start.
- Runtime memory: 4 MiB module memory per Hex Worker. The original JS exact fallback is preserved.
- Assessed but not changed: n%210 is exact under IEEE-754 safe integer 2^53; offscreen bitmap drawing and O(1) ready serial were not adopted without a demonstrated net gain.
- HTML SHA-256 (three identical files): `d8d7a4016daf147dd4546d59c9d34a5983abd9fcfb3d0f528bb3feea10fc0e09`.
- Verify using `python3 scripts/verify_release.py --require-node`, `bash tests/run_all.sh`, and `node tests/hex_wasm_100t.js`.
