#!/usr/bin/env node
'use strict';

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _init = require('./init');

var _init2 = _interopRequireDefault(_init);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../package'),
    version = _require.version;

_commander2.default.version(version, '-v, --version').usage('<command>').command('list').description('list available official templates').alias('l').action(_list2.default);

_commander2.default.command('init').description('generate a new project from a template').alias('i').action(_init2.default);
if (!process.argv.slice(2).length) {
    _commander2.default.outputHelp();
}
_commander2.default.parse(process.argv);