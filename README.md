# Ulam Spiral & Prime-Generating Quadratic Explorer

[**한국어 README**](README.ko.md)

<img width="570" height="362" alt="Ulam spiral and prime-generating quadratic explorer" src="https://github.com/user-attachments/assets/c274ae9d-a1a8-4ea2-a2e1-8f1540010685" />

An interactive, self-contained HTML application for exploring prime-number patterns and quadratic sequences over **1 ≤ N ≤ 10¹²**.

**Current release: v1.3.0 (October 28, 2026).** License: [MIT](LICENSE).

## Launch

- **[Open online (GitHub Pages)](https://eprparadox44.github.io/Ulam-Spiral-Prime-Generating-Quadratic-Explorer/)**
- **[Download the standalone HTML](Ulam%20Spiral%20%26%20Prime-Generating%20Quadratic%20Explorer.html)**

Open the HTML file in a modern browser. No build, installation, or separate server is needed.

## What's new since v1.2.26

### Klauber Triangle mode

- Explore integers in **Klauber triangular coordinates**, alongside Square, Hexagonal, Triangular and Sacks spiral modes.
- Select a point to examine geometric directions and candidate quadratic sequences through it.
- In Klauber mode, the displayed global polynomial **`G(n) = an² + bn + c`** uses **natural-number indices (`n ≥ 1`)**; the internal row coordinate is **`r = floor(sqrt(N−1))`**.
- Klauber-specific search offers geometric line filtering and an extended constant-term search domain (up to **±10 billion** in the supported preset workflow). Search candidates are screened heuristically; results are not a proof of a global optimum.

### See sparse prime sequences on the minimap

- Minimap levels: **100M / 1B / 10B / 100B / 1T**. `+` zooms in and `−` zooms out.
- At **100M** and **1B**, when an active formula is *predicted* to produce at most 10 visible primes in the main viewport at minimum zoom, the minimap can switch to **exact checked-term prime-density** visualization.
- The qualifying decision is an **estimate** based on prime-probability heuristics and on the geometric path of the sequence, not a guaranteed prime count.
- Once selected, **every eligible term in the relevant minimap sequence range** is checked for primality, not a random sample. The shaded density visualizes the **local proportion of prime terms along that sequence**, not the density of all integers.
- Expensive cases and larger minimap levels retain the conventional highlighted sequence line instead. Census work is performed in a Worker and results may be cached.

## Explore

- Switch among **Square, Hexagonal, Triangular, Sacks and Klauber Triangle** modes.
- Navigate to a number, pan/zoom, inspect prime status and geometric patterns.
- Discover, compare, highlight and save quadratic sequences `P(n)=an²+bn+c`.
- Search promising coefficients with small-prime screening and further primality checks.
- Compare finite-range total-term and odd-output prime rates, where provided.
- Store sequences in browser-local storage (not synchronized between devices).
- Use an English / Korean interface; desktop and mobile layouts are supported.

## Mathematical and performance notes

- Prime proportions are measured over finite intervals, **not** a proof that a formula produces infinitely many primes.
- Near large `N`, `1/ln(N)` is a baseline prime-density heuristic; polynomial divisibility may change actual rates substantially.
- The low-prime-visibility trigger on the minimap is probabilistic. The density computation, **when enabled**, is a census of the eligible terms within its budget — **not** of every integer in the entire 100M/1B range.
- The minimap background shading (when present) remains a heuristic guide independent of the selected sequence's census overlay.
- Large computations, worker setup and memory requirements depend on browser, CPU and available memory.

## Release and development

The two primary improvements since the last GitHub upload (**v1.2.26**) are Klauber Triangle support and improved minimap visibility for prime-sparse sequences. See [v1.3.0 release notes](RELEASE_NOTES_v1.3.0.md) and [Changelog](CHANGELOG.md).

To validate a release checkout: `python3 scripts/verify_release.py --require-node` (Python 3 and Node.js required).

## License

[MIT License](LICENSE) — Copyright (c) 2026 지너드, G.nerd (eprparadox44).
