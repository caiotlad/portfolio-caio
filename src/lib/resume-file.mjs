import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';

// One owner-managed file; visitors only receive a read-only published copy.
export async function resumeFile(root = process.cwd()) {
  const source = resolve(root, 'public/curriculo.pdf');
  let bytes;
  try { bytes = await readFile(source); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
  if (!/^%PDF-\d\.\d/.test(bytes.subarray(0, 16).toString('ascii'))
    || !bytes.subarray(-2048).includes(Buffer.from('%%EOF'))) {
    throw new Error('public/curriculo.pdf não é um PDF completo. Envie o arquivo PDF exportado, sem alterar apenas a extensão.');
  }
  const version = createHash('sha256').update(bytes).digest('hex').slice(0, 16);
  return { source, path: `assets/resume/curriculo-${version}.pdf`, size: bytes.length };
}
