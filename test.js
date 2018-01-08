'use strict';

const path = require('path');
const { mkdir, createFile } = require('fs-extra');
const tempy = require('tempy');

const delNm = require('./');

describe('node_modules', () => {
  let tempDir;

  beforeEach(async () => {
    tempDir = tempy.directory();
    await mkdir(`${tempDir}/node_modules`);
    process.chdir(tempDir);
  });

  test('async', async () => {
    expect.assertions(1);
    const res = await delNm();

    expect(res).toEqual([path.join(`${tempDir}/node_modules`)]);
  });

  test('sync', async () => {
    const res = delNm.sync();

    expect(res).toEqual([path.join(`${tempDir}/node_modules`)]);
  });
});

describe('node_modules + yarn.lock', () => {
  let tempDir;

  beforeEach(async () => {
    tempDir = tempy.directory();
    await mkdir(`${tempDir}/node_modules`);
    await createFile(`${tempDir}/yarn.lock`);
    process.chdir(tempDir);
  });

  test('async', async () => {
    expect.assertions(2);
    const res = await delNm();

    expect(res[0]).toBe(path.join(`${tempDir}/yarn.lock`));
    expect(res[1]).toBe(path.join(`${tempDir}/node_modules`));
  });

  test('sync', () => {
    const res = delNm.sync();

    expect(res[0]).toBe(path.join(`${tempDir}/yarn.lock`));
    expect(res[1]).toBe(path.join(`${tempDir}/node_modules`));
  });
});

describe('node_modules + package-lock.json', () => {
  let tempDir;

  beforeEach(async () => {
    tempDir = tempy.directory();
    await mkdir(`${tempDir}/node_modules`);
    await createFile(`${tempDir}/package-lock.json`);
    process.chdir(tempDir);
  });

  test('async', async () => {
    expect.assertions(2);
    const res = await delNm(tempDir);

    expect(res[0]).toBe(path.join(`${tempDir}/package-lock.json`));
    expect(res[1]).toBe(path.join(`${tempDir}/node_modules`));
  });

  test('sync', () => {
    const res = delNm.sync(tempDir);

    expect(res[0]).toBe(path.join(`${tempDir}/package-lock.json`));
    expect(res[1]).toBe(path.join(`${tempDir}/node_modules`));
  });
});

describe('node_modules + npm-shrinkwrap.json', () => {
  let tempDir;

  beforeEach(async () => {
    tempDir = tempy.directory();
    await mkdir(`${tempDir}/node_modules`);
    await createFile(`${tempDir}/npm-shrinkwrap.json`);
    process.chdir(tempDir);
  });

  test('async', async () => {
    expect.assertions(2);
    const res = await delNm(tempDir);

    expect(res[0]).toBe(path.join(`${tempDir}/npm-shrinkwrap.json`));
    expect(res[1]).toBe(path.join(`${tempDir}/node_modules`));
  });

  test('sync', () => {
    const res = delNm.sync(tempDir);

    expect(res[0]).toBe(path.join(`${tempDir}/npm-shrinkwrap.json`));
    expect(res[1]).toBe(path.join(`${tempDir}/node_modules`));
  });
});
