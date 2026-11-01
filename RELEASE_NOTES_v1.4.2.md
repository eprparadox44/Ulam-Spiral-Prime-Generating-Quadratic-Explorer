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
- Updated the browser-tab title with **Ulam Spiral · v1.4.2 (100T)**.

## Preserved

All five spiral modes; max 100T; seven minimap levels; positive quadratic search; saved formulas; bilingual interface; standalone offline HTML.

## Verification and performance context

User testing reported improved navigation responsiveness and faster initial mode transitions. Representative comparisons checked prime-point counts, coordinates, and selected-point statistics; packaging metadata, JavaScript syntax, and a Worker readiness regression test were also checked for v1.4.2. Performance varies by browser and CPU. The checks do not exhaustively cover every mode, range, or viewport, and they are not a formal mathematical proof. See the [verification notes](https://github.com/eprparadox44/Ulam-Spiral-Prime-Generating-Quadratic-Explorer/blob/main/RELEASE_QA_v1.4.2.md).

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

## 유지 사항과 범위

다섯 나선 모드, 최대 100조, 미니맵 7단계, 이차식 탐색, 수열 저장, 한국어·영어 UI 및 오프라인 단일 HTML 배포를 유지했다.

실제 사용 환경에서 화면 조작 반응과 첫 모드 전환 속도가 개선된 것으로 보고되었다. 대표 입력에 대해 소수점 개수·좌표·선택점 통계를 비교했으며, 배포 메타데이터와 JavaScript 문법, Worker 준비 상태 회귀 테스트도 확인했다. 성능은 브라우저·CPU에 따라 달라질 수 있다. 모든 나선 모드·탐색 범위·화면 위치를 빠짐없이 검증하거나 수학적으로 증명한 것은 아니다. 자세한 내용은 [검증 기록](https://github.com/eprparadox44/Ulam-Spiral-Prime-Generating-Quadratic-Explorer/blob/main/RELEASE_QA_v1.4.2.md)을 참고할 수 있다.
