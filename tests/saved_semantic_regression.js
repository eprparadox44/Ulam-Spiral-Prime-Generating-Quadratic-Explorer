#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),vm=require('node:vm'),path=require('node:path');
const html=fs.readFileSync(process.argv[2]||path.resolve(__dirname,'../../Ulam_Spiral_v1.3.5_SAVED_CONSISTENCY_BETA.html'),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/i)?.[1];assert(script,'embedded JS script missing');
const slice=(start,end)=>{const a=script.indexOf(start);assert(a>=0,start);const b=script.indexOf(end,a+start.length);assert(b>a,end);return script.slice(a,b)};
const components=[
 slice('function polyKey(', '// v1.3.5: Key'),
 slice('const positiveQuadraticKeyCache=', 'function formulaId('),
 slice('function formulaId(', 'function savedVariantScore('),
 slice('function savedVariantScore(', 'function discoverSavedModeVariants('),
 slice('function isFormulaSaved(', 'function statSnapshot('),
 slice('function savedStatsJob(', 'function runSavedStatsBackfill('),
];
const localData=new Map(),storage={getItem:k=>localData.has(k)?localData.get(k):null,setItem:(k,v)=>{localData.set(k,String(v))}};
const c={Math,Number,BigInt,Map,Set,Date,MAX_N:1e12,selected:null,latticeMode:'square',localStorage:storage,console,savedToggle:{},tr:()=>'',syncMobileHeaderWidths:()=>{}};
vm.createContext(c);
vm.runInContext(`const SAVED_KEY='testSaved',SAVED_STATS_VERSION=5;let savedEntries=[];function updateSavedToggle(){};${components.join('\n')};this.fns={polyKey,positiveQuadraticSetKey,savedSemanticFormula,savedEntryKey,savedEntryForFormula,addOrMergeSavedFormula,savedVariant,savedStatsJob,isFormulaSaved,loadSaved,displaySavedVariant,savedModeFormula};this.allSaved=()=>savedEntries;`,c);
const f=c.fns;
const p0={a:4,b:2,c:-1776433,kind:'fixed'};
const sq={...p0,lattice:'square'};
const kl={a:1,b:3,c:-1776431,lattice:'klauber',kind:'fixed'};
assert.equal(f.savedEntryKey(sq),f.savedEntryKey(kl),'known Square/Klauber sequence must merge');
const e={...sq,id:'square',variants:[f.savedVariant(sq,'square',{n:10000,lattice:'square'})]};
localData.set('testSaved',JSON.stringify([e]));
f.loadSaved();
assert.equal(c.allSaved().length,1);
assert.equal(f.isFormulaSaved(p0),true,'Square raw candidate without lattice must appear saved');
assert.equal(f.savedEntryForFormula(p0),c.allSaved()[0]);
c.latticeMode='klauber';assert.equal(f.isFormulaSaved({a:1,b:3,c:-1776431}),true);
assert.equal(f.isFormulaSaved({a:4,b:2,c:-1776433}),false,'Klauber raw candidate is not Square semantic');
assert.equal(f.savedStatsJob(c.allSaved()[0]).a,1);
assert.equal(f.savedStatsJob(c.allSaved()[0]).b,-1);
assert.equal(f.savedStatsJob(c.allSaved()[0]).c,-1776433);
assert.equal(f.savedModeFormula(c.allSaved()[0]).a,1);
const countNatural=(a,b,z,maxN)=>{let total=0,prime=0;for(let n=1;n<=150;n++){const v=a*n*n+b*n+z;if(v<1||v>maxN)continue;total++;if(v>=2&&Array.from({length:Math.floor(Math.sqrt(v))-1},(_,i)=>i+2).every(p=>v%p!==0))prime++;}return[total,prime]};
const s1=countNatural(4,2,10,10000),s2=countNatural(1,-1,10,10000);
assert.notDeepEqual(s1,s2,'raw 4t²+2t+c and display n²−n+c must have different natural stats');
const task=f.savedStatsJob(c.allSaved()[0]);assert.deepEqual([task.a,task.b,task.c],[1,-1,-1776433]);
// Migration must merge before applying the 200-entry UI cap.
const objects=[];for(let i=0;i<150;i++)objects.push({a:1,b:0,c:i+10000,lattice:'square',id:'u'+i,kind:'saved'});
for(let i=0;i<50;i++)objects.push({...objects[i],id:'duplicate'+i,lattice:'square'});
for(let i=150;i<230;i++)objects.push({a:1,b:0,c:i+10000,lattice:'square',id:'u'+i,kind:'saved'});
localData.set('testSaved',JSON.stringify(objects));
c.latticeMode='square';f.loadSaved();const saved=c.allSaved();
assert.equal(saved.length,200,'200 distinct sequences after migration');
assert(saved.some(x=>x.c===10199),'entries after first 200 raw records must not be lost');
assert.equal(JSON.parse(localData.get('testSaved')).length,200,'migration should persist');
assert.equal(JSON.parse(localData.get('testSaved_pre_v135')).length,280,'original pre-migration data backed up once');
assert.equal(f.isFormulaSaved({a:1,b:0,c:10199}),true);
console.log('PASS: current-mode saved checkbox, semantic stats backfill, range-specific aliases, migration/persistence and 200-entry post-merge cap');
