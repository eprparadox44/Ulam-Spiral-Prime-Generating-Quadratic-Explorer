#!/usr/bin/env python3
"""Check the two required identical standalone HTML entry points."""
from pathlib import Path
import hashlib
import sys

root = Path(__file__).resolve().parents[1]
a = root / "index.html"
b = root / "Ulam Spiral & Prime-Generating Quadratic Explorer.html"

if not a.is_file() or not b.is_file():
    sys.exit("FAIL: one or both HTML entry points are missing")

one, two = a.read_bytes(), b.read_bytes()
if one != two:
    sys.exit("FAIL: index.html and official standalone HTML differ")

html = one.decode("utf-8")
checks = {
    "standalone HTML shell": "<!doctype html>" in html.lower() and "<script>" in html and "</script>" in html,
    "official project title": "Ulam Spiral &amp; Prime-Generating Quadratic Explorer" in html,
    "1T upper bound": "1000000000000" in html,
    "160ms corner preview": "CORNER_PREVIEW_FRAME_INTERVAL_MS=160" in html,
    "startup at 1": "Startup always begins at Ulam number 1" in html,
    "range placeholder refinement": "#jumpInput::placeholder{font-size:.93em}" in html,
    "no profiling UI": "cornerAuditStart" not in html and "cornerAuditHotVisit" not in html,
}
for label, ok in checks.items():
    print(("PASS" if ok else "FAIL") + ": " + label)
if not all(checks.values()):
    sys.exit(1)
print("PASS: identical entry points; bytes=", len(one))
print("SHA-256:", hashlib.sha256(one).hexdigest())
