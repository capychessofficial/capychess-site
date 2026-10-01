const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const pages = {
  index: { title: 'CapyChess | Chess school', main: 'main-content', body: 'capy-page--home page--home page--en knight-theatre' },
  services: { title: 'Services | CapyChess', main: 'services-content' },
  curriculum: { title: 'Curriculum | CapyChess', main: 'curriculum-content' },
  teachers: { title: 'Teachers | CapyChess', main: 'teachers-content' },
  about: { title: 'About Us | CapyChess', main: 'about-content' },
};
const dist = path.join(root, 'dist');
const layout = fs.readFileSync(path.join(root, 'src/layout.html'), 'utf8');
function build() {
  fs.rmSync(dist, { recursive:true, force:true });
  fs.mkdirSync(dist, { recursive:true });
  fs.cpSync(path.join(root, 'assets'), path.join(dist, 'assets'), { recursive:true, force:true });
  for (const [name, page] of Object.entries(pages)) {
    const content = fs.readFileSync(path.join(root, `src/pages/${name}.html`), 'utf8');
    let output = layout.replace('{{TITLE}}', page.title)
      .replace('{{BODY_CLASS}}', page.body || 'page--en')
      .replace('{{MAIN_ID}}', page.main)
      .replace('{{CONTENT}}', content);
    const file = `${name}.html`;
    // Mark only the current navigation item, on desktop and mobile.
    output = output.replace(/(<a\s+href="(?:index|services|curriculum|teachers|about)\.html")\s+aria-current="page"/g, '$1');
    const label = { index:'Home', services:'Services', curriculum:'Curriculum', teachers:'Teachers', about:'About Us' }[name];
    output = output.replace(new RegExp(`(<a\\s+href="${file}")(?=\\s*>${label}<\\/a>)`, 'g'), '$1 aria-current="page"');
    const prefix = name === 'index' ? '' : '../';
    output = output.replace(/href="(index|services|curriculum|teachers|about)\.html(#[^"]*)?"/g,
      (_, target, hash = '') => `href="${prefix}${target === 'index' ? '' : target + '/'}${hash}"`);
    if (prefix) output = output.replace(/(href|src)="assets\//g, `$1="${prefix}assets/`);
    const destination = name === 'index' ? dist : path.join(dist, name);
    fs.mkdirSync(destination, { recursive:true });
    fs.writeFileSync(path.join(destination, 'index.html'), output);
    if (name !== 'index') {
      const redirect = `<!doctype html><html lang="en"><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=${name}/"><title>Redirecting…</title><a href="${name}/">Continue to ${name}</a></html>`;
      fs.writeFileSync(path.join(dist, file), redirect);
    }
  }
}
if (require.main === module) build();
module.exports = build;
