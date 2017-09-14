'use strict';

jest.mock('has-lockfile');

const fs = require('fs');
const path = require('path');

const lockfile = require('has-lockfile');
const makeDir = require('make-dir');
const tempy = require('tempy');

const delNm = require('../');

let tempDir;

const notExists = files => {
  for (const file of files) {
    expect(fs.existsSync(path.join(tempDir, file))).toBe(false);
  }
};

const dummyFolder = name => {
  tempDir = tempy.directory();
  return makeDir(path.join(tempDir, name)).then(path => path);
};

const dummyLockfile = name => tempy.file({name});

describe('async', () => {
  beforeEach(async () => {
    await dummyFolder('node_modules');
  });

  it('deletes `node_modules`', async () => {
    await delNm(tempDir);

    notExists('node_modules');
  });

  it('also deletes `package-lock.json`', async () => {
    dummyLockfile('package-lock.json');
    lockfile.mockImplementation(() => 'package-lock.json');

    await delNm(tempDir);

    notExists(['node_modules', 'package-lock.json']);
  });

  it('also deletes `yarn.lock`', async () => {
    dummyLockfile('yarn.lock');
    lockfile.mockImplementation(() => 'package-lock.json');

    await delNm(tempDir);

    notExists(['node_modules', 'yarn.lock']);
  });
});
