#!/usr/bin/env node
'use strict';
// Verify the released source's true Klauber functions using an independent row witness.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const src=fs.readFileSync(process.argv[2]||path.resolve(__dirname,'../index.html'),'utf8');
const js=src.match(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/i)?.[1];
assert(js,'embedded script');
function extract(name){
 const re=new RegExp('function\\s+'+name+'\\('),m=re.exec(js);assert(m,'function '+name);
 const begin=m.index,brace=js.indexOf('{',begin);let depth=0;
 for(let i=brace;i<js.length;i++){
  if(js[i]==='{')depth++;
  if(js[i]==='}'&&--depth===0)return js.slice(begin,i+1);
 }
 throw Error('Unbalanced '+name);
}
const geom=extract('klauberVisibleCIntervals')+'\n'+extract('klauberLongestVisibleLineRows');
function create(maxN,rows){
 const sandbox={Math,Number,MAX_N:maxN};vm.createContext(sandbox);
 vm.runInContext('const KLAUBER_VISIBLE_MIN_ROW_SPAN='+rows+';'+geom+';this.api={intervals:klauberVisibleCIntervals,witness:klauberLongestVisibleLineRows}',sandbox);
 return sandbox.api;
}
const full=create(100000000000000,50000);
assert(js.includes("latticeMode==='klauber'?90000000:70000000"));
assert(js.includes(" ...[0,1,2,-1,3,-2,-7,9].map(b=>({a:1,b}))"));
assert(js.includes('|slope| ≥ 1/8'));
const incl=(c,ranges)=>Array.from(ranges).some(([lo,hi])=>lo<=c&&c<=hi);
assert.equal(full.witness(1,-7,89999969),2,'far-edge screenshot has only two physical rows');
assert.equal(incl(89999969,full.intervals(1,-7,-90000000,90000000)),false);
assert.equal(incl(50000000,full.intervals(1,-7,-90000000,90000000)),true);
for(const [a,b] of [[1,-7],[1,9],[4,-2],[16,-4]]){
 const ranges=full.intervals(a,b,-90000000,90000000);
 for(let c=-90000000;c<=90000000;c+=749999){
  assert.equal(incl(c,ranges),full.witness(a,b,c)>=50000,'100T geometry '+a+','+b+','+c);
 }
}
const small=create(4000000,40);
let seed=314159,cases=0;
function rnd(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/2**32}
for(let i=0;i<36;i++){
 const k=1+Math.floor(rnd()*4),a=k*k,b=k*(Math.floor(rnd()*33)-16);
 const ranges=small.intervals(a,b,-8000,8000);
 for(let c=-8000;c<=8000;c++){
  assert.equal(incl(c,ranges),small.witness(a,b,c,4000000)>=40,'small geometry '+a+','+b+','+c);
  cases++;
 }
}
console.log('PASS: '+cases+' Klauber 1/8 interval/witness comparisons; c range ±90M; 50k row filter');
