/* */ 
'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
exports['default'] = transition;
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var _utilsCamelToDashCase = require('../utils/camelToDashCase');
var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);
var _utilsCapitalizeString = require('../utils/capitalizeString');
var _utilsCapitalizeString2 = _interopRequireDefault(_utilsCapitalizeString);
var _utilsUnprefixProperty = require('../utils/unprefixProperty');
var _utilsUnprefixProperty2 = _interopRequireDefault(_utilsUnprefixProperty);
var properties = {
  transition: true,
  transitionProperty: true
};
function transition(_ref2) {
  var property = _ref2.property;
  var value = _ref2.value;
  var css = _ref2.prefix.css;
  var requiresPrefix = _ref2.requiresPrefix;
  var keepUnprefixed = _ref2.keepUnprefixed;
  var unprefixedProperty = (0, _utilsUnprefixProperty2['default'])(property);
  if (typeof value === 'string' && properties[unprefixedProperty]) {
    var _ret = (function() {
      var requiresPrefixDashCased = Object.keys(requiresPrefix).map(function(prop) {
        return (0, _utilsCamelToDashCase2['default'])(prop);
      });
      var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);
      requiresPrefixDashCased.forEach(function(property) {
        multipleValues.forEach(function(val, index) {
          if (val.indexOf(property) > -1) {
            multipleValues[index] = val.replace(property, css + property) + (keepUnprefixed ? ',' + val : '');
          }
        });
      });
      return {v: _defineProperty({}, property, multipleValues.join(','))};
    })();
    if (typeof _ret === 'object')
      return _ret.v;
  }
}
module.exports = exports['default'];
