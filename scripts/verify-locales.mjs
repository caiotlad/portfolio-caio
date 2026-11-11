import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { hasEnglishTranslation } from '../src/lib/locale.mjs';
import { projects } from '../src/data/projects.mjs';
import { technologies } from '../src/data/technologies.mjs';

const output = resolve(process.env.OUTPUT_DIR || 'dist');
const info = JSON.parse(await readFile(resolve(output,'build-info.json'),'utf8'));
const identities = new Set([
  'ct','g','O','A','B','C','Caio Teixeira','Caio Teixeira Ladeira','Lavras, Minas Gerais','GEDAI','/ UFLA','Backlog','Stack','Ctrl K',
  'EN','English','Read in English','LinkedIn','GitHub','SQL','Selenium','Testcontainers','GitHub Actions','ORDERFLOW / TRANSACTION MAP',
  'No. 0384','ESC','Enter','Esc','Interfaces','Software','CardSort','OrderFlow API','Olist Logistics Analytics',
  ...projects.flatMap(project=>[project.name,...project.technologies]),...technologies.flatMap(tech=>[tech.name,tech.mark]),
]);
const missing = new Set();
let checked = 0;
function check(value) {
  const text = value.trim().replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'");
  if (!/[A-Za-zÀ-ú]/.test(text) || /^\d+°/.test(text) || /@|^github\.com\//.test(text)) return;
  if (hasEnglishTranslation(text) || identities.has(text)) { checked++; return; }
  if (text.split(/\s+[·&]\s+/).every(part=>identities.has(part))) { checked++; return; }
  missing.add(text);
}
for (const page of info.pages.filter(path=>!path.startsWith('en/'))) {
  const html = (await readFile(resolve(output,page),'utf8')).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'');
  for (const [,text] of html.matchAll(/>([^<>]+)</g)) check(text);
  for (const [,text] of html.matchAll(/(?:aria-label|placeholder|alt)="([^"]+)"/g)) check(text);
  for (const [,text] of html.matchAll(/<meta (?:name="description"|property="og:(?:title|description)") content="([^"]+)"/g)) check(text);
}
assert.equal(missing.size,0,`Traduções ausentes:\n${[...missing].join('\n')}`);
assert.equal(info.pages.filter(path=>path.startsWith('en/')).length,8,'O inglês deve cobrir as oito páginas.');
const olist = await readFile(resolve(output,'en/projects/olist/index.html'),'utf8');
for (const content of ['99,441','96,470','6,534','6.77%','2016–2018','does not establish causation']) assert.ok(olist.includes(content),`Olist: ${content}`);
const cardSort = await readFile(resolve(output,'en/projects/cardsort/index.html'),'utf8');
assert.ok(cardSort.includes('fictional participants') && cardSort.includes('in-memory H2'),'Preservar os limites do CardSort em inglês.');
const deubranco = await readFile(resolve(output,'en/projects/deubranco/index.html'),'utf8');
assert.ok(deubranco.includes('requirements documentation and validation') && deubranco.includes('team deliverable'),'Preservar a participação individual e coletiva.');
console.log(`Idiomas: ${checked} textos/atributos conferidos; oito páginas em inglês e limites dos casos preservados.`);
