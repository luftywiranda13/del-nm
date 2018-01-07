'use strict';

const path = require('path');
const fs = require('fs-extra');
const tempy = require('tempy');

const delNm = require('./');

describe('node_modules', () => {
  let tempDir;

  beforeEach(async () => {
    tempDir = tempy.directory();
    await fs.mkdir(`${tempDir}/node_modules`);
  });

  test('async', async () => {
    expect.assertions(2);
    const res = await delNm(tempDir);

    expect(res[0]).toBe(path.join(`${tempDir}/node_modules`));
    expect(fs.pathExistsSync(`${tempDir}/node_modules`)).toBe(false);
  });

  test('sync', async () => {
    const res = delNm.sync(tempDir);

    expect(res[0]).toBe(path.join(`${tempDir}/node_modules`));
    expect(fs.pathExistsSync(`${tempDir}/node_modules`)).toBe(false);
  });
});

describe('node_modules + yarn.lock', () => {
  let tempDir;

  beforeEach(async () => {
    tempDir = tempy.directory();
    await fs.mkdir(`${tempDir}/node_modules`);
    await fs.ensureFile(`${tempDir}/yarn.lock`);
  });

  test('async', async () => {
    expect.assertions(4);
    const res = await delNm(tempDir);

    expect(res[0]).toBe(path.join(`${tempDir}/yarn.lock`));
    expect(res[1]).toBe(path.join(`${tempDir}/node_modules`));
    expect(fs.pathExistsSync(`${tempDir}/yarn.lock`)).toBe(false);
    expect(fs.pathExistsSync(`${tempDir}/node_modules`)).toBe(false);
  });

  test('sync', () => {
    const res = delNm.sync(tempDir);

    expect(res[0]).toBe(path.join(`${tempDir}/yarn.lock`));
    expect(res[1]).toBe(path.join(`${tempDir}/node_modules`));
    expect(fs.pathExistsSync(`${tempDir}/yarn.lock`)).toBe(false);
    expect(fs.pathExistsSync(`${tempDir}/node_modules`)).toBe(false);
  });
});

describe('node_modules + package-lock.json', () => {
  let tempDir;

  beforeEach(async () => {
    tempDir = tempy.directory();
    await fs.mkdir(`${tempDir}/node_modules`);
    await fs.ensureFile(`${tempDir}/package-lock.json`);
  });

  test('async', async () => {
    expect.assertions(4);
    const res = await delNm(tempDir);

    expect(res[0]).toBe(path.join(`${tempDir}/package-lock.json`));
    expect(res[1]).toBe(path.join(`${tempDir}/node_modules`));
    expect(fs.pathExistsSync(`${tempDir}/package-lock.json`)).toBe(false);
    expect(fs.pathExistsSync(`${tempDir}/node_modules`)).toBe(false);
  });

  test('sync', () => {
    const res = delNm.sync(tempDir);

    expect(res[0]).toBe(path.join(`${tempDir}/package-lock.json`));
    expect(res[1]).toBe(path.join(`${tempDir}/node_modules`));
    expect(fs.pathExistsSync(`${tempDir}/package-lock.json`)).toBe(false);
    expect(fs.pathExistsSync(`${tempDir}/node_modules`)).toBe(false);
  });
});
