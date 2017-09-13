'use strict';

const del = require('del');
const hasLockfile = require('has-lockfile');

module.exports = cwd => {
  const lockfile = hasLockfile();

  return lockfile
    ? del.sync(['node_modules', lockfile], {cwd})
    : del.sync('node_modules', {cwd});
};
