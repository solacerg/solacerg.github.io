/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _omit = require('lodash/omit');
var _omit2 = _interopRequireDefault(_omit);
var _createElement = require('./createElement');
var _createElement2 = _interopRequireDefault(_createElement);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
var componentFromProp = function componentFromProp(propName) {
  var Component = function Component(props) {
    return (0, _createElement2.default)(props[propName], (0, _omit2.default)(props, propName));
  };
  Component.displayName = 'componentFromProp(' + propName + ')';
  return Component;
};
exports.default = componentFromProp;
