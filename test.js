'use strict';

const { join } = require('path');
const { copySync, writeFileSync } = require('fs-extra');
const fixtures = require('fixturez');

const delNm = require('.');

const cwd = process.cwd();
const f = fixtures(__dirname);

afterEach(() => {
  process.chdir(cwd);
});

it('deletes `node_modules`', async () => {
  expect.assertions(1);

  const tempDir = f.temp();
  writeFileSync(join(tempDir, 'package-lock.json'));
  writeFileSync(join(tempDir, 'yarn.lock'));
  copySync(
    join(__dirname, 'node_modules', 'force-del'),
    join(tempDir, 'node_modules')
  );
  process.chdir(tempDir);

  await expect(delNm({ lockfiles: false })).resolves.toEqual([
    join(tempDir, 'node_modules'),
  ]);
});

it('deletes lockfiles', async () => {
  expect.assertions(1);

  const tempDir = f.temp();
  writeFileSync(join(tempDir, 'package-lock.json'));
  writeFileSync(join(tempDir, 'yarn.lock'));
  process.chdir(tempDir);

  await expect(delNm()).resolves.toEqual([
    join(tempDir, 'package-lock.json'),
    join(tempDir, 'yarn.lock'),
  ]);
});

it("doesn't delete anything", async () => {
  expect.assertions(1);

  const tempDir = f.temp();
  process.chdir(tempDir);

  await expect(delNm()).resolves.toEqual([]);
});
