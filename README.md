# Ulam Spiral & Prime-Generating Quadratic Explorer

[한국어 안내](README.ko.md)

<img width="570" height="362" alt="Ulam spiral and prime-generating quadratic explorer" src="https://github.com/user-attachments/assets/c274ae9d-a1a8-4ea2-a2e1-8f1540010685" />

A browser-based tool for exploring **prime numbers** and the patterns formed by quadratic sequences. It places numbers in five different spirals and lets you explore as far as **1 quadrillion (1P, 10¹⁵)**.

**Current public release: v1.5.0 (November 4, 2026)** · [MIT License](LICENSE)

## Open the explorer

[**Run in your browser**](https://eprparadox44.github.io/Ulam-Spiral-Prime-Generating-Quadratic-Explorer/) · [Download a single HTML file](Ulam%20Spiral%20%26%20Prime-Generating%20Quadratic%20Explorer.html)

The downloaded file works without installation or an internet connection.

## What you can do

- Explore primes using Square Ulam, Hexagonal, Triangular, Sacks, and Klauber Triangle layouts.
- Zoom and move around the spirals, from small numbers to 1P. A minimap helps with distant regions.
- Select a number to find quadratic sequences passing through it, then see how many terms are prime within the explored range.
- Search for interesting formulas of the form `at² + bt + c` by varying the constant term **c**.
- Save formulas to revisit them later in the same browser. The interface supports English and Korean.

## What's new in v1.5.0

Since the previous public release (**v1.4.7**), the maximum exploration range has increased **from 100 trillion to 1 quadrillion**. Large-number sequence analysis now works across that range. The constant-term search supports **±220 million** in Square, Hexagonal, Triangular and Sacks modes, and **±280 million** in Klauber Triangle.

See the [v1.5.0 release notes](RELEASE_NOTES_v1.5.0.md) or [release history](CHANGELOG.md).

## A note on the results

A measured prime rate describes the finite range being examined; it is not a proof that a formula produces infinitely many primes. Minimap brightness is an estimate rather than a count of every number in the region.

© 2026 G.nerd (eprparadox44) · MIT.
