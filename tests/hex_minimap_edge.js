#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const src=fs.readFileSync(process.argv[2]||path.join(__dirname,'../index.html'),'utf8');
const js=src.match(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/i)?.[1];assert(js,'embedded script');
function fn(name){
 const i=js.indexOf('function '+name+'(');assert(i>=0,name);
 const brace=js.indexOf('{',i);let depth=0;
 for(let j=brace;j<js.length;j++){
  if(js[j]==='{')depth++;
  if(js[j]==='}'&&--depth===0)return js.slice(i,j+1);
 }
 throw Error('Unbalanced '+name);
}
const levels=[1e8,1e9,1e10,1e11,1e12,1e13,1e14];
const state={Math,MAX_N:1e14,MAX_R:5e6,MINI_LEVELS:levels,miniZoomIndex:1,
 latticeMode:'hex',camX:0,camY:0,isExtraMode:()=>false,
 extraTriRadiusFor:()=>0,radiusFor:n=>Math.ceil((Math.sqrt(n)-1)/2)};
vm.createContext(state);
vm.runInContext(fn('hexRadiusFor')+'\n'+fn('miniViewport')+'\nthis.view=miniViewport;this.hexR=hexRadiusFor',state);
const R=state.hexR(1e14);assert.equal(R,5773503);
const point={x:-5773476,y:953031}; // n=99,999,076,320,761
function projected(p,v){const dx=p.x-v.cx,dy=p.y-v.cy;return{x:.5+(dx+dy/2)/(2*v.r),y:.5-Math.sqrt(3)*dy/(4*v.r)}}
let checked=0;
for(let index=0;index<6;index++){
 state.miniZoomIndex=index;
 for(const p of [point,{x:R,y:0},{x:-R,y:0},{x:0,y:R},{x:0,y:-R},{x:R,y:-R},{x:-R,y:R}]){
  state.camX=p.x;state.camY=p.y;
  const view=state.view(),xy=projected(p,view);
  assert(Math.abs(xy.x-.5)<.006&&Math.abs(xy.y-.5)<.006,
    'Hex camera outside minimap '+JSON.stringify({index,p,view,xy}));
  checked++;
 }
}
state.miniZoomIndex=6;state.camX=point.x;state.camY=point.y;
const world=state.view();assert.equal(world.cx,0);assert.equal(world.cy,0);assert.equal(world.r,R);
for(const p of [{x:R,y:0},{x:-R,y:0},{x:0,y:R},{x:0,y:-R},{x:R,y:-R},{x:-R,y:R}]){
 const xy=projected(p,world);
 assert(xy.x>=-1e-10&&xy.x<=1+1e-10&&xy.y>=-1e-10&&xy.y<=1+1e-10,'100T overview clips Hex ring');
}
state.latticeMode='square';state.miniZoomIndex=1;state.camX=5e6;state.camY=0;
assert.equal(state.view().cx,5e6-state.radiusFor(1e9),'Square minimap changed');
console.log('PASS: '+checked+' zoomed Hex outer-ring tests; full 100T overview and Square unchanged.');
