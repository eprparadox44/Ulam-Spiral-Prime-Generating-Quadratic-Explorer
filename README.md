# Ulam Spiral & Prime-Generating Quadratic Explorer

[한국어 README](README.ko.md)

<img width="570" height="362" alt="Ulam Spiral & Prime-Generating Quadratic Explorer" src="https://github.com/user-attachments/assets/c274ae9d-a1a8-4ea2-a2e1-8f1540010685" />

A standalone HTML web application for exploring the **Ulam spiral from 1 to 1 trillion (10¹²)** and discovering quadratic polynomials that generate unusually many prime numbers.

Rather than simply displaying prime numbers, this application is designed to **investigate patterns in the Ulam spiral, express prime-rich lines as quadratic polynomials, compare prime-generation rates, and search for interesting new sequences**.

For example, you can explore questions such as:

- Which quadratic polynomials correspond to the unusually prime-rich lines in the Ulam spiral?
- Can we find a quadratic polynomial with a higher observed prime-generation rate than the famous `n² − n + 41`?
- How does changing the coefficients `a`, `b`, and `c` affect the frequency of prime values?
- How much do prime-generation rates differ when considering all terms versus only odd-valued terms?
- Can prime-rich patterns be compared across lattice lines with different slopes?

This explorer is intended for anyone who enjoys investigating such mathematical questions through direct experimentation.

## Getting Started

