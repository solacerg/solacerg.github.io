/* */ 
(function(process) {
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
  var _mapValues = require('lodash/mapValues');
  var _mapValues2 = _interopRequireDefault(_mapValues);
  var _createElement = require('./createElement');
  var _createElement2 = _interopRequireDefault(_createElement);
  var _createHelper = require('./createHelper');
  var _createHelper2 = _interopRequireDefault(_createHelper);
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
  var withHandlers = function withHandlers(handlers) {
    return function(BaseComponent) {
      var _class,
          _temp2,
          _initialiseProps;
      return _temp2 = _class = function(_Component) {
        _inherits(_class, _Component);
        function _class() {
          var _Object$getPrototypeO;
          var _temp,
              _this,
              _ret;
          _classCallCheck(this, _class);
          for (var _len = arguments.length,
              args = Array(_len),
              _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(_class)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
        }
        _createClass(_class, [{
          key: 'render',
          value: function render() {
            return (0, _createElement2.default)(BaseComponent, _extends({}, this.props, this.handlers));
          }
        }]);
        return _class;
      }(_react.Component), _initialiseProps = function _initialiseProps() {
        var _this2 = this;
        this.handlers = (0, _mapValues2.default)(handlers, function(createHandler) {
          return function() {
            var handler = createHandler(_this2.props);
            if (process.env.NODE_ENV !== 'production' && typeof handler !== 'function') {
              console.error('withHandlers(): Expected a map of higher-order functions. ' + 'Refer to the docs for more info.');
            }
            return handler.apply(undefined, arguments);
          };
        });
      }, _temp2;
    };
  };
  exports.default = (0, _createHelper2.default)(withHandlers, 'withHandlers');
})(require('process'));
