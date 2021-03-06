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
var _react2 = _interopRequireDefault(_react);
var _wrapDisplayName = require('./wrapDisplayName');
var _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName);
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
var createSpy = function createSpy() {
  var spyInfo = [];
  function addSpyInstance(spyInstance) {
    spyInfo.unshift({
      _spy: spyInstance,
      component: null,
      props: []
    });
  }
  function removeSpyInstance(spyInstance) {
    spyInfo = spyInfo.filter(function(s) {
      return s._spy !== spyInstance;
    });
  }
  function receiveProps(spyInstance, props) {
    var info = spyInfo.find(function(s) {
      return s._spy === spyInstance;
    });
    if (!info)
      return;
    info.props.unshift(props);
  }
  function updateComponent(spyInstance, component) {
    var info = spyInfo.find(function(s) {
      return s._spy === spyInstance;
    });
    if (!info)
      return;
    info.component = component;
  }
  var spy = function spy(BaseComponent) {
    var Spy = function(_React$Component) {
      _inherits(Spy, _React$Component);
      function Spy(props, context) {
        _classCallCheck(this, Spy);
        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Spy).call(this, props, context));
        _this.refCallback = function(ref) {
          return updateComponent(_this, ref);
        };
        addSpyInstance(_this);
        receiveProps(_this, props);
        return _this;
      }
      _createClass(Spy, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          receiveProps(this, nextProps);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          removeSpyInstance(this);
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(BaseComponent, _extends({}, this.props, {ref: this.refCallback}));
        }
      }]);
      return Spy;
    }(_react2.default.Component);
    Spy.displayName = (0, _wrapDisplayName2.default)(BaseComponent, 'spy');
    return Spy;
  };
  spy.getInfo = function() {
    return spyInfo;
  };
  spy.getProps = function() {
    var componentIndex = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var renderIndex = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    return spyInfo[componentIndex].props[renderIndex];
  };
  spy.getRenderCount = function() {
    var componentIndex = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    return spyInfo[componentIndex].props.length;
  };
  spy.getComponent = function() {
    var componentIndex = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    return spyInfo[componentIndex].component;
  };
  return spy;
};
exports.default = createSpy;
