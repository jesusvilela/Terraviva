'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const origin = 'https://terraviva-ruddy.vercel.app';
const assets = [
  ['/', 'public/index.html'],
  ['/sensors.html', 'public/sensors.html'],
  ['/sensors.css', 'public/sensors.css'],
  ['/sensors.js', 'public/sensors.js'],
  ['/sensor-core.js', 'public/sensor-core.js'],
  ['/eda-engine.js', 'public/eda-engine.js']
];
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
async function checkAsset([route, file]) {
  const url = new URL(route, origin);
  url.searchParams.set('verify', process.env.GITHUB_SHA || 'sensor-release');
  const response = await fetch(url, { redirect: 'error', signal: AbortSignal.timeout(20000), headers: { 'Cache-Control': 'no-cache' } });
  assert.equal(response.status, 200, route + ' must be publicly available');
  const actual = Buffer.from(await response.arrayBuffer());
  assert.ok(actual.length <= 2 * 1024 * 1024, route + ' is unexpectedly large');
  const expected = fs.readFileSync(file);
  assert.equal(hash(actual), hash(expected), route + ' differs from the verified release');
  return { route, status: response.status, bytes: actual.length, sha256: hash(actual) };
}
async function main() {
  const checks = await Promise.allSettled(assets.map(checkAsset));
  let failed = false;
  for (const result of checks) {
    if (result.status === 'fulfilled') console.log(JSON.stringify(result.value));
    else { failed = true; console.error(String(result.reason)); }
  }
  const response = await fetch(new URL('/api/sensors', origin), { redirect: 'error', signal: AbortSignal.timeout(20000) });
  assert.equal(response.status, 401, 'Unauthenticated sensor reads must be rejected');
  assert.match(response.headers.get('content-type') || '', /application\/json/i);
  const payload = await response.json();
  assert.equal(typeof payload.error, 'string', 'Expected a bounded API error response');
  console.log(JSON.stringify({ route: '/api/sensors', method: 'GET', status: response.status, authentication: 'required' }));
  if (failed) throw new Error('One or more deployed assets did not match');
  console.log('Live sensor surface matches the release; unauthenticated private access is denied.');
}
main().catch(error => { console.error(String(error)); process.exitCode = 1; });
