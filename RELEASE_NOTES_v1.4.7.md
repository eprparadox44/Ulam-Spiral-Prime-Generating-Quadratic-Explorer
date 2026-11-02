# v1.4.7 — Restore Saved-Formula Direct Jump

**Released:** 2026-11-03

### Fix

Fixed **Jump to this sequence / 이 식으로 바로 이동** when a saved polynomial had no originating point (notably from constant-term c search). The old click handler moved only when `source.n` was available. The new handler keeps the original-source behavior and otherwise picks an actual, in-range term near the camera using integer polynomial evaluation.

- Preserves source-backed jumps.
- Handles missing or stale origins.
- Handles unavailable in-range terms with a clear message.
- Does not add blocking full point analysis or exact prime scans.
- No changes to the 100T Hex WASM engine, other performance optimizations, c-search ranking or user interface layout.

[Full verification](RELEASE_QA_v1.4.7.md).

---

# v1.4.7 — 저장식 바로 이동 복구

**2026-11-03**

‘이 식으로 바로 이동’ 버튼이 상수항 c 탐색에서 저장된 출발점 없는 수식에 대해서 작동하지 않던 문제를 수정했다냥. 원래 출발점이 있는 저장식은 기존처럼 이동하고, 출발점 없는 식은 현재 위치와 가까운 실제 생성값으로 이동한다냥. 다섯 모드에서 버튼을 눌러 확인했다냥.
