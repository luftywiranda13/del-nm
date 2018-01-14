'use strict';

const forceDel = require('force-del');
const hasLockfile = require('has-lockfile');

const delNm = ({ cwd = process.cwd(), lockfiles = true } = {}) =>
  forceDel(['node_modules'].concat(lockfiles ? hasLockfile(cwd) : ''), {
    cwd,
  });

module.exports = delNm;
