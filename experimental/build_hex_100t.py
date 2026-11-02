#!/usr/bin/env python3
"""Build and inject the experimental 100T Hex WASM into standalone index.html.

Usage: python3 experimental/build_hex_100t.py
Precondition: the branch index.html is an unmodified v1.4.5 baseline.
"""
import base64
from pathlib import Path
import re
import subprocess

root = Path(__file__).resolve().parents[1]
wasm = root / "experimental/hex_prime_100T.wasm"
subprocess.run([
    "clang", "--target=wasm32", "-O3", "-nostdlib",
    "-Wl,--no-entry", "-Wl,--export-memory",
    "-Wl,--initial-memory=4194304", "-Wl,--max-memory=16777216",
    "-Wl,--strip-all", "-o", str(wasm),
    str(root / "experimental/hex_prime_100T.c")
], check=True)
encoded = base64.b64encode(wasm.read_bytes()).decode("ascii")
html = (root / "index.html").read_text(encoding="utf8")
assert "const HEX_SIEVE_B64=" in html

def once(old, new):
    global html
    count = html.count(old)
    if count != 1:
        raise RuntimeError(f"expected 1 occurrence, got {count}: {old[:90]}")
    html = html.replace(old,new)

html, hits = re.subn(r"const HEX_SIEVE_B64='[^']+';",
                      "const HEX_SIEVE_B64='" + encoded + "';", html)
assert hits == 1
once("let primes=new Uint32Array(0),wasm=null;",
     "let primes=new Uint32Array(0),wasm=null;const wasmPrimeCount=54;")
once("if(primes.length>80000)throw Error('100T experiment: legacy hex WASM capacity exceeded; use hybrid exact JS');",
     "// 100T compiled WASM needs only the first 54 trial primes (<=251).")
once("new Uint32Array(wasm.memory.buffer,wasm.primes_ptr(),primes.length).set(primes);",
     "new Uint32Array(wasm.memory.buffer,wasm.primes_ptr(),wasmPrimeCount).set(primes.subarray(0,wasmPrimeCount));")
sample_begin="const sample={xmin:-4,xmax:4,ymin:-4,ymax:4,h0:1,h1:4,maxN:100};"
sample_end="throw Error('Hex WASM/JS verification mismatch');"
assert html.count(sample_begin)==1 and html.count(sample_end)==1
left=html.index(sample_begin)
right=html.index(sample_end,left)+len(sample_end)
html=html[:left]+"""const samples=[
          {xmin:-4,xmax:4,ymin:-4,ymax:4,h0:1,h1:4,maxN:100},
          {xmin:-5773478,xmax:-5773470,ymin:953027,ymax:953039,h0:5773473,h1:5773480,maxN:100000000000000}
        ];
        for(const sample of samples){
          const count=wasm.compute(sample.xmin,sample.xmax,sample.ymin,sample.ymax,sample.h0,sample.h1,wasmPrimeCount,BigInt(sample.maxN));
          const expected=jsCompute(sample);
          if(count!==expected.length||new Uint8Array(wasm.memory.buffer,wasm.bitmap_ptr(),count).some((v,i)=>v!==expected[i]))
            throw Error('Hex 100T WASM/JS bitmap mismatch');
        }"""+html[right:]
once("wasm.compute(d.xmin,d.xmax,d.ymin,d.ymax,d.h0,d.h1,primes.length,BigInt(d.maxN))",
     "wasm.compute(d.xmin,d.xmax,d.ymin,d.ymax,d.h0,d.h1,wasmPrimeCount,BigInt(d.maxN))")
# Only change renderer comments and the internal trial version tag; no UI,
# geometry or other mode is changed in the A/B experiment.
once("// ===== Hexagonal Ulam lattice (single-file module, isolated from square optimized paths) =====",
     "// ===== Hexagonal Ulam lattice (100T exact WASM experiment; all other paths unchanged) =====")
(root / "experimental/hex_wasm_experiment.html").write_text(html,encoding="utf8")
print("WASM bytes:",wasm.stat().st_size,"Standalone HTML chars:",len(html))
