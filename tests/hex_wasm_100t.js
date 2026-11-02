#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
const html=fs.readFileSync(process.argv[2]||path.join(__dirname,'../index.html'),'utf8');
const b64=/const HEX_SIEVE_B64='([A-Za-z0-9+/=]+)'/.exec(html)?.[1];
assert(b64&&b64.length>2000,'compiled standalone Hex WASM');
const primes=[],mark=new Uint8Array(252);
for(let p=2;p<=251;p++)if(!mark[p]){primes.push(p);for(let j=p*p;j<=251;j+=p)mark[j]=1}
assert.equal(primes.length,54);
let rnd=0x76543210;
const random=()=>{rnd^=rnd<<13;rnd^=rnd>>>17;rnd^=rnd<<5;return (rnd>>>0)/4294967296};
function refPrime(n){if(n===2n)return true;if(n<2n||n%2n===0n)return false;
 for(const p of primes){const x=BigInt(p);if(n===x)return true;if(n%x===0n)return false;if(x*x>n)return true}
 let d=n-1n,s=0;while((d&1n)===0n){d>>=1n;s++}
 const modpow=(a,e)=>{let b=1n;for(a%=n;e;e>>=1n){if(e&1n)b=b*a%n;a=a*a%n}return b};
 for(const v of [2n,3n,5n,7n,11n,13n,17n]){
   let x=modpow(v,d);if(x===1n||x===n-1n)continue;
   let j=1;for(;j<s;j++){x=x*x%n;if(x===n-1n)break}if(j===s)return false;
 }return true;
}
function refBitmap(t){
 const w=t.xmax-t.xmin+1,h=t.ymax-t.ymin+1,bits=new Uint8Array(Math.ceil(w*h/8));
 const dq=[0,-1,-1,0,1,1],dr=[-1,0,1,1,0,-1];
 for(let ring=t.h0;ring<=t.h1;ring++){
  if(ring<1)continue;
  const q0=[ring,ring,0,-ring,-ring,0],r0=[0,-ring,-ring,0,ring,ring],start=3*ring*(ring-1)+2;
  for(let face=0;face<6;face++){
   let lo=0,hi=ring-1;
   if(dq[face]===0){if(q0[face]<t.xmin||q0[face]>t.xmax)continue}
   else if(dq[face]>0){lo=Math.max(lo,t.xmin-q0[face]);hi=Math.min(hi,t.xmax-q0[face])}
   else{lo=Math.max(lo,q0[face]-t.xmax);hi=Math.min(hi,q0[face]-t.xmin)}
   if(dr[face]===0){if(r0[face]<t.ymin||r0[face]>t.ymax)continue}
   else if(dr[face]>0){lo=Math.max(lo,t.ymin-r0[face]);hi=Math.min(hi,t.ymax-r0[face])}
   else{lo=Math.max(lo,r0[face]-t.ymax);hi=Math.min(hi,r0[face]-t.ymin)}
   for(let k=lo;k<=hi;k++){
    const n=start+face*ring+k;if(n<2||n>t.maxN||!refPrime(BigInt(n)))continue;
    const q=q0[face]+dq[face]*k,r=r0[face]+dr[face]*k;
    const i=(r-t.ymin)*w+q-t.xmin;bits[i>>3]|=1<<(i&7);
   }
  }
 }return bits;
}
(async()=>{
 const w=(await WebAssembly.instantiate(Buffer.from(b64,'base64'))).instance.exports;
 new Uint32Array(w.memory.buffer,w.primes_ptr(),54).set(primes);
 for(let i=0;i<30000;i++){
  const m=BigInt(Math.floor(random()*99999999999998)+2),a=BigInt(Math.floor(random()*Number(m))),b=BigInt(Math.floor(random()*Number(m)));
  assert.equal(w.mulmod_test(a,b,m),(a*b)%m,'mod multiplication mismatch '+i);
 }
 for(let i=0;i<1200;i++){
   const n=BigInt(Math.floor(random()*100000000000000));
   assert.equal(Boolean(w.prime_test(n,54)),refPrime(n),'primality mismatch '+n);
 }
 const samples=[{xmin:-4,xmax:4,ymin:-4,ymax:4,h0:1,h1:4,maxN:100},
  {xmin:4500000,xmax:4500047,ymin:300000,ymax:3000039,h0:4800000,h1:4800070,maxN:1e14},
  {xmin:-5773478,xmax:-5773470,ymin:953027,ymax:953039,h0:5773473,h1:5773480,maxN:1e14}];
 for(let i=0;i<24;i++){
  const ring=[100,1000000,3500000,5773500][i%4],face=i%6;
  const qs=[ring,ring,0,-ring,-ring,0],rs=[0,-ring,-ring,0,ring,ring],ds=[0,-1,-1,0,1,1],dt=[-1,0,1,1,0,-1];
  const j=Math.floor(random()*ring),q=qs[face]+ds[face]*j,r=rs[face]+dt[face]*j;
  samples.push({xmin:q-5,xmax:q+5,ymin:r-5,ymax:r+5,h0:Math.max(1,ring-3),h1:ring+3,maxN:1e14});
 }
 for(let i=0;i<samples.length;i++){
  const t=samples[i],ref=refBitmap(t);
  const size=w.compute(t.xmin,t.xmax,t.ymin,t.ymax,t.h0,t.h1,54,BigInt(t.maxN));
  assert.equal(size,ref.length,'bitmap size mismatch '+i);
  const actual=Buffer.from(new Uint8Array(w.memory.buffer,w.bitmap_ptr(),size));
  assert(actual.equals(Buffer.from(ref)),'100T Hex bitmap mismatch case '+i);
 }
 console.log('PASS: 30k exact modular products, 1,200 exact prime classifications, '+samples.length+' Hex bitmap samples (including 100T edge)');
})().catch(e=>{console.error(e);process.exit(1)});
