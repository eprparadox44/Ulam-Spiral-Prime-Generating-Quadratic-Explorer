# v1.4.2 — 100T Performance & Accuracy

**Released:** 2026-11-01  
**Distribution:** Single-file standalone HTML / GitHub Pages  
**Scope:** 1 ≤ N ≤ 10¹⁴ (100 trillion)

## What's changed

- Corrected numerical precision risks in short selected-point quadratic statistics and quadratic parameter range calculations.
- Cached Square Ulam viewport dot geometry and reused eligible dot paths across zoom and small moves.
- Improved progressive prime display in Hexagonal, Triangular and Klauber Triangle modes.
- Accelerated exact prime classification for Triangular and Klauber, with a JavaScript/BigInt fallback path.
- Prewarmed prime lattice Workers to reduce the first Triangular/Klauber mode-switch latency.
- Reused prime-specific modular-root preparation across selected-point quadratic statistics with a hybrid fallback strategy.
- Updated the browser-tab title to **Ulam Spiral · v1.4.2 (100T)**.

## Notes

Not every spiral mode, search range, or viewport has been exhaustively verified or mathematically proven, so please keep this limitation in mind.

(After all, this app is just a toy for STEM nerds.)

For details, see the [verification notes](https://github.com/eprparadox44/Ulam-Spiral-Prime-Generating-Quadratic-Explorer/blob/main/RELEASE_QA_v1.4.2.md).

---

# v1.4.2 — 100조 탐색 성능·정확성 개선

**공개일:** 2026-11-01  
**배포 형식:** 단일 HTML / GitHub Pages  
**범위:** 1부터 100조(10¹⁴)

## 주요 변경

- 선택점 기준 짧은 이차식 통계 및 매개변수 구간의 중간 계산 정밀도 문제 보정.
- 사각 울람 나선에서 화면 위치·확대 변경 시 재사용 가능한 점 도형 캐시 도입.
- 육각·삼각·클라우버에서 소수 점을 더 일찍, 점진적으로 표시.
- 삼각·클라우버의 정확한 WASM 소수 판정을 가속하고 대체 계산 경로 보존.
- 삼각·클라우버 계산 Worker를 미리 준비하여 첫 모드 전환 지연 감소.
- 선택점 수열 통계에 소수별 모듈러 제곱근 준비값 재사용 적용.
- 브라우저 탭 제목을 **Ulam Spiral · v1.4.2 (100T)**로 변경.

## 참고사항.
모든 나선 모드·탐색 범위·화면 위치를 빠짐없이 검증하거나 수학적으로 증명한 것은 아니므로 주의.
(어디까지나 이 앱은 이과들을 위한 장난감입니다. )
자세한 내용은 [검증 기록](https://github.com/eprparadox44/Ulam-Spiral-Prime-Generating-Quadratic-Explorer/blob/main/RELEASE_QA_v1.4.2.md)을 참조.
