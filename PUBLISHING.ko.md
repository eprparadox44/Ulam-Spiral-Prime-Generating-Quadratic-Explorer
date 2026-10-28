# v1.3.0 — 기존 GitHub 저장소 갱신

대상: https://github.com/eprparadox44/Ulam-Spiral-Prime-Generating-Quadratic-Explorer

이 묶음은 **v1.2.26이 공개된 기존 저장소**의 루트에 덮어쓰는 업데이트용이다. 새 저장소를 만들 필요는 없다. 새로 공개하는 v1.3.0에는 로컬 v1.3.5 베타까지의 수학적 오류 수정과 키보드 조작도 포함된다.

## GitHub 웹 화면에서 업로드

1. 배포 ZIP을 압축 해제한다. ZIP 자체만 올리지 않는다.
2. 저장소 `main`에서 `Add file` → `Upload files`로 이동한다.
3. 압축 해제한 내용물을 업로드하여 같은 이름의 파일을 갱신하고 새 파일을 추가한다. `.github/workflows/verify.yml`, `tests/`도 포함해야 한다. 폴더가 업로드되지 않으면 아래 Git 방식으로 반영한다.
4. **기존 `v1.2.26.html`, `v1.1.1.html`, 이전 릴리스 노트와 해시 파일은 삭제하지 않는다.** 이 ZIP은 변경 대상 파일만 포함한다.
5. GitHub Actions `Verify standalone HTML`에서 버전 검증과 수학·저장·Worker 회귀 테스트가 모두 통과했는지 확인한다.
6. [GitHub Pages](https://eprparadox44.github.io/Ulam-Spiral-Prime-Generating-Quadratic-Explorer/)에 접속해 실제 동작을 확인한다. 특히 클라우버 선택점, 저장·재로딩, 자연수 수열의 중복 제거, 미니맵 1억·10억 밀도, Tab/Enter/방향키 조작을 확인한다.
7. 필요하다면 검증이 끝난 뒤 GitHub Releases에서 `v1.3.0` 태그를 발행한다. 이번 파일 준비는 태그 발행이나 원격 업로드를 포함하지 않는다.

## 로컬 Git으로 업로드

```bash
git clone https://github.com/eprparadox44/Ulam-Spiral-Prime-Generating-Quadratic-Explorer.git
cd Ulam-Spiral-Prime-Generating-Quadratic-Explorer
# ZIP 안의 모든 파일과 폴더를 이 디렉터리에 복사해 기존 파일을 덮는다.
python3 scripts/verify_release.py --require-node
bash tests/run_all.sh
git add -A
git commit -m "Release v1.3.0: Klauber mode, minimap and reliability fixes"
git push origin main
```

## 필수 구조

- `index.html` · `Ulam Spiral & Prime-Generating Quadratic Explorer.html` · `Ulam Spiral & Prime-Generating Quadratic Explorer v1.3.0.html`: **바이트 단위 동일**
- `README.md`, `README.ko.md`: 프로젝트 소개
- `RELEASE_NOTES_v1.3.0.md`, `CHANGELOG.md`: 변경 내역
- `scripts/verify_release.py`: 패키지 검증
- `.github/workflows/verify.yml`, `tests/`: GitHub Actions 및 수학 회귀 테스트
- `checksums.sha256`, `checksums_v1.3.0.sha256`: SHA-256 검증

추가 확인: `RELEASE_QA_v1.3.0.md`.
