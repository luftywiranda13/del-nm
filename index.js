'use strict';

const forceDel = require('force-del');
const hasLockfile = require('has-lockfile');

module.exports = ({ cwd = process.cwd(), lockfiles = true } = {}) => {
  return lockfiles
    ? forceDel(['node_modules'].concat(hasLockfile.lockfiles(cwd)), { cwd })
    : forceDel(['node_modules'], { cwd });
};
