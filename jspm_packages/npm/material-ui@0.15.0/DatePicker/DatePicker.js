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
var _simpleAssign = require('simple-assign');
var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _dateUtils = require('./dateUtils');
var _DatePickerDialog = require('./DatePickerDialog');
var _DatePickerDialog2 = _interopRequireDefault(_DatePickerDialog);
var _TextField = require('../TextField/index');
var _TextField2 = _interopRequireDefault(_TextField);
var _deprecatedPropType = require('../utils/deprecatedPropType');
var _deprecatedPropType2 = _interopRequireDefault(_deprecatedPropType);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0)
      continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i))
      continue;
    target[i] = obj[i];
  }
  return target;
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
var DatePicker = function(_Component) {
  _inherits(DatePicker, _Component);
  function DatePicker() {
    var _Object$getPrototypeO;
    var _temp,
        _this,
        _ret;
    _classCallCheck(this, DatePicker);
    for (var _len = arguments.length,
        args = Array(_len),
        _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DatePicker)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {date: undefined}, _this.handleAccept = function(date) {
      if (!_this.isControlled()) {
        _this.setState({date: date});
      }
      if (_this.props.onChange)
        _this.props.onChange(null, date);
    }, _this.handleFocus = function(event) {
      event.target.blur();
      if (_this.props.onFocus)
        _this.props.onFocus(event);
    }, _this.handleTouchTap = function(event) {
      if (_this.props.onTouchTap)
        _this.props.onTouchTap(event);
      if (!_this.props.disabled)
        setTimeout(function() {
          _this.openDialog();
        }, 0);
    }, _this.formatDate = function(date) {
      if (_this.props.locale) {
        var DateTimeFormat = _this.props.DateTimeFormat || _dateUtils.dateTimeFormat;
        return new DateTimeFormat(_this.props.locale, {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric'
        }).format(date);
      } else {
        return (0, _dateUtils.formatIso)(date);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  _createClass(DatePicker, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({date: this.isControlled() ? this.getControlledDate() : this.props.defaultDate});
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.isControlled()) {
        var newDate = this.getControlledDate(nextProps);
        if (!(0, _dateUtils.isEqualDate)(this.state.date, newDate)) {
          this.setState({date: newDate});
        }
      }
    }
  }, {
    key: 'getDate',
    value: function getDate() {
      return this.state.date;
    }
  }, {
    key: 'openDialog',
    value: function openDialog() {
      if (this.state.date !== undefined) {
        this.setState({dialogDate: this.getDate()}, this.refs.dialogWindow.show);
      } else {
        this.setState({dialogDate: new Date()}, this.refs.dialogWindow.show);
      }
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.openDialog();
    }
  }, {
    key: 'isControlled',
    value: function isControlled() {
      return this.props.hasOwnProperty('value');
    }
  }, {
    key: 'getControlledDate',
    value: function getControlledDate() {
      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
      if (props.value instanceof Date) {
        return props.value;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var DateTimeFormat = _props.DateTimeFormat;
      var autoOk = _props.autoOk;
      var cancelLabel = _props.cancelLabel;
      var container = _props.container;
      var defaultDate = _props.defaultDate;
      var disableYearSelection = _props.disableYearSelection;
      var firstDayOfWeek = _props.firstDayOfWeek;
      var locale = _props.locale;
      var maxDate = _props.maxDate;
      var minDate = _props.minDate;
      var mode = _props.mode;
      var okLabel = _props.okLabel;
      var onDismiss = _props.onDismiss;
      var onFocus = _props.onFocus;
      var onShow = _props.onShow;
      var onTouchTap = _props.onTouchTap;
      var shouldDisableDate = _props.shouldDisableDate;
      var style = _props.style;
      var textFieldStyle = _props.textFieldStyle;
      var wordings = _props.wordings;
      var other = _objectWithoutProperties(_props, ['DateTimeFormat', 'autoOk', 'cancelLabel', 'container', 'defaultDate', 'disableYearSelection', 'firstDayOfWeek', 'locale', 'maxDate', 'minDate', 'mode', 'okLabel', 'onDismiss', 'onFocus', 'onShow', 'onTouchTap', 'shouldDisableDate', 'style', 'textFieldStyle', 'wordings']);
      var prepareStyles = this.context.muiTheme.prepareStyles;
      var formatDate = this.props.formatDate || this.formatDate;
      return _react2.default.createElement('div', {style: prepareStyles((0, _simpleAssign2.default)({}, style))}, _react2.default.createElement(_TextField2.default, _extends({}, other, {
        onFocus: this.handleFocus,
        onTouchTap: this.handleTouchTap,
        ref: 'input',
        style: textFieldStyle,
        value: this.state.date ? formatDate(this.state.date) : ''
      })), _react2.default.createElement(_DatePickerDialog2.default, {
        DateTimeFormat: DateTimeFormat,
        autoOk: autoOk,
        cancelLabel: cancelLabel,
        container: container,
        disableYearSelection: disableYearSelection,
        firstDayOfWeek: firstDayOfWeek,
        initialDate: this.state.dialogDate,
        locale: locale,
        maxDate: maxDate,
        minDate: minDate,
        mode: mode,
        okLabel: okLabel,
        onAccept: this.handleAccept,
        onShow: onShow,
        onDismiss: onDismiss,
        ref: 'dialogWindow',
        shouldDisableDate: shouldDisableDate,
        wordings: wordings
      }));
    }
  }]);
  return DatePicker;
}(_react.Component);
DatePicker.propTypes = {
  DateTimeFormat: _react.PropTypes.func,
  autoOk: _react.PropTypes.bool,
  cancelLabel: _react.PropTypes.node,
  container: _react.PropTypes.oneOf(['dialog', 'inline']),
  defaultDate: _react.PropTypes.object,
  disableYearSelection: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,
  firstDayOfWeek: _react.PropTypes.number,
  formatDate: _react.PropTypes.func,
  locale: _react.PropTypes.string,
  maxDate: _react.PropTypes.object,
  minDate: _react.PropTypes.object,
  mode: _react.PropTypes.oneOf(['portrait', 'landscape']),
  okLabel: _react.PropTypes.node,
  onChange: _react.PropTypes.func,
  onDismiss: _react.PropTypes.func,
  onFocus: _react.PropTypes.func,
  onShow: _react.PropTypes.func,
  onTouchTap: _react.PropTypes.func,
  shouldDisableDate: _react.PropTypes.func,
  style: _react.PropTypes.object,
  textFieldStyle: _react.PropTypes.object,
  value: _react.PropTypes.any,
  wordings: (0, _deprecatedPropType2.default)(_react.PropTypes.object, 'Instead, use `cancelLabel` and `okLabel`.')
};
DatePicker.defaultProps = {
  autoOk: false,
  container: 'dialog',
  disabled: false,
  disableYearSelection: false,
  firstDayOfWeek: 1,
  style: {}
};
DatePicker.contextTypes = {muiTheme: _react.PropTypes.object.isRequired};
exports.default = DatePicker;
