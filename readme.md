# del-nm

[![Package Version](https://img.shields.io/npm/v/del-nm.svg)](https://www.npmjs.com/package/del-nm)
[![Build Status: Linux](https://img.shields.io/travis/luftywiranda13/del-nm/master.svg)](https://travis-ci.org/luftywiranda13/del-nm)
[![Build Status: Windows](https://img.shields.io/appveyor/ci/luftywiranda13/del-nm/master.svg)](https://ci.appveyor.com/project/luftywiranda13/del-nm)
[![Coverage Status](https://img.shields.io/codecov/c/github/luftywiranda13/del-nm/master.svg)](https://codecov.io/gh/luftywiranda13/del-nm)
[![Downloads Status](https://img.shields.io/npm/dm/del-nm.svg)](https://npm-stat.com/charts.html?package=del-nm&from=2016-04-01)

Delete `node_modules` and lockfile (if any)

## Installation

```sh
npm install --save del-nm
```

## Usage

```
$ pwd
/Users/luftywiranda/foo

...
└── luftywiranda
    └── foo
        ├── node_modules
        ├── package.json
        └── yarn.lock
    └── bar
        ├── node_modules
        ├── package.json
        └── package-lock.json
```

```js
const delNm = require('del-nm');

delNm('./').then(paths => {
  console.log(paths);
  /*
    [
      '/Users/luftywiranda/foo/node_modules',
      '/Users/luftywiranda/foo/yarn.lock'
    ]
  */
});

delNm('../bar').then(paths => {
  console.log(paths);
  /*
    [
      '/Users/luftywiranda/bar/node_modules',
      '/Users/luftywiranda/bar/package-lock'
    ]
  */
});
```

## API

### delNm(path)

Returns a promise for an array of deleted paths.

### delNm.sync(path)

Returns an array of deleted paths.

#### path
 
Type: `string`
 
Directory that contains `node_modules`

## Related

- [del-nm-cli](https://github.com/luftywiranda13/del-nm-cli) - CLI for this module

## License

MIT &copy; [Lufty Wiranda](https://www.instagram.com/luftywiranda13)
