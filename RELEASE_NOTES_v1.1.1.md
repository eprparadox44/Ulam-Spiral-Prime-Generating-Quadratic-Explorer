# v1.1.1 — Square & Hexagonal Spirals

## Release summary

The **Ulam Spiral & Prime-Generating Quadratic Explorer** now provides both square and hexagonal prime spirals in a **single, self-contained HTML application**, while retaining the existing square-mode exploration and computational approach.

### What's new

- **Square / Hex switch** to explore the same integer in either lattice.
- **Hexagonal spiral support** with hex-specific coordinate mapping, visualization, line analysis, minimap, and prime computations.
- **Grid-aware coefficient suggestions**: the quadratic search uses distinct recommended `(a,b)` sets for square and hexagonal modes.
- **Expanded constant search**: `c` can range from `−7,000,000` through `+7,000,000`, inclusive (14,000,001 candidates at the widest setting).
- Preserves bilingual UI, saved sequences, and 1T numerical range.

### Distribution

- **GitHub Pages:** commit the package's `index.html` to the repository root.
- **Release asset:** attach `Ulam_Spiral_1T_SQUARE_HEX_INTEGRATED_v1.1.1.html` for one-file offline use.
- **Version tag:** `v1.1.1`.

### Verification note

The application includes browser-based worker/WASM computation. This release kit verifies file integrity, release labeling, and JavaScript syntax, but it is **not a replacement for device-specific performance and browser UI testing**.
