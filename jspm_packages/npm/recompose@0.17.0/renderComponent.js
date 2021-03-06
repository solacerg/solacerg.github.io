/* */ 
(function(process) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  var _createHelper = require('./createHelper');
  var _createHelper2 = _interopRequireDefault(_createHelper);
  var _createElement = require('./createElement');
  var _createElement2 = _interopRequireDefault(_createElement);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  var renderComponent = function renderComponent(Component) {
    return function(_) {
      var RenderComponent = function RenderComponent(props) {
        return (0, _createElement2.default)(Component, props);
      };
      if (process.env.NODE_ENV !== 'production') {
        var wrapDisplayName = require('./wrapDisplayName').default;
        RenderComponent.displayName = wrapDisplayName(Component, 'renderComponent');
      }
      return RenderComponent;
    };
  };
  exports.default = (0, _createHelper2.default)(renderComponent, 'renderComponent', false);
})(require('process'));
