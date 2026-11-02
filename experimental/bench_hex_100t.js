#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright-core');
(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/usr/bin/google-chrome',
     args:['--no-sandbox','--disable-web-security','--allow-file-access-from-files','--disable-background-timer-throttling']});
  const cases=[
    {name:'interior-100T',x:4500000,y:300000},
    {name:'outer-100T',x:-5773476,y:953031}
  ];
  const outputs={};
  for(const [label,file] of [
    ['baseline',path.resolve(__dirname,'hex_baseline_instrumented.html')],
    ['candidate',path.resolve(__dirname,'hex_wasm_experiment.html')]
  ]){
    const page=await browser.newPage({viewport:{width:1280,height:720},deviceScaleFactor:1});
    const logs=[];
    page.on('console',m=>{if(m.text().includes('[hex sieve]'))logs.push(m.text())});
    page.on('pageerror',e=>{console.error(label,'PAGE ERROR',String(e));process.exitCode=1});
    await page.goto('file://'+file,{waitUntil:'domcontentloaded',timeout:120000});
    await page.waitForFunction(()=>window.__ULAM_HEX_AB__?.ready(),null,{timeout:180000,polling:200});
    outputs[label]=[];
    for(const tc of cases){
      const val=await page.evaluate(({x,y})=>window.__ULAM_HEX_AB__.run(x,y),tc);
      console.log('BENCHMARK',JSON.stringify({variant:label,case:tc.name,...val,workers:logs[logs.length-1]||''}));
      outputs[label].push(val);
    }
    await page.close();
  }
  await browser.close();
  for(let i=0;i<cases.length;i++){
    const a=outputs.baseline[i],b=outputs.candidate[i];
    if(a.hash!==b.hash||a.bytes!==b.bytes||JSON.stringify(a.bounds)!==JSON.stringify(b.bounds))
      throw Error('HEX 100T BITMAP MISMATCH '+cases[i].name+': '+JSON.stringify({a,b}));
    console.log('PASS',cases[i].name,'bitmap identity','speedup x'+(a.ms/b.ms).toFixed(2));
  }
  console.log('COMPLETE',JSON.stringify(outputs));
})().catch(e=>{console.error(e);process.exit(1)});
