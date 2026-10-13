#!/usr/bin/env python3
"""Structural + MIT license + JavaScript syntax checks for official standalone release.

Run from any directory: python3 scripts/verify_release.py
Requires Python 3.9+. If node is installed, also checks the embedded JS syntax.
In CI use --require-node to make Node.js required.
"""
from __future__ import annotations
from pathlib import Path
import hashlib
import re
import shutil
import subprocess
import sys
import tempfile

root = Path(__file__).resolve().parents[1]
standalone = 'Ulam Spiral & Prime-Generating Quadratic Explorer.html'
paths = [root / 'index.html', root / standalone]

def check(name, condition):
    print(('PASS' if condition else 'FAIL') + ': ' + name)
    if not condition:
        raise SystemExit(1)

check('both HTML entry points exist', all(p.is_file() for p in paths))
a, b = (p.read_bytes() for p in paths)
check('index.html and official HTML are byte-identical', a == b)
html = a.decode('utf-8')
check('standalone HTML document', html.lower().startswith('<!doctype html>') and '<html' in html and '</html>' in html)
check('official application title', 'Ulam Spiral &amp; Prime-Generating Quadratic Explorer' in html)
check('maximum value 10^12', 'MAX_N=1000000000000' in html or 'MAX_N=1000000000000,' in html or 'MAX_N=1000000000000;' in html or 'MAX_N=1000000000000,MAX_R' in html or 'let MAX_N=1000000000000' in html)
check('160 ms corner preview throttle', 'CORNER_PREVIEW_FRAME_INTERVAL_MS=160' in html)
check('fast startup at Ulam number 1', 'Startup always begins at Ulam number 1' in html)
check('range-input spacing refinement', '#jumpInput::placeholder{font-size:.93em}' in html)
check('diagnostic UI not embedded', all(x not in html for x in ['cornerAuditStart', 'cornerAuditHotVisit']))
check('v1.0.2 release marker in comment', 'Release: v1.0.2' in html.split('</html>')[0])

license_path = root / 'LICENSE'
check('root LICENSE file is present', license_path.is_file())
license_body = license_path.read_text(encoding='utf-8').strip()
check('MIT license and author attribution', license_body.startswith('MIT License\n') and 'Copyright (c) 2026 지너드, G.nerd (eprparadox44)' in license_body)
check('entire LICENSE text is embedded in standalone HTML', license_body in html)
check('LICENSE appears in a non-rendering HTML comment', bool(re.search(r'<!--[^>]*'+re.escape(license_body)+r'[^>]*-->', html, flags=re.S)))

js_scripts = re.findall(r'<script(?:\s+[^>]*)?>([\s\S]*?)</script\s*>', html, re.I)
check('exactly one embedded application script', len(js_scripts) == 1 and "'use strict'" in js_scripts[0])
node = shutil.which('node')
if '--require-node' in sys.argv:
    check('Node.js is installed for JS syntax testing', node is not None)
if node:
    with tempfile.TemporaryDirectory() as tmp:
        js_path = Path(tmp) / 'ulam-embedded.js'
        js_path.write_text(js_scripts[0], encoding='utf-8')
        proc = subprocess.run([node, '--check', str(js_path)], capture_output=True, text=True)
        if proc.returncode:
            print(proc.stderr)
        check('embedded JavaScript syntax (node --check)', proc.returncode == 0)
else:
    print('SKIP: JavaScript syntax test (install Node.js or use GitHub Actions)')

checksum_path = root / 'checksums.sha256'
check('checksums.sha256 is present', checksum_path.is_file())
expected = [f'{hashlib.sha256(a).hexdigest()}  index.html', f'{hashlib.sha256(b).hexdigest()}  {standalone}']
recorded = checksum_path.read_text(encoding='utf-8').strip().splitlines()
check('release SHA-256 checksums match both HTML files', recorded == expected)

print('PASS: v1.0.2 structural / attribution / syntax checks')
print('SHA-256:', hashlib.sha256(a).hexdigest())
print('HTML bytes:', len(a))
