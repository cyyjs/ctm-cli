'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ora = require('ora');

exports.default = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var spinner, list;
    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    spinner = ora('Loading template list ...').start();
                    list = [];
                    _context.prev = 2;
                    _context.next = 5;
                    return _util2.default.getTList();

                case 5:
                    list = _context.sent;

                    list = list.map(function (l) {
                        return l.name;
                    });
                    spinner.succeed('Loading success!');
                    _context.next = 13;
                    break;

                case 10:
                    _context.prev = 10;
                    _context.t0 = _context['catch'](2);

                    spinner.fail('Loading error, msg:', _context.t0);

                case 13:
                    if (list.length) {
                        console.log('============template list============');
                        list.forEach(function (n, i) {
                            console.log(i + 1 + '、' + n);
                        });
                        console.log('=====================================');
                    }

                case 14:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, undefined, [[2, 10]]);
}));