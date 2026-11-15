import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { resumeFile } from '../src/lib/resume-file.mjs';
import { resume } from '../src/pages/resume.mjs';

function examplePdf() {
  const stream='BT /F1 12 Tf 30 100 Td (Resume test fixture) Tj ET';
  const objects=[
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 200] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ];
  let pdf='%PDF-1.4\n';
  const offsets=[];
  objects.forEach((object,i)=>{offsets.push(pdf.length);pdf+=`${i+1} 0 obj\n${object}\nendobj\n`;});
  const xref=pdf.length;
  pdf+=`xref\n0 6\n0000000000 65535 f \n${offsets.map(offset=>`${String(offset).padStart(10,'0')} 00000 n \n`).join('')}trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(pdf);
}

test('sem PDF, o currículo mantém a alternativa HTML sem oferecer um download inexistente', async()=>{
  const root = await mkdtemp(join(tmpdir(),'portfolio-resume-'));
  try {
    assert.equal(await resumeFile(root),null);
    const html = resume();
    assert.match(html,/resume-document/);
    assert.doesNotMatch(html,/curriculo-[a-f0-9]+\.pdf/);
  } finally { await rm(root,{recursive:true,force:true}); }
});

test('substituir o PDF muda o endereço do download e preserva o conteúdo enviado', async()=>{
  const root = await mkdtemp(join(tmpdir(),'portfolio-resume-'));
  try {
    await mkdir(join(root,'public'));
    const bytes = examplePdf();
    await writeFile(join(root,'public/curriculo.pdf'),bytes);
    const original = await resumeFile(root);
    assert.equal((await resumeFile(root)).path,original.path);
    await writeFile(join(root,'public/curriculo.pdf'),Buffer.concat([bytes,Buffer.from('\n')]));
    const updated = await resumeFile(root);
    assert.notEqual(updated.path,original.path);
    assert.equal(updated.size,bytes.length+1);
    assert.ok(resume({pdf:updated}).includes(updated.path));
  } finally { await rm(root,{recursive:true,force:true}); }
});

test('um envio com extensão PDF e conteúdo inválido não apaga o último build', async()=>{
  const root = await mkdtemp(join(tmpdir(),'portfolio-resume-'));
  try {
    await mkdir(join(root,'public'));
    const output = join(root,'dist');
    await mkdir(output);
    await writeFile(join(output,'build-info.json'),'{}');
    await writeFile(join(output,'index.html'),'versão anterior');
    await writeFile(join(root,'public/curriculo.pdf'),'arquivo incorreto');
    const result = spawnSync(process.execPath,[resolve('scripts/build.mjs')],{
      cwd:root,env:{...process.env,OUTPUT_DIR:output},encoding:'utf8',
    });
    assert.notEqual(result.status,0);
    assert.match(result.stderr,/public\/curriculo\.pdf/);
    assert.equal(await readFile(join(output,'index.html'),'utf8'),'versão anterior');
  } finally { await rm(root,{recursive:true,force:true}); }
});
