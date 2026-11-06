# v1.5.1 Release Verification

- Release source SHA-256 (`index.html`, official filename, versioned filename): `f8425c0c5648b19acd37cbb1b63a8dc09b04764f55edab89436b0d6865f5307f`.
- The three distributed HTML entry points must be byte-identical.
- Standalone HTML retains MIT license, embedded WASM data, 1P limit and 8-Worker cap.
- JavaScript syntax and the selected-point recommendation-duplicate regression cases passed prior to publication.
- Confirmed that index-shift and integer-step fixed-formula subsequences are omitted only from recommendations; fixed and saved formulas are retained.
- The final end-to-end browser performance benchmark is not claimed to have been repeated for this packaging update.
- The GitHub Actions publication job runs repository verification and selected regression scripts before creating the public release.
