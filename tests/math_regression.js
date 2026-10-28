#!/usr/bin/env node
/* Dependency-free deterministic regression against functions extracted from
 * the shipping standalone HTML. Run: node tests/math_regression.js [html]. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(process.argv[2]||path.resolve(__dirname,'../Ulam_Spiral_v1.3.4_POINT_SEQUENCE_DEDUP_BETA.html'),'utf8');
const js=html.match(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/i)?.[1];assert(js,'single embedded script');
function fn(name){const m=new RegExp('function\\s+'+name+'\\(').exec(js);assert(m,name+' exists');const start=m.index,first=js.indexOf('{',start);let d=0;for(let i=first;i<js.length;i++){if(js[i]==='{')d++;else if(js[i]==='}'&&--d===0)return js.slice(start,i+1)}throw Error('unbalanced '+name)}
const names=['polyKey','positiveQuadraticSetKey','klauberCanonicalSearchForm','klauberVisibleCIntervals','klauberLongestVisibleLineRows','extraKlauberCoord','extraKlauberNumber','branchKey','cornerPartAt','ulamNumber','isPrimeExactSingle'];
function create(maxN){const ctx={MAX_N:maxN,Math,Number,BigInt,Map,Set};vm.createContext(ctx);vm.runInContext('const positiveQuadraticKeyCache=new Map();const KLAUBER_VISIBLE_MIN_ROW_SPAN=50000;'+names.map(fn).join('\n')+'\nthis.api={'+names.join(',')+'}',ctx);return ctx.api}
let seed=24681357;function rnd(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/2**32}function pick(lo,hi){return lo+Math.floor(rnd()*(hi-lo+1))}
let checks=0;
// Natural n>=1 sequence key must never falsely merge distinct multisets.
const api=create(300),seen=new Map();
function brute(f,max=300){const upper=Math.max(1,Math.ceil(-f.b/(2*f.a)+Math.sqrt(max/f.a)+60));const out=new Map();for(let n=1;n<=upper;n++){const x=f.a*n*n+f.b*n+f.c;if(x>=1&&x<=max)out.set(x,(out.get(x)||0)+1)}return [...out].sort((a,b)=>a[0]-b[0]).map(p=>p.join(':')).join(',')}
for(let a=1;a<=9;a++)for(let b=-25;b<=25;b++)for(let c=-35;c<=120;c+=3){const f={a,b,c},key=api.positiveQuadraticSetKey(f),values=brute(f);if(seen.has(key))assert.equal(values,seen.get(key).values,`false natural-index merge ${JSON.stringify(f)}`);else seen.set(key,{values,f});checks++}
const largeKey=create(1000000000000).positiveQuadraticSetKey;assert.equal(largeKey({a:1,b:-1,c:-1776433}),largeKey({a:1,b:3,c:-1776431}));checks++;
// Non-equivalent boundaries: shifting a parabola must NOT merge extra positive terms.
assert.notEqual(api.positiveQuadraticSetKey({a:1,b:-1,c:41}),api.positiveQuadraticSetKey({a:1,b:3,c:43}));checks++;
// Canonical-search reparameterization is deliberately NOT a natural equivalence.
const changed=api.klauberCanonicalSearchForm(1,3,100);assert(changed&&changed.b!==3);assert.notEqual(brute({a:1,b:3,c:100}),brute({a:changed.a,b:changed.b,c:changed.c}));checks++;
assert(!/id="klauberNormalizeAB"[^>]*\bchecked\b/.test(html),'lossy natural renormalization is opt-in');checks++;
// Klauber coordinate row r=floor(sqrt(N-1)), inverse and domain.
const full=create(1000000000000);
for(let i=0;i<12000;i++){const n=i<20?i+1:pick(1,1000000000000),p=full.extraKlauberCoord(n);assert.equal(full.extraKlauberNumber(p.x,p.y),n);assert.equal(-p.y+0,Math.floor(Math.sqrt(n-1)));checks++}
function inside(c,rs){return rs!==null&&rs.some(([lo,hi])=>c>=lo&&c<=hi)}
// Analytic interval union and independent closed-form row witness.
for(let i=0;i<11000;i++){const k=pick(1,6),a=k*k,b=k*pick(-100,100),c=pick(-2000000,2000000),rs=full.klauberVisibleCIntervals(a,b,-2000000,2000000),actual=full.klauberLongestVisibleLineRows(a,b,c)>=50000;assert.equal(inside(c,rs),actual,`interval/witness a=${a} b=${b} c=${c}`);checks++}
// Generate more actual valid long lines instead of only negative samples.
let successful=0;
for(let i=0;i<1100;i++){
 const k=pick(1,4),d=pick(-2,2),h=pick(-5000,5000),a=k*k,b=k*(2*h+1+d),r=pick(80000,850000),e=pick(-r,r),c=h*h+h+1+d*h+e;
 if(Math.abs(c)>1e10)continue;
 const rs=full.klauberVisibleCIntervals(a,b,-1e10,1e10);
 const valid=full.klauberLongestVisibleLineRows(a,b,c)>=50000;
 assert.equal(inside(c,rs),valid,`generated geometry a=${a},b=${b},c=${c},d=${d},h=${h}`);checks++;if(valid)successful++;
}
assert(successful>=100,`not enough positive filter cases: ${successful}`);
// Slow geometric oracle on a small, deliberately varied subset: compute the
// REAL row by floor(sqrt(P(n)-1)), not the interval function's inequalities.
for(let j=0;j<50;j++){
 const k=pick(1,3),h=pick(-20,20),d=pick(-2,2),e=pick(-120000,120000),a=k*k,b=k*(2*h+1+d),c=h*h+h+1+d*h+e;
 let best=0;
 for(let slope=-2;slope<=2;slope++){
  const twiceH=b/k-1-slope;if(twiceH%2!==0)continue;
  const hh=twiceH/2,intercept=c-(hh*hh+hh+1+slope*hh);
  let started=-1;
  for(let n=1;n<=Math.floor((999999-hh)/k);n++){
   const row=k*n+hh;if(row<0)continue;
   const value=a*n*n+b*n+c;
   if(value<1||value>1e12){started=-1;continue}
   const physicalRow=Math.floor(Math.sqrt(value-1)),x=value-(physicalRow*physicalRow+physicalRow+1);
   const valid=physicalRow===row&&Math.abs(x)<=row&&x===slope*row+intercept;
   if(valid){if(started<0)started=row;best=Math.max(best,row-started)}else started=-1;
  }
 }
 assert.equal(full.klauberLongestVisibleLineRows(a,b,c)>=50000,best>=50000,`direct row oracle ${a},${b},${c}`);checks++;
}
// Worker partition ownership: corners and all branch boundaries owned exactly once.
const fake={xmin:-100,xmax:100,ymin:-100,ymax:100,parts:{top:{id:'top'},bottom:{id:'bottom'},left:{id:'left'},right:{id:'right'}}};
for(let x=-100;x<=100;x++)for(let y=-100;y<=100;y++){
 const key=full.branchKey(x,y);if(key!=='center'){assert.equal(full.cornerPartAt(fake,x,y)?.id,key);assert.equal(full.ulamNumber(x,y)>=1,true)}checks++;
}
// Prime ground truth: sieve <=1,000,000, independent deterministic BigInt MR for larger integers.
const mark=new Uint8Array(1000001),base=[];for(let p=2;p<=1000000;p++){if(mark[p])continue;base.push(p);if(p*p<=1000000)for(let j=p*p;j<=1000000;j+=p)mark[j]=1}
const primeCtx={MAX_N:1e12,basePrimes:base,Math,Number,BigInt};vm.createContext(primeCtx);vm.runInContext(fn('isPrimeExactSingle')+'\nthis.prime=isPrimeExactSingle',primeCtx);
for(let n=1;n<=5000;n++){assert.equal(primeCtx.prime(n),n>=2&&!mark[n],`small prime ${n}`);checks++}
function mr(n){let N=BigInt(n);if(N<2n)return false;for(const p of [2n,3n,5n,7n,11n,13n,17n,19n,23n,29n,31n,37n]){if(N===p)return true;if(N%p===0n)return false}
 let d=N-1n,s=0n;while((d&1n)===0n){d>>=1n;s++}function pow(a,e){let v=1n;for(;e>0n;e>>=1n,a=a*a%N)if(e&1n)v=v*a%N;return v}
 for(let a of [2n,3n,5n,7n,11n,13n,17n]){let x=pow(a,d);if(x===1n||x===N-1n)continue;let ok=false;for(let r=1n;r<s;r++){x=x*x%N;if(x===N-1n){ok=true;break}}if(!ok)return false}return true}
for(let i=0;i<420;i++){const n=pick(1,1000000000000);assert.equal(primeCtx.prime(n),mr(n),`large prime ${n}`);checks++}
assert(/formulaRect:part===0\?fullRect:null/.test(js),'full formula rendered once, not worker-sharded');checks++;
assert(!/function autotuneBranchSieve\(/.test(js)&&!/function autotuneAdaptiveBucket\(/.test(js),'unreachable benchmarks removed');checks++;
assert(/peakChunkPayloadBytes/.test(js)&&/estimateRetainedBytes/.test(js),'memory telemetry added');checks++;
console.log(`PASS: ${checks} source-grounded math, natural-index, geometry, ownership and prime checks (${successful} positive visible lines)`);
