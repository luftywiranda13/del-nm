# del-nm

[![Package Version](https://img.shields.io/npm/v/del-nm.svg)](https://www.npmjs.com/package/del-nm)
[![Build Status: Linux](https://img.shields.io/travis/luftywiranda13/del-nm/master.svg)](https://travis-ci.org/luftywiranda13/del-nm)
[![Build Status: Windows](https://ci.appveyor.com/api/projects/status/50ip4itb26hn8y3k/branch/master?svg=true)](https://ci.appveyor.com/project/luftywiranda13/del-nm/branch/master)
[![Coverage Status](https://img.shields.io/codecov/c/github/luftywiranda13/del-nm/master.svg)](https://codecov.io/gh/luftywiranda13/del-nm)
[![Downloads Status](https://img.shields.io/npm/dm/del-nm.svg)](https://npm-stat.com/charts.html?package=del-nm&from=2016-04-01)

Delete `node_modules` and lockfiles.

Useful to perform fresh installation of dependencies.

## Installation

```sh
npm install --save del-nm
```

## Usage

```sh
$ tree
.
├── bar
│   ├── node_modules
│   └── yarn.lock
└── foo
    ├── node_modules
    └── package-lock.json
```

```js
const delNm = require('del-nm');

delNm('bar').then(paths => {
  console.log(paths);
  /*
    [
      '/Users/luftywiranda/bar/node_modules',
      '/Users/luftywiranda/bar/yarn.lock'
    ]
  */
});

delNm('foo').then(paths => {
  console.log(paths);
  /*
    [
      '/Users/luftywiranda/foo/node_modules',
      '/Users/luftywiranda/foo/package-lock.json'
    ]
  */
});

delNm().then(paths => {
  console.log(paths);
  //=> []
});
```

## API

### delNm([cwd])

Returns `Promise<string[]>` of deleted paths.

### delNm.sync([cwd])

Returns `Array<string>` of deleted paths.

#### cwd

Type: `string`<br />
Default: `process.cwd()`

Current working directory.

## Related

* [del-nm-cli](https://github.com/luftywiranda13/del-nm-cli) － CLI for this module

## License

MIT &copy; [Lufty Wiranda](https://www.luftywiranda.com)
