# v1.4.5 Verification / 검증

- Reproduction: n=99,999,076,320,761 corresponds to Hex axial (q,r)=(-5,773,476, 953,031).
- Maximum 100T Hex axial radius is 5,773,503, while Square MAX_R is 5,000,000. The previous zoomed minimap applied the Square clamp, projecting the point to normalized x≈-21.18 (outside its [0,1] frame) at level 1B.
- After the fix, that point projects to x≈0.4993, y≈0.5015 at level 1B.
- Full 100T minimap overview is unchanged. Other lattice modes are unchanged.
- Added `tests/hex_minimap_edge.js` to check 42 zoom-level / outer-hex-position cases, all six outer vertices in the world view, and unchanged Square camera limits.
- SHA-256 of the three official HTML files: `1d25d2e8b23c41f6565e4ae9c6a2bb3413e4c04bc72edc8f9b8803010f278b97`; Git blob SHA-1: `305f1a43bf8e6a6b6bf5315a7ee85b1bd088d3c9`.
- Automated geometry checks do not replace user-side visual inspection under all display sizes.
