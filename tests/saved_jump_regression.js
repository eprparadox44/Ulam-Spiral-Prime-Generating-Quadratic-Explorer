#!/usr/bin/env node
'use strict';
const fs=require('fs'),assert=require('node:assert/strict'),vm=require('node:vm');
const html=fs.readFileSync(process.argv[2]||'index.html','utf8');
const src=html.match(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/i)?.[1];
assert(src,'Standalone script missing');
function pick(name){
 const start=src.indexOf('function '+name+'(');assert(start>=0,name);
 let depth=0,open=src.indexOf('{',start);
 for(let i=open;i<src.length;i++){if(src[i]==='{')depth++;if(src[i]==='}'&&--depth===0)return src.slice(start,i+1)}
 throw Error('unterminated '+name);
}
const stat={moves:[],alerts:[],schedules:[],cancel:0,updates:0};
const c={
 Math,Number,BigInt,Map,Set,MAX_N:100000000000000,camX:0,camY:0,scale:3,
 latticeMode:'square',pointAnalyzeKick:0,pointAnalysisPending:false,pointAnalysisDoneKey:'done',
 selected:{x:0,y:0,n:1},formulas:[{a:1,b:0,c:1}],activeFormula:null,
 formulaHidden:false,savedOpen:false,miniBgKey:'old',miniFormulaKey:'old',
 selEl:{innerHTML:''},formulaPanel:{style:{}},savedPanel:{style:{}},
 document:{querySelectorAll:()=>[]},savedEntries:[],console,
 isExtraMode:()=>c.latticeMode==='klauber'||c.latticeMode==='tri'||c.latticeMode==='sacks',
 extraApproxNumber:()=>90000000000000,
 latticeNumber:()=>c.camX>1000?90000000000000:1,
 latticeCoord:n=>({x:Math.floor(n/10000),y:n%10000}),
 displaySavedVariant:e=>e.variants?.[0]||e,
 savedModeFormula:e=>({a:e.a,b:e.b,c:e.c,naturalOnly:true}),
 refreshActiveInfo:()=>{stat.updates++},
 updateModeTabs:()=>{},
 savedEntryKey:e=>[e.a,e.b,e.c].join(':'),
 selectionSummary:()=>String(c.selected?.n),
 cancelPointAnalysis:()=>{stat.cancel++},
 clamp:()=>{},
 sched:ms=>stat.schedules.push(ms),
 tr:key=>key,
 alert:s=>stat.alerts.push(s),
};
vm.createContext(c);
vm.runInContext(
 ['formulaParamRange','formulaParamIntervalsForBand','formulaScopedParamIntervalsForBand',
  'nearestSavedFormulaTerm','activateSavedEntry'].map(pick).join('\n')+
 '\nthis.jump=activateSavedEntry;this.nearest=nearestSavedFormulaTerm;',c);
const reset=()=>{
 c.camX=0;c.camY=0;c.scale=3;c.activeFormula=null;c.selected={x:0,y:0,n:1};
 c.formulas=[{a:1,b:0,c:1}];c.pointAnalysisPending=true;c.pointAnalysisDoneKey='done';
 c.formulaHidden=false;c.savedOpen=false;c.miniBgKey='old';c.miniFormulaKey='old';
 stat.alerts.length=0;stat.schedules.length=0;stat.cancel=0;stat.updates=0;
};
const sourceFree={a:1,b:-1,c:-1354363,kind:'search',source:null};
reset();c.jump(sourceFree,true);
assert(c.selected.n>=2&&c.selected.n<=c.MAX_N,'source-free formula: moved to world');
assert.equal(BigInt(c.selected.n),BigInt(c.selected.n),'integral generated value');
const t=Math.floor((1+Math.sqrt(1+4*(c.selected.n+1354363)))/2);
assert([t-1,t,t+1].some(i=>i>=1&&i*i-i-1354363===c.selected.n),'source-free selected number is a real polynomial term');
assert.equal(c.camX,Math.floor(c.selected.n/10000));
assert.equal(c.scale,5.5);
assert.equal(stat.cancel,1);assert.equal(stat.schedules.at(-1),0);
assert.equal(c.activeFormula.c,-1354363);assert.equal(c.savedOpen,true);
console.log('PASS: source-less c-search formula actually moves and highlights a generated number');

reset();c.jump({a:1,b:-1,c:-1354363,source:{n:178901,lattice:'square'}},true);
assert.equal(c.selected.n,178901,'source-backed formula retains original point');
assert.equal(stat.alerts.length,0);
console.log('PASS: legacy source-backed saved formula jump unchanged');

reset();c.jump({a:1,b:-1,c:-1354363,source:{n:100000000000001}},true);
assert(c.selected.n>=2&&c.selected.n<=c.MAX_N,'out-of-range source gets in-range term');
assert.equal(stat.alerts.length,0);
console.log('PASS: out-of-range old source falls back');

reset();c.activeFormula={a:1,b:-1,c:41};
c.jump({a:1,b:0,c:100000000000001,source:null},true);
assert.equal(stat.alerts.length,1,'no valid generated term has explicit feedback');
assert.equal(c.selected.n,1,'no move on impossible polynomial');
assert.equal(c.activeFormula.c,41,'active prior formula is not discarded');
console.log('PASS: no valid term shows feedback, preserves existing selection');

for(const mode of ['square','hex','tri','sacks','klauber']){
 reset();c.latticeMode=mode;c.camX=123456;c.camY=-12;
 c.jump({a:4,b:4,c:-397,source:null},true);
 assert(c.selected.n>=2&&c.selected.n<=c.MAX_N,mode+' move');
 assert.equal(c.activeFormula.c,-397,mode+' highlighted');
 assert.equal(stat.alerts.length,0,mode+' no alert');
}
console.log('PASS: source-less saved formula jump in all five modes');
console.log('PASS: source-free save migration, geometry selection and instant render regressions');
