'use strict';

const path = require('path');

const makeDir = require('make-dir');
const pathExists = require('path-exists');
const tempy = require('tempy');

const delNm = require('../');

describe('sync', () => {
  beforeEach(async () => {
    // Creates `node_modules` in temporary directory
    await makeDir(path.join(tempy.directory(), 'node_modules')).then(
      path => path
    );
  });

  it('deletes `node_modules`', () => {
    delNm.sync(tempy.directory());

    expect(pathExists.sync(path.join(tempy.directory(), 'node_modules'))).toBe(
      false
    );
  });

  it('also deletes `package-lock.json`', () => {
    tempy.file({name: 'package-lock.json'});

    delNm.sync(tempy.directory());

    expect(pathExists.sync(path.join(tempy.directory(), 'node_modules'))).toBe(
      false
    );
    expect(
      pathExists.sync(path.join(tempy.directory(), 'package-lock.json'))
    ).toBe(false);
  });

  it('also deletes `yarn.lock`', () => {
    tempy.file({name: 'yarn.lock'});

    delNm.sync(tempy.directory());

    expect(pathExists.sync(path.join(tempy.directory(), 'node_modules'))).toBe(
      false
    );
    expect(
      pathExists.sync(path.join(tempy.directory(), 'yarn.lock'))
    ).toBe(false);
  });
});
