# Ulam Spiral & Prime-Generating Quadratic Explorer

[**한국어 README / Korean Documentation**](README.ko.md)

<img width="570" height="362" alt="Ulam Spiral & Prime-Generating Quadratic Explorer screenshot" src="https://github.com/user-attachments/assets/c274ae9d-a1a8-4ea2-a2e1-8f1540010685" />

**Explore prime numbers up to 1 trillion (10¹²) on square and hexagonal spirals, discover prime-generating quadratic polynomials, and compare how frequently different sequences produce primes.**

A standalone, interactive mathematical explorer for number theory enthusiasts, curious programmers, educators, and anyone fascinated by patterns in prime numbers.

The goal is not simply to display large numbers of primes, but to provide a way to **discover, investigate, compare, and experiment with mathematical patterns**.

## Try It

- **[Launch the interactive explorer](https://eprparadox44.github.io/Ulam-Spiral-Prime-Generating-Quadratic-Explorer/)** — Run directly in your browser.
- **Standalone HTML:** Download [`Ulam Spiral & Prime-Generating Quadratic Explorer.html`](Ulam%20Spiral%20%26%20Prime-Generating%20Quadratic%20Explorer.html) and open it in a modern browser.
- No installation, account, or backend service is required.

**Current release:** v1.1.1  
**Maximum supported integer:** 1,000,000,000,000 (10¹²)  
**License:** MIT

## What Can You Explore?

Some questions worth investigating:

- Why do certain diagonals and other lines in an Ulam spiral contain unusually many prime numbers?
- Which quadratic polynomials describe these prime-rich patterns?
- Can a polynomial outperform the famous `n² − n + 41` over a chosen finite interval?
- How does changing `a`, `b`, or `c` in `P(n) = an² + bn + c` affect prime-generation rates?
- How different are the prime-generation rates of all terms and odd-valued terms?
- What patterns emerge when integers are arranged on a hexagonal spiral instead of a square spiral?
- Can interesting polynomial sequences be discovered far from the center of the spiral?

The explorer allows these questions to be investigated experimentally rather than only discussed theoretically.

## Main Features

### 1. Square and Hexagonal Prime Spirals

Explore positive integers arranged in two different geometric patterns.

- **Square spiral:** The traditional Ulam spiral, with its characteristic prime-rich diagonals.
- **Hexagonal spiral:** An alternative six-direction arrangement for investigating different spatial patterns.
- Switch between **Square** and **Hex** modes.
- Navigate to the same integer in either layout and compare its surroundings.
- Pan, zoom, and inspect individual integers and their primality.

The two modes offer different geometric perspectives on the same natural numbers.

### 2. Discover Quadratic Polynomials from Prime Patterns

One of the most interesting properties of the square Ulam spiral is that numbers along many lattice lines can be represented by quadratic polynomials.

The explorer lets you select points and investigate polynomial sequences associated with lines through the selected position.

Features include:

- Analysis of prime-rich lines passing through selected positions
- Quadratic expressions corresponding to lattice directions
- Suggested sequences and coefficients adapted to the active spiral mode
- Multiple supported slopes and directions
- Visual highlighting of selected polynomial sequences
- Comparison of prime-generation statistics

Instead of entering an arbitrary formula first, you can **begin with a visible pattern and discover the mathematics behind it**.

### 3. Compare Prime-Generation Rates

Different quadratic polynomials can produce very different proportions of prime numbers over the same finite range.

For a polynomial

`P(n) = an² + bn + c`

the explorer provides statistics for evaluating how often its terms are prime.

Two particularly useful measures are:

- **Overall prime rate:** The fraction of evaluated terms that are prime.
- **Odd-term prime rate:** The fraction of odd-valued terms that are prime.

These measures help distinguish the effect of even-valued outputs from other arithmetic properties of a sequence.

For example, a polynomial may have a relatively low overall prime rate simply because many of its terms are even. Comparing the odd-term rate can reveal a different picture.

You can examine and compare the observed performance of different polynomials, including variations of famous prime-generating expressions.

**Mathematical context:** The Prime Number Theorem gives an approximate prime density near a sufficiently large integer `x` of

`1 / ln(x)`

and an approximate density among odd integers of

`2 / ln(x)`.

These are useful general benchmarks, but quadratic sequences are not random samples of integers. Their divisibility properties, coefficients, and evaluation intervals can substantially affect their observed prime rates.

The application's prime-generation statistics are **empirical results over finite ranges**, not proofs of theoretical prime-generating probabilities.

### 4. Search for Prime-Generating Quadratic Polynomials

Explore polynomial families of the form

`P(n) = an² + bn + c`

by searching different coefficient combinations.

The search system supports:

- Suggested `(a, b)` combinations appropriate to the selected spiral mode
- Manually chosen coefficients
- Large-range searches over the constant term `c`
- Small-prime prefiltering of candidate polynomials
- Further primality verification of promising candidates
- Ranking and comparison of prime-rich sequences
- Selection and visual highlighting of interesting results

**Version 1.1.1 expands the supported constant-term range to:**

`−7,000,000 ≤ c ≤ +7,000,000`

Both endpoints are included, allowing **up to 14,000,001 candidate values of `c` in a single search**.

This makes it possible to investigate large families of quadratic expressions, compare nearby coefficient choices, and look for unexpectedly prime-rich sequences.

A high observed prime rate does not mean a polynomial will always produce primes. That uncertainty is part of what makes these searches interesting.

### 5. Save and Revisit Interesting Sequences

Found a particularly interesting polynomial?

Save it for later investigation.

- Preserve selected quadratic sequences
- Revisit saved results
- Jump to the associated location in the spiral
- Highlight saved polynomial patterns
- Organize and remove saved entries

Sequences are stored locally in the browser, so they are available during later visits using the same browser and storage profile.

### 6. Explore Integers up to 1 Trillion

The explorer supports navigation over the integer range from **1 to 10¹²**.

- Jump directly to a chosen integer
- Explore nearby prime distributions
- Pan and zoom through large regions
- Use the minimap to understand the current position and scale
- Switch between English and Korean

To support such large positions, the application computes the regions needed for exploration rather than storing the primality of every integer up to 1 trillion.

Web Workers, embedded WebAssembly, and caching help maintain interactive performance.

The interface is primarily designed for desktop use, with mobile layouts also supported.

## How to Use

1. Open the [online explorer](https://eprparadox44.github.io/Ulam-Spiral-Prime-Generating-Quadratic-Explorer/) or the standalone HTML file.
2. Choose **Square** or **Hex** to select the spiral geometry.
3. Enter an integer up to 10¹², or navigate by panning and zooming.
4. Click an interesting point to inspect its associated polynomial sequences.
5. Compare the prime-generation rates of different lines and expressions.
6. Open **Sequence Search** to explore combinations of `a`, `b`, and `c`.
7. Save promising sequences and return to them later.

There is no need to begin with a specific mathematical hypothesis. Sometimes an unusual visual pattern is enough to suggest a new experiment.

## Mathematical Notes and Limitations

This application is intended for **experimental mathematical exploration**, not automated theorem proving.

A few distinctions are important:

- A high prime-generation rate over a finite interval does not establish that a polynomial produces infinitely many primes.
- Comparisons depend on the evaluation range and the magnitudes of the resulting integers.
- General prime-density estimates should not be interpreted as exact theoretical probabilities for a particular quadratic polynomial.
- Visual patterns in a spiral may suggest mathematical structure, but they do not by themselves establish a proof.
- The minimap's continuous prime-density background is a heuristic approximation, not an exhaustive primality calculation of every displayed region.

The first visit to a distant region may require additional computation. Previously computed data may be cached and reused, depending on available memory.

## Development History

**100 million → 400 million → 900 million → … → 4.9 billion → 10 billion → 1 trillion.**

The project began as an attempt to explore increasingly large ranges of prime numbers through direct sieving.

As the supported range expanded, the implementation evolved toward computing only the relevant parts of the spiral.

The exploration tools also developed beyond simple prime visualization, adding quadratic polynomial analysis, coefficient searches, prime-rate comparisons, and saved sequences.

Version 1.1.1 further expands the mathematical visualization with **square and hexagonal spiral modes** and extends the available coefficient-search range.

The long-term purpose remains the same: to provide an interactive tool for discovering interesting patterns in the distribution of prime numbers.

## Browser Support

A recent version of Chrome, Edge, Whale, Firefox, or another modern browser is recommended.

Performance depends on the CPU, available memory, browser, viewport size, and selected operation.

The application is distributed as a self-contained HTML file and requires no separate backend.

Saved sequences use browser local storage and are not automatically synchronized between devices.

## License

This project is distributed under the **MIT License**.

Copyright (c) 2026 지너드, G.nerd (eprparadox44)

Use, modification, redistribution, and commercial use are permitted under the MIT License, provided that the required copyright and license notices are preserved.

See the [LICENSE](LICENSE) file for details.
