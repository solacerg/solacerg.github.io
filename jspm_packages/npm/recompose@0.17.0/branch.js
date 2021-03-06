/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
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
var _react2 = _interopRequireDefault(_react);
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
var branch = function branch(test, left, right) {
  return function(BaseComponent) {
    return function(_React$Component) {
      _inherits(_class2, _React$Component);
      function _class2(props, context) {
        _classCallCheck(this, _class2);
        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class2).call(this, props, context));
        _this.LeftComponent = null;
        _this.RightComponent = null;
        _this.computeChildComponent(_this.props);
        return _this;
      }
      _createClass(_class2, [{
        key: 'computeChildComponent',
        value: function computeChildComponent(props) {
          if (test(props)) {
            this.LeftComponent = this.LeftComponent || left(BaseComponent);
            this.Component = this.LeftComponent;
          } else {
            this.RightComponent = this.RightComponent || right(BaseComponent);
            this.Component = this.RightComponent;
          }
        }
      }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          this.computeChildComponent(nextProps);
        }
      }, {
        key: 'render',
        value: function render() {
          var Component = this.Component;
          return (0, _createElement2.default)(Component, this.props);
        }
      }]);
      return _class2;
    }(_react2.default.Component);
  };
};
exports.default = (0, _createHelper2.default)(branch, 'branch');
