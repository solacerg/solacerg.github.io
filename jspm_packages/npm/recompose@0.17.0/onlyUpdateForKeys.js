/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _pick = require('lodash/pick');
var _pick2 = _interopRequireDefault(_pick);
var _shouldUpdate = require('./shouldUpdate');
var _shouldUpdate2 = _interopRequireDefault(_shouldUpdate);
var _shallowEqual = require('./shallowEqual');
var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
var _createHelper = require('./createHelper');
var _createHelper2 = _interopRequireDefault(_createHelper);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
var onlyUpdateForKeys = function onlyUpdateForKeys(propKeys) {
  return function(BaseComponent) {
    return (0, _shouldUpdate2.default)(function(props, nextProps) {
      return !(0, _shallowEqual2.default)((0, _pick2.default)(nextProps, propKeys), (0, _pick2.default)(props, propKeys));
    })(BaseComponent);
  };
};
exports.default = (0, _createHelper2.default)(onlyUpdateForKeys, 'onlyUpdateForKeys');
