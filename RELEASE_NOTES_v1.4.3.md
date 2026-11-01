# v1.4.3 — 100T Optimized Release (FP10)

**Release date:** 2026-11-02  
**Format:** Single-file standalone HTML / GitHub Pages  
**Range:** 1 ≤ N ≤ 10¹⁴ (100 trillion)

## Highlights

- Promoted the FP10 optimization test implementation (v1.4.2.10) to the official **v1.4.3** release.
- Optimized Square first-draw handling, progressive rendering, Worker scheduling and geometry processing.
- Included optimized geometric point-candidate generation for Triangular and Klauber modes and faster Klauber line formulas.
- Refined the visibility bonus for selected-point quadratic recommendations using lattice spacing and polynomial coefficient parity. Formula rankings may differ from v1.4.2.

## Performance and validation scope

The attached three-way benchmark examined v1.4.0, v1.4.2 and FP10 under three user-defined load conditions (1,188 individual measurements). The observed improvements vary by mode and task. An identical formula recommendation signature across versions is *not* required when recommendation criteria intentionally change. Candidate-list restoration was independently verified for eight Square sample points by temporarily substituting the previous visibility-bonus function; the previous lists and scores were recovered in the candidate-selection stage. This is not an exhaustive mathematical validation of every result or viewport.

See [verification details](RELEASE_QA_v1.4.3.md).

---

# v1.4.3 — 울람 나선 100조 최적화 정식판 (FP10)

**공개일:** 2026-11-02  
**배포 방식:** 단일 HTML / GitHub Pages  
**탐색 범위:** 1부터 100조(10¹⁴)

## 주요 내용

- FP10 최적화 실험판(v1.4.2.10)을 **정식 v1.4.3**으로 채택.
- 사각 나선 첫 그리기 경로와 여러 나선 모드의 점진적 렌더링·Worker·기하학 후보 처리 성능을 개선.
- 삼각·클라우버 선택점의 기하학적 추천 수식 후보 및 클라우버 직선 계산 최적화 포함.
- 격자점 간격 및 수식 계수 홀짝성을 반영하도록 선택점 수식 추천 가시성 가산점을 개선. v1.4.2 대비 추천 수식과 순위가 달라질 수 있음.

## 측정 및 제한

사용자 제공 3종 부하 조건의 3버전 비교 CSV에는 총 1,188건의 결과가 있으며 오류·시간 초과 기록은 없었음. 개선 폭은 나선 종류와 작업에 따라 달라짐. 사각 선택점 8개에 대해 가산점 이전 방식 복원 시 후보·점수·순서의 복귀를 확인했으나, 전 구간·모든 좌표의 수학적 정확성까지 증명한 것은 아님.

[검증 기록](RELEASE_QA_v1.4.3.md).
