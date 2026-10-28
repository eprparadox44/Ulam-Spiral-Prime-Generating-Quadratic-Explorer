#!/usr/bin/env python3
"""Verify the current standalone distribution and its v1.3+ feature markers.
Usage: python3 scripts/verify_release.py --require-node
"""
from __future__ import annotations
import argparse
from html.parser import HTMLParser
from pathlib import Path
import hashlib
import re
import shutil
import subprocess
import sys

PROJECT_TITLE='Ulam Spiral & Prime-Generating Quadratic Explorer'
OFFICIAL_NAME=PROJECT_TITLE+'.html'
RELEASE_RE=re.compile(r'^\s*Release:\s*(v\d+\.\d+\.\d+)(?=\s|$)',re.M)

class DocumentParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.inline_scripts=[];self.external_scripts=[];self.stylesheet_links=[];self.style_count=0;self._in_script=False
    def handle_starttag(self,tag,attrs):
        p=dict(attrs)
        if tag=='script':
            self._in_script='src' not in p
            if p.get('src'):self.external_scripts.append(p['src'])
        elif tag=='style':self.style_count+=1
        elif tag=='link' and 'stylesheet' in (p.get('rel') or '').lower().split():self.stylesheet_links.append(p.get('href'))
    def handle_endtag(self,tag):
        if tag=='script':self._in_script=False
    def handle_data(self,value):
        if self._in_script:self.inline_scripts.append(value)

def check(description,passed):
    print(f"{'PASS' if passed else 'FAIL'}: {description}",flush=True)
    if not passed:raise SystemExit(1)

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--require-node',action='store_true')
    args=ap.parse_args()
    root=Path(__file__).resolve().parent.parent
    index=root/'index.html';official=root/OFFICIAL_NAME
    check('index and official HTML exist',index.is_file() and official.is_file())
    content=index.read_bytes()
    check('index and official HTML are byte-identical',content==official.read_bytes())
    try:html=content.decode('utf-8-sig')
    except UnicodeError:check('UTF-8 HTML encoding',False);return
    comment=re.search(r'<!--([\s\S]*?)-->',html)
    m=RELEASE_RE.search(comment.group(1)) if comment else None
    check('valid release version header',bool(m))
    version=m.group(1)
    numbered=root/(PROJECT_TITLE+' '+version+'.html')
    check('matching numbered HTML exists',numbered.is_file())
    check('all three HTML files byte-identical',numbered.read_bytes()==content)
    meta=re.search(r'<meta\s+name=["\']application-version["\']\s+content=["\']([0-9]+\.[0-9]+\.[0-9]+)["\']',html)
    check('HTML metadata matches header',bool(meta and meta.group(1)==version.removeprefix('v')))
    doc=DocumentParser();doc.feed(html)
    check('self-contained standalone HTML',html.lstrip().lower().startswith('<!doctype html>') and
          '<html' in html and doc.style_count>=1 and len(doc.inline_scripts)==1 and
          not doc.external_scripts and not doc.stylesheet_links)
    check('product title',PROJECT_TITLE in html)
    check('1T navigation', 'MAX_N=1000000000000' in html and 'id="jumpInput"' in html)
    check('corner preview throttle',bool(re.search(r'CORNER_PREVIEW_FRAME_INTERVAL_MS\s*=\s*160\b',html)))
    check('startup at 1','Startup always begins at Ulam number 1' in html)
    check('all five visible spiral modes',all(f'value="{mode}"' in html for mode in
        ('square','hex','tri','sacks','klauber')) and 'id="spiralModeSelect"' in html)
    check('hexagonal and triangular formulas preserved', 'EXTRA_TRI_BASE_DIRS' in html and 'hexLineFormula(' in html)
    check('pinned triangular formulas preserved', 'extraTriDeduplicateConstants' in html and 'if(f.pinned)continue' in html and 'fixed.filter(f=>f.pinned||' in html)
    check('quadratic presets preserved', all(x in html for x in ['SEARCH_AB_PRESETS_HEX','SEARCH_AB_PRESETS_SQUARE','SEARCH_AB_PRESETS_TRI','SEARCH_AB_PRESETS_SACKS']))
    check('existing +/-7M search defaults preserved', 'id="cMin" inputmode="numeric" value="-7000000"' in html and 'id="cMax" inputmode="numeric" value="7000000"' in html)
    check('Vogel internal path preserved', 'ENABLE_VOGEL_MODE' in html and 'vogelArmCandidates' in html and 'vogelPairCandidates' in html)
    check('saved formulas preserved','ulam_saved_formulas_v1' in html)
    check('Klauber natural-index and geometry functions preserved',all(x in html for x in
        ('extraKlauberNumber(', 'klauberProjectFormula(', 'klauberSlopeOnly', 'klauberMiniTermsInView(')))
    check('minimap levels and exact density functions preserved', 'const MINI_LEVELS=[100000000,1000000000,10000000000,100000000000,1000000000000]' in html and
        all(s in html for s in ['function miniUsePrimeDensity(', 'function miniCensusSources(', 'function miniSparseFormulaExpected(']))
    check('density only eligible at 100M or 1B', 'view.n!==100000000 && view.n!==1000000000' in html)
    check('no diagnostic UI',all(f'id="{n}"' not in html for n in ('debugPanel','diagnosticPanel','testDiagnostics')))
    check('MIT license retained','MIT License' in html and 'Permission is hereby granted' in html)
    manifest=root/'checksums_v1.3.0.sha256'
    if version=='v1.3.0' and manifest.is_file():
        check('SHA-256 manifest matches all three HTML files', all(f'{hashlib.sha256((root / fn).read_bytes()).hexdigest()}  {fn}' in manifest.read_text(encoding='utf-8') for fn in ('index.html',OFFICIAL_NAME,PROJECT_TITLE+' '+version+'.html')))
    node=shutil.which('node')
    if args.require_node:check('Node.js available',bool(node))
    if node:
        p=subprocess.run([node,'--check','-'],input='\n'.join(doc.inline_scripts),text=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
        if p.returncode:print(p.stderr,file=sys.stderr)
        check('JavaScript syntax',p.returncode==0)
    else:print('SKIP: JavaScript syntax (Node.js unavailable)')
    print(f'PASS: {version} release verification complete')

if __name__=='__main__':main()
