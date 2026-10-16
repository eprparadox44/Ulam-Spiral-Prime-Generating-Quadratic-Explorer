# Ulam Spiral & Prime-Generating Quadratic Explorer

[**한국어 README**](README.ko.md)

<img width="570" height="362" alt="Ulam Spiral & Prime-Generating Quadratic Explorer — square spiral and polynomial analysis" src="https://github.com/user-attachments/assets/c274ae9d-a1a8-4ea2-a2e1-8f1540010685" />

Explore prime-number patterns on **square and hexagonal spirals**, investigate prime-rich lines, and discover quadratic polynomials that produce unusually many primes — all within the integer range **1 to 1 trillion (10¹²)**.

This is a self-contained, interactive mathematical explorer for anyone interested in prime numbers, number theory, or discovering patterns through experimentation.

## Try the explorer

- **[Launch the online explorer](https://eprparadox44.github.io/Ulam-Spiral-Prime-Generating-Quadratic-Explorer/)**
- **[Download the standalone HTML](Ulam%20Spiral%20%26%20Prime-Generating%20Quadratic%20Explorer.html)** and open it in a modern browser.

No installation or separate server is required. **Current release: v1.1.1 · License: MIT.**

## Mathematical questions to explore

- Why do certain lines in prime spirals contain unusually many primes?
- Which quadratic polynomials correspond to those lines?
- How does the prime distribution change between square and hexagonal arrangements?
- Can you find a polynomial with a higher observed prime rate than the famous `n² − n + 41` over a chosen interval?
- How do changes to the coefficients `a`, `b`, and `c` affect prime-generation rates?
- How different are the results when considering all sequence terms versus only odd-valued terms?

## Main features

### Square and hexagonal prime spirals

Choose between the traditional **square Ulam spiral** and a **hexagonal integer spiral**. Both display the same positive integers in different geometric arrangements.

- Switch between **Square** and **Hex** modes.
- Jump to a particular integer, pan, and zoom.
- Select a point to inspect its number and primality.
- Compare prime-rich patterns across the two layouts.
- Highlight a chosen polynomial sequence on the spiral.

### Discover quadratic polynomials from visible patterns

Prime-rich lines can suggest arithmetic patterns. Select a point to investigate lattice directions and their associated quadratic expressions.

- Examine lines and suggested sequences through a selected point.
- Explore supported integer and rational directions where available.
- Review prime counts and sequence statistics.
- Highlight a selected sequence directly on the spiral.
- Explore coefficient suggestions appropriate to the current spiral mode.

You can start with an interesting line on the screen, then inspect the polynomial behind it — or start with a polynomial and look for its geometric pattern.

### Compare observed prime-generation rates

Investigate expressions of the form:

**`P(n) = an² + bn + c`**

The explorer distinguishes between statistics for **all evaluated terms** and for **odd-valued terms**, making it easier to see the effect of even outputs on the observed prime rate.

For mathematical context, the Prime Number Theorem gives a rough prime density near a large positive integer `x` of `1 / ln(x)`, or approximately `2 / ln(x)` among odd integers. Quadratic sequences have additional divisibility structure, so these are **reference approximations, not exact probabilities for a particular polynomial**.

The displayed sequence statistics are calculated over finite ranges. A high observed prime rate does not imply that a polynomial always produces primes or produces infinitely many primes.

### Search for prime-generating quadratic polynomials

Explore different combinations of `a`, `b`, and `c` in `P(n) = an² + bn + c`.

- Use suggested `(a, b)` combinations adapted to the current **Square / Hex** mode, or enter your own values.
- Specify a search interval for the constant term `c`.
- Screen candidates using small primes and examine promising results with primality checks.
- Compare and rank prime-rich candidate sequences.
- Highlight or save interesting results for later exploration.

**In v1.1.1, the supported `c` range is `−7,000,000 ≤ c ≤ +7,000,000`, inclusive — up to 14,000,001 candidate values in one search.** Search time depends on the coefficients, interval, and device.

### Save and revisit sequences

Save interesting quadratic expressions in the browser's local storage, revisit their positions, and compare their statistics. Saved sequences stay in the current browser profile and are **not automatically synchronized across devices**.

### Explore integers up to one trillion

Navigate integers from **1 through 1,000,000,000,000** without precomputing every prime in that range. The application calculates the regions needed for the current view, reuses cached results when possible, and uses Web Workers and embedded WebAssembly for supported calculations.

An adjustable minimap and English/Korean interface are provided. The interface is primarily designed for desktop use, with mobile layouts also supported.

## Getting started

1. Open the **[online explorer](https://eprparadox44.github.io/Ulam-Spiral-Prime-Generating-Quadratic-Explorer/)** or the standalone HTML file.
2. Choose **Square** or **Hex**.
3. Enter an integer up to `10¹²`, or pan and zoom to inspect a region.
4. Select a point to investigate its associated lines, quadratic expressions, and prime rates.
5. Use **Search** to explore polynomial coefficients; save your favorite sequences for later.

## Notes and limitations

- The first visit to a distant region may require computation; previously calculated data may be reused or cleared depending on memory availability.
- The minimap's smooth prime-density background is a **heuristic approximation**, not a complete enumeration of primes in that region.
- Statistics and search results concern **finite intervals**. They are tools for mathematical exploration, not proofs of conjectures about primes.
- Performance depends on the browser, CPU, available memory, viewport size, and the selected operation.

## Project history

The supported range developed from **100 million → 400 million → 900 million → … → 4.9 billion → 10 billion → 1 trillion**. The focus gradually shifted from calculating ever larger complete sieves to efficiently exploring only the regions of interest.

The project also grew from a prime visualization into a tool for **discovering quadratic expressions, comparing observed prime rates, and searching for interesting sequences**. Square and hexagonal spiral modes now provide two ways to investigate the same integers.

## License

Distributed under the **MIT License**.

Copyright (c) 2026 지너드, G.nerd (eprparadox44)

Use, modification, redistribution, and commercial use are permitted subject to the conditions of the [LICENSE](LICENSE) file, including preservation of the required copyright and license notices.
