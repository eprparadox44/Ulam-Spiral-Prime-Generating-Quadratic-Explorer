# v1.5.0 — 1P (10^15) Range Expansion

**November 4, 2026 — Official Release.** The Ulam Spiral & Prime-Generating Quadratic Explorer expands its maximum search range **tenfold from 100T (10^14) to 1P (10^15)**. All five spiral modes support this range with deterministic primality checks, parallel Web Workers and an optimized 64-million-term WASM statistics sieve. Constant-term c-search reaches ±220M in general modes and ±280M for Klauber. Existing offline single-file HTML, formula saving and minimum-zoom high-density navigation remain intact. Internally verified optimizations OPT26–OPT36 are bundled into this release, not published as separate versions.

---

# v1.5.0 (1P) — 정식 릴리스

**Ulam Spiral & Prime-Generating Quadratic Explorer**  
발표 기준일: 2026-11-04  
주요 업데이트: **최대 탐색 범위를 100조(100T, 10¹⁴)에서 1000조(1P, 10¹⁵)로 확장**

## 이번 릴리스의 핵심

울람 나선과 소수생성 이차식 탐색기가 기존 100T의 10배인 **1P**까지 확장됐다. 단순히 입력 숫자 상한을 높인 것이 아니라, 그 범위에서 소수 판정·대용량 소수 체·다항식 통계·나선 좌표와 미니맵이 실제로 작동하도록 계산 경로를 확장했다.

- **1P 탐색:** 사각 울람 나선, 육각 나선, 삼각 나선, 삭스 나선, 클라우버 삼각형의 수를 1P까지 탐색한다. (Vogel 모드는 아직 비활성 상태)
- **정확한 소수 판정:** 1P 범위용 결정론적 판정 경로와 소수 체, 큰 정수의 안전한 다항식 범위 계산을 사용한다.
- **선택점 기준 이차식:** 선택한 점을 지나는 후보식을 찾고, 1P 전체의 생성 항수·소수 항수·홀수 항수·홀수 소수 항수·비율을 분석한다.
- **c 계수 탐색:** 일반 모드에서는 ±2억 2천만, 클라우버 모드에서는 ±2억 8천만 범위까지 후보 선별과 정확한 후속 검증을 지원한다. 클라우버의 기하 조건은 기존대로 유지한다.
- **고밀도 원거리 탐색:** 최소 배율 **1.15px/칸**을 유지하면서 필요한 화면 구역을 계산하고, 소수 캐시와 Worker로 원거리 탐색을 수행한다.
- **미니맵·UI:** 범위를 SI 단위 100M~1P로 표시하고, 기존 언어 전환·수열 강조·저장 기능 및 단일 HTML 오프라인 실행을 유지한다.

## 성능과 안정성

이번 정식 릴리스에는 개발 중 검증된 **OPT26~OPT36을 모두 포함**했다. 통계 캐시 동치 처리, 64M항 단위 WASM 계산, 수론적 단축, 자연수 수열 중복 계산 제거, Worker 초기화 개선 등을 하나의 안정된 구현으로 통합했다. 이들은 공개 버전을 나누는 개별 기능이 아니라 **1P 확장을 실용적으로 구동하는 내부 최적화**다.

집 데스크톱에서 저부하에 가까운 조건의 v1.5.1 대비 v1.5.7 최종 후보 종합 벤치(5회 교차)에서는 초기 준비와 다중 모드 선택점 분석이 빨라졌고, 최소 배율 고밀도 원거리 화면의 강제 재그리기 성능은 사실상 유지됐다. 이 결과는 해당 PC·벤치 설정에서의 측정이며 모든 컴퓨터에서 같은 배율을 보장하지 않는다.

**이 릴리스의 실행 코드는 최종 시험판 v1.5.7/OPT36과 동일하다.** 파일 헤더·메타데이터·창 제목만 공식 v1.5.0으로 통일했다.

## 버전 정책

- **v1.5.0 (공식)**: 100T → 1P 범위 확장이 포함된 현재 정식 기준본.
- **개발 이력 v1.5.1~v1.5.7**: 공식 릴리스 이전 내부 최적화·검증 후보의 번호로 취급한다. 공개 패치 버전으로 소급하여 나열하지 않는다.
- **이후 v1.5.x**: 1P 탐색 기능을 유지하면서 이루어지는 버그 수정·세부 성능 개선. 앞으로 같은 번호를 사용할 때 과거 내부 시험판과 혼동하지 않도록 공개 태그·파일명을 구분한다.

## 제공 파일

`Ulam.Spiral.Prime-Generating.Quadratic.Explorer.v1.5.0.1P.html` — 설치 없이 브라우저에서 직접 여는 단일 실행 파일.

라이선스: MIT (원저작권자 및 라이선스 문구 보존).
