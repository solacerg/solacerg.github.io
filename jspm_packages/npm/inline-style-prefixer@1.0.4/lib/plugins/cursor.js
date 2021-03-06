/* */ 
'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
exports['default'] = cursor;
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}
var _utilsCamelToDashCase = require('../utils/camelToDashCase');
var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);
var values = {
  'zoom-in': true,
  'zoom-out': true,
  'grab': true,
  'grabbing': true
};
function cursor(_ref) {
  var property = _ref.property;
  var value = _ref.value;
  var _ref$browserInfo = _ref.browserInfo;
  var browser = _ref$browserInfo.browser;
  var version = _ref$browserInfo.version;
  var css = _ref.prefix.css;
  var keepUnprefixed = _ref.keepUnprefixed;
  if (property === 'cursor' && values[value] && (browser === 'firefox' && version < 24 || browser === 'chrome' && version < 37 || browser === 'safari' && version < 9 || browser === 'opera' && version < 24)) {
    return {cursor: css + value + (keepUnprefixed ? ';' + (0, _utilsCamelToDashCase2['default'])(property) + ':' + value : '')};
  }
}
module.exports = exports['default'];
