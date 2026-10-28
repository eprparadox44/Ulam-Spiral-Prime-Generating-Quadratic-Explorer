#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const file=process.argv[2]||'/mnt/data/Ulam_Spiral_v1.3.5_SAVED_CONSISTENCY_BETA.html';
const txt=fs.readFileSync(file,'utf8'),s=txt.match(/<script>([\s\S]*?)<\/script>/)[1];
const cut=(a,b)=>{const x=s.indexOf(a),y=s.indexOf(b,x+a.length);assert(x>=0&&y>x);return s.slice(x,y)};
const src=cut('function polyKey(', '// v1.3.5: Key')+cut('const positiveQuadraticKeyCache=', 'function formulaId(');
const c={Math,Number,BigInt,Map,MAX_N:2000};vm.createContext(c);
vm.runInContext(src+'\nthis.key=positiveQuadraticSetKey;this.reset=()=>positiveQuadraticKeyCache.clear()',c);
let seed=0x1234abcd;
function rand(){seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;return(seed>>>0)/4294967296}
function randint(a,b){return Math.floor(rand()*(b-a+1))+a}
function multi(a,b,z,max){const values=[];for(let n=1;n<=200;n++){const v=a*n*n+b*n+z;if(v>=1&&v<=max)values.push(v);}return values.sort((x,y)=>x-y).join(',')}
let checked=0,collisions=0,falseSplit=0;
const groups=new Map(),all=new Map();
for(let i=0;i<20000;i++){
 const a=randint(1,15),b=randint(-40,40),z=randint(-100,120),f={a,b,c:z};
 const k=c.key(f),sig=multi(a,b,z,c.MAX_N);
 if(groups.has(k)){
  collisions++;assert.equal(groups.get(k),sig,`UNSOUND positiveQuadraticSetKey for ${JSON.stringify(f)}`);
 }else groups.set(k,sig);
 if(all.has(sig)&&all.get(sig)!==k)falseSplit++;
 else all.set(sig,k);
 checked++;
}
// Known offset symmetry over full positive subdomain.
const a={a:1,b:1,c:-2383},b={a:1,b:3,c:-2381};assert.equal(c.key(a),c.key(b));
// A distinct, sparser subsequence must remain a different key.
assert.notEqual(c.key(a),c.key({a:9,b:-3,c:-2383}));
// Cache must be cleared when MAX_N changes, otherwise keys are range-dependent.
const old=c.key(a);c.MAX_N=500;c.reset();const now=c.key(a);assert.notEqual(old,now);
console.log(`PASS: ${checked} randomized natural-index multisets (MAX_N=2000), ${collisions} equal keys checked, ${falseSplit} conservative split(s), 2 known cases, range-dependent cache invalidation`);
