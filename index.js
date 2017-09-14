'use strict';

const del = require('del');
const hasLockfile = require('has-lockfile');

module.exports = cwd => {
  const lockfile = hasLockfile();

  if (lockfile) {
    return del(['node_modules', lockfile], {cwd}).then(paths => paths);
  }

  return del('node_modules', {cwd}).then(paths => paths);
};

module.exports.sync = cwd => {
  const lockfile = hasLockfile();

  if (lockfile) {
    return del.sync(['node_modules', lockfile], {cwd});
  }

  return del.sync('node_modules', {cwd});
};
