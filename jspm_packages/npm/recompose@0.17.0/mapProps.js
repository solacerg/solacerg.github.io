/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _createHelper = require('./createHelper');
var _createHelper2 = _interopRequireDefault(_createHelper);
var _createElement = require('./createElement');
var _createElement2 = _interopRequireDefault(_createElement);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
var mapProps = function mapProps(propsMapper) {
  return function(BaseComponent) {
    return function(props) {
      return (0, _createElement2.default)(BaseComponent, propsMapper(props));
    };
  };
};
exports.default = (0, _createHelper2.default)(mapProps, 'mapProps');
