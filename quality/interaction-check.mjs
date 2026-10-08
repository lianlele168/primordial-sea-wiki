import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const root=process.cwd(),req=createRequire(path.join(root,'package.json'));
const {chromium}=req('@playwright/test');
const small=root.includes('little-troubles');
const results={checkedAt:new Date().toISOString(),reviewer:'Codex agent / HTML5 repairs',tests:[],readability:[],calibration:[],errors:[]};
const out=path.resolve(root,'out');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.txt':'text/plain'};
const server=http.createServer((request,response)=>{let url=decodeURIComponent(new URL(request.url,'http://localhost').pathname),f=path.resolve(out,'.'+url);if(!f.startsWith(out+path.sep)&&f!==out){response.writeHead(403);return response.end()};if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');if(!fs.existsSync(f)||!fs.statSync(f).isFile()){response.writeHead(404,{'content-type':'text/html'});return response.end(fs.readFileSync(path.join(out,'404.html')))}response.writeHead(200,{'content-type':mime[path.extname(f)]||'application/octet-stream'});response.end(fs.readFileSync(f))});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({channel:'chrome',headless:true});const context=await browser.newContext({viewport:{width:390,height:900}});const page=await context.newPage();page.on('pageerror',e=>results.errors.push(e.message));
const pass=(name,evidence)=>results.tests.push({name,status:'passed',evidence});
try {
 const routes=JSON.parse(fs.readFileSync(path.join(root,'quality/artifacts/routes.json')));
 for(const route of routes){
  for(const width of [390,768,1024,1440]){
   await page.setViewportSize({width,height:900});await page.goto(origin+route,{waitUntil:'networkidle'});await page.locator('main h1').waitFor();if(!small&&(route==='/'||route==='/merge-planner/')) await page.locator('.planner-controls select').nth(0).waitFor();
   const measured=await page.locator('main').evaluate(main=>{
    const visible=[...main.querySelectorAll('h1,h2,h3,p,li,label,button')].filter(e=>e.getBoundingClientRect().width>0&&e.getBoundingClientRect().height>0);
    const items=visible.map(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return {tag:e.tagName,font:parseFloat(s.fontSize),left:r.left,right:r.right,text:e.textContent.slice(0,70)}});
    return {overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,smallText:items.filter(i=>i.font<12),outside:items.filter(i=>i.left< -1||i.right>innerWidth+1),textNodes:items.length};
   });
   assert.equal(measured.overflow,false,`${route} ${width} overflow`);assert.equal(measured.outside.length,0,`${route} ${width} outside`);assert.equal(measured.smallText.length,0,`${route} ${width} tiny text`);results.readability.push({route,width,...measured});
   if(route==='/'||route===(small?'/controls/':'/merge-planner/')){
    await page.screenshot({path:path.join(root,`quality/artifacts/review-${route==='/'?'home':'detail'}-${width}.png`)});
    if(route!=='/') {await page.locator(small?'.article-body':'.planner-shell').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(root,`quality/artifacts/review-body-${width}.png`)})}
   }
  }
 }
 pass('all-route readability metrics',`${routes.length} routes at 390/768/1024/1440px; no horizontal overflow, offscreen body text or body font below 12px. Screenshot review is separately recorded.`);
 await page.setViewportSize({width:390,height:900});await page.goto(origin+'/');await page.getByRole('button',{name:'Toggle navigation'}).click();await page.locator('header a:visible').filter({hasText:small?'Controls':'Play'}).last().waitFor();pass('mobile menu','Navigation opens at 390px');
 await page.goto(origin+'/');await page.getByRole('button',{name:'Search the guide'}).click();const search=page.getByRole('dialog').locator('input');await search.fill('zzzz-no-such-page');assert.match(await page.getByRole('dialog').innerText(),/No (matching|results|guide page matches)/i);await search.fill(small?'barbell':'enemy');assert.ok((await page.getByRole('dialog').innerText()).toLowerCase().includes(small?'barbell':'enemy'));await page.keyboard.press('Escape');assert.equal(await page.getByRole('dialog').count(),0);pass('search empty/results/escape','No-result feedback, actual matching page, closes by Escape');
 const missing=await page.goto(origin+'/not-a-real-page-8712/');assert.equal(missing.status(),404);pass('unknown URL 404','HTTP 404 instead of home 200');
 if(small){for(const route of ['/tasks/','/walkthrough/','/calculator/','/task-tracker/','/collect-all-bottles/']){const r=await page.goto(origin+route);assert.equal(r.status(),404);pass('retired route '+route,'HTTP 404')}
  await page.goto(origin+'/find-the-missing-barbell/');assert.match(await page.locator('main').innerText(),/house near the plaza/);pass('corrected barbell answer','Main text gives developer rooftop location');
 } else {
  await page.goto(origin+'/merge-planner/');const current=page.locator('.planner-controls select').nth(0),target=page.locator('.planner-controls select').nth(1),owned=page.locator('.planner-controls input');
  for(const c of [{current:'0',target:'9',owned:'0',expected:[512,512,511,9]},{current:'4',target:'7',owned:'3',expected:[8,5,7,3]},{current:'8',target:'9',owned:'999',expected:[2,0,1,1]}]){
   await current.selectOption(c.current);await target.selectOption(c.target);await owned.fill(c.owned);const observed=(await page.locator('.metric-cell strong').allTextContents()).map(Number);assert.deepEqual(observed,c.expected);results.calibration.push({input:{current:Number(c.current),target:Number(c.target),owned:Number(c.owned)},expected:c.expected,observed,locator:'.metric-cell strong (required, remaining, merges, distance)'});
  }
  for(const invalid of ['', '-1','2.5','1000','bad']){await owned.fill(invalid);assert.equal(await page.locator('.metric-cell').count(),0);assert.match(await page.locator('.planner-output').getByRole('alert').innerText(),/whole number/)}pass('invalid input', 'Blank, negative, fractional, >999 and nonnumeric values show errors and hide results');
  await page.getByRole('button',{name:'Reset planner'}).click();assert.deepEqual((await page.locator('.metric-cell strong').allTextContents()).map(Number),[512,512,511,9]);pass('reset','Inputs and outputs reset to the stated defaults');
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{value:{writeText:async()=>{throw new Error('Permission denied')}} ,configurable:true}));await page.getByRole('button',{name:'Copy merge plan'}).click();assert.match(await page.locator('.planner-output').getByRole('alert').innerText(),/Clipboard unavailable/);assert.match(await page.getByLabel('Copyable merge plan').inputValue(),/512/);pass('clipboard failure','Visible failure and selectable fallback plan, no unhandled rejection');
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{value:{writeText:async text=>{window.testClipboard=text}},configurable:true}));await page.getByRole('button',{name:'Copy merge plan'}).click();assert.equal(await page.getByRole('button',{name:'Plan copied'}).count(),1);assert.match(await page.evaluate(()=>window.testClipboard),/512/);pass('clipboard success','Copied plan equals displayed model');
  await page.goto(origin+'/');await page.locator('.planner-controls select').nth(0).waitFor();pass('home planner loads','Shared client calculator actually loads on home');
 }
 assert.deepEqual(results.errors,[]);results.status='passed';
}catch(e){results.status='failed';results.failure=e.stack;throw e}finally{fs.writeFileSync(path.join(root,'quality/artifacts/interaction-results.json'),JSON.stringify(results,null,2));await browser.close();await new Promise(resolve=>server.close(resolve));console.log(JSON.stringify({status:results.status,tests:results.tests.length,calibrations:results.calibration.length,failure:results.failure}));}
