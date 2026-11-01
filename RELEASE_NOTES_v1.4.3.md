# v1.4.3 — 100T Optimized Release (FP10)

**Release date:** 2026-11-02  
**Format:** Single-file standalone HTML / GitHub Pages  
**Range:** 1 ≤ N ≤ 10¹⁴ (100 trillion)

## Highlights

- Promoted the FP10 optimization test implementation (v1.4.2.10) to the official **v1.4.3** release. Its computational logic is retained; only release identifiers and the browser-tab title were changed inside the application HTML.
- Improved Square first-draw handling and retained the optimized progressive rendering, exact prime tests, worker scheduling, and geometry processing across the five supported geometries.
- Included optimized geometric point-candidate generation for Triangular and Klauber modes and faster Klauber line formulas.
- Preserved the new visibility bonus for selected-point quadratic recommendations. Because ranking now considers lattice spacing and parity, recommended formulas can differ from v1.4.2 even when the prime-statistics logic is unchanged.

## Performance and validation scope

The attached three-way benchmark examined v1.4.0, v1.4.2 and FP10 under three user-defined load conditions (1,188 individual measurements). The observed improvements vary by mode and task. An identical formula recommendation signature across versions is *not* required when recommendation criteria intentionally change. Candidate-list restoration was independently verified for eight Square sample points by temporarily substituting the previous visibility-bonus function; the previous lists and scores were recovered in the candidate-selection stage. This is not an exhaustive mathematical validation of every result or viewport.

## Compatibility

- Maximum navigation range remains **100 trillion**; all five geometries and English/Korean controls remain available.
- Older release HTMLs and their verification notes are kept intact.
- Saved formulas use the existing browser-local storage mechanism.

See [verification details](RELEASE_QA_v1.4.3.md).

---

# v1.4.3 — 울람 나선 100조 최적화 정식판 (FP10)

**공개일:** 2026-11-02  
**배포 방식:** 단일 HTML / GitHub Pages  
**탐색 범위:** 1부터 100조(10¹⁴)

## 주요 내용

- FP10 최적화 실험판(v1.4.2.10)을 **정식 v1.4.3**으로 채택. 프로그램 내부 계산·추천 로직은 유지하고 버전 표기 및 브라우저 탭 제목만 정식판에 맞게 변경.
- 사각 나선 첫 그리기 경로와 여러 나선 모드의 점진적 렌더링·Worker·기하학 후보 처리 성능을 개선.
- 삼각·클라우버 선택점의 기하학적 추천 수식 후보 및 클라우버 직선 계산 최적화 포함.
- 격자점 간격 및 수식 계수 홀짝성을 반영하는 새로운 가시성 가산점을 유지. v1.4.2 대비 추천 수식 목록이 달라지는 것은 의도된 선정 기준 변경이며 소수 판정 오류를 뜻하지 않음.

## 측정 및 제한

사용자 제공 3종 부하 조건의 3버전 비교 CSV에는 총 1,188건의 결과가 있으며 오류·시간 초과 기록은 없었음. 개선 폭은 나선 종류와 작업에 따라 달라짐. 사각 선택점 8개에 대해 가산점 이전 방식 복원 시 후보·점수·순서의 복귀를 확인했으나, 전 구간·모든 좌표의 수학적 정확성까지 증명한 것은 아님.

기존 버전은 보존하며 다섯 나선 모드, 최대 100조, 수열 저장과 한영 UI를 유지함.

[검증 기록](RELEASE_QA_v1.4.3.md).
