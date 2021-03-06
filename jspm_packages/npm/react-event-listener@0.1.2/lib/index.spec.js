/* */ 
'use strict';
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _enzyme = require('enzyme');
var _chai = require('chai');
var _index = require('./index');
var _index2 = _interopRequireDefault(_index);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
describe('EventListener', function() {
  describe('props: children', function() {
    it('should work without', function() {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, null));
      _chai.assert.strictEqual(wrapper.children().length, 0, 'Should work without children');
    });
    it('should render it', function() {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, null, _react2.default.createElement('div', null, 'Foo')));
      _chai.assert.strictEqual(wrapper.children().length, 1, 'Should render his children.');
    });
  });
});
