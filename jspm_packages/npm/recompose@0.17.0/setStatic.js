/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _createHelper = require('./createHelper');
var _createHelper2 = _interopRequireDefault(_createHelper);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
var setStatic = function setStatic(key, value) {
  return function(BaseComponent) {
    BaseComponent[key] = value;
    return BaseComponent;
  };
};
exports.default = (0, _createHelper2.default)(setStatic, 'setStatic', false);