- **Online:** [Launch the Ulam Spiral & Prime-Generating Quadratic Explorer](https://eprparadox44.github.io/Ulam-Spiral-Prime-Generating-Quadratic-Explorer/) directly in your browser.
- **Standalone:** Download [`Ulam Spiral & Prime-Generating Quadratic Explorer.html`](Ulam%20Spiral%20%26%20Prime-Generating%20Quadratic%20Explorer.html) and open it in a browser.
- No installation or separate backend server is required.

## Features

### 1. Discover Quadratic Polynomials in the Ulam Spiral

The Ulam spiral arranges positive integers along a square spiral. Within this arrangement, prime numbers often form visually striking patterns along diagonal and other lattice directions.

Clicking a point allows the application to analyze lattice lines passing through that position and express them as quadratic polynomials.

Features include:

- Analysis of horizontal, vertical, and diagonal directions, including slopes of ±1
- Support for several additional integer and rational slopes
- Recommendations and rankings of prime-rich quadratic sequences
- Highlighting the selected polynomial's prime-number pattern directly on the Ulam spiral
- Statistics including prime counts, overall prime rates, odd-term prime rates, and the length of the analyzed segment

By default, the application displays a selected set of recommended sequences. The **Show all slopes** option allows additional candidates to be examined.

### 2. Compare Prime-Generation Rates

Compare how frequently different quadratic polynomials of the form

`f(n) = an² + bn + c`

produce prime numbers.

The application distinguishes between two prime-generation statistics:

- **Overall prime rate:** The proportion of evaluated sequence terms that are prime.
- **Odd-term prime rate:** The proportion of odd-valued sequence terms that are prime.

For example, if a polynomial has an overall prime rate of 20% but an odd-term prime rate of 40%, this may suggest that many of its non-prime outputs are even numbers.

Comparing both rates helps distinguish simple parity effects from potentially more interesting properties of a polynomial.

You can also compare different coefficient combinations to investigate why certain quadratic sequences produce prime numbers more frequently than others over the tested range.

**Mathematical context:** According to the Prime Number Theorem, the approximate density of primes near a sufficiently large integer `x` is `1 / ln(x)`. When considering only odd integers, the corresponding approximate density is `2 / ln(x)`.

However, quadratic sequences have additional arithmetic structure, including parity restrictions, divisibility by particular small primes, and coefficient-dependent effects. These simple density estimates therefore cannot be applied directly to every polynomial.

The prime rates displayed by the application are **empirical proportions obtained from actual primality tests**, not automatically calculated theoretical probabilities.

When comparing them with theoretical expectations, the magnitude of the generated values and the evaluation interval should also be considered.

### 3. Search for New Prime-Generating Quadratic Polynomials

The sequence search tool allows you to investigate quadratic polynomials of the form

`f(n) = an² + bn + c`

by exploring their coefficients.

Features include:

- Recommended `a` and `b` combinations associated with interesting lattice directions in the Ulam spiral
- Manual specification of `a` and `b` instead of using the recommended combinations
- Configurable start and end values for the constant term `c`
- Candidate prefiltering using small prime numbers
- Primality verification of promising candidates
- Ranking of results with emphasis on odd-term prime rates
- Display of overall prime rates, odd-term prime rates, and small-prime prefilter scores
- Highlighting or saving interesting results for further investigation

**A single search can cover up to 7,000,000 candidate values of `c`.** Larger ranges can be explored through multiple searches.

This makes it possible to experiment with variations of well-known prime-generating polynomials, investigate unusual coefficient combinations, or simply search for sequences with unexpectedly high observed prime rates.

### 4. Save and Revisit Interesting Sequences

Interesting quadratic sequences can be saved in the browser's local storage.

You can:

- Save discovered polynomials together with their prime-generation statistics
- Select a saved sequence or jump back to its location in the Ulam spiral
- Keep multiple sequences for later comparison
- Reorder or delete saved sequences

Saved data remains in the local browser storage and is not automatically synchronized between devices.

### 5. Explore the Ulam Spiral up to 1 Trillion

Navigate the Ulam spiral from 1 to 1 trillion by entering a number, panning the view, or zooming in and out.

Features include:

- Visualization of prime-number distributions
- Direct navigation to a specified integer
- Highlighting prime patterns associated with selected quadratic sequences
- An adjustable-range minimap
- Reuse of previously computed data through caching
- English and Korean interface options

Mobile usage has been considered, although the application was primarily designed for desktop browsers.

## How Computation Scales to 1 Trillion

The application does not calculate and store every prime number up to 1 trillion.

Instead, it computes only the regions required for the current view, taking advantage of the geometric properties of the Ulam spiral, where individual branches correspond to relatively short consecutive integer intervals.

WebAssembly and Web Workers are used for parallel computation, with JavaScript fallback implementations for supported processing paths.

At distant corners, a unified scheduler distributes calculations across the required regions and stores the results in caches. Screen updates are also managed to avoid unnecessary rendering during computation.

These optimizations are intended to make **exploring prime distributions and analyzing quadratic sequences practical even at very large positions in the Ulam spiral**.

## How to Use

1. Open the standalone HTML file or launch the application through GitHub Pages.
2. Enter a positive integer up to 1 trillion in the navigation field, or move around the spiral.
3. Click an interesting point to examine the quadratic polynomials and prime rates associated with lattice lines passing through it.
4. Compare polynomials with different slopes and select a sequence to highlight its pattern in the spiral.
5. Open **Search**, specify the coefficients `a`, `b`, and the range of `c`, and search for new prime-rich quadratic polynomials.
6. Use **Saved** to preserve interesting sequences and revisit them later.

The first visit to a region may require additional computation. Previously calculated results may be retained or evicted from the cache depending on available memory.

The minimap's continuous prime-density background is a **heuristic approximation**, not an exhaustive visualization derived from primality testing every integer in the represented region.

Also, observing a high prime-generation rate over a finite range does not constitute a mathematical proof that a polynomial generates infinitely many primes.

## Repository Structure

| File | Description |
|---|---|
| `index.html` | Main GitHub Pages entry point; complete standalone application |
| `Ulam Spiral & Prime-Generating Quadratic Explorer.html` | Standalone distribution retaining the official filename |
| `README.md` | English documentation |
| `README.ko.md` | Korean documentation |
| `CHANGELOG.md` | Record of major changes |
| `scripts/verify_release.py` | Distribution consistency and structural verification |
| `.github/workflows/verify.yml` | Automated GitHub Actions verification |
| `tests/worker_pool_race.js` | Worker initialization and pool-readiness regression test |
| `LICENSE` | MIT License |

## Development History

**100 million → 400 million → 900 million → … → 4.9 billion → 10 billion → 1 trillion.**

The project began with an attempt to extend the range of prime numbers that could be processed using a complete sieve.

As the target range increased, the implementation evolved toward computing only the necessary regions of the Ulam spiral rather than maintaining an enormous precomputed prime table.

Along the way, features for quadratic polynomial analysis, slope-based comparisons, coefficient searches, and saved sequences were added, resulting in the current application.

Ultimately, the goal is not merely to display as many prime numbers as possible, but to provide **an interactive mathematical tool for discovering and experimenting with interesting patterns in prime-number distributions**.

## Browser Support and Limitations

Recent Chromium-based browsers, Firefox, and other browsers supporting WebAssembly and Web Workers are recommended.

Performance depends on the CPU, available memory, browser, and viewport size.

Saved sequences use browser local storage and are not automatically synchronized across devices.

Prime-generation statistics and candidate search results are based on computations over specified finite ranges. They do not replace mathematical proofs or establish general theorems about unresolved problems in number theory.

## License

This project is distributed under the **MIT License**.

Copyright (c) 2026 지너드, G.nerd (eprparadox44)

Anyone may use, modify, and redistribute the software, including for commercial purposes. However, the original copyright notice and MIT License notice must be preserved when redistributing the software.

See the [LICENSE](LICENSE) file for details.
