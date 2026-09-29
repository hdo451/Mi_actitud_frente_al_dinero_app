import {mkdir, cp, rm, readdir} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
await mkdir(output, {recursive: true});
const site = path.join(output, 'sitio');
await rm(site, {recursive: true, force: true});
await mkdir(path.join(site, 'src'), {recursive: true});
for (const file of ['index.html', 'clara-diagnostico-financiero.html', 'bootstrap.js', 'config.js', 'app.js', 'money-profile-engine.js', 'stiles.css', 'Hispanic_Wealth.png', 'hpw.png']) {
  await cp(path.join(root, file), path.join(site, file));
}
for (const file of await readdir(path.join(root, 'src'))) {
  if (file.endsWith('.js')) await cp(path.join(root, 'src', file), path.join(site, 'src', file));
}
const archive = path.join(output, 'mi-actitud-frente-al-dinero.zip');
await rm(archive, {force: true});
execFileSync('zip', ['-qr', archive, '.'], {cwd: site});
console.log('Publicación lista: dist/sitio y dist/mi-actitud-frente-al-dinero.zip');
