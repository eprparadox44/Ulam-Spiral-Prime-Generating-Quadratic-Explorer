# GitHub에 올리는 방법

## A. 웹 화면에서 올리기 (가장 간단함)

1. [GitHub](https://github.com/)에 로그인한 뒤 **New repository**를 누른다.
2. 저장소 이름 예시: `ulam-spiral-prime-quadratic-explorer`.
3. 공개 공유가 목적이라면 **Public**을 선택하고 저장소를 만든다. ZIP 안에 이미 README가 있으므로 생성 과정에서 GitHub의 **Add a README file**을 굳이 체크할 필요는 없다.
4. 내려받은 배포 ZIP을 **먼저 압축 해제**한다.
5. 새 저장소에서 **Add file → Upload files**를 선택하고, 압축 해제된 **프로젝트 폴더 안의 파일과 폴더**를 업로드한 뒤 Commit changes를 누른다. ZIP 파일 그 자체만 업로드하면 GitHub Pages 앱이 실행되지 않는다.
6. `.nojekyll`처럼 점으로 시작하는 파일은 Windows 탐색기에서 드래그할 때 누락될 수 있다. 이 파일은 선택 사항이지만 포함하면 일반 정적 HTML 그대로 게시하기 편하다.
7. **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main, /(root) → Save**를 선택한다.
8. 배포 완료 후 다음 형태의 주소에서 앱을 열 수 있다.

   `https://<GitHub 사용자명>.github.io/ulam-spiral-prime-quadratic-explorer/`

저장소 이름을 다르게 지정했다면 URL 마지막 부분도 바꾼다. 반영되기까지 시간이 걸릴 수 있으며 진행 상태는 **Actions** 또는 **Settings → Pages**에서 확인한다.

참고: [GitHub 공식 Pages 게시 설정 문서](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## B. Git 명령어로 올리기

Git이 설치되어 있다면 압축 해제한 프로젝트 디렉터리에서 다음과 같이 실행할 수 있다. `<USER>`는 자신의 GitHub 사용자명이다.

```bash
git init
git add .
git commit -m "Initial release: Ulam Spiral 1T explorer"
git branch -M main
git remote add origin https://github.com/<USER>/ulam-spiral-prime-quadratic-explorer.git
git push -u origin main
```

원격 저장소는 **비어 있는 상태**로 만들어 두면 충돌을 피하기 쉽다. GitHub 인증은 브라우저 로그인, Git Credential Manager 등 본인에게 맞는 방법을 사용한다.

## 갱신할 때

- `index.html`과 `Ulam Spiral & Prime-Generating Quadratic Explorer.html`에 **같은 최신 HTML**을 복사한다.
- `python scripts/verify_release.py`로 두 파일이 동일한지 검사한다.
- 코드 변경 내용은 `CHANGELOG.md`에 남기고 커밋한다.
- GitHub Pages는 배포용 브랜치에 변경 사항이 커밋되면 다시 게시된다.

## 첫 공개 전 체크리스트

- [ ] GitHub Pages에서 첫 화면이 숫자 1로 시작하는지 확인
- [ ] `1`, 큰 정수, 모서리 인접 좌표 등으로 이동되는지 확인
- [ ] 확대·축소·스크롤·점 선택 및 소수 강조 동작 확인
- [ ] 이차식 탐색, 수열 저장과 다시 불러오기 확인
- [ ] PC와 모바일에서 한영 전환 및 미니맵 확인
- [ ] 정식 파일명 HTML 다운로드 후 오프라인 실행 확인
- [ ] 원하는 공개 라이선스가 있다면 직접 결정하여 `LICENSE` 추가

**라이선스 주의:** 이 패키지에는 권리자의 명시적 선택 없이 재사용 허가를 부여하는 라이선스 파일을 넣지 않았다.
