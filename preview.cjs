const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const build = require('./build.cjs');
const root = __dirname;
const dist = path.join(root, 'dist');
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript', '.jpg':'image/jpeg', '.png':'image/png', '.webp':'image/webp', '.woff2':'font/woff2', '.svg':'image/svg+xml' };
const reload = `<script>(()=>{let v;setInterval(async()=>{try{const n=await(await fetch('/__version',{cache:'no-store'})).text();if(v&&v!==n)location.reload();v=n}catch{}},700)})();</script>`;
build();
let revision = Date.now();
const watchFiles = () => [path.join(root,'src/layout.html'), ...fs.readdirSync(path.join(root,'src/pages')).map(n=>path.join(root,'src/pages',n))];
let sourceVersion = Math.max(...watchFiles().map(f=>fs.statSync(f).mtimeMs));
let assetVersion = Math.max(...fs.readdirSync(path.join(root,'assets')).map(n=>fs.statSync(path.join(root,'assets',n)).mtimeMs));
setInterval(() => {
  try {
    const nextSource = Math.max(...watchFiles().map(f=>fs.statSync(f).mtimeMs));
    const nextAssets = Math.max(...fs.readdirSync(path.join(root,'assets')).map(n=>fs.statSync(path.join(root,'assets',n)).mtimeMs));
    if(nextSource!==sourceVersion){build();sourceVersion=nextSource;revision=Date.now();console.log('Pages rebuilt');}
    else if(nextAssets!==assetVersion){build();assetVersion=nextAssets;revision=Date.now();}
  } catch(e){console.error(e);}
},500);
http.createServer((req,res)=>{
  try {
    const url = new URL(req.url,'http://localhost');
    res.setHeader('Cache-Control','no-store');
    if(url.pathname==='/__version'){res.end(String(revision));return;}
    let pathname = decodeURIComponent(url.pathname);
    if(pathname.endsWith('/')) pathname += 'index.html';
    const file = path.resolve(dist,'.'+pathname);
    if(!file.startsWith(dist+path.sep)){res.writeHead(403);res.end();return;}
    const ext = path.extname(file);
    res.setHeader('Content-Type',types[ext]||'application/octet-stream');
    const data = fs.readFileSync(file);
    res.end(ext==='.html'?data.toString().replace('</body>',reload+'</body>'):data);
  } catch { res.writeHead(404);res.end('Not found'); }
}).listen(4173,'127.0.0.1',()=>console.log('Preview: http://127.0.0.1:4173'));
