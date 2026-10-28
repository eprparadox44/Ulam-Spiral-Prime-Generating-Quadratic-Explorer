#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(process.argv[2]||path.resolve(__dirname,'../Ulam_Spiral_v1.3.4_POINT_SEQUENCE_DEDUP_BETA.html'),'utf8'),src=html.match(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/i)[1];
function get(name){const m=new RegExp('function\\s+'+name+'\\(').exec(src);assert(m,name);let l=src.indexOf('{',m.index),d=0;for(let i=l;i<src.length;i++){if(src[i]==='{')d++;else if(src[i]==='}'&&--d===0)return src.slice(m.index,i+1)}}
const funcs=['polyKey','positiveQuadraticSetKey','simpleFormulaCopy','savedSemanticFormula','savedEntryKey','savedVariant','savedVariants','savedVariantScore','displaySavedVariant','savedModeFormula','addSavedVariant'];
const c={MAX_N:1e12,Math,Number,BigInt,Set,Map,selected:null,latticeMode:'square'};vm.createContext(c);vm.runInContext('const positiveQuadraticKeyCache=new Map();'+funcs.map(get).join('\n')+'\nthis.fns={'+funcs.join(',')+'};',c);const f=c.fns;
const square={a:4,b:2,c:-1776433,lattice:'square',kind:'fixed',label:'square'},klauber={a:1,b:3,c:-1776431,lattice:'klauber',kind:'fixed',label:'klauber'};
assert.equal(f.savedEntryKey(square),f.savedEntryKey(klauber));
const e={...square,variants:[f.savedVariant(square,'square')]};
assert.equal(f.addSavedVariant(e,f.savedVariant(klauber,'klauber')),true);
assert.equal(f.addSavedVariant(e,f.savedVariant(klauber,'klauber')),false);
assert.equal(e.variants.length,2);
c.latticeMode='square';const s=f.savedModeFormula(e);assert.deepEqual([s.a,s.b,s.c],[1,-1,-1776433]);
c.latticeMode='klauber';const k=f.savedModeFormula(e);assert.deepEqual([k.a,k.b,k.c],[1,3,-1776431]);
c.latticeMode='sacks';const fallback=f.savedModeFormula(e);assert.equal(f.positiveQuadraticSetKey(fallback),f.positiveQuadraticSetKey({a:1,b:-1,c:-1776433}));
const different={a:1,b:3,c:43,lattice:'klauber'};
assert.notEqual(f.savedEntryKey({a:1,b:-1,c:41,lattice:'square'}),f.savedEntryKey(different));
assert.equal(f.addSavedVariant(e,f.savedVariant(different,'klauber')),false);
console.log('PASS: saved variants merge, distinct natural sequences stay apart, Square/Klauber/Sacks switching');
