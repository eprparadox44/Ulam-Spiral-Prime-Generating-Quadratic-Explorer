#!/usr/bin/env node
'use strict';
const fs=require('node:fs'), vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const file=process.argv[2]||path.join(__dirname,'../Ulam_Spiral_v1.3.4_POINT_SEQUENCE_DEDUP_BETA.html');
const s=fs.readFileSync(file,'utf8');
const js=s.match(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/i)?.[1];assert(js);
function fn(name){const m=new RegExp('function\\s+'+name+'\\(').exec(js);assert(m,name);const a=m.index,start=js.indexOf('{',a);let depth=0;for(let i=start;i<js.length;i++){if(js[i]==='{')depth++;else if(js[i]==='}'&&!--depth)return js.slice(a,i+1)}throw Error('bad '+name)}
const names=['polyKey','formulaId','savedSemanticFormula','positiveQuadraticSetKey','pointNaturalSequenceKey','dedupePointCandidatesByNaturalSequence'];
const ctx={MAX_N:1000000000000,Number,BigInt,Math,Map};vm.createContext(ctx);
vm.runInContext('let latticeMode="klauber";const positiveQuadraticKeyCache=new Map();'+names.map(fn).join('\n')+';this.api={'+names.slice(-2).join(',')+'};this.mode=m=>latticeMode=m;',ctx);
const {pointNaturalSequenceKey:key,dedupePointCandidatesByNaturalSequence:dedupe}=ctx.api;
const poly=(a,b,c,extras={})=>({a,b,c,kind:'extra',...extras});
let count=0;
const N=182448150077;
const fixture={fixed:[
 poly(1,1,-2383,{kind:'fixed',label:'Klauber Vertical',klauberSegment:{minRow:1,maxRow:9}}),
 poly(1,2,-429522,{kind:'fixed',label:'Diagonal ↘'}),
 poly(1,0,424756,{kind:'fixed',label:'Diagonal ↗'}),
 poly(1,-1,851895,{kind:'fixed'}),
 poly(1,3,-856661,{kind:'fixed'})],pool:[
 poly(1,3,-2381,{label:'Recommended duplicate'}),
 poly(9,-3,-2383,{label:'Distinct sparse subsequence'})]};
const out=dedupe(fixture);
assert.equal(out.fixed.length,5);assert.equal(out.pool.length,1);
assert.equal(out.pool[0].a,9);assert.equal(out.fixed[0].label,'Klauber Vertical');
assert.equal(fixture.pool.length,2,'input must be immutable');count+=4;
assert.equal(key(fixture.fixed[0]),key(fixture.pool[0]));
assert.notEqual(key(fixture.fixed[0]),key(fixture.pool[1]));count+=2;
// The representative must be geometrically certified even if a saved copy
// appears earlier in the original fixed array.
const pinned=poly(1,3,-2381,{kind:'fixed',pinned:true,label:'saved'});
const geometric=fixture.fixed[0];
const p=dedupe({fixed:[pinned,geometric],pool:[]});
assert.equal(p.fixed.length,1);assert.equal(p.fixed[0],geometric);count+=2;
// Multiple genuine geometric discoveries with identical natural values also
// show only one point card, without losing the underlying saved entries.
const geom2=poly(1,3,-2381,{kind:'fixed',klauberSegment:{minRow:5,maxRow:20}});
assert.equal(dedupe({fixed:[geometric,geom2],pool:[]}).fixed.length,1);count++;
// Simple shift is *not* enough: the positive tails must agree under n>=1.
assert.notEqual(key(poly(1,1,41)),key(poly(1,3,43)));count++;
assert.notEqual(key(poly(1,1,-2383)),key(poly(1,1,-2384)));count++;
// Square + hex use 4t²+2t+c natural-set representation; no general modulo-
// restricted residue projection may silently broaden a sequence.
for(const mode of ['square','hex','tri','sacks','vogel']){
 ctx.mode(mode);
 const c=poly(4,2,-2383),m=poly(1,-1,-2383);
 assert.equal(key(c),key(m));
 assert.notEqual(key(poly(9,-3,-2383)),key(m));
 count+=2;
}
ctx.mode('klauber');
// All modes may include Vogel geometric arm/pair objects which have no (a,b,c).
ctx.mode('vogel');
const arms=dedupe({fixed:[{kind:'vogel-arm',armStep:13},{kind:'vogel-arm',armStep:21}],pool:[{kind:'vogel-pair',armStepA:13,armStepB:21}]});
assert.equal(arms.fixed.length,2);assert.equal(arms.pool.length,1);count+=2;
// Exhaustive small-coefficient key-soundness check for deterministic finite range.
ctx.MAX_N=1000000000000;
// Key == means actual positive sequence multiset, here restricted to [1, 1e12].
// Independent proof by directly evaluating enough initial terms for near-vertex cases.
function firstTerms(f,nmax=1000){const out=[];for(let n=1;n<=nmax;n++){const v=f.a*n*n+f.b*n+f.c;if(v>=1&&v<=1e12)out.push(v)}return out.sort((a,b)=>a-b).slice(0,200).join(',')}
for(let a=1;a<=4;a++)for(let b=-12;b<=12;b++)for(let c=-30;c<=45;c+=3){
 const f=poly(a,b,c),g=poly(a,b+2*a,c+a+b); // g(n)=f(n+1), may lose positives
 if(key(f)===key(g))assert.equal(firstTerms(f),firstTerms(g),'same-key shifted sequence should match in finite prefix when tail captured');
 count++;
}
console.log(`PASS: ${count.toLocaleString()} point-candidate dedup/sequence checks; screenshot duplicate removed, sparse subsequence retained`);
