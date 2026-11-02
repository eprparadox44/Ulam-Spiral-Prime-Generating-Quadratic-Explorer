# v1.4.7 Verification — Saved-Formula Jump

## Root cause
In v1.4.6, `activateSavedEntry(entry,true)` moved the camera only under `if(doMove&&src)`. C-search saves via `addOrMergeSavedFormula(...,null)`, so such entries had no source and the UI click left the camera unchanged.

## Fix and behavior
- Added `nearestSavedFormulaTerm` to find an in-range term of the saved natural-index polynomial near the current camera. Uses exact BigInt for polynomial evaluations and O(1) parameter-range calculations with a small bounded window of candidates, not full point analysis or prime testing.
- Valid source coordinates remain authoritative; old/out-of-range origin metadata falls back to an in-range term.
- For mathematically impossible in-range formulas, display a localized notification while preserving the currently active formula.
- The saved highlight, canvas/minimap invalidation, redraw scheduling and no-blocking-analysis behavior remain unchanged.

## Tests
- Branch `fix/saved-formula-jump-v147`: GitHub Actions saved-jump experimental CI **PASS** (run 41537110594).
- Node regression: source-free c-search, preserved source-backed jump, stale source fallback, impossible formula, and all 5 geometry modes.
- Real Chromium UI: clicked saved-jump in Square/Hex/Tri/Sacks/Klauber, verified corresponding generated integer `1697` for `G(n)=n²-n-1354363`, active highlight, original saved location `5000` retained.
- No runtime JS page errors in tested flows.
- All existing standalone HTML regression scripts and 100T Hex WASM test remain in CI.

- Exact standalone HTML SHA-256: `ed41787ced6ffef0c49b5585bf2fd47f254e862e707f2d36eea249acd9f0e0a3`.
