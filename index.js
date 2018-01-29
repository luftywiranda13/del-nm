'use strict';

const forceDel = require('force-del');
const hasLockfile = require('has-lockfile');

module.exports = ({ cwd = process.cwd(), lockfiles = true } = {}) => {
  const opts = { cwd, expandDirectories: false };

  return lockfiles
    ? forceDel(['node_modules'].concat(hasLockfile.lockfiles(cwd)), opts)
    : forceDel(['node_modules'], opts);
};
