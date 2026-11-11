import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

let checked = 0;
async function check(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await check(path);
    else if (/\.(mjs|js)$/.test(path)) {
      const result = spawnSync(process.execPath, ['--check', path], { encoding: 'utf8' });
      if (result.status !== 0) throw new Error(result.stderr || `Falha ao conferir ${path}`);
      checked++;
    } else if (path.endsWith('.json')) {
      JSON.parse(await readFile(path, 'utf8'));
      checked++;
    }
  }
}

for (const directory of ['src', 'scripts', 'tests']) await check(directory);
JSON.parse(await readFile('package.json', 'utf8'));
console.log(`Sintaxe: ${checked + 1} arquivos JavaScript e JSON conferidos.`);
