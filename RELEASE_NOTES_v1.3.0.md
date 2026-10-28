# v1.3.0 — Klauber Triangle & Sparse-Sequence Minimap

**Release date:** 2026-10-28  
**Previous GitHub-published version:** v1.2.26  
**Implementation baseline:** v1.3.5 local beta, consolidated as the first v1.3 public release

## Major additions

### Klauber Triangle mode

- Adds Klauber triangular coordinates and quadratic-sequence exploration alongside Square, Hex, Triangular and Sacks modes.
- Displays global quadratic sequences with natural-number indices (`n ≥ 1`) and retains physical row coordinates internally.
- Klauber-specific geometric direction filtering and extended constant-term search (up to ±10 billion).
- Search is heuristic candidate ranking, not a mathematically proven global optimum.

### Sparse-sequence minimap visualization

- Adds 100M and 1B conditional prime-density overlays for sequences expected to yield at most around ten visible primes at the minimum main-view zoom.
- The trigger is an estimate based on probability and geometric visibility; eligible sequence terms are then **fully checked** for primality, subject to resource limits.
- 10B / 100B / 1T retain conventional highlighted-line rendering.
- `+` zooms in, `−` zooms out.

## Reliability improvements consolidated before first publication

- Natural-index (`n≥1`) sequence semantics and equality checks, including multiplicity-aware equivalence.
- Mode-aware saved-sequence representation, preserving mode-specific expressions when justified.
- Duplicate quadratic candidates eliminated before point-analysis statistics run.
- Saved-formula stat backfills now use the displayed semantic polynomial; saved flags use mode-aware keys.
- Stored entries are merged before the 200-item cap; original saved entries are backed up before first migration.
- Optional keyboard navigation (Tab, Enter, canvas arrow keys and `+` / `−`) without changing the main rendering loop.
- Worker/range ownership, polynomial equivalence, and Klauber boundary regression tests expanded.
- Unused autotune and legacy minimap functions cleaned up; preview memory use is measured and warned about, not truncated.

## Compatibility and limitations

- Single self-contained HTML supporting integers 1 through 10¹²; browser-local saved records and main search functions preserved.
- Vogel remains experimental and is not a default visible mode.
- Local JavaScript/Python syntax and automated regression tests are included; these do not replace prolonged interactive/browser testing.
- GitHub Pages deployment requires updating the repository root. No GitHub tag or release has yet been published by this package preparation.

## License

MIT — © 2026 지너드, G.nerd (eprparadox44).
