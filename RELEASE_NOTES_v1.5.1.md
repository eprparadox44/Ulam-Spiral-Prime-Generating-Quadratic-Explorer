# v1.5.1 — Performance optimizations and clearer quadratic recommendations

This update focuses on more efficient exploration of quadratic prime sequences while preserving the 1P (10¹⁵) range introduced in v1.5.0.

### Improvements
- Reduced repeated calculations in quadratic-sequence prime statistics through safe reuse of equivalent computations and boundary corrections.
- Improved small-prime composite filtering and large-range statistics paths.
- Optimized low-zoom Hexagonal spiral rendering and retained responsive navigation improvements.
- Excluded redundant *recommended* formulas when they are equivalent to an existing fixed formula by integer index shift/reversal, or a verified integer-step subsequence without new positive-index prime values. Fixed and user-saved formulas remain available; statistical results are not merged.

### Compatibility
- Maximum exploration range: **1P = 1,000,000,000,000,000**.
- The five spiral layouts, constant-term c search limits, saved-data format, embedded primality engine and **8-Worker limit** are preserved.
- Single self-contained HTML file; works offline.

### Verification
JavaScript syntax, preserved calculation assets, selected recommendation-duplicate cases and archive integrity were checked. Browser/CPU performance can differ by environment; no universal speed-up is claimed.

---

# v1.5.1 — 성능 최적화 및 추천 수식 중복 정리

이번 버전은 **1P(1000조)** 탐색 범위를 유지하면서 이차식 소수 통계와 화면 표시를 최적화한 업데이트입니다.

### 개선 사항
- 동치 계산 결과의 안전한 재사용과 경계 보정을 통해 이차식 소수 통계의 불필요한 반복 계산을 줄였습니다.
- 작은 소수를 이용한 합성수 선별과 대규모 통계 계산 경로를 개선했습니다.
- 육각 나선의 저배율 렌더링을 최적화하고 기존 화면 조작 성능 개선을 유지했습니다.
- **고정 수식과 중복되는 추천 수식**을 정리했습니다. 정수 인덱스 이동·반전이나 정수배 간격 부분수열 중 새로운 소수 항이 생기지 않는 경우 추천 목록에서 제외합니다. 고정 수식과 저장 수식은 삭제하지 않으며 소수 통계 결과도 임의로 합치지 않습니다.

### 유지 사항
- 최대 탐색 범위 **1P**, 다섯 나선 모드, 기존 상수항 c 탐색 범위
- **계산 Worker 최대 8개**, 기존 소수 판정 엔진, 저장 데이터 호환성
- 인터넷 연결 없이 실행 가능한 단일 HTML 배포

정적 구문 및 중복 제거 사례 검사를 수행했습니다. 실제 체감 성능은 실행 환경에 따라 달라질 수 있습니다.
