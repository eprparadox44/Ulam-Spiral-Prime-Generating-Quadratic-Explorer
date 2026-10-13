#!/usr/bin/env node
/* Deterministic Worker-initialization race regression test, no browser required.
   Delays the cold Worker's ready event while the warm Worker completes the job.
   Verifies that the cold Worker is never reused before it is ready. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const root = path.resolve(__dirname, '..');
const htmlPath = process.argv[2] ? path.resolve(process.argv[2]) : path.join(root, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const script = html.match(/<script(?:\s+[^>]*)?>([\s\S]*?)<\/script\s*>/i)?.[1];
assert(script, 'embedded script missing');
function getFunction(name, nextName) {
  const start = script.indexOf(`function ${name}(`);
  const end = script.indexOf(`function ${nextName}(`, start);
  assert(start >= 0 && end > start, `${name} extraction failed`);
  return script.slice(start, end);
}
function contextFor(type) {
  let created = [], nextId = 0;
  class FakeWorker {
    constructor() { this.id = nextId++; this.ready = false; this.terminated = false; this.onmessage = null; this.onerror = null; created.push(this); }
    postMessage(d) {
      if (this.terminated) throw new Error('postMessage to terminated Worker');
      if (d.type === 'init') {
        // A cold Worker can still be performing asynchronous WASM initialization.
        setTimeout(() => {
          if (this.terminated) return;
          this.ready = true;
          this.onmessage?.({data: {type: 'ready'}});
        }, 125);
      } else if (d.type === 'job') {
        setImmediate(() => {
          if (this.terminated) return;
          if (!this.ready) { this.onmessage?.({data: {type:'error',message:'job before ready'}}); return; }
          const vertical = d.branch === 'right' || d.branch === 'left';
          const innerLen = vertical ? d.ymax - d.ymin + 1 : d.xmax - d.xmin + 1;
          const lineBytes = Math.ceil(innerLen / 8);
          const buffer = new Uint8Array(lineBytes * d.outerCount).buffer;
          this.onmessage?.({data: {type:'stripe', outerOffset:d.outerOffset, outerCount:d.outerCount, lineBytes, buffer, computeMs:0}});
        });
      } else throw Error('Unexpected FakeWorker message: ' + d.type);
    }
    terminate() { this.terminated = true; this.onmessage = null; this.onerror = null; }
  }
  const warm = new FakeWorker(); warm.ready = true;
  const idle = [warm];
  const context = {
    Worker: FakeWorker,
    performance, setTimeout,
    Math, Uint8Array, Promise, Error, console: {info() {}},
    window: {}, camX:101, camY:101, MAX_N:1000000000000,
    idleBranchSieveWorkers: idle, basePrimes:[2,3,5,7,11],
    branchPoolCap: () => 4, branchWorkerCap: () => 4,
    branchBucketForJob: () => ({mode: 1, threshold:16384}),
    ensureBranchWorkerURL: () => 'fake-worker', branchSievePoolURL: 'fake-worker',
    branchKey: (x,y) => Math.abs(x) > Math.abs(y) ? (x>0?'right':'left') : (y>0?'bottom':'top')
  };
  vm.createContext(context);
  vm.runInContext(type==='corner' ? getFunction('createCornerUnifiedTask','startCornerCacheBuild') : getFunction('createBranchPrimeRect','branchSieveSettings'),context);
  return {context, idle, created};
}
async function run(type) {
  const {context, idle, created} = contextFor(type);
  const target=type==='corner' ? {
    xmin:99,xmax:103,ymin:99,ymax:103,branches:['right','bottom'],high:1000000000000
  } : {xmin:100,xmax:115,ymin:0,ymax:7,branch:'right',high:1000000000000};
  const opts = type==='corner' ? {workers:2, stripeLines:8} : {workers:2, stripeLines:4};
  const build=()=>type==='corner'?context.createCornerUnifiedTask(target,opts):context.createBranchPrimeRect(target,opts);
  const first = build(); await first.promise;
  // One initialized Worker finished all jobs; one cold Worker never became ready.
  assert(created.length>=2, `No cold worker created in ${type}`);
  assert(!created[1].ready, `Cold Worker was unexpectedly already ready in ${type}`);
  assert(created[1].terminated, `Cold Worker must be terminated during cleanup in ${type}`);
  assert(idle.every(w=>w.ready), `Unready Worker returned to idle pool in ${type}`);
  const second = build(); await second.promise;
  assert(idle.every(w=>w.ready), `Unready Worker reused in second ${type} run`);
  for (const w of created) w.terminate();
  process.stdout.write(`PASS: ${type} cold-worker race, cleanup and subsequent reuse\n`);
}
(async()=>{await run('corner');await run('branch')})().catch(err=>{console.error('FAIL:',err.stack);process.exitCode=1});
