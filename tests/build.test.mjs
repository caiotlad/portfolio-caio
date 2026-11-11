import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, access, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

function build(output, overrides = {}) {
  return spawnSync(process.execPath, ['scripts/build.mjs'], {
    env: { ...process.env, OUTPUT_DIR: output, BASE_PATH: '/', SITE_URL: '', ...overrides },
    encoding: 'utf8',
  });
}

test('build para subdiretório gera metadados e limpa arquivos obsoletos', async () => {
  const output = await mkdtemp(join(tmpdir(), 'portfolio-build-'));
  try {
    const env = { BASE_PATH: '/portfolio-caio/', SITE_URL: 'https://caiotlad.github.io' };
    let result = build(output, env);
    assert.equal(result.status, 0, result.stderr);
    const info = JSON.parse(await readFile(join(output, 'build-info.json'), 'utf8'));
    assert.equal(info.base, '/portfolio-caio');
    const verification = spawnSync(process.execPath, ['scripts/verify-build.mjs'], { env: { ...process.env, OUTPUT_DIR: output }, encoding: 'utf8' });
    assert.equal(verification.status, 0, verification.stderr);
    const html = await readFile(join(output, 'en/projects/olist/index.html'), 'utf8');
    assert.ok(html.includes('href="/portfolio-caio/assets/global.css"'));
    assert.ok(html.includes('rel="canonical" href="https://caiotlad.github.io/portfolio-caio/en/projects/olist/"'));
    assert.ok(html.includes('property="og:url" content="https://caiotlad.github.io/portfolio-caio/en/projects/olist/"'));
    assert.ok(html.includes('property="og:image" content="https://caiotlad.github.io/portfolio-caio/social.png"'));
    assert.match(await readFile(join(output, 'robots.txt'), 'utf8'), /Allow: \/\nSitemap: https:\/\/caiotlad.github.io\/portfolio-caio\/sitemap.xml/);
    const sitemap = await readFile(join(output, 'sitemap.xml'), 'utf8');
    assert.equal((sitemap.match(/<loc>/g) || []).length, 14);
    assert.ok(sitemap.includes('https://caiotlad.github.io/portfolio-caio/en/resume/'));
    await access(join(output, '.nojekyll'));
    await writeFile(join(output, 'obsolete.html'), 'old output');
    result = build(output);
    assert.equal(result.status, 0, result.stderr);
    await assert.rejects(access(join(output, 'obsolete.html')));
    await assert.rejects(access(join(output, 'sitemap.xml')));
    assert.match(await readFile(join(output, 'robots.txt'), 'utf8'), /Disallow: \//);
  } finally {
    await rm(output, { recursive: true, force: true });
  }
});

test('build recusa limpar código ou arquivos não gerados pelo projeto', async () => {
  for (const output of ['.', 'src', 'public', 'docs', '..']) {
    const result = build(output);
    assert.notEqual(result.status, 0, output);
    assert.match(result.stderr, /OUTPUT_DIR/);
  }
  const output = await mkdtemp(join(tmpdir(), 'portfolio-files-'));
  try {
    await writeFile(join(output, 'keep.txt'), 'keep');
    assert.notEqual(build(output).status, 0);
    assert.equal(await readFile(join(output, 'keep.txt'), 'utf8'), 'keep');
  } finally {
    await rm(output, { recursive: true, force: true });
  }
});

test('build rejeita uma origem com subdiretório antes de alterar a saída', async () => {
  const output = await mkdtemp(join(tmpdir(), 'portfolio-config-'));
  try {
    const result = build(output, { SITE_URL: 'https://example.com/portfolio' });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /SITE_URL/);
  } finally {
    await rm(output, { recursive: true, force: true });
  }
});
