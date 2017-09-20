'use strict';

const del = require('del');
const hasLockfile = require('has-lockfile');

module.exports = cwd => {
  cwd = cwd || process.cwd();

  const lockfiles = hasLockfile(cwd);

  return lockfiles
    ? del(lockfiles.concat(['node_modules']), {cwd})
    : del('node_modules', {cwd});
};

module.exports.sync = cwd => {
  cwd = cwd || process.cwd();

  const lockfiles = hasLockfile(cwd);

  return lockfiles
    ? del.sync(lockfiles.concat(['node_modules']), {cwd})
    : del.sync('node_modules', {cwd});
};
