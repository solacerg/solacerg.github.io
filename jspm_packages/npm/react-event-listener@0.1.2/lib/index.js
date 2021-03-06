/* */ 
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function on(element, type, callback) {
  if (element.addEventListener) {
    element.addEventListener(type, callback);
  } else {
    // IE8+ Support
    element.attachEvent('on' + type, function () {
      callback.call(element);
    });
  }
}

function off(element, type, callback) {
  if (element.removeEventListener) {
    element.removeEventListener(type, callback);
  } else {
    // IE8+ Support
    element.detachEvent('on' + type, callback);
  }
}

function listenersForEach(props, callback) {
  var elementName = props.elementName;

  var other = _objectWithoutProperties(props, ['elementName']);

  var element = window[elementName];

  for (var eventIdentifier in other) {
    var eventName = eventIdentifier.substring(2).toLowerCase();

    callback(element, eventName, other[eventIdentifier]);
  }
}

var EventListener = function (_Component) {
  _inherits(EventListener, _Component);

  function EventListener() {
    _classCallCheck(this, EventListener);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(EventListener).apply(this, arguments));
  }

  _createClass(EventListener, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      listenersForEach(this.props, function (element, eventName, callback) {
        on(element, eventName, callback);
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      listenersForEach(this.props, function (element, eventName, callback) {
        off(element, eventName, callback);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children || null;
    }
  }]);

  return EventListener;
}(_react.Component);

EventListener.propTypes = {
  /**
   * You can provide a children too.
   */
  children: _react.PropTypes.node,
  /**
   * Name of the element that we will be listening to.
   */
  elementName: _react.PropTypes.string
};
exports.default = EventListener;