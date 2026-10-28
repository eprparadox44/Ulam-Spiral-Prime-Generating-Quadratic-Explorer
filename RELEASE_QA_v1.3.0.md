# v1.3.0 pre-upload verification (2026-10-28)

- **Published GitHub baseline:** v1.2.26 (repository `main`, confirmed before packaging).
- **Implementation baseline:** local v1.3.5 (`Ulam_Spiral_v1.3.5_SAVED_CONSISTENCY_BETA.html`), incorporating all previously prepared v1.3.1–v1.3.5 fixes.
- **Release renaming:** `Release:` header and `<meta name="application-version">` changed to v1.3.0; **all embedded JavaScript and CSS remain byte-for-byte identical** to the local v1.3.5 reference.
- `index.html`, official unversioned HTML and `v1.3.0.html` are byte-identical.
- Python 3.13 and Node.js 22 static package verifier: PASS.
- Six independent test scripts: PASS.
  - 93,846 mathematical, natural-index, geometry, region-ownership and primality checks.
  - 2,623 selected-point deduplication checks.
  - 20,000 randomly generated small-range quadratic multiset checks.
  - Saved mode switching, semantic statistics, cache and persistence/migration checks: PASS.
  - Both Worker ready/cleanup race regression tests: PASS.
- The tests cannot establish formal correctness for all large inputs or confirm long-running memory performance.
- **Interactive browser and device QA:** Not completed in this package preparation turn. It remains required before considering the deployed site fully validated.
- **GitHub Actions and Pages:** Pending upload. No GitHub repository mutation, tag or release was performed.
- Existing v1.2.26 and earlier source archives in the GitHub repository must be retained.

## Release SHA-256

```text
df6be4b5dd0159d82cad40d64baf8c33892cd79f2bc36f544a547ecc5f0f9426  index.html
df6be4b5dd0159d82cad40d64baf8c33892cd79f2bc36f544a547ecc5f0f9426  Ulam Spiral & Prime-Generating Quadratic Explorer.html
df6be4b5dd0159d82cad40d64baf8c33892cd79f2bc36f544a547ecc5f0f9426  Ulam Spiral & Prime-Generating Quadratic Explorer v1.3.0.html
```

## Important packaging distinction

This ZIP is an **overlay for the existing repository**, not a full Git clone. All files in the archive are updated/new files; old versioned HTML files are deliberately not included and should not be deleted from the remote repository.
