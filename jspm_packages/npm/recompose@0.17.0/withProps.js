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
var _isFunction = require('lodash/isFunction');
var _isFunction2 = _interopRequireDefault(_isFunction);
var _createHelper = require('./createHelper');
var _createHelper2 = _interopRequireDefault(_createHelper);
var _createElement = require('./createElement');
var _createElement2 = _interopRequireDefault(_createElement);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
var withProps = function withProps(input) {
  return function(BaseComponent) {
    var getProps = void 0;
    var props = (0, _isFunction2.default)(input) ? input(getProps) : input;
    return function(ownerProps) {
      getProps = function getProps() {
        return ownerProps;
      };
      return (0, _createElement2.default)(BaseComponent, _extends({}, ownerProps, props));
    };
  };
};
exports.default = (0, _createHelper2.default)(withProps, 'withProps');
