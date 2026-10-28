# GitHub v1.3.0 업로드 안내 (2026-10-28)

목표 저장소: https://github.com/eprparadox44/Ulam-Spiral-Prime-Generating-Quadratic-Explorer
기준 브랜치: main / 마지막 공개 버전 v1.2.26

1. 이 ZIP을 압축 해제한다. **ZIP 파일만 업로드하지 않는다.**
2. 저장소의 Add file → Upload files 화면에 압축 해제된 파일과 폴더를 추가한다.
3. 동일한 이름의 파일은 새 버전으로 교체한다. 기존 `v1.2.26.html`, `v1.1.1.html`, `RELEASE_NOTES_v1.1.1.md` 및 `checksums_v1.2.26.sha256`은 삭제하지 않는다.
4. `index.html`, 공식 무버전 HTML 및 `v1.3.0.html`은 완전히 동일한 내용이어야 한다.
5. GitHub Actions의 Verify standalone HTML 작업에서 Release verifier와 regression tests가 통과하는지 확인한다.
6. GitHub Pages 루트 URL을 열어 실제 동작(숫자 이동, 나선 전환, 클라우버, 저장·재로드, 밀도 미니맵)을 검사한다.
7. 최종 검증 뒤 GitHub Releases에 `v1.3.0` 태그와 `RELEASE_NOTES_v1.3.0.md` 내용으로 릴리스를 만들 수 있다. 릴리스 작성은 별도 작업이다.

*이 패키지는 새 버전으로 바뀌는/추가되는 파일들을 담은 GitHub 덮어쓰기용 묶음이다. 기존 저장소의 이전 버전 파일은 포함하지 않으며 업로드 후에도 그대로 유지해야 한다.*
