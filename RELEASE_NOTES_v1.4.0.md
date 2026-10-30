# v1.4.0 — 100-trillion Ulam & Quadratic Explorer

**Date:** 2026-10-30 · **Stable release baseline:** OPT16

## Key changes

- Extended navigation and prime visualization from **10¹² to 10¹⁴** with all five spiral geometries retained.
- Extended seven-stage minimap zoom up to **100T**.
- Added **all-mode prime-density overlays** for active formula trajectories. Mathematically inadmissible parity branches are suppressed. Admissible branches have density-conditioned opacity, fully bright at an estimated **20%** or higher. The large-range estimate is **not** the same as independently confirmed prime counts.
- Expanded constant-term search to **±70 million** for Square, Hexagonal, Triangular and Sacks. Klauber retains its specialized extended search up to **±10 billion**.
- Accelerated distant Square side/corner loading with full-range WASM and a hybrid small-prime/Miller–Rabin path.
- Reduced extra redraws during progressive screen loading and improved viewport cache access.
- Warmed selected-point statistics Workers and retained progressive candidate display.
- Corrected modulo-2 odd-leading-coefficient prime-statistics logic; added valid parity-class and symmetry-based computation reductions.

## Accuracy, compatibility and limitations

The development OPT8–OPT16 series used Node/V8 benchmarks, Chromium pixel comparisons, comparison to independent primality computations (including 51 sampled polynomial/range cases after the modulo-2 fix), and selected-point output checks. These are development test samples, **not a formal proof of every computation**. Full regression and user-device smoke tests should continue after publication.

Self-contained HTML; MIT-licensed. Historic published files and notes stay available.

---

# v1.4.0 — 100조 울람 나선 & 소수생성 이차식 탐색기

**출시일:** 2026-10-30 · **정식 릴리스 기준본:** OPT16

## 주요 변경 사항

- 다섯 가지 나선 배치 방식을 모두 유지하면서 탐색 및 소수 시각화 범위를 **10¹²(1조)에서 10¹⁴(100조)**로 확장했습니다.
- 미니맵의 7단계 확대·축소 범위를 **100조(100T)**까지 확장했습니다.
- 모든 나선 모드에서 활성 수열의 궤적에 **소수 밀도 분포 시각화**를 적용했습니다. 수학적으로 소수가 생성될 수 없는 홀짝성 가지는 표시하지 않습니다. 소수 생성 가능성이 있는 가지는 추정 밀도에 따라 투명도를 달리하며, **추정 소수율 20% 이상**에서 최고 밝기로 표시합니다. 넓은 범위에서 사용하는 추정치는 **독립적으로 소수 판정을 완료하여 얻은 실제 소수 개수와는 다릅니다.**
- 사각·육각·삼각·Sacks 나선의 이차식 상수항 탐색 범위를 **±7,000만**으로 확대했습니다. 클라우버 모드의 전용 확장 탐색 범위는 기존과 같이 **최대 ±100억**으로 유지합니다.
- 전체 탐색 범위를 지원하는 WASM과 작은 소수 체·Miller–Rabin 혼합 판정 경로를 사용하여, 멀리 떨어진 사각 울람 나선의 변과 모서리 부분을 더 빠르게 불러오도록 개선했습니다.
- 화면을 단계적으로 불러오는 동안 불필요한 재렌더링을 줄이고, 화면 영역의 소수 캐시 조회를 개선했습니다.
- 선택점 기준 소수 통계 계산용 Worker를 미리 예열하면서, 계산이 끝난 수열 후보부터 순차적으로 표시하는 기능은 유지했습니다.
- 최고차항 계수가 홀수인 이차식의 소수 통계에서 법 2(modulo 2) 처리를 수정했습니다. 또한 홀짝성 구분과 대칭성을 이용해 수학적으로 안전하게 계산량을 줄이는 최적화를 적용했습니다.

## 정확성, 호환성 및 한계

개발 과정의 OPT8~OPT16 버전에서는 Node/V8 성능 측정, Chromium 화면 픽셀 비교, 독립적인 소수 판정과의 교차 검증(법 2 오류 수정 후 **51개의 이차식·계산 구간 표본 사례** 포함), 선택점 분석 결과 비교를 수행했습니다. 다만 이러한 검증은 개발 과정에서 선정한 표본 시험이며, **모든 계산의 정확성을 수학적으로 증명한 것은 아닙니다.** 공개 이후에도 전체 회귀 검사와 실제 사용자 기기에서의 기본 동작 점검을 계속하는 것이 바람직합니다.

이 프로그램은 별도 설치 없이 실행할 수 있는 **단일 HTML 파일**로 제공하며, **MIT 라이선스**를 따릅니다. 이전에 공개된 버전의 파일과 릴리스 노트도 계속 보존합니다.
