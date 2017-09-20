'use strict';

const fs = require('fs');
const path = require('path');
const makeDir = require('make-dir');
const tempy = require('tempy');

const delNm = require('./');

const notExists = (rootDir, files) => {
  for (const file of files) {
    expect(fs.existsSync(path.join(rootDir, file))).toBe(false);
  }
};

let tempDir;

const createDummy = lockfile => {
  tempDir = tempy.directory();

  if (lockfile) {
    tempy.file({ name: lockfile });
  }

  return makeDir.sync(path.join(tempDir, 'node_modules'));
};

describe('only `node_modules`', () => {
  beforeEach(() => {
    createDummy();
  });

  test('async', async () => {
    await delNm(tempDir);

    notExists(tempDir, 'node_modules');
  });

  test('sync', () => {
    delNm.sync(tempDir);

    notExists(tempDir, 'node_modules');
  });
});

describe('with `package-lock.json`', () => {
  beforeEach(() => {
    createDummy('package-lock.json');
  });

  test('async', async () => {
    await delNm(tempDir);

    notExists(tempDir, ['node_modules', 'package-lock.json']);
  });

  test('sync', () => {
    delNm.sync(tempDir);

    notExists(tempDir, ['node_modules', 'package-lock.json']);
  });
});

describe('with `yarn.lock`', () => {
  beforeEach(() => {
    createDummy('yarn.lock');
  });

  test('async', async () => {
    await delNm(tempDir);

    notExists(tempDir, ['node_modules', 'yarn.lock']);
  });

  test('sync', () => {
    delNm.sync(tempDir);

    notExists(tempDir, ['node_modules', 'yarn.lock']);
  });
});
