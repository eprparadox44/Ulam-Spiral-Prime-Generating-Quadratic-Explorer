# v1.4.6 — 100T Hexagonal WASM Acceleration

**Date:** 2026-11-02

## Improvement

- Replaced the 80,000-prime-capacity legacy Hex WASM that forced JavaScript fallback at 100 trillion with a purpose-built deterministic WebAssembly prime engine.
- Its 54-entry small-prime trial table and modular Miller–Rabin primality checks are exact for this application's 100T range. The original exact JS path remains available whenever WASM initialization or the built-in bitmap cross-check fails.
- Same-platform Chromium A/B results: interior at 100T, baseline 105.6–200.8 ms vs new 40.5–40.6 ms; outermost sparse region baseline 21.3–22.8 ms vs new 20.3–20.5 ms. The complete bitmaps for both viewport targets matched.
- The new module uses approximately 4 MiB per active Hex Worker. No renderer/layout/UI/search/statistics changes.

See [verification report](RELEASE_QA_v1.4.6.md).

---

# v1.4.6 — 육각 나선 100조 WASM 가속

**2026-11-02**

육각 모드에서 기존 WASM 용량 제한으로 실행되던 정확한 JS 소수 계산을 새 WASM으로 가속했다냥. 사용자 환경에 따른 속도 차이는 있지만, 동일 Chromium에서 내부 화면 소수 계산 완료 시간이 약 2.6~5배 개선되었다냥. 가장자리의 좁은 계산 영역에서는 이득이 작았다냥. 비트맵은 기존판과 일치했고, WASM 자체 검증 실패 시 기존 JS 폴백은 유지했다냥.
