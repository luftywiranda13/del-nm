# del-nm

> Delete `node_modules` and lockfiles

[![Package Version](https://img.shields.io/npm/v/del-nm.svg?style=flat-square)](https://www.npmjs.com/package/del-nm)
[![Downloads Status](https://img.shields.io/npm/dm/del-nm.svg?style=flat-square)](https://npm-stat.com/charts.html?package=del-nm&from=2016-04-01)
[![Build Status: Linux](https://img.shields.io/travis/luftywiranda13/del-nm/master.svg?style=flat-square)](https://travis-ci.org/luftywiranda13/del-nm)
[![Coverage Status](https://img.shields.io/codecov/c/github/luftywiranda13/del-nm/master.svg?style=flat-square)](https://codecov.io/gh/luftywiranda13/del-nm)

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

delNm({ cwd: 'bar' }).then(paths => {
  console.log(paths);
  /*
    [
      '/Users/luftywiranda/bar/node_modules',
      '/Users/luftywiranda/bar/yarn.lock'
    ]
  */
});

delNm({ cwd: 'foo' }).then(paths => {
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

### delNm([options])

Returns `Promise<Array>` of deleted paths.

#### options

Type: `Object`

##### cwd

Type: `string`<br />
Default: `process.cwd()`

Current working directory.

##### lockfiles

Type: `boolean`<br />
Default: `true`

Set this to `false` to not delete lockfiles. Remember that `npm-shrinkwrap.json` will also be deleted when this option is set to `true`.

## Related

* [del-nm-cli](https://github.com/luftywiranda13/del-nm-cli) － CLI for this module
* [force-del](https://github.com/luftywiranda13/force-del) － Force delete files or folders using glob patterns
* [remove-lockfiles](https://github.com/luftywiranda13/remove-lockfiles) － Prevent committing lockfiles

## License

MIT &copy; [Lufty Wiranda](https://www.luftywiranda.com)
