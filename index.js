'use strict';

const del = require('del');
const hasLockfile = require('has-lockfile');

const asynchronous = cwd => {
  cwd = cwd || process.cwd();

  const lockfiles = hasLockfile(cwd);

  return lockfiles
    ? del(lockfiles.concat(['node_modules']), { cwd })
    : del('node_modules', { cwd });
};

const synchronous = cwd => {
  cwd = cwd || process.cwd();

  const lockfiles = hasLockfile(cwd);

  return lockfiles
    ? del.sync(lockfiles.concat(['node_modules']), { cwd })
    : del.sync('node_modules', { cwd });
};

module.exports = asynchronous;
module.exports.sync = synchronous;
