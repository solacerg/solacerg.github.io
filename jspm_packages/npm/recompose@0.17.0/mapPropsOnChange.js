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
var _createClass = function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
var _react = require('react');
var _pick = require('lodash/pick');
var _pick2 = _interopRequireDefault(_pick);
var _omit = require('lodash/omit');
var _omit2 = _interopRequireDefault(_omit);
var _shallowEqual = require('./shallowEqual');
var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
var _createHelper = require('./createHelper');
var _createHelper2 = _interopRequireDefault(_createHelper);
var _createElement = require('./createElement');
var _createElement2 = _interopRequireDefault(_createElement);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }});
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var mapPropsOnChange = function mapPropsOnChange(depdendentPropKeys, propsMapper) {
  return function(BaseComponent) {
    var pickDependentProps = function pickDependentProps(props) {
      return (0, _pick2.default)(props, depdendentPropKeys);
    };
    return function(_Component) {
      _inherits(_class2, _Component);
      function _class2() {
        var _Object$getPrototypeO;
        var _temp,
            _this,
            _ret;
        _classCallCheck(this, _class2);
        for (var _len = arguments.length,
            args = Array(_len),
            _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(_class2)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.computedProps = propsMapper(_this.props), _temp), _possibleConstructorReturn(_this, _ret);
      }
      _createClass(_class2, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          if (!(0, _shallowEqual2.default)(pickDependentProps(this.props), pickDependentProps(nextProps))) {
            this.computedProps = propsMapper(nextProps);
          }
        }
      }, {
        key: 'render',
        value: function render() {
          return (0, _createElement2.default)(BaseComponent, _extends({}, (0, _omit2.default)(this.props, depdendentPropKeys), this.computedProps));
        }
      }]);
      return _class2;
    }(_react.Component);
  };
};
exports.default = (0, _createHelper2.default)(mapPropsOnChange, 'mapPropsOnChange');
