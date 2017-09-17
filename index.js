'use strict';

const path = require('path');
const del = require('del');
const hasLockfile = require('has-lockfile');

module.exports = cwd => {
  cwd = path.resolve(cwd || process.cwd());

  const lockfile = hasLockfile(cwd);

  // Returns a promise of an array of deleted paths
  return lockfile
    ? del(['node_modules', lockfile], {cwd})
    : del('node_modules', {cwd});
};

module.exports.sync = cwd => {
  cwd = path.resolve(cwd || process.cwd());

  const lockfile = hasLockfile(cwd);

  // Returns an array of deleted paths
  return lockfile
    ? del.sync(['node_modules', lockfile], {cwd})
    : del.sync('node_modules', {cwd});
};
