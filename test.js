'use strict';

jest.mock('has-lockfile');

const fs = require('fs');
const path = require('path');

const lockfile = require('has-lockfile');
const makeDir = require('make-dir');
const tempy = require('tempy');

const delNm = require('./');

let tempDir;

const notExists = files => {
  for (const file of files) {
    expect(fs.existsSync(path.join(tempDir, file))).toBe(false);
  }
};

const dummyLockfile = name => tempy.file({name});

beforeEach(() => {
  tempDir = tempy.directory();
  makeDir.sync(path.join(tempDir, 'node_modules'));
});

it('deletes `node_modules`', () => {
  delNm(tempDir);

  notExists('node_modules');
});

it('also deletes `package-lock.json`', () => {
  dummyLockfile('package-lock.json');
  lockfile.mockImplementation(() => 'package-lock.json');

  delNm(tempDir);

  notExists(['node_modules', 'package-lock.json']);
});

it('also deletes `yarn.lock`', () => {
  dummyLockfile('yarn.lock');
  lockfile.mockImplementation(() => 'package-lock.json');

  delNm(tempDir);

  notExists(['node_modules', 'yarn.lock']);
});
