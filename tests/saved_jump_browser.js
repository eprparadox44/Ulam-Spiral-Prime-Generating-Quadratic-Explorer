#!/usr/bin/env node
'use strict';
const {chromium}=require('playwright-core');
const path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,
  executablePath:process.env.CHROME_PATH||'/usr/bin/chromium',
  args:['--no-sandbox','--disable-web-security','--allow-file-access-from-files']});
 const saved=[
  {id:'c-search',a:1,b:-1,c:-1354363,kind:'search',source:null,
   variants:[{a:1,b:-1,c:-1354363,lattice:'square',kind:'search',source:null}]},
  {id:'source-backed',a:1,b:-1,c:41,kind:'fixed',source:{n:5000,lattice:'square'},
   variants:[{a:1,b:-1,c:41,lattice:'square',kind:'fixed',source:{n:5000,lattice:'square'}}]}
 ];
 const page=await browser.newPage({viewport:{width:1280,height:720}});
 const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 await page.addInitScript(rows=>{
  localStorage.setItem('ulam_saved_formulas_v1',JSON.stringify(rows));
  localStorage.setItem('ULAM_LATTICE_MODE','square');
 },saved);
 await page.goto('file://'+path.resolve(process.argv[2]||'index.html'),{waitUntil:'domcontentloaded',timeout:120000});
 await page.waitForFunction(()=>document.getElementById('progressWrap').style.display==='none',null,{timeout:120000});
 for(const mode of ['square','hex','tri','sacks','klauber']){
  await page.selectOption('#spiralModeSelect',mode);
  await page.locator('#home').click();
  await page.locator('#savedToggle').click();
  await page.locator('.savedItem').first().locator('.savedBtns button').nth(1).click();
  const val=await page.locator('#sel').innerText();
  const n=Number(val.match(/[0-9][0-9,]*/)?.[0].replaceAll(',',''));
  assert(n>=2&&n<=1e14,mode+': selected valid n: '+val);
  const d=1+4*(n+1354363),root=Math.floor((1+Math.sqrt(d))/2);
  assert([root-1,root,root+1].some(k=>k>=1&&k*k-k-1354363===n),mode+': selected n not in formula: '+n);
  assert(await page.locator('.savedItem').first().evaluate(e=>e.classList.contains('active')),mode+': formula not active');
  console.log('PASS '+mode+' source-free jump n='+n);
 }
 await page.locator('.savedItem').nth(1).locator('.savedBtns button').nth(1).click();
 const val=await page.locator('#sel').innerText();
 assert(/^5,?000(?:\D|$)/.test(val), 'source-backed jump changed: '+val);
 console.log('PASS preserved source-backed origin');
 assert.deepEqual(errors,[],'page errors: '+errors.join('; '));
 await browser.close();console.log('PASS browser real UI saved-jump flow');
})().catch(e=>{console.error(e);process.exit(1)});
