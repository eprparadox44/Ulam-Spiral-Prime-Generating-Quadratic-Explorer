# Ulam Spiral & Prime-Generating Quadratic Explorer

An interactive, single-file mathematical explorer for visualizing prime numbers on **square and hexagonal spirals** and discovering prime-generating quadratic polynomials.

**Release:** v1.1.1 · **Maximum integer:** 1,000,000,000,000 (10¹²) · **License:** MIT

The application runs in a modern browser. The application is **self-contained in one HTML file**. For GitHub Pages and repository CI, exactly the same HTML bytes are stored under both `index.html` and `Ulam Spiral & Prime-Generating Quadratic Explorer.html`; a version-labeled copy is also provided for downloadable releases. No installation or web service is required.

## Features

- **Square / Hex mode**: switch between square and hexagonal integer spirals. Both modes can navigate to the same integer.
- **Prime visualization**: explore integer positions, pan, zoom, and inspect primality.
- **Quadratic polynomial discovery**: inspect lines through selected points and study the corresponding quadratic expressions.
- **Coefficient search**: search for `P(n) = an² + bn + c`; suggested `(a, b)` combinations adapt to the active grid mode.
- **Expanded `c` range**: inclusive `−7,000,000 ≤ c ≤ +7,000,000` (up to 14,000,001 candidates per search).
- **Sequence highlighting and saved sequences**: preserve and revisit interesting polynomial families.
- **Minimap, language switch (English / 한국어), desktop and mobile layouts.**
- **Performance**: Web Workers and embedded WebAssembly are used for prime computation and selected analyses; large-range performance depends on browser and device.

## Run the app

1. Open `index.html` in Chrome, Edge, Whale, Firefox, or another modern browser.
2. Use **Square / Hex** to switch lattice types.
3. Enter an integer up to `10¹²` to jump to its position; pan or zoom to explore nearby primes.
4. Click a point to analyze lines through it, or open **Sequence Search** to search polynomial coefficients.

### GitHub Pages

For a repository using `main` as its default branch:

1. Place `index.html` in the repository root.
2. Navigate to **Settings → Pages**.
3. Select **Deploy from a branch**, branch **main**, folder **/(root)**, then save.

The hosted app is then served directly from the repository's `index.html`.

### Updating an existing GitHub repository

Upload the **three** provided HTML files to the repository root in the **same commit**, replacing any existing `index.html` and `Ulam Spiral & Prime-Generating Quadratic Explorer.html`. Keep the existing `.github/workflows/` and `scripts/verify_release.py` files intact. All three HTML copies in this package are byte-identical. GitHub Actions checks the first two for exact byte equality.

The version-labeled file is optional for Pages and CI, but useful as a Release download. For Releases, attach that file instead of a copy renamed locally after uploading.

## Project files

- `index.html` — GitHub Pages HTML entry point (complete stand-alone app)
- `Ulam Spiral & Prime-Generating Quadratic Explorer.html` — official HTML entry point; **must be byte-identical to `index.html`** for the existing GitHub Actions verifier
- `Ulam Spiral & Prime-Generating Quadratic Explorer v1.1.1.html` — same HTML content, version-labeled release attachment
- `README.md` — project overview and usage instructions
- `LICENSE` — MIT License
- `RELEASE_NOTES_v1.1.1.md` — highlights of the current release

Existing GitHub Actions workflows from prior releases should be **kept** when updating a repository. They are not replaced by this upload kit.

## Korean overview / 한국어 안내

이 프로그램은 최대 **1조**까지 소수를 사각형 또는 육각형 울람 나선에 표시하고, 소수가 밀집된 직선에서 이차식을 탐색하는 도구입니다. **사각 / 육각** 전환, 두 격자별 추천 계수, `c = −7000000 ~ +7000000` 탐색, 수열 강조 및 저장을 지원합니다. 프로그램은 HTML 단독으로 실행되며, 저장소 CI 검증을 위해 `index.html`과 버전명이 없는 정식 HTML 파일의 내용이 완전히 같아야 합니다.

## License

MIT License · Copyright (c) 2026 지너드, G.nerd (eprparadox44). See [LICENSE](LICENSE).
