# v1.4.2 — 100T Performance & Accuracy

**Released:** 2026-11-01  
**Baseline:** OPT25 (user-tested)  
**Distribution:** Single-file standalone HTML / GitHub Pages  
**Scope:** 1 ≤ N ≤ 10¹⁴ (100 trillion)

## What's changed

- Corrected numerical precision risks in short selected-point quadratic statistics and quadratic parameter range calculations.
- Cached Square Ulam viewport dot geometry and reused eligible dot paths across zoom and small moves.
- Improved progressive prime display in Hexagonal, Triangular and Klauber Triangle modes.
- Accelerated exact prime classification for Triangular and Klauber, with a JavaScript/BigInt fallback path.
- Prewarmed prime lattice Workers to reduce the first Triangular/Klauber mode-switch latency.
- Reused prime-specific modular-root preparation across selected-point quadratic statistics with a hybrid fallback strategy.
- Replaced the experimental browser-tab title with **Ulam Spiral · v1.4.2 (100T)**.

## Preserved

All five spiral modes; max 100T; seven minimap levels; positive quadratic search; saved formulas; bilingual interface; standalone offline HTML. **The experimental 1Q (1000T) expansion and the later experimental OPT26/OPT27 changes are not part of this release.**

## Verification and performance context

OPT25 received positive real-user feedback for navigation responsiveness. Previous OPT20–OPT25 experiments compared prime-count and coordinate results, and selected HTML metadata and JavaScript syntax were checked for v1.4.2. Performance measurements vary with browser/CPU; not all combinations of mode, range, and viewport have been exhaustively verified. Refer to [verification notes](RELEASE_QA_v1.4.2.md).

---

# v1.4.2 — 100조 탐색 성능·정확성 개선

**공개일:** 2026-11-01  
**기준본:** 실사용 속도를 확인한 OPT25  
**배포 형식:** 단일 HTML / GitHub Pages  
**범위:** 1부터 100조(10¹⁴)

## 주요 변경

- 선택점 기준 짧은 이차식 통계 및 매개변수 구간의 중간 계산 정밀도 문제 보정.
- 사각 울람 나선에서 화면 위치·확대 변경 시 재사용 가능한 점 도형 캐시 도입.
- 육각·삼각·클라우버에서 소수 점을 더 일찍, 점진적으로 표시.
- 삼각·클라우버의 정확한 WASM 소수 판정을 가속하고 대체 계산 경로 보존.
- 삼각·클라우버 계산 Worker를 미리 준비하여 첫 모드 전환 지연 감소.
- 선택점 수열 통계에 소수별 모듈러 제곱근 준비값 재사용 적용.
- 브라우저 탭 표기를 **Ulam Spiral · v1.4.2 (100T)**로 정리.

## 유지 사항과 범위

다섯 나선 모드, 최대 100조, 미니맵 7단계, 이차식 탐색, 수열 저장, 한국어·영어 UI 및 오프라인 단일 HTML 배포를 유지했다. **1000조(1Q) 실험판 및 OPT26/OPT27 연구 변경은 포함하지 않았다.**

사용자 PC에서 OPT25의 모드 전환 속도 개선이 확인되었다. 다만 브라우저·CPU·탐색 위치에 따라 속도는 달라질 수 있다. 모든 입력을 형식적으로 증명한 것은 아니며, 검증 범위는 별도 [검증 문서](RELEASE_QA_v1.4.2.md)에 구분했다.
