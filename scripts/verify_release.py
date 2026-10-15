#!/usr/bin/env python3
"""Release verification for Ulam Spiral & Prime-Generating Quadratic Explorer.

Standalone Python + optional Node syntax check. The release version is read from
its canonical HTML comment, not hardcoded to a previous release.

Usage: python3 scripts/verify_release.py --require-node
"""
from __future__ import annotations

import argparse
from html.parser import HTMLParser
from pathlib import Path
import re
import shutil
import subprocess
import sys

OFFICIAL_NAME = 'Ulam Spiral & Prime-Generating Quadratic Explorer.html'
PROJECT_TITLE = 'Ulam Spiral & Prime-Generating Quadratic Explorer'
RELEASE_VERSION = 'v1.1.1'


class DocumentParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.inline_scripts = []
        self.external_scripts = []
        self.stylesheet_links = []
        self._in_script = False

    def handle_starttag(self, tag, attrs):
        props = dict(attrs)
        if tag == 'script':
            self._in_script = True
            if props.get('src'):
                self.external_scripts.append(props['src'])
        if tag == 'link' and props.get('rel') == 'stylesheet':
            self.stylesheet_links.append(props.get('href'))

    def handle_endtag(self, tag):
        if tag == 'script':
            self._in_script = False

    def handle_data(self, value):
        if self._in_script:
            self.inline_scripts.append(value)


def check(description: str, passed: bool) -> None:
    print(f"{'PASS' if passed else 'FAIL'}: {description}", flush=True)
    if not passed:
        raise SystemExit(1)


def main() -> None:
    ap = argparse.ArgumentParser(description='Verify the standalone v1.1.1 release')
    ap.add_argument('--require-node', action='store_true', help='Fail if Node is unavailable')
    args = ap.parse_args()

    root = Path(__file__).resolve().parent.parent
    index = root / 'index.html'
    official = root / OFFICIAL_NAME
    check('both HTML entry points exist', index.is_file() and official.is_file())

    main_bytes, official_bytes = index.read_bytes(), official.read_bytes()
    check('index.html and official HTML are byte-identical', main_bytes == official_bytes)
    data = main_bytes.decode('utf-8-sig')
    doc = DocumentParser()
    doc.feed(data)
    check('standalone HTML document',
          data.lstrip().lower().startswith('<!doctype html>')
          and '<html' in data and '<style>' in data
          and len(doc.inline_scripts) == 1
          and not doc.external_scripts and not doc.stylesheet_links)
    check('official application title', PROJECT_TITLE in data)
    check('maximum value 10^12', 'MAX_N=1000000000000' in data)
    check('160 ms corner preview throttle',
          bool(re.search(r'CORNER_PREVIEW_FRAME_INTERVAL_MS\s*=\s*160\b', data)))
    check('fast startup at Ulam number 1',
          'Startup always begins at Ulam number 1' in data)
    check('range-input spacing refinement',
          '#jumpInput' in data and 'padding-left:8px;padding-right:8px' in data)
    check('diagnostic UI not embedded',
          'id="debugPanel"' not in data and 'id="diagnosticPanel"' not in data
          and 'id="testDiagnostics"' not in data)

    comment = re.search(r'<!--([\s\S]*?)-->', data)
    check(f'{RELEASE_VERSION} release marker in comment',
          bool(comment and re.search(r'^\s*Release:\s*' + re.escape(RELEASE_VERSION) + r'\s*$',
                                      comment.group(1), re.M)))
    check('square/hex lattice controls',
          all(f'id="{key}"' in data for key in ('shapeSquare','shapeHex','shapeToggle')))
    check('hexagonal quadratic search presets',
          'SEARCH_AB_PRESETS_HEX' in data and 'SEARCH_AB_PRESETS_SQUARE' in data)
    check('c search defaults support +/-7,000,000',
          'id="cMin" inputmode="numeric" value="-7000000"' in data
          and 'id="cMax" inputmode="numeric" value="7000000"' in data)
    check('MIT license declaration retained',
          'MIT License' in data and 'Permission is hereby granted' in data)

    node = shutil.which('node')
    if args.require_node:
        check('Node.js is available', bool(node))
    if node:
        js = '\n'.join(doc.inline_scripts)
        proc = subprocess.run([node, '--check', '-'], input=js, text=True,
                              stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if proc.returncode != 0:
            print(proc.stderr, file=sys.stderr)
        check('JavaScript syntax (node --check)', proc.returncode == 0)
    else:
        print('SKIP: JavaScript syntax (Node.js not installed)')

    print(f'PASS: {RELEASE_VERSION} release verification complete')


if __name__ == '__main__':
    main()
