#!/usr/bin/env node
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { auditProject } from './quality-gate.mjs';

const report = auditProject(process.cwd());
console.log(JSON.stringify(report, null, 2));
if (!report.passed) {
  console.error('Build for publication stopped: finish the evidence review first. Use npm run build:site for local review preparation.');
  process.exit(1);
}
// npm supplies its actual CLI path on both Windows and Linux. No shell quoting.
const npmCli = process.env.npm_execpath;
if (!npmCli || !path.isAbsolute(npmCli)) {
  console.error('Run this entry point with npm run build.');
  process.exit(2);
}
const build = spawnSync(process.execPath, [npmCli, 'run', 'build:site', '--', ...process.argv.slice(2)], {
  stdio: 'inherit', env: process.env, cwd: process.cwd(),
});
if (build.error) console.error(build.error.message);
process.exit(build.status ?? 1);
