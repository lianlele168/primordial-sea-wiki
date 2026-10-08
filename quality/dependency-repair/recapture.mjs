import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import crypto from 'node:crypto';
import {createRequire} from 'node:module';
const project=process.cwd(),root=path.join(project,'out');
const {chromium}=createRequire(path.join(project,'package.json'))('@playwright/test');
const server=http.createServer((req,res)=>{let file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');if(!fs.existsSync(file)){res.writeHead(404);return res.end();}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.woff2':'font/woff2'})[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true});
const observations=[];
try{for(const slug of ['play','updates']){
 const page=await browser.newPage({viewport:{width:768,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(`http://127.0.0.1:${server.address().port}/${slug}/`,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 const height=await page.evaluate(()=>document.documentElement.scrollHeight);
 for(let y=0;y<height;y+=800){await page.evaluate(y=>window.scrollTo(0,y),y);await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));}
 await page.screenshot({path:path.join(project,`quality/artifacts/${slug}-768-bottom.png`)});
 await page.evaluate(()=>window.scrollTo(0,0));await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
 const bytes=await page.screenshot({fullPage:true});fs.writeFileSync(path.join(project,`quality/artifacts/${slug}-768.png`),bytes);
 observations.push({slug,width:768,height,errors,method:'Real page scrolled through, two animation frames per scroll, actual bottom viewport and full-page recapture',sha256:crypto.createHash('sha256').update(bytes).digest('hex')});await page.close();
}}finally{await browser.close();await new Promise(r=>server.close(r));}
fs.writeFileSync(path.join(project,'quality/dependency-repair/recapture.json'),JSON.stringify({checkedAt:new Date().toISOString(),observations},null,2));
