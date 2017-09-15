'use strict';

const path = require('path');

const makeDir = require('make-dir');
const pathExists = require('path-exists');
const tempy = require('tempy');

const delNm = require('../');

describe('async', () => {
  beforeEach(async () => {
    // Creates `node_modules` in temporary directory
    await makeDir(path.join(tempy.directory(), 'node_modules')).then(
      path => path
    );
  });

  it('deletes `node_modules`', async () => {
    await delNm(tempy.directory());

    expect(pathExists.sync(path.join(tempy.directory(), 'node_modules'))).toBe(
      false
    );
  });

  it('also deletes `package-lock.json`', async () => {
    tempy.file({name: 'package-lock.json'});

    await delNm(tempy.directory());

    expect(pathExists.sync(path.join(tempy.directory(), 'node_modules'))).toBe(
      false
    );
    expect(
      pathExists.sync(path.join(tempy.directory(), 'package-lock.json'))
    ).toBe(false);
  });

  it('also deletes `yarn.lock`', async () => {
    tempy.file({name: 'yarn.lock'});

    await delNm(tempy.directory());

    expect(pathExists.sync(path.join(tempy.directory(), 'node_modules'))).toBe(
      false
    );
    expect(
      pathExists.sync(path.join(tempy.directory(), 'yarn.lock'))
    ).toBe(false);
  });
});
