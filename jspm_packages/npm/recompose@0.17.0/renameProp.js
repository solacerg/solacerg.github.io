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
var _mapProps = require('./mapProps');
var _mapProps2 = _interopRequireDefault(_mapProps);
var _createHelper = require('./createHelper');
var _createHelper2 = _interopRequireDefault(_createHelper);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
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
var renameProp = function renameProp(oldName, newName) {
  return (0, _mapProps2.default)(function(props) {
    return _extends({}, (0, _omit2.default)(props, oldName), _defineProperty({}, newName, props[oldName]));
  });
};
exports.default = (0, _createHelper2.default)(renameProp, 'renameProp');
