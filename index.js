'use strict';

const del = require('del');
const hasLockfile = require('has-lockfile');

module.exports = cwd => {
  cwd = cwd || process.cwd();

  const lockfile = hasLockfile(cwd);

  return lockfile
    ? del(['node_modules', lockfile], {cwd})
    : del('node_modules', {cwd});
};

module.exports.sync = cwd => {
  cwd = cwd || process.cwd();

  const lockfile = hasLockfile(cwd);

  return lockfile
    ? del.sync(['node_modules', lockfile], {cwd})
    : del.sync('node_modules', {cwd});
};
