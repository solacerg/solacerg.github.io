/* */ 
'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
exports['default'] = flex;
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}
var _utilsCamelToDashCase = require('../utils/camelToDashCase');
var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);
var values = {
  'flex': true,
  'inline-flex': true
};
function flex(_ref) {
  var property = _ref.property;
  var value = _ref.value;
  var _ref$browserInfo = _ref.browserInfo;
  var browser = _ref$browserInfo.browser;
  var version = _ref$browserInfo.version;
  var css = _ref.prefix.css;
  var keepUnprefixed = _ref.keepUnprefixed;
  if (property === 'display' && values[value] && (browser === 'chrome' && version < 29 && version > 20 || (browser === 'safari' || browser === 'ios_saf') && version < 9 && version > 6 || browser === 'opera' && (version == 15 || version == 16))) {
    return {display: css + value + (keepUnprefixed ? ';' + (0, _utilsCamelToDashCase2['default'])(property) + ':' + value : '')};
  }
}
module.exports = exports['default'];
