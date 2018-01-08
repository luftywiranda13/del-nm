'use strict';

const del = require('del');
const hasLockfile = require('has-lockfile');

const asynchronous = async (cwd = process.cwd()) => {
  const lockfiles = hasLockfile(cwd);

  return del(lockfiles.concat(['node_modules']), { cwd });
};

const synchronous = (cwd = process.cwd()) => {
  const lockfiles = hasLockfile(cwd);

  return del.sync(lockfiles.concat(['node_modules']), { cwd });
};

module.exports = asynchronous;
module.exports.sync = synchronous;
