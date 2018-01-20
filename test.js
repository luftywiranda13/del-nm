'use strict';

const { join } = require('path');
const { copySync, pathExistsSync, writeFileSync } = require('fs-extra');
const fixtures = require('fixturez');

const delNm = require('./');

const f = fixtures(__dirname);

describe('in tempDir', async () => {
  it('deletes `node_modules`', async () => {
    expect.assertions(3);

    const tempDir = f.temp();

    writeFileSync(join(tempDir, 'package-lock.json'));
    writeFileSync(join(tempDir, 'yarn.lock'));

    copySync(
      join(__dirname, 'node_modules', 'force-del'),
      join(tempDir, 'node_modules')
    );

    await delNm({ cwd: tempDir, lockfiles: false });

    expect(pathExistsSync(join(tempDir, 'node_modules'))).toBe(false);
    expect(pathExistsSync(join(tempDir, 'package-lock.json'))).toBe(true);
    expect(pathExistsSync(join(tempDir, 'yarn.lock'))).toBe(true);
  });

  it('deletes lockfiles', async () => {
    expect.assertions(3);

    const tempDir = f.temp();

    writeFileSync(join(tempDir, 'package-lock.json'));
    writeFileSync(join(tempDir, 'yarn.lock'));

    await delNm({ cwd: tempDir });

    expect(pathExistsSync(join(tempDir, 'node_modules'))).toBe(false);
    expect(pathExistsSync(join(tempDir, 'package-lock.json'))).toBe(false);
    expect(pathExistsSync(join(tempDir, 'yarn.lock'))).toBe(false);
  });

  it("doesn't delete anything", async () => {
    expect.assertions(1);

    const tempDir = f.temp();

    const res = await delNm({ cwd: tempDir });

    expect(res).toEqual([]);
  });
});

describe('in cwd', async () => {
  const cwd = process.cwd();

  afterEach(() => {
    process.chdir(cwd);
  });

  it('deletes `node_modules`', async () => {
    expect.assertions(3);

    const tempDir = f.temp();

    writeFileSync(join(tempDir, 'package-lock.json'));
    writeFileSync(join(tempDir, 'yarn.lock'));

    copySync(
      join(__dirname, 'node_modules', 'force-del'),
      join(tempDir, 'node_modules')
    );

    process.chdir(tempDir);
    await delNm({ lockfiles: false });

    expect(pathExistsSync(join(tempDir, 'node_modules'))).toBe(false);
    expect(pathExistsSync(join(tempDir, 'package-lock.json'))).toBe(true);
    expect(pathExistsSync(join(tempDir, 'yarn.lock'))).toBe(true);
  });

  it('deletes lockfiles', async () => {
    expect.assertions(3);

    const tempDir = f.temp();

    writeFileSync(join(tempDir, 'package-lock.json'));
    writeFileSync(join(tempDir, 'yarn.lock'));

    process.chdir(tempDir);
    await delNm();

    expect(pathExistsSync(join(tempDir, 'node_modules'))).toBe(false);
    expect(pathExistsSync(join(tempDir, 'package-lock.json'))).toBe(false);
    expect(pathExistsSync(join(tempDir, 'yarn.lock'))).toBe(false);
  });

  it("doesn't delete anything", async () => {
    expect.assertions(1);

    const tempDir = f.temp();

    process.chdir(tempDir);
    const res = await delNm();

    expect(res).toEqual([]);
  });
});
