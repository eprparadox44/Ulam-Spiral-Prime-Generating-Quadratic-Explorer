# v1.4.4 — Klauber 1/8 Visible-Line Search

**Date:** 2026-11-02

## Changes

- Klauber constant-term search limit changed from **±10,000,000,000 to ±90,000,000**.
- Geometric line filter now supports **|slope|≥1/8** instead of ≥1/2. The minimum contiguous length remains 50,000 rows.
- Added the b=−7 and b=9 preset families (a=1), corresponding to the 1/8-slope Klauber directions.
- Generalized geometry-eligible c-interval union calculations for the new slope threshold; maintained an explicit opt-out of the long-line filter.

## Clarification

For physical Klauber rows within 100 trillion, a=1 and |d|≤8 imply |c| below 90 million. This is **not** a mathematical bound for all arbitrary unnormalized a,b representations. The example G(n)=n²−7n+89,999,969 at the extreme edge corresponds to only two consecutive physical rows, so the 50k-row filter excludes it even though its global prime statistics are valid. Disable the geometric filter to include such short geometries.

[Verification details](RELEASE_QA_v1.4.4.md).

---

# v1.4.4 — 클라우버 기울기 1/8 탐색 개선

**공개일:** 2026-11-02

## 변경 사항

- 클라우버 상수항 탐색 상한을 **±100억에서 ±9천만**으로 조정.
- 기하학적 직선 필터를 **|기울기| ≥ 1/2에서 ≥ 1/8**로 확대. 직선 최소 5만 행 조건은 유지.
- 기울기 1/8용 **a=1, b=−7 / b=9** 수식 조합을 탐색 추천 목록에 추가.
- 더 완만한 직선의 유효 c 구간을 계산하는 알고리즘을 확장하고 검증.

## 참고

100조 클라우버 격자에서 a=1, |d|≤8인 실제 직선의 c는 ±9천만 안에 듦. 임의의 큰 b로 재매개변수화한 모든 이차식에 적용되는 보편 상한은 아님. 화면에 나온 G(n)=n²−7n+89,999,969는 실제 격자에서 연속 구간이 약 2행이므로, 5만 행 필터를 켜면 제외됨. 짧은 직선도 탐색하려면 기하학 필터를 해제.

[검증 기록](RELEASE_QA_v1.4.4.md).
