#!/usr/bin/env node
/**
 * Zero-dependency local link check.
 * Checks relative href/src targets in every HTML file.
 */
import { readFile, stat } from 'node:fs/promises';
import { dirname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const pages = ['index.html', 'about.html', 'privacy.html', 'terms.html', '404.html'];
const problems = [];
let checked = 0;

const exists = async (file) => {
  try {
    return (await stat(file)).isFile();
  } catch {
    return false;
  }
};

for (const page of pages) {
  const file = join(root, page);
  let html;
  try {
    html = await readFile(file, 'utf8');
  } catch {
    problems.push(`${page}: missing page`);
    continue;
  }
  const base = dirname(file);
  const matches = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  for (const raw of matches) {
    if (!raw || raw.startsWith('#') || raw.startsWith('http') || raw.startsWith('mailto:') || raw.startsWith('data:')) continue;
    const target = raw.split('#')[0].split('?')[0];
    if (!target) continue;
    const path = normalize(join(base, decodeURIComponent(target)));
    const candidate = target.endsWith('/') ? join(path, 'index.html') : path;
    checked += 1;
    if (!(await exists(candidate))) problems.push(`${page}: ${raw} -> missing ${candidate.replace(root, '')}`);
  }
}

if (problems.length) {
  console.error(`\n${problems.length} broken link(s):\n`);
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

console.log(`Checked ${checked} local links across ${pages.length} pages. No broken links.`);
