# v1.4.2 Release Verification / 검증 기록

**Date:** 2026-11-01 · **Scope:** Published v1.4.2 (100T)

## Distribution integrity

- Three current HTML entry points must contain identical UTF-8 bytes: `index.html`, `Ulam Spiral & Prime-Generating Quadratic Explorer.html`, `Ulam Spiral & Prime-Generating Quadratic Explorer v1.4.2.html`.
- Expected SHA-256 for each: `a1f1c10ff10e4e85c29af1c33ce9513a8909e876ddf69170e8bd9eaae3b0204d`.
- Expected Git blob SHA-1 for each: `212b0a76a0027e60f35bf87b337ccc6561f33232`.
- Page title: `Ulam Spiral · v1.4.2 (100T)`; application-version metadata: `1.4.2`.
- Check with `python3 scripts/verify_release.py --require-node`; `node tests/worker_pool_race.js` should also pass.

## Representative verification (not exhaustive mathematical proof)

- Precision-sensitive short-range quadratic formulas were compared against exact integer arithmetic.
- Representative Square Ulam viewports were checked for zoom and camera-cache behavior.
- Prime-point positions and counts were compared for Hexagonal, Triangular, and Klauber Triangle modes, including independent short-sample checks.
- Representative selected-point statistics were compared using the earlier and optimized modular-root WASM kernels.
- User testing reported faster initial mode transitions, and representative Chromium snapshots were compared with the preceding implementation.

## Verification boundaries

- Performance comparisons depend on the environment and do not guarantee the same speedup on every device.
- GitHub Actions checks packaging, JavaScript syntax, and a Worker readiness regression test; it does not establish correctness for every mathematical input.
- These checks apply to the published v1.4.2 release. They do not constitute exhaustive verification of all modes, input ranges, and viewports.

---

## 한국어 검증 기록

**검증일:** 2026-11-01 · **대상:** 정식 v1.4.2 (100조)

### 배포 파일 무결성

- `index.html`, `Ulam Spiral & Prime-Generating Quadratic Explorer.html`, `Ulam Spiral & Prime-Generating Quadratic Explorer v1.4.2.html`의 UTF-8 바이트는 서로 동일해야 한다.
- 세 파일의 SHA-256 예상값: `a1f1c10ff10e4e85c29af1c33ce9513a8909e876ddf69170e8bd9eaae3b0204d`
- 세 파일의 Git blob SHA-1 예상값: `212b0a76a0027e60f35bf87b337ccc6561f33232`
- 브라우저 탭 제목: `Ulam Spiral · v1.4.2 (100T)` / 앱 버전 메타데이터: `1.4.2`
- `python3 scripts/verify_release.py --require-node` 및 `node tests/worker_pool_race.js`로 검증할 수 있다.

### 대표 검증 항목 (전체 수학적 증명은 아님)

- 중간 계산의 정밀도가 중요한 짧은 이차식 구간을 정확한 정수 연산과 대조했다.
- 사각 울람 나선의 대표 화면에서 확대·카메라 캐시 동작을 비교했다.
- 육각·삼각·클라우버 삼각 나선에서 소수점 좌표와 개수를 비교하고, 일부 짧은 구간을 독립적으로 확인했다.
- 선택점 수열 통계의 대표 사례를 기존 및 최적화된 모듈러 제곱근 WASM 계산 방식으로 비교했다.
- 실제 사용 환경에서 첫 모드 전환 속도 개선이 보고되었고, 대표적인 Chromium 화면을 이전 구현과 비교했다.

### 검증 범위의 한계

- 성능 개선 정도는 실행 환경에 따라 달라지므로 모든 기기에서 같은 속도 향상을 보장하지 않는다.
- GitHub Actions는 배포 구성, JavaScript 문법, Worker 준비 상태 회귀 테스트를 확인하지만 모든 수학적 입력의 정확성을 증명하지는 않는다.
- 이 검증은 공개된 v1.4.2 정식판을 대상으로 하며, 모든 모드·입력 범위·화면 위치를 전수 검사한 것은 아니다.
