/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _extends = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _omit = require('lodash/omit');
var _omit2 = _interopRequireDefault(_omit);
var _createHelper = require('./createHelper');
var _createHelper2 = _interopRequireDefault(_createHelper);
var _createElement = require('./createElement');
var _createElement2 = _interopRequireDefault(_createElement);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
var flattenProp = function flattenProp(propName) {
  return function(BaseComponent) {
    return function(props) {
      return (0, _createElement2.default)(BaseComponent, _extends({}, (0, _omit2.default)(props, propName), props[propName]));
    };
  };
};
exports.default = (0, _createHelper2.default)(flattenProp, 'flattenProp');
