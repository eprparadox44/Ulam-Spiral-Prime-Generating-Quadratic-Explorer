#!/usr/bin/env python3
"""Verify a self-contained Ulam Spiral release, including the three HTML aliases.

Reads the release version from the HTML header and checks the matching versioned
artifact; no old version number or removed UI control IDs are hardcoded.
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

PROJECT_TITLE = 'Ulam Spiral & Prime-Generating Quadratic Explorer'
OFFICIAL_NAME = PROJECT_TITLE + '.html'
RELEASE_RE = re.compile(r'^\s*Release:\s*(v\d+\.\d+\.\d+)(?=\s|$)', re.M)


class DocumentParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.inline_scripts = []
        self.external_scripts = []
        self.stylesheet_links = []
        self.style_count = 0
        self._in_script = False

    def handle_starttag(self, tag, attrs):
        props = dict(attrs)
        if tag == 'script':
            self._in_script = 'src' not in props
            if props.get('src'):
                self.external_scripts.append(props['src'])
        elif tag == 'style':
            self.style_count += 1
        elif tag == 'link' and 'stylesheet' in (props.get('rel') or '').lower().split():
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
    ap = argparse.ArgumentParser(description='Verify the current standalone release')
    ap.add_argument('--require-node', action='store_true', help='Fail if Node.js is unavailable')
    args = ap.parse_args()

    root = Path(__file__).resolve().parent.parent
    index = root / 'index.html'
    official = root / OFFICIAL_NAME
    check('both HTML entry points exist', index.is_file() and official.is_file())
    main_bytes = index.read_bytes()
    check('index.html and official HTML are byte-identical', main_bytes == official.read_bytes())
    try:
        data = main_bytes.decode('utf-8-sig')
    except UnicodeDecodeError:
        check('UTF-8 HTML encoding', False)
        return

    comment = re.search(r'<!--([\s\S]*?)-->', data)
    marker = RELEASE_RE.search(comment.group(1)) if comment else None
    check('release version marker in initial HTML comment', bool(marker))
    version = marker.group(1)
    numbered = root / f'{PROJECT_TITLE} {version}.html'
    check(f'{version} versioned release HTML exists', numbered.is_file())
    check('index, official, and versioned HTML are byte-identical',
          numbered.read_bytes() == main_bytes)
    meta_version = re.search(r'<meta\s+name=["\']application-version["\']\s+content=["\']([0-9]+\.[0-9]+\.[0-9]+)["\']', data)
    check('HTML metadata version matches release marker',
          bool(meta_version and meta_version.group(1) == version.removeprefix('v')))

    doc = DocumentParser()
    doc.feed(data)
    check('self-contained standalone HTML',
          data.lstrip().lower().startswith('<!doctype html>')
          and '<html' in data and doc.style_count >= 1
          and len(doc.inline_scripts) == 1
          and not doc.external_scripts and not doc.stylesheet_links)
    check('official application title', PROJECT_TITLE in data)
    check('maximum value 10^12', 'MAX_N=1000000000000' in data)
    check('160 ms corner preview throttle',
          bool(re.search(r'CORNER_PREVIEW_FRAME_INTERVAL_MS\s*=\s*160\b', data)))
    check('fast startup at Ulam number 1',
          'Startup always begins at Ulam number 1' in data)
    check('range input available', 'id="jumpInput"' in data)
    check('four modern spiral modes exposed',
          'id="spiralModeSelect"' in data and
          all(f'value="{mode}"' in data for mode in ('square', 'hex', 'tri', 'sacks')))
    check('triangular and hexagonal exact formula directions',
          'EXTRA_TRI_BASE_DIRS' in data and 'hexLineFormula(' in data)
    check('triangle same-constant candidate dedupe preserves pinned entries',
          'extraTriDeduplicateConstants' in data and
          'if(f.pinned)continue' in data and
          'fixed.filter(f=>f.pinned||' in data)
    check('quadratic search presets retained',
          'SEARCH_AB_PRESETS_HEX' in data and 'SEARCH_AB_PRESETS_SQUARE' in data and
          'SEARCH_AB_PRESETS_TRI' in data and 'SEARCH_AB_PRESETS_SACKS' in data)
    check('c search supports +/-7,000,000',
          'id="cMin" inputmode="numeric" value="-7000000"' in data and
          'id="cMax" inputmode="numeric" value="7000000"' in data)
    check('Vogel mode implementation retained', 'ENABLE_VOGEL_MODE' in data and 'vogelArmCandidates' in data and 'vogelPairCandidates' in data)
    check('persistent saved sequences retained', 'ulam_saved_formulas_v1' in data)
    check('diagnostic UI not embedded',
          all(f'id="{name}"' not in data for name in
              ('debugPanel', 'diagnosticPanel', 'testDiagnostics')))
    check('MIT license declaration retained',
          'MIT License' in data and 'Permission is hereby granted' in data)

    node = shutil.which('node')
    if args.require_node:
        check('Node.js is available', bool(node))
    if node:
        js = '\n'.join(doc.inline_scripts)
        proc = subprocess.run([node, '--check', '-'], input=js, text=True,
                              stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if proc.returncode:
            print(proc.stderr, file=sys.stderr)
        check('JavaScript syntax (node --check)', proc.returncode == 0)
    else:
        print('SKIP: JavaScript syntax (Node.js not installed)')
    print(f'PASS: {version} release verification complete')


if __name__ == '__main__':
    main()
