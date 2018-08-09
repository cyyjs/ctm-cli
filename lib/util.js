'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var https = require('https');
var Url = require('url');

var _class = function () {
    function _class() {
        (0, _classCallCheck3.default)(this, _class);
    }

    (0, _createClass3.default)(_class, null, [{
        key: 'getRequest',
        value: function getRequest(url) {
            var urlObj = Url.parse(url);
            var options = {
                host: urlObj.host,
                path: urlObj.path,
                headers: {
                    'User-Agent': 'cyy-cli'
                }
            };
            return new _promise2.default(function (resolve, reject) {
                https.get(options, function (res) {
                    var buffers = [];
                    res.on('data', function (d) {
                        buffers.push(d);
                    });
                    res.on('end', function () {
                        var bufs = Buffer.concat(buffers);
                        var str = bufs.toString();
                        var result = {};
                        try {
                            result = JSON.parse(str);
                            resolve(result);
                        } catch (e) {
                            console.log(e);
                            reject('请求失败');
                        }
                    });
                }).on('error', function (e) {
                    console.log(e);
                    reject('请求失败');
                });
            });
        }
    }, {
        key: 'getTList',
        value: function getTList() {
            return this.getRequest(_config2.default.reposUrl);
        }
    }]);
    return _class;
}();

exports.default = _class;