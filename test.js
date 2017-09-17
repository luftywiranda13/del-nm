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

beforeEach(async () => {
  tempDir = tempy.directory();

  await makeDir(path.join(tempDir, 'node_modules'));
});

it('deletes `node_modules` - async', async () => {
  await delNm(tempDir);

  notExists(tempDir, 'node_modules');
});

it('deletes `node_modules` - sync', () => {
  delNm.sync(tempDir);

  notExists(tempDir, 'node_modules');
});

it('also deletes `package-lock.json` - async', async () => {
  tempy.file({name: 'package-lock.json'});

  await delNm(tempDir);

  notExists(tempDir, ['node_modules', 'package-lock.json']);
});

it('also deletes `package-lock.json` - sync', () => {
  tempy.file({name: 'package-lock.json'});

  delNm.sync(tempDir);

  notExists(tempDir, ['node_modules', 'package-lock.json']);
});

it('also deletes `yarn.lock` - async', async () => {
  tempy.file({name: 'yarn.lock'});

  await delNm(tempDir);

  notExists(tempDir, ['node_modules', 'package-lock.json']);
});

it('also deletes `yarn.lock` - sync', () => {
  tempy.file({name: 'yarn.lock'});

  delNm.sync(tempDir);

  notExists(tempDir, ['node_modules', 'yarn.lock']);
});
