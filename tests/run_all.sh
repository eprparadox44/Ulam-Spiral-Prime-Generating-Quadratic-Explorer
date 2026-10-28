#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HTML="$ROOT/index.html"
for TEST in math_regression saved_modes worker_pool_race point_sequence_dedup saved_semantic_regression quadratic_multiset_property; do
  node "$ROOT/tests/$TEST.js" "$HTML"
done
node - "$HTML" <<'JS'
const fs=require('fs'),vm=require('vm'),p=process.argv[2];
const html=fs.readFileSync(p,'utf8'),script=html.match(/<script(?:\s+[^>]*)?>([\s\S]*?)<\/script>/i)?.[1];
if(!script)throw Error('Missing inline script');new vm.Script(script);console.log('PASS: JavaScript syntax');
JS
