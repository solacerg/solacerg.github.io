/* */ 
(function(process) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  var _onlyUpdateForKeys = require('./onlyUpdateForKeys');
  var _onlyUpdateForKeys2 = _interopRequireDefault(_onlyUpdateForKeys);
  var _createHelper = require('./createHelper');
  var _createHelper2 = _interopRequireDefault(_createHelper);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  var onlyUpdateForPropTypes = function onlyUpdateForPropTypes(BaseComponent) {
    var propTypes = BaseComponent.propTypes;
    if (process.env.NODE_ENV !== 'production') {
      var getDisplayName = require('./getDisplayName').default;
      if (!propTypes) {
        console.error('A component without any `propTypes` was passed to ' + '`onlyUpdateForPropTypes()`. Check the implementation of the ' + ('component with display name "' + getDisplayName(BaseComponent) + '".'));
      }
    }
    var propKeys = Object.keys(propTypes || {});
    var OnlyUpdateForPropTypes = (0, _onlyUpdateForKeys2.default)(propKeys)(BaseComponent);
    return OnlyUpdateForPropTypes;
  };
  exports.default = (0, _createHelper2.default)(onlyUpdateForPropTypes, 'onlyUpdateForPropTypes', true, true);
})(require('process'));
