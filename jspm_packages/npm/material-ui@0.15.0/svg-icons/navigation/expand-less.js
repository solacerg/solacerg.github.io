/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _pure = require('recompose/pure');
var _pure2 = _interopRequireDefault(_pure);
var _SvgIcon = require('../../SvgIcon/index');
var _SvgIcon2 = _interopRequireDefault(_SvgIcon);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
var NavigationExpandLess = function NavigationExpandLess(props) {
  return _react2.default.createElement(_SvgIcon2.default, props, _react2.default.createElement('path', {d: 'M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z'}));
};
NavigationExpandLess = (0, _pure2.default)(NavigationExpandLess);
NavigationExpandLess.displayName = 'NavigationExpandLess';
exports.default = NavigationExpandLess;
